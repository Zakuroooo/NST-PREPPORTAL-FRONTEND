/**
 * MOCK DATA LAYER — PlacePrep Student Portal
 *
 * This file is the single source of truth for all dummy/hardcoded data.
 * When the backend is ready, replace each exported function/constant with
 * a real API call (fetch, axios, SWR, React Query, etc.).
 *
 * Pattern for backend integration:
 *   BEFORE (mock):  export const getCompanyIntel = (name: string) => companyIntelMap[name] ?? defaultCompanyIntel;
 *   AFTER  (real):  export const getCompanyIntel = async (name: string) => fetch(`/api/companies/${name}`).then(r => r.json());
 */

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type CompanyCategory =
  | "maang"
  | "product"
  | "service"
  | "startup"
  | "bfsi"
  | "other";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TopicRating {
  id: string;
  label: string;
  defaultRating: number;
}

export interface Question {
  title: string;
  topic: string;
  diff: Difficulty;
  hot: boolean;
}

export interface CompanyIntel {
  name: string;
  successRate: string;
  avgSalary: string;
  difficulty: string;
  totalQuestions: string;
  hiringStatus: "Active Hiring" | "Slow Hiring" | "Paused";
  avgProcess: string;
  hiringNote: string;
  roundStructure: { n: number; name: string; dur: string }[];
  topTopics: { topic: string; pct: number }[];
  difficultyBreakdown: { name: string; value: number; color: string }[];
  trendData: { year: string; DSA: number; SystemDesign: number; Behavioral: number }[];
  sampleQuestions: Question[];
}

// ─────────────────────────────────────────────
// ONBOARDING — TOPICS BY COMPANY CATEGORY
// ─────────────────────────────────────────────
/**
 * BACKEND TODO: Replace this map with an API call:
 *   GET /api/onboarding/topics?category={category}
 * The response should return TopicRating[] for the selected category.
 */
export const topicsByCategory: Record<CompanyCategory, TopicRating[]> = {
  maang: [
    { id: "arrays", label: "Arrays & Strings", defaultRating: 5 },
    { id: "dp", label: "Dynamic Programming", defaultRating: 3 },
    { id: "graphs", label: "Graphs & BFS/DFS", defaultRating: 4 },
    { id: "trees", label: "Trees & Binary Search", defaultRating: 5 },
    { id: "sysDesign", label: "System Design (HLD)", defaultRating: 3 },
    { id: "lld", label: "Low Level Design (LLD)", defaultRating: 3 },
    { id: "behavioral", label: "Behavioral (STAR Method)", defaultRating: 6 },
    { id: "os", label: "Operating Systems", defaultRating: 4 },
  ],
  product: [
    { id: "arrays", label: "Arrays & Strings", defaultRating: 5 },
    { id: "dp", label: "Dynamic Programming", defaultRating: 4 },
    { id: "trees", label: "Trees & Graphs", defaultRating: 5 },
    { id: "lld", label: "Low Level Design (LLD)", defaultRating: 3 },
    { id: "sysDesign", label: "System Design (HLD)", defaultRating: 4 },
    { id: "sql", label: "SQL & Databases", defaultRating: 5 },
    { id: "oop", label: "OOP & Design Patterns", defaultRating: 4 },
    { id: "behavioral", label: "Behavioral (STAR Method)", defaultRating: 6 },
  ],
  service: [
    { id: "sql", label: "SQL & DBMS", defaultRating: 5 },
    { id: "os", label: "Operating Systems", defaultRating: 4 },
    { id: "networking", label: "Computer Networks", defaultRating: 4 },
    { id: "java", label: "Java / Core Programming", defaultRating: 5 },
    { id: "arrays", label: "Arrays & Basic DSA", defaultRating: 6 },
    { id: "oop", label: "OOP Concepts", defaultRating: 5 },
    { id: "agile", label: "Agile & SDLC", defaultRating: 6 },
  ],
  startup: [
    { id: "arrays", label: "DSA Fundamentals", defaultRating: 5 },
    { id: "fullstack", label: "Full Stack Concepts", defaultRating: 4 },
    { id: "sysDesign", label: "System Design Basics", defaultRating: 3 },
    { id: "sql", label: "SQL & Databases", defaultRating: 5 },
    { id: "devops", label: "DevOps & Cloud Basics", defaultRating: 3 },
    { id: "problemSolving", label: "Problem Solving", defaultRating: 5 },
  ],
  bfsi: [
    { id: "sql", label: "SQL & Data Analysis", defaultRating: 5 },
    { id: "java", label: "Java / Python Basics", defaultRating: 5 },
    { id: "arrays", label: "DSA Fundamentals", defaultRating: 5 },
    { id: "probability", label: "Probability & Stats", defaultRating: 4 },
    { id: "excel", label: "Excel & Reporting", defaultRating: 6 },
    { id: "networking", label: "Networking Basics", defaultRating: 4 },
  ],
  other: [
    { id: "arrays", label: "Arrays & Strings", defaultRating: 5 },
    { id: "dp", label: "Dynamic Programming", defaultRating: 3 },
    { id: "trees", label: "Trees & Graphs", defaultRating: 4 },
    { id: "sql", label: "SQL & Databases", defaultRating: 5 },
    { id: "sysDesign", label: "System Design", defaultRating: 3 },
    { id: "behavioral", label: "Behavioral (STAR Method)", defaultRating: 6 },
  ],
};

