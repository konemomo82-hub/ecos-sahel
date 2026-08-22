# ECOS Sahel — Suivi de projet

_Dernière mise à jour : 22 août 2026_

## Le projet

Site bilingue (FR/EN) pour deux associations sœurs :
- **ECOS Mali** — Bamako, Mali — Président : Esaïe Kamaté
- **ECOS Burkina Faso** — Ouagadougou, Burkina Faso — Président : Ibrahima KONE

Un seul portail (`ecos-sahel.org`) présentant les deux antennes, avec un système de publication qui distinguera plus tard le contenu "portail", "Mali" et "Burkina".

## Infos techniques

- **Dépôt GitHub** : `konemomo82-hub/ecos-sahel`
- **Branche par défaut** : `main` (contient le code à jour)
- **Autre branche active** : `feat/ecos-sahel-v1` (garder synchronisée avec main si possible)
- **Stack** : Next.js 15 (App Router) + React 19 + TypeScript, Supabase prévu pour le contenu éditorial
- **Hébergement** : Hostinger Business Web Hosting, via l'app Node.js dans hPanel (connectée directement au dépôt GitHub, branche `main`)
- **URL actuelle** : `lightpink-kingfisher-420738.hostingersite.com` (à remplacer par `ecos-sahel.org` — domaine pas encore branché)
- **Commandes de build Hostinger** : `npm ci` → `npm run build` → `npm run start`

## Fait jusqu'ici

1. ✅ Corrigé un bug d'encodage majeur (mojibake UTF-8) sur tout le texte du site
2. ✅ Résolu l'erreur 403 (le site avait été uploadé par FTP comme un site statique — il faut le connecteur Node.js de Hostinger)
3. ✅ Ajouté SEO multilingue (metadata, hreflang FR/EN), `robots.txt`, `sitemap.xml`
4. ✅ Ajouté favicon = logo ECOS Sahel (fond transparent)
5. ✅ Intégré les 3 logos (ECOS Sahel, ECOS Mali, ECOS Burkina) avec fonds nettoyés (transparence)
6. ✅ Intégré 9 photos terrain dans une nouvelle section **Galerie** (menuiserie, bibliothèque sous les manguiers, pépinières Burkina, distribution Kaya Nooma, etc.)
7. ✅ Photo de couverture (enfants + livres) en fond du bandeau d'accueil, dégradé bleu retiré (juste un voile vert léger pour la lisibilité du texte)
8. ✅ Site déployé et fonctionnel sur Hostinger

## À faire — priorités pour la suite

### 1. Domaine définitif (rapide)
- Brancher `ecos-sahel.org` dans hPanel → app Node.js → Domaines
- Activer le SSL une fois le domaine reconnu

### 2. Projet Supabase (prochaine session)
- Créer le projet Supabase si pas encore fait
- Exécuter `supabase/schema.sql` (déjà dans le repo — définit les tables `posts`, `profiles`, `media` et les rôles `super_admin`, `mali_admin`, `burkina_admin`)
- Ajouter les variables d'environnement dans hPanel : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Page /admin (chantier principal)
- Page de connexion (Supabase Auth)
- Interface pour créer/éditer/publier des articles, avec choix du périmètre (portail / Mali / Burkina)
- Upload d'image de couverture vers Supabase Storage
- Remplacer `initialPosts` (actuellement en dur dans `data/site.ts`) par un vrai fetch depuis la table `posts`

### 4. Sections manquantes du menu
Ces liens existent dans le menu mais ne mènent à aucune section pour l'instant :
- **À propos**
- **ECOS Mali** (page dédiée à l'antenne, au-delà du petit encart actuel)
- **ECOS Burkina Faso** (idem)
- **Ressources**

→ Il faudra le contenu texte (histoire de l'association, missions détaillées, documents à télécharger, etc.)

### 5. Petits plus (non urgent)
- Formulaire de contact fonctionnel
- Analytics (Google Analytics ou Plausible)
- Logo Burkina en meilleure résolution si disponible (l'actuel est petit : 294×145 px)
- Image Open Graph dédiée pour le partage sur réseaux sociaux

## Comment reprendre demain

Donne-moi ce fichier en début de session (ou dis-moi juste "reprends le fichier PROGRES-ECOS-SAHEL.md") et je repars directement du point où on s'est arrêtés, sans qu'on ait à tout réexpliquer.
