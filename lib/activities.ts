import { getAbsoluteUrl } from "@/lib/seo";
import { withBasePath } from "@/lib/site";
import type { Locale } from "@/messages";

export type ActivityCategory =
  | "camps"
  | "workshops"
  | "service"
  | "exchange"
  | "training"
  | "scout-life";

export type ActivityFilter = ActivityCategory | "all" | "upcoming";
export type ActivityStatus = "upcoming" | "happening" | "completed";

type LocalizedText = Record<Locale, string>;

export type ProgramFamily = {
  category: ActivityCategory;
  label: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  imageSrc?: string;
  imageAlt: LocalizedText;
  fallbackStyle?: "photo" | "poster" | "pattern";
};

export type ActivityItem = {
  id: string;
  title: LocalizedText;
  category: ActivityCategory;
  dateLabel: LocalizedText;
  startDate?: string;
  endDate?: string;
  location?: LocalizedText;
  shortDescription: LocalizedText;
  coverImage?: string;
  coverAlt?: LocalizedText;
  fallbackStyle?: "photo" | "poster" | "pattern";
  featured?: boolean;
  instagramUrl?: string;
  facebookUrl?: string;
  reportSource?: string;
  shareText?: LocalizedText;
};

export const activityCategories: ActivityCategory[] = [
  "camps",
  "workshops",
  "service",
  "exchange",
  "training",
  "scout-life",
];

export const activityFilters: ActivityFilter[] = [
  "all",
  ...activityCategories,
  "upcoming",
];

