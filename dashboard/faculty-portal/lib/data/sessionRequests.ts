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
  note: string;
  status: SessionStatus;
}

export const mockSessionRequests: SessionRequest[] = [
  {
    id: "req-1",
    studentName: "Maya Singh",
    studentInitials: "MS",
    branch: "Computer Science",
    year: "Year 3",
    topicTag: "DSA - Trees",
    preferredDate: "Oct 12, 2026",
    preferredTime: "10:00 AM",
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
    preferredDate: "Oct 13, 2026",
    preferredTime: "02:30 PM",
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
    preferredDate: "Oct 14, 2026",
    preferredTime: "09:00 AM",
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
    preferredDate: "Oct 14, 2026",
    preferredTime: "11:30 AM",
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
    preferredDate: "Oct 15, 2026",
    preferredTime: "01:00 PM",
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
    preferredDate: "Oct 15, 2026",
    preferredTime: "04:00 PM",
    note: "",
    status: "pending"
  }
];
