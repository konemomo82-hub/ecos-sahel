# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Portail bilingue (FR/EN) d'ECOS Sahel, regroupant deux associations sœurs : **ECOS Mali** (Bamako) et **ECOS Burkina Faso** (Ouagadougou). Le site est en français ; l'UI, les commentaires et les commits sont rédigés en français.

`docs/PROGRES-ECOS-SAHEL.md` est le journal de projet (état d'avancement, priorités à venir) — le lire au début d'une session et le mettre à jour quand un jalon est atteint.

## Commandes

```bash
npm install          # dépendances
npm run dev          # serveur de dev (http://localhost:3000 → redirige vers /fr)
npm run build        # build de production
npm run start        # serveur de production
npx tsc --noEmit     # vérification des types (tsconfig est en noEmit)
```

Pas de tests ni de configuration ESLint dans le dépôt : `npm run lint` déclenche l'assistant de configuration de Next et ne doit pas être lancé sans intention explicite. La vérification avant commit = `npx tsc --noEmit` puis `npm run build`.

## Stack et déploiement

Next.js 15 (App Router) + React 19 + TypeScript strict, Supabase (Postgres + Auth + Storage). CSS global unique (`app/globals.css`, variables CSS + classes utilitaires maison) — pas de Tailwind ni de CSS Modules.

Déploiement : app Node.js Hostinger connectée à la branche `main` du dépôt GitHub (`npm ci` → `npm run build` → `npm run start`). Variables d'environnement à définir dans hPanel. Voir `docs/HOSTINGER.md`.

Variables (`.env.local` en local, cf. `.env.example`) :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Aucune clé `service_role` ne doit apparaître dans le code : tout accès passe par la clé anon + RLS.

## Architecture

### Deux sources de contenu

1. **`data/site.ts`** — contenu statique bilingue codé en dur : navigation, textes hero, programmes, galerie photo (`public/images/`), fiches des deux antennes. Les champs bilingues suivent la convention `x_fr` / `x_en` ; le composant choisit avec `locale === "en" ? x_en : x_fr`. `initialPosts` sert de contenu de repli quand Supabase ne renvoie rien.
2. **Table `posts` de Supabase** — articles éditoriaux gérés depuis `/[locale]/admin`.

### Le client Supabase peut être `null`

`lib/supabase.ts` exporte `null` si les variables d'environnement manquent. **Chaque consommateur doit tester `if (supabase)`** : les pages serveur retombent alors sur `initialPosts` ou une liste vide, et `/admin` affiche un écran « Configuration requise ». Ne jamais supposer que le client existe.

### Routage locale

L'i18n est fait à la main, sans bibliothèque : le segment `[locale]` vaut `"fr"` ou `"en"`, `app/page.tsx` redirige `/` → `/fr`, et `app/[locale]/page.tsx` déclare `generateStaticParams()` pour ces deux valeurs. Toute nouvelle page vit sous `app/[locale]/` et reçoit `params: Promise<{ locale: "fr" | "en" }>` (params asynchrones de Next 15 — toujours `await params`). Les liens internes doivent être préfixés par `/${locale}`.

### Périmètres de publication (`scopes`)

Un article porte un tableau `scopes` parmi `portal` / `mali` / `burkina`. C'est le mécanisme central de diffusion :
- **Accueil** (`app/[locale]/page.tsx`) : un article est éclaté en une carte **par scope** (`flatMap` sur `p.scopes`), et le lien pointe vers la page d'antenne pour `mali`/`burkina`, vers l'article pour `portal`.
- **Pages d'antenne** (`ecos-mali`, `ecos-burkina`) : filtrées par `.contains("scopes", [scopeKey])`, rendues par le helper partagé `app/components/AntennaPage.tsx` (`renderAntennaPage`).
- **Rôles** : `super_admin` (tous les scopes), `mali_admin` (`portal` + `mali`), `burkina_admin` (`portal` + `burkina`). L'UI admin restreint les cases à cocher, mais l'autorisation réelle vient des policies RLS.

### Cache et revalidation

- Accueil : ISR, `export const revalidate = 300`.
- Pages d'antenne et pages article : `export const dynamic = "force-dynamic"`.
- Après publication ou suppression depuis l'admin, un `POST /api/revalidate` (`app/api/revalidate/route.ts`) purge `/fr` et `/en`. Cette route n'est pas authentifiée et ne fait que revalider ; si de nouvelles routes deviennent ISR, les ajouter là.

### Espace admin

`app/[locale]/admin/page.tsx` est un composant client unique et autonome (auth par mot de passe Supabase, CRUD articles, médiathèque). Il n'y a pas de route API côté serveur : le navigateur parle directement à Supabase avec la clé anon, donc **toute règle d'autorisation doit exister en SQL** dans `supabase/policies.sql`, pas seulement dans le JSX.

Le contenu des articles est du **Markdown** rendu avec `react-markdown` sur la page article. L'insertion d'image écrit un `![](url)` à la position du curseur dans le textarea.

### Images

- Images locales de `public/` → `next/image`.
- Images Supabase Storage → balise `<img>` classique. `next.config.ts` a `remotePatterns: []`, donc `next/image` **rejetterait** ces URL distantes ; ne pas convertir ces `<img>` en `<Image>` sans ajouter d'abord le domaine Supabase aux `remotePatterns`.
- Bucket public `site-media`, préfixe `covers/`. Malgré son nom, la colonne `cover_image_path` stocke l'**URL publique complète**, pas un chemin relatif.

## Base de données

Les scripts SQL s'exécutent à la main dans le SQL Editor de Supabase, dans cet ordre :

1. `supabase/reset.sql` — remise à zéro (destructif : supprime tables, types, triggers, policies).
2. `supabase/schema.sql` — types `user_role` / `publication_scope`, tables `profiles`, `posts`, `media`, RLS activé, lecture publique des articles publiés.
3. `supabase/policies.sql` — helper `current_user_role()` (`security definer`, évite la récursion RLS), trigger de création automatique du profil à l'inscription, policies CRUD par scope, bucket `site-media` et ses policies Storage.

Toute modification de schéma doit être répercutée dans ces fichiers : ils sont la seule source de vérité du schéma (pas de migrations versionnées).

## Encodage

Le dépôt a déjà subi un bug de mojibake UTF-8 sur l'ensemble des textes. Tous les fichiers contiennent des accents français : écrire et enregistrer strictement en UTF-8, et vérifier visuellement les accents (`é`, `à`, `ï`) après toute édition en masse ou tout script de transformation.