export const programFamilies: ProgramFamily[] = [
  {
    category: "camps",
    label: {
      en: "Outdoor life",
      fr: "Vie au grand air",
      ar: "الحياة في الطبيعة",
    },
    title: {
      en: "Camps & Adventures",
      fr: "Camps et aventures",
      ar: "المخيمات والرحلات",
    },
    description: {
      en: "Camps, treks, and outdoor challenges where scouts build confidence, patience, and friendship.",
      fr: "Des camps, randonnées et défis en plein air où les scouts gagnent en confiance, patience et amitié.",
      ar: "مخيمات ورحلات وتحديات في الهواء الطلق تنمّي الثقة والصبر وروح الصداقة.",
    },
    imageSrc: "/activities/programme/toubkal-peace-trek-2025.jpg",
    imageAlt: {
      en: "Scouts gathered in the mountains during a peace-centered trek.",
      fr: "Des scouts réunis en montagne pendant une sortie autour de la paix.",
      ar: "كشافة مجتمعون في الجبل خلال رحلة مرتبطة بثقافة السلام.",
    },
  },
  {
    category: "workshops",
    label: { en: "Learning", fr: "Apprentissage", ar: "التعلم" },
    title: {
      en: "Workshops & Learning",
      fr: "Ateliers et apprentissages",
      ar: "الورشات والتعلم",
    },
    description: {
      en: "Hands-on workshops that turn curiosity into skills, responsibility, and useful action.",
      fr: "Des ateliers pratiques qui transforment la curiosité en compétences, responsabilité et action utile.",
      ar: "ورشات عملية تحوّل الفضول إلى مهارات ومسؤولية وعمل نافع.",
    },
    imageSrc: "/activities/programme/taza-educational-trip-2025.jpg",
    imageAlt: {
      en: "Young participants gathered outdoors during an educational scout activity.",
      fr: "De jeunes participants réunis dehors pendant une activité éducative scoute.",
      ar: "مشاركون صغار مجتمعون في الطبيعة خلال نشاط تربوي كشفي.",
    },
  },
  {
    category: "service",
    label: { en: "Service", fr: "Service", ar: "الخدمة" },
    title: {
      en: "Community Service",
      fr: "Service communautaire",
      ar: "خدمة المجتمع",
    },
    description: {
      en: "Local actions that care for people, places, and the everyday bonds of community.",
      fr: "Des actions locales qui prennent soin des personnes, des lieux et des liens du quotidien.",
      ar: "مبادرات محلية تعتني بالناس والأماكن وروابط الجماعة في الحياة اليومية.",
    },
    imageSrc: "/activities/programme/forest-visit-2022.jpg",
    imageAlt: {
      en: "Scouts learning about trees, planting, and environmental care.",
      fr: "Des scouts découvrant les arbres, la plantation et la protection de l'environnement.",
      ar: "كشافة يتعلمون عن الغرس والعناية بالأشجار وحماية البيئة.",
    },
  },
  {
    category: "exchange",
    label: { en: "Exchange", fr: "Échange", ar: "التبادل" },
    title: {
      en: "International Events",
      fr: "Événements internationaux",
      ar: "الفعاليات الدولية",
    },
    description: {
      en: "Encounters and exchanges that connect local scout life with wider cultures and friendships.",
      fr: "Des rencontres et échanges qui relient la vie scoute locale à d'autres cultures et amitiés.",
      ar: "لقاءات وتبادلات تصل الحياة الكشفية المحلية بثقافات وصداقات أوسع.",
    },
    imageSrc: "/activities/programme/tangier-peace-education-2025.jpg",
    imageAlt: {
      en: "Participants attending a peace education event in Tangier.",
      fr: "Des participants pendant un événement d'éducation à la paix à Tanger.",
      ar: "مشاركون خلال فعالية للتربية على السلام بمدينة طنجة.",
    },
  },
  {
    category: "training",
    label: { en: "Formation", fr: "Formation", ar: "التكوين" },
    title: {
      en: "Training & Leadership",
      fr: "Formation et leadership",
      ar: "التكوين والقيادة",
    },
    description: {
      en: "Formation moments where young people learn to lead, listen, plan, and serve with care.",
      fr: "Des temps de formation où les jeunes apprennent à guider, écouter, organiser et servir avec soin.",
      ar: "محطات تكوينية يتعلم فيها الشباب القيادة والإنصات والتنظيم والخدمة بعناية.",
    },
    imageSrc: "/activities/programme/animator-training-2025.jpg",
    imageAlt: {
      en: "Scouts taking part in a youth animator training program.",
      fr: "Des scouts participant à une formation d'animateurs éducatifs.",
      ar: "كشافة يشاركون في تدريب للمنشطين التربويين.",
    },
    fallbackStyle: "poster",
  },
  {
    category: "scout-life",
    label: { en: "Scout life", fr: "Vie scoute", ar: "الحياة الكشفية" },
    title: {
      en: "Scout Life & Ceremonies",
      fr: "Vie scoute et cérémonies",
      ar: "الحياة الكشفية والمراسم",
    },
    description: {
      en: "Patrol life, promises, songs, ceremonies, and the shared rituals that give scouting its heart.",
      fr: "Vie de patrouille, promesses, chants, cérémonies et rituels partagés qui donnent son âme au scoutisme.",
      ar: "حياة الطليعة والوعد والأناشيد والمراسم والعادات المشتركة التي تمنح الكشفية روحها.",
    },
    imageSrc: "/activities/programme/young-scouts-camp-2024.jpg",
    imageAlt: {
      en: "Young scouts taking part in camp games and shared activities.",
      fr: "De jeunes scouts participant à des jeux de camp et activités communes.",
      ar: "أشبال وزهرات يشاركون في ألعاب المخيم وأنشطة جماعية.",
    },
    fallbackStyle: "pattern",
  },
];

