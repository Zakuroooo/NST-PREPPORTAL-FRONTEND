export type CompanyCategory = "maang" | "product" | "service" | "startup" | "bfsi" | "other";

export interface CompanyRanking {
  slug: string;
  name: string;
  type: string;
  category: CompanyCategory;
  alignmentScore: number;
  topTestedSubject: string;
}

// Adapted from student-portal's mock-data.ts companiesList, with added alignmentScore and topTestedSubject
export const mockCompaniesRankings: CompanyRanking[] = [
  { slug: "google", name: "Google", type: "FAANG", category: "maang", alignmentScore: 85, topTestedSubject: "Arrays & Strings" },
  { slug: "amazon", name: "Amazon", type: "FAANG", category: "maang", alignmentScore: 90, topTestedSubject: "System Design" },
  { slug: "microsoft", name: "Microsoft", type: "FAANG", category: "maang", alignmentScore: 82, topTestedSubject: "Trees" },
  { slug: "flipkart", name: "Flipkart", type: "Indian Product", category: "product", alignmentScore: 78, topTestedSubject: "LLD" },
  { slug: "razorpay", name: "Razorpay", type: "Indian Startup", category: "startup", alignmentScore: 75, topTestedSubject: "System Design" },
  { slug: "tcs", name: "TCS", type: "Service", category: "service", alignmentScore: 45, topTestedSubject: "Aptitude" },
  { slug: "uber", name: "Uber", type: "FAANG", category: "maang", alignmentScore: 88, topTestedSubject: "Graphs" },
  { slug: "swiggy", name: "Swiggy", type: "Indian Product", category: "product", alignmentScore: 80, topTestedSubject: "System Design" },
  { slug: "infosys", name: "Infosys", type: "Service", category: "service", alignmentScore: 50, topTestedSubject: "OOP" },
  { slug: "zepto", name: "Zepto", type: "Indian Startup", category: "startup", alignmentScore: 72, topTestedSubject: "Data Structures & Algo" },
  { slug: "wipro", name: "Wipro", type: "Service", category: "service", alignmentScore: 48, topTestedSubject: "Aptitude" },
  { slug: "paytm", name: "Paytm", type: "Indian Product", category: "product", alignmentScore: 74, topTestedSubject: "System Design" },
];
export interface SubjectCoverage {
  subjectName: string;
  courseCode: string;
  coverage: {
    faang: number;
    indianProduct: number;
    indianService: number;
    startups: number;
  };
  industryDemand: "High" | "Medium" | "Low";
}

export const mockCurriculumCoverage: SubjectCoverage[] = [
  {
    subjectName: "Data Structures & Algo",
    courseCode: "CS201",
    coverage: { faang: 25, indianProduct: 45, indianService: 85, startups: 30 },
    industryDemand: "High"
  },
  {
    subjectName: "System Design",
    courseCode: "CS402",
    coverage: { faang: 5, indianProduct: 15, indianService: 40, startups: 10 },
    industryDemand: "High"
  },
  {
    subjectName: "DBMS & SQL",
    courseCode: "CS302",
    coverage: { faang: 60, indianProduct: 75, indianService: 95, startups: 55 },
    industryDemand: "High"
  },
  {
    subjectName: "Modern Web Dev",
    courseCode: "CS401",
    coverage: { faang: 20, indianProduct: 45, indianService: 50, startups: 15 },
    industryDemand: "High"
  },
  {
    subjectName: "OS & Networks",
    courseCode: "CS301",
    coverage: { faang: 65, indianProduct: 80, indianService: 90, startups: 50 },
    industryDemand: "Medium"
  },
  {
    subjectName: "Cloud Computing",
    courseCode: "CS305",
    coverage: { faang: 50, indianProduct: 55, indianService: 60, startups: 45 },
    industryDemand: "High"
  }
];

export function computeOverall(coverage: SubjectCoverage["coverage"]): number {
  const sum = coverage.faang + coverage.indianProduct + coverage.indianService + coverage.startups;
  return Math.round(sum / 4);
}
export type DoubtStatus = "pending" | "answered" | "resolved";
export type DoubtTag = "DSA" | "System Design" | "LLD" | "HR" | "General" | "Web Development" | "Aptitude";

export interface DoubtReply {
  id: string;
  author: "faculty" | "student";
  authorName: string;
  body: string;
  sentAt: string;
}

export interface FacultyDoubt {
  id: string;
  studentName: string;
  studentInitials: string;
  subject: string;
  body: string;
  tag: DoubtTag;
  status: DoubtStatus;
  createdAt: string;
  replies: DoubtReply[];
}

