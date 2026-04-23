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
    brandName: "Scouts Maison de La Paix",
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
      eyebrow: "2026-2027 registration",
      title: "Registrations for the 2026-2027 season are now open",
      paragraphs: [
        "We warmly welcome new scouts, returning scouts, and families who want to discover the association before taking the next step.",
        "Registration is completed directly with the association so the file, questions, fees, and receipt can all be handled clearly and personally.",
      ],
      primaryCta: "Learn How to Join",
      secondaryCta: "Request Information",
      reassuranceItems: [
        "New scouts are welcome",
        "Parents can ask questions first",
        "Registration is completed with the association",
      ],
      mediaEyebrow: "2026-2027 season",
      mediaTitle: "A simple first step into scouting life",
      mediaDescription:
        "The page is here to help families understand the path before completing the official file with the association.",
    },
    overview: {
      title: "Registration at a glance",
      description:
        "The essentials are simple: prepare the file, complete registration in person, and receive a receipt after payment.",
      items: [
        {
          value: "60 MAD",
          label: "Annual registration",
          description: "The seasonal registration fee for each scout.",
        },
        {
          value: "260 MAD",
          label: "New scout with uniform",
          description:
            "Total for a new scout who needs the official shirt and scarf set.",
        },
        {
          value: "In person",
          label: "Direct registration",
          description:
            "The final file is completed directly with the association.",
        },
        {
          value: "Receipt",
          label: "Provided after payment",
          description: "A receipt is provided once the fees are paid.",
        },
      ],
    },
    fees: {
      title: "Registration Fees",
      introduction: [
        "The registration amounts are intentionally clear so families can understand the total quickly.",
        "A returning scout who already has the official uniform only renews the annual registration.",
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
      description:
        "The process is simple and completed directly with the association.",
      steps: [
        {
          title: "Visit or contact us",
          description:
            "You may contact the association first, ask questions, or come discover the group before preparing the full file.",
        },
        {
          title: "Prepare the file",
          description:
            "Bring the required photos, identity copy if applicable, and the authorization form for minors.",
        },
        {
          title: "Complete registration with the association",
          description:
            "The bureau reviews the file directly, answers questions, and confirms the registration details with you.",
        },
        {
          title: "Pay and receive your receipt",
          description:
            "Fees are paid directly to the association, and a receipt is provided.",
        },
      ],
      note:
        "Missing items can often be completed later depending on the case, so registration should not feel like a barrier to joining.",
    },
    documents: {
      title: "Required Documents",
      introduction:
        "To complete the file smoothly, please prepare the following items when needed.",
      items: [
        "Completed registration form",
        "Two standard identity photos",
        "Recto verso photocopy of the National Identity Card for anyone who has one",
        "Required uniform size, if applicable",
      ],
      minorsTitle: "For minors",
      minorsHeading: "Authorization is part of the file",
      minorsNote:
        "The parent or legal guardian authorization form must be completed, signed, and legalized through the local administrative authority before registration is finalized.",
    },
    audiences: {
      title: "Who is this registration for?",
      description:
        "Whether this is your first visit or a seasonal renewal, the registration path is meant to feel clear and welcoming.",
      items: [
        {
          title: "New scouts",
          description:
            "No previous scouting experience is needed. You are welcome to visit, ask questions, and discover the association before completing registration.",
        },
        {
          title: "Returning scouts",
          description:
            "Returning scouts renew their registration for the new season and confirm whether they already have the official uniform.",
        },
        {
          title: "Parents and guardians",
          description:
            "Parents and guardians are welcome to ask questions before registration and complete the required authorization when the future scout is a minor.",
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "Is registration completed online?",
          answer:
            "You can send questions, request information, or express interest through the website, but final registration is completed directly with the association because the file includes physical documents and photos.",
        },
        {
          question: "Can a new scout join without previous scouting experience?",
          answer:
            "Yes, absolutely. New scouts are always welcome even without previous scouting experience.",
        },
        {
          question: "Can parents or guardians ask questions before registration?",
          answer:
            "Yes, of course. They have every right to do so, and we welcome their questions before registration.",
        },
        {
          question: "What do returning scouts pay?",
          answer:
            "If the returning scout already has the official uniform, they renew their registration for 60 MAD for the season.",
        },
        {
          question: "What does a new scout need before coming?",
          answer:
            "Nothing special. They only need curiosity, a willingness to discover the association, and readiness to begin a new experience.",
        },
        {
          question: "What do minors need for registration?",
          answer:
            "For minors, we need two standard identity photos and the authorization form completed by the father, mother, or legal guardian, with the signature legalized through the local authority.",
        },
        {
          question: "Will I receive a receipt after payment?",
          answer:
            "Yes, of course. A receipt is provided after payment, and you may always ask for it if it is not handed to you.",
        },
        {
          question: "Can I submit the file first and complete some documents later?",
          answer:
            "Yes, this is possible depending on the case. We use practical flexibility so registration does not become a barrier to joining.",
        },
        {
          question: "Can the size be chosen later?",
          answer:
            "Yes, the size can be confirmed later if it is not known at the beginning.",
        },
        {
          question: "Is the official uniform necessary?",
          answer:
            "Yes, the official uniform is very important to scouting identity and is especially necessary for official activities, camps, and events where the association represents itself. Sometimes the scarf alone is essential even before the full uniform is complete.",
        },
        {
          question: "Is it better to contact the association before coming?",
          answer:
            "Yes, you may contact us before coming, and we welcome that.",
        },
      ],
    },
    form: {
      title: "Request Information",
      introduction:
        "This form is for first questions and initial interest. It is not the final registration form.",
      note:
        "Families and future scouts may use it to ask about the process, the file, first visits, or uniform details.",
      submitLabel: "Send Request",
      successMessage:
        "Thank you for your interest. We will contact you to explain the next steps.",
      recipientEmail: "contact@scoutsmaisonpaix.org",
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
      messageHelper:
        "You may ask about the registration process, the required file, first visits, or uniform details.",
      reassuranceItems: [
        "A first question is enough to begin.",
        "The final registration is completed with the association.",
        "Families are welcome to ask before visiting.",
      ],
    },
    contact: {
      title: "Contact the Association",
      introduction:
        "For questions about registration, required documents, or meeting times, please contact the association directly.",
      closing:
        "We will be glad to guide you gently through the next step.",
      methods: [
        {
          label: "Phone",
          value: "+212 6571 71003",
          href: "tel:+212657171003",
          description: "Call or message the association directly.",
        },
        {
          label: "Email",
          value: "contact@scoutsmaisonpaix.org",
          href: "mailto:contact@scoutsmaisonpaix.org",
          description: "Write to the association for registration questions.",
        },
        {
          label: "Facebook",
          value: "كشافة دار السلام المغربية",
          href: "https://www.facebook.com/profile.php?id=100067192446286",
          description: "Follow updates and contact the association on Facebook.",
        },
        {
          label: "Instagram",
          value: "scoutsmaisondelapaix",
          href: "https://www.instagram.com/scoutsmaisondelapaix/",
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
    quickLinksTitle: "Quick Links",
    contactTitle: "Contact",
    phoneLabel: "Phone / WhatsApp",
    emailLabel: "Email",
    emailHelper: "Write to the association for registration questions.",
    facebookPlatform: "Facebook",
    instagramPlatform: "Instagram",
    joinLabel: "Join Us",
    copyright: "© {year} Scouts Maison de la Paix. All rights reserved.",
  },
} as const;

export type Messages = WidenLiterals<typeof en>;

export default en;
