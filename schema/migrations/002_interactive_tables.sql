-- Migration: 002_interactive_tables.sql
-- Description: Interactive feature tables (Profiles, Onboarding, Roadmaps, Doubts, Sessions, Experiences, Notifications)

-- 1. Profiles (User Identity across Student, Faculty, Admin)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student', -- student, faculty, admin
    batch TEXT, -- e.g. '2022-2026'
    branch TEXT, -- e.g. 'B.Tech CSE'
    roll_number TEXT,
    avatar_url TEXT,
    streak_count INT DEFAULT 0,
    total_xp INT DEFAULT 0,
    status TEXT DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, PLACED, INVITE PENDING
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Student Onboarding State
CREATE TABLE IF NOT EXISTS student_onboarding (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    target_domains TEXT[],
    target_company_categories TEXT[],
    topic_confidence_json JSONB,
    roadmap_duration_weeks INT DEFAULT 12,
    completed_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Student Personal Roadmaps
CREATE TABLE IF NOT EXISTS student_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    target_role TEXT DEFAULT 'SDE-1',
    duration_weeks INT DEFAULT 12,
    current_week INT DEFAULT 1,
    pct_complete FLOAT DEFAULT 0.0,
    status TEXT DEFAULT 'active', -- active, completed, paused
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Roadmap Weeks
CREATE TABLE IF NOT EXISTS student_roadmap_weeks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roadmap_id UUID REFERENCES student_roadmaps(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
    topic_name TEXT NOT NULL,
    status TEXT DEFAULT 'locked', -- done, active, locked
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Roadmap Assigned Questions
CREATE TABLE IF NOT EXISTS student_roadmap_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roadmap_week_id UUID REFERENCES student_roadmap_weeks(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    done BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ
);

-- 6. Student Doubts
CREATE TABLE IF NOT EXISTS doubts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    tag TEXT DEFAULT 'DSA',
    status TEXT DEFAULT 'pending', -- pending, answered, resolved
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Doubt Replies (Threaded discussions)
CREATE TABLE IF NOT EXISTS doubt_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doubt_id UUID REFERENCES doubts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Mentoring Sessions
CREATE TABLE IF NOT EXISTS mentoring_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    faculty_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    session_date DATE NOT NULL,
    time_slot TEXT NOT NULL, -- e.g. '10:00 AM'
    duration_mins INT DEFAULT 30,
    topic TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending', -- pending, confirmed, proposed, cancelled, completed
    jitsi_link TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Interview Experiences
CREATE TABLE IF NOT EXISTS interview_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'SDE-1',
    outcome TEXT NOT NULL, -- Selected, Rejected, Pending
    upvotes INT DEFAULT 0,
    notes TEXT,
    status TEXT DEFAULT 'approved', -- pending, approved, rejected
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Interview Experience Rounds
CREATE TABLE IF NOT EXISTS interview_experience_rounds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experience_id UUID REFERENCES interview_experiences(id) ON DELETE CASCADE,
    round_number INT NOT NULL,
    round_name TEXT NOT NULL,
    round_type TEXT NOT NULL,
    questions_asked TEXT NOT NULL,
    difficulty TEXT DEFAULT 'Medium'
);

-- 11. XP Transactions (Gamification Ledger)
CREATE TABLE IF NOT EXISTS xp_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    xp_amount INT NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- badge, new_company, roadmap, experience, question, xp
    title TEXT NOT NULL,
    subtitle TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_student_roadmaps_user_id ON student_roadmaps(user_id);
CREATE INDEX IF NOT EXISTS idx_doubts_student_id ON doubts(student_id);
CREATE INDEX IF NOT EXISTS idx_doubts_status ON doubts(status);
CREATE INDEX IF NOT EXISTS idx_mentoring_sessions_student ON mentoring_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_mentoring_sessions_faculty ON mentoring_sessions(faculty_id);
