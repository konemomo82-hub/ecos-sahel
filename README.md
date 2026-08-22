# ECOS Sahel

Portail bilingue (français / anglais) pour ECOS Mali et ECOS Burkina Faso.

## Lancement local

1. Copiez `.env.example` vers `.env.local` et renseignez Supabase lorsque le projet est créé.
2. Installez les dépendances : `npm install`.
3. Lancez le site : `npm run dev`.

Le site est disponible en français sous `/fr` et en anglais sous `/en`.

## Éditorial

`supabase/schema.sql` définit les rôles : `super_admin`, `mali_admin`, `burkina_admin`. Une publication porte un ou plusieurs périmètres : `portal`, `mali`, `burkina`; cela permet au super administrateur de la diffuser sur le portail principal, sur une antenne, ou sur les deux.

Voir [la procédure Hostinger](docs/HOSTINGER.md) pour le déploiement et la connexion du domaine.

