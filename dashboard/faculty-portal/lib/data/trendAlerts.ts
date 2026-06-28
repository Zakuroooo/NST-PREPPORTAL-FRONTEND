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
