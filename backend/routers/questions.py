from fastapi import APIRouter, Query
from typing import List, Optional
from backend.database import get_supabase_client

router = APIRouter(prefix="/questions", tags=["Questions"])

FALLBACK_QUESTIONS = [
    {
        "id": 1,
        "title": "Two Sum",
        "topic": "Arrays",
        "diff": "Easy",
        "roundType": "Coding",
        "companies": ["google", "amazon", "microsoft"],
        "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
        "xp": 10,
        "hot": True,
        "frequency": 89
    },
    {
        "id": 2,
        "title": "Merge Intervals",
        "topic": "Arrays",
        "diff": "Medium",
        "roundType": "Coding",
        "companies": ["google", "amazon"],
        "leetcodeUrl": "https://leetcode.com/problems/merge-intervals/",
        "xp": 25,
        "hot": True,
        "frequency": 76
    },
    {
        "id": 3,
        "title": "Design a Parking Lot",
        "topic": "LLD",
        "diff": "Medium",
        "roundType": "LLD",
        "companies": ["flipkart", "microsoft"],
        "leetcodeUrl": None,
        "xp": 50,
        "hot": True,
        "frequency": 68
    },
    {
        "id": 4,
        "title": "Tell me about a time you owned something end-to-end",
        "topic": "Behavioral",
        "diff": "Medium",
        "roundType": "HR",
        "companies": ["amazon", "google"],
        "leetcodeUrl": None,
        "xp": 15,
        "hot": True,
        "frequency": 95
    }
]

@router.get("/", response_model=List[dict])
def search_questions(
    company: Optional[str] = Query(None),
    topic: Optional[str] = Query(None),
    difficulty: Optional[str] = Query(None),
    round_type: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    supabase = get_supabase_client()
    if supabase:
        try:
            query = supabase.table("questions").select("*, companies(slug)")
            if difficulty and difficulty != "All":
                query = query.eq("difficulty", difficulty)
            if round_type and round_type != "All":
                query = query.eq("round_type", round_type)
            res = query.execute()
            if res.data:
                return res.data
        except Exception as e:
            print(f"Error querying questions: {e}")

    # Fallback filtering
    filtered = FALLBACK_QUESTIONS
    if company and company != "All":
        filtered = [q for q in filtered if company.lower() in q["companies"]]
    if topic and topic != "All":
        filtered = [q for q in filtered if topic.lower() in q["topic"].lower()]
    if difficulty and difficulty != "All":
        filtered = [q for q in filtered if q["diff"].lower() == difficulty.lower()]
    if round_type and round_type != "All":
        filtered = [q for q in filtered if q["roundType"].lower() == round_type.lower()]
    if search:
        filtered = [q for q in filtered if search.lower() in q["title"].lower()]

    return filtered
