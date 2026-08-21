# Mise en ligne sur Hostinger

## Architecture recommandÃ©e

Le site Next.js doit Ãªtre dÃ©ployÃ© sur un hÃ©bergement Hostinger qui supporte Node.js (VPS ou hÃ©bergement Node.js). Supabase reste le service gÃ©rÃ© pour lâ€™authentification, la base de donnÃ©es et les photos.

1. CrÃ©ez le dÃ©pÃ´t privÃ© `konemomo82-hub/ecos-sahel` et poussez ce projet.
2. CrÃ©ez un projet Supabase, exÃ©cutez `supabase/schema.sql`, puis crÃ©ez le bucket privÃ© `ecos-media`.
3. Dans Hostinger, crÃ©ez une application Node.js avec Node 20+ et connectez le dÃ©pÃ´t GitHub.
4. Ajoutez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans les variables dâ€™environnement Hostinger. Ne mettez jamais de clÃ© `service_role` dans le navigateur ou GitHub.
5. Commande de compilation : `npm ci && npm run build`. Commande de dÃ©marrage : `npm run start`.
6. Lorsque le domaine est achetÃ©, ajoutez `ecos-sahel.org` et `www.ecos-sahel.org` dans Hostinger. Renseignez chez le registrar les enregistrements DNS fournis par Hostinger et activez la redirection de `www` vers le domaine principal.

## Avant lâ€™ouverture au public

- CrÃ©er les comptes du super administrateur, de lâ€™administrateur Mali et de lâ€™administrateur Burkina.
- Remplacer les contenus de dÃ©monstration et ajouter les 10 photos sous `public/images/` ou dans Supabase Storage.
- Ajouter les deux logos dans `public/logos/` en PNG/SVG et les utiliser dans lâ€™en-tÃªte.
- Renseigner les coordonnÃ©es officielles, la politique de confidentialitÃ© et les modalitÃ©s de don.

