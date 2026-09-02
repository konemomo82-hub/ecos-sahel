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
      ["Éducation", "Des bibliothèques installées sous les manguiers, pour donner le goût de la lecture aux enfants du quartier."],
      ["Jeunesse", "Des jeunes formés aux métiers de la terre, pour qu'ils puissent vivre de leur travail sans quitter leur village."],
      ["Climat", "Des formations et des reboisements pour aider les familles à mieux vivre les sécheresses et les pluies imprévisibles."],
      ["Cohésion sociale", "Des espaces de dialogue entre jeunes, femmes et anciens, pour apaiser les tensions et avancer ensemble."],
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
      ["Education", "Libraries set up in the shade of mango trees, to give neighbourhood children a taste for reading."],
      ["Youth", "Young people trained in land-based trades, so they can make a living without leaving their village."],
      ["Climate", "Training and reforestation to help families cope with droughts and unpredictable rains."],
      ["Social cohesion", "Spaces for dialogue between young people, women and elders, to ease tensions and move forward together."],
    ],
  },
} as const;

// Contenu provisoire, à relire et corriger par ECOS Sahel.
export const about = {
  intro_fr:
    "ECOS Sahel est le portail commun de deux associations sœurs, ECOS Mali et ECOS Burkina Faso. Elles sont nées du même constat, à savoir que l'éducation et la cohésion sociale sont les premiers leviers de résilience au Sahel, et elles partagent une méthode : partir des besoins exprimés par les communautés, former des relais locaux, et inscrire chaque action dans la durée.",
  intro_en:
    "ECOS Sahel is the shared portal of two sister associations, ECOS Mali and ECOS Burkina Faso. They were born from the same conviction, that education and social cohesion are the first levers of resilience in the Sahel, and they share one method: start from the needs communities express, train local facilitators, and build every action to last.",
  story_fr: [
    "Tout commence en 2002 à Heremankono (quartier de Baco Djicoroni, Bamako), avec les « bibliothèques sous les manguiers » : des bénévoles installent la lecture et le soutien scolaire à l'ombre des arbres, sans inscription ni frais. L'initiative associative se structure à partir de 2004 autour des enfants et des jeunes de Baco Djicoroni, Kalabancoro et Sanankoroba.",
    "ECOS Mali obtient sa reconnaissance officielle le 12 juillet 2021 (agrément N°0413/G-DB, ministère malien de l'Administration territoriale et de la Décentralisation). L'association étend alors son action à la formation agropastorale des jeunes en situation de précarité et aux formations sur le changement climatique.",
    "L'expérience essaime ensuite au Burkina Faso : ECOS Burkina Faso, fondée à Ouagadougou et reconnue en 2024, s'appuie sur le savoir-faire malien en agropastoral tout en développant sa propre dynamique de solidarité communautaire.",
    "Les deux antennes restent autonomes, chacune avec son bureau, ses partenaires et ses financements, mais elles mutualisent leurs outils, leurs contenus pédagogiques et leur communication à travers ce portail.",
  ],
  story_en: [
    "It began in 2002 in Heremankono (Baco Djicoroni, Bamako), with the \"libraries under the mango trees\": volunteers set up reading support in the shade of the trees, with no registration and no fees. The association took shape from 2004 around the children and young people of Baco Djicoroni, Kalabancoro and Sanankoroba.",
    "ECOS Mali received official recognition on 12 July 2021 (registration N°0413/G-DB, Malian Ministry of Territorial Administration and Decentralisation). The association then expanded into agropastoral training for young people in precarious situations and climate-change training.",
    "The approach then spread to Burkina Faso: ECOS Burkina Faso, founded in Ouagadougou and formally recognised in 2024, draws on ECOS Mali's agropastoral know-how while building its own community-solidarity dynamic.",
    "The two branches remain autonomous, each with its own board, partners and funding, but they share their tools, teaching materials and communications through this portal.",
  ],
  values_fr: [
    ["Proximité", "Les projets sont conçus et pilotés par des équipes qui vivent dans les communautés concernées."],
    ["Gratuité d'accès", "Les activités éducatives sont ouvertes à tous les enfants, sans condition d'inscription ni de ressources."],
    ["Transmission", "Chaque action forme des relais locaux capables de la poursuivre sans nous : 10 formateurs climat étaient déjà certifiés en 2024."],
    ["Transparence", "Rapports moral et financier publiés chaque année dans la rubrique Ressources."],
  ],
  values_en: [
    ["Proximity", "Projects are designed and run by teams who live in the communities they serve."],
    ["Free access", "Educational activities are open to every child, with no registration or income requirement."],
    ["Handover", "Every action trains local facilitators able to carry it on without us: 10 climate trainers were already certified in 2024."],
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
    title_fr: "Statuts et règlement intérieur d'ECOS Mali", title_en: "Bylaws and internal rules of ECOS Mali",
    desc_fr: "Les règles de fonctionnement d'ECOS Mali, telles que déposées auprès des autorités maliennes.",
    desc_en: "How ECOS Mali is run, as filed with the Malian authorities.",
    file: "/documents/statuts-reglement-ecos-mali.pdf",
  },
  {
    title_fr: "Statuts et règlement intérieur d'ECOS Burkina Faso", title_en: "Bylaws and internal rules of ECOS Burkina Faso",
    desc_fr: "Les règles de fonctionnement d'ECOS Burkina Faso, telles que déposées auprès des autorités burkinabè.",
    desc_en: "How ECOS Burkina Faso is run, as filed with the Burkinabe authorities.",
    file: "/documents/statuts-reglement-ecos-burkina.pdf",
  },
  {
    title_fr: "Rapport moral 2024 d'ECOS Mali", title_en: "ECOS Mali's 2024 activity report",
    desc_fr: "Ce qu'ECOS Mali a fait en 2024 : nos actions, nos chiffres, et ce qu'on en retient.",
    desc_en: "What ECOS Mali did in 2024: our actions, our numbers, and what we learned.",
    file: "/documents/rapport-moral-mali-2024.pdf",
  },
  {
    title_fr: "Rapport financier 2024 d'ECOS Mali", title_en: "ECOS Mali's 2024 financial report",
    desc_fr: "D'où vient l'argent d'ECOS Mali et comment il a été dépensé en 2024, en toute transparence.",
    desc_en: "Where ECOS Mali's money came from and how it was spent in 2024, in full transparency.",
    file: "/documents/rapport-financier-mali-2024.pdf",
  },
  {
    title_fr: "Plaquette de présentation", title_en: "Presentation brochure",
    desc_fr: "Qui nous sommes et ce que nous faisons, en quelques pages faciles à partager.",
    desc_en: "Who we are and what we do, in a few pages easy to share.",
    file: "/documents/plaquette-ecos-sahel.pdf",
  },
  {
    title_fr: "Dossier de partenariat", title_en: "Partnership pack",
    desc_fr: "Comment nous soutenir concrètement : besoins, budgets et contacts des deux antennes.",
    desc_en: "How to support us in practice: needs, budgets and contacts for both branches.",
    file: "/documents/dossier-partenariat.pdf",
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
      {
        title: "Bibliothèques sous les manguiers",
        text: "L'accès aux livres reste difficile dans beaucoup de quartiers au Mali. Depuis 2002, ECOS Mali installe des bibliothèques à l'ombre des manguiers d'Heremankono. Pas besoin de s'inscrire, pas de frais à payer : juste un coin où les enfants peuvent lire, écouter des contes et faire leurs devoirs avec un adulte présent. En 2024, ça représente 48 séances tenues, 50 enfants suivis (dont 60 % de filles), avec l'appui de 5 jeunes bénévoles.",
        points: [
          "Des bibliothèques installées directement dans les quartiers, sans inscription.",
          "Des séances de contes, des clubs de lecture et du soutien scolaire.",
          "Des livres et manuels adaptés aux réalités locales.",
        ],
      },
      {
        title: "Formation agropastorale",
        text: "Beaucoup de jeunes maliens quittent leur village faute de perspectives. ECOS Mali les forme aux métiers de la terre (pisciculture, maraîchage bio, transformation locale) pour qu'ils puissent gagner leur vie sans partir. En 2024, 52 jeunes en situation de précarité, dont 34 déplacés par le conflit, ont suivi cette formation, et 62 % d'entre eux ont depuis lancé un micro-projet.",
        points: [
          "Formation pratique en élevage, maraîchage et pisciculture.",
          "Accompagnement à la création de petites activités génératrices de revenus.",
          "Un suivi individuel pour aider chacun à démarrer son projet.",
        ],
      },
      {
        title: "Résilience climatique",
        text: "Sécheresses, sols épuisés, pluies de plus en plus imprévisibles : les familles du Sahel sont en première ligne du changement climatique. ECOS Mali forme des relais communautaires aux pratiques agroécologiques et au reboisement, pour que ce savoir reste sur place bien après notre passage. Dix formateurs ont été certifiés lors de l'atelier de Tiebani, en septembre 2024.",
        points: [
          "Des formations en agroécologie et en gestion de l'eau.",
          "Des campagnes de reboisement avec les habitants.",
          "Des relais locaux capables de transmettre ces pratiques à leur tour.",
        ],
      },
      {
        title: "Cohésion sociale",
        text: "La paix ne se décrète pas, elle se construit au quotidien. ECOS Mali crée des espaces où jeunes, femmes et autorités coutumières peuvent se parler, régler leurs différends et monter des projets ensemble, en s'appuyant sur les manières traditionnelles de faire de la médiation.",
        points: [
          "Des rencontres régulières entre générations et groupes du quartier.",
          "Un soutien aux initiatives portées par les femmes et les jeunes.",
          "Un travail de fond sur la gestion pacifique des conflits.",
        ],
      },
    ],
    missions_en: [
      {
        title: "Libraries under the mango trees",
        text: "Access to books is still hard to come by in many Malian neighbourhoods. Since 2002, ECOS Mali has been setting up libraries in the shade of the mango trees in Heremankono. No registration, no fees: just a place where children can read, listen to stories, and do their homework with an adult nearby. In 2024 that meant 48 sessions held, 50 children supported (60% girls), backed by 5 young volunteers.",
        points: [
          "Libraries set up directly in neighbourhoods, no registration needed.",
          "Storytelling sessions, reading clubs and homework support.",
          "Books and materials suited to the local context.",
        ],
      },
      {
        title: "Agropastoral training",
        text: "Many young Malians leave their villages for lack of opportunities. ECOS Mali trains them in land-based trades (fish farming, organic market gardening, local food processing) so they can make a living without leaving home. In 2024, 52 young people in precarious situations, including 34 displaced by conflict, went through this training, and 62% of them have since started a small project of their own.",
        points: [
          "Hands-on training in livestock, market gardening and fish farming.",
          "Support setting up small income-generating activities.",
          "One-to-one follow-up to help each person get their project off the ground.",
        ],
      },
      {
        title: "Climate resilience",
        text: "Droughts, worn-out soil, increasingly unpredictable rains: Sahel families are on the front line of climate change. ECOS Mali trains community facilitators in agroecological practices and reforestation, so this knowledge stays in place long after we've moved on. Ten trainers were certified at the Tiebani workshop in September 2024.",
        points: [
          "Training in agroecology and water management.",
          "Reforestation campaigns with local residents.",
          "Local facilitators able to pass these practices on in turn.",
        ],
      },
      {
        title: "Social cohesion",
        text: "Peace isn't declared, it's built day by day. ECOS Mali creates spaces where young people, women and customary authorities can talk to each other, resolve disagreements and build projects together, drawing on traditional ways of mediating conflict.",
        points: [
          "Regular meetings across generations and neighbourhood groups.",
          "Support for initiatives led by women and young people.",
          "Sustained work on peaceful conflict resolution.",
        ],
      },
    ],
  },
  burkina: {
    name: "ECOS Burkina Faso",
    logo: "/logos/logo-ecos-burkina.png",
    location_fr: "Ouagadougou, Burkina Faso", location_en: "Ouagadougou, Burkina Faso",
    lead_fr: "Président : Ibrahima KONE", lead_en: "President: Ibrahima KONE",
    intro_fr: "ECOS Burkina Faso mobilise les jeunes autour de l'agroécologie, de la solidarité communautaire et de la cohésion sociale.",
    intro_en: "ECOS Burkina Faso mobilises young people around agroecology, community solidarity and social cohesion.",
    missions_fr: [
      {
        title: "Pépinières et reboisement",
        text: "Le désert avance et les terres s'appauvrissent au Burkina Faso. ECOS Burkina Faso participe à l'effort national de la Ceinture Verte en faisant pousser des plants en pépinière et en organisant des journées de plantation avec les écoles et les quartiers, pour redonner un peu de vert au paysage et transmettre aux jeunes le réflexe de prendre soin de leur environnement.",
        points: [
          "Production de plants forestiers et fruitiers adaptés au climat local.",
          "Journées de reboisement avec les écoles et les habitants.",
          "Une contribution concrète à la Ceinture Verte nationale.",
        ],
      },
      {
        title: "Maraîchage sous serre",
        text: "Avec des terres plus rares et de l'eau qui manque, cultiver devient un défi. ECOS Burkina Faso forme les producteurs, les femmes et les jeunes à la culture sous serre et hors sol : une méthode qui économise l'eau, protège les récoltes et permet de produire toute l'année, en ville comme à la campagne.",
        points: [
          "Des formations pratiques à la culture sous serre.",
          "L'installation de serres simples, adaptées aux petits espaces.",
          "Des revenus plus stables pour les familles.",
        ],
      },
      {
        title: "Solidarité et cohésion",
        text: "Le contexte humanitaire au Burkina Faso reste difficile, avec de nombreuses familles déplacées par les crises. ECOS Burkina Faso leur apporte un soutien concret (vivres, kits de première nécessité) et organise des temps de rencontre comme Kaya Nooma, pour recréer du lien entre familles déplacées et communautés d'accueil.",
        points: [
          "Des distributions de vivres et de kits d'urgence aux familles déplacées.",
          "Des événements de rencontre comme Kaya Nooma.",
          "Un travail de fond pour renforcer le dialogue entre communautés.",
        ],
      },
    ],
    missions_en: [
      {
        title: "Nurseries and reforestation",
        text: "The desert is advancing and the land is wearing thin in Burkina Faso. ECOS Burkina Faso takes part in the national Green Belt effort by growing seedlings in nurseries and organising planting days with schools and neighbourhoods, bringing a little green back to the landscape and passing on to young people the habit of caring for their environment.",
        points: [
          "Growing forest and fruit seedlings suited to the local climate.",
          "Reforestation days with schools and residents.",
          "A concrete contribution to the national Green Belt.",
        ],
      },
      {
        title: "Greenhouse market gardening",
        text: "With land growing scarcer and water in short supply, farming is becoming harder. ECOS Burkina Faso trains growers, women and young people in greenhouse and soil-free growing methods: an approach that saves water, protects crops and allows year-round production, in the city as much as in the countryside.",
        points: [
          "Hands-on training in greenhouse growing.",
          "Simple greenhouses suited to small spaces.",
          "More stable income for families.",
        ],
      },
      {
        title: "Solidarity and cohesion",
        text: "The humanitarian situation in Burkina Faso remains difficult, with many families displaced by crises. ECOS Burkina Faso provides them with practical support (food, essential-needs kits) and organises gatherings such as Kaya Nooma, to rebuild ties between displaced families and host communities.",
        points: [
          "Food and emergency-kit distributions for displaced families.",
          "Gatherings such as Kaya Nooma.",
          "Sustained work to strengthen dialogue between communities.",
        ],
      },
    ],
  },
} as const;

export const initialPosts = [
  { title: "Les bibliothèques sous les manguiers", scope: "mali", excerpt: "Comment un coin d'ombre et quelques livres sont devenus un rendez-vous incontournable du quartier." },
  { title: "ECOS Burkina Faso prend son envol", scope: "burkina", excerpt: "Retour sur les premiers mois d'activité de notre antenne burkinabè, entre pépinières et solidarité." },
  { title: "Un Sahel qui se construit ensemble", scope: "portal", excerpt: "Ce qui relie ECOS Mali et ECOS Burkina Faso, au-delà de la frontière." },
];

