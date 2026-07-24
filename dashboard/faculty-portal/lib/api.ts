const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchFacultyCompanyRankings() {
  try {
    const res = await fetch(`${API_BASE_URL}/companies`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch company rankings");
    return await res.json();
  } catch (error) {
    console.warn("Backend error fetching rankings:", error);
    return null;
  }
}
