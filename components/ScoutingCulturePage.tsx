import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocaleDocument from "@/components/LocaleDocument";
import ScarfDivider from "@/components/ScarfDivider";
import ScoutStagesShowcase from "@/components/ScoutStagesShowcase";
import { withBasePath } from "@/lib/site";
import { getPageBreadcrumbs, serializeJsonLd } from "@/lib/seo";
import {
  getDirection,
  getJoinUsPath,
  getLocalePath,
  getMessages,
  type Locale,
} from "@/messages";

type SectionId =
  | "stages"
  | "groups"
  | "naming"
  | "rituals"
  | "songs"
  | "philosophy";

type StageKey = "cub" | "junior" | "advanced" | "rover";
type NamingKey = "sadasiya" | "talia" | "dawriya" | "raht";
type RitualKey =
  | "flag"
  | "salute"
  | "uniform"
  | "promise"
  | "acceptance"
  | "campfire";
type ArchiveKey =
  | "reports"
  | "activityLogs"
  | "photoArchive"
  | "visits"
  | "camps"
  | "certificates"
  | "achievements"
  | "collectiveMemory";
type IconKind =
  | "chart"
  | "flag"
  | "music"
  | "archive"
  | "users"
  | "document"
  | "notebook"
  | "camera"
  | "compass"
  | "fire"
  | "certificate"
  | "star"
  | "quote"
  | "uniform"
  | "promise"
  | "growth"
  | "cross";

type StageCopy = {
  title: string;
  age: string;
  summary: string;
  unit: string;
  smallGroup: string;
  leader: string;
  scarf: string;
  extraNote?: string;
  goals: string[];
  methods: string[];
  outcomes: string[];
  notes: Array<{
    title: string;
    description: string;
  }>;
  groupCardSummary: string;
  groupCardDescription: string;
  namingCta: string;
};

type NamingCopy = {
  title: string;
  summary: string;
  examples: string[];
  meaning: string;
  note: string;
};

type RitualCopy = {
  title: string;
  summary: string;
  imageAlt: string;
  details: Array<{
    title: string;
    description: string;
  }>;
};

type PageCopy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    quickFacts: Array<{
      title: string;
      description: string;
    }>;
    badge: {
      label: string;
      title: string;
      description: string;
    };
    identityCard: {
      title: string;
      description: string;
      chips: string[];
      partnerNote: string;
    };
  };
  quickLinks: Array<{
    id: SectionId;
    title: string;
    description: string;
  }>;
  sectionNav: Array<{
    id: SectionId;
    label: string;
  }>;
  stagesSection: {
    eyebrow: string;
    title: string;
    description: string;
    phases: string[];
    stageBadge: string;
    unitLabel: string;
    smallGroupLabel: string;
    leaderLabel: string;
    scarfLabel: string;
    goalsTitle: string;
    methodsTitle: string;
    outcomesTitle: string;
    detailsLabel: string;
  };
  groupsSection: {
    eyebrow: string;
    title: string;
    description: string;
    tableHeaders: {
      stage: string;
      unit: string;
      smallGroup: string;
      size: string;
      leader: string;
      scarf: string;
    };
  };
  namingSection: {
    eyebrow: string;
    title: string;
    description: string;
    examplesTitle: string;
    meaningTitle: string;
    noteTitle: string;
  };
  ritualsSection: {
    eyebrow: string;
    title: string;
    description: string;
    featureEyebrow: string;
    featureDescription: string;
    values: Array<{
      title: string;
      description: string;
    }>;
  };
  songsSection: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
    placeholder: {
      title: string;
      description: string;
      label: string;
      hints: string[];
    };
  };
  archiveSection: {
    eyebrow: string;
    title: string;
    description: string;
    featureEyebrow: string;
    featureDescription: string;
  };
  philosophySection: {
    eyebrow: string;
    title: string;
    description: string;
    pillars: string[];
  };
  conclusion: {
    eyebrow: string;
    text: string;
    cta: string;
  };
  stages: Record<StageKey, StageCopy>;
  namingGroups: Record<NamingKey, NamingCopy>;
  rituals: Record<RitualKey, RitualCopy>;
  archiveItems: Record<ArchiveKey, { title: string; description: string }>;
};

const heroAssets = {
  cloudsBase: withBasePath("/scouting-culture-v2/clouds-base.png"),
  levelsGear: withBasePath("/scouting-culture-v2/levels-gear.png"),
  scoutsOnPath: withBasePath("/scouting-culture-v2/scouts-on-path.png"),
  symbolsAndSongs: withBasePath("/scouting-culture-v2/symbols-and-songs.png"),
  salute: withBasePath(
    "/scouting-culture-v2/Scout%20in%20salute%20with%20emblem.png",
  ),
  campfire: withBasePath("/scouting-culture-v2/patrol-campfire.png"),
  archivePhoto: withBasePath("/media/house-of-peace/house-of-peace-04.webp"),
  associationLogo: withBasePath("/logos/scouts-maison-paix-green-logo.png"),
  leagueLogo: withBasePath(
    "/logos/partners/ligue-du-scoutisme-marocain.png",
  ),
} as const;

const stageConfig = [
  {
    key: "cub" as const,
    namingId: "naming-sadasiya",
    accent: "#D7B63A",
    borderColor: "#D7B63A40",
    iconSrc: withBasePath("/scouting-culture-v2/stage-icons/cubs-brownies.png"),
    background:
      "linear-gradient(180deg, #FFF7DA 0%, rgba(255,255,255,0.84) 100%)",
  },
  {
    key: "junior" as const,
    namingId: "naming-talia",
    accent: "#D97A24",
    borderColor: "#D97A2440",
    iconSrc: withBasePath("/scouting-culture-v2/stage-icons/junior-guides.png"),
    background:
      "linear-gradient(180deg, #FFF0E2 0%, rgba(255,255,255,0.84) 100%)",
  },
  {
    key: "advanced" as const,
    namingId: "naming-dawriya",
    accent: "#C54C46",
    borderColor: "#C54C4640",
    iconSrc: withBasePath(
      "/scouting-culture-v2/stage-icons/advanced-rangers.png",
    ),
    background:
      "linear-gradient(180deg, #FFF0EE 0%, rgba(255,255,255,0.84) 100%)",
  },
  {
    key: "rover" as const,
    namingId: "naming-raht",
    accent: "#3B6BB5",
    borderColor: "#3B6BB540",
    iconSrc: withBasePath("/scouting-culture-v2/stage-icons/rovers-guides.png"),
    background:
      "linear-gradient(180deg, #EEF4FF 0%, rgba(255,255,255,0.84) 100%)",
  },
] as const;

const namingConfig = [
  { key: "sadasiya" as const, id: "naming-sadasiya" },
  { key: "talia" as const, id: "naming-talia" },
  { key: "dawriya" as const, id: "naming-dawriya" },
  { key: "raht" as const, id: "naming-raht" },
] as const;

const ritualConfig: ReadonlyArray<{
  key: RitualKey;
  imageSrc: string;
  icon: IconKind;
  defaultOpen?: boolean;
}> = [
  {
    key: "flag" as const,
    imageSrc: heroAssets.symbolsAndSongs,
    icon: "flag" as const,
    defaultOpen: true,
  },
  {
    key: "salute" as const,
    imageSrc: heroAssets.salute,
    icon: "users" as const,
  },
  {
    key: "uniform" as const,
    imageSrc: heroAssets.symbolsAndSongs,
    icon: "uniform" as const,
  },
  {
    key: "promise" as const,
    imageSrc: heroAssets.symbolsAndSongs,
    icon: "promise" as const,
  },
  {
    key: "acceptance" as const,
    imageSrc: heroAssets.levelsGear,
    icon: "growth" as const,
  },
  {
    key: "campfire" as const,
    imageSrc: heroAssets.campfire,
    icon: "fire" as const,
  },
] as const;

const quickLinkIcons: Record<SectionId, IconKind> = {
  stages: "chart",
  groups: "users",
  naming: "users",
  rituals: "flag",
  songs: "music",
  philosophy: "cross",
};

