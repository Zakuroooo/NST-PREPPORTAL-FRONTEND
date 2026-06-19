/**
 * MOCK DATA LAYER — PlacePrep Student Portal
 *
 * Single source of truth for all dummy/hardcoded data.
 * When backend is ready, replace each function/constant with a real API call.
 *
 * PATTERN:
 *   BEFORE (mock):  export const getCompanyIntel = (slug: string) => companyIntelMap[slug] ?? defaultIntel;
 *   AFTER  (real):  export const getCompanyIntel = async (slug: string) => fetch(`/api/companies/${slug}`).then(r => r.json());
 *
 * Backend: Node.js + Express (or equivalent)
 * Database: PostgreSQL / MongoDB
 */

// ─────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────

export type CompanyCategory = "maang" | "product" | "service" | "startup" | "bfsi" | "other";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type RoundType = "Coding" | "System Design" | "HR" | "Aptitude" | "LLD" | "Domain";

export interface TopicRating {
  id: string;
  label: string;
  defaultRating: number;
}

/** A single interview question — tagged with company, round, topic, difficulty */
export interface Question {
  id: number;
  title: string;
  topic: string;
  diff: Difficulty;
  roundType: RoundType;
  /** Companies that asked this question */
  companies: string[];
  /** LeetCode or source URL. BACKEND TODO: store in questions.source_url */
  leetcodeUrl?: string;
  xp: number;
  hot: boolean;
  /** frequency as % of interviews for this company where question appeared */
  frequency?: number;
}

/** A named round group used in the company Questions tab */
export interface RoundGroup {
  round: number;
  name: string;
  type: RoundType;
  description: string;
  questions: Question[];
}

export interface CompanyIntel {
  name: string;
  slug: string;
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
  /** Round-wise grouped questions — used in Company Intel → Questions tab */
  roundQuestions: RoundGroup[];
}

/** Entry in the global search index */
export interface SearchResult {
  type: "company" | "question" | "topic";
  label: string;
  subtitle: string;
  href: string;
  slug?: string;
  color?: string;
  initial?: string;
}

// ── Multi-company Roadmap ──────────────────────────────
export interface RoadmapWeek {
  weekNumber: number;
  topic: string;
  totalQuestions: number;
  doneQuestions: number;
  status: "done" | "active" | "locked";
  questions: { id: number; title: string; diff: Difficulty; xp: number; leetcodeUrl?: string; done?: boolean }[];
}

export interface UserRoadmapCompany {
  slug: string;
  name: string;
  initial: string;
  color: string;
  role: string;
  totalWeeks: number;
  currentWeek: number;
  pctComplete: number;
  weeks: RoadmapWeek[];
}

/** Entry saved to sessionStorage when user adds a company to roadmap */
export interface RoadmapCompanyEntry {
  slug: string;
  name: string;
  initial: string;
  color: string;
  role: string;         // e.g. "SDE-1"
  weeks: number;        // committed weeks
  addedAt: string;      // ISO string
}

// ── Practice Categories ────────────────────────────────
export interface PracticeCategory {
  id: string;           // "dsa"
  label: string;        // "DSA"
  emoji: string;
  description: string;
  totalQuestions: number;
  color: string;        // tailwind bg class
  textColor: string;    // tailwind text class
  borderColor: string;
  roundTypes: RoundType[];  // which roundTypes this category maps to
}

// ── Notifications ──────────────────────────────────────
export type NotificationType = "badge" | "new_company" | "roadmap" | "experience" | "question" | "xp";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  subtitle?: string;
  emoji: string;
  createdAt: string;   // ISO string
  read: boolean;
}

