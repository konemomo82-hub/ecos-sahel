# ECOS Sahel

Portail bilingue (franÃ§ais / anglais) pour ECOS Mali et ECOS Burkina Faso.

## Lancement local

1. Copiez `.env.example` vers `.env.local` et renseignez Supabase lorsque le projet est crÃ©Ã©.
2. Installez les dÃ©pendances : `npm install`.
3. Lancez le site : `npm run dev`.

Le site est disponible en franÃ§ais sous `/fr` et en anglais sous `/en`.

## Ã‰ditorial

`supabase/schema.sql` dÃ©finit les rÃ´les : `super_admin`, `mali_admin`, `burkina_admin`. Une publication porte un ou plusieurs pÃ©rimÃ¨tres : `portal`, `mali`, `burkina`; cela permet au super administrateur de la diffuser sur le portail principal, sur une antenne, ou sur les deux.

Voir [la procÃ©dure Hostinger](docs/HOSTINGER.md) pour le dÃ©ploiement et la connexion du domaine.