export const activityItems: ActivityItem[] = [
  {
    id: "environmental-education-awareness-2026",
    title: {
      en: "Environmental Education Awareness Activity",
      fr: "Activite de sensibilisation a l'education environnementale",
      ar: "نشاط تربوي تحسيسي حول التربية البيئية",
    },
    category: "workshops",
    dateLabel: {
      en: "June 13, 2026",
      fr: "13 juin 2026",
      ar: "13 يونيو 2026",
    },
    startDate: "2026-06-13",
    location: {
      en: "Taourirt",
      fr: "Taourirt",
      ar: "تاوريرت",
    },
    shortDescription: {
      en: "A youth awareness activity focused on helping children understand the importance of protecting the earth and caring for the environment.",
      fr: "Une activite de sensibilisation pour aider les enfants a comprendre l'importance de proteger la terre et de prendre soin de l'environnement.",
      ar: "نشاط تربوي تحسيسي يهدف إلى توعية الناشئة بأهمية إنقاذ الأرض والعناية بالبيئة.",
    },
    coverImage: "/activities/programme/environmental-education-2026.png",
    coverAlt: {
      en: "Environmental education activity poster for Scouts Maison de La Paix.",
      fr: "Affiche de l'activite d'education environnementale des Scouts Maison de La Paix.",
      ar: "ملصق نشاط تربوي تحسيسي حول التربية البيئية لكشافة دار السلام.",
    },
    instagramUrl: "https://www.instagram.com/p/DZZ1E8lo0H8/?utm_source=ig_embed&utm_campaign=loading",
    facebookUrl:
      "https://www.facebook.com/permalink.php?story_fbid=pfbid036wMa3SVBJ6hC43L38F2Nuih5z6T44ABWcagPuFxXQZKjFt5awj8x6hS1tVwngGsel&id=100067192446286",
    shareText: {
      en: "Join Scouts Maison de La Paix for an environmental education awareness activity on June 13, 2026.",
      fr: "Rejoignez les Scouts Maison de La Paix pour une activite de sensibilisation a l'education environnementale le 13 juin 2026.",
      ar: "انضموا إلى كشافة دار السلام في نشاط تربوي تحسيسي حول التربية البيئية يوم 13 يونيو 2026.",
    },
  },
  {
    id: "tafrent-scout-outing-2026",
    title: {
      en: "Tafrent Scout Outing",
      fr: "Sortie scoute à Tafrent",
      ar: "خرجة كشفية إلى تافرنت",
    },
    category: "camps",
    dateLabel: {
      en: "March 22, 2026",
      fr: "22 mars 2026",
      ar: "22 مارس 2026",
    },
    startDate: "2026-03-22",
    location: {
      en: "Tafrent, near Debdou",
      fr: "Tafrent, près de Debdou",
      ar: "تافرنت، قرب دبدو",
    },
    shortDescription: {
      en: "A mountain outing for Arab Scout Brotherhood Day, shared with fellow scouts through songs, outdoor meals, cooperation, and simple moments in nature.",
      fr: "Une sortie en montagne pour la Journée de la fraternité scoute arabe, avec chants, repas en plein air, coopération et moments simples dans la nature.",
      ar: "خرجة جبلية بمناسبة يوم الأخوة الكشفية العربية، جمعت المشاركين حول الإنشاد والوجبات الخلوية والتعاون ولحظات بسيطة في الطبيعة.",
    },
    coverImage: "/activities/programme/albums/tafrent-2026/01.jpg",
    coverAlt: {
      en: "Scouts gathered during a mountain outing near Taourirt.",
      fr: "Des scouts réunis pendant une sortie en montagne près de Taourirt.",
      ar: "كشافة مجتمعون خلال خرجة جبلية قرب تاوريرت.",
    },
    featured: true,
  },
  {
    id: "toubkal-peace-trek-2025",
    title: {
      en: "Toubkal Trek: On the Path of Peace",
      fr: "Randonnée au Toubkal : sur les pas de la paix",
      ar: "رحلة توبقال: على خطى السلام",
    },
    category: "camps",
    dateLabel: {
      en: "May 5, 2025",
      fr: "5 mai 2025",
      ar: "5 ماي 2025",
    },
    startDate: "2025-05-05",
    location: {
      en: "Mount Toubkal",
      fr: "Mont Toubkal",
      ar: "جبل توبقال",
    },
    shortDescription: {
      en: "A high-mountain journey organized around the International Day of Living Together in Peace under the slogan \"On the path of peace.\"",
      fr: "Une sortie en haute montagne organisée autour de la Journée internationale du vivre-ensemble en paix, sous le slogan « Sur les pas de la paix ».",
      ar: "رحلة جبلية بمناسبة اليوم الدولي للعيش معا في سلام تحت شعار «على خطى السلام».",
    },
    coverImage: "/activities/programme/toubkal-peace-trek-2025.jpg",
    coverAlt: {
      en: "Scouts posing together during the Toubkal peace trek.",
      fr: "Des scouts réunis pendant la randonnée du Toubkal autour de la paix.",
      ar: "كشافة مجتمعون خلال رحلة توبقال حول ثقافة السلام.",
    },
  },
  {
    id: "taza-educational-trip-2025",
    title: {
      en: "Educational Trip to Bab Boudir",
      fr: "Sortie éducative à Bab Boudir",
      ar: "رحلة تربوية إلى باب بودير",
    },
    category: "workshops",
    dateLabel: {
      en: "May 17, 2025",
      fr: "17 mai 2025",
      ar: "17 ماي 2025",
    },
    startDate: "2025-05-17",
    location: {
      en: "Bab Boudir, Taza",
      fr: "Bab Boudir, Taza",
      ar: "باب بودير، تازة",
    },
    shortDescription: {
      en: "A full educational day with scout gatherings, games, songs, prayer time, and workshops on dreaming of a better world and nature for peace.",
      fr: "Une journée éducative avec rassemblements scouts, jeux, chants, temps spirituel et ateliers sur le monde rêvé et la nature pour la paix.",
      ar: "يوم تربوي جمع التجمعات الكشفية والألعاب والأناشيد وورشات حول العالم الذي نود العيش فيه والطبيعة والسلام.",
    },
    coverImage: "/activities/programme/taza-educational-trip-2025.jpg",
    coverAlt: {
      en: "Young participants gathered in a circle during the Taza educational trip.",
      fr: "De jeunes participants réunis en cercle pendant la sortie éducative à Taza.",
      ar: "مشاركون صغار مجتمعون في حلقة خلال الرحلة التربوية إلى تازة.",
    },
  },
  {
    id: "tangier-peace-education-2025",
    title: {
      en: "Peace in the Heart of Education",
      fr: "La paix au coeur de l'éducation",
      ar: "السلام في قلب التربية والتعليم",
    },
    category: "exchange",
    dateLabel: {
      en: "July 23-27, 2025",
      fr: "23-27 juillet 2025",
      ar: "23-27 يوليوز 2025",
    },
    startDate: "2025-07-23",
    endDate: "2025-07-27",
    location: {
      en: "Tangier",
      fr: "Tanger",
      ar: "طنجة",
    },
    shortDescription: {
      en: "A partner event with workshops, a round table, cultural visits, and training around placing peace at the heart of education.",
      fr: "Un événement en partenariat avec ateliers, table ronde, visites culturelles et formation autour de la paix au coeur de l'éducation.",
      ar: "نشاط بشراكة حول إدراج السلام في قلب التربية والتعليم، تضمن ورشات ومائدة مستديرة وزيارات ثقافية وتكوينا للمربين.",
    },
    coverImage: "/activities/programme/tangier-peace-education-2025.jpg",
    coverAlt: {
      en: "Participants seated during a peace education session in Tangier.",
      fr: "Des participants pendant une séance d'éducation à la paix à Tanger.",
      ar: "مشاركون خلال لقاء للتربية على السلام بمدينة طنجة.",
    },
  },
  {
    id: "animator-training-2025",
    title: {
      en: "First-Degree Animator Training",
      fr: "Formation d'animateur de premier degré",
      ar: "تدريب الدرجة الأولى للمنشط التربوي",
    },
    category: "training",
    dateLabel: {
      en: "March 16-23, 2025",
      fr: "16-23 mars 2025",
      ar: "16-23 مارس 2025",
    },
    startDate: "2025-03-16",
    endDate: "2025-03-23",
    location: {
      en: "Saidia holiday center",
      fr: "Centre d'estivage de Saidia",
      ar: "مركز الاصطياف السعيدية",
    },
    shortDescription: {
      en: "Members took part in a regional first-degree training for children's educational animation, strengthening the association's leadership capacity.",
      fr: "Des membres ont participé à une formation régionale de premier degré en animation éducative pour enfants, renforçant les compétences d'encadrement.",
      ar: "شارك أفراد من الجمعية في تدريب الدرجة الأولى للمنشط التربوي فئة الأطفال، دعما لقدرات التأطير والقيادة.",
    },
    coverImage: "/activities/programme/animator-training-2025.jpg",
    coverAlt: {
      en: "Scouts gathered after a first-degree animator training program.",
      fr: "Des scouts réunis après une formation d'animateur de premier degré.",
      ar: "كشافة مجتمعون بعد تدريب للمنشطين التربويين.",
    },
  },
  {
    id: "calligraphy-exhibition-2025",
    title: {
      en: "Kingdom of Letters Exhibition",
      fr: "Exposition Royaume des lettres",
      ar: "معرض مملكة الخطوط",
    },
    category: "workshops",
    dateLabel: {
      en: "January 19, 2025",
      fr: "19 janvier 2025",
      ar: "19 يناير 2025",
    },
    startDate: "2025-01-19",
    location: {
      en: "Taourirt",
      fr: "Taourirt",
      ar: "تاوريرت",
    },
    shortDescription: {
      en: "The scouts attended the third edition of the Kingdom of Letters exhibition, connecting cultural memory, calligraphy, and youth learning.",
      fr: "Les scouts ont participé à la troisième édition de l'exposition Royaume des lettres, reliant mémoire culturelle, calligraphie et apprentissage des jeunes.",
      ar: "حضور كشافة دار السلام في النسخة الثالثة من معرض مملكة الخطوط، في لقاء جمع الذاكرة الثقافية وفن الخط وتعلم الشباب.",
    },
    coverImage: "/activities/programme/calligraphy-exhibition-2025.jpg",
    coverAlt: {
      en: "Participants learning during a cultural calligraphy exhibition.",
      fr: "Des participants pendant une exposition culturelle de calligraphie.",
      ar: "مشاركون خلال معرض ثقافي لفن الخط.",
    },
  },
  {
    id: "young-scouts-camp-2024",
    title: {
      en: "Young Scouts Camp",
      fr: "Camp des jeunes scouts",
      ar: "مخيم الأشبال والزهرات",
    },
    category: "scout-life",
    dateLabel: {
      en: "August 9-20, 2024",
      fr: "9-20 août 2024",
      ar: "9-20 غشت 2024",
    },
    startDate: "2024-08-09",
    endDate: "2024-08-20",
    location: {
      en: "Morocco",
      fr: "Maroc",
      ar: "المغرب",
    },
    shortDescription: {
      en: "A youth camp full of games, songs, movement, and shared scout life for younger members.",
      fr: "Un camp pour les plus jeunes avec jeux, chants, mouvement et vie scoute partagée.",
      ar: "مخيم للفئات الصغرى جمع الألعاب والأناشيد والحركة ولحظات الحياة الكشفية المشتركة.",
    },
    coverImage: "/activities/programme/young-scouts-camp-2024.jpg",
    coverAlt: {
      en: "Young scouts playing together during camp.",
      fr: "De jeunes scouts jouant ensemble pendant le camp.",
      ar: "أشبال وزهرات يلعبون معا خلال المخيم.",
    },
  },
  {
    id: "forest-visit-2022",
    title: {
      en: "Forest and Planting Visit",
      fr: "Visite autour de la forêt et de la plantation",
      ar: "زيارة تربوية للمياه والغابات",
    },
    category: "service",
    dateLabel: {
      en: "April 7, 2022",
      fr: "7 avril 2022",
      ar: "7 أبريل 2022",
    },
    startDate: "2022-04-07",
    location: {
      en: "Taourirt",
      fr: "Taourirt",
      ar: "تاوريرت",
    },
    shortDescription: {
      en: "An environmental education visit about planting, trees, and shared responsibility for ecological peace.",
      fr: "Une visite d'éducation environnementale autour de la plantation, des arbres et de la responsabilité commune pour la paix écologique.",
      ar: "زيارة تربوية حول الغرس والأشجار والمسؤولية المشتركة من أجل السلم البيئي.",
    },
    coverImage: "/activities/programme/forest-visit-2022.jpg",
    coverAlt: {
      en: "Scouts learning outdoors during an environmental education visit.",
      fr: "Des scouts en apprentissage dehors pendant une visite d'éducation environnementale.",
      ar: "كشافة يتعلمون في الخارج خلال زيارة تربوية بيئية.",
    },
  },
  {
    id: "community-cleanup-2020",
    title: {
      en: "Community Cleanup at Moulay Ali Cherif Cemetery",
      fr: "Nettoyage communautaire au cimetière Moulay Ali Cherif",
      ar: "تنظيف مقبرة مولاي علي الشريف",
    },
    category: "service",
    dateLabel: {
      en: "January 31, 2020",
      fr: "31 janvier 2020",
      ar: "31 يناير 2020",
    },
    startDate: "2020-01-31",
    location: {
      en: "Taourirt",
      fr: "Taourirt",
      ar: "تاوريرت",
    },
    shortDescription: {
      en: "A local service action with the municipal council, caring for a shared community space with respect and responsibility.",
      fr: "Une action locale de service avec le conseil communal, pour prendre soin d'un espace commun avec respect et responsabilité.",
      ar: "عمل تطوعي محلي بتنسيق مع المجلس البلدي للعناية بفضاء جماعي بروح المسؤولية والاحترام.",
    },
    coverImage: "/activities/programme/community-cleanup-2020.jpg",
    coverAlt: {
      en: "Scouts gathered during a community cleanup action.",
      fr: "Des scouts réunis pendant une action de nettoyage communautaire.",
      ar: "كشافة مجتمعون خلال حملة تنظيف تطوعية.",
    },
  },
];

