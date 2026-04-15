import type { Messages } from "./en";
import type { DeepPartial } from "./shared";

const fr = {
  meta: {
    description: "Page d'accueil des Scouts Maison de La Paix.",
  },
  navigation: [
    { label: "À propos", href: "#house-of-peace" },
    { label: "Programmes", href: "#activities" },
    { label: "Impact", href: "#impact" },
    { label: "Contact", href: "#contact" },
  ],
  actions: {
    explore: "Découvrir",
  },
  header: {
    ariaLabel: "Navigation principale",
    languageSwitcherLabel: "Sélecteur de langue",
    toggleNavigationLabel: "Ouvrir le menu de navigation",
  },
  hero: {
    backgroundAlt: "Des scouts réunis dehors dans une lumière dorée et chaleureuse.",
    logoAlt: "Logo des Scouts de la Maison de la Paix",
    eyebrow: "Scouts de la Maison de la Paix",
    titleLines: ["Construire", "une culture de paix", "par le scoutisme"],
    description:
      "Donner aux jeunes et aux communautés les moyens d'agir par le service, l'éducation et l'ouverture au monde.",
    primaryCta: "Rejoindre le mouvement",
    secondaryCta: "Découvrir notre mission",
  },
  trustStrip: {
    ariaLabel: "Reconnaissance et confiance",
    officialTextStart:
      "Soutenu par des institutions publiques, civiques et éducatives",
    officialTextEnd:
      "Présent à la croisée de la jeunesse, de la culture et de la vie locale",
    networkTextStart:
      "Relié à des réseaux scouts, de paix et de société civile",
    networkTextEnd: "Ancré dans le service, le dialogue et l'appartenance",
    logos: {
      ministryEducation: "Ministère de l'Éducation",
      regionalAcademyOriental: "Académie régionale de l'Oriental",
      communeTaourirt: "Commune de Taourirt",
      ministryYouthSports: "Ministère de la Jeunesse et des Sports",
      partnerOrganization: "Organisation partenaire",
      moroccanRedCrescent: "Croissant-Rouge marocain",
      arabicCalligraphy: "Calligraphie arabe",
      moroccanScoutingLeague: "Ligue du Scoutisme Marocain",
      nationalFederationMoroccanScouting:
        "Fédération nationale du scoutisme marocain",
      worldOrganizationScoutMovement:
        "Organisation mondiale du mouvement scout",
      may16LivingTogetherPeace: "16 Mai / Vivre ensemble dans la paix",
    },
  },
  houseOfPeace: {
    eyebrow: "LA MAISON DE LA PAIX",
    titleLines: [
      "Un lieu où les jeunes apprennent,",
      "servent et grandissent ensemble.",
    ],
    intro:
      "Maison de La Paix est un lieu d'appartenance, où le scoutisme, l'éducation et le service transforment la paix en une réalité vécue chaque jour.",
    body:
      "Enracinée dans la communauté et ouverte sur le monde, elle cultive la responsabilité, le respect mutuel et la capacité de bien vivre à travers les différences.",
    tags: ["Coexistence", "Appartenance", "Épanouissement"],
  },
  values: {
    eyebrow: "NOS VALEURS",
    title:
      "Des valeurs qui guident notre manière d'apprendre, de servir et de grandir ensemble.",
    description:
      "Ce sont les principes discrets qui aident cette communauté à apprendre, servir et grandir ensemble dans la paix.",
    cards: [
      {
        title: "Coexistence",
        description:
          "Nous rassemblons des personnes différentes dans le respect, le dialogue et la responsabilité partagée.",
      },
      {
        title: "Service",
        description:
          "Nous servons nos communautés par des actions qui renforcent le soin, la solidarité et l'appartenance.",
      },
      {
        title: "Éducation à la paix",
        description:
          "Nous transmettons la paix comme une pratique, à travers l'apprentissage, le leadership et l'expérience vécue.",
      },
      {
        title: "Épanouissement personnel",
        description:
          "Nous aidons les jeunes à grandir en caractère, en confiance, en sens et en esprit de service.",
      },
    ],
  },
  activities: {
    eyebrow: "Programmes",
    title: "Des expériences qui transforment les valeurs en aventures vécues.",
    description:
      "Un aperçu des moments où la communauté, le défi et la paix prennent vie.",
    cards: [
      {
        title: "Camps et aventures",
        description:
          "Des nuits étoilées, des feux partagés et une confiance qui grandit en plein air.",
        kicker: "Vie au grand air",
        imageAlt:
          "Des personnes rassemblées autour d'un feu de camp en extérieur, la nuit.",
      },
      {
        title: "Ateliers et apprentissages",
        description:
          "Des moments concrets qui transforment les idées en compétences et en action.",
        kicker: "Apprentissage",
        imageAlt:
          "Des enfants et un adulte travaillant ensemble lors d'un atelier créatif.",
      },
      {
        title: "Service communautaire",
        description:
          "Une attention concrète aux personnes, aux lieux et au sentiment d'appartenance au quotidien.",
        kicker: "Service",
        imageAlt:
          "Des bénévoles vérifiant une fiche pendant une action de nettoyage dans un parc.",
      },
      {
        title: "Événements internationaux",
        description:
          "Des rencontres qui élargissent les horizons et relient le local au global.",
        kicker: "Échange",
        imageAlt:
          "Des jeunes réunis et profitant ensemble d'un événement en plein air.",
      },
    ],
  },
  scoutingCulture: {
    eyebrow: "Culture scoute",
    title: "La culture derrière le parcours.",
    description:
      "Derrière chaque camp, projet de service, réunion de patrouille et aventure partagée se trouve un langage plus profond de la vie scoute, façonné par la formation, les symboles, les chants, la responsabilité et les liens de la communauté.",
    tags: [
      "Vie de patrouille",
      "Formation",
      "Traditions partagées",
      "La paix en pratique",
    ],
    cta: "Découvrir la culture scoute et la formation",
    cards: [
      { title: "Traditions et mémoire collective" },
      { title: "Niveaux et progression" },
      { title: "Vie de patrouille et responsabilité partagée" },
      { title: "Symboles, chants et identité commune" },
    ],
  },
  globalMovement: {
    eyebrow: "Un mouvement mondial pour la paix",
    title:
      "Un travail scout local relié à une vision internationale plus large.",
    paragraphs: [
      "L'esprit de la Maison de la Paix commence dans la vie quotidienne de la communauté, mais il ne s'arrête pas là. Chaque acte de service, d'apprentissage et de coexistence devient une part d'une histoire plus vaste, partagée avec des personnes qui croient que la paix se construit ensemble.",
      "À travers les rencontres internationales, le 16 Mai et les relations au-delà des frontières, notre action grandit du local vers un lien vivant avec un mouvement mondial pour la dignité, le dialogue et l'appartenance.",
    ],
    cta: "Découvrir nos liens internationaux",
    mapAriaLabel:
      "Carte montrant les liens de Maison de La Paix entre le Maroc et des pays partenaires",
    moroccoLabel: "Taourirt, Maroc",
    nodes: [
      { name: "Espagne", label: "Échange transfrontalier" },
      { name: "France", label: "Échange de jeunes" },
      { name: "Belgique", label: "Éducation à la paix" },
      { name: "Pays-Bas", label: "Liens de leadership" },
      { name: "Allemagne", label: "Apprentissage partagé" },
      { name: "Suisse", label: "Réseau de dialogue" },
      { name: "Pologne", label: "Partenariats régionaux" },
      { name: "Algérie", label: "Coopération de voisinage" },
      { name: "Tunisie", label: "Amitié méditerranéenne" },
      { name: "Égypte", label: "Construction commune de la paix" },
      { name: "Liban", label: "Dialogue et solidarité" },
      { name: "États-Unis", label: "Solidarité mondiale" },
      { name: "Madagascar", label: "Amitié de l'océan Indien" },
    ],
  },
  impact: {
    eyebrow: "NOTRE IMPACT",
    title:
      "Une histoire en pleine croissance, façonnée par le service, l'apprentissage et la communauté.",
    description:
      "Ces chiffres reflètent des années d'effort partagé, une présence fidèle et des relations qui continuent à transformer la vie quotidienne par la paix, l'apprentissage et le service.",
    stats: [
      {
        label: "années de scoutisme centré sur la paix et de présence communautaire",
      },
      {
        label: "jeunes et membres de la communauté rejoints ensemble",
      },
      {
        label: "camps, activités et moments de service partagés",
      },
      {
        label: "pays reliés par le dialogue et l'échange",
      },
    ],
    footnote:
      "Chaque chiffre renvoie à des personnes, des lieux et des engagements communs qui continuent de grandir avec nous.",
    cta: "Voir les expériences derrière l'impact",
  },
  joinUs: {
    eyebrow: "REJOIGNEZ-NOUS",
    title: "Il y a une place pour vous dans ce travail de paix.",
    description:
      "Que vous soyez un jeune prêt à grandir, une famille en quête d'appartenance ou un partenaire qui partage cette vision, vous êtes le bienvenu pour construire avec nous une communauté plus paisible.",
    audienceTags: ["Scouts", "Familles", "Bénévoles", "Partenaires"],
    waysTitle: "Façons de participer",
    waysDescription:
      "Commencez par le chemin qui vous ressemble le plus, et nous pourrons avancer ensemble à partir de là.",
    scoutCta: "Rejoindre comme scout",
    partnerCta: "Devenir partenaire",
    footnote:
      "Nous accueillons les jeunes, les familles, les bénévoles et les institutions qui veulent contribuer avec soin et sens.",
  },
  footer: {
    title: "Scouts de la Maison de la Paix",
    description:
      "Construire une culture de paix par le scoutisme, la communauté et une appartenance partagée.",
    navAriaLabel: "Navigation de pied de page",
    tagline: "Enraciné dans le service communautaire et ouvert à des liens plus larges.",
    note: "Version source anglaise du site pour Scouts Maison de La Paix.",
  },
} satisfies DeepPartial<Messages>;

export default fr;
