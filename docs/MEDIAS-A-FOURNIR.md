# Médias et documents à fournir

Ce fichier liste les fichiers attendus, l'endroit où les déposer et la ligne à modifier
ensuite. Tant qu'un fichier est absent, le site reste propre : aucune image cassée,
aucun lien mort — les ressources non fournies s'affichent en « Bientôt disponible ».

## 1. Documents de la rubrique Ressources

Déposer les PDF dans `public/documents/`, puis renseigner le champ `file` correspondant
dans le tableau `resources` de [`data/site.ts`](../data/site.ts).

| Document | Nom de fichier suggéré | `file` à renseigner |
| --- | --- | --- |
| Statuts de l'association | `statuts-ecos.pdf` | `"/documents/statuts-ecos.pdf"` |
| Rapport d'activités 2024 | `rapport-activites-2024.pdf` | `"/documents/rapport-activites-2024.pdf"` |
| Plaquette de présentation | `plaquette-ecos-sahel.pdf` | `"/documents/plaquette-ecos-sahel.pdf"` |
| Dossier de partenariat | `dossier-partenariat.pdf` | `"/documents/dossier-partenariat.pdf"` |

Exemple de modification :

```ts
{
  title_fr: "Rapport d'activités 2024", title_en: "2024 activity report",
  desc_fr: "…", desc_en: "…",
  file: "/documents/rapport-activites-2024.pdf",   // au lieu de null
},
```

Pour ajouter un document qui n'est pas dans la liste, copier une entrée du tableau et
adapter les quatre champs de texte + `file`.

## 2. Logos

| Fichier | État actuel | Ce qu'il faudrait |
| --- | --- | --- |
| `public/logos/logo-ecos-sahel.png` | OK, fond transparent | — |
| `public/logos/logo-ecos-mali.png` | OK, fond transparent | — |
| `public/logos/logo-ecos-burkina.png` | Basse résolution (294 × 145 px) | Remplacer par un fichier d'au moins 600 px de large, fond transparent, même nom de fichier |

Garder les mêmes noms de fichiers : aucun code n'est à modifier, il suffit d'écraser
le fichier existant.

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
