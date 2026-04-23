// Every image URL below was sourced by querying Unsplash search pages for
// terms like "mosque", "quran", "islamic-calligraphy", and "madrasa", then
// resolving each photo permalink to its CDN URL. The accompanying comment
// records what the photo shows according to Unsplash's own description.
//
// If you swap any URL, re-verify the content matches its slot — Unsplash
// IDs are opaque and a 200 response only proves the photo exists, not what
// it depicts.

import type { IslamicArtMood } from "@/components/ui/IslamicArt";

export type DepartmentIcon =
  | "book-open"
  | "scroll"
  | "scale"
  | "feather"
  | "sun"
  | "star"
  | "graduation-cap"
  | "library";

export type Department = {
  id: string;
  icon: DepartmentIcon;
  mood: IslamicArtMood;
  image: string;
};

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type Course = {
  id: string;
  level: CourseLevel;
  durationWeeks: number;
  departmentId: string;
};

export type NewsCategory = "event" | "announcement" | "academic";

export type NewsItem = {
  id: string;
  category: NewsCategory;
  date: string;
  mood: IslamicArtMood;
  image: string;
};

export type FatwaCategory = "worship" | "family" | "business" | "contemporary";

export type FatwaItem = {
  id: string;
  category: FatwaCategory;
  date: string;
};

export type Stat = {
  id: "students" | "teachers" | "years" | "graduates";
  value: number;
  suffix?: string;
};

export type AdmissionStep = {
  id: string;
  number: string;
};

export type CoreValue = {
  id: string;
  icon: "heart" | "compass" | "shield" | "lightbulb";
};

// Verified Islamic Unsplash photos. Each comment is the description from
// Unsplash's own search-result captions.
const PHOTOS = {
  blueMosqueGoldenHour:
    "https://images.unsplash.com/photo-1519817650390-64a93db51149", // Blue Mosque, Turkey, golden hour
  hagiaSophia:
    "https://images.unsplash.com/photo-1567712595315-545da0d341b2", // Hagia Sophia, Turkey
  whiteMosque:
    "https://images.unsplash.com/photo-1554110838-816383ce7956", // white mosque
  domeAerial:
    "https://images.unsplash.com/photo-1519818187420-8e49de7adeef", // aerial photo of dome building
  whiteDomeBuilding:
    "https://images.unsplash.com/photo-1590273089302-ebbc53986b6e", // white concrete building / dome
  buildingWithTower:
    "https://images.unsplash.com/photo-1715824633935-aa7c2a9f74d1", // large building with central tower
  brownMadrasa:
    "https://images.unsplash.com/photo-1543364972-12a04a63ce01", // brown concrete madrasa building
  stoneDoorway:
    "https://images.unsplash.com/photo-1668437688460-fb82fc4d0dce", // doorway in a stone Islamic building

  quranHardbound:
    "https://images.unsplash.com/photo-1609599006353-e629aaabfeae", // brown and black hardbound Quran
  quranOpen:
    "https://images.unsplash.com/photo-1542816417-0983c9c9ad53", // open Quran (Adli Wahid)
  quranBlackGold:
    "https://images.unsplash.com/photo-1624345690118-d303350f7445", // black and gold Quran on wooden seat
  manReadingQuran:
    "https://images.unsplash.com/photo-1573483883644-d0b4b55eb25d", // man reading Quran

  arabicWritingPaper:
    "https://images.unsplash.com/photo-1696513553729-17129c427356", // group of arabic writing on paper
  framedCalligraphy:
    "https://images.unsplash.com/photo-1773213075043-86954c638a98", // framed islamic calligraphy
  domedCeilingCalligraphy:
    "https://images.unsplash.com/photo-1774191441980-16523aa68b76", // intricate arabic calligraphy on a domed ceiling
  calligraphyLogo:
    "https://images.unsplash.com/photo-1670602328279-82c100b3dfa8", // close-up Islamic calligraphy logo
  arabicScriptSign:
    "https://images.unsplash.com/photo-1640595139945-1e2d2158bfa9", // Arabic script on a building sign
  calligraphyArtwork:
    "https://images.unsplash.com/photo-1601480905449-90fca867ad37", // Islamic calligraphy artwork
  decoratedWall:
    "https://images.unsplash.com/photo-1731405717211-00dc10f91792", // intricately decorated wall with calligraphy

  manInDoorway:
    "https://images.unsplash.com/photo-1635685182621-428f36dc047b", // man standing in a doorway of an Islamic building
  personAtDoor:
    "https://images.unsplash.com/photo-1668437838682-e1cdeda779ff", // person in front of a door
} as const;