export const mockFacultyDoubts: FacultyDoubt[] = [
  {
    id: "d1",
    studentName: "Aarav Patel",
    studentInitials: "AP",
    subject: "How to approach 2-pointer problems in interviews?",
    body: "I keep freezing when I see sliding window / two-pointer problems. Should I memorise templates or try to derive them from scratch each time?",
    tag: "DSA",
    status: "answered",
    createdAt: "2026-06-24T10:00:00Z",
    replies: [
      {
        id: "r1", author: "faculty", authorName: "Prof. Sharma",
        body: "Great question! You should understand the intuition behind both patterns so you can derive them. The template approach works initially but breaks down on novel variants. I'd recommend practising 5 two-pointer problems without templates first, then check solutions.",
        sentAt: "2026-06-24T12:30:00Z",
      },
      {
        id: "r2", author: "student", authorName: "Aarav Patel",
        body: "That makes sense! Should I start with LeetCode Easy problems or jump to Medium directly?",
        sentAt: "2026-06-24T13:00:00Z",
      },
    ],
  },
  {
    id: "d2",
    studentName: "Kavya Rao",
    studentInitials: "KR",
    subject: "Difference between HLD and LLD — when to go deep?",
    body: "In a Google interview, if they say 'design a URL shortener', should I go into class diagrams or stay at system level? I get confused about how much depth to cover.",
    tag: "System Design",
    status: "pending",
    createdAt: "2026-06-24T14:00:00Z",
    replies: [],
  },
  {
    id: "d3",
    studentName: "Zainab Ali",
    studentInitials: "ZA",
    subject: "STAR method — how long should each answer be?",
    body: "My behavioral answers feel either too short or way too long. Is there a time limit I should target for each STAR response?",
    tag: "HR",
    status: "resolved",
    createdAt: "2026-06-23T09:00:00Z",
    replies: [
      {
        id: "r3", author: "faculty", authorName: "Prof. Sharma",
        body: "Target 2–3 minutes per STAR answer. Situation + Task = ~30 seconds, Action = ~90 seconds (the meat), Result = ~30 seconds. Practice recording yourself — you'll immediately see if you're running long.",
        sentAt: "2026-06-23T11:00:00Z",
      },
    ],
  },
  {
    id: "d4",
    studentName: "Priya Menon",
    studentInitials: "PM",
    subject: "Implementing interfaces vs abstract classes in LLD?",
    body: "When designing a parking lot, should the base vehicle be an interface or an abstract class? What's the best practice in Java?",
    tag: "LLD",
    status: "pending",
    createdAt: "2026-06-25T11:15:00Z",
    replies: [],
  },
  {
    id: "d5",
    studentName: "Rohan Gupta",
    studentInitials: "RG",
    subject: "Is competitive programming necessary for product companies?",
    body: "I am decent at LeetCode medium but struggle with Codeforces. Will this hurt my chances at companies like Amazon or Microsoft?",
    tag: "General",
    status: "answered",
    createdAt: "2026-06-25T15:45:00Z",
    replies: [
      {
        id: "r4", author: "faculty", authorName: "Prof. Sharma",
        body: "Not at all. Product companies focus on data structures and algorithms, not competitive programming tricks. If you can solve LeetCode mediums consistently in 20-30 minutes, you are well prepared for FAANG interviews.",
        sentAt: "2026-06-25T16:20:00Z",
      }
    ],
  },
  {
    id: "d6",
    studentName: "Zainab Ali",
    studentInitials: "ZA",
    subject: "How much SQL is needed for a backend role?",
    body: "Should I focus more on NoSQL databases or traditional RDBMS? Do they ask complex joins and window functions?",
    tag: "System Design",
    status: "pending",
    createdAt: "2026-06-26T08:30:00Z",
    replies: [],
  }
];
export interface MatrixTopic {
  id: string;
  label: string;
  teachingLoad: "high" | "medium" | "low"; // used to compute over-indexed logic
}

export interface MatrixCategory {
  id: string;
  label: string;
  shortLabel: string;
  color: string; // Tailwind bg class for header accent
}

export const TOPICS: MatrixTopic[] = [
  { id: "arrays",      label: "Arrays & Strings",     teachingLoad: "high"   },
  { id: "trees",       label: "Trees",                teachingLoad: "high"   },
  { id: "sql",         label: "SQL & Databases",      teachingLoad: "high"   },
  { id: "oop",         label: "OOP Principles",       teachingLoad: "high"   },
  { id: "dp",          label: "Dynamic Programming",  teachingLoad: "medium" },
  { id: "os",          label: "Operating Systems",    teachingLoad: "high"   },
  { id: "networks",    label: "Computer Networks",    teachingLoad: "medium" },
  { id: "graphs",      label: "Graphs",               teachingLoad: "medium" },
  { id: "hashing",     label: "Hashing",              teachingLoad: "low"    },
  { id: "sysdesign",   label: "System Design",        teachingLoad: "low"    },
];

