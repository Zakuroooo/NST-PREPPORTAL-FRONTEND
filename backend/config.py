import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PlacePrep FastAPI Backend"
    API_V1_STR: str = "/api"
    
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "your-anon-key")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    
    # Allowed CORS Origins
    STUDENT_PORTAL_URL: str = os.getenv("NEXT_PUBLIC_STUDENT_PORTAL_URL", "http://localhost:3000")
    FACULTY_PORTAL_URL: str = os.getenv("NEXT_PUBLIC_FACULTY_PORTAL_URL", "http://localhost:3001")
    ADMIN_PORTAL_URL: str = os.getenv("NEXT_PUBLIC_ADMIN_PORTAL_URL", "http://localhost:3002")
    
    class Config:
        case_sensitive = True

settings = Settings()
