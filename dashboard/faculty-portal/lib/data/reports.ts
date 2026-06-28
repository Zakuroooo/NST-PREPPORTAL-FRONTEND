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