// ─────────────────────────────────────────────────────
// ONBOARDING — TOPICS BY COMPANY CATEGORY
// ─────────────────────────────────────────────────────
/**
 * BACKEND TODO: GET /api/onboarding/topics?categories=maang,product
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

// ─────────────────────────────────────────────────────
// COMPANY QUESTIONS BANK
// All questions tagged with companies[], roundType, topic, difficulty
// BACKEND TODO: GET /api/questions?company=google&roundType=Coding
// ─────────────────────────────────────────────────────

export const allQuestions: Question[] = [
  // ── GOOGLE ──────────────────────────────────────
  { id: 1,  title: "Two Sum",                          topic: "Arrays",        diff: "Easy",   roundType: "Coding",        companies: ["google","amazon","microsoft"], leetcodeUrl: "https://leetcode.com/problems/two-sum/",                          xp: 10,  hot: true,  frequency: 89 },
  { id: 2,  title: "Merge Intervals",                  topic: "Arrays",        diff: "Medium", roundType: "Coding",        companies: ["google","amazon"],             leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",                  xp: 25,  hot: true,  frequency: 76 },
  { id: 3,  title: "Maximum Subarray",                 topic: "Arrays",        diff: "Medium", roundType: "Coding",        companies: ["google"],                     leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",                 xp: 20,  hot: false, frequency: 71 },
  { id: 4,  title: "Word Search II",                   topic: "Backtracking",  diff: "Hard",   roundType: "Coding",        companies: ["google"],                     leetcodeUrl: "https://leetcode.com/problems/word-search-ii/",                   xp: 40,  hot: true,  frequency: 65 },
  { id: 5,  title: "Trapping Rain Water",              topic: "Arrays",        diff: "Hard",   roundType: "Coding",        companies: ["google","amazon"],             leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",              xp: 40,  hot: true,  frequency: 68 },
  { id: 6,  title: "Number of Islands",                topic: "Graphs",        diff: "Medium", roundType: "Coding",        companies: ["google","amazon","microsoft"], leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",                xp: 25,  hot: true,  frequency: 72 },
  { id: 7,  title: "Design a URL Shortener",           topic: "System Design", diff: "Medium", roundType: "System Design", companies: ["google"],                     xp: 50,  hot: true,  frequency: 58 },
  { id: 8,  title: "Design Google Drive",              topic: "System Design", diff: "Hard",   roundType: "System Design", companies: ["google"],                     xp: 60,  hot: true,  frequency: 52 },
  { id: 9,  title: "Design a Rate Limiter",            topic: "System Design", diff: "Hard",   roundType: "System Design", companies: ["google","amazon"],             xp: 60,  hot: false, frequency: 45 },
  { id: 10, title: "Tell me about a time you failed",  topic: "Behavioral",    diff: "Medium", roundType: "HR",            companies: ["google","amazon","microsoft"], xp: 15,  hot: false, frequency: 90 },
  { id: 11, title: "Describe a conflict with a peer",  topic: "Behavioral",    diff: "Medium", roundType: "HR",            companies: ["google"],                     xp: 15,  hot: false, frequency: 80 },
  { id: 12, title: "Why Google?",                      topic: "Behavioral",    diff: "Easy",   roundType: "HR",            companies: ["google"],                     xp: 10,  hot: false, frequency: 95 },
  { id: 13, title: "Longest Substring Without Repeating", topic: "Sliding Window", diff: "Medium", roundType: "Coding",   companies: ["google","amazon","flipkart"],  leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", xp: 25, hot: true, frequency: 78 },
  { id: 14, title: "Binary Tree Level Order Traversal", topic: "Trees",        diff: "Medium", roundType: "Coding",        companies: ["google","microsoft"],          leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",xp: 25,  hot: false, frequency: 62 },
  { id: 15, title: "Word Ladder",                      topic: "BFS",           diff: "Hard",   roundType: "Coding",        companies: ["google"],                     leetcodeUrl: "https://leetcode.com/problems/word-ladder/",                      xp: 40,  hot: false, frequency: 55 },

  // ── AMAZON ──────────────────────────────────────
  { id: 16, title: "LRU Cache Implementation",         topic: "Design",        diff: "Medium", roundType: "Coding",        companies: ["amazon","microsoft","flipkart"], leetcodeUrl: "https://leetcode.com/problems/lru-cache/",                      xp: 25,  hot: true,  frequency: 82 },
  { id: 17, title: "K-th Largest Element in Array",    topic: "Heaps",         diff: "Medium", roundType: "Coding",        companies: ["amazon"],                     leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/", xp: 25,  hot: false, frequency: 74 },
  { id: 18, title: "Coin Change",                      topic: "DP",            diff: "Medium", roundType: "Coding",        companies: ["amazon","flipkart"],           leetcodeUrl: "https://leetcode.com/problems/coin-change/",                      xp: 25,  hot: false, frequency: 69 },
  { id: 19, title: "Design Amazon Prime Video",        topic: "System Design", diff: "Hard",   roundType: "System Design", companies: ["amazon"],                     xp: 60,  hot: false, frequency: 42 },
  { id: 20, title: "Tell me about a time you owned something end-to-end", topic: "LP", diff: "Medium", roundType: "HR",   companies: ["amazon"],                     xp: 15,  hot: true,  frequency: 95 },
  { id: 21, title: "Describe a situation where you disagreed with your manager", topic: "LP", diff: "Medium", roundType: "HR", companies: ["amazon"],                 xp: 15,  hot: true,  frequency: 90 },
  { id: 22, title: "Serialize and Deserialize Binary Tree", topic: "Trees",    diff: "Hard",   roundType: "Coding",        companies: ["amazon","google"],             leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", xp: 40, hot: true, frequency: 58 },

  // ── FLIPKART ─────────────────────────────────────
  { id: 23, title: "House Robber",                     topic: "DP",            diff: "Medium", roundType: "Coding",        companies: ["flipkart"],                   leetcodeUrl: "https://leetcode.com/problems/house-robber/",                     xp: 20,  hot: false, frequency: 72 },
  { id: 24, title: "Design a Parking Lot",             topic: "LLD",           diff: "Medium", roundType: "LLD",           companies: ["flipkart","microsoft"],        xp: 50,  hot: true,  frequency: 68 },
  { id: 25, title: "Design BookMyShow",                topic: "LLD",           diff: "Hard",   roundType: "LLD",           companies: ["flipkart"],                   xp: 60,  hot: true,  frequency: 55 },
  { id: 26, title: "Merge K Sorted Lists",             topic: "Heaps",         diff: "Hard",   roundType: "Coding",        companies: ["flipkart","microsoft","amazon"], leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",           xp: 40,  hot: true,  frequency: 65 },
  { id: 27, title: "What is a database index?",        topic: "DBMS",          diff: "Easy",   roundType: "Domain",        companies: ["flipkart","tcs"],              xp: 10,  hot: false, frequency: 80 },

  // ── MICROSOFT ────────────────────────────────────
  { id: 28, title: "Valid Parentheses",                topic: "Stacks",        diff: "Easy",   roundType: "Coding",        companies: ["microsoft","meta"],            leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",               xp: 10,  hot: false, frequency: 77 },
  { id: 29, title: "Reverse Linked List",              topic: "Linked List",   diff: "Easy",   roundType: "Coding",        companies: ["microsoft","google","amazon"], leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",              xp: 10,  hot: false, frequency: 82 },
  { id: 30, title: "Design a Notification System",     topic: "System Design", diff: "Medium", roundType: "System Design", companies: ["microsoft"],                  xp: 50,  hot: false, frequency: 38 },

  // ── TCS / SERVICE ────────────────────────────────
  { id: 31, title: "What is normalization?",           topic: "DBMS",          diff: "Easy",   roundType: "Domain",        companies: ["tcs","infosys","wipro"],       xp: 10,  hot: false, frequency: 85 },
  { id: 32, title: "Explain OSI model layers",         topic: "Networking",    diff: "Easy",   roundType: "Domain",        companies: ["tcs","infosys"],               xp: 10,  hot: false, frequency: 80 },
  { id: 33, title: "What is the difference between process and thread?", topic: "OS", diff: "Easy", roundType: "Domain",  companies: ["tcs","infosys","wipro"],       xp: 10,  hot: false, frequency: 88 },
  { id: 34, title: "TCS NQT Aptitude — Speed & Distance", topic: "Aptitude",  diff: "Easy",   roundType: "Aptitude",      companies: ["tcs"],                        xp: 10,  hot: false, frequency: 90 },
  { id: 35, title: "TCS NQT Aptitude — Profit & Loss",    topic: "Aptitude",  diff: "Easy",   roundType: "Aptitude",      companies: ["tcs"],                        xp: 10,  hot: false, frequency: 88 },
  { id: 36, title: "Find duplicate in array",          topic: "Arrays",        diff: "Easy",   roundType: "Coding",        companies: ["tcs","infosys"],               leetcodeUrl: "https://leetcode.com/problems/find-the-duplicate-number/",        xp: 10,  hot: false, frequency: 75 },

  // ── RAZORPAY / STARTUP ───────────────────────────
  { id: 37, title: "Design a Payment Gateway",         topic: "System Design", diff: "Hard",   roundType: "System Design", companies: ["razorpay"],                   xp: 60,  hot: true,  frequency: 85 },
  { id: 38, title: "Implement a Rate Limiter",         topic: "System Design", diff: "Medium", roundType: "System Design", companies: ["razorpay"],                   xp: 50,  hot: true,  frequency: 75 },
  { id: 39, title: "Explain webhook vs polling",       topic: "System Design", diff: "Easy",   roundType: "Domain",        companies: ["razorpay"],                   xp: 15,  hot: false, frequency: 70 },
  { id: 40, title: "Longest Common Subsequence",       topic: "DP",            diff: "Medium", roundType: "Coding",        companies: ["razorpay","amazon","google"],  leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",       xp: 25,  hot: false, frequency: 60 },
];

// ─────────────────────────────────────────────────────
// HELPERS — Questions filtering
// BACKEND TODO: Replace with GET /api/questions?company=X&topic=Y&difficulty=Z&roundType=W&search=Q&page=N
// ─────────────────────────────────────────────────────

export interface QuestionFilter {
  company?: string;
  topic?: string;
  difficulty?: string; // "Easy" | "Medium" | "Hard" | ""
  roundType?: string;  // RoundType | ""
  search?: string;
}

export function filterQuestions(filters: QuestionFilter): Question[] {
  return allQuestions.filter((q) => {
    if (filters.company && filters.company !== "All") {
      if (!q.companies.includes(filters.company.toLowerCase())) return false;
    }
    if (filters.topic && filters.topic !== "All") {
      if (!q.topic.toLowerCase().includes(filters.topic.toLowerCase())) return false;
    }
    if (filters.difficulty && filters.difficulty !== "") {
      if (q.diff !== filters.difficulty) return false;
    }
    if (filters.roundType && filters.roundType !== "") {
      if (q.roundType !== filters.roundType) return false;
    }
    if (filters.search && filters.search.trim() !== "") {
      if (!q.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    }
    return true;
  });
}

/** Get questions for a specific company grouped by round type */
export function getCompanyRoundQuestions(slug: string): RoundGroup[] {
  const companySlug = slug.toLowerCase();
  const qs = allQuestions.filter((q) => q.companies.includes(companySlug));

  const roundOrder: { type: RoundType; name: string; description: string }[] = [
    { type: "Aptitude",      name: "Round 1 — Aptitude / Online Assessment", description: "Quantitative, logical reasoning, and verbal ability questions." },
    { type: "Coding",        name: "Round 2 — DSA / Coding",                 description: "Data Structures & Algorithms problems, timed coding rounds." },
    { type: "LLD",           name: "Round 3 — Low Level Design",             description: "Object-oriented design, design patterns, class diagrams." },
    { type: "System Design", name: "Round 4 — System Design (HLD)",          description: "High-level distributed systems architecture design." },
    { type: "Domain",        name: "Round 5 — Technical / Domain",           description: "Core CS concepts: OS, DBMS, Networking, Language-specific." },
    { type: "HR",            name: "Final Round — HR / Behavioral",          description: "Behavioral questions, culture fit, leadership principles." },
  ];

  const groups: RoundGroup[] = [];
  roundOrder.forEach((r, idx) => {
    const roundQs = qs.filter((q) => q.roundType === r.type);
    if (roundQs.length > 0) {
      groups.push({ round: idx + 1, name: r.name, type: r.type, description: r.description, questions: roundQs });
    }
  });
  return groups;
}

