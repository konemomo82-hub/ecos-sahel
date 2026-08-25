# Déploiement : pourquoi `.next` est effacé avant chaque build

## Le symptôme

Après un déploiement, la page d'accueil affiche :

> Application error: a client-side exception has occurred (see the browser console for more information)

Le serveur répond pourtant `200`, et les pages en `force-dynamic`
(`/fr/ecos-mali`, `/fr/ecos-burkina`) fonctionnent normalement. Seules les pages
en ISR (`/fr` et `/en`, `revalidate = 300`) sont touchées.

## La cause

Next.js conserve un cache ISR sur disque, sous `.next`. Une page déjà revalidée
au moment de l'exécution — par l'expiration des 300 s, ou par le
`POST /api/revalidate` déclenché à chaque publication depuis `/admin` — y est
stockée sous forme de HTML déjà rendu.

`next build` préserve délibérément une partie de `.next` (cache de compilation).
Après un déploiement, le serveur peut donc servir **le HTML de l'ancien build**,
alors que `.next/static` contient déjà **les fichiers du nouveau build**.

Or les noms de fichiers JS et CSS contiennent un hash du contenu, qui change à
chaque modification :

| | Ancien build | Nouveau build |
| --- | --- | --- |
| Chunk de la page | `page-89fb77540525c72d.js` | `page-7e286d97285eef95.js` |
| Feuille de style | `bbae17d679d4a137.css` | `5fa5aed1158a6290.css` |

L'ancien HTML référence des fichiers qui n'existent plus → **404** → React ne
peut pas hydrater la page → exception côté client.

C'est transitoire : dès que l'entrée de cache se revalide, la page se répare
seule. Mais entre-temps, les visiteurs voient un site cassé.

## Le correctif

Un script `prebuild` dans [`package.json`](../package.json) efface `.next` avant
chaque build :

```json
"prebuild": "node -e \"require('fs').rmSync('.next', { recursive: true, force: true })\""
```

npm exécute `prebuild` automatiquement avant `build` : la commande de build
Hostinger (`npm ci` → `npm run build` → `npm run start`) n'est pas à modifier.
Le script passe par Node plutôt que par `rm -rf` pour fonctionner aussi sous
Windows en local.

Contrepartie : chaque build repart de zéro, sans cache de compilation. Sur ce
projet le build complet prend moins d'une minute — le coût est négligeable
comparé à un site cassé après chaque mise en ligne.

## Vérifier un déploiement

Après un déploiement, contrôler que le HTML servi pointe bien vers des fichiers
qui existent :

```bash
B=https://lightpink-kingfisher-420738.hostingersite.com
curl -s "$B/fr" -o /tmp/live.html
for u in $(grep -o '/_next/static/[^"]*\.js' /tmp/live.html | sort -u); do
  echo "$(curl -s -o /dev/null -w '%{http_code}' "$B$u")  $u"
done
```

Tout doit renvoyer `200`. Un `404` sur le chunk `app/%5Blocale%5D/page-*.js`
signale que le problème est de retour.

En cas d'urgence, forcer une revalidation immédiate suffit à débloquer une
page : `curl -s "$B/fr?cb=$RANDOM" > /dev/null` (la chaîne de requête crée une
clé de cache neuve, ce qui déclenche un rendu frais).
