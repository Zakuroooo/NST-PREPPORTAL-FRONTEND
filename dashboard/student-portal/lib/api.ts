import { CompanyIntel, Question, QuestionFilter } from "./mock-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Fetch all companies from FastAPI backend with fallback handling
 */
export async function fetchCompanies(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/companies`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn("Backend unavailable, using fallback company data:", error);
    return [];
  }
}

/**
 * Fetch specific company intelligence details
 */
export async function fetchCompanyIntel(slug: string): Promise<CompanyIntel | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/companies/${slug}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`Backend unavailable for company '${slug}', using local fallback:`, error);
    return null;
  }
}

/**
 * Fetch filtered questions bank
 */
export async function fetchQuestions(filters: QuestionFilter): Promise<Question[]> {
  try {
    const params = new URLSearchParams();
    if (filters.company) params.append("company", filters.company);
    if (filters.topic) params.append("topic", filters.topic);
    if (filters.difficulty) params.append("difficulty", filters.difficulty);
    if (filters.roundType) params.append("round_type", filters.roundType);
    if (filters.search) params.append("search", filters.search);

    const res = await fetch(`${API_BASE_URL}/questions?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn("Backend unavailable for questions search, using local fallback:", error);
    return [];
  }
}
