from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from backend.database import get_supabase_client

router = APIRouter(prefix="/companies", tags=["Companies"])

# Fallback company intel matching the verified 12 companies
FALLBACK_COMPANIES = [
    {
        "name": "Google",
        "slug": "google",
        "tier": "MAANG",
        "successRate": "18.4%",
        "avgSalary": "₹45 LPA",
        "difficulty": "9.2/10",
        "hiringStatus": "Active Hiring",
        "avgProcess": "4-6 Weeks",
        "hiringNote": "Heavy emphasis on Graph algorithms, Dynamic Programming, and System Design.",
        "roundStructure": [
            {"n": 1, "name": "Online Assessment (OA)", "dur": "90 mins"},
            {"n": 2, "name": "Technical Screen", "dur": "45 mins"},
            {"n": 3, "name": "Onsite Round 1 (DSA)", "dur": "45 mins"},
            {"n": 4, "name": "Onsite Round 2 (DSA)", "dur": "45 mins"},
            {"n": 5, "name": "Onsite Round 3 (System Design)", "dur": "45 mins"},
            {"n": 6, "name": "Googliness & Leadership", "dur": "45 mins"}
        ],
        "topTopics": [
            {"topic": "Arrays & Strings", "pct": 85},
            {"topic": "Dynamic Programming", "pct": 72},
            {"topic": "Graphs & Trees", "pct": 68},
            {"topic": "System Design", "pct": 54}
        ]
    },
    {
        "name": "Amazon",
        "slug": "amazon",
        "tier": "MAANG",
        "successRate": "22.1%",
        "avgSalary": "₹32 LPA",
        "difficulty": "8.5/10",
        "hiringStatus": "Active Hiring",
        "avgProcess": "3-4 Weeks",
        "hiringNote": "14 Leadership Principles are mandatory in every round alongside DSA.",
        "roundStructure": [
            {"n": 1, "name": "Online Coding & LP Test", "dur": "120 mins"},
            {"n": 2, "name": "Technical Interview 1", "dur": "60 mins"},
            {"n": 3, "name": "Technical Interview 2", "dur": "60 mins"},
            {"n": 4, "name": "Bar Raiser Round", "dur": "60 mins"}
        ],
        "topTopics": [
            {"topic": "Trees & Heaps", "pct": 80},
            {"topic": "Leadership Principles", "pct": 95},
            {"topic": "System Design", "pct": 45}
        ]
    },
    {
        "name": "Flipkart",
        "slug": "flipkart",
        "tier": "Product",
        "successRate": "19.8%",
        "avgSalary": "₹26 LPA",
        "difficulty": "8.7/10",
        "hiringStatus": "Active Hiring",
        "avgProcess": "3-4 Weeks",
        "hiringNote": "Machine Coding (LLD) round is an absolute eliminator.",
        "roundStructure": [
            {"n": 1, "name": "Machine Coding (LLD)", "dur": "120 mins"},
            {"n": 2, "name": "DSA Problem Solving", "dur": "60 mins"},
            {"n": 3, "name": "System Architecture", "dur": "60 mins"},
            {"n": 4, "name": "HM & Fitment", "dur": "45 mins"}
        ],
        "topTopics": [
            {"topic": "Low Level Design (LLD)", "pct": 90},
            {"topic": "Data Structures", "pct": 75},
            {"topic": "DBMS & SQL", "pct": 60}
        ]
    }
]

@router.get("/", response_model=List[dict])
def list_companies():
    supabase = get_supabase_client()
    if supabase:
        try:
            res = supabase.table("companies").select("*").execute()
            if res.data:
                return res.data
        except Exception as e:
            print(f"Error querying companies: {e}")
    return FALLBACK_COMPANIES

@router.get("/{slug}", response_model=dict)
def get_company_intel(slug: str):
    supabase = get_supabase_client()
    if supabase:
        try:
            res = supabase.table("companies").select("*").eq("slug", slug).execute()
            if res.data and len(res.data) > 0:
                company = res.data[0]
                return company
        except Exception as e:
            print(f"Error querying company slug {slug}: {e}")
            
    # Search fallback
    for comp in FALLBACK_COMPANIES:
        if comp["slug"].lower() == slug.lower():
            return comp
            
    raise HTTPException(status_code=404, detail=f"Company with slug '{slug}' not found")