const pageCopyByLocale: Record<Locale, PageCopy> = {
  en: {
    hero: {
      eyebrow: "Official reference for formation and shared identity",
      title: "The Scout System of Scouts Maison de La Paix",
      description:
        "This system is built on progressive education, small groups, scout symbols, rituals, leadership, and learning by doing until values become a lived daily practice.",
      primaryCta: "Start with the scout stages",
      quickFacts: [
        {
          title: "Progression",
          description: "From discovery to leadership and service.",
        },
        {
          title: "Small group",
          description: "Living learning and shared responsibility.",
        },
        {
          title: "Shared identity",
          description: "Symbols, songs, and a collective memory.",
        },
      ],
      badge: {
        label: "Official identity",
        title: "Scouts Maison de La Paix",
        description:
          "A reference page that presents the structure of the scout system, its stages, its rituals, and the memory that shapes the spirit of the group.",
      },
      identityCard: {
        title: "Scouts Maison de La Paix",
        description:
          "Progression, belonging, service, and leadership are not separate compartments. They are connected threads in the formation of a scout.",
        chips: ["Neckerchief", "Rituals", "Shared memory"],
        partnerNote:
          "A supportive credibility presence within the wider Moroccan scouting space.",
      },
    },
    quickLinks: [
      {
        id: "stages",
        title: "Scout units and stages",
        description:
          "Discover the four stages and the educational path inside the association.",
      },
      {
        id: "rituals",
        title: "Symbols and rituals",
        description:
          "Flag raising, salute, uniform, promise, and shared educational ceremonies.",
      },
      {
        id: "songs",
        title: "Songs and identity",
        description:
          "The emotional space where voice, meaning, and shared belonging meet.",
      },
    ],
    sectionNav: [
      { id: "stages", label: "Stages" },
      { id: "groups", label: "Units" },
      { id: "naming", label: "Naming" },
      { id: "rituals", label: "Symbols" },
      { id: "songs", label: "Songs" },
      { id: "philosophy", label: "Philosophy" },
    ],
    stagesSection: {
      eyebrow: "Scout stages",
      title: "Scout stages",
      description:
        "Each young member progresses through connected stages that respect psychological, social, and cognitive growth, and give every age its own tools and fitting responsibilities.",
      phases: ["Discovery", "Responsibility", "Leadership", "Service"],
      stageBadge: "Scout stage",
      unitLabel: "Unit",
      smallGroupLabel: "Small group",
      leaderLabel: "Leader",
      scarfLabel: "Scarf color",
      goalsTitle: "Goals",
      methodsTitle: "Methods",
      outcomesTitle: "Educational effects",
      detailsLabel: "View details",
    },
    groupsSection: {
      eyebrow: "Units and small groups",
      title: "Units and small groups",
      description:
        "The scout system distinguishes between the larger unit that frames the stage and the small group where daily learning, direct responsibility, and team spirit are lived.",
      tableHeaders: {
        stage: "Stage",
        unit: "Unit",
        smallGroup: "Small group",
        size: "Members",
        leader: "Leader",
        scarf: "Scarf color",
      },
    },
    namingSection: {
      eyebrow: "Naming and calls",
      title: "Naming and calls",
      description:
        "Names and calls build the inner identity of each small group. They distinguish it, unite its members around a shared rhythm, and carry a simple educational meaning.",
      examplesTitle: "Examples of calls",
      meaningTitle: "Symbolic meaning",
      noteTitle: "Educational note",
    },
    ritualsSection: {
      eyebrow: "Symbols, rituals, and shared identity",
      title: "Symbols, rituals, and shared identity",
      description:
        "Symbols and rituals give scouting its special language. They organize beginnings, frame transitions, strengthen emotion, and make belonging visible in behavior, gesture, and atmosphere.",
      featureEyebrow: "Shared identity that goes beyond words",
      featureDescription:
        "From flag raising to the campfire circle, recurring scout scenes become part of memory and shape how a member understands the group.",
      values: [
        {
          title: "Respect",
          description:
            "A good ritual makes respect visible in posture, salute, and listening.",
        },
        {
          title: "Discipline",
          description:
            "Organized symbols turn a collective moment into a practical exercise in attention and commitment.",
        },
        {
          title: "Memory",
          description:
            "Repeated symbols create an emotional memory that survives from one season to the next.",
        },
      ],
    },
    songsSection: {
      eyebrow: "Songs and shared identity",
      title: "Songs and shared identity",
      description:
        "Songs in scouting are not decorative. They are a central part of emotional and educational formation, shaping shared tone, memory, and collective feeling.",
      cards: [
        {
          title: "Official anthem",
          description:
            "The official anthem becomes the voice of the association in gatherings, celebrations, and public representation.",
        },
        {
          title: "Stage songs and calls",
          description:
            "Each stage has its own rhythm, suited to the age of the members while remaining tied to the wider scout identity.",
        },
        {
          title: "The association's sound identity",
          description:
            "Voice in scouting is not an accessory. It is a method of education, presence, and collective feeling.",
        },
        {
          title: "Emotional memory",
          description:
            "Repeated songs, calls, and campfire moments build a memory that returns every season.",
        },
      ],
      placeholder: {
        title: "Reserved space for the official anthem",
        description:
          "This area is ready for the official anthem text or an approved audio player so the page can remain a single reference point for the association.",
        label: "Ready to be inserted",
        hints: [
          "Official lyrics",
          "Audio recording",
          "Links to collective performance",
        ],
      },
    },
    archiveSection: {
      eyebrow: "Reports and collective memory",
      title: "Reports and collective memory",
      description:
        "This section preserves the path of the association, documents its activities, and builds an organized memory that future generations can return to for continuity and evaluation.",
      featureEyebrow: "From living memory",
      featureDescription:
        "Collective memory does not preserve documents only. It preserves faces, encounters, and the moments that make the association's impact visible over time.",
    },
    philosophySection: {
      eyebrow: "System philosophy",
      title: "System philosophy",
      description:
        "The scout system rests on learning by doing, calm progression, the small group, leadership, service, and belonging. It is a path that builds character, strengthens responsibility, and increases a member's ability to understand self, live with others, and serve the community.",
      pillars: [
        "Learning by doing",
        "Educational progression",
        "The small group",
        "Leadership",
        "Service",
        "Belonging",
        "Character building",
        "Responsibility",
      ],
    },
    conclusion: {
      eyebrow: "Official closing",
      text:
        "The scout system of Scouts Maison de La Paix is not only an organizational chart. It is a complete educational path that shapes the member's character and prepares them for leadership, service, and belonging.",
      cta: "Return to the beginning of the path",
    },
    stages: {
      cub: {
        title: "Cub Scouts and Brownies",
        age: "5 to 12 years",
        summary:
          "A bright beginning where the child learns order, confidence, and belonging through play, imagination, and direct experience.",
        unit: "Pack",
        smallGroup: "Six",
        leader: "Six leader / head of the six",
        scarf: "Yellow",
        goals: [
          "Plant first habits of discipline and respect.",
          "Strengthen joy and belonging.",
          "Train the child to act with a group.",
        ],
        methods: [
          "Educational games and stories.",
          "Songs and short movements.",
          "Simple, repeated, and clear activities.",
        ],
        outcomes: [
          "A first layer of self-confidence.",
          "Healthy group habits.",
          "A positive attachment to scouting life.",
        ],
        notes: [
          {
            title: "Character of the stage",
            description:
              "Formation here depends on a short rhythm and a safe atmosphere so the child can discover self without pressure or complexity.",
          },
          {
            title: "Life inside the pack",
            description:
              "The six gives each child a clear place in a small group where listening, waiting, helping, and sharing a role are learned in a concrete way.",
          },
          {
            title: "Longer educational effect",
            description:
              "Every small success in this stage lays an emotional foundation that prepares the child for wider responsibilities later.",
          },
        ],
        groupCardSummary:
          "The first organized experience of belonging inside the pack.",
        groupCardDescription:
          "The six introduces role-sharing, patience, and supportive cooperation in a reassuring environment.",
        namingCta: "Open naming and traditions",
      },
      junior: {
        title: "Junior Scouts and Guides",
        age: "12 to 15 years",
        summary:
          "A stage where self-reliance widens and the patrol system becomes a daily frame for learning by doing and taking responsibility.",
        unit: "Troop",
        smallGroup: "Patrol",
        leader: "Patrol leader and assistant",
        scarf: "Orange",
        goals: [
          "Develop structured independence.",
          "Learn responsibility inside the patrol.",
          "Gain first practical scout skills.",
        ],
        methods: [
          "The patrol system and shared roles.",
          "Collective challenges and missions.",
          "Workshops and applied training.",
        ],
        outcomes: [
          "Clearer ownership of duty.",
          "A first sense of leadership.",
          "Stronger ability for group achievement.",
        ],
        notes: [
          {
            title: "Essence of the stage",
            description:
              "The young scout learns that the group is not only a place to belong but a daily school for initiative, decision, and living the scout law in practice.",
          },
          {
            title: "Value of the patrol",
            description:
              "The patrol lets the patrol leader and assistant emerge naturally, turning leadership from an idea into a role lived by everyone through rotation and support.",
          },
          {
            title: "Impact on personality",
            description:
              "This stage makes the member more self-reliant, more ready for commitment, and clearer about what responsible belonging means.",
          },
        ],
        groupCardSummary:
          "The basic working unit inside the troop, where shared responsibility becomes concrete.",
        groupCardDescription:
          "The patrol makes challenge, decision, and role-sharing part of everyday scout life.",
        namingCta: "Open naming and calls",
      },
      advanced: {
        title: "Advanced Scouts and Rangers",
        age: "15 to 18 years",
        summary:
          "A stage where leadership becomes more visible and planning, evaluation, self-discipline, and organized work enter everyday formation.",
        unit: "Advanced unit",
        smallGroup: "Patrol",
        leader: "Patrol leader",
        scarf: "Red",
        goals: [
          "Deepen the meaning of leadership and service.",
          "Expand planning and evaluation skills.",
          "Build a mature and proactive personality.",
        ],
        methods: [
          "Projects led by the patrol.",
          "Regular dialogue and evaluation sessions.",
          "Gradual field leadership assignments.",
        ],
        outcomes: [
          "Greater maturity in decisions.",
          "A clearer ability to lead the team.",
          "Deeper awareness of society and personal role.",
        ],
        notes: [
          {
            title: "Advanced formation",
            description:
              "The patrol moves here from تنفيذ tasks to co-shaping the program, proposing initiatives, and carrying the results of collective choices.",
          },
          {
            title: "Meaning of the patrol leader",
            description:
              "A patrol leader does not lead by commands alone, but by example, wise distribution of roles, and the ability to gather people around a clear goal.",
          },
          {
            title: "Transition toward rovering",
            description:
              "Every successful leadership experience in this stage prepares the member for rovering with a wider spirit of service, commitment, and civic responsibility.",
          },
        ],
        groupCardSummary:
          "A more advanced leadership frame inside the advanced unit.",
        groupCardDescription:
          "The patrol becomes a nucleus of emerging leadership, planning, and conscious execution.",
        namingCta: "Open naming and calls",
      },
      rover: {
        title: "Rovers and Guides",
        age: "18 and above, until becoming leaders",
        summary:
          "A stage of conscious service and mature commitment where scout identity becomes a practical project of leadership, giving, and accompanying younger generations.",
        unit: "Clan",
        smallGroup: "Crew",
        leader: "Crew leader",
        scarf: "Blue",
        extraNote: "Later leader colors: olive green + red.",
        goals: [
          "Connect belonging with ongoing service.",
          "Strengthen responsible civic initiative.",
          "Prepare the association's future leaders.",
        ],
        methods: [
          "Service projects with visible impact.",
          "Accompanying younger units.",
          "Advanced field and leadership formation.",
        ],
        outcomes: [
          "Maturity in public responsibility.",
          "Values turning into real service.",
          "A natural readiness for leadership roles.",
        ],
        notes: [
          {
            title: "Spirit of the clan",
            description:
              "The clan is not only a final stop. It is where what was learned earlier is translated into useful service, responsible planning, and meaningful presence inside and outside the association.",
          },
          {
            title: "Value of the crew",
            description:
              "The crew makes space for mature friendship built on loyalty, sincerity, and shared service, with greater capacity for dialogue and initiative.",
          },
          {
            title: "From rovering to leadership",
            description:
              "When a member matures in formation and fieldwork, moving into leader responsibilities becomes a natural continuation of the path rather than a separate jump.",
          },
        ],
        groupCardSummary:
          "A mature small group inside the clan, centered on service and loyalty.",
        groupCardDescription:
          "The crew becomes a space for conscious companionship, community initiative, and preparation for leadership and mentoring.",
        namingCta: "Open meanings and calls",
      },
    },
    namingGroups: {
      sadasiya: {
        title: "The six",
        summary:
          "Sixes usually use color names so the child can distinguish them easily and build an early, memorable identity.",
        examples: [
          "Red six: We rejoice, we stay ordered, and we accomplish.",
          "Yellow six: Joy, alertness, and initiative.",
          "Green six: We grow together and keep the order.",
          "Blue six: We cooperate with calm and confidence.",
          "White six: Clarity, respect, and sincerity.",
          "Orange six: Energy, movement, and service.",
        ],
        meaning:
          "Color here is a simple but effective sign. It gives the child a clear belonging and a group with a name, a voice, and a place.",
        note:
          "Calls are best kept short, easy to repeat, and tied to movement, smiles, and clarity more than verbal complexity.",
      },
      talia: {
        title: "The patrol",
        summary:
          "Patrols often take animal names because they carry clear qualities that help build a strong mental image for each group.",
        examples: [
          "Leopard patrol: The leopard is always swift.",
          "Eagle patrol: The eagle is always in the heights.",
          "Lion patrol: The lion is always king of the forest.",
          "Falcon patrol: The falcon always moves toward the goal.",
        ],
        meaning:
          "The chosen animal points to a quality the stage wants to reinforce: disciplined speed, high aspiration, guided strength, or focused work.",
        note:
          "Each patrol can connect its name to a small visual emblem or a shared line that appears in gatherings, contests, and common missions.",
      },
      dawriya: {
        title: "The advanced patrol",
        summary:
          "This stage fits more contemporary scout-leadership names such as Resolve, Flame, Horizon, or Steadfastness because they carry strength, progression, and cohesion.",
        examples: [
          "Patrol of Resolve: Our discipline is the path to our achievement.",
          "Patrol of the Flame: We advance, we master, and we light the way.",
          "Patrol of the Horizon: Clear vision and a steady step.",
          "Patrol of Steadfastness: Strength in formation and steadiness in the field.",
        ],
        meaning:
          "These names underline that the patrol is no longer only an activity team. It is an emerging leadership cell that works well, measures its impact, and protects its internal cohesion.",
        note:
          "A call in this stage should carry a firmer rhythm and connect discipline, capability, and steady progress.",
      },
      raht: {
        title: "The crew",
        summary:
          "Crews often choose names with religious, historical, or civilizational weight such as Al-Andalus, Kairouan, Trust, Victory, or Witnessing so the name reflects the depth of the mission.",
        examples: [
          "Crew of Al-Andalus: Loyalty to the roots, service to the present.",
          "Crew of Kairouan: Steady giving and an enduring message.",
          "Crew of Trust: Loyalty, service, and offering.",
          "Crew of Victory: We give in silence and serve with sincerity.",
        ],
        meaning:
          "The name gives the crew a civilizational and ethical depth and reminds its members that rovering is not just an activity but a path of awareness, responsibility, and service.",
        note:
          "Every crew call should emphasize sincerity, loyalty, and service and stay away from empty grand language in favor of weight and clarity.",
      },
    },
    rituals: {
      flag: {
        title: "Flag raising",
        summary:
          "A formal opening that links the activity to order and belonging and gives the group a shared beginning for the day or the occasion.",
        imageAlt:
          "Scout symbols expressing flag raising, the neckerchief, and collective rhythm.",
        details: [
          {
            title: "Symbolic meaning",
            description:
              "Flag raising reminds the member that the activity is not an isolated personal act but part of a shared framework governed by values, respect, and discipline.",
          },
          {
            title: "Context of use",
            description:
              "It appears in openings, camps, official gatherings, and activities that need a clear beginning to common work.",
          },
          {
            title: "Educational effect",
            description:
              "It teaches orderly standing, attentive listening, respect for symbols, and linking enthusiasm with disciplined behavior.",
          },
        ],
      },
      salute: {
        title: "Scout salute",
        summary:
          "A sign of respect, belonging, and self-control that carries the meaning of commitment more than outward formality.",
        imageAlt: "A scout performing the scout salute.",
        details: [
          {
            title: "Smaller salute",
            description:
              "Used in close daily situations inside scout life when the aim is to show respect, readiness, and discipline.",
          },
          {
            title: "Formal salute",
            description:
              "Appears in more formal moments such as flag raising, the promise, acceptance, or stage advancement ceremonies.",
          },
          {
            title: "Meaning",
            description:
              "The salute carries mutual respect and belonging to a group with a law and a mission, and it educates body control and conscious presence.",
          },
        ],
      },
      uniform: {
        title: "Scout uniform",
        summary:
          "A unified educational identity that declares belonging, condenses the meaning of order, and connects the individual to the group and its formation path.",
        imageAlt:
          "A scout neckerchief and symbols expressing uniform and identity.",
        details: [
          {
            title: "More than clothing",
            description:
              "The scout uniform is not a simple appearance. It is a sign of belonging and a readiness to represent the group with appropriate and disciplined behavior.",
          },
          {
            title: "Variation by stage",
            description:
              "The identity remains one while some details change with age, unit, and role. Scarf color remains one of the clearest visible markers.",
          },
          {
            title: "Educational effect",
            description:
              "The uniform strengthens equality, reduces superficial differences, and connects personal behavior with the association's public image.",
          },
        ],
      },
      promise: {
        title: "The promise",
        summary:
          "A personal and public commitment to scout values and conduct, joining words to practice and making belonging a conscious responsibility.",
        imageAlt: "Scout symbols expressing promise and belonging.",
        details: [
          {
            title: "What it is",
            description:
              "The promise is the moment when the member states readiness to commit to the values, principles, and behavior expected by the scout group.",
          },
          {
            title: "Educational role",
            description:
              "It makes commitment clear and audible in front of the group so the member feels that words carry weight and belonging is not superficial.",
          },
          {
            title: "How it is lived",
            description:
              "The promise should not remain a memorized line. It becomes a daily reference in situations, decisions, service, and relations with others.",
          },
        ],
      },
      acceptance: {
        title: "Acceptance and advancement ceremony",
        summary:
          "A formal moment of transition that gives each stage its value and helps the member feel that progress is part of a clear educational path.",
        imageAlt: "A visual symbol suggesting progression and growth.",
        details: [
          {
            title: "Acceptance ceremony",
            description:
              "It announces the member's entry into the group in an ordered educational way and gives a strong feeling of welcome, belonging, and commitment from the beginning.",
          },
          {
            title: "Advancement ceremony",
            description:
              "It documents movement between stages while preserving the meaning of earlier effort and opening the horizon of new responsibilities without breaking continuity.",
          },
          {
            title: "Educational effect",
            description:
              "It teaches that growth has stations, that progression is central to scouting, and that every move forward comes with new maturity and a new charge.",
          },
        ],
      },
      campfire: {
        title: "Campfire circle",
        summary:
          "An emotional and educational evening that gathers storytelling, singing, performance, evaluation, and memory-making inside the group.",
        imageAlt: "A scout campfire circle in a collective atmosphere.",
        details: [
          {
            title: "Educational scene",
            description:
              "The campfire brings together material warmth and emotional warmth, letting the group express itself through voice, presence, and collective creativity.",
          },
          {
            title: "What it includes",
            description:
              "It can include songs, short pieces, sketches, calls, and moments where members exchange joy, appreciation, and evaluation.",
          },
          {
            title: "Effect on memory",
            description:
              "Campfire nights often stay among the strongest memories because they condense group life, joy, and belonging into one shared image.",
          },
        ],
      },
    },
    archiveItems: {
      reports: {
        title: "Reports",
        description:
          "Structured reports that summarize goals, programs, results, and the educational and administrative trace of each major step.",
      },
      activityLogs: {
        title: "Activity logs",
        description:
          "Daily or periodic records that make the continuity of work clearer for later generations.",
      },
      photoArchive: {
        title: "Photo archive",
        description:
          "Documented images with titles, dates, and milestones that preserve faces, moments, and stories.",
      },
      visits: {
        title: "Visits",
        description:
          "Documentation of delegations, receptions, meetings, and exchange visits that strengthen the association's presence and educational ties.",
      },
      camps: {
        title: "Camps",
        description:
          "Files including programs, schedules, images, evaluations, and material that makes each camp a useful future reference.",
      },
      certificates: {
        title: "Certificates",
        description:
          "Participation, recognition, and training certificates that reflect both personal effort and group achievement.",
      },
      achievements: {
        title: "Achievements",
        description:
          "A space for initiatives, awards, partnerships, and outcomes that show the association's impact in its educational and community environment.",
      },
      collectiveMemory: {
        title: "Collective memory",
        description:
          "Stories, dates, testimonies, and meaningful moments that preserve the spirit of Scouts Maison de La Paix and connect the past to ongoing work.",
      },
    },
  },
  fr: {
    hero: {
      eyebrow: "Référence officielle pour la formation et l'identité commune",
      title: "Le système scout des Scouts Maison de La Paix",
      description:
        "Ce système repose sur une éducation progressive, les petits groupes, les symboles scouts, les rituels, le leadership et l'apprentissage par la pratique jusqu'à ce que les valeurs deviennent une manière de vivre.",
      primaryCta: "Commencer par les étapes scoutes",
      quickFacts: [
        {
          title: "Progression",
          description: "De la découverte au leadership et au service.",
        },
        {
          title: "Petit groupe",
          description: "Un apprentissage vivant et une responsabilité partagée.",
        },
        {
          title: "Identité commune",
          description: "Des symboles, des chants et une mémoire collective.",
        },
      ],
      badge: {
        label: "Identité officielle",
        title: "Scouts Maison de La Paix",
        description:
          "Une page de référence qui présente la structure du système scout, ses étapes, ses rituels et la mémoire qui façonne l'esprit du groupe.",
      },
      identityCard: {
        title: "Scouts Maison de La Paix",
        description:
          "La progression, l'appartenance, le service et le leadership ne sont pas des compartiments séparés. Ce sont des fils reliés dans la formation du scout.",
        chips: ["Foulard", "Rituels", "Mémoire partagée"],
        partnerNote:
          "Une présence de crédibilité au sein de l'espace scout marocain.",
      },
    },
    quickLinks: [
      {
        id: "stages",
        title: "Unités et étapes scoutes",
        description:
          "Découvrir les quatre étapes et le parcours éducatif à l'intérieur de l'association.",
      },
      {
        id: "rituals",
        title: "Symboles et rituels",
        description:
          "Montée du drapeau, salut, uniforme, promesse et cérémonies éducatives partagées.",
      },
      {
        id: "songs",
        title: "Chants et identité",
        description:
          "L'espace émotionnel où la voix, le sens et l'appartenance commune se rejoignent.",
      },
    ],
    sectionNav: [
      { id: "stages", label: "Étapes" },
      { id: "groups", label: "Unités" },
      { id: "naming", label: "Noms" },
      { id: "rituals", label: "Symboles" },
      { id: "songs", label: "Chants" },
      { id: "philosophy", label: "Philosophie" },
    ],
    stagesSection: {
      eyebrow: "Étapes scoutes",
      title: "Étapes scoutes",
      description:
        "Chaque jeune avance à travers des étapes reliées entre elles, adaptées à la croissance psychologique, sociale et intellectuelle, avec des outils et des responsabilités propres à chaque âge.",
      phases: ["Découverte", "Responsabilité", "Leadership", "Service"],
      stageBadge: "Étape scoute",
      unitLabel: "Unité",
      smallGroupLabel: "Petit groupe",
      leaderLabel: "Responsable",
      scarfLabel: "Couleur du foulard",
      goalsTitle: "Objectifs",
      methodsTitle: "Moyens",
      outcomesTitle: "Effets éducatifs",
      detailsLabel: "Voir les détails",
    },
    groupsSection: {
      eyebrow: "Unités et petits groupes",
      title: "Unités et petits groupes",
      description:
        "Le système scout distingue la grande unité qui encadre l'étape et le petit groupe où se vivent l'apprentissage quotidien, la responsabilité directe et l'esprit d'équipe.",
      tableHeaders: {
        stage: "Étape",
        unit: "Unité",
        smallGroup: "Petit groupe",
        size: "Effectif",
        leader: "Responsable",
        scarf: "Foulard",
      },
    },
    namingSection: {
      eyebrow: "Noms et appels",
      title: "Noms et appels",
      description:
        "Les noms et les appels construisent l'identité intérieure de chaque petit groupe. Ils le distinguent, rassemblent ses membres autour d'un même rythme et portent un sens éducatif partagé.",
      examplesTitle: "Exemples d'appels",
      meaningTitle: "Sens symbolique",
      noteTitle: "Note éducative",
    },
    ritualsSection: {
      eyebrow: "Symboles, rituels et identité commune",
      title: "Symboles, rituels et identité commune",
      description:
        "Les symboles et les rituels donnent au scoutisme son langage propre. Ils organisent les débuts, encadrent les passages, renforcent l'émotion et rendent l'appartenance visible dans le geste et la vie commune.",
      featureEyebrow: "Une identité commune qui dépasse les mots",
      featureDescription:
        "De la montée du drapeau au feu de camp, les scènes répétées deviennent une part de la mémoire et de la compréhension du groupe.",
      values: [
        {
          title: "Respect",
          description:
            "Un bon rituel rend le respect visible dans la posture, le salut et l'écoute.",
        },
        {
          title: "Discipline",
          description:
            "Les symboles organisés transforment le moment collectif en exercice d'attention et d'engagement.",
        },
        {
          title: "Mémoire",
          description:
            "La répétition des symboles crée une mémoire affective commune qui traverse les saisons.",
        },
      ],
    },
    songsSection: {
      eyebrow: "Chants et identité commune",
      title: "Chants et identité commune",
      description:
        "Dans la vie scoute, les chants ne sont pas décoratifs. Ils font partie de la formation affective et éducative et créent une mémoire et une émotion communes.",
      cards: [
        {
          title: "Hymne officiel",
          description:
            "L'hymne officiel devient la voix de l'association dans les rassemblements, les célébrations et la représentation publique.",
        },
        {
          title: "Chants d'étape et appels",
          description:
            "Chaque étape possède son propre rythme, adapté à l'âge des membres tout en restant relié à l'identité scoute commune.",
        },
        {
          title: "Identité sonore de l'association",
          description:
            "La voix n'est pas un détail. C'est un moyen d'éducation, de présence et de travail collectif.",
        },
        {
          title: "Mémoire affective",
          description:
            "Les chants répétés, les appels et les feux de camp construisent une mémoire qui revient à chaque saison.",
        },
      ],
      placeholder: {
        title: "Espace réservé à l'hymne officiel",
        description:
          "Cet espace est prêt pour le texte officiel de l'hymne ou un lecteur audio validé afin que la page reste une référence commune.",
        label: "Prêt à être ajouté",
        hints: [
          "Paroles officielles",
          "Enregistrement audio",
          "Liens de performance collective",
        ],
      },
    },
    archiveSection: {
      eyebrow: "Rapports et mémoire collective",
      title: "Rapports et mémoire collective",
      description:
        "Cette section conserve le parcours de l'association, documente ses activités et construit une mémoire organisée à laquelle les générations suivantes peuvent revenir.",
      featureEyebrow: "Depuis la mémoire vivante",
      featureDescription:
        "La mémoire collective ne garde pas seulement des documents. Elle garde des visages, des rencontres et des moments qui rendent visible l'impact de l'association dans le temps.",
    },
    philosophySection: {
      eyebrow: "Philosophie du système",
      title: "Philosophie du système",
      description:
        "Le système scout repose sur l'apprentissage par la pratique, la progression éducative, le petit groupe, le leadership, le service et l'appartenance. C'est un chemin qui construit le caractère et la responsabilité.",
      pillars: [
        "Apprendre par la pratique",
        "Progression éducative",
        "Petit groupe",
        "Leadership",
        "Service",
        "Appartenance",
        "Construction du caractère",
        "Responsabilité",
      ],
    },
    conclusion: {
      eyebrow: "Clôture officielle",
      text:
        "Le système scout des Scouts Maison de La Paix n'est pas seulement une organisation. C'est un parcours éducatif complet qui forme la personne et la prépare au leadership, au service et à l'appartenance.",
      cta: "Revenir au début du parcours",
    },
    stages: {
      cub: {
        title: "Louveteaux et jeannettes",
        age: "5 à 12 ans",
        summary:
          "Une étape de débuts joyeux où l'enfant apprend l'ordre, la confiance et l'appartenance à travers le jeu, l'imaginaire et l'expérience directe.",
        unit: "Meute",
        smallGroup: "Sizaine",
        leader: "Responsable de sizaine",
        scarf: "Jaune",
        goals: [
          "Installer les premiers repères de discipline et de respect.",
          "Renforcer la joie et l'appartenance.",
          "Apprendre à agir avec le groupe.",
        ],
        methods: [
          "Jeux éducatifs et récits.",
          "Chants et mouvements courts.",
          "Activités simples, claires et répétées.",
        ],
        outcomes: [
          "Une première confiance en soi.",
          "De bonnes habitudes collectives.",
          "Un lien positif avec la vie scoute.",
        ],
        notes: [
          {
            title: "Caractère de l'étape",
            description:
              "La formation repose ici sur un rythme court et un climat rassurant pour que l'enfant découvre sa place sans pression.",
          },
          {
            title: "La vie dans la meute",
            description:
              "La sizaine donne à chaque enfant une place claire dans un petit groupe où l'on apprend l'écoute, l'attente, l'entraide et le partage des rôles.",
          },
          {
            title: "Effet éducatif durable",
            description:
              "Chaque petite réussite pose une base affective forte qui prépare à des responsabilités plus larges ensuite.",
          },
        ],
        groupCardSummary:
          "La première expérience organisée d'appartenance à l'intérieur de la meute.",
        groupCardDescription:
          "La sizaine introduit le partage des rôles, la patience et la coopération dans un cadre rassurant.",
        namingCta: "Ouvrir les noms et traditions",
      },
      junior: {
        title: "Scouts débutants et guides",
        age: "12 à 15 ans",
        summary:
          "Une étape où l'autonomie s'élargit et où le système des patrouilles devient le cadre quotidien de l'apprentissage par la pratique.",
        unit: "Troupe",
        smallGroup: "Patrouille",
        leader: "Chef de patrouille et adjoint",
        scarf: "Orange",
        goals: [
          "Développer une autonomie structurée.",
          "Apprendre la responsabilité dans la patrouille.",
          "Acquérir les premières compétences pratiques du scoutisme.",
        ],
        methods: [
          "Le système des patrouilles et le partage des rôles.",
          "Défis et missions collectives.",
          "Ateliers et entraînements appliqués.",
        ],
        outcomes: [
          "Un sens plus clair du devoir.",
          "Un premier réflexe de leadership.",
          "Une meilleure capacité d'accomplissement collectif.",
        ],
        notes: [
          {
            title: "Essence de l'étape",
            description:
              "Le jeune comprend que le groupe n'est pas seulement un lieu d'appartenance, mais une école quotidienne d'initiative, de décision et de loi scoute vécue.",
          },
          {
            title: "Valeur de la patrouille",
            description:
              "La patrouille permet au chef et à l'adjoint d'émerger naturellement et transforme le leadership en fonction concrète.",
          },
          {
            title: "Impact sur la personnalité",
            description:
              "Cette étape rend le membre plus autonome, plus capable d'engagement et plus lucide sur le sens d'une appartenance responsable.",
          },
        ],
        groupCardSummary:
          "L'unité de travail de base à l'intérieur de la troupe.",
        groupCardDescription:
          "La patrouille fait entrer le défi, la décision et le partage des responsabilités dans la vie scoute quotidienne.",
        namingCta: "Ouvrir les noms et appels",
      },
      advanced: {
        title: "Scouts avancés et éclaireuses",
        age: "15 à 18 ans",
        summary:
          "Une étape où le sens du leadership devient plus net et où la planification, l'évaluation et l'autodiscipline entrent dans la formation quotidienne.",
        unit: "Unité avancée",
        smallGroup: "Patrouille",
        leader: "Chef de patrouille",
        scarf: "Rouge",
        goals: [
          "Approfondir le sens du leadership et du service.",
          "Élargir les compétences de planification et d'évaluation.",
          "Construire une personnalité mûre et entreprenante.",
        ],
        methods: [
          "Des projets conduits par la patrouille.",
          "Des temps réguliers de dialogue et d'évaluation.",
          "Des responsabilités de terrain progressivement confiées.",
        ],
        outcomes: [
          "Une plus grande maturité dans la décision.",
          "Une capacité plus claire à conduire l'équipe.",
          "Une conscience plus profonde du rôle personnel dans la société.",
        ],
        notes: [
          {
            title: "Formation avancée",
            description:
              "La patrouille passe ici de l'exécution au fait de co-construire le programme, proposer des initiatives et assumer les conséquences des choix.",
          },
          {
            title: "Sens du chef de patrouille",
            description:
              "Le chef ne mène pas seulement par les ordres, mais par l'exemple, la bonne répartition des tâches et la capacité à rassembler autour d'un but clair.",
          },
          {
            title: "Passage vers la route",
            description:
              "Chaque expérience de leadership réussie prépare le membre à entrer dans la route avec un esprit de service et de responsabilité plus large.",
          },
        ],
        groupCardSummary:
          "Un cadre plus avancé de formation au leadership à l'intérieur de l'unité avancée.",
        groupCardDescription:
          "La patrouille devient un noyau de leadership émergent, de planification et d'exécution consciente.",
        namingCta: "Ouvrir les noms et appels",
      },
      rover: {
        title: "Routiers et guides aînées",
        age: "18 ans et plus, jusqu'à devenir chefs",
        summary:
          "Une étape de service conscient et d'engagement mûr où l'identité scoute devient un projet concret de leadership, de don et d'accompagnement des plus jeunes.",
        unit: "Clan",
        smallGroup: "Rang",
        leader: "Responsable du rang",
        scarf: "Bleu",
        extraNote: "Couleurs des chefs ensuite: vert olive + rouge.",
        goals: [
          "Relier l'appartenance à un service durable.",
          "Renforcer l'initiative communautaire responsable.",
          "Préparer les futurs leaders de l'association.",
        ],
        methods: [
          "Des projets de service à impact visible.",
          "L'accompagnement des unités plus jeunes.",
          "Une formation avancée de terrain et de leadership.",
        ],
        outcomes: [
          "Une maturité dans la responsabilité publique.",
          "Des valeurs qui deviennent un service réel.",
          "Une disponibilité naturelle pour des rôles de leadership.",
        ],
        notes: [
          {
            title: "Esprit du clan",
            description:
              "Le clan n'est pas seulement une étape finale. C'est le lieu où ce qui a été appris plus tôt se traduit en service utile, en planification responsable et en présence féconde.",
          },
          {
            title: "Valeur du rang",
            description:
              "Le rang permet une amitié plus mûre, fondée sur la loyauté, la sincérité et le partage du service, avec davantage de dialogue et d'initiative.",
          },
          {
            title: "De la route au leadership",
            description:
              "Quand le membre mûrit dans la formation et le terrain, le passage aux responsabilités de chef devient une continuité naturelle du parcours.",
          },
        ],
        groupCardSummary:
          "Un petit groupe mûr au sein du clan, centré sur le service et la fidélité.",
        groupCardDescription:
          "Le rang devient un espace de compagnonnage conscient, d'initiative communautaire et de préparation à l'encadrement.",
        namingCta: "Ouvrir les sens et les appels",
      },
    },
    namingGroups: {
      sadasiya: {
        title: "La sizaine",
        summary:
          "Les sizaines prennent souvent des noms de couleurs pour faciliter l'identification et construire une première identité facile à retenir.",
        examples: [
          "Sizaine rouge: Nous avançons, en ordre, avec joie.",
          "Sizaine jaune: Joie, attention et initiative.",
          "Sizaine verte: Nous grandissons ensemble et gardons l'ordre.",
          "Sizaine bleue: Nous coopérons avec calme et confiance.",
          "Sizaine blanche: Clarté, respect et sincérité.",
          "Sizaine orange: Élan, mouvement et service.",
        ],
        meaning:
          "La couleur est ici un signe simple mais efficace. Elle donne à l'enfant une appartenance claire et un groupe avec un nom, une voix et une place.",
        note:
          "Les appels doivent rester courts, faciles à reprendre et liés au mouvement, au sourire et à la clarté.",
      },
      talia: {
        title: "La patrouille",
        summary:
          "Les patrouilles choisissent souvent des noms d'animaux, parce qu'ils portent des qualités nettes qui aident à construire une image forte du groupe.",
        examples: [
          "Patrouille du léopard: Le léopard reste toujours rapide.",
          "Patrouille de l'aigle: L'aigle demeure dans les hauteurs.",
          "Patrouille du lion: Le lion reste roi de la forêt.",
          "Patrouille du faucon: Le faucon avance toujours vers le but.",
        ],
        meaning:
          "L'animal choisi exprime une qualité éducative recherchée: rapidité disciplinée, hauteur d'âme, force encadrée ou précision du travail.",
        note:
          "Chaque patrouille peut relier son nom à un petit signe visuel ou à une phrase d'appel commune utilisée dans les rassemblements et les défis.",
      },
      dawriya: {
        title: "La patrouille avancée",
        summary:
          "Cette étape convient à des noms plus modernes et plus orientés leadership, comme Résolution, Flamme, Horizon ou Stabilité.",
        examples: [
          "Patrouille Résolution: Notre discipline est le chemin de notre réussite.",
          "Patrouille Flamme: Nous avançons, nous maîtrisons et nous éclairons la route.",
          "Patrouille Horizon: Une vision claire et un pas assuré.",
          "Patrouille Stabilité: Force dans la formation, fermeté sur le terrain.",
        ],
        meaning:
          "Ces noms montrent que la patrouille n'est plus seulement une équipe d'activité mais un noyau de leadership en construction.",
        note:
          "À cette étape, l'appel doit porter un rythme plus ferme et relier discipline, capacité et progrès continu.",
      },
      raht: {
        title: "Le rang",
        summary:
          "Les rangs choisissent souvent des noms à portée religieuse, historique ou civilisationnelle afin que le nom reflète la profondeur de la mission.",
        examples: [
          "Rang Al-Andalus: Fidélité aux racines, service du présent.",
          "Rang Kairouan: Don constant et message durable.",
          "Rang de la Confiance: Loyauté, service et offrande.",
          "Rang de la Victoire: Nous donnons en silence et servons avec sincérité.",
        ],
        meaning:
          "Le nom donne au rang une profondeur éthique et civilisationnelle et rappelle que la route est un chemin de conscience et de responsabilité.",
        note:
          "Chaque appel du rang doit insister sur la sincérité, la fidélité et le service, sans grandiloquence vide.",
      },
    },
    rituals: {
      flag: {
        title: "Montée du drapeau",
        summary:
          "Une ouverture formelle qui relie l'activité à l'ordre et à l'appartenance et donne au groupe un vrai commencement commun.",
        imageAlt:
          "Des symboles scouts autour du drapeau, du foulard et du rythme collectif.",
        details: [
          {
            title: "Sens symbolique",
            description:
              "La montée du drapeau rappelle que l'activité n'est pas un acte individuel isolé mais une partie d'un cadre commun gouverné par les valeurs et le respect.",
          },
          {
            title: "Contexte d'usage",
            description:
              "Elle apparaît dans les ouvertures, les camps, les rassemblements officiels et les temps qui demandent un début clair du travail commun.",
          },
          {
            title: "Effet éducatif",
            description:
              "Elle apprend la tenue, l'écoute, le respect des symboles et le lien entre élan émotionnel et comportement discipliné.",
          },
        ],
      },
      salute: {
        title: "Salut scout",
        summary:
          "Un signe de respect, d'appartenance et de maîtrise de soi, qui porte d'abord le sens de l'engagement.",
        imageAlt: "Un scout effectuant le salut scout.",
        details: [
          {
            title: "Salut ordinaire",
            description:
              "Il s'emploie dans les situations proches et quotidiennes, pour manifester respect, disponibilité et discipline.",
          },
          {
            title: "Salut formel",
            description:
              "Il apparaît dans les moments plus officiels, comme le drapeau, la promesse ou les cérémonies d'accueil et de passage.",
          },
          {
            title: "Signification",
            description:
              "Le salut porte l'idée de respect mutuel et d'appartenance à un groupe porteur d'une loi et d'une mission.",
          },
        ],
      },
      uniform: {
        title: "Uniforme scout",
        summary:
          "Une identité éducative commune qui rend l'appartenance visible, résume le sens de l'ordre et relie la personne au groupe.",
        imageAlt:
          "Un foulard scout et des symboles qui évoquent l'uniforme et l'identité.",
        details: [
          {
            title: "Plus qu'un vêtement",
            description:
              "L'uniforme n'est pas un simple aspect extérieur. Il est un signe d'appartenance et une manière de représenter le groupe avec dignité.",
          },
          {
            title: "Selon l'étape",
            description:
              "L'identité reste une, mais certains détails changent selon l'âge, l'unité et la fonction éducative. La couleur du foulard reste un repère essentiel.",
          },
          {
            title: "Effet éducatif",
            description:
              "L'uniforme renforce l'égalité, réduit les différences de surface et relie le comportement personnel à l'image publique de l'association.",
          },
        ],
      },
      promise: {
        title: "La promesse",
        summary:
          "Un engagement personnel et public envers les valeurs et la conduite scoute, qui lie la parole à la pratique.",
        imageAlt:
          "Des symboles évoquant la promesse et l'appartenance scoute.",
        details: [
          {
            title: "Définition",
            description:
              "La promesse est le moment où le membre annonce sa disponibilité à vivre les valeurs, les principes et le comportement attendu par le groupe scout.",
          },
          {
            title: "Rôle éducatif",
            description:
              "Elle rend l'engagement visible et audible devant le groupe, et aide le membre à sentir que sa parole a du poids.",
          },
          {
            title: "Comment elle se vit",
            description:
              "La promesse ne doit pas rester une formule mémorisée. Elle devient une référence quotidienne dans les choix, le service et la relation aux autres.",
          },
        ],
      },
      acceptance: {
        title: "Cérémonie d'accueil et de passage",
        summary:
          "Un moment officiel de transition qui donne à chaque étape sa valeur et fait sentir que le progrès s'inscrit dans un vrai chemin éducatif.",
        imageAlt:
          "Un symbole visuel qui suggère la progression et la croissance dans le système scout.",
        details: [
          {
            title: "Cérémonie d'accueil",
            description:
              "Elle annonce l'entrée dans le groupe de manière organisée et donne dès le début un sentiment de bienvenue, d'appartenance et d'engagement.",
          },
          {
            title: "Cérémonie de passage",
            description:
              "Elle documente le passage d'une étape à une autre en respectant l'effort déjà fourni et en ouvrant vers des responsabilités nouvelles.",
          },
          {
            title: "Effet éducatif",
            description:
              "Elle enseigne que la croissance a des étapes, que la progression est centrale en scoutisme et que chaque passage appelle une maturité nouvelle.",
          },
        ],
      },
      campfire: {
        title: "Feu de camp",
        summary:
          "Une soirée éducative et affective qui rassemble la veillée, le chant, la mise en scène, l'évaluation et la mémoire collective.",
        imageAlt: "Un cercle de feu de camp dans une ambiance scoute collective.",
        details: [
          {
            title: "Scène éducative",
            description:
              "Le feu de camp réunit chaleur matérielle et chaleur affective et permet au groupe de s'exprimer par la voix, la présence et la créativité collective.",
          },
          {
            title: "Ce qu'il contient",
            description:
              "Il peut inclure des chants, des petites séquences, des mises en scène, des appels et des moments de joie et d'évaluation partagée.",
          },
          {
            title: "Mémoire",
            description:
              "Le feu de camp reste souvent parmi les souvenirs les plus forts, parce qu'il résume en une image la joie du groupe et l'appartenance.",
          },
        ],
      },
    },
    archiveItems: {
      reports: {
        title: "Rapports",
        description:
          "Des rapports structurés qui résument les objectifs, les programmes, les résultats et la trace éducative et administrative de chaque étape.",
      },
      activityLogs: {
        title: "Registres d'activités",
        description:
          "Des registres quotidiens ou périodiques qui rendent le suivi du travail et sa continuité plus lisibles.",
      },
      photoArchive: {
        title: "Archive photographique",
        description:
          "Des images documentées avec titres, dates et étapes, qui gardent les visages, les moments et les histoires de la mémoire collective.",
      },
      visits: {
        title: "Visites",
        description:
          "La documentation des délégations, accueils, rencontres et visites d'échange qui renforcent la présence et les liens éducatifs de l'association.",
      },
      camps: {
        title: "Camps",
        description:
          "Des dossiers contenant programmes, horaires, images, évaluations et tout ce qui fait du camp une référence pour plus tard.",
      },
      certificates: {
        title: "Attestations",
        description:
          "Des attestations de participation, de reconnaissance et de formation qui reflètent l'effort individuel et collectif.",
      },
      achievements: {
        title: "Réalisations",
        description:
          "Un espace pour les initiatives, distinctions, partenariats et résultats qui expriment l'impact de l'association dans son environnement.",
      },
      collectiveMemory: {
        title: "Mémoire collective",
        description:
          "Des récits, dates, témoignages et moments marquants qui préservent l'esprit des Scouts Maison de La Paix et relient le passé à la continuité.",
      },
    },
  },
  ar: {
    hero: {
      eyebrow: "مرجع رسمي للتكوين والهوية المشتركة",
      title: "النظام الكشفي لكشافة دار السلام المغربية",
      description:
        "يقوم هذا النظام على التربية المتدرجة، والجماعات الصغيرة، والرموز الكشفية، والطقوس، والقيادة، والتعلم بالممارسة حتى تتحول القيم إلى سلوك يومي حي.",
      primaryCta: "ابدأ من المراحل الكشفية",
      quickFacts: [
        {
          title: "التدرج",
          description: "من الاكتشاف إلى القيادة والخدمة.",
        },
        {
          title: "الجماعة الصغيرة",
          description: "تعلم حي ومسؤولية مشتركة.",
        },
        {
          title: "الهوية المشتركة",
          description: "رموز وأناشيد وذاكرة جماعية.",
        },
      ],
      badge: {
        label: "الهوية الرسمية",
        title: "كشافة دار السلام المغربية",
        description:
          "صفحة مرجعية تعرف ببنية النظام الكشفي، ومراحله، وطقوسه، والذاكرة التي تصنع روح الجماعة.",
      },
      identityCard: {
        title: "كشافة دار السلام المغربية",
        description:
          "التدرج، والانتماء، والخدمة، والقيادة ليست أقسامًا منفصلة، بل خيوطًا متصلة في تكوين الكشاف.",
        chips: ["المنديل", "الطقوس", "الذاكرة المشتركة"],
        partnerNote: "حضور اعتباري داعم ضمن الفضاء الكشفي الوطني.",
      },
    },
    quickLinks: [
      {
        id: "stages",
        title: "الوحدات الكشفية",
        description: "تعرف على المراحل الأربع ومسار التدرج التربوي داخل الجمعية.",
      },
      {
        id: "rituals",
        title: "الرموز والطقوس",
        description: "رفع العلم، التحية، الزي، العهد، والاحتفالات التربوية الجامعة.",
      },
      {
        id: "songs",
        title: "الأناشيد والهوية",
        description: "المجال الوجداني الذي يجمع الصوت والمعنى والانتماء المشترك.",
      },
    ],
    sectionNav: [
      { id: "stages", label: "المراحل" },
      { id: "groups", label: "الوحدات" },
      { id: "naming", label: "التسميات" },
      { id: "rituals", label: "الرموز" },
      { id: "songs", label: "الأناشيد" },
      { id: "philosophy", label: "الفلسفة" },
    ],
    stagesSection: {
      eyebrow: "المراحل الكشفية",
      title: "المراحل الكشفية",
      description:
        "يتدرج المنخرط داخل كشافة دار السلام المغربية عبر مراحل متصلة، تراعي النمو النفسي والاجتماعي والعقلي، وتمنح لكل سن أدواته الخاصة ومسؤولياته المناسبة.",
      phases: ["الاكتشاف", "المسؤولية", "القيادة", "الخدمة"],
      stageBadge: "المرحلة الكشفية",
      unitLabel: "الوحدة",
      smallGroupLabel: "الجماعة الصغيرة",
      leaderLabel: "القائد",
      scarfLabel: "لون المنديل",
      goalsTitle: "الأهداف",
      methodsTitle: "الوسائل",
      outcomesTitle: "الآثار التربوية",
      detailsLabel: "عرض التفاصيل",
    },
    groupsSection: {
      eyebrow: "الوحدات والجماعات الصغيرة",
      title: "الوحدات والجماعات الصغيرة",
      description:
        "يميز النظام الكشفي بين الوحدة الكبرى التي تؤطر المرحلة، والجماعة الصغيرة التي يعيش داخلها المنخرط التعلم اليومي، والمسؤولية المباشرة، وروح الفريق.",
      tableHeaders: {
        stage: "المرحلة",
        unit: "الوحدة",
        smallGroup: "الجماعة الصغيرة",
        size: "عدد الأفراد",
        leader: "القائد",
        scarf: "لون المنديل",
      },
    },
    namingSection: {
      eyebrow: "التسميات والصيحات",
      title: "التسميات والصيحات",
      description:
        "تبني التسميات والصيحات هوية كل جماعة صغيرة من الداخل، وتمنحها علامة تميزها وتوحد أفرادها حول إيقاع واحد ومعنى تربوي مشترك.",
      examplesTitle: "أمثلة للصيحات",
      meaningTitle: "المعنى الرمزي",
      noteTitle: "ملاحظة تربوية",
    },
    ritualsSection: {
      eyebrow: "الرموز والطقوس والهوية المشتركة",
      title: "الرموز والطقوس والهوية المشتركة",
      description:
        "تمنح الرموز والطقوس للحياة الكشفية لغتها الخاصة؛ فهي تنظم البداية، وتؤطر الانتقال، وتقوي الوجدان، وتجعل معنى الانتماء محسوسًا في السلوك والمشهد والصوت.",
      featureEyebrow: "هوية مشتركة لا تختصرها الكلمات فقط",
      featureDescription:
        "من رفع العلم إلى نار المخيم، تتكرر ملامح المشهد الكشفي حتى تصير جزءًا من ذاكرة المنخرط وطريقته في فهم الجماعة.",
      values: [
        {
          title: "الاحترام",
          description: "الطقس الجيد يجعل الاحترام مرئيًا في الوقوف، والتحية، وحسن الإصغاء.",
        },
        {
          title: "الانضباط",
          description:
            "الرموز المنظمة تحول اللحظة الجماعية إلى تمرين عملي على الانتباه والالتزام.",
        },
        {
          title: "الذاكرة",
          description:
            "تكرار الرموز في المناسبات يصنع ذاكرة وجدانية موحدة لا تضيع مع تغير المواسم.",
        },
      ],
    },
    songsSection: {
      eyebrow: "الأناشيد والهوية المشتركة",
      title: "الأناشيد والهوية المشتركة",
      description:
        "الأناشيد في الحياة الكشفية ليست عنصرًا تزيينيًا، بل جزء أساسي من التكوين الوجداني والتربوي، ومن خلالها تتشكل وحدة النبرة والذاكرة والعاطفة الجماعية.",
      cards: [
        {
          title: "النشيد الرسمي",
          description:
            "يمثل النشيد الرسمي صوت الجمعية في لحظات التجمع والاحتفال والتمثيل، ويختصر رسالتها في صياغة موحدة تحفظها الأجيال.",
        },
        {
          title: "أناشيد المراحل والصيحات",
          description:
            "لكل مرحلة نبرتها الخاصة التي تناسب سن المنخرطين وإيقاعهم، لكنها تظل مرتبطة بالهوية الكشفية الجامعة لا بالترفيه المنفصل.",
        },
        {
          title: "الهوية الصوتية للجمعية",
          description:
            "الصوت في الكشفية ليس زينة جانبية؛ إنه أسلوب تربية، ووسيلة حضور، وطريقة لربط القيم بالعاطفة والعمل الجماعي.",
        },
        {
          title: "الذاكرة الوجدانية",
          description:
            "تتشكل الذاكرة الجماعية من الأناشيد المتكررة، والصيحات، ونار المخيم، ولحظات الوقوف المشترك التي تعود في كل موسم.",
        },
      ],
      placeholder: {
        title: "مساحة مخصصة للنشيد الرسمي",
        description:
          "يدرج هنا لاحقًا نص النشيد الرسمي أو مشغل صوتي معتمد، حتى تظل الصفحة مرجعًا موحدًا للنشيد داخل الجمعية.",
        label: "مكان مهيأ للإدراج",
        hints: ["نص النشيد", "التسجيل الصوتي", "روابط الأداء الجماعي"],
      },
    },
    archiveSection: {
      eyebrow: "التقارير والذاكرة الجماعية",
      title: "التقارير والذاكرة الجماعية",
      description:
        "يحفظ هذا القسم مسار الجمعية الكشفي، ويوثق أنشطتها، ويصنع ذاكرة منظمة يمكن الرجوع إليها من أجل الاستمرارية والتقييم وبناء الأجيال القادمة على أساس واضح.",
      featureEyebrow: "من الذاكرة الحية",
      featureDescription:
        "الذاكرة الجماعية لا تحفظ الوثيقة فقط، بل تحفظ الوجوه، واللقاءات، واللحظات التي تصنع أثر الجمعية عبر الزمن.",
    },
    philosophySection: {
      eyebrow: "فلسفة النظام",
      title: "فلسفة النظام",
      description:
        "يقوم النظام الكشفي على التعلم بالممارسة، والتدرج التربوي، والجماعة الصغيرة، والقيادة، والخدمة، والانتماء. وهو مسار يبني الشخصية ويقوي حس المسؤولية ويمنح المنخرط قدرة متنامية على فهم ذاته والعيش مع الآخرين وخدمة مجتمعه.",
      pillars: [
        "التعلم بالممارسة",
        "التدرج التربوي",
        "الجماعة الصغيرة",
        "القيادة",
        "الخدمة",
        "الانتماء",
        "بناء الشخصية",
        "تنمية المسؤولية",
      ],
    },
    conclusion: {
      eyebrow: "خاتمة رسمية",
      text:
        "النظام الكشفي لكشافة دار السلام المغربية ليس مجرد تنظيم، بل مسار تربوي متكامل يصنع شخصية المنخرط ويؤهله للقيادة والخدمة والانتماء.",
      cta: "العودة إلى بدايات المسار",
    },
    stages: {
      cub: {
        title: "الأشبال والزهرات",
        age: "5 إلى 12 سنة",
        summary:
          "مرحلة البدايات المبهجة التي يتعلم فيها الطفل النظام والثقة والانتماء عبر اللعب، والخيال، والتجربة المباشرة.",
        unit: "القطيع",
        smallGroup: "السداسية",
        leader: "السادوس أو رئيس السداسية",
        scarf: "الأصفر",
        goals: [
          "غرس الانضباط الأول والاحترام.",
          "تقوية روح الفرح والانتماء.",
          "تدريب الطفل على العمل مع الجماعة.",
        ],
        methods: [
          "الألعاب التربوية والقصص.",
          "الأناشيد والحركات القصيرة.",
          "أنشطة بسيطة متكررة وواضحة.",
        ],
        outcomes: [
          "بناء ثقة أولى بالنفس.",
          "اكتساب عادات جماعية جيدة.",
          "تعلق إيجابي بالحياة الكشفية.",
        ],
        notes: [
          {
            title: "ملمح المرحلة",
            description:
              "يرتكز التكوين هنا على الإيقاع القصير والجو الآمن، حتى يشعر الطفل بأن الكشفية فضاء يكتشف فيه ذاته دون ضغط أو تعقيد.",
          },
          {
            title: "الحياة داخل القطيع",
            description:
              "تمنح السداسية لكل طفل مكانًا واضحًا داخل جماعة صغيرة يتعلم فيها الإصغاء، والانتظار، وتقاسم الدور، ومساعدة الرفيق.",
          },
          {
            title: "الأثر التربوي الأبعد",
            description:
              "كل نجاح صغير في هذه المرحلة يصنع قاعدة وجدانية قوية تجعل الطفل مستعدًا للانتقال إلى مسؤوليات أوسع في المراحل اللاحقة.",
          },
        ],
        groupCardSummary:
          "جماعة صغيرة داخل القطيع تمنح الطفل أول تجربة واضحة للانتماء والمشاركة المنظمة.",
        groupCardDescription:
          "تمثل التدريب الأول على الدور، والانتظار، والطاعة الواعية، ومساندة الرفيق داخل بيئة مطمئنة.",
        namingCta: "افتح التسميات والتقاليد",
      },
      junior: {
        title: "الكشافة المبتدئون والمرشدات",
        age: "12 إلى 15 سنة",
        summary:
          "مرحلة يتسع فيها الاعتماد على النفس، ويصبح نظام الطلائع إطارًا يوميًا للتعلم بالممارسة وتحمل المسؤولية.",
        unit: "الفرقة",
        smallGroup: "الطليعة",
        leader: "عريف الطليعة ومساعده",
        scarf: "البرتقالي",
        goals: [
          "تنمية الاستقلالية المنظمة.",
          "تعلم المسؤولية داخل الطليعة.",
          "اكتساب مهارات كشفية وعملية أولى.",
        ],
        methods: [
          "نظام الطلائع وتقاسم الأدوار.",
          "التحديات والمهام الجماعية.",
          "الورشات والتداريب التطبيقية.",
        ],
        outcomes: [
          "وضوح أكبر في تحمل الواجب.",
          "بداية حس القيادة لدى الأفراد.",
          "ارتفاع القدرة على الإنجاز الجماعي.",
        ],
        notes: [
          {
            title: "جوهر المرحلة",
            description:
              "هنا يتعلم المنخرط أن الجماعة ليست فقط مكانًا للانتماء، بل مدرسة يومية للمبادرة، والقرار، واحترام القانون الكشفي في السلوك العملي.",
          },
          {
            title: "قيمة الطليعة",
            description:
              "تسمح الطليعة ببروز عريفها ومساعده بصورة طبيعية، فتتحول القيادة من فكرة نظرية إلى وظيفة محسوسة يعيشها الجميع بالتناوب والدعم.",
          },
          {
            title: "أثرها على الشخصية",
            description:
              "تجعل هذه المرحلة المنخرط أقدر على الاعتماد على نفسه، وأكثر قابلية للالتزام، وأوضح فهمًا لمعنى الانتماء المسؤول.",
          },
        ],
        groupCardSummary:
          "الوحدة العملية الأساسية داخل الفرقة، ومنها يبدأ العمل الجدي والتحدي الجماعي.",
        groupCardDescription:
          "تربي على اتخاذ القرار، واحترام عريف الطليعة، وتوزيع المهام، وتحويل المهارة إلى إنجاز ملموس.",
        namingCta: "افتح التسميات والصيحات",
      },
      advanced: {
        title: "الكشافة المتقدمون والرائدات",
        age: "15 إلى 18 سنة",
        summary:
          "مرحلة يتبلور فيها الحس القيادي، ويصبح التخطيط، والتقييم، والانضباط الذاتي، والعمل المنظم جزءًا من التكوين اليومي.",
        unit: "الوحدة المتقدمة",
        smallGroup: "الدورية",
        leader: "رائد الدورية",
        scarf: "الأحمر",
        goals: [
          "تعميق معنى القيادة والخدمة.",
          "توسيع مهارات التخطيط والتقييم.",
          "بناء شخصية ناضجة ومبادرة.",
        ],
        methods: [
          "مشاريع تقودها الدورية.",
          "جلسات حوار وتقييم منتظمة.",
          "تكليفات قيادية متدرجة وميدانية.",
        ],
        outcomes: [
          "نضج أكبر في القرار.",
          "قدرة أوضح على قيادة الفريق.",
          "وعي أعمق بالمجتمع والدور الشخصي.",
        ],
        notes: [
          {
            title: "تكوين متقدم",
            description:
              "تنتقل الدورية هنا من تنفيذ التعليمات إلى المساهمة في صياغة البرنامج، واقتراح المبادرات، وتحمل نتائج الاختيارات ضمن روح جماعية منضبطة.",
          },
          {
            title: "معنى الرائدة والرائد",
            description:
              "لا يقود رائد الدورية بالأوامر فقط، بل بالقدوة، وحسن التوزيع، والقدرة على جمع الأفراد حول هدف واضح ومهام قابلة للإنجاز.",
          },
          {
            title: "الانتقال نحو الجوالة",
            description:
              "كل تجربة قيادة ناجحة في هذه المرحلة تهيئ المنخرط للدخول إلى فضاء الجوالة بروح أوسع من الخدمة، والالتزام، والمسؤولية المدنية.",
          },
        ],
        groupCardSummary:
          "إطار متقدم للتكوين القيادي داخل الوحدة المتقدمة، يقوم على الانضباط والتخطيط والتنفيذ الواعي.",
        groupCardDescription:
          "تعلم الشاب كيف يقود فريقًا، ويقيّم عمله، ويتحمل أثر قراره داخل مشروع جماعي منظم.",
        namingCta: "افتح التسميات والشعارات",
      },
      rover: {
        title: "الجوالة والدليلات",
        age: "18 سنة فما فوق إلى أن يصبحوا قادة أو قائدات",
        summary:
          "مرحلة الخدمة الواعية والالتزام الناضج، حيث تصبح الهوية الكشفية مشروعًا عمليًا للقيادة، والبذل، ومرافقة الأجيال الأصغر.",
        unit: "العشيرة",
        smallGroup: "الرهط",
        leader: "رائد الرهط",
        scarf: "الأزرق",
        extraNote: "ألوان القادة لاحقًا: الأخضر الزيتوني + الأحمر.",
        goals: [
          "ربط الانتماء بالخدمة المستمرة.",
          "تعزيز المبادرة المجتمعية الرشيدة.",
          "تهيئة القادة المستقبليين للجمعية.",
        ],
        methods: [
          "مشاريع خدمة ذات أثر واضح.",
          "مرافقة الوحدات الأصغر سنًا.",
          "التكوين القيادي والميداني المتقدم.",
        ],
        outcomes: [
          "نضج في تحمل المسؤولية العامة.",
          "تحول القيم إلى خدمة واقعية.",
          "استعداد طبيعي لأدوار القيادة.",
        ],
        notes: [
          {
            title: "روح العشيرة",
            description:
              "العشيرة ليست محطة ختامية فقط، بل فضاء يترجم فيه الجوال ما تعلمه سابقًا إلى خدمة حقيقية، وتخطيط مسؤول، وحضور نافع داخل الجمعية وخارجها.",
          },
          {
            title: "قيمة الرهط",
            description:
              "يسمح الرهط ببناء صداقة ناضجة قائمة على الوفاء والصدق وتقاسم الخدمة، مع قدرة أكبر على الحوار وصناعة المبادرات المشتركة.",
          },
          {
            title: "من الجوالة إلى القيادة",
            description:
              "حين ينضج المنخرط تربويًا وميدانيًا، يصبح انتقاله إلى مهام القائد استمرارًا طبيعيًا للمسار وليس قفزة منفصلة عن تجربته السابقة.",
          },
        ],
        groupCardSummary:
          "جماعة ناضجة داخل العشيرة، تتشكل حول معنى الخدمة والوفاء وتحمل الرسالة التربوية في بعدها الأوسع.",
        groupCardDescription:
          "يمثل الرهط فضاءً للصحبة الواعية، والمبادرة المجتمعية، والتهيؤ الطبيعي لأدوار القيادة والتأطير.",
        namingCta: "افتح المعاني والنداءات",
      },
    },
    namingGroups: {
      sadasiya: {
        title: "السداسية",
        summary:
          "تعتمد السداسيات أسماء الألوان لسهولة التمييز وبناء هوية مبكرة يفهمها الطفل بسرعة ويحفظها بسهولة.",
        examples: [
          "السداسية الحمراء: نفرح، ننتظم، وننجز.",
          "السداسية الصفراء: بهجة، انتباه، ومبادرة.",
          "السداسية الخضراء: ننمو معًا ونحفظ النظام.",
          "السداسية الزرقاء: نتعاون في هدوء وثقة.",
          "السداسية البيضاء: صفاء، احترام، وصدق.",
          "السداسية البرتقالية: حماس، حركة، وخدمة.",
        ],
        meaning:
          "اللون هنا علامة بسيطة لكنها فعالة؛ فهو يمنح الطفل انتماءً واضحًا ويجعله يشعر بأنه جزء من جماعة لها اسم وصوت ومكان.",
        note:
          "يفضل أن تبقى الصيحات قصيرة وسهلة الترديد، وأن ترتبط بالحركة والابتسامة والوضوح أكثر من التعقيد اللفظي.",
      },
      talia: {
        title: "الطليعة",
        summary:
          "تعتمد الطلائع غالبًا أسماء الحيوانات لما تحمله من صفات واضحة تساعد على بناء صورة ذهنية قوية لكل جماعة.",
        examples: [
          "طليعة الفهد: الفهد دوماً سريع.",
          "طليعة النسر: النسر دوماً في العلا.",
          "طليعة الأسد: الأسد دوماً ملك الغاب.",
          "طليعة الصقر: الصقر دوماً نحو الهدف.",
        ],
        meaning:
          "يعبر الحيوان المختار عن صفة تربوية يراد ترسيخها: السرعة المنضبطة، العلو في الهمة، القوة المؤطرة، أو دقة التركيز والعمل.",
        note:
          "كل طليعة يمكنها أن تربط اسمها بشعار مرئي صغير أو بند نداء موحد يظهر في التجمعات والمنافسات والمهام المشتركة.",
      },
      dawriya: {
        title: "الدورية",
        summary:
          "يناسب هذه المرحلة اعتماد أسماء حديثة ذات طابع كشفي قيادي مثل: العزم، الشعلة، الأفق، الرسوخ، لأنها تنقل معنى القوة والتدرج والتماسك.",
        examples: [
          "دورية العزم: انضباطنا طريق إنجازنا.",
          "دورية الشعلة: نتقدم، نتقن، وننير الطريق.",
          "دورية الأفق: رؤية واضحة وخطوة ثابتة.",
          "دورية الرسوخ: قوة في التكوين، وثبات في الميدان.",
        ],
        meaning:
          "تؤكد هذه التسميات أن الدورية لم تعد فقط فريق نشاط، بل نواة قيادة ناشئة تتقن العمل، وتحسب أثرها، وتحافظ على تماسكها الداخلي.",
        note:
          "كل شعار في هذه المرحلة ينبغي أن يحمل إيقاعًا حازمًا ومعنى تربويًا يربط بين الانضباط، والقدرة، والتقدم المستمر.",
      },
      raht: {
        title: "الرهط",
        summary:
          "تختار الرهوط أسماءً ذات حمولة دينية أو تاريخية أو حضارية مثل: الأندلس، القيروان، الأمانة، الفتح، الشهود؛ حتى يعكس الاسم عمق الرسالة واتساع الأفق.",
        examples: [
          "رهط الأندلس: وفاء للجذور، وخدمة للحاضر.",
          "رهط القيروان: عطاء ثابت ورسالة باقية.",
          "رهط الأمانة: ولاء، خدمة، وبذل.",
          "رهط الفتح: نبذل في صمت ونخدم بإخلاص.",
        ],
        meaning:
          "يمنح الاسم الرهط بعدًا حضاريًا وأخلاقيًا، ويذكر أفراده بأن الجوالة ليست مجرد نشاط، بل مسار وعي ومسؤولية ورسالة متصلة بخير الناس والبلاد.",
        note:
          "كل نداء في الرهط ينبغي أن يؤكد الإخلاص، والوفاء، وروح الخدمة، وأن يبتعد عن المبالغة اللفظية لصالح المعنى الرصين.",
      },
    },
    rituals: {
      flag: {
        title: "رفع العلم",
        summary:
          "افتتاح رسمي يربط النشاط بالنظام والانتماء ويمنح الجماعة لحظة جامعة لبداية اليوم أو المناسبة.",
        imageAlt: "رموز كشفية تعبر عن رفع العلم والمنديل والإيقاع الجماعي.",
        details: [
          {
            title: "المعنى الرمزي",
            description:
              "رفع العلم يذكر المنخرط بأن النشاط ليس فعلًا فرديًا معزولًا، بل جزء من إطار جامع تحكمه القيم والاحترام والانضباط.",
          },
          {
            title: "سياق الاستعمال",
            description:
              "يحضر في الافتتاحات، والمخيمات، والتجمعات الرسمية، والأنشطة التي تحتاج إلى إعلان واضح لبداية العمل المشترك.",
          },
          {
            title: "الأثر التربوي",
            description:
              "يعلم الوقوف المنظم، وحسن الاستماع، واحترام الرموز، وربط الحماس العاطفي بالسلوك المنضبط.",
          },
        ],
      },
      salute: {
        title: "التحية الكشفية",
        summary:
          "إشارة احترام وانتماء وضبط للنفس، تحمل معنى الالتزام أكثر مما تحمل معنى المجاملة الشكلية.",
        imageAlt: "كشاف يؤدي التحية الكشفية.",
        details: [
          {
            title: "التحية الصغرى",
            description:
              "تستعمل في المواقف القريبة والتحيات اليومية داخل الحياة الكشفية، حيث يكون المقصود إظهار الاحترام والجاهزية والانضباط.",
          },
          {
            title: "التحية الكبرى",
            description:
              "تبرز في المراسم الأكثر رسمية مثل رفع العلم أو العهد أو حفلات القبول والصعود، فتمنح اللحظة وقارها التربوي.",
          },
          {
            title: "الدلالة",
            description:
              "تحمل التحية معنى الاحترام المتبادل والانتماء إلى جماعة ذات قانون ورسالة، وتربي على التحكم في الجسد والحضور الواعي.",
          },
        ],
      },
      uniform: {
        title: "الزي الكشفي",
        summary:
          "هوية تربوية موحدة تعلن الانتماء، وتختصر معنى النظام، وتربط الفرد بالجماعة ومسارها التكويني.",
        imageAlt: "منديل كشفية ورموز تعبر عن الزي والهوية.",
        details: [
          {
            title: "أكثر من لباس",
            description:
              "الزي الكشفي ليس مجرد مظهر؛ إنه علامة انتماء تظهر احترام المنخرط للجماعة، واستعداده لتمثيلها بسلوك لائق ومنضبط.",
          },
          {
            title: "اختلافه حسب المرحلة",
            description:
              "تبقى الهوية واحدة بينما تتغير بعض التفاصيل بحسب السن والوحدة والوظيفة التربوية، ويظل لون المنديل من أبرز العلامات الفارقة.",
          },
          {
            title: "الأثر التربوي",
            description:
              "يساعد الزي على تقوية الشعور بالمساواة، وتقليل الفوارق الشكلية، وربط السلوك الشخصي بصورة الجمعية أمام الآخرين.",
          },
        ],
      },
      promise: {
        title: "العهد",
        summary:
          "التزام شخصي وعلني بالقيم والسلوك الكشفي، يربط القول بالممارسة ويجعل الانتماء مسؤولية واعية.",
        imageAlt: "رموز تعبر عن العهد والانتماء الكشفي.",
        details: [
          {
            title: "تعريفه",
            description:
              "العهد محطة يعلن فيها المنخرط استعداده للالتزام بالقيم والمبادئ والسلوك الذي تنتظره منه الجماعة الكشفية.",
          },
          {
            title: "دوره التربوي",
            description:
              "يجعل الالتزام واضحًا ومسموعًا أمام الجماعة، فيشعر المنخرط أن كلمته لها وزن وأن الانتماء ليس شكليًا أو عابرًا.",
          },
          {
            title: "كيف يحيا",
            description:
              "لا يظل العهد جملة محفوظة، بل يتحول إلى مرجع يومي في المواقف، والقرارات، والخدمة، والعلاقة بالآخرين.",
          },
        ],
      },
      acceptance: {
        title: "حفل القبول والصعود",
        summary:
          "محطة انتقال رسمية تمنح كل مرحلة قيمتها، وتشعر المنخرط أن تقدمه جزء من مسار تربوي واضح.",
        imageAlt: "رمز بصري يوحي بالتدرج والنمو داخل النظام الكشفي.",
        details: [
          {
            title: "حفل القبول",
            description:
              "يعلن دخول المنخرط إلى الجماعة بصورة تربوية منظمة، ويمنحه شعورًا بالترحيب والانتماء والالتزام منذ اللحظة الأولى.",
          },
          {
            title: "حفل الصعود",
            description:
              "يوثق الانتقال بين المراحل بطريقة تحفظ معنى الجهد السابق وتفتح أفق المسؤوليات الجديدة دون قطع للهوية الأصلية.",
          },
          {
            title: "الأثر التربوي",
            description:
              "يعلم المنخرط أن النمو له محطات، وأن التدرج قيمة أساسية في الكشفية، وأن كل انتقال يقابله نضج وتكليف جديد.",
          },
        ],
      },
      campfire: {
        title: "نار المخيم",
        summary:
          "مساء وجداني تربوي يجمع السمر، والإنشاد، والتمثيل، والتقويم، ويصنع ذاكرة لا تنسى داخل الجماعة.",
        imageAlt: "حلقة نار مخيم في أجواء كشفية جماعية.",
        details: [
          {
            title: "المشهد التربوي",
            description:
              "تجمع نار المخيم بين الدفء المادي والدفء الوجداني، فتسمح للجماعة بأن تعبّر عن نفسها بالصوت والحضور والإبداع الجماعي.",
          },
          {
            title: "ما تتضمنه",
            description:
              "تشمل الأناشيد، والفقرات القصيرة، والتمثيلات، والصيحات، واللحظات التي يتبادل فيها الأفراد الفرح والتقدير والتقويم.",
          },
          {
            title: "أثرها في الذاكرة",
            description:
              "غالبًا ما تبقى نار المخيم من أكثر اللحظات رسوخًا في ذاكرة المنخرط، لأنها تختصر معنى الجماعة والفرح والانتماء في صورة واحدة.",
          },
        ],
      },
    },
    archiveItems: {
      reports: {
        title: "التقارير",
        description:
          "تقارير منظمة تلخص الأهداف، والبرامج، والنتائج، وتضمن حفظ الأثر التربوي والإداري لكل محطة.",
      },
      activityLogs: {
        title: "سجلات الأنشطة",
        description:
          "سجل يومي أو دوري يثبت ما أنجزته الوحدات، ويجعل تتبع العمل واستمراره أوضح للأجيال اللاحقة.",
      },
      photoArchive: {
        title: "الأرشيف المصور",
        description:
          "صور موثقة بعناوين وتواريخ وأسماء محطات، تحفظ الوجوه واللحظات والقصص التي صنعت الذاكرة الجماعية.",
      },
      visits: {
        title: "الزيارات",
        description:
          "توثيق للوفود، والاستقبالات، واللقاءات، والزيارات التبادلية التي تعزز حضور الجمعية وعلاقاتها التربوية.",
      },
      camps: {
        title: "المخيمات",
        description:
          "ملفات تشمل البرامج، والجداول، والصور، والتقويمات، وكل ما يجعل تجربة المخيم مرجعًا يعود إليه لاحقًا.",
      },
      certificates: {
        title: "الشواهد",
        description:
          "شهادات المشاركة، والتقدير، والتكوين، بما يعكس الجهد الفردي والجماعي ويكرس قيمة الاعتراف بالإنجاز.",
      },
      achievements: {
        title: "المنجزات",
        description:
          "مساحة تجمع المبادرات، والجوائز، والشراكات، والنتائج التي تعبر عن أثر الجمعية في محيطها التربوي والمجتمعي.",
      },
      collectiveMemory: {
        title: "الذاكرة الجماعية",
        description:
          "قصص، وتواريخ، وشهادات، ولحظات مؤثرة تحفظ روح كشافة دار السلام المغربية وتربط الماضي بالمواصلة.",
      },
    },
  },
};

