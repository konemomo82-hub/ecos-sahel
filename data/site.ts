export const content = {
  fr: {
    nav: [
      { label: "À propos", id: "a-propos" },
      { label: "Programmes", id: "programmes" },
      { label: "ECOS Mali", id: "ecos-mali" },
      { label: "ECOS Burkina Faso", id: "ecos-burkina" },
      { label: "Actualités", id: "actualites" },
      { label: "Galerie", id: "galerie" },
      { label: "Ressources", id: "ressources" },
      { label: "Contact", id: "contact" },
    ],
    heroTitle: "Éduquer, inclure et construire des communautés résilientes.",
    heroText: "ECOS agit au Mali et au Burkina Faso pour offrir aux enfants, aux jeunes et aux communautés vulnérables des opportunités d'apprentissage, d'autonomie et d'engagement citoyen.",
    programs: [
      ["Éducation", "Bibliothèques sous les manguiers et accès à la lecture."],
      ["Jeunesse", "Formation et insertion agropastorale des jeunes."],
      ["Climat", "Sensibilisation, agroécologie et résilience communautaire."],
      ["Cohésion sociale", "Initiatives locales pour le vivre-ensemble."],
    ],
  },
  en: {
    nav: [
      { label: "About", id: "a-propos" },
      { label: "Programmes", id: "programmes" },
      { label: "ECOS Mali", id: "ecos-mali" },
      { label: "ECOS Burkina Faso", id: "ecos-burkina" },
      { label: "News", id: "actualites" },
      { label: "Gallery", id: "galerie" },
      { label: "Resources", id: "ressources" },
      { label: "Contact", id: "contact" },
    ],
    heroTitle: "Educating, including and building resilient communities.",
    heroText: "ECOS works in Mali and Burkina Faso to give children, young people and vulnerable communities opportunities to learn, become self-reliant and take civic action.",
    programs: [
      ["Education", "Libraries under mango trees and access to reading."],
      ["Youth", "Training and agropastoral integration for young people."],
      ["Climate", "Awareness, agroecology and community resilience."],
      ["Social cohesion", "Local initiatives that strengthen living together."],
    ],
  },
} as const;

export const gallery = [
  { src: "/images/hero-lecture-mali.jpg", alt_fr: "Distribution de livres, ECOS Mali", alt_en: "Book distribution, ECOS Mali" },
  { src: "/images/mali-bibliotheque-manguiers.jpg", alt_fr: "Bibliothèque sous les manguiers", alt_en: "Library under the mango trees" },
  { src: "/images/mali-formation-menuiserie.jpg", alt_fr: "Formation en menuiserie, jeunesse ECOS Mali", alt_en: "Carpentry training, ECOS Mali youth" },
  { src: "/images/mali-equipe-formation-climat.jpg", alt_fr: "Équipe ECOS Mali, formation résilience climatique", alt_en: "ECOS Mali team, climate resilience training" },
  { src: "/images/burkina-pepinieres.jpg", alt_fr: "Pépinières agroforestières, ECOS Burkina", alt_en: "Agroforestry nurseries, ECOS Burkina" },
  { src: "/images/burkina-plantation.jpg", alt_fr: "Campagne de plantation communautaire", alt_en: "Community planting campaign" },
  { src: "/images/burkina-serres.jpg", alt_fr: "Installation de serres, jeunesse ECOS Burkina", alt_en: "Setting up greenhouses, ECOS Burkina youth" },
  { src: "/images/burkina-kaya-nooma-1.jpg", alt_fr: "Distribution solidaire, événement Kaya Nooma", alt_en: "Solidarity distribution, Kaya Nooma event" },
  { src: "/images/burkina-kaya-nooma-2.jpg", alt_fr: "Équipe ECOS Burkina sur le terrain, Kaya Nooma", alt_en: "ECOS Burkina team on site, Kaya Nooma" },
];

export const initialPosts = [
  { title: "Les bibliothèques sous les manguiers", scope: "mali", excerpt: "Une action historique pour rapprocher les enfants de la lecture." },
  { title: "ECOS Burkina Faso : une dynamique régionale", scope: "burkina", excerpt: "Les activités et les perspectives de l'antenne burkinabè." },
  { title: "Un Sahel solidaire et résilient", scope: "portal", excerpt: "Notre vision commune au Mali et au Burkina Faso." },
];