/**
 * Helper to get topics for a given set of selected categories.
 * If multiple categories are selected, it merges topics (deduped by id).
 * BACKEND TODO: Replace with GET /api/onboarding/topics?categories=maang,product
 */
export function getTopicsForCategories(categories: CompanyCategory[]): TopicRating[] {
  if (categories.length === 0) return topicsByCategory.other;
  const seen = new Set<string>();
  const merged: TopicRating[] = [];
  for (const cat of categories) {
    for (const topic of topicsByCategory[cat]) {
      if (!seen.has(topic.id)) {
        seen.add(topic.id);
        merged.push(topic);
      }
    }
  }
  return merged;
}

// ─────────────────────────────────────────────
// COMPANY INTEL
// ─────────────────────────────────────────────
/**
 * BACKEND TODO: Replace with GET /api/companies/:name
 */
const defaultCompanyIntel: CompanyIntel = {
  name: "Company",
  successRate: "18.4%",
  avgSalary: "$190k",
  difficulty: "8.5",
  totalQuestions: "1,240",
  hiringStatus: "Active Hiring",
  avgProcess: "4-6 Weeks",
  hiringNote: "Currently actively hiring for engineering roles.",
  roundStructure: [
    { n: 1, name: "Phone Screen", dur: "45 mins • Coding" },
    { n: 2, name: "Onsite: Coding 1", dur: "45 mins • DSA" },
    { n: 3, name: "Onsite: Coding 2", dur: "45 mins • DSA" },
    { n: 4, name: "Onsite: Behavioral", dur: "45 mins • Behavioral" },
  ],
  topTopics: [
    { topic: "Dynamic Programming", pct: 28 },
    { topic: "Graphs / DFS", pct: 22 },
    { topic: "Trees", pct: 18 },
    { topic: "Arrays & Strings", pct: 15 },
    { topic: "Binary Search", pct: 10 },
    { topic: "System Design", pct: 7 },
  ],
  difficultyBreakdown: [
    { name: "Easy", value: 5, color: "#10B981" },
    { name: "Medium", value: 40, color: "#F59E0B" },
    { name: "Hard", value: 55, color: "#EF4444" },
  ],
  trendData: [
    { year: "2022", DSA: 60, SystemDesign: 20, Behavioral: 15 },
    { year: "2023", DSA: 58, SystemDesign: 24, Behavioral: 14 },
    { year: "2024", DSA: 55, SystemDesign: 28, Behavioral: 14 },
    { year: "2025", DSA: 55, SystemDesign: 30, Behavioral: 15 },
  ],
  sampleQuestions: [
    { title: "Two Sum", topic: "Arrays", diff: "Easy", hot: true },
    { title: "Merge Intervals", topic: "Arrays", diff: "Medium", hot: true },
    { title: "LRU Cache", topic: "System Design", diff: "Hard", hot: false },
    { title: "Number of Islands", topic: "Graphs", diff: "Medium", hot: true },
    { title: "Word Break", topic: "DP", diff: "Medium", hot: false },
  ],
};