// ─────────────────────────────────────────────────────
// COMPANY INTEL
// BACKEND TODO: GET /api/companies/:slug
// ─────────────────────────────────────────────────────

const defaultCompanyIntel: CompanyIntel = {
  name: "Company",
  slug: "company",
  successRate: "18.4%",
  avgSalary: "₹18 LPA",
  difficulty: "8.5",
  totalQuestions: "1,240",
  hiringStatus: "Active Hiring",
  avgProcess: "4–6 Weeks",
  hiringNote: "Currently actively hiring for engineering roles.",
  roundStructure: [
    { n: 1, name: "Online Assessment", dur: "90 mins • DSA + Aptitude" },
    { n: 2, name: "Technical Round",   dur: "60 mins • DSA" },
    { n: 3, name: "System Design",     dur: "45 mins • HLD/LLD" },
    { n: 4, name: "HR Round",          dur: "30 mins • Behavioral" },
  ],
  topTopics: [
    { topic: "Dynamic Programming", pct: 28 },
    { topic: "Graphs / DFS",        pct: 22 },
    { topic: "Trees",               pct: 18 },
    { topic: "Arrays & Strings",    pct: 15 },
    { topic: "Binary Search",       pct: 10 },
    { topic: "System Design",       pct: 7 },
  ],
  difficultyBreakdown: [
    { name: "Easy",   value: 5,  color: "#10B981" },
    { name: "Medium", value: 40, color: "#F59E0B" },
    { name: "Hard",   value: 55, color: "#EF4444" },
  ],
  trendData: [
    { year: "2022", DSA: 60, SystemDesign: 20, Behavioral: 15 },
    { year: "2023", DSA: 58, SystemDesign: 24, Behavioral: 14 },
    { year: "2024", DSA: 55, SystemDesign: 28, Behavioral: 14 },
    { year: "2025", DSA: 55, SystemDesign: 30, Behavioral: 15 },
  ],
  sampleQuestions: allQuestions.slice(0, 5),
  roundQuestions: [],
};

