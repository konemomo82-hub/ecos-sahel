# Mise en ligne sur Hostinger

## Architecture recommandée

Le site Next.js doit être déployé sur un hébergement Hostinger qui supporte Node.js (VPS ou hébergement Node.js). Supabase reste le service géré pour l'authentification, la base de données et les photos.

1. Créez le dépôt privé `konemomo82-hub/ecos-sahel` et poussez ce projet.
2. Créez un projet Supabase, exécutez `supabase/schema.sql`, puis créez le bucket privé `ecos-media`.
3. Dans Hostinger, créez une application Node.js avec Node 20+ et connectez le dépôt GitHub.
4. Ajoutez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans les variables d'environnement Hostinger. Ne mettez jamais de clé `service_role` dans le navigateur ou GitHub.
5. Commande de compilation : `npm ci && npm run build`. Commande de démarrage : `npm run start`.
6. Lorsque le domaine est acheté, ajoutez `ecos-sahel.org` et `www.ecos-sahel.org` dans Hostinger. Renseignez chez le registrar les enregistrements DNS fournis par Hostinger et activez la redirection de `www` vers le domaine principal.

## Avant l'ouverture au public

- Créer les comptes du super administrateur, de l'administrateur Mali et de l'administrateur Burkina.
- Remplacer les contenus de démonstration et ajouter les 10 photos sous `public/images/` ou dans Supabase Storage.
- Ajouter les deux logos dans `public/logos/` en PNG/SVG et les utiliser dans l'en-tête.
- Renseigner les coordonnées officielles, la politique de confidentialité et les modalités de don.