export const CATEGORIES: MatrixCategory[] = [
  { id: "dsa",        label: "DSA",           shortLabel: "DSA",    color: "bg-blue-100 text-blue-800"      },
  { id: "sysdesign",  label: "System Design", shortLabel: "SysD",   color: "bg-sky-100 text-sky-800"       },
  { id: "sql",        label: "SQL",           shortLabel: "SQL",    color: "bg-blue-100 text-blue-800"      },
  { id: "os",         label: "OS",            shortLabel: "OS",     color: "bg-cyan-100 text-cyan-800"      },
  { id: "networking", label: "Networking",    shortLabel: "Net",    color: "bg-teal-100 text-teal-800"      },
];

// Default matrix state: [topicId][categoryId] = boolean
// Pre-seeded with a realistic mix to make the page look meaningful on first load.
// Key insight: gaps in System Design and Networking for several mid-level topics.
export const DEFAULT_MATRIX: Record<string, Record<string, boolean>> = {
  arrays:    { dsa: true,  sysdesign: false, sql: false, os: false,  networking: false },
  trees:     { dsa: true,  sysdesign: false, sql: false, os: false,  networking: false },
  sql:       { dsa: false, sysdesign: false, sql: true,  os: false,  networking: false },
  oop:       { dsa: true,  sysdesign: true,  sql: false, os: true,   networking: false },
  dp:        { dsa: true,  sysdesign: false, sql: false, os: false,  networking: false },
  os:        { dsa: false, sysdesign: false, sql: false, os: true,   networking: true  },
  networks:  { dsa: false, sysdesign: false, sql: false, os: true,   networking: true  },
  graphs:    { dsa: true,  sysdesign: false, sql: false, os: false,  networking: false },
  hashing:   { dsa: true,  sysdesign: false, sql: false, os: false,  networking: false },
  sysdesign: { dsa: false, sysdesign: true,  sql: false, os: false,  networking: false },
};
export interface ReportHistory {
  id: string;
  name: string;
  date: string;
}

// Sample report history for /reports page
export const mockReportHistory: ReportHistory[] = [
  { id: "rep-1", name: "Fall 2024 Curriculum Audit", date: "Oct 12, 2024" },
  { id: "rep-2", name: "Q3 Industry Alignment Report", date: "Sep 30, 2024" },
  { id: "rep-3", name: "CS Department Gap Analysis", date: "Aug 15, 2024" },
];
export type SessionStatus = "pending" | "confirmed" | "proposed" | "completed" | "cancelled";

export interface FacultySessionRequest {
  id: string;
  studentName: string;
  studentInitials: string;
  branch: string;
  year: string;
  topic: string;
  notes: string;
  date: string;
  time: string;
  duration: 30 | 60;
  status: SessionStatus;
  meetLink?: string;
  proposedDate?: string;
  proposedTime?: string;
}

