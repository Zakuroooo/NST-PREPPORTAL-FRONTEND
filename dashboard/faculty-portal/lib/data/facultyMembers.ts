import { DoubtTag } from "./types";

export interface FacultyMember {
  id: string;
  name: string;
  initials: string;
  department: string;
  subjects: DoubtTag[];
  doubtsSolvedThisMonth: number;
  doubtsSolvedAllTime: number;
}

export const mockFacultyMembers: FacultyMember[] = [
  {
    id: "f1",
    name: "Prof. Sharma",
    initials: "PS",
    department: "Computer Science",
    subjects: ["DSA", "System Design"],
    doubtsSolvedThisMonth: 42,
    doubtsSolvedAllTime: 350,
  },
  {
    id: "f2",
    name: "Prof. Rao",
    initials: "PR",
    department: "Information Technology",
    subjects: ["Web Development", "General"],
    doubtsSolvedThisMonth: 15,
    doubtsSolvedAllTime: 120,
  },
  {
    id: "f3",
    name: "Dr. Iyer",
    initials: "DI",
    department: "Soft Skills",
    subjects: ["HR", "Aptitude"],
    doubtsSolvedThisMonth: 28,
    doubtsSolvedAllTime: 210,
  },
  {
    id: "f4",
    name: "Prof. Gupta",
    initials: "PG",
    department: "Software Engineering",
    subjects: ["LLD", "System Design"],
    doubtsSolvedThisMonth: 8,
    doubtsSolvedAllTime: 65,
  },
  {
    id: "f5",
    name: "Dr. Menon",
    initials: "DM",
    department: "Computer Science",
    subjects: ["DSA", "Web Development"],
    doubtsSolvedThisMonth: 54,
    doubtsSolvedAllTime: 420,
  }
];

export const CURRENT_FACULTY_ID = "f1";

export type FacultyTier = "Newbie" | "Contributor" | "Mentor" | "Expert" | "Grandmaster" | "Legend";

export function getFacultyTier(solvedThisMonth: number): FacultyTier {
  if (solvedThisMonth < 10) return "Newbie";
  if (solvedThisMonth < 20) return "Contributor";
  if (solvedThisMonth < 30) return "Mentor";
  if (solvedThisMonth < 40) return "Expert";
  if (solvedThisMonth < 50) return "Grandmaster";
  return "Legend";
}

export const TIER_STYLES: Record<FacultyTier, string> = {
  Newbie: "bg-gray-100 text-gray-600",
  Contributor: "bg-blue-50 text-blue-700",
  Mentor: "bg-blue-100 text-blue-800",
  Expert: "bg-blue-600 text-white",
  Grandmaster: "bg-amber-100 text-amber-800 border border-amber-300",
  Legend: "bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold"
};

export const LEADERBOARD_CONFIG = {
  currentLeaderboardMonth: "June 2026"
};

// Note: This function conceptually resets the leaderboard for a new month.
// In production, this would be executed by a scheduled backend cron job.
export function resetMonthlyLeaderboard(faculty: FacultyMember[]): FacultyMember[] {
  return faculty.map(f => ({
    ...f,
    doubtsSolvedAllTime: f.doubtsSolvedAllTime + f.doubtsSolvedThisMonth,
    doubtsSolvedThisMonth: 0
  }));
}