const companyIntelMap: Record<string, Partial<CompanyIntel>> = {
  google: {
    name: "Google",
    slug: "google",
    successRate: "18.4%",
    avgSalary: "₹45 LPA",
    difficulty: "9.2",
    totalQuestions: "2,274",
    hiringStatus: "Active Hiring",
    avgProcess: "6–8 Weeks",
    hiringNote: "Google recently increased hiring for L3/L4 roles, targeting cloud infrastructure and applied AI. Expect 4 back-to-back 45-minute Zoom sessions post-OA.",
    roundStructure: [
      { n: 1, name: "Online Assessment",   dur: "90 mins • 2 DSA problems" },
      { n: 2, name: "Onsite: Coding 1",    dur: "45 mins • DSA" },
      { n: 3, name: "Onsite: Coding 2",    dur: "45 mins • DSA" },
      { n: 4, name: "Onsite: Googlyness",  dur: "45 mins • Behavioral" },
    ],
    topTopics: [
      { topic: "Arrays & Strings",    pct: 89 },
      { topic: "Dynamic Programming", pct: 76 },
      { topic: "Graphs",              pct: 71 },
      { topic: "Trees",               pct: 68 },
      { topic: "Binary Search",       pct: 64 },
      { topic: "System Design",       pct: 58 },
    ],
    difficultyBreakdown: [
      { name: "Easy",   value: 4,  color: "#10B981" },
      { name: "Medium", value: 41, color: "#F59E0B" },
      { name: "Hard",   value: 55, color: "#EF4444" },
    ],
    trendData: [
      { year: "2022", DSA: 65, SystemDesign: 20, Behavioral: 15 },
      { year: "2023", DSA: 62, SystemDesign: 23, Behavioral: 15 },
      { year: "2024", DSA: 58, SystemDesign: 27, Behavioral: 15 },
      { year: "2025", DSA: 55, SystemDesign: 30, Behavioral: 15 },
    ],
  },
  amazon: {
    name: "Amazon",
    slug: "amazon",
    successRate: "22.1%",
    avgSalary: "₹38 LPA",
    difficulty: "8.8",
    totalQuestions: "1,957",
    hiringStatus: "Active Hiring",
    avgProcess: "4–6 Weeks",
    hiringNote: "Amazon heavily emphasises Leadership Principles in every round. Prepare STAR stories for all 16 LPs. DSA is primarily medium difficulty.",
    roundStructure: [
      { n: 1, name: "Online Assessment",  dur: "90 mins • DSA + LP" },
      { n: 2, name: "Phone Screen",       dur: "60 mins • Coding" },
      { n: 3, name: "Loop Interview",     dur: "5 rounds • DSA + LP" },
    ],
    topTopics: [
      { topic: "Arrays & Strings",    pct: 82 },
      { topic: "Dynamic Programming", pct: 69 },
      { topic: "Trees",               pct: 65 },
      { topic: "Leadership Principles", pct: 90 },
      { topic: "System Design",       pct: 55 },
      { topic: "Heaps",               pct: 48 },
    ],
  },
  flipkart: {
    name: "Flipkart",
    slug: "flipkart",
    successRate: "28.4%",
    avgSalary: "₹32 LPA",
    difficulty: "8.2",
    totalQuestions: "892",
    hiringStatus: "Active Hiring",
    avgProcess: "3–5 Weeks",
    hiringNote: "Flipkart conducts a strong LLD round (Parking Lot, BookMyShow). Machine Coding rounds are timed (90 mins). Expect DSA + LLD + HLD for SDE-2.",
    roundStructure: [
      { n: 1, name: "Online Assessment",  dur: "90 mins • DSA" },
      { n: 2, name: "Machine Coding",     dur: "90 mins • LLD" },
      { n: 3, name: "System Design HLD",  dur: "60 mins • HLD" },
      { n: 4, name: "HR Round",           dur: "30 mins • Behavioral" },
    ],
    topTopics: [
      { topic: "Arrays & DP",     pct: 85 },
      { topic: "LLD / OOD",       pct: 68 },
      { topic: "System Design",   pct: 55 },
      { topic: "Trees & Graphs",  pct: 60 },
      { topic: "DBMS",            pct: 45 },
      { topic: "Behavioral",      pct: 70 },
    ],
  },
  microsoft: {
    name: "Microsoft",
    slug: "microsoft",
    successRate: "25.3%",
    avgSalary: "₹35 LPA",
    difficulty: "8.1",
    totalQuestions: "1,560",
    hiringStatus: "Active Hiring",
    avgProcess: "4–6 Weeks",
    hiringNote: "Microsoft focuses on collaborative problem-solving. LLD and design patterns are increasingly tested. Culture-fit round is an important differentiator.",
    roundStructure: [
      { n: 1, name: "Online Coding",  dur: "60 mins • DSA" },
      { n: 2, name: "Technical 1",    dur: "60 mins • DSA" },
      { n: 3, name: "Technical 2",    dur: "45 mins • LLD" },
      { n: 4, name: "HR / Culture",   dur: "30 mins • Behavioral" },
    ],
    topTopics: [
      { topic: "Arrays & Strings",    pct: 78 },
      { topic: "Trees",               pct: 72 },
      { topic: "LLD / Design",        pct: 60 },
      { topic: "Dynamic Programming", pct: 58 },
      { topic: "Graphs",              pct: 52 },
      { topic: "Behavioral",          pct: 75 },
    ],
  },
  tcs: {
    name: "TCS",
    slug: "tcs",
    successRate: "62.0%",
    avgSalary: "₹7 LPA",
    difficulty: "5.5",
    totalQuestions: "480",
    hiringStatus: "Active Hiring",
    avgProcess: "2–4 Weeks",
    hiringNote: "TCS NQT is the primary filter — focus on Aptitude, Verbal, and basic Coding. Technical interview is mainly CS fundamentals (OS, DBMS, CN, OOP).",
    roundStructure: [
      { n: 1, name: "NQT Aptitude",     dur: "90 mins • Aptitude + Verbal" },
      { n: 2, name: "NQT Coding",       dur: "60 mins • Basic Coding" },
      { n: 3, name: "Technical Interview", dur: "30 mins • CS Fundamentals" },
      { n: 4, name: "HR Round",         dur: "20 mins • HR" },
    ],
    topTopics: [
      { topic: "Aptitude",         pct: 90 },
      { topic: "DBMS",             pct: 85 },
      { topic: "OS Concepts",      pct: 82 },
      { topic: "Networking",       pct: 80 },
      { topic: "OOP",              pct: 78 },
      { topic: "Arrays (Basic)",   pct: 75 },
    ],
    difficultyBreakdown: [
      { name: "Easy",   value: 60, color: "#10B981" },
      { name: "Medium", value: 35, color: "#F59E0B" },
      { name: "Hard",   value: 5,  color: "#EF4444" },
    ],
  },
  razorpay: {
    name: "Razorpay",
    slug: "razorpay",
    successRate: "31.0%",
    avgSalary: "₹28 LPA",
    difficulty: "7.8",
    totalQuestions: "310",
    hiringStatus: "Active Hiring",
    avgProcess: "3–4 Weeks",
    hiringNote: "Razorpay focuses heavily on System Design relevant to payments (rate limiting, idempotency, webhooks). DSA is medium-difficulty. Domain knowledge of fintech is a plus.",
    roundStructure: [
      { n: 1, name: "DSA Coding",       dur: "60 mins • Coding" },
      { n: 2, name: "System Design",    dur: "60 mins • HLD" },
      { n: 3, name: "Domain / Culture", dur: "30 mins • Fintech" },
      { n: 4, name: "HR Round",         dur: "20 mins • Behavioral" },
    ],
    topTopics: [
      { topic: "System Design",   pct: 85 },
      { topic: "Arrays & DSA",    pct: 72 },
      { topic: "Fintech Concepts", pct: 70 },
      { topic: "Behavioral",      pct: 65 },
      { topic: "DP",              pct: 55 },
      { topic: "Graphs",          pct: 45 },
    ],
  },
};