const wide = (url: string) => `${url}?w=2000&q=80&auto=format&fit=crop`;
const card = (url: string) => `${url}?w=1200&q=80&auto=format&fit=crop`;
const portrait = (url: string) => `${url}?w=600&q=80&auto=format&fit=crop`;

export const featuredDepartments: Department[] = [
  { id: "quran", icon: "book-open", mood: "deep", image: card(PHOTOS.quranHardbound) },
  { id: "hadith", icon: "scroll", mood: "warm", image: card(PHOTOS.framedCalligraphy) },
  { id: "fiqh", icon: "scale", mood: "night", image: card(PHOTOS.domedCeilingCalligraphy) },
  { id: "arabic", icon: "feather", mood: "gold", image: card(PHOTOS.arabicScriptSign) },
];

export const allDepartments: Department[] = [
  ...featuredDepartments,
  { id: "tafsir", icon: "library", mood: "deep", image: card(PHOTOS.quranBlackGold) },
  { id: "seerah", icon: "sun", mood: "warm", image: card(PHOTOS.hagiaSophia) },
  { id: "aqeedah", icon: "star", mood: "night", image: card(PHOTOS.calligraphyLogo) },
  { id: "akhlaq", icon: "graduation-cap", mood: "gold", image: card(PHOTOS.whiteMosque) },
];

export const courses: Course[] = [
  { id: "tajweedFoundation", level: "beginner", durationWeeks: 16, departmentId: "quran" },
  { id: "hifzIntro", level: "beginner", durationWeeks: 24, departmentId: "quran" },
  { id: "arabicBasics", level: "beginner", durationWeeks: 20, departmentId: "arabic" },
  { id: "seerahSurvey", level: "beginner", durationWeeks: 12, departmentId: "seerah" },
  { id: "fiqhWorship", level: "intermediate", durationWeeks: 18, departmentId: "fiqh" },
  { id: "arabicMorphology", level: "intermediate", durationWeeks: 22, departmentId: "arabic" },
  { id: "hadithPrinciples", level: "intermediate", durationWeeks: 20, departmentId: "hadith" },
  { id: "tafsirIntro", level: "intermediate", durationWeeks: 24, departmentId: "tafsir" },
  { id: "advancedFiqh", level: "advanced", durationWeeks: 32, departmentId: "fiqh" },
  { id: "hadithCritique", level: "advanced", durationWeeks: 28, departmentId: "hadith" },
  { id: "advancedTafsir", level: "advanced", durationWeeks: 30, departmentId: "tafsir" },
  { id: "iftaSpecialization", level: "advanced", durationWeeks: 48, departmentId: "fiqh" },
];

export const latestNews: NewsItem[] = [
  {
    id: "annualConvocation",
    category: "event",
    date: "2026-04-12",
    mood: "warm",
    image: card(PHOTOS.buildingWithTower),
  },
  {
    id: "newHadithChair",
    category: "announcement",
    date: "2026-03-28",
    mood: "deep",
    image: card(PHOTOS.calligraphyArtwork),
  },
  {
    id: "ramadanProgram",
    category: "academic",
    date: "2026-03-02",
    mood: "night",
    image: card(PHOTOS.quranOpen),
  },
];

export const allNews: NewsItem[] = [
  ...latestNews,
  {
    id: "winterSeminar",
    category: "event",
    date: "2026-02-18",
    mood: "gold",
    image: card(PHOTOS.stoneDoorway),
  },
  {
    id: "libraryExpansion",
    category: "announcement",
    date: "2026-02-04",
    mood: "sage",
    image: card(PHOTOS.decoratedWall),
  },
  {
    id: "intlScholarsVisit",
    category: "academic",
    date: "2026-01-21",
    mood: "deep",
    image: card(PHOTOS.manReadingQuran),
  },
];

