import os
from supabase import create_client, Client
from backend.config import settings

def get_supabase_client() -> Client | None:
    url = settings.SUPABASE_URL
    key = settings.SUPABASE_KEY
    if not url or "your-project" in url or not key or "your-anon-key" in key:
        return None
    try:
        return create_client(url, key)
    except Exception as e:
        print(f"Supabase client initialization error: {e}")
        return None
