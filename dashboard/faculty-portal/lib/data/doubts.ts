import { FacultyDoubt } from "./types";

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