export const mockFacultySessionRequests: FacultySessionRequest[] = [
  {
    id: "req-1",
    studentName: "Maya Singh",
    studentInitials: "MS",
    branch: "Computer Science",
    year: "Year 3",
    topic: "System Design Mock Interview",
    notes: "Want to practice designing a URL shortener end-to-end",
    date: "2026-06-26",
    time: "10:00 AM",
    duration: 60,
    status: "confirmed",
    meetLink: "https://meet.jit.si/NST-PlacePrep-req-1-x7k2m",
  },
  {
    id: "req-2",
    studentName: "James Wilson",
    studentInitials: "JW",
    branch: "Software Eng",
    year: "Year 2",
    topic: "DSA Doubt Clearing",
    notes: "Two-pointer and sliding window patterns",
    date: "2026-06-28",
    time: "3:00 PM",
    duration: 30,
    status: "pending",
  },
  {
    id: "req-3",
    studentName: "Chloe Lin",
    studentInitials: "CL",
    branch: "Info Systems",
    year: "Year 4",
    topic: "HR Round Preparation",
    notes: "STAR method practice for Amazon Leadership Principles",
    date: "2026-06-20",
    time: "11:00 AM",
    duration: 60,
    status: "completed",
    meetLink: "https://meet.jit.si/NST-PlacePrep-req-3-a8b2c",
  },
  {
    id: "req-4",
    studentName: "Ben Kim",
    studentInitials: "BK",
    branch: "AI & ML",
    year: "Year 3",
    topic: "Resume Review",
    notes: "Looking for feedback on project bullet points",
    date: "2026-06-29",
    time: "4:00 PM",
    duration: 30,
    status: "proposed",
    proposedDate: "2026-06-30",
    proposedTime: "5:00 PM",
  },
  {
    id: "req-5",
    studentName: "Sarah Reed",
    studentInitials: "SR",
    branch: "Cybersecurity",
    year: "Year 1",
    topic: "LLD Practice",
    notes: "Design a parking lot",
    date: "2026-06-30",
    time: "2:00 PM",
    duration: 60,
    status: "pending",
  },
  {
    id: "req-6",
    studentName: "David Park",
    studentInitials: "DP",
    branch: "Robotics",
    year: "Year 4",
    topic: "Aptitude Strategy Session",
    notes: "Time management for quant section",
    date: "2026-06-15",
    time: "9:00 AM",
    duration: 30,
    status: "cancelled",
  },
  {
    id: "req-7",
    studentName: "Rahul M.",
    studentInitials: "RM",
    branch: "Computer Science",
    year: "Year 2",
    topic: "DSA Doubt Clearing",
    notes: "Dynamic programming basics",
    date: "2026-07-02",
    time: "11:00 AM",
    duration: 60,
    status: "confirmed",
    meetLink: "https://meet.jit.si/NST-PlacePrep-req-7-9p2nq",
  },
  {
    id: "req-8",
    studentName: "Sana K.",
    studentInitials: "SK",
    branch: "AI & ML",
    year: "Year 3",
    topic: "System Design Mock Interview",
    notes: "Design Netflix",
    date: "2026-07-03",
    time: "3:00 PM",
    duration: 60,
    status: "pending",
  }
];
export type AlertSeverity = "high" | "medium" | "info";

export interface TrendAlert {
  id: string;
  severity: AlertSeverity;
  timeAgo: string;
  source: string;
  headline: string;
  description: string;
  tags: string[];
}

export const mockTrendAlerts: TrendAlert[] = [
  {
    id: "alert-1",
    severity: "info",
    timeAgo: "2 hours ago",
    source: "Meta",
    headline: "Google increased focus on System Design rounds",
    description: "Analysis of 500+ recent interviews shows a 40% increase in distributed systems questions for new grads.",
    tags: ["System Design", "Google"]
  },
  {
    id: "alert-2",
    severity: "high",
    timeAgo: "Yesterday",
    source: "Industry Wide",
    headline: "Drop in algorithmic complexity emphasis",
    description: "Tier 1 companies are shifting weight from pure algorithms to practical API design and refactoring.",
    tags: ["Algorithms", "API Design"]
  },
  {
    id: "alert-3",
    severity: "medium",
    timeAgo: "3 days ago",
    source: "FinTech",
    headline: "Surge in concurrency questions",
    description: "Stripe and Plaid interviewees report higher frequency of multi-threading and race condition scenarios.",
    tags: []
  },
  {
    id: "alert-4",
    severity: "high",
    timeAgo: "4 days ago",
    source: "Amazon",
    headline: "System Design complexity increasing for SDE-2",
    description: "Recent SDE-2 candidates report being asked for detailed capacity planning and failure mode analysis.",
    tags: ["System Design", "Amazon"]
  },
  {
    id: "alert-5",
    severity: "info",
    timeAgo: "1 week ago",
    source: "Indian Product",
    headline: "LLD and Design Patterns becoming standard",
    description: "Flipkart and Swiggy are consistently asking for complete LLD of systems like Parking Lot or BookMyShow in 90-minute rounds.",
    tags: ["LLD", "Design Patterns"]
  },
  {
    id: "alert-6",
    severity: "medium",
    timeAgo: "1 week ago",
    source: "TCS / Infosys",
    headline: "Aptitude cutoffs raised by 15%",
    description: "Initial filtering rounds are becoming more competitive with higher emphasis on quantitative reasoning speed.",
    tags: ["Aptitude", "Service"]
  },
  {
    id: "alert-7",
    severity: "info",
    timeAgo: "2 weeks ago",
    source: "Startups",
    headline: "Shift towards take-home assignments",
    description: "Many Indian startups are replacing the first DSA round with a 24-hour take-home API development task.",
    tags: ["Take-home", "API Design"]
  },
  {
    id: "alert-8",
    severity: "high",
    timeAgo: "3 weeks ago",
    source: "Industry Wide",
    headline: "AI tools usage policies tested",
    description: "Interviews increasingly include questions on how candidates use AI coding assistants and verify their output.",
    tags: ["AI", "Behavioral"]
  }
];