function Arrow({ isRtl }: { isRtl: boolean }) {
  return <span aria-hidden="true">{isRtl ? "\u2190" : "\u2192"}</span>;
}

function SectionIcon({
  kind,
  className = "h-5 w-5",
}: {
  kind: IconKind;
  className?: string;
}) {
  if (kind === "chart") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 18h14" />
        <path d="M7 18V9.8" />
        <path d="M12 18V6.8" />
        <path d="M17 18V3.8" />
        <path d="M5 12h4" />
        <path d="M10 8h4" />
        <path d="M15 5h4" />
      </svg>
    );
  }

  if (kind === "flag") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 21V4" />
        <path d="M5 5c4-2 8 2 13 0v8c-5 2-9-2-13 0" />
      </svg>
    );
  }

  if (kind === "music") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 18V6.4l8-1.8v11.2" />
        <circle cx="7" cy="18" r="2.5" />
        <circle cx="15" cy="16" r="2.5" />
      </svg>
    );
  }

  if (kind === "archive") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </svg>
    );
  }

  if (kind === "users") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 20v-1.4a3.6 3.6 0 0 0-3.6-3.6H8.6A3.6 3.6 0 0 0 5 18.6V20" />
        <circle cx="10.5" cy="8" r="3.1" />
        <path d="M18.8 19v-1a3 3 0 0 0-2.2-2.9" />
        <path d="M15.6 5.2a3 3 0 0 1 0 5.6" />
      </svg>
    );
  }

  if (kind === "document") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </svg>
    );
  }

  if (kind === "notebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 4.5h10a2 2 0 0 1 2 2V19H7a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
        <path d="M9.5 8.5h6" />
        <path d="M9.5 12h6" />
        <path d="M9.5 15.5h4" />
      </svg>
    );
  }

  if (kind === "camera") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.3" />
        <path d="m20 16-4.6-4.6L8 19" />
      </svg>
    );
  }

  if (kind === "compass") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 12h16" />
        <path d="M12 4v16" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }

  if (kind === "fire") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 4c1.7 2 2.7 3.9 2.7 5.8A3.6 3.6 0 0 1 11 13.4c-1.9 0-3.4-1.4-3.4-3.3 0-1.2.5-2.5 1.6-4.1" />
        <path d="m6 20 12-8" />
        <path d="m18 20-12-8" />
      </svg>
    );
  }

  if (kind === "certificate") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 4h12v10H6z" />
        <path d="M10 18 8 21l-1.5-2L4 20l2-4" />
        <path d="m14 18 2 3 1.5-2L20 20l-2-4" />
        <path d="M9 8h6" />
        <path d="M9 11h4.5" />
      </svg>
    );
  }

  if (kind === "star") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 17 6.7 20l1.4-5.8L4 9.8l6-.5L12 4l2 5.3 6 .5-4.1 4.4 1.4 5.8Z" />
      </svg>
    );
  }

  if (kind === "quote") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 8h4v4H7v4H4v-4c0-2.2 1.8-4 4-4Z" />
        <path d="M17 8h4v4h-4v4h-3v-4c0-2.2 1.8-4 4-4Z" />
      </svg>
    );
  }

  if (kind === "uniform") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 4.5 12 7l4-2.5 3 3.2-2.4 2.1V20H7.4V9.8L5 7.7 8 4.5Z" />
        <path d="M10.2 9.5 12 12l1.8-2.5" />
      </svg>
    );
  }

  if (kind === "promise") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 4h10l2 3-7 13L5 7l2-3Z" />
        <path d="M9 9h6" />
        <path d="M10.2 12h3.6" />
      </svg>
    );
  }

  if (kind === "growth") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 18 18 6" />
        <path d="M9 6h9v9" />
        <path d="M5 12c1.5-1.1 2.9-1.7 4.7-1.7 2.4 0 4.4 1 6.3 3" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v18" />
      <path d="M4 12h16" />
      <path d="m7 7 10 10" />
    </svg>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  isRtl,
}: {
  eyebrow: string;
  title: string;
  description: string;
  isRtl: boolean;
}) {
  return (
    <div className={`max-w-3xl ${isRtl ? "text-right" : ""}`}>
      <p className="eyebrow-text text-sm font-semibold text-[#8A6A55]">
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-[2rem] leading-[1.42] text-[#264D3B] sm:text-[2.55rem] ${
          isRtl ? "ar-display-heading" : ""
        }`}
      >
        {title}
      </h2>
      <p className="mt-5 text-[1rem] leading-[2.1] text-[#4F4B45] sm:text-[1.06rem]">
        {description}
      </p>
    </div>
  );
}

function AnchorPill({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="rounded-full border border-[#DDD0BF] bg-[#FFFDF8]/88 px-4 py-2 text-sm font-medium text-[#4A4A43] transition-colors hover:border-[#CBB190] hover:text-[#264D3B]"
    >
      {label}
    </a>
  );
}

export default function ScoutingCulturePage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const homePath = getLocalePath(locale);
  const joinPath = getJoinUsPath(locale);
  const copy = pageCopyByLocale[locale];

  const pageNavigation = messages.navigation.map((item) => ({
    ...item,
    href: item.href.startsWith("#") ? `${homePath}${item.href}` : item.href,
  }));

  return (
    <div lang={locale} dir={direction} className="locale-root">
      <LocaleDocument locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(getPageBreadcrumbs("scouting-culture", locale)) }} />
      <Header
        locale={locale}
        navigation={pageNavigation}
        languageLabels={messages.languageLabels}
        copy={messages.header}
        brandHref={homePath}
        joinHref={joinPath}
      />

      <main className="min-h-screen overflow-x-hidden bg-[#F7F3EC] text-[#2A2A2A]">
        <div lang={locale} dir={direction} className="locale-root">
          <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F3EC_0%,#EFE4D5_45%,#F7F3EC_100%)] px-6 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.94),transparent_22%),radial-gradient(circle_at_84%_12%,rgba(184,106,74,0.14),transparent_22%),radial-gradient(circle_at_30%_78%,rgba(38,77,59,0.11),transparent_24%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(90deg,rgba(38,77,59,0.03)_1px,transparent_1px),linear-gradient(rgba(38,77,59,0.025)_1px,transparent_1px)] bg-[size:34px_34px] opacity-45"
            />

            <div className="relative mx-auto max-w-7xl">
              <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                <div className={`order-2 ${isRtl ? "text-right" : ""} lg:order-1`}>
                  <p className="eyebrow-text text-sm font-semibold text-[#8A6A55]">
                    {copy.hero.eyebrow}
                  </p>
                  <h1
                    className={`mt-5 text-[2.75rem] leading-[1.28] text-[#264D3B] sm:text-[3.65rem] lg:text-[4.45rem] ${
                      isRtl ? "ar-display-heading ar-display-hero" : ""
                    }`}
                  >
                    {copy.hero.title}
                  </h1>
                  <p className="mt-6 max-w-3xl text-[1.06rem] leading-[2.18] text-[#4C4A43] sm:text-[1.15rem]">
                    {copy.hero.description}
                  </p>
                  <div className="mt-8 flex flex-wrap justify-start gap-3">
                    <a
                      href="#stages"
                      className="inline-flex min-h-12 items-center rounded-full border border-[#264D3B] bg-[#264D3B] px-6 py-3 text-[0.98rem] font-semibold text-[#F7F3EC] shadow-[0_18px_36px_rgba(38,77,59,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#305A46]"
                    >
                      {copy.hero.primaryCta}
                    </a>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {copy.hero.quickFacts.map((fact) => (
                      <div
                        key={fact.title}
                        className={`rounded-[1.4rem] border border-white/60 bg-[#FFF9F1]/76 p-4 shadow-[0_10px_28px_rgba(63,51,39,0.07)] backdrop-blur-md ${
                          isRtl ? "text-right" : ""
                        }`}
                      >
                        <p className="text-sm font-semibold text-[#8A6A55]">
                          {fact.title}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#3B312A]">
                          {fact.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative overflow-hidden rounded-[2rem] border border-[#E0D4C5] bg-[linear-gradient(180deg,rgba(255,253,248,0.92)_0%,rgba(247,243,236,0.84)_100%)] p-3 shadow-[0_26px_72px_rgba(64,52,39,0.09)]">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-[#EEE4D6]">
                      <Image
                        src={heroAssets.cloudsBase}
                        alt=""
                        aria-hidden="true"
                        fill
                        priority
                        sizes="(min-width: 1024px) 44vw, 94vw"
                        className="object-cover opacity-70"
                      />
                      <Image
                        src={heroAssets.levelsGear}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(min-width: 1024px) 44vw, 94vw"
                        className="object-contain object-left-top p-6 opacity-70"
                      />
                      <Image
                        src={heroAssets.scoutsOnPath}
                        alt={copy.rituals.campfire.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 44vw, 94vw"
                        className="object-contain object-bottom scale-[1.08] drop-shadow-[0_26px_34px_rgba(64,52,39,0.18)]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,249,241,0.16)_0%,rgba(53,74,59,0.11)_100%)]"
                      />

                      <div className={`absolute left-4 top-4 max-w-[16rem] rounded-[1.25rem] border border-white/55 bg-[#FFF9F1]/78 p-4 shadow-[0_14px_30px_rgba(64,52,39,0.08)] backdrop-blur-md ${isRtl ? "text-right" : ""}`}>
                        <p className="text-xs font-semibold text-[#8A6A55]">
                          {copy.hero.badge.label}
                        </p>
                        <p className="mt-2 text-[1rem] font-semibold leading-8 text-[#264D3B]">
                          {copy.hero.badge.title}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#5C534B]">
                          {copy.hero.badge.description}
                        </p>
                      </div>

                      <div className={`absolute inset-x-5 bottom-5 rounded-[1.35rem] border border-white/55 bg-[#FFF9F1]/82 p-5 shadow-[0_14px_28px_rgba(64,52,39,0.1)] backdrop-blur-md ${isRtl ? "text-right" : ""}`}>
                        <div className={`flex items-start gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                          <div className="relative h-14 w-14 shrink-0 rounded-full border border-[#D8CCBD] bg-white/70 p-2">
                            <Image
                              src={heroAssets.associationLogo}
                              alt={messages.header.brandLogoAlt}
                              fill
                              sizes="56px"
                              className="object-contain p-2"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[1rem] font-semibold leading-8 text-[#264D3B]">
                              {copy.hero.identityCard.title}
                            </p>
                            <p className="text-sm leading-7 text-[#5C534B]">
                              {copy.hero.identityCard.description}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#8A6A55]">
                              {copy.hero.identityCard.chips.map((chip) => (
                                <span
                                  key={chip}
                                  className="rounded-full border border-[#DFCDB8] bg-white/70 px-3 py-1.5"
                                >
                                  {chip}
                                </span>
                              ))}
                            </div>

                            <div className={`mt-3 flex items-center gap-3 rounded-[1rem] border border-[#E5D7C7] bg-white/66 px-3 py-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                              <div className="relative h-9 w-20 shrink-0">
                                <Image
                                  src={heroAssets.leagueLogo}
                                  alt={messages.trustStrip.logos.moroccanScoutingLeague}
                                  fill
                                  sizes="80px"
                                  className="object-contain"
                                />
                              </div>
                              <p className="text-[0.78rem] leading-6 text-[#6B6057]">
                                {copy.hero.identityCard.partnerNote}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ScarfDivider isArabic={isRtl} />

          <section className="px-6 py-8 sm:px-8 sm:py-12">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {copy.quickLinks.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`group rounded-[1.5rem] border border-[#E1D4C3] bg-[linear-gradient(180deg,#FFFDF9_0%,#F8F1E7_100%)] p-5 shadow-[0_14px_34px_rgba(63,51,39,0.045)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_56px_rgba(63,51,39,0.1)] ${isRtl ? "text-right" : ""}`}
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFE8] text-[#264D3B]">
                      <SectionIcon kind={quickLinkIcons[item.id]} />
                    </span>
                    <h2 className="mt-4 text-[1.28rem] leading-[1.35] text-[#264D3B]">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-8 text-[#5C534B]">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8A6A55]">
                      <span>{messages.actions.explore}</span>
                      <Arrow isRtl={isRtl} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <div className="sticky top-[5.6rem] z-30 border-y border-[#E2D6C6] bg-[#F7F3EC]/88 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-6 py-4 sm:px-8">
              {copy.sectionNav.map((item) => (
                <AnchorPill key={item.id} href={`#${item.id}`} label={item.label} />
              ))}
            </div>
          </div>

          <section id="stages" className="scroll-mt-32 px-6 py-12 sm:px-8 sm:py-16">
            <div className="mx-auto max-w-7xl">
              <SectionIntro
                eyebrow={copy.stagesSection.eyebrow}
                title={copy.stagesSection.title}
                description={copy.stagesSection.description}
                isRtl={isRtl}
              />

              <ScoutStagesShowcase
                copy={copy.stagesSection}
                isRtl={isRtl}
                items={stageConfig.map((stage) => ({
                  ...copy.stages[stage.key],
                  key: stage.key,
                  accent: stage.accent,
                  borderColor: stage.borderColor,
                  background: stage.background,
                  iconSrc: stage.iconSrc,
                }))}
              />
            </div>
          </section>

          <section
            id="groups"
            className="scroll-mt-32 bg-[linear-gradient(180deg,rgba(255,250,244,0.92)_0%,rgba(242,234,221,0.86)_100%)] px-6 py-12 sm:px-8 sm:py-16"
          >
            <div className="mx-auto max-w-7xl">
              <SectionIntro
                eyebrow={copy.groupsSection.eyebrow}
                title={copy.groupsSection.title}
                description={copy.groupsSection.description}
                isRtl={isRtl}
              />

              <div className="mt-10 grid gap-8">
                <div className="hidden overflow-hidden rounded-[1.8rem] border border-[#DED1C0] bg-[#FFFBF5] shadow-[0_18px_36px_rgba(63,51,39,0.05)] md:block">
                  <div className="overflow-x-auto">
                    <table className={`min-w-full ${isRtl ? "text-right" : "text-left"}`}>
                      <thead className="bg-[#EFE5D7] text-sm text-[#264D3B]">
                        <tr>
                          {[
                            copy.groupsSection.tableHeaders.stage,
                            copy.groupsSection.tableHeaders.unit,
                            copy.groupsSection.tableHeaders.smallGroup,
                            copy.groupsSection.tableHeaders.size,
                            copy.groupsSection.tableHeaders.leader,
                            copy.groupsSection.tableHeaders.scarf,
                          ].map((header) => (
                            <th key={header} className="px-5 py-4 font-semibold">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EFE4D7] text-sm leading-8 text-[#4F4B45]">
                        {stageConfig.map((stage) => {
                          const item = copy.stages[stage.key];

                          return (
                            <tr key={stage.key} className="odd:bg-[#FFFDF9] even:bg-[#FFF8EF]">
                              <td className="px-5 py-4 font-semibold text-[#264D3B]">
                                {item.title}
                              </td>
                              <td className="px-5 py-4">{item.unit}</td>
                              <td className="px-5 py-4">{item.smallGroup}</td>
                              <td className="px-5 py-4">
                                {stage.key === "cub"
                                  ? isRtl
                                    ? "5 إلى 6"
                                    : locale === "fr"
                                      ? "5 à 6"
                                      : "5 to 6"
                                  : stage.key === "advanced"
                                    ? isRtl
                                      ? "4 أو 8"
                                      : locale === "fr"
                                        ? "4 ou 8"
                                        : "4 or 8"
                                    : isRtl
                                      ? "4 إلى 8"
                                      : locale === "fr"
                                        ? "4 à 8"
                                        : "4 to 8"}
                              </td>
                              <td className="px-5 py-4">{item.leader}</td>
                              <td className="px-5 py-4">{item.scarf}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid gap-4 md:hidden">
                  {stageConfig.map((stage) => {
                    const item = copy.stages[stage.key];

                    return (
                      <article
                        key={stage.key}
                        className={`rounded-[1.5rem] border border-[#DED1C0] bg-[#FFFBF5] p-5 shadow-[0_14px_32px_rgba(63,51,39,0.05)] ${
                          isRtl ? "text-right" : ""
                        }`}
                      >
                        <h3 className="text-[1.18rem] font-semibold text-[#264D3B]">
                          {item.title}
                        </h3>
                        <dl className="mt-4 grid gap-3 text-sm leading-7 text-[#514B44]">
                          <div>
                            <dt className="font-semibold text-[#8A6A55]">
                              {copy.groupsSection.tableHeaders.unit}
                            </dt>
                            <dd>{item.unit}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#8A6A55]">
                              {copy.groupsSection.tableHeaders.smallGroup}
                            </dt>
                            <dd>{item.smallGroup}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#8A6A55]">
                              {copy.groupsSection.tableHeaders.size}
                            </dt>
                            <dd>
                              {stage.key === "cub"
                                ? isRtl
                                  ? "5 إلى 6"
                                  : locale === "fr"
                                    ? "5 à 6"
                                    : "5 to 6"
                                : stage.key === "advanced"
                                  ? isRtl
                                    ? "4 أو 8"
                                    : locale === "fr"
                                      ? "4 ou 8"
                                      : "4 or 8"
                                  : isRtl
                                    ? "4 إلى 8"
                                    : locale === "fr"
                                      ? "4 à 8"
                                      : "4 to 8"}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#8A6A55]">
                              {copy.groupsSection.tableHeaders.leader}
                            </dt>
                            <dd>{item.leader}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-[#8A6A55]">
                              {copy.groupsSection.tableHeaders.scarf}
                            </dt>
                            <dd>{item.scarf}</dd>
                          </div>
                        </dl>
                      </article>
                    );
                  })}
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {stageConfig.map((stage) => {
                    const item = copy.stages[stage.key];

                    return (
                      <article
                        key={`${stage.key}-group-card`}
                        className={`rounded-[1.5rem] border border-[#DED1C0] bg-[linear-gradient(180deg,#FFFDF9_0%,#F7EFE3_100%)] p-5 shadow-[0_14px_30px_rgba(63,51,39,0.04)] ${
                          isRtl ? "text-right" : ""
                        }`}
                      >
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFE8] text-[#264D3B]">
                          <SectionIcon kind="users" />
                        </div>
                        <h3 className="mt-4 text-[1.25rem] font-semibold text-[#264D3B]">
                          {item.smallGroup}
                        </h3>
                        <p className="mt-3 text-sm leading-8 text-[#514B44]">
                          {item.groupCardSummary}
                        </p>
                        <p className="mt-3 text-sm leading-8 text-[#6B6057]">
                          {item.groupCardDescription}
                        </p>
                        <a
                          href={`#${stage.namingId}`}
                          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#DCCFBF] bg-white/76 px-4 py-2 text-sm font-semibold text-[#8A6A55] transition-colors hover:border-[#CBB190] hover:text-[#264D3B]"
                        >
                          {item.namingCta}
                        </a>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section id="naming" className="scroll-mt-32 px-6 py-12 sm:px-8 sm:py-16">
            <div className="mx-auto max-w-7xl">
              <SectionIntro
                eyebrow={copy.namingSection.eyebrow}
                title={copy.namingSection.title}
                description={copy.namingSection.description}
                isRtl={isRtl}
              />

              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                {namingConfig.map((group, index) => {
                  const item = copy.namingGroups[group.key];

                  return (
                    <details
                      key={group.key}
                      id={group.id}
                      open={index === 0}
                      className={`group scroll-mt-32 rounded-[1.6rem] border border-[#DED1C0] bg-[#FFFDF9] p-5 shadow-[0_16px_34px_rgba(63,51,39,0.05)] ${
                        isRtl ? "text-right" : ""
                      }`}
                    >
                      <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-[#8A6A55]">
                              {copy.namingSection.eyebrow}
                            </p>
                            <h3 className="mt-2 text-[1.32rem] font-semibold text-[#264D3B]">
                              {item.title}
                            </h3>
                          </div>
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E7DBCD] bg-[#F8F1E7] text-[#264D3B] transition-transform duration-300 group-open:rotate-180">
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </span>
                        </div>
                        <p className="mt-4 text-sm leading-8 text-[#514B44]">
                          {item.summary}
                        </p>
                      </summary>

                      <div className="mt-6 grid gap-4 border-t border-[#EFE4D7] pt-6 lg:grid-cols-[1.05fr_0.95fr]">
                        <article className={`rounded-[1.2rem] border border-[#EFE4D7] bg-[#FFF8EE] p-4 ${isRtl ? "text-right" : ""}`}>
                          <h4 className="text-[1rem] font-semibold text-[#264D3B]">
                            {copy.namingSection.examplesTitle}
                          </h4>
                          <ul className="mt-3 space-y-2 text-sm leading-8 text-[#514B44]">
                            {item.examples.map((example) => (
                              <li key={example} className="flex items-start gap-2">
                                <span className="mt-[0.78rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B86A4A]" />
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </article>

                        <div className="grid gap-4">
                          <article className={`rounded-[1.2rem] border border-[#EFE4D7] bg-[#FFFDF9] p-4 ${isRtl ? "text-right" : ""}`}>
                            <h4 className="text-[1rem] font-semibold text-[#264D3B]">
                              {copy.namingSection.meaningTitle}
                            </h4>
                            <p className="mt-3 text-sm leading-8 text-[#514B44]">
                              {item.meaning}
                            </p>
                          </article>
                          <article className={`rounded-[1.2rem] border border-[#EFE4D7] bg-[#FFFDF9] p-4 ${isRtl ? "text-right" : ""}`}>
                            <h4 className="text-[1rem] font-semibold text-[#264D3B]">
                              {copy.namingSection.noteTitle}
                            </h4>
                            <p className="mt-3 text-sm leading-8 text-[#514B44]">
                              {item.note}
                            </p>
                          </article>
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            id="rituals"
            className="scroll-mt-32 bg-[linear-gradient(180deg,rgba(38,77,59,0.06)_0%,rgba(233,223,207,0.44)_100%)] px-6 py-12 sm:px-8 sm:py-16"
          >
            <div className="mx-auto max-w-7xl">
              <SectionIntro
                eyebrow={copy.ritualsSection.eyebrow}
                title={copy.ritualsSection.title}
                description={copy.ritualsSection.description}
                isRtl={isRtl}
              />

              <div className="mt-10">
                <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr] xl:items-start">
                  <article className="overflow-hidden rounded-[2rem] border border-[#DED1C0] bg-[linear-gradient(180deg,#FFFDF9_0%,#F3E8DA_100%)] shadow-[0_20px_44px_rgba(63,51,39,0.06)]">
                    <div className="relative aspect-[5/4]">
                      <Image
                        src={heroAssets.symbolsAndSongs}
                        alt={copy.rituals.flag.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 30vw, 94vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,244,0.08)_0%,rgba(42,42,42,0.24)_100%)]" />
                      <div className={`absolute inset-x-5 bottom-5 rounded-[1.35rem] border border-white/55 bg-[#FFF9F1]/82 p-5 shadow-[0_14px_28px_rgba(64,52,39,0.1)] backdrop-blur-md ${isRtl ? "text-right" : ""}`}>
                        <p className="text-sm font-semibold text-[#8A6A55]">
                          {copy.ritualsSection.featureEyebrow}
                        </p>
                        <p className="mt-3 text-[1rem] leading-8 text-[#514B44]">
                          {copy.ritualsSection.featureDescription}
                        </p>
                      </div>
                    </div>
                  </article>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {copy.ritualsSection.values.map((item) => (
                      <article
                        key={item.title}
                        className={`rounded-[1.4rem] border border-[#DED1C0] bg-[#FFFDF9] p-5 shadow-[0_14px_30px_rgba(63,51,39,0.04)] ${
                          isRtl ? "text-right" : ""
                        }`}
                      >
                        <h3 className="text-[1rem] font-semibold text-[#264D3B]">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-8 text-[#514B44]">
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
                  {ritualConfig.map((ritual) => {
                    const item = copy.rituals[ritual.key];

                    return (
                      <details
                        key={ritual.key}
                        open={ritual.defaultOpen}
                        className={`group rounded-[1.7rem] border border-[#DED1C0] bg-[#FFFDF9] p-4 shadow-[0_18px_36px_rgba(63,51,39,0.05)] ${
                          isRtl ? "text-right" : ""
                        }`}
                      >
                        <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
                          <div className="grid gap-4">
                            <div className="relative overflow-hidden rounded-[1.25rem] border border-[#EFE4D7] bg-[linear-gradient(180deg,#F7F0E5_0%,#EEE3D4_100%)]">
                              <div className="relative aspect-[5/3]">
                                <Image
                                  src={ritual.imageSrc}
                                  alt={item.imageAlt}
                                  fill
                                  sizes="(min-width: 1280px) 22vw, (min-width: 768px) 42vw, 92vw"
                                  className="object-contain p-4"
                                />
                                <div className="absolute left-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/75 bg-white/80 text-[#264D3B] shadow-[0_10px_22px_rgba(63,51,39,0.06)]">
                                  <SectionIcon kind={ritual.icon} />
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-[1.28rem] font-semibold text-[#264D3B]">
                                  {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-8 text-[#514B44]">
                                  {item.summary}
                                </p>
                              </div>
                              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E7DBCD] bg-[#F8F1E7] text-[#264D3B] transition-transform duration-300 group-open:rotate-180">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <path d="m6 9 6 6 6-6" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </summary>

                        <div className="mt-6 grid gap-3 border-t border-[#EFE4D7] pt-6">
                          {item.details.map((detail) => (
                            <article
                              key={detail.title}
                              className={`rounded-[1.15rem] border border-[#EFE4D7] bg-[#FFF8EE] p-4 ${isRtl ? "text-right" : ""}`}
                            >
                              <h4 className="text-sm font-semibold text-[#8A6A55]">
                                {detail.title}
                              </h4>
                              <p className="mt-2 text-sm leading-8 text-[#514B44]">
                                {detail.description}
                              </p>
                            </article>
                          ))}
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section id="songs" className="scroll-mt-32 px-6 py-12 sm:px-8 sm:py-16">
            <div className="mx-auto max-w-7xl">
              <SectionIntro
                eyebrow={copy.songsSection.eyebrow}
                title={copy.songsSection.title}
                description={copy.songsSection.description}
                isRtl={isRtl}
              />

              <div className="mt-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
                <div className="grid gap-4 sm:grid-cols-2">
                  {copy.songsSection.cards.map((card) => (
                    <article
                      key={card.title}
                      className={`rounded-[1.45rem] border border-[#DED1C0] bg-[#FFFDF9] p-5 shadow-[0_14px_30px_rgba(63,51,39,0.04)] ${
                        isRtl ? "text-right" : ""
                      }`}
                    >
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F3E8DA] text-[#264D3B]">
                        <SectionIcon kind="music" />
                      </div>
                      <h3 className="mt-4 text-[1.2rem] font-semibold text-[#264D3B]">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-8 text-[#514B44]">
                        {card.description}
                      </p>
                    </article>
                  ))}
                </div>

                <article className={`rounded-[2rem] border border-[#DCCFBF] bg-[linear-gradient(180deg,#FFFDF8_0%,#F3E7DA_100%)] p-6 shadow-[0_20px_44px_rgba(63,51,39,0.06)] sm:p-7 ${isRtl ? "text-right" : ""}`}>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#264D3B] shadow-[0_10px_22px_rgba(63,51,39,0.06)]">
                    <SectionIcon kind="music" className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-[1.38rem] font-semibold text-[#264D3B]">
                    {copy.songsSection.placeholder.title}
                  </h3>
                  <p className="mt-4 text-sm leading-8 text-[#514B44]">
                    {copy.songsSection.placeholder.description}
                  </p>

                  <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#CDB89C] bg-[#FFF9F1]/84 p-5">
                    <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#264D3B] text-[#F7F3EC]">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M8 6v12l10-6z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#264D3B]">
                          {copy.songsSection.placeholder.label}
                        </p>
                        <p className="text-sm leading-7 text-[#6B6057]">
                          {copy.songsSection.placeholder.hints.join(" · ")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2">
                      <div className="h-2 rounded-full bg-[#E4D8C7]" />
                      <div className="h-2 w-[88%] rounded-full bg-[#D4C2AA]" />
                      <div className="h-2 w-[72%] rounded-full bg-[#E4D8C7]" />
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section id="philosophy" className="scroll-mt-32 px-6 py-12 sm:px-8 sm:py-16">
            <div className="mx-auto max-w-7xl">
              <SectionIntro
                eyebrow={copy.philosophySection.eyebrow}
                title={copy.philosophySection.title}
                description={copy.philosophySection.description}
                isRtl={isRtl}
              />

              <div className="mt-10 rounded-[2rem] border border-[#DED1C0] bg-[linear-gradient(180deg,#FFFDF9_0%,#F4EBDD_100%)] p-6 shadow-[0_20px_44px_rgba(63,51,39,0.05)] sm:p-8">
                <div className={`flex items-start gap-4 ${isRtl ? "flex-row-reverse text-right" : ""}`}>
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#264D3B] text-[#F7F3EC] shadow-[0_12px_24px_rgba(38,77,59,0.16)]">
                    <SectionIcon kind="cross" className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-3">
                      {copy.philosophySection.pillars.map((pillar) => (
                        <span
                          key={pillar}
                          className="rounded-full border border-[#D9CCBC] bg-white/78 px-4 py-2 text-sm font-semibold text-[#264D3B]"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 pb-20 pt-4 sm:px-8">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#D9CBB8] bg-[linear-gradient(180deg,#F3EBDD_0%,#FBF7EF_100%)] px-6 py-12 text-center shadow-[0_22px_54px_rgba(63,51,39,0.07)] sm:px-10 sm:py-16">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#264D3B] text-[#F7F3EC] shadow-[0_12px_24px_rgba(38,77,59,0.18)]">
                <SectionIcon kind="quote" className="h-6 w-6" />
              </div>
              <p className="eyebrow-text mt-5 text-sm font-semibold text-[#8A6A55]">
                {copy.conclusion.eyebrow}
              </p>
              <p
                className={`mx-auto mt-6 max-w-4xl text-[1.78rem] leading-[1.8] text-[#264D3B] sm:text-[2.16rem] ${
                  isRtl ? "ar-display-heading" : ""
                }`}
              >
                {copy.conclusion.text}
              </p>
              <a
                href="#stages"
                className="mt-8 inline-flex min-h-12 items-center rounded-full border border-[#D4C2AA] bg-[#FFF9F1] px-6 py-3 text-sm font-semibold text-[#264D3B] transition-colors hover:border-[#CBB190] hover:bg-white"
              >
                {copy.conclusion.cta}
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer
        copy={messages.footer}
        navigation={pageNavigation}
        isRtl={isRtl}
        joinHref={joinPath}
      />
    </div>
  );
}
