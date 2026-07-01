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
