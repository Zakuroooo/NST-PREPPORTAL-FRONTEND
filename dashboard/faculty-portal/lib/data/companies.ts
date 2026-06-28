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
