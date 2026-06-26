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
  { id: "dsa",        label: "DSA",           shortLabel: "DSA",    color: "bg-indigo-100 text-indigo-800"  },
  { id: "sysdesign",  label: "System Design", shortLabel: "SysD",   color: "bg-violet-100 text-violet-800"  },
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