const companyIntelMap: Record<string, Partial<CompanyIntel>> = {
  google: {
    name: "Google",
    successRate: "18.4%",
    avgSalary: "$195k",
    difficulty: "9.2",
    totalQuestions: "1,840",
    hiringStatus: "Active Hiring",
    avgProcess: "6-8 Weeks",
    hiringNote: "Google has recently increased hiring for L3/L4 roles, specifically targeting cloud infrastructure and applied AI backgrounds.",
    roundStructure: [
      { n: 1, name: "Phone Screen", dur: "45 mins • Coding" },
      { n: 2, name: "Onsite: Coding 1", dur: "45 mins • DSA" },
      { n: 3, name: "Onsite: Coding 2", dur: "45 mins • DSA" },
      { n: 4, name: "Onsite: Googlyness", dur: "45 mins • Behavioral" },
    ],
  },
  amazon: {
    name: "Amazon",
    successRate: "22.1%",
    avgSalary: "$185k",
    difficulty: "8.8",
    totalQuestions: "2,100",
    hiringStatus: "Active Hiring",
    avgProcess: "4-6 Weeks",
    hiringNote: "Amazon heavily emphasises Leadership Principles in all rounds alongside strong DSA fundamentals.",
    roundStructure: [
      { n: 1, name: "Online Assessment", dur: "90 mins • DSA + LP" },
      { n: 2, name: "Phone Screen", dur: "60 mins • Coding" },
      { n: 3, name: "Loop Interview", dur: "5 rounds • DSA + LP" },
    ],
  },
  microsoft: {
    name: "Microsoft",
    successRate: "25.3%",
    avgSalary: "$180k",
    difficulty: "8.1",
    totalQuestions: "1,560",
    hiringStatus: "Active Hiring",
    avgProcess: "4-6 Weeks",
    hiringNote: "Microsoft focuses on problem-solving ability and collaborative mindset. LLD is increasingly important.",
  },
};

export function getCompanyIntel(name: string): CompanyIntel {
  const override = companyIntelMap[name.toLowerCase()] ?? {};
  return { ...defaultCompanyIntel, ...override };
}

export const companyBgColors: Record<string, string> = {
  google: "bg-blue-600",
  amazon: "bg-orange-500",
  microsoft: "bg-teal-600",
  flipkart: "bg-blue-500",
  tcs: "bg-indigo-600",
  infosys: "bg-blue-700",
  uber: "bg-gray-800",
  meta: "bg-blue-700",
  apple: "bg-gray-600",
};

export function getCompanyBg(name: string): string {
  return companyBgColors[name.toLowerCase()] ?? "bg-blue-600";
}

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────
/**
 * BACKEND TODO: Replace with GET /api/dashboard (authenticated)
 */
export const dashboardTargetCompanies = [
  { initial: "G", name: "Google", role: "Software Engineer", readiness: 45, color: "bg-blue-600", href: "google" },
  { initial: "A", name: "Amazon", role: "SDE II", readiness: 70, color: "bg-orange-500", href: "amazon" },
  { initial: "M", name: "Microsoft", role: "Software Engineer", readiness: 20, color: "bg-teal-600", href: "microsoft" },
];

export const dashboardTodayProblems = [
  { id: 1, title: "1. Two Sum", difficulty: "Easy" as Difficulty, xp: 10, done: true },
  { id: 2, title: "242. Valid Anagram", difficulty: "Easy" as Difficulty, xp: 15, done: false },
  { id: 3, title: "49. Group Anagrams", difficulty: "Medium" as Difficulty, xp: 25, done: false },
];

export const dashboardRecentReports = [
  { initial: "U", name: "Uber", color: "bg-gray-800", role: "Software Engineer (L4)", rounds: 4, time: "2 days ago", tags: ["System Design", "Graphs"] },
  { initial: "M", name: "Meta", color: "bg-blue-700", role: "Production Engineer", rounds: 5, time: "5 days ago", tags: ["Linux", "Python"] },
  { initial: "A", name: "Apple", color: "bg-gray-600", role: "Frontend Engineer", rounds: 3, time: "1 week ago", tags: ["React", "JS Core"] },
];