export function getCompanyIntel(slug: string): CompanyIntel {
  const override = companyIntelMap[slug.toLowerCase()] ?? {};
  const base = { ...defaultCompanyIntel, ...override };
  // Always attach dynamic round questions
  base.roundQuestions = getCompanyRoundQuestions(slug);
  return base;
}

export const companyBgColors: Record<string, string> = {
  google:    "bg-blue-600",
  amazon:    "bg-orange-500",
  microsoft: "bg-teal-600",
  flipkart:  "bg-blue-500",
  tcs:       "bg-indigo-600",
  infosys:   "bg-blue-700",
  uber:      "bg-gray-800",
  meta:      "bg-blue-700",
  apple:     "bg-gray-600",
  razorpay:  "bg-blue-800",
  swiggy:    "bg-orange-600",
};

export function getCompanyBg(slug: string): string {
  return companyBgColors[slug.toLowerCase()] ?? "bg-blue-600";
}

// ─────────────────────────────────────────────────────
// COMPANIES LIST
// BACKEND TODO: GET /api/companies
// ─────────────────────────────────────────────────────
export const companiesList = [
  { initial: "G", name: "Google",    color: "bg-blue-600",   questions: 2274, type: "FAANG",          topTopic: "Arrays",  slug: "google" },
  { initial: "A", name: "Amazon",    color: "bg-orange-500", questions: 1957, type: "FAANG",          topTopic: "LP + DP", slug: "amazon" },
  { initial: "M", name: "Microsoft", color: "bg-teal-600",   questions: 1560, type: "FAANG",          topTopic: "Trees",   slug: "microsoft" },
  { initial: "F", name: "Flipkart",  color: "bg-blue-500",   questions: 892,  type: "Indian Product", topTopic: "LLD",     slug: "flipkart" },
  { initial: "R", name: "Razorpay",  color: "bg-blue-800",   questions: 310,  type: "Indian Startup", topTopic: "SysDesign", slug: "razorpay" },
  { initial: "T", name: "TCS",       color: "bg-indigo-600", questions: 480,  type: "Service",        topTopic: "Aptitude", slug: "tcs" },
  { initial: "U", name: "Uber",      color: "bg-gray-800",   questions: 620,  type: "FAANG",          topTopic: "Graphs",  slug: "uber" },
  { initial: "S", name: "Swiggy",    color: "bg-orange-600", questions: 245,  type: "Indian Product", topTopic: "System Design", slug: "swiggy" },
  { initial: "I", name: "Infosys",   color: "bg-blue-700",   questions: 390,  type: "Service",        topTopic: "OOP",     slug: "infosys" },
  { initial: "Z", name: "Zepto",     color: "bg-purple-600", questions: 180,  type: "Indian Startup", topTopic: "DSA",     slug: "zepto" },
  { initial: "W", name: "Wipro",     color: "bg-violet-600", questions: 350,  type: "Service",        topTopic: "Aptitude", slug: "wipro" },
  { initial: "P", name: "Paytm",     color: "bg-sky-600",    questions: 220,  type: "Indian Product", topTopic: "System Design", slug: "paytm" },
];

