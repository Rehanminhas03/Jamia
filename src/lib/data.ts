// Imagery is rendered entirely by the <IslamicArt /> component (SVG-based
// gradient + geometric pattern + lucide icon). No remote photos are used —
// this guarantees every visual is on-brand and removes any dependency on
// third-party image content staying in-context.

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

export const featuredDepartments: Department[] = [
  { id: "quran", icon: "book-open", mood: "deep" },
  { id: "hadith", icon: "scroll", mood: "warm" },
  { id: "fiqh", icon: "scale", mood: "night" },
  { id: "arabic", icon: "feather", mood: "gold" },
];

export const allDepartments: Department[] = [
  ...featuredDepartments,
  { id: "tafsir", icon: "library", mood: "deep" },
  { id: "seerah", icon: "sun", mood: "warm" },
  { id: "aqeedah", icon: "star", mood: "night" },
  { id: "akhlaq", icon: "graduation-cap", mood: "gold" },
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
  { id: "annualConvocation", category: "event", date: "2026-04-12", mood: "warm" },
  { id: "newHadithChair", category: "announcement", date: "2026-03-28", mood: "deep" },
  { id: "ramadanProgram", category: "academic", date: "2026-03-02", mood: "night" },
];

export const allNews: NewsItem[] = [
  ...latestNews,
  { id: "winterSeminar", category: "event", date: "2026-02-18", mood: "gold" },
  { id: "libraryExpansion", category: "announcement", date: "2026-02-04", mood: "sage" },
  { id: "intlScholarsVisit", category: "academic", date: "2026-01-21", mood: "deep" },
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

export const heroSlides: { id: string; mood: IslamicArtMood }[] = [
  { id: "knowledge", mood: "night" },
  { id: "calligraphy", mood: "gold" },
  { id: "students", mood: "deep" },
];

// Keys used by IslamicArt rendering at the top of each page
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

// Icon hints per news category (used for card art)
export const newsCategoryIcon: Record<NewsCategory, "calendar" | "megaphone" | "graduation-cap"> = {
  event: "calendar",
  announcement: "megaphone",
  academic: "graduation-cap",
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