export function getActivityStatus(activity: ActivityItem): ActivityStatus {
  if (!activity.startDate) return "completed";

  const now = new Date();
  const start = new Date(activity.startDate);
  const end = activity.endDate ? new Date(activity.endDate) : start;

  end.setHours(23, 59, 59, 999);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "happening";
  return "completed";
}

export function getLocalizedText(text: LocalizedText, locale: Locale) {
  return text[locale] ?? text.en;
}

export function getActivityUrl(activity: ActivityItem, locale: Locale) {
  const basePath =
    locale === "en"
      ? `/programs?category=${activity.category}`
      : `/${locale}/programs?category=${activity.category}`;

  return `${basePath}#${activity.id}`;
}

export function getProgramCategoryUrl(category: ActivityCategory, locale: Locale) {
  return locale === "en"
    ? `/programs?category=${category}`
    : `/${locale}/programs?category=${category}`;
}

export function getUpcomingEventStructuredData(locale: Locale) {
  return activityItems
    .filter((activity) => getActivityStatus(activity) !== "completed")
    .filter((activity) => activity.startDate)
    .map((activity) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: getLocalizedText(activity.title, locale),
      startDate: activity.startDate,
      endDate: activity.endDate ?? activity.startDate,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      description: getLocalizedText(activity.shortDescription, locale),
      image: activity.coverImage
        ? [getAbsoluteUrl(withBasePath(activity.coverImage))]
        : undefined,
      location: {
        "@type": "Place",
        name: activity.location
          ? getLocalizedText(activity.location, locale)
          : "Scouts Maison de La Paix",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Taourirt",
          addressCountry: "MA",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Scouts Maison de La Paix",
        url: getAbsoluteUrl(locale === "en" ? "/" : `/${locale}/`),
      },
    }));
}