// ─────────────────────────────────────────────────────
// GLOBAL SEARCH INDEX
// BACKEND TODO: GET /api/search?q=google+sde1
// ─────────────────────────────────────────────────────
export const searchIndex: SearchResult[] = [
  // Companies
  ...companiesList.map((c) => ({
    type: "company" as const,
    label: c.name,
    subtitle: `${c.questions.toLocaleString()} questions · ${c.type}`,
    href: `/companies/${c.slug}`,
    slug: c.slug,
    color: c.color,
    initial: c.initial,
  })),
  // Quick topics
  { type: "topic", label: "Arrays & Strings",    subtitle: "89% of Google interviews",  href: "/practice?topic=Arrays" },
  { type: "topic", label: "Dynamic Programming", subtitle: "76% of FAANG interviews",   href: "/practice?topic=DP" },
  { type: "topic", label: "System Design (HLD)", subtitle: "Critical for SDE-2 roles",  href: "/practice?roundType=System+Design" },
  { type: "topic", label: "LLD / Low Level Design", subtitle: "Flipkart, Microsoft",    href: "/practice?roundType=LLD" },
  { type: "topic", label: "Graphs & BFS/DFS",    subtitle: "71% of Google interviews",  href: "/practice?topic=Graphs" },
  { type: "topic", label: "Aptitude",            subtitle: "TCS NQT, Infosys Spectra",  href: "/practice?roundType=Aptitude" },
  { type: "topic", label: "HR / Behavioral",     subtitle: "All companies",             href: "/practice?roundType=HR" },
];

export function searchAll(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return searchIndex.filter(
    (r) =>
      r.label.toLowerCase().includes(q) ||
      r.subtitle.toLowerCase().includes(q)
  ).slice(0, 8); // max 8 results
}

// ─────────────────────────────────────────────────────
// DASHBOARD DATA
// BACKEND TODO: GET /api/dashboard (authenticated, per-user)
// ─────────────────────────────────────────────────────
export const dashboardTargetCompanies = [
  { initial: "G", name: "Google",    role: "SDE-1 (L3)", readiness: 45, color: "bg-blue-600",   slug: "google" },
  { initial: "A", name: "Amazon",    role: "SDE-1",      readiness: 70, color: "bg-orange-500", slug: "amazon" },
  { initial: "F", name: "Flipkart",  role: "SDE-1",      readiness: 20, color: "bg-blue-500",   slug: "flipkart" },
];

export const dashboardTodayProblems = [
  { id: 1, title: "1. Two Sum",        difficulty: "Easy"   as Difficulty, xp: 10, done: true },
  { id: 2, title: "242. Valid Anagram",  difficulty: "Easy"   as Difficulty, xp: 15, done: false },
  { id: 3, title: "49. Group Anagrams", difficulty: "Medium" as Difficulty, xp: 25, done: false },
];

export const dashboardRecentReports = [
  { initial: "U", name: "Uber",  color: "bg-gray-800",  role: "Software Engineer (L4)", rounds: 4, time: "2 days ago", tags: ["System Design", "Graphs"] },
  { initial: "M", name: "Meta",  color: "bg-blue-700",  role: "Production Engineer",    rounds: 5, time: "5 days ago", tags: ["Linux", "Python"] },
  { initial: "A", name: "Apple", color: "bg-gray-600",  role: "Frontend Engineer",      rounds: 3, time: "1 week ago", tags: ["React", "JS Core"] },
];

// ─────────────────────────────────────────────────────
// UNIQUE TOPICS & COMPANIES (for filter dropdowns)
// ─────────────────────────────────────────────────────
export const allTopics = [
  "Arrays", "DP", "Graphs", "Trees", "Binary Search",
  "Heaps", "Stacks", "Linked List", "Sliding Window",
  "Backtracking", "System Design", "LLD", "DBMS",
  "OS", "Networking", "OOP", "Aptitude", "Behavioral",
];

