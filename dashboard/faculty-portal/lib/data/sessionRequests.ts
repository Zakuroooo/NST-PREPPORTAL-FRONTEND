export type SessionStatus = "pending" | "accepted" | "declined";

export interface SessionRequest {
  id: string;
  studentName: string;
  studentInitials: string;
  branch: string;
  year: string;
  topicTag: string;
  preferredDate: string;
  preferredTime: string;
  endTime?: string;
  note: string;
  status: SessionStatus;
}

// We are consolidating both requests and scheduled sessions into one data file for simplicity.
// "accepted" status requests appear on the Calendar.
export const mockSessionRequests: SessionRequest[] = [
  {
    id: "req-1",
    studentName: "Maya Singh",
    studentInitials: "MS",
    branch: "Computer Science",
    year: "Year 3",
    topicTag: "DSA - Trees",
    preferredDate: "Jun 12, 2026",
    preferredTime: "10:00 AM",
    endTime: "11:00 AM",
    note: "Seeking clarification on AVL tree rotations and height-balancing logic before the midterm.",
    status: "accepted"
  },
  {
    id: "req-2",
    studentName: "James Wilson",
    studentInitials: "JW",
    branch: "Software Eng",
    year: "Year 2",
    topicTag: "Web Dev",
    preferredDate: "Jun 13, 2026",
    preferredTime: "02:30 PM",
    endTime: "03:30 PM",
    note: "",
    status: "pending"
  },
  {
    id: "req-3",
    studentName: "Chloe Lin",
    studentInitials: "CL",
    branch: "Info Systems",
    year: "Year 4",
    topicTag: "Database",
    preferredDate: "Jun 14, 2026",
    preferredTime: "09:00 AM",
    endTime: "10:00 AM",
    note: "",
    status: "pending"
  },
  {
    id: "req-4",
    studentName: "Ben Kim",
    studentInitials: "BK",
    branch: "AI & ML",
    year: "Year 3",
    topicTag: "Neural Networks",
    preferredDate: "Jun 14, 2026",
    preferredTime: "11:30 AM",
    endTime: "12:30 PM",
    note: "Dissertation feedback on backpropagation optimization models.",
    status: "accepted"
  },
  {
    id: "req-5",
    studentName: "Sarah Reed",
    studentInitials: "SR",
    branch: "Cybersecurity",
    year: "Year 1",
    topicTag: "Encryption",
    preferredDate: "Jun 15, 2026",
    preferredTime: "01:00 PM",
    endTime: "02:00 PM",
    note: "",
    status: "pending"
  },
  {
    id: "req-6",
    studentName: "David Park",
    studentInitials: "DP",
    branch: "Robotics",
    year: "PhD",
    topicTag: "Kinematics",
    preferredDate: "Jun 15, 2026",
    preferredTime: "04:00 PM",
    endTime: "05:00 PM",
    note: "",
    status: "pending"
  },
  {
    id: "req-7",
    studentName: "Rahul M.",
    studentInitials: "RM",
    branch: "Computer Science",
    year: "Year 2",
    topicTag: "Linear Algebra",
    preferredDate: "Jun 3, 2026",
    preferredTime: "15:00",
    endTime: "16:00",
    note: "Session #12",
    status: "accepted"
  },
  {
    id: "req-8",
    studentName: "Sana K.",
    studentInitials: "SK",
    branch: "Computer Science",
    year: "Year 4",
    topicTag: "Operating Systems",
    preferredDate: "Jun 5, 2026",
    preferredTime: "10:00 AM",
    endTime: "11:30 AM",
    note: "Final Project",
    status: "accepted"
  },
  {
    id: "req-9",
    studentName: "Emma W.",
    studentInitials: "EW",
    branch: "Computer Science",
    year: "Year 1",
    topicTag: "Calculus",
    preferredDate: "Jun 13, 2026",
    preferredTime: "11:00 AM",
    endTime: "12:00 PM",
    note: "Doubt clearing",
    status: "accepted"
  },
  {
    id: "req-10",
    studentName: "Liam J.",
    studentInitials: "LJ",
    branch: "AI & ML",
    year: "Year 3",
    topicTag: "Ethics in AI",
    preferredDate: "Jun 10, 2026",
    preferredTime: "13:30",
    endTime: "14:30",
    note: "Guest Lecture Prep",
    status: "accepted"
  },
  {
    id: "req-11",
    studentName: "Noah G.",
    studentInitials: "NG",
    branch: "Data Science",
    year: "Year 4",
    topicTag: "Machine Learning",
    preferredDate: "Jun 18, 2026",
    preferredTime: "4:00 PM",
    endTime: "5:00 PM",
    note: "Thesis Review",
    status: "accepted"
  },
  {
    id: "req-12",
    studentName: "Priya R.",
    studentInitials: "PR",
    branch: "Computer Science",
    year: "Year 3",
    topicTag: "DSA - Graphs",
    preferredDate: "Jun 24, 2026",
    preferredTime: "10:00 AM",
    endTime: "11:00 AM",
    note: "Pre-placement mock session",
    status: "accepted"
  },
  {
    id: "req-13",
    studentName: "Aditya M.",
    studentInitials: "AM",
    branch: "Software Eng",
    year: "Year 4",
    topicTag: "System Design",
    preferredDate: "Jun 27, 2026",
    preferredTime: "02:00 PM",
    endTime: "03:00 PM",
    note: "",
    status: "accepted"
  }
];
