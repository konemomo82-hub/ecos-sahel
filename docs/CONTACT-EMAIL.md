# Formulaire de contact : envoi vers contact@ecos-sahel.org

## Comment ça marche

Le formulaire ne parle plus directement à Supabase. Il poste vers
[`/api/contact`](../app/api/contact/route.ts), qui fait deux choses :

1. **Enregistre le message en base** (table `contact_messages`) — consultable dans
   l'onglet « Messages » de `/admin`.
2. **Envoie un email** vers la boîte de l'association, via le SMTP Hostinger.

Les deux canaux sont indépendants. Si l'email ne part pas, le message reste
consultable dans l'admin ; l'erreur n'est renvoyée au visiteur que si **les deux**
échouent. Un message n'est donc jamais perdu silencieusement.

Tant que le SMTP n'est pas configuré, le formulaire continue de fonctionner en
mode « enregistrement seul » — exactement le comportement d'avant.

## Configuration (à faire une fois le domaine propagé)

### 1. Créer la boîte mail dans hPanel

hPanel → **Emails** → **Comptes email** → créer `contact@ecos-sahel.org`.
Noter le mot de passe : il servira de `SMTP_PASSWORD`.

La boîte ne peut être créée qu'une fois `ecos-sahel.org` reconnu par Hostinger.

### 2. Renseigner les variables d'environnement

hPanel → app **Node.js** → **Variables d'environnement** :

| Variable | Valeur |
| --- | --- |
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `contact@ecos-sahel.org` |
| `SMTP_PASSWORD` | le mot de passe de la boîte |
| `CONTACT_TO` | `contact@ecos-sahel.org` |

**Aucune de ces variables ne doit porter le préfixe `NEXT_PUBLIC_`.** Ce préfixe
injecte la valeur dans le code envoyé au navigateur : le mot de passe de la boîte
mail serait lisible par n'importe quel visiteur.

`CONTACT_TO` permet d'envoyer ailleurs que sur la boîte d'expédition — par exemple
vers une adresse personnelle le temps d'un test. Si elle est vide, les messages
partent vers `SMTP_USER`.

### 3. Redéployer

Les variables ne sont lues qu'au démarrage du serveur : un redéploiement depuis
hPanel est nécessaire après toute modification.

## Détails d'implémentation

**L'expéditeur est toujours la boîte authentifiée**, jamais l'adresse du visiteur :
un serveur SMTP refuse d'envoyer au nom d'un domaine qu'il ne contrôle pas, et un
message qui prétendrait venir de `visiteur@gmail.com` partirait droit en spam.
L'adresse du visiteur est mise en `replyTo` — un clic sur « Répondre » dans la
messagerie écrit bien à la bonne personne.

**Port 465 ou 587** : `secure` est déduit du port (`465` → TLS implicite,
`587` → STARTTLS). Changer `SMTP_PORT` suffit, il n'y a pas d'autre réglage.

**Anti-spam** : le formulaire contient un champ caché (« pot de miel ») que seuls
les robots remplissent. Quand il est rempli, la requête reçoit une réponse normale
mais rien n'est enregistré ni envoyé — le robot ne sait pas qu'il a été filtré.
C'est une protection légère ; si le spam devient un problème, l'étape suivante
serait un vrai captcha (hCaptcha ou Turnstile, tous deux gratuits).

**Validation côté serveur** : nom, email et message obligatoires, format d'email
vérifié, longueurs plafonnées (200 caractères pour le nom, 5 000 pour le message).
Cette validation est refaite côté serveur parce que les contrôles du navigateur
(`required`, `type="email"`) sont triviaux à contourner.

## Tester

En local, avec un `.env.local` renseigné :

```bash
npm run dev
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","scope":"portal","message":"Message de test"}'
```

Réponse attendue : `{"ok":true}`. Vérifier ensuite l'arrivée du mail, et la
présence du message dans l'onglet « Messages » de `/admin`.

Si l'email ne part pas, la cause est écrite dans les logs du serveur
(`[contact] envoi de l'email impossible : …`) — consultables dans hPanel, section
logs de l'app Node.js.