export const allRoundTypes: RoundType[] = ["Coding", "System Design", "LLD", "HR", "Aptitude", "Domain"];

export const allCompanySlugs = companiesList.map((c) => ({ slug: c.slug, name: c.name }));

// ─────────────────────────────────────────────────────
// PRACTICE CATEGORIES
// BACKEND TODO: GET /api/practice/categories
// ─────────────────────────────────────────────────────
export const practiceCategories: PracticeCategory[] = [
  {
    id: "dsa",
    label: "DSA",
    emoji: "💻",
    description: "Data Structures & Algorithms — arrays, graphs, DP, trees",
    totalQuestions: 2400,
    color: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    roundTypes: ["Coding"],
  },
  {
    id: "system-design",
    label: "System Design",
    emoji: "🏗️",
    description: "High-level design — scalability, databases, caching, APIs",
    totalQuestions: 380,
    color: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    roundTypes: ["System Design"],
  },
  {
    id: "aptitude",
    label: "Aptitude",
    emoji: "🧮",
    description: "Quant, logical reasoning, verbal for TCS NQT, Infosys Spectra",
    totalQuestions: 650,
    color: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    roundTypes: ["Aptitude"],
  },
  {
    id: "hr",
    label: "HR & Behavioral",
    emoji: "🗣️",
    description: "STAR method, leadership principles, culture-fit questions",
    totalQuestions: 290,
    color: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    roundTypes: ["HR"],
  },
  {
    id: "lld",
    label: "LLD / OOP",
    emoji: "⚡",
    description: "Low-level design, design patterns, class diagrams, OOP",
    totalQuestions: 120,
    color: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
    roundTypes: ["LLD"],
  },
  {
    id: "core-cs",
    label: "Core CS",
    emoji: "🎓",
    description: "OS, DBMS, Computer Networks, OOP fundamentals",
    totalQuestions: 500,
    color: "bg-gray-50",
    textColor: "text-gray-700",
    borderColor: "border-gray-200",
    roundTypes: ["Domain"],
  },
  {
    id: "mock-oa",
    label: "Mock OA",
    emoji: "🎯",
    description: "Timed Online Assessment sets — simulate real company tests",
    totalQuestions: 40,
    color: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    roundTypes: ["Coding", "Aptitude"],
  },
  {
    id: "mcqs",
    label: "MCQs",
    emoji: "📝",
    description: "Multiple choice: CS theory, output prediction, debugging",
    totalQuestions: 500,
    color: "bg-teal-50",
    textColor: "text-teal-700",
    borderColor: "border-teal-200",
    roundTypes: ["Domain", "Aptitude"],
  },
];

// ─────────────────────────────────────────────────────
// MOCK NOTIFICATIONS
// BACKEND TODO: GET /api/notifications
// ─────────────────────────────────────────────────────
export const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "badge",
    title: "You earned the \"5-Day Streak\" badge!",
    subtitle: "Keep it going — practice every day",
    emoji: "🏆",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "n2",
    type: "new_company",
    title: "New company added: Zepto (Indian Startup)",
    subtitle: "180 questions now available",
    emoji: "📊",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "n3",
    type: "xp",
    title: "You earned 50 XP for completing onboarding!",
    subtitle: "Your roadmap is live",
    emoji: "⚡",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: "n4",
    type: "roadmap",
    title: "You completed Week 1 of your Google roadmap",
    subtitle: "14/14 problems solved — Week 2 is now unlocked!",
    emoji: "✅",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: "n5",
    type: "experience",
    title: "Your interview experience was approved",
    subtitle: "Your Flipkart SDE-1 experience is now public",
    emoji: "📝",
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: "n6",
    type: "question",
    title: "3 new questions added for Amazon SDE-1",
    subtitle: "Dynamic Programming — new LP-style problems",
    emoji: "🎯",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: "n7",
    type: "badge",
    title: "\"First Solve\" badge unlocked!",
    subtitle: "You solved your first problem on PlacePrep",
    emoji: "🌟",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

