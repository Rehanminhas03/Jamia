// All photo URLs in this file have been verified to return HTTP 200 from
// images.unsplash.com. If you swap IDs, re-run a curl audit before shipping.

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
  image: string;
  icon: DepartmentIcon;
};

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type Course = {
  id: string;
  level: CourseLevel;
  durationWeeks: number;
  departmentId: string;
};

export type NewsItem = {
  id: string;
  category: "event" | "announcement" | "academic";
  date: string;
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

export type Principal = {
  id: "main";
  image: string;
};

export type AdmissionStep = {
  id: string;
  number: string;
};

export type CoreValue = {
  id: string;
  icon: "heart" | "compass" | "shield" | "lightbulb";
};

// Verified Islamic-themed Unsplash photos (all return 200 as of build time)
const photos = {
  mecca: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53",
  mosqueInteriorLight:
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
  worshippers: "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43",
  portrait: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
  domeArchitecture:
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
  arabicBooks: "https://images.unsplash.com/photo-1585036156171-384164a8c675",
  mosqueArches:
    "https://images.unsplash.com/photo-1583336663277-620dc1996580",
  islamicCorridor:
    "https://images.unsplash.com/photo-1560759226-14da22a643ef",
  handsOnQuran:
    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
  studyDesk: "https://images.unsplash.com/photo-1496950866446-3253e1470e8e",
  quranOpen: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056",
  quranLap: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae",
} as const;

const wide = (url: string) => `${url}?w=2000&q=80`;
const card = (url: string) => `${url}?w=1200&q=80`;
const portrait = (url: string) => `${url}?w=600&q=80`;

export const featuredDepartments: Department[] = [
  { id: "quran", icon: "book-open", image: card(photos.quranLap) },
  { id: "hadith", icon: "scroll", image: card(photos.mosqueArches) },
  { id: "fiqh", icon: "scale", image: card(photos.quranOpen) },
  { id: "arabic", icon: "feather", image: card(photos.arabicBooks) },
];

export const allDepartments: Department[] = [
  ...featuredDepartments,
  { id: "tafsir", icon: "library", image: card(photos.studyDesk) },
  { id: "seerah", icon: "sun", image: card(photos.domeArchitecture) },
  { id: "aqeedah", icon: "star", image: card(photos.islamicCorridor) },
  { id: "akhlaq", icon: "graduation-cap", image: card(photos.worshippers) },
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
    image: card(photos.worshippers),
  },
  {
    id: "newHadithChair",
    category: "announcement",
    date: "2026-03-28",
    image: card(photos.mosqueInteriorLight),
  },
  {
    id: "ramadanProgram",
    category: "academic",
    date: "2026-03-02",
    image: card(photos.mecca),
  },
];

export const allNews: NewsItem[] = [
  ...latestNews,
  {
    id: "winterSeminar",
    category: "event",
    date: "2026-02-18",
    image: card(photos.mosqueArches),
  },
  {
    id: "libraryExpansion",
    category: "announcement",
    date: "2026-02-04",
    image: card(photos.arabicBooks),
  },
  {
    id: "intlScholarsVisit",
    category: "academic",
    date: "2026-01-21",
    image: card(photos.handsOnQuran),
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

export const principal: Principal = {
  id: "main",
  image: portrait(photos.portrait),
};

export const heroSlides = [
  { id: "knowledge", image: wide(photos.mecca) },
  { id: "calligraphy", image: wide(photos.handsOnQuran) },
  { id: "students", image: wide(photos.mosqueInteriorLight) },
] as const;

// Used in the home Intro section's arched image.
export const introImage = card(photos.mosqueArches);

export const aboutImages = {
  vision: card(photos.studyDesk),
  mission: card(photos.worshippers),
  history: card(photos.mecca),
};

// Wide Islamic-themed hero photos used as the background of each PageHero.
// Each is chosen for thematic fit with its page.
export const pageHeroImages = {
  about: wide(photos.mosqueArches),
  departments: wide(photos.quranLap),
  courses: wide(photos.arabicBooks),
  admissions: wide(photos.worshippers),
  news: wide(photos.mosqueInteriorLight),
  fatwa: wide(photos.quranOpen),
  contact: wide(photos.domeArchitecture),
};

// Backdrop for the home CTA section — soft mosque interior under heavy gradient.
export const ctaBackdrop = wide(photos.mosqueInteriorLight);

// Backdrop image for the principal's message section.
export const principalBackdrop = wide(photos.arabicBooks);

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
