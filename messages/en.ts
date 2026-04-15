import type { WidenLiterals } from "./shared";

const en = {
  meta: {
    title: "Scouts Maison de La Paix",
    description: "Homepage for Scouts Maison de La Paix.",
  },
  languageLabels: {
    en: "EN",
    fr: "FR",
    ar: "AR",
  },
  navigation: [
    { label: "About", href: "#house-of-peace" },
    { label: "Programs", href: "#activities" },
    { label: "Impact", href: "#impact" },
    { label: "Contact", href: "#contact" },
  ],
  actions: {
    explore: "Explore",
  },
  header: {
    ariaLabel: "Primary navigation",
    languageSwitcherLabel: "Language switcher",
    toggleNavigationLabel: "Toggle navigation menu",
    brandName: "Maison de La Paix",
    brandLogoAlt: "Scouts Maison de La Paix logo",
    joinLabel: "Join Us",
  },
  hero: {
    backgroundAlt: "Scouts gathered outdoors in warm golden light.",
    logoAlt: "Scouts of the House of Peace logo",
    eyebrow: "Scouts of the House of Peace",
    titleLines: ["Building a", "Culture of Peace", "Through Scouting"],
    description:
      "Empowering young people and communities through service, education, and global connection.",
    primaryBadge: "2026-2027",
    primaryCta: "Registrations Open · Join the Movement",
    secondaryCta: "Discover Our Mission",
  },
  trustStrip: {
    ariaLabel: "Recognition and trust",
    officialTextStart: "Supported by public, civic, and educational institutions",
    officialTextEnd: "Working across youth, culture, and local community life",
    networkTextStart:
      "Connected to scouting, peace, and civil-society networks",
    networkTextEnd: "Rooted in service, dialogue, and belonging",
    logos: {
      ministryEducation: "Ministry of Education",
      regionalAcademyOriental: "Regional Academy of Oriental",
      communeTaourirt: "Commune of Taourirt",
      ministryYouthSports: "Ministry of Youth and Sports",
      anef: "ANEF",
      anouarSalam: "Anouar Salam",
      fncv: "FNCV",
      partnerOrganization: "Partner Organization",
      moroccanRedCrescent: "Moroccan Red Crescent",
      anaMawhoob: "Ana Mawhoob",
      arabicCalligraphy: "Arabic Calligraphy",
      moroccanScoutingLeague: "Moroccan Scouting League",
      nationalFederationMoroccanScouting:
        "National Federation of Moroccan Scouting",
      worldOrganizationScoutMovement:
        "World Organization of the Scout Movement",
      scoutsMusulmansFrance: "Scouts Musulmans de France",
      onsg: "ONSG",
      shm: "SHM",
      aisaOng: "AISA ONG",
      may16LivingTogetherPeace: "16 May / Living Together in Peace",
      huisVanVrede: "Huis Van Vrede",
      scoutsMusulmansEspagne: "Scouts Musulmans d'Espagne",
      may16: "16 Mai",
    },
  },
  houseOfPeace: {
    eyebrow: "THE HOUSE OF PEACE",
    titleLines: [
      "Where young people learn,",
      "serve, and grow together.",
    ],
    intro:
      "Maison de La Paix is a place of belonging, where scouting, education, and service help turn peace into something lived each day.",
    body:
      "Rooted in community and open to the wider world, it nurtures responsibility, mutual respect, and the ability to live well across differences.",
    tags: ["Coexistence", "Belonging", "Growth"],
  },
  values: {
    eyebrow: "OUR VALUES",
    title: "Values that guide how we learn, serve, and grow together.",
    description:
      "They are the quiet principles that help this community learn, serve, and grow in peace together.",
    cards: [
      {
        title: "Coexistence",
        description:
          "We bring people together across differences with respect, dialogue, and shared responsibility.",
      },
      {
        title: "Service",
        description:
          "We serve our communities through action that strengthens care, solidarity, and belonging.",
      },
      {
        title: "Peace Education",
        description:
          "We teach peace as a practice through learning, leadership, and lived experience.",
      },
      {
        title: "Personal Growth",
        description:
          "We help young people grow in character, confidence, purpose, and service.",
      },
    ],
  },
  activities: {
    eyebrow: "Programs",
    title: "Experiences that turn values into lived adventure.",
    description:
      "A glimpse of the moments where community, challenge, and peace come to life.",
    cards: [
      {
        title: "Camps and Adventures",
        description:
          "Night skies, shared fires, and confidence built outdoors.",
        kicker: "Outdoor life",
        imageAlt: "People gathered around a campfire outdoors at night.",
      },
      {
        title: "Workshops and Learning",
        description:
          "Hands-on moments that turn ideas into skills and action.",
        kicker: "Learning",
        imageAlt:
          "Children and an adult working together during a crafts workshop.",
      },
      {
        title: "Community Service",
        description:
          "Practical care for people, place, and everyday belonging.",
        kicker: "Service",
        imageAlt:
          "Volunteers checking a clipboard during a community cleanup in a park.",
      },
      {
        title: "International Events",
        description:
          "Encounters that open horizons and connect local to global.",
        kicker: "Exchange",
        imageAlt:
          "Young people gathering and enjoying an outdoor event together.",
      },
    ],
  },
  scoutingCulture: {
    eyebrow: "Scouting Culture",
    title: "The culture behind the journey.",
    description:
      "Behind every camp, service project, patrol meeting, and shared adventure is a deeper language of scouting life, shaped by formation, symbols, songs, responsibility, and the bonds of community.",
    tags: [
      "Patrol life",
      "Formation",
      "Shared traditions",
      "Peace in practice",
    ],
    cta: "Explore Scouting Culture & Formation",
    cards: [
      { title: "Traditions & Collective Memory" },
      { title: "Levels & Growth" },
      { title: "Patrol Life & Shared Responsibility" },
      { title: "Symbols, Songs & Shared Identity" },
    ],
  },
  globalMovement: {
    eyebrow: "A Global Movement for Peace",
    title:
      "Local scouting work connected to a wider international vision.",
    paragraphs: [
      "The spirit of the House of Peace begins in everyday community life, but it does not end there. Each act of service, learning, and coexistence becomes part of a wider story shared with people who believe that peace is built together.",
      "Through international encounters, May 16, and relationships across borders, our work grows from local action into a living connection with a global movement for dignity, dialogue, and belonging.",
    ],
    cta: "Explore Our Global Connections",
    mapAriaLabel:
      "Map showing Maison de La Paix connections from Morocco to partner countries",
    moroccoLabel: "Taourirt, Morocco",
    nodes: [
      { name: "Spain", label: "Cross-border exchange" },
      { name: "France", label: "Youth exchange" },
      { name: "Belgium", label: "Peace education" },
      { name: "Netherlands", label: "Leadership ties" },
      { name: "Germany", label: "Shared learning" },
      { name: "Switzerland", label: "Dialogue network" },
      { name: "Poland", label: "Regional partnerships" },
      { name: "Algeria", label: "Neighbouring cooperation" },
      { name: "Tunisia", label: "Mediterranean friendship" },
      { name: "Egypt", label: "Shared peacebuilding" },
      { name: "Lebanon", label: "Dialogue and solidarity" },
      { name: "United States", label: "Global solidarity" },
      { name: "Madagascar", label: "Indian Ocean friendship" },
    ],
  },
  impact: {
    eyebrow: "OUR IMPACT",
    title: "A growing story shaped by service, learning, and community.",
    description:
      "These numbers reflect years of shared effort, steady presence, and relationships that continue to shape everyday life through peace, learning, and service.",
    stats: [
      {
        value: 16,
        suffix: "+",
        label: "years of peace-centered scouting and community presence",
      },
      {
        value: 1000,
        suffix: "+",
        label: "young people and community members reached together",
      },
      {
        value: 100,
        suffix: "+",
        label: "shared camps, activities, and moments of service",
      },
      {
        value: 7,
        suffix: "+",
        label: "countries connected through dialogue and exchange",
      },
    ],
    footnote:
      "Each figure points back to people, places, and shared commitments still growing with us.",
    cta: "See the experiences behind the impact",
  },
  joinUs: {
    eyebrow: "2026-2027 REGISTRATION",
    title: "Registration for the 2026-2027 season is now open.",
    description:
      "Future scouts, returning scouts, and families can now review the official process, required documents, and contact options before completing registration in person with the association.",
    audienceTags: [
      "Future scouts",
      "Returning scouts",
      "Families",
      "Questions welcome",
    ],
    waysTitle: "Start with the official registration guide",
    waysDescription:
      "See the fees, documents, contact channels, and pre-registration request form prepared for the 2026-2027 season.",
    scoutCta: "Learn How to Join",
    partnerCta: "Request Information",
    footnote:
      "Registration is completed directly with the association, and bureau receipts are provided for payments made in cash.",
  },
  joinPage: {
    metaTitle: "Join Us | Scouts Maison de La Paix",
    metaDescription:
      "Registration information for the 2026-2027 season at Scouts Maison de La Paix, including fees, required documents, contact details, and the pre-registration request form.",
    hero: {
      title: "Registrations for the 2026-2027 season are now open",
      paragraphs: [
        "We welcome new and returning scouts to join a community rooted in peace, responsibility, service, and shared growth.",
        "Registration, paperwork, and payment are completed directly with the association.",
      ],
      primaryCta: "Learn How to Join",
      secondaryCta: "Request Information",
      overviewEyebrow: "2026-2027 season",
      overviewTitle: "Registration at a glance",
      overviewDescription:
        "Public registration information is now focused on the official seasonal process, with clear fees and direct contact channels.",
      overviewItems: [
        "Annual registration is 60 MAD per scout.",
        "New scouts who need the official uniform pay 260 MAD in total.",
        "Documents are reviewed in person and payments are received in cash.",
      ],
    },
    fees: {
      title: "Registration Fees",
      introduction: [
        "The annual registration fee is 60 MAD per scout.",
        "For new scouts who need the official uniform, the shirt and scarf set costs 200 MAD.",
      ],
      cardEyebrow: "Registration",
      items: [
        {
          title: "Annual Registration",
          amount: "60 MAD",
          description:
            "The annual registration fee is 60 MAD per scout for the 2026-2027 season.",
        },
        {
          title: "Official Scout Uniform",
          amount: "200 MAD",
          description:
            "The official scout uniform set includes the scout shirt and scarf and is prepared according to size.",
          details: ["Available sizes: S, M, L, XL"],
        },
      ],
      summaryTitle: "Season totals",
      summaryHeading: "Clear seasonal totals",
      summary: [
        {
          title: "New scout total",
          amount: "260 MAD",
          description:
            "Total for a new scout needing the uniform: 260 MAD.",
        },
        {
          title: "Returning scout total",
          amount: "60 MAD",
          description:
            "Returning scouts who already have their uniform: 60 MAD.",
        },
      ],
    },
    process: {
      title: "How Registration Works",
      paragraphs: [
        "Registration is completed in person with the association.",
        "Documents are reviewed directly, payment is made in cash, and a receipt is provided by the bureau.",
      ],
      steps: [
        {
          title: "In-person registration",
          description:
            "Registration is finalized directly with the association rather than through an online payment flow.",
        },
        {
          title: "Document review",
          description:
            "The bureau reviews the paperwork directly and can answer questions during the process.",
        },
        {
          title: "Cash payment",
          description:
            "Payment is made in cash when the registration file is completed with the association.",
        },
        {
          title: "Receipt from the bureau",
          description:
            "A receipt is provided by the bureau after payment is received.",
        },
      ],
    },
    documents: {
      title: "Required Documents",
      introduction:
        "Bring the registration file with the exact items below so the bureau can review it directly.",
      items: [
        "Completed registration form",
        "Two standard identity photos",
        "Recto verso photocopy of the National Identity Card for anyone who has one",
        "Required uniform size, if applicable",
        "For minors: parent or legal guardian authorization form, completed, signed, and legalized through the local administrative authority",
      ],
      minorsTitle: "For minors",
      minorsHeading: "Authorization is part of the file",
      minorsNote:
        "The parent or legal guardian authorization form must be completed, signed, and legalized through the local administrative authority before registration is finalized.",
    },
    scouts: {
      title: "New and Returning Scouts",
      paragraphs: [
        "New scouts are always welcome.",
        "New scouts are introduced to the values and responsibilities of scouting and officially welcomed through the Scout Promise Ceremony.",
        "Returning scouts are also welcome to renew their registration for the new season.",
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "Is registration completed online?",
          answer:
            "No. The request form is only for questions or pre-registration interest. Registration is finalized in person with the association.",
        },
        {
          question: "What does a new scout pay?",
          answer:
            "A new scout who needs the official uniform pays 260 MAD in total: 60 MAD for annual registration and 200 MAD for the shirt and scarf set.",
        },
        {
          question: "What do returning scouts pay?",
          answer:
            "Returning scouts who already have their uniform renew their registration at 60 MAD for the season.",
        },
        {
          question: "What do minors need for registration?",
          answer:
            "For minors, the parent or legal guardian authorization form must be completed, signed, and legalized through the local administrative authority.",
        },
      ],
    },
    form: {
      title: "Request Information",
      introduction:
        "This pre-registration interest form is for future scouts, returning scouts, and families who would like to ask questions or share their interest before visiting the association.",
      note:
        "It is not the final registration form. Sending it prepares an email request to the association, and registration is completed in person with the association.",
      submitLabel: "Send Request",
      successMessage: "Thank you. We will contact you with the next steps.",
      recipientEmail: "scoutmaisondelapaix@gmail.com",
      emailSubject: "Pre-registration request - Scouts Maison de La Paix",
      fields: {
        fullName: "Full name",
        guardianName: "Parent or guardian name (if applicable)",
        phone: "Phone number",
        email: "Email address",
        age: "Age of future scout",
        status: "New scout or returning scout",
        hasUniform: "Does the scout already have the uniform?",
        size: "Required size, if known",
        message: "Message or question",
      },
      statusOptions: ["New scout", "Returning scout"],
      uniformOptions: [
        "Yes, the scout already has the uniform",
        "No, the scout needs the uniform",
        "Not sure yet",
      ],
      sizeOptions: ["S", "M", "L", "XL", "Not sure yet"],
      messagePlaceholder:
        "Share any question about registration, required documents, meeting times, or uniform sizing.",
    },
    contact: {
      title: "Contact the Association",
      introduction:
        "For questions about registration, required documents, or meeting times, please contact the association directly.",
      methods: [
        {
          label: "Phone",
          value: "+212657171003",
          href: "tel:+212657171003",
          description: "Call or message the association directly.",
        },
        {
          label: "Email",
          value: "scoutmaisondelapaix@gmail.com",
          href: "mailto:scoutmaisondelapaix@gmail.com",
          description: "Write to the association for registration questions.",
        },
        {
          label: "Facebook",
          value: "Scouts Maison de La Paix",
          href: "https://www.facebook.com/profile.php?id=100067192446286",
          description: "Follow updates and contact the association on Facebook.",
        },
        {
          label: "Instagram",
          value: "@scouts.maison_de_la_paix",
          href: "https://www.instagram.com/scouts.maison_de_la_paix/",
          description: "See recent activity and send a message on Instagram.",
        },
      ],
    },
    downloads: {
      title: "Forms Download",
      heading: "Space prepared for future form downloads",
      description:
        "This area is being prepared so registration and authorization forms can be shared here as soon as they are ready.",
      status: "Form downloads will be added here soon.",
    },
  },
  footer: {
    title: "Scouts of the House of Peace",
    description:
      "Building a culture of peace through scouting, community, and shared belonging.",
    navAriaLabel: "Footer navigation",
    joinLabel: "Join Us",
    tagline: "Rooted in community service and open to wider connection.",
    note: "English site foundation for Scouts Maison de La Paix.",
  },
} as const;

export type Messages = WidenLiterals<typeof en>;

export default en;
