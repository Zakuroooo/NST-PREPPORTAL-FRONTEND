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
