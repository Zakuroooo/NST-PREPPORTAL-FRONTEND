-- Migration: 001_initial_schema.sql
-- Description: Baseline schema for companies, roles, topics, questions, courses, and syllabus mapping.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Companies
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    country TEXT DEFAULT 'India',
    tier TEXT DEFAULT 'Product', -- MAANG, Product, Service, Startup, BFSI, Other
    success_rate TEXT,
    avg_salary TEXT,
    difficulty_rating TEXT,
    hiring_status TEXT DEFAULT 'Active Hiring',
    avg_process_duration TEXT,
    hiring_note TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Roles
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL, -- SDE-1, SDE-2, Data Analyst, Frontend Engineer, etc.
    level TEXT DEFAULT 'Junior', -- Junior, Mid, Senior
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Topics / Skill Areas
CREATE TABLE IF NOT EXISTS topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL, -- DSA, Core CS, Domain, Behavioral
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Questions
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
    round_type TEXT NOT NULL, -- Coding, System Design, HR, Aptitude, LLD, Domain
    problem_summary TEXT,
    difficulty TEXT NOT NULL, -- Easy, Medium, Hard
    source TEXT DEFAULT 'leetcode',
    source_url TEXT,
    xp INT DEFAULT 50,
    frequency_pct FLOAT DEFAULT 0.0,
    scraped_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Question <-> Topic Junction
CREATE TABLE IF NOT EXISTS question_topics (
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, topic_id)
);

-- 6. Courses (NST Syllabus)
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    code TEXT,
    semester INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Syllabus Topics Mapping
CREATE TABLE IF NOT EXISTS syllabus_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    coverage_depth TEXT DEFAULT 'Intermediate', -- Introductory, Intermediate, Advanced
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for fast API lookup
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);
CREATE INDEX IF NOT EXISTS idx_questions_company_id ON questions(company_id);
CREATE INDEX IF NOT EXISTS idx_questions_round_type ON questions(round_type);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
