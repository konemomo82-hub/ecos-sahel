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
    "Tout commence en 2002 à Heremankono (quartier de Baco Djicoroni, Bamako), avec les « bibliothèques sous les manguiers » : des bénévoles installent la lecture et le soutien scolaire à l'ombre des arbres, sans inscription ni frais. L'initiative associative se structure à partir de 2004 autour des enfants et des jeunes de Baco Djicoroni, Kalabancoro et Sanankoroba.",
    "ECOS Mali obtient sa reconnaissance officielle le 12 juillet 2021 (agrément N°0413/G-DB, ministère malien de l'Administration territoriale et de la Décentralisation). L'association étend alors son action à la formation agropastorale des jeunes en situation de précarité et aux formations sur le changement climatique.",
    "L'expérience essaime ensuite au Burkina Faso : ECOS Burkina Faso, fondée à Ouagadougou et reconnue en 2024, s'appuie sur le savoir-faire malien en agropastoral tout en développant sa propre dynamique de solidarité communautaire.",
    "Les deux antennes restent autonomes — chacune avec son bureau, ses partenaires et ses financements — mais mutualisent leurs outils, leurs contenus pédagogiques et leur communication à travers ce portail.",
  ],
  story_en: [
    "It began in 2002 in Heremankono (Baco Djicoroni, Bamako), with the \"libraries under the mango trees\": volunteers set up reading support in the shade of the trees, with no registration and no fees. The association took shape from 2004 around the children and young people of Baco Djicoroni, Kalabancoro and Sanankoroba.",
    "ECOS Mali received official recognition on 12 July 2021 (registration N°0413/G-DB, Malian Ministry of Territorial Administration and Decentralisation). The association then expanded into agropastoral training for young people in precarious situations and climate-change training.",
    "The approach then spread to Burkina Faso: ECOS Burkina Faso, founded in Ouagadougou and formally recognised in 2024, draws on ECOS Mali's agropastoral know-how while building its own community-solidarity dynamic.",
    "The two branches remain autonomous — each with its own board, partners and funding — but share their tools, teaching materials and communications through this portal.",
  ],
  values_fr: [
    ["Proximité", "Les projets sont conçus et pilotés par des équipes qui vivent dans les communautés concernées."],
    ["Gratuité d'accès", "Les activités éducatives sont ouvertes à tous les enfants, sans condition d'inscription ni de ressources."],
    ["Transmission", "Chaque action forme des relais locaux capables de la poursuivre sans nous — 10 formateurs climat déjà certifiés en 2024."],
    ["Transparence", "Rapports moral et financier publiés chaque année dans la rubrique Ressources."],
  ],
  values_en: [
    ["Proximity", "Projects are designed and run by teams who live in the communities they serve."],
    ["Free access", "Educational activities are open to every child, with no registration or income requirement."],
    ["Handover", "Every action trains local facilitators able to carry it on without us — 10 climate trainers already certified in 2024."],
    ["Transparency", "Activity and financial reports are published every year in the Resources section."],
  ],
  finance_fr:
    "En 2024, ECOS Mali a engagé 18 896 236 FCFA de charges (+9,65 % sur un an), financées à 64 % par des subventions, 34 % par des dons et 2 % par les cotisations des membres. Le détail complet figure dans le rapport financier téléchargeable ci-dessous.",
  finance_en:
    "In 2024, ECOS Mali spent 18,896,236 FCFA (+9.65% year-on-year), funded 64% by grants, 34% by donations and 2% by member dues. Full details are in the downloadable financial report below.",
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
    missions_fr: [
      ["Bibliothèques sous les manguiers", "Nées en 2002 à Heremankono : 48 séances tenues en 2024, 50 enfants suivis (dont 60 % de filles), avec l'appui de 5 jeunes bénévoles."],
      ["Formation agropastorale", "52 jeunes en situation de précarité formés en 2024 — dont 34 déplacés par le conflit — avec 62 % d'insertion en micro-projets locaux."],
      ["Résilience climatique", "10 formateurs communautaires certifiés lors de l'atelier de Tiebani (septembre 2024), relais des pratiques résilientes sur le terrain."],
    ],
    missions_en: [
      ["Libraries under the mango trees", "Started in 2002 in Heremankono: 48 sessions held in 2024, 50 children supported (60% girls), backed by 5 young volunteers."],
      ["Agropastoral training", "52 young people in precarious situations trained in 2024 — including 34 displaced by conflict — with 62% moving into local micro-projects."],
      ["Climate resilience", "10 community trainers certified at the Tiebani workshop (September 2024), carrying resilient practices into the field."],
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

