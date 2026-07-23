from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(tags=["Authentication"])

class LoginRequest(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    role: str
    avatar: str
    department_or_batch: Optional[str] = None
    target_portal_url: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    token: str
    user: UserProfile

class DemoCredential(BaseModel):
    role: str
    label: str
    email: str
    password: str
    description: str
    portal_url: str
    accent_color: str

# Pre-configured Portal Credentials
USER_DATABASE = {
    "student@newtonschool.co": {
        "password": "student123",
        "id": "std_101",
        "name": "Aarav Sharma",
        "email": "student@newtonschool.co",
        "role": "student",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav",
        "department_or_batch": "CS Batch 2025 - NST",
        "target_portal_url": "http://localhost:3000/dashboard",
    },
    "faculty@newtonschool.co": {
        "password": "faculty123",
        "id": "fac_202",
        "name": "Prof. Rajesh Kumar",
        "email": "faculty@newtonschool.co",
        "role": "faculty",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
        "department_or_batch": "Department of Computer Science & Engineering",
        "target_portal_url": "http://localhost:3001/",
    },
    "admin@newtonschool.co": {
        "password": "admin123",
        "id": "adm_303",
        "name": "Dr. Sunita Patel",
        "email": "admin@newtonschool.co",
        "role": "admin",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita",
        "department_or_batch": "Placement & Institutional Operations",
        "target_portal_url": "http://localhost:3002/overview",
    },
}

# Alternate email aliases for developer convenience
ALIASES = {
    "student@nst.edu": "student@newtonschool.co",
    "faculty@nst.edu": "faculty@newtonschool.co",
    "admin@nst.edu": "admin@newtonschool.co",
}

@router.get("/auth/credentials", response_model=List[DemoCredential])
def get_demo_credentials():
    return [
        DemoCredential(
            role="student",
            label="Student Portal",
            email="student@newtonschool.co",
            password="student123",
            description="Access interview prep, topic practice, and company questions.",
            portal_url="http://localhost:3000/dashboard",
            accent_color="blue"
        ),
        DemoCredential(
            role="faculty",
            label="Faculty Portal",
            email="faculty@newtonschool.co",
            password="faculty123",
            description="View gap heatmaps, resolve student doubts, & manage syllabus alignment.",
            portal_url="http://localhost:3001/",
            accent_color="indigo"
        ),
        DemoCredential(
            role="admin",
            label="Admin Portal",
            email="admin@newtonschool.co",
            password="admin123",
            description="Full control panel for students, faculty, session monitoring & metrics.",
            portal_url="http://localhost:3002/overview",
            accent_color="purple"
        ),
    ]

@router.post("/auth/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    raw_email = payload.email.strip().lower()
    email = ALIASES.get(raw_email, raw_email)
    
    if email not in USER_DATABASE:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password. Use one of the demo credentials listed below.",
        )
    
    user_data = USER_DATABASE[email]
    if payload.password != user_data["password"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password. Check the demo credentials password.",
        )

    # Simulated JWT token
    token = f"jwt_mock_token_for_{user_data['role']}_{user_data['id']}"

    return LoginResponse(
        success=True,
        message=f"Welcome back, {user_data['name']}! Logging into {user_data['role'].capitalize()} Portal...",
        token=token,
        user=UserProfile(
            id=user_data["id"],
            name=user_data["name"],
            email=user_data["email"],
            role=user_data["role"],
            avatar=user_data["avatar"],
            department_or_batch=user_data["department_or_batch"],
            target_portal_url=user_data["target_portal_url"],
        ),
    )
