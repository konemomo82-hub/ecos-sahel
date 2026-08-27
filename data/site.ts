export const content = {
  fr: {
    nav: [
      { label: "À propos", id: "a-propos" },
      { label: "Programmes", id: "programmes" },
      { label: "ECOS Mali", id: "ecos-mali", path: "ecos-mali" },
      { label: "ECOS Burkina Faso", id: "ecos-burkina", path: "ecos-burkina" },
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
      { label: "ECOS Mali", id: "ecos-mali", path: "ecos-mali" },
      { label: "ECOS Burkina Faso", id: "ecos-burkina", path: "ecos-burkina" },
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

// Contenu provisoire — à relire et corriger par ECOS Sahel.
export const about = {
  intro_fr:
    "ECOS Sahel est le portail commun de deux associations sœurs, ECOS Mali et ECOS Burkina Faso. Nées d'un même constat — l'éducation et la cohésion sociale sont les premiers leviers de résilience au Sahel — elles partagent une méthode : partir des besoins exprimés par les communautés, former des relais locaux, et inscrire chaque action dans la durée.",
  intro_en:
    "ECOS Sahel is the shared portal of two sister associations, ECOS Mali and ECOS Burkina Faso. Born from the same conviction — that education and social cohesion are the first levers of resilience in the Sahel — they share one method: start from the needs communities express, train local facilitators, and build every action to last.",
  story_fr: [
    "Le travail d'ECOS commence au Mali, autour d'une idée simple : amener les livres là où sont les enfants. Les « bibliothèques sous les manguiers » installent la lecture dans l'espace public du quartier, sans barrière d'inscription ni de frais.",
    "L'expérience s'étend ensuite au Burkina Faso, avec une entrée différente : la jeunesse et l'agroécologie. Pépinières, serres maraîchères et campagnes de plantation y deviennent des supports de formation autant que des projets environnementaux.",
    "Les deux antennes restent autonomes — chacune avec son bureau, ses partenaires et ses financements — mais mutualisent leurs outils, leurs contenus pédagogiques et leur communication à travers ce portail.",
  ],
  story_en: [
    "ECOS's work began in Mali around a simple idea: bring books to where the children already are. The \"libraries under the mango trees\" put reading into the public space of the neighbourhood, with no registration and no fees.",
    "The approach then extended to Burkina Faso through a different entry point: youth and agroecology. Nurseries, market-garden greenhouses and planting campaigns became training grounds as much as environmental projects.",
    "The two branches remain autonomous — each with its own board, partners and funding — but share their tools, teaching materials and communications through this portal.",
  ],
  values_fr: [
    ["Proximité", "Les projets sont conçus et pilotés par des équipes qui vivent dans les communautés concernées."],
    ["Gratuité d'accès", "Les activités éducatives sont ouvertes à tous les enfants, sans condition d'inscription ni de ressources."],
    ["Transmission", "Chaque action forme des relais locaux capables de la poursuivre sans nous."],
    ["Transparence", "Les rapports d'activité et les comptes sont publiés dans la rubrique Ressources."],
  ],
  values_en: [
    ["Proximity", "Projects are designed and run by teams who live in the communities they serve."],
    ["Free access", "Educational activities are open to every child, with no registration or income requirement."],
    ["Handover", "Every action trains local facilitators able to carry it on without us."],
    ["Transparency", "Activity reports and accounts are published in the Resources section."],
  ],
} as const;

// `file` reste `null` tant que le document n'a pas été déposé dans public/documents/.
// Une entrée sans fichier s'affiche en « bientôt disponible » plutôt qu'en lien mort.
export const resources: {
  title_fr: string; title_en: string;
  desc_fr: string; desc_en: string;
  file: string | null;
}[] = [
  {
    title_fr: "Statuts et règlement intérieur — ECOS Mali", title_en: "Bylaws and internal rules — ECOS Mali",
    desc_fr: "Statuts déposés et règlement intérieur de l'association ECOS Mali.",
    desc_en: "Filed articles of association and internal rules for ECOS Mali.",
    file: "/documents/statuts-reglement-ecos-mali.pdf",
  },
  {
    title_fr: "Statuts et règlement intérieur — ECOS Burkina Faso", title_en: "Bylaws and internal rules — ECOS Burkina Faso",
    desc_fr: "Statuts déposés et règlement intérieur de l'association ECOS Burkina Faso.",
    desc_en: "Filed articles of association and internal rules for ECOS Burkina Faso.",
    file: "/documents/statuts-reglement-ecos-burkina.pdf",
  },
  {
    title_fr: "Rapport moral 2024 — ECOS Mali", title_en: "2024 activity report — ECOS Mali",
    desc_fr: "Bilan des actions et de la vie associative d'ECOS Mali pour 2024.",
    desc_en: "Review of ECOS Mali's activities and association life for 2024.",
    file: "/documents/rapport-moral-mali-2024.pdf",
  },
  {
    title_fr: "Rapport financier 2024 — ECOS Mali", title_en: "2024 financial report — ECOS Mali",
    desc_fr: "Bilan financier et comptes annuels d'ECOS Mali pour 2024.",
    desc_en: "Financial statements and annual accounts for ECOS Mali, 2024.",
    file: "/documents/rapport-financier-mali-2024.pdf",
  },
  {
    title_fr: "Plaquette de présentation", title_en: "Presentation brochure",
    desc_fr: "Document de présentation à destination des partenaires et des donateurs.",
    desc_en: "Overview document for partners and donors.",
    file: null,
  },
  {
    title_fr: "Dossier de partenariat", title_en: "Partnership pack",
    desc_fr: "Modalités de partenariat, budgets types et contacts des deux antennes.",
    desc_en: "Partnership terms, indicative budgets and contacts for both branches.",
    file: null,
  },
];

export const gallery = [
  { src: "/images/hero-lecture-mali.jpg", antenna: "mali", alt_fr: "Distribution de livres, ECOS Mali", alt_en: "Book distribution, ECOS Mali" },
  { src: "/images/mali-bibliotheque-manguiers.jpg", antenna: "mali", alt_fr: "Bibliothèque sous les manguiers", alt_en: "Library under the mango trees" },
  { src: "/images/mali-formation-menuiserie.jpg", antenna: "mali", alt_fr: "Formation en menuiserie, jeunesse ECOS Mali", alt_en: "Carpentry training, ECOS Mali youth" },
  { src: "/images/mali-equipe-formation-climat.jpg", antenna: "mali", alt_fr: "Équipe ECOS Mali, formation résilience climatique", alt_en: "ECOS Mali team, climate resilience training" },
  { src: "/images/burkina-pepinieres.jpg", antenna: "burkina", alt_fr: "Pépinières agroforestières, ECOS Burkina", alt_en: "Agroforestry nurseries, ECOS Burkina" },
  { src: "/images/burkina-plantation.jpg", antenna: "burkina", alt_fr: "Campagne de plantation communautaire", alt_en: "Community planting campaign" },
  { src: "/images/burkina-serres.jpg", antenna: "burkina", alt_fr: "Installation de serres, jeunesse ECOS Burkina", alt_en: "Setting up greenhouses, ECOS Burkina youth" },
  { src: "/images/burkina-kaya-nooma-1.jpg", antenna: "burkina", alt_fr: "Distribution solidaire, événement Kaya Nooma", alt_en: "Solidarity distribution, Kaya Nooma event" },
  { src: "/images/burkina-kaya-nooma-2.jpg", antenna: "burkina", alt_fr: "Équipe ECOS Burkina sur le terrain, Kaya Nooma", alt_en: "ECOS Burkina team on site, Kaya Nooma" },
] as const;

export const antennas = {
  mali: {
    name: "ECOS Mali",
    logo: "/logos/logo-ecos-mali.png",
    location_fr: "Bamako, Mali", location_en: "Bamako, Mali",
    lead_fr: "Président : Esaïe Kamaté", lead_en: "President: Esaïe Kamaté",
    intro_fr: "ECOS Mali agit à Bamako et dans ses environs pour l'éducation, l'insertion des jeunes et la résilience climatique des communautés.",
    intro_en: "ECOS Mali works in and around Bamako on education, youth integration and community climate resilience.",
    // Contenu provisoire — à relire et corriger par l'antenne.
    missions_fr: [
      ["Bibliothèques sous les manguiers", "Des espaces de lecture en plein air installés au cœur des quartiers, animés par des bénévoles formés."],
      ["Formation professionnelle", "Menuiserie et métiers manuels : un parcours d'apprentissage pour les jeunes déscolarisés."],
      ["Résilience climatique", "Formation de relais communautaires aux pratiques agroécologiques et à la gestion de l'eau."],
    ],
    missions_en: [
      ["Libraries under the mango trees", "Open-air reading spaces set up in the heart of neighbourhoods, run by trained volunteers."],
      ["Vocational training", "Carpentry and manual trades: an apprenticeship path for young people out of school."],
      ["Climate resilience", "Training community facilitators in agroecological practices and water management."],
    ],
  },
  burkina: {
    name: "ECOS Burkina Faso",
    logo: "/logos/logo-ecos-burkina.png",
    location_fr: "Ouagadougou, Burkina Faso", location_en: "Ouagadougou, Burkina Faso",
    lead_fr: "Président : Ibrahima KONE", lead_en: "President: Ibrahima KONE",
    intro_fr: "ECOS Burkina Faso mobilise les jeunes autour de l'agroécologie, de la solidarité communautaire et de la cohésion sociale.",
    intro_en: "ECOS Burkina Faso mobilises young people around agroecology, community solidarity and social cohesion.",
    // Contenu provisoire — à relire et corriger par l'antenne.
    missions_fr: [
      ["Pépinières et reboisement", "Production de plants et campagnes de plantation communautaire avec les écoles et les quartiers."],
      ["Maraîchage sous serre", "Installation de serres et accompagnement technique des jeunes producteurs."],
      ["Solidarité et cohésion", "Actions de terrain comme Kaya Nooma : distributions solidaires et temps de rencontre intercommunautaires."],
    ],
    missions_en: [
      ["Nurseries and reforestation", "Growing seedlings and running community planting campaigns with schools and neighbourhoods."],
      ["Greenhouse market gardening", "Setting up greenhouses and providing technical support to young growers."],
      ["Solidarity and cohesion", "Field actions such as Kaya Nooma: solidarity distributions and intercommunity gatherings."],
    ],
  },
} as const;

export const initialPosts = [
  { title: "Les bibliothèques sous les manguiers", scope: "mali", excerpt: "Une action historique pour rapprocher les enfants de la lecture." },
  { title: "ECOS Burkina Faso : une dynamique régionale", scope: "burkina", excerpt: "Les activités et les perspectives de l'antenne burkinabè." },
  { title: "Un Sahel solidaire et résilient", scope: "portal", excerpt: "Notre vision commune au Mali et au Burkina Faso." },
];