export const fatwaItems: FatwaItem[] = [
  { id: "wuduOnSocks", category: "worship", date: "2026-04-10" },
  { id: "zakatOnGold", category: "worship", date: "2026-04-04" },
  { id: "marriageWali", category: "family", date: "2026-03-29" },
  { id: "inheritanceShares", category: "family", date: "2026-03-22" },
  { id: "interestFreeLoans", category: "business", date: "2026-03-15" },
  { id: "salaryFromBank", category: "business", date: "2026-03-08" },
  { id: "cryptoTrading", category: "contemporary", date: "2026-02-28" },
  { id: "vaccineRulings", category: "contemporary", date: "2026-02-12" },
];

export const stats: Stat[] = [
  { id: "students", value: 2400, suffix: "+" },
  { id: "teachers", value: 120, suffix: "+" },
  { id: "years", value: 45 },
  { id: "graduates", value: 8500, suffix: "+" },
];

export const heroSlides: { id: string; mood: IslamicArtMood; image: string }[] = [
  { id: "knowledge", mood: "night", image: wide(PHOTOS.blueMosqueGoldenHour) },
  { id: "calligraphy", mood: "gold", image: wide(PHOTOS.arabicWritingPaper) },
  { id: "students", mood: "deep", image: wide(PHOTOS.manInDoorway) },
];

// Background image for the home Intro section's arched panel
export const introImage = card(PHOTOS.domeAerial);

// Backdrop for the home CTA section
export const ctaBackdrop = wide(PHOTOS.whiteDomeBuilding);

// Backdrop for the principal's message section (low opacity)
export const principalBackdrop = wide(PHOTOS.decoratedWall);

// Portrait for the principal — Unsplash doesn't have a clear "Islamic
// scholar portrait" so we use a man-reading-Quran shot. Replace with the
// real principal's photo before launch.
export const principalImage = portrait(PHOTOS.personAtDoor);

// Section images for the About page
export const aboutImages = {
  vision: card(PHOTOS.domeAerial),
  mission: card(PHOTOS.brownMadrasa),
  history: card(PHOTOS.hagiaSophia),
};

// Wide hero photos for each Stage 2 page
export const pageHeroImages = {
  about: wide(PHOTOS.framedCalligraphy),
  departments: wide(PHOTOS.quranOpen),
  courses: wide(PHOTOS.arabicWritingPaper),
  admissions: wide(PHOTOS.buildingWithTower),
  news: wide(PHOTOS.whiteMosque),
  fatwa: wide(PHOTOS.calligraphyLogo),
  contact: wide(PHOTOS.hagiaSophia),
};

// Mood per page (still useful for PageHero overlay tinting)
export const pageArt = {
  home: { mood: "deep" as IslamicArtMood },
  about: { mood: "night" as IslamicArtMood },
  departments: { mood: "deep" as IslamicArtMood },
  courses: { mood: "gold" as IslamicArtMood },
  admissions: { mood: "warm" as IslamicArtMood },
  news: { mood: "deep" as IslamicArtMood },
  fatwa: { mood: "night" as IslamicArtMood },
  contact: { mood: "warm" as IslamicArtMood },
};

export const admissionSteps: AdmissionStep[] = [
  { id: "inquiry", number: "01" },
  { id: "application", number: "02" },
  { id: "interview", number: "03" },
  { id: "offer", number: "04" },
  { id: "enrollment", number: "05" },
];

export const coreValues: CoreValue[] = [
  { id: "ikhlas", icon: "heart" },
  { id: "ittibaa", icon: "compass" },
  { id: "amanah", icon: "shield" },
  { id: "khidma", icon: "lightbulb" },
];

export const eligibilityIds = ["age", "education", "memorisation", "interview"] as const;

export const documentIds = [
  "birthCertificate",
  "academicTranscripts",
  "passportPhotos",
  "guardianCnic",
  "referenceLetter",
] as const;

export const programOptions = [
  "alimiyya",
  "tahfeez",
  "ifta",
  "arabicLanguage",
  "shortCourse",
] as const;

export const contactInfo = {
  // Banuri Town, Karachi — placeholder coords
  mapEmbedUrl:
    "https://www.google.com/maps?q=Banuri+Town+Karachi&output=embed",
  hoursWeekday: "Sat – Thu · 8:00 – 17:00",
  hoursWeekend: "Friday · 8:00 – 12:00",
};

export const courseLevels: CourseLevel[] = ["beginner", "intermediate", "advanced"];

export const fatwaCategories: FatwaCategory[] = [
  "worship",
  "family",
  "business",
  "contemporary",
];
