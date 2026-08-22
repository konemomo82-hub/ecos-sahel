export const content = {
  fr: {
    nav: ["À propos", "Programmes", "ECOS Mali", "ECOS Burkina Faso", "Actualités", "Ressources", "Contact"],
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
    nav: ["About", "Programmes", "ECOS Mali", "ECOS Burkina Faso", "News", "Resources", "Contact"],
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

export const initialPosts = [
  { title: "Les bibliothèques sous les manguiers", scope: "mali", excerpt: "Une action historique pour rapprocher les enfants de la lecture." },
  { title: "ECOS Burkina Faso : une dynamique régionale", scope: "burkina", excerpt: "Les activités et les perspectives de l'antenne burkinabè." },
  { title: "Un Sahel solidaire et résilient", scope: "portal", excerpt: "Notre vision commune au Mali et au Burkina Faso." },
];