// ─────────────────────────────────────────────────────
// MULTI-COMPANY ROADMAP DATA
// BACKEND TODO: GET /api/user/me/roadmap
// ─────────────────────────────────────────────────────
export const mockUserRoadmap: UserRoadmapCompany[] = [
  {
    slug: "google",
    name: "Google",
    initial: "G",
    color: "bg-blue-600",
    role: "SDE-1 (L3)",
    totalWeeks: 12,
    currentWeek: 3,
    pctComplete: 45,
    weeks: [
      {
        weekNumber: 1,
        topic: "Arrays & Hashing",
        totalQuestions: 14,
        doneQuestions: 14,
        status: "done",
        questions: [
          { id: 1,  title: "Two Sum",                   diff: "Easy",   xp: 10, leetcodeUrl: "https://leetcode.com/problems/two-sum/",                         done: true },
          { id: 2,  title: "Merge Intervals",            diff: "Medium", xp: 25, leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",                 done: true },
          { id: 3,  title: "Maximum Subarray",           diff: "Medium", xp: 20, leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",                done: true },
          { id: 13, title: "Longest Substring Without Repeating", diff: "Medium", xp: 25, leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", done: true },
        ],
      },
      {
        weekNumber: 2,
        topic: "Two Pointers & Sliding Window",
        totalQuestions: 10,
        doneQuestions: 6,
        status: "active",
        questions: [
          { id: 5,  title: "Trapping Rain Water",        diff: "Hard",   xp: 40, leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",            done: true },
          { id: 6,  title: "Number of Islands",          diff: "Medium", xp: 25, leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",              done: false },
          { id: 15, title: "Word Ladder",                diff: "Hard",   xp: 40, leetcodeUrl: "https://leetcode.com/problems/word-ladder/",                    done: false },
        ],
      },
      {
        weekNumber: 3,
        topic: "Trees & Binary Search",
        totalQuestions: 12,
        doneQuestions: 0,
        status: "locked",
        questions: [
          { id: 14, title: "Binary Tree Level Order",    diff: "Medium", xp: 25, leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/", done: false },
          { id: 22, title: "Serialize Binary Tree",      diff: "Hard",   xp: 40, leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", done: false },
        ],
      },
      { weekNumber: 4,  topic: "Graphs & BFS/DFS",         totalQuestions: 10, doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 5,  topic: "Dynamic Programming I",     totalQuestions: 12, doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 6,  topic: "Dynamic Programming II",    totalQuestions: 10, doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 7,  topic: "Backtracking",              totalQuestions: 8,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 8,  topic: "Heaps & Priority Queues",   totalQuestions: 8,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 9,  topic: "System Design Basics",      totalQuestions: 6,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 10, topic: "System Design Advanced",    totalQuestions: 6,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 11, topic: "Behavioral / Googlyness",   totalQuestions: 5,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 12, topic: "Mock Interviews & Revision",totalQuestions: 4,  doneQuestions: 0, status: "locked", questions: [] },
    ],
  },
  {
    slug: "amazon",
    name: "Amazon",
    initial: "A",
    color: "bg-orange-500",
    role: "SDE-1",
    totalWeeks: 8,
    currentWeek: 2,
    pctComplete: 70,
    weeks: [
      {
        weekNumber: 1,
        topic: "Arrays, Strings & LP Stories",
        totalQuestions: 12,
        doneQuestions: 12,
        status: "done",
        questions: [
          { id: 1,  title: "Two Sum",                   diff: "Easy",   xp: 10, leetcodeUrl: "https://leetcode.com/problems/two-sum/",                done: true },
          { id: 2,  title: "Merge Intervals",            diff: "Medium", xp: 25, leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",        done: true },
          { id: 20, title: "Tell me about ownership (LP)", diff: "Medium", xp: 15, done: true },
        ],
      },
      {
        weekNumber: 2,
        topic: "Trees, Heaps & Leadership Principles",
        totalQuestions: 10,
        doneQuestions: 7,
        status: "active",
        questions: [
          { id: 17, title: "K-th Largest Element",       diff: "Medium", xp: 25, leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/", done: true },
          { id: 21, title: "Disagree with manager (LP)", diff: "Medium", xp: 15, done: false },
          { id: 22, title: "Serialize Binary Tree",      diff: "Hard",   xp: 40, leetcodeUrl: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", done: false },
        ],
      },
      { weekNumber: 3, topic: "Dynamic Programming",      totalQuestions: 10, doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 4, topic: "Graphs & BFS/DFS",          totalQuestions: 8,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 5, topic: "System Design (LP context)",totalQuestions: 6,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 6, topic: "All 16 LP Stories",          totalQuestions: 8,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 7, topic: "Mock Bar Raiser Round",      totalQuestions: 4,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 8, topic: "Full Revision",              totalQuestions: 4,  doneQuestions: 0, status: "locked", questions: [] },
    ],
  },
  {
    slug: "flipkart",
    name: "Flipkart",
    initial: "F",
    color: "bg-blue-500",
    role: "SDE-1",
    totalWeeks: 8,
    currentWeek: 1,
    pctComplete: 20,
    weeks: [
      {
        weekNumber: 1,
        topic: "DSA Basics + LLD Intro",
        totalQuestions: 10,
        doneQuestions: 2,
        status: "active",
        questions: [
          { id: 23, title: "House Robber",               diff: "Medium", xp: 20, leetcodeUrl: "https://leetcode.com/problems/house-robber/",          done: true },
          { id: 24, title: "Design a Parking Lot (LLD)", diff: "Medium", xp: 50, done: false },
          { id: 26, title: "Merge K Sorted Lists",        diff: "Hard",   xp: 40, leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/", done: false },
        ],
      },
      { weekNumber: 2, topic: "Machine Coding Practice",  totalQuestions: 6,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 3, topic: "LLD Deep Dive",             totalQuestions: 8,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 4, topic: "System Design (HLD)",       totalQuestions: 6,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 5, topic: "DP & Graphs",               totalQuestions: 10, doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 6, topic: "DBMS & Core CS",            totalQuestions: 8,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 7, topic: "Mock Machine Coding",       totalQuestions: 3,  doneQuestions: 0, status: "locked", questions: [] },
      { weekNumber: 8, topic: "Full Revision",             totalQuestions: 4,  doneQuestions: 0, status: "locked", questions: [] },
    ],
  },
];

/** Read roadmap companies from sessionStorage (merges with mock data for demo) */
export function getUserRoadmapCompanies(): UserRoadmapCompany[] {
  // BACKEND TODO: GET /api/user/me/roadmap
  // For now returns mock data. When backend is ready, fetch from API.
  try {
    if (typeof window === "undefined") return mockUserRoadmap;
    const stored = sessionStorage.getItem("roadmap_companies");
    if (!stored) return mockUserRoadmap;
    const entries: RoadmapCompanyEntry[] = JSON.parse(stored);
    // Merge stored entries with mock data
    const slugsInStore = entries.map((e) => e.slug);
    const existing = mockUserRoadmap.filter((c) => slugsInStore.includes(c.slug));
    return existing.length > 0 ? existing : mockUserRoadmap;
  } catch {
    return mockUserRoadmap;
  }
}
