# ECOS Sahel — Suivi de projet

_Dernière mise à jour : 28 août 2026_

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
- **URL actuelle** : `lightpink-kingfisher-420738.hostingersite.com`
- **Domaine définitif** : `ecos-sahel.org` — enregistré le 27 août 2026. ⚠️ **Ne résout pas : sa zone DNS n'existe pas chez Hostinger.** Ce n'est pas de la propagation, attendre ne réglera rien — voir [`DOMAINE-DNS.md`](DOMAINE-DNS.md) pour le diagnostic complet et la marche à suivre. **Adresse officielle retenue : sans `www`.** Le code référence partout l'apex, et `next.config.ts` redirige `www` → apex.
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
17. ✅ **Corrigé l'« Application error » après déploiement** : le cache ISR de Next.js survivait au build et servait l'ancien HTML, qui pointait vers des fichiers JS/CSS supprimés (404 → échec d'hydratation). `.next` est désormais effacé avant chaque build — voir [`DEPLOIEMENT-CACHE.md`](DEPLOIEMENT-CACHE.md)

18. ✅ Menu redessiné + menu mobile avec bouton hamburger
19. ✅ Textes des sections À propos retravaillés, documents officiels et nouveau logo ECOS Burkina (700 px) intégrés
20. ✅ **Formulaire de contact** : enregistrement en base (`contact_messages`) + onglet « Messages » dans l'admin (lu/non lu, suppression)
21. ✅ **Envoi des messages par email** vers `contact@ecos-sahel.org` via SMTP Hostinger (`POST /api/contact`), avec pot de miel anti-robots et validation serveur — voir [`CONTACT-EMAIL.md`](CONTACT-EMAIL.md). *Reste à renseigner les variables SMTP dans hPanel une fois le domaine propagé.*
22. ✅ **Corrigé les échecs silencieux de l'admin** : `handleDelete`, `handleDeleteMessage`, `handleMarkRead` et `handleDeleteMedia` ignoraient l'erreur renvoyée par Supabase. Un refus RLS rechargeait la liste sans rien afficher — la suppression semblait simplement ne pas marcher. Les erreurs s'affichent désormais dans une bannière.

23. ✅ **Rétabli le build cassé** : le commit `62b202a « correction des defauts de securites »` avait retiré `nodemailer` de `package.json` et du lock, tout en gardant `app/api/contact/route.ts` qui l'importe. En local le build passait encore (copie résiduelle dans `node_modules`), mais `npm ci` sur Hostinger produisait `Module not found: Can't resolve 'nodemailer'`. Dépendance réinstallée en **9.0.6**, la version corrigée (`npm audit` : 0 vulnérabilité). Les `overrides` postcss/sharp du même commit sont conservés.

⚠️ **Attention** : ce commit était un revert intégral du commit précédent, pas seulement un correctif de sécurité. Il avait aussi annulé la gestion d'erreur de l'admin, le pot de miel du formulaire, la redirection `www` et les variables SMTP de `.env.example`. Tout a été restauré. À l'avenir, vérifier ce qu'un `npm audit fix` emporte avec lui.

24. ✅ **Domaine `ecos-sahel.org` opérationnel** (30 août 2026). ⚠️ Le site répond en **HTTP seulement** — le SSL reste à activer dans hPanel.
25. ✅ **Boutons « Modifier » et « Supprimer » rendus visibles dans l'admin** : `.button.ghost` est défini avec bordure et texte blancs, pour le bandeau d'accueil qui est sombre. Sur les fonds blancs de l'admin, les boutons étaient invisibles — présents dans le DOM, cliquables, mais introuvables à l'œil. `.admin-danger` ne rattrapait rien : une classe contre deux, il perdait en spécificité. Réencrés via `.admin-shell .button.ghost`. Même correctif pour le bouton de confirmation du formulaire de contact.

→ Les 8 liens du menu mènent désormais tous quelque part. Plus aucune ancre morte.

## À faire — priorités pour la suite

### 1. Relire le contenu provisoire
Écrit par défaut, à corriger par ECOS :
- `about` dans `data/site.ts` — intro, histoire, valeurs
- `antennas.mali.missions_fr` / `antennas.burkina.missions_fr` — les 3 missions de chaque antenne

### 2. Domaine + email — **bloqué côté Hostinger**
⚠️ Priorité : la zone DNS d'`ecos-sahel.org` n'existe sur aucun serveur de noms. Rien ne fonctionnera tant que ce n'est pas réglé. Diagnostic, commandes de vérification et texte du ticket support dans [`DOMAINE-DNS.md`](DOMAINE-DNS.md).

Une fois le domaine résolu :
1. hPanel → app Node.js → **Domaines** : brancher `ecos-sahel.org`, activer le SSL
2. Vérifier que `www.ecos-sahel.org` redirige bien vers l'apex (le code le fait déjà, mais autant que hPanel le fasse aussi)
3. hPanel → **Emails** : créer la boîte `contact@ecos-sahel.org`
4. hPanel → **Variables d'environnement** : renseigner `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO` — voir [`CONTACT-EMAIL.md`](CONTACT-EMAIL.md)
5. Redéployer, puis envoyer un message de test depuis le formulaire

Tant que le SMTP n'est pas configuré, le formulaire fonctionne quand même : les messages sont enregistrés et consultables dans l'onglet « Messages » de l'admin.

### 3. Tester la suppression d'articles
La correction de l'affichage des erreurs est en place. Si une suppression échoue, la bannière indique maintenant pourquoi :
- « votre rôle ne vous autorise pas… » → policy RLS : un `mali_admin` ne peut pas supprimer un article `burkina`. Comportement normal.
- Un message d'erreur Postgres → `supabase/policies.sql` n'a probablement pas été rejoué en base après la dernière modification du schéma.

### 4. Fichiers restant à fournir
Voir [`MEDIAS-A-FOURNIR.md`](MEDIAS-A-FOURNIR.md) : la plaquette de présentation et le dossier de partenariat.

### 5. Petits plus (non urgent)
- Analytics (Google Analytics ou Plausible)
- Image Open Graph dédiée pour le partage sur réseaux sociaux
- Captcha sur le formulaire si le pot de miel ne suffit pas (hCaptcha ou Turnstile, gratuits)
- `tsconfig.tsbuildinfo` est versionné par erreur — à retirer du dépôt et à ajouter au `.gitignore`

## Comment reprendre demain

Donne-moi ce fichier en début de session (ou dis-moi juste « reprends le fichier PROGRES-ECOS-SAHEL.md ») et je repars directement du point où on s'est arrêtés, sans qu'on ait à tout réexpliquer.
