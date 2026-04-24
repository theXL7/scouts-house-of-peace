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
    joinLabel: "Nous rejoindre",
  },
  hero: {
    backgroundAlt: "Des scouts réunis dehors dans une lumière dorée et chaleureuse.",
    logoAlt: "Logo des Scouts Maison de la Paix",
    eyebrow: "Scouts Maison de la Paix",
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
  joinPage: {
    metaTitle: "Nous rejoindre | Scouts Maison de La Paix",
    metaDescription:
      "Informations d'inscription pour la saison 2026-2027 chez Scouts Maison de La Paix, avec les frais, les documents demandés, les moyens de contact et le formulaire de pré-inscription.",
    hero: {
      eyebrow: "Inscription 2026-2027",
      title: "Les inscriptions pour la saison 2026-2027 sont ouvertes",
      paragraphs: [
        "Nous accueillons chaleureusement les nouveaux scouts, les scouts qui reviennent et les familles qui souhaitent découvrir l'association avant de passer à l'étape suivante.",
        "L'inscription se finalise directement avec l'association afin que le dossier, les questions, les frais et le reçu soient traités clairement et personnellement.",
      ],
      primaryCta: "Découvrir comment nous rejoindre",
      secondaryCta: "Demander des informations",
      reassuranceItems: [
        "Les nouveaux scouts sont les bienvenus",
        "Les parents peuvent poser leurs questions",
        "L'inscription se finalise avec l'association",
      ],
      mediaEyebrow: "Saison 2026-2027",
      mediaTitle: "Un premier pas simple vers la vie scoute",
      mediaDescription:
        "Cette page aide les familles à comprendre le parcours avant de compléter le dossier officiel avec l'association.",
    },
    overview: {
      title: "L'inscription en un coup d'œil",
      description:
        "L'essentiel est simple : préparer le dossier, finaliser l'inscription en présentiel et recevoir un reçu après le paiement.",
      items: [
        {
          value: "60 MAD",
          label: "Inscription annuelle",
          description: "Les frais d'inscription saisonniers pour chaque scout.",
        },
        {
          value: "260 MAD",
          label: "Nouveau scout avec uniforme",
          description:
            "Le total pour un nouveau scout qui a besoin de la chemise officielle et du foulard.",
        },
        {
          value: "En présentiel",
          label: "Inscription directe",
          description:
            "Le dossier final est complété directement avec l'association.",
        },
        {
          value: "Reçu",
          label: "Remis après paiement",
          description: "Un reçu est remis une fois les frais payés.",
        },
      ],
    },
    fees: {
      title: "Frais d'inscription",
      introduction: [
        "Les montants d'inscription sont volontairement clairs afin que les familles comprennent rapidement le total.",
        "Un scout qui revient et possède déjà l'uniforme officiel renouvelle uniquement son inscription annuelle.",
      ],
      cardEyebrow: "Inscription",
      items: [
        {
          title: "Inscription annuelle",
          amount: "60 MAD",
          description:
            "Les frais d'inscription annuelle sont de 60 MAD par scout pour la saison 2026-2027.",
        },
        {
          title: "Uniforme scout officiel",
          amount: "200 MAD",
          description:
            "L'ensemble de l'uniforme scout officiel comprend la chemise scoute et le foulard, préparés selon la taille.",
          details: ["Tailles disponibles : S, M, L, XL"],
        },
      ],
      summaryTitle: "Totaux de saison",
      summaryHeading: "Des montants saisonniers clairs",
      summary: [
        {
          title: "Total pour un nouveau scout",
          amount: "260 MAD",
          description:
            "Total pour un nouveau scout ayant besoin de l'uniforme : 260 MAD.",
        },
        {
          title: "Total pour un scout qui revient",
          amount: "60 MAD",
          description:
            "Les scouts qui reviennent et possèdent déjà leur uniforme paient 60 MAD.",
        },
      ],
    },
    process: {
      title: "Comment se déroule l'inscription",
      description:
        "Le processus est simple et se fait directement avec l'association.",
      steps: [
        {
          title: "Nous rendre visite ou nous contacter",
          description:
            "Vous pouvez d'abord contacter l'association, poser vos questions ou venir découvrir le groupe avant de préparer le dossier complet.",
        },
        {
          title: "Préparer le dossier",
          description:
            "Apportez les photos demandées, la copie d'identité si nécessaire et l'autorisation pour les mineurs.",
        },
        {
          title: "Finaliser l'inscription avec l'association",
          description:
            "Le bureau vérifie le dossier directement, répond aux questions et confirme avec vous les détails de l'inscription.",
        },
        {
          title: "Payer et recevoir le reçu",
          description:
            "Les frais sont payés directement à l'association, et un reçu est remis.",
        },
      ],
      note:
        "Les éléments manquants peuvent souvent être complétés plus tard selon la situation, afin que l'inscription ne devienne pas un obstacle pour rejoindre le groupe.",
    },
    documents: {
      title: "Documents demandés",
      introduction:
        "Pour compléter le dossier facilement, merci de préparer les éléments suivants lorsque cela s'applique.",
      items: [
        "Formulaire d'inscription complété",
        "Deux photos d'identité standard",
        "Photocopie recto verso de la carte nationale d'identité pour toute personne qui en possède une",
        "Taille de l'uniforme demandé, si nécessaire",
      ],
      minorsTitle: "Pour les mineurs",
      minorsHeading: "L'autorisation fait partie du dossier",
      minorsNote:
        "L'autorisation du parent ou du tuteur légal doit être complétée, signée et légalisée auprès de l'autorité administrative locale avant la finalisation de l'inscription.",
    },
    audiences: {
      title: "À qui s'adresse cette inscription ?",
      description:
        "Que ce soit une première visite ou un renouvellement saisonnier, le parcours d'inscription est pensé pour être clair et accueillant.",
      items: [
        {
          title: "Nouveaux scouts",
          description:
            "Aucune expérience scoute préalable n'est nécessaire. Vous êtes les bienvenus pour visiter, poser vos questions et découvrir l'association avant de compléter l'inscription.",
        },
        {
          title: "Scouts qui reviennent",
          description:
            "Les scouts qui reviennent renouvellent leur inscription pour la nouvelle saison et confirment s'ils possèdent déjà l'uniforme officiel.",
        },
        {
          title: "Parents et tuteurs",
          description:
            "Les parents et tuteurs peuvent poser leurs questions avant l'inscription et compléter l'autorisation demandée lorsque le futur scout est mineur.",
        },
      ],
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "L'inscription se fait-elle en ligne ?",
          answer:
            "Vous pouvez envoyer des questions, demander des informations ou manifester votre intérêt via le site, mais l'inscription finale se fait directement avec l'association car le dossier comprend des documents et des photos physiques.",
        },
        {
          question:
            "Un nouveau scout peut-il rejoindre sans expérience scoute préalable ?",
          answer:
            "Oui, absolument. Les nouveaux scouts sont toujours les bienvenus, même sans expérience scoute préalable.",
        },
        {
          question:
            "Les parents ou tuteurs peuvent-ils poser des questions avant l'inscription ?",
          answer:
            "Oui, bien sûr. Ils en ont pleinement le droit, et nous accueillons leurs questions avant l'inscription.",
        },
        {
          question: "Combien paie un scout qui revient ?",
          answer:
            "Si le scout qui revient possède déjà l'uniforme officiel, il renouvelle son inscription pour 60 MAD pour la saison.",
        },
        {
          question: "Que doit préparer un nouveau scout avant de venir ?",
          answer:
            "Rien de spécial. Il suffit de venir avec de la curiosité, l'envie de découvrir l'association et la disponibilité pour commencer une nouvelle expérience.",
        },
        {
          question: "Que faut-il pour l'inscription des mineurs ?",
          answer:
            "Pour les mineurs, nous demandons deux photos d'identité standard et l'autorisation complétée par le père, la mère ou le tuteur légal, avec la signature légalisée auprès de l'autorité locale.",
        },
        {
          question: "Vais-je recevoir un reçu après le paiement ?",
          answer:
            "Oui, bien sûr. Un reçu est remis après le paiement, et vous pouvez toujours le demander s'il ne vous est pas remis directement.",
        },
        {
          question:
            "Puis-je déposer le dossier d'abord et compléter certains documents plus tard ?",
          answer:
            "Oui, cela peut être possible selon la situation. Nous gardons une flexibilité pratique afin que l'inscription ne devienne pas un obstacle.",
        },
        {
          question: "La taille peut-elle être choisie plus tard ?",
          answer:
            "Oui, la taille peut être confirmée plus tard si elle n'est pas connue au début.",
        },
        {
          question: "L'uniforme officiel est-il nécessaire ?",
          answer:
            "Oui, l'uniforme officiel est très important pour l'identité scoute. Il est particulièrement nécessaire pour les activités officielles, les camps et les événements où l'association se représente. Parfois, le foulard seul est essentiel avant même que l'uniforme complet soit prêt.",
        },
        {
          question:
            "Est-il préférable de contacter l'association avant de venir ?",
          answer:
            "Oui, vous pouvez nous contacter avant de venir, et nous vous y accueillons volontiers.",
        },
      ],
    },
    form: {
      title: "Demander des informations",
      introduction:
        "Ce formulaire sert aux premières questions et aux premiers contacts. Ce n'est pas le formulaire d'inscription final.",
      note:
        "Les familles et futurs scouts peuvent l'utiliser pour poser des questions sur le parcours, le dossier, les premières visites ou les détails de l'uniforme.",
      submitLabel: "Envoyer la demande",
      successMessage:
        "Merci pour votre intérêt. Nous vous contacterons pour expliquer les prochaines étapes.",
      recipientEmail: "contact@scoutsmaisonpaix.org",
      emailSubject: "Demande de pré-inscription - Scouts Maison de La Paix",
      fields: {
        fullName: "Nom complet",
        guardianName: "Nom du parent ou tuteur, si nécessaire",
        phone: "Numéro de téléphone",
        email: "Adresse e-mail",
        age: "Âge du futur scout",
        status: "Nouveau scout ou scout qui revient",
        hasUniform: "Le scout possède-t-il déjà l'uniforme ?",
        size: "Taille demandée, si elle est connue",
        message: "Message ou question",
      },
      statusOptions: ["Nouveau scout", "Scout qui revient"],
      uniformOptions: [
        "Oui, le scout possède déjà l'uniforme",
        "Non, le scout a besoin de l'uniforme",
        "Pas encore sûr",
      ],
      sizeOptions: ["S", "M", "L", "XL", "Pas encore sûr"],
      messagePlaceholder:
        "Partagez toute question sur l'inscription, les documents demandés, les horaires de rencontre ou les tailles d'uniforme.",
      messageHelper:
        "Vous pouvez poser une question sur le parcours d'inscription, le dossier demandé, les premières visites ou les détails de l'uniforme.",
      reassuranceItems: [
        "Une première question suffit pour commencer.",
        "L'inscription finale se fait avec l'association.",
        "Les familles sont les bienvenues avant une visite.",
      ],
    },
    contact: {
      title: "Contacter l'association",
      introduction:
        "Pour toute question sur l'inscription, les documents demandés ou les horaires de rencontre, merci de contacter directement l'association.",
      closing:
        "Nous serons heureux de vous accompagner calmement vers la prochaine étape.",
      methods: [
        {
          label: "Téléphone",
          value: "+212 6571 71003",
          href: "tel:+212657171003",
          description: "Appelez ou écrivez directement à l'association.",
        },
        {
          label: "E-mail",
          value: "contact@scoutsmaisonpaix.org",
          href: "mailto:contact@scoutsmaisonpaix.org",
          description:
            "Écrivez à l'association pour vos questions d'inscription.",
        },
        {
          label: "Facebook",
          value: "كشافة دار السلام المغربية",
          href: "https://www.facebook.com/profile.php?id=100067192446286",
          description:
            "Suivez les actualités et contactez l'association sur Facebook.",
        },
        {
          label: "Instagram",
          value: "scoutsmaisondelapaix",
          href: "https://www.instagram.com/scoutsmaisondelapaix/",
          description:
            "Découvrez les activités récentes et envoyez un message sur Instagram.",
        },
      ],
    },
    downloads: {
      title: "Téléchargement des formulaires",
      heading: "Espace prévu pour les futurs formulaires",
      description:
        "Cet espace est préparé afin que les formulaires d'inscription et d'autorisation puissent être partagés ici dès qu'ils seront prêts.",
      status: "Les formulaires à télécharger seront ajoutés ici bientôt.",
    },
  },
  footer: {
    title: "Scouts Maison de la Paix",
    description:
      "Bâtir une culture de paix par le scoutisme, la communauté et l’appartenance partagée.",
    navAriaLabel: "Navigation de pied de page",
    quickLinksTitle: "Explorer",
    contactTitle: "Contact",
    phoneLabel: "Téléphone / WhatsApp",
    emailLabel: "E-mail",
    emailHelper: "Écrivez à l’association pour toute question d’inscription.",
    facebookPlatform: "Facebook",
    instagramPlatform: "Instagram",
    joinLabel: "Nous rejoindre",
    copyright: "© {year} Scouts Maison de la Paix — Tous droits réservés.",
  },
} satisfies DeepPartial<Messages>;

export default fr;
