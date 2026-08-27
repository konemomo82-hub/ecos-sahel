# Médias et documents à fournir

Ce fichier liste les fichiers attendus, l'endroit où les déposer et la ligne à modifier
ensuite. Tant qu'un fichier est absent, le site reste propre : aucune image cassée,
aucun lien mort — les ressources non fournies s'affichent en « Bientôt disponible ».

## 1. Documents de la rubrique Ressources

Déposer les PDF dans `public/documents/`, avec exactement ces noms de fichiers
(déjà renseignés dans `data/site.ts`, aucune modification de code nécessaire si les
noms correspondent) :

| Document | Nom de fichier exact | Statut |
| --- | --- | --- |
| Statuts et règlement — ECOS Mali | `statuts-reglement-ecos-mali.pdf` | ✅ à déposer |
| Statuts et règlement — ECOS Burkina Faso | `statuts-reglement-ecos-burkina.pdf` | ✅ à déposer |
| Rapport moral 2024 — ECOS Mali | `rapport-moral-mali-2024.pdf` | ✅ à déposer |
| Rapport financier 2024 — ECOS Mali | `rapport-financier-mali-2024.pdf` | ✅ à déposer |
| Plaquette de présentation | `plaquette-ecos-sahel.pdf` | En attente |
| Dossier de partenariat | `dossier-partenariat.pdf` | En attente |

Pour ajouter un document qui n'est pas dans la liste, copier une entrée du tableau
`resources` dans [`data/site.ts`](../data/site.ts) et adapter les quatre champs de
texte + `file`.

## 2. Logos

| Fichier | État actuel | Ce qu'il faudrait |
| --- | --- | --- |
| `public/logos/logo-ecos-sahel.png` | OK, fond transparent | — |
| `public/logos/logo-ecos-mali.png` | OK, fond transparent | — |
| `public/logos/logo-ecos-burkina.png` | ✅ Mis à jour (700 px, fond transparent, extrait du règlement intérieur officiel) | — |

## 3. Photos

Les photos de `public/images/` sont référencées dans le tableau `gallery` de
[`data/site.ts`](../data/site.ts). Chaque entrée porte un champ `antenna`
(`"mali"` ou `"burkina"`) qui détermine deux choses :

- la photo apparaît dans la galerie de l'accueil (toutes les photos y sont) ;
- elle apparaît aussi dans la section « en images » de la page d'antenne correspondante.

Pour ajouter une photo : déposer le fichier dans `public/images/`, puis ajouter une
ligne au tableau `gallery` avec `src`, `antenna`, `alt_fr` et `alt_en`. Les textes
alternatifs sont obligatoires (accessibilité et référencement).

## 4. Image Open Graph (partage réseaux sociaux)

Pas encore en place. Deux options quand ce sera le sujet : fournir une image
1200 × 630 px à déposer dans `public/`, ou la faire générer automatiquement à partir
du logo et de la charte graphique.
