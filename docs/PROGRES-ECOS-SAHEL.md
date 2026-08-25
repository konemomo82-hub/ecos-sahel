# ECOS Sahel — Suivi de projet

_Dernière mise à jour : 25 août 2026_

## Le projet

Site bilingue (FR/EN) pour deux associations sœurs :
- **ECOS Mali** — Bamako, Mali — Président : Esaïe Kamaté
- **ECOS Burkina Faso** — Ouagadougou, Burkina Faso — Président : Ibrahima KONE

Un seul portail (`ecos-sahel.org`) présentant les deux antennes, avec un système de publication qui distingue le contenu « portail », « Mali » et « Burkina » (champ `scopes`).

## Infos techniques

- **Dépôt GitHub** : `konemomo82-hub/ecos-sahel`
- **Branche déployée** : `main` — c'est elle que lit Hostinger
- **Branche de travail** : `feat/ecos-sahel-v1` — à fusionner dans `main` pour déployer
- **Stack** : Next.js 15 (App Router) + React 19 + TypeScript, Supabase (Postgres + Auth + Storage)
- **Hébergement** : Hostinger Business Web Hosting, app Node.js dans hPanel connectée au dépôt GitHub
- **URL actuelle** : `lightpink-kingfisher-420738.hostingersite.com` (à remplacer par `ecos-sahel.org` — domaine pas encore branché)
- **Commandes de build Hostinger** : `npm ci` → `npm run build` → `npm run start`
- **Vérification avant commit** : `npx tsc --noEmit` puis `npm run build`

## Fait jusqu'ici

1. ✅ Corrigé un bug d'encodage majeur (mojibake UTF-8) sur tout le texte du site
2. ✅ Résolu l'erreur 403 (le site avait été uploadé par FTP comme un site statique — il faut le connecteur Node.js de Hostinger)
3. ✅ SEO multilingue (metadata, hreflang FR/EN), `robots.txt`, `sitemap.xml`
4. ✅ Favicon = logo ECOS Sahel (fond transparent)
5. ✅ Les 3 logos (ECOS Sahel, Mali, Burkina) intégrés, fonds nettoyés
6. ✅ 9 photos terrain dans la section **Galerie**
7. ✅ Photo de couverture en fond du bandeau d'accueil, voile vert léger pour la lisibilité
8. ✅ Site déployé et fonctionnel sur Hostinger
9. ✅ **Supabase** : schéma (`posts`, `profiles`, `media`), RLS, policies par rôle et par périmètre, bucket `site-media`
10. ✅ **Espace `/admin`** : connexion Supabase Auth par mot de passe, CRUD des articles, choix du périmètre, upload d'image de couverture, médiathèque
11. ✅ **Pages article individuelles** (`/[locale]/actualites/[slug]`), contenu en Markdown, images insérables dans le texte
12. ✅ **Pages d'antenne** `/ecos-mali` et `/ecos-burkina` avec le flux d'articles filtré par périmètre
13. ✅ Rafraîchissement automatique après publication (`POST /api/revalidate`)
14. ✅ **Section « À propos »** sur l'accueil (intro, histoire en 3 paragraphes, 4 valeurs) — *texte provisoire à relire*
15. ✅ **Section « Ressources »** sur l'accueil (4 documents ; ceux sans fichier s'affichent « Bientôt disponible » plutôt qu'en lien mort)
16. ✅ Pages d'antenne enrichies : bloc « Nos actions sur le terrain » (3 missions) + galerie photo filtrée par antenne

→ Les 8 liens du menu mènent désormais tous quelque part. Plus aucune ancre morte.

## À faire — priorités pour la suite

### 1. Déployer (immédiat)
- Fusionner `feat/ecos-sahel-v1` dans `main` et pousser
- hPanel → app Node.js → Git → **Deploy** (ou attendre le déploiement automatique si le webhook est actif)
- Vérifier que les variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont bien définies dans hPanel — sans elles, le site fonctionne mais les articles Supabase n'apparaissent pas et `/admin` affiche « Configuration requise »

### 2. Relire le contenu provisoire
Écrit par défaut, à corriger par ECOS :
- `about` dans `data/site.ts` — intro, histoire, valeurs
- `antennas.mali.missions_fr` / `antennas.burkina.missions_fr` — les 3 missions de chaque antenne

### 3. Fichiers à fournir
Voir [`MEDIAS-A-FOURNIR.md`](MEDIAS-A-FOURNIR.md) : les 4 PDF de la rubrique Ressources, et le logo Burkina en meilleure résolution (l'actuel fait 294 × 145 px).

### 4. Domaine définitif
- Brancher `ecos-sahel.org` dans hPanel → app Node.js → Domaines
- Activer le SSL une fois le domaine reconnu

### 5. Petits plus (non urgent)
- Formulaire de contact fonctionnel (la section « Contact » est aujourd'hui une présentation des deux antennes, sans formulaire)
- Analytics (Google Analytics ou Plausible)
- Image Open Graph dédiée pour le partage sur réseaux sociaux
- `tsconfig.tsbuildinfo` est versionné par erreur — à retirer du dépôt et à ajouter au `.gitignore`

## Comment reprendre demain

Donne-moi ce fichier en début de session (ou dis-moi juste « reprends le fichier PROGRES-ECOS-SAHEL.md ») et je repars directement du point où on s'est arrêtés, sans qu'on ait à tout réexpliquer.
