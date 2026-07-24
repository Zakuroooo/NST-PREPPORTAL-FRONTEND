-- Seed: 003_sample_questions.sql
-- Description: Seed initial questions linked to company slugs.

DO $$
DECLARE
    google_id UUID;
    amazon_id UUID;
    microsoft_id UUID;
    flipkart_id UUID;
    razorpay_id UUID;
    tcs_id UUID;
BEGIN
    SELECT id INTO google_id FROM companies WHERE slug = 'google';
    SELECT id INTO amazon_id FROM companies WHERE slug = 'amazon';
    SELECT id INTO microsoft_id FROM companies WHERE slug = 'microsoft';
    SELECT id INTO flipkart_id FROM companies WHERE slug = 'flipkart';
    SELECT id INTO razorpay_id FROM companies WHERE slug = 'razorpay';
    SELECT id INTO tcs_id FROM companies WHERE slug = 'tcs';

    -- Google Questions
    IF google_id IS NOT NULL THEN
        INSERT INTO questions (title, company_id, round_type, problem_summary, difficulty, source_url, xp, frequency_pct)
        VALUES
          ('Two Sum', google_id, 'Coding', 'Find two numbers that add up to target', 'Easy', 'https://leetcode.com/problems/two-sum/', 10, 89.0),
          ('Merge Intervals', google_id, 'Coding', 'Merge overlapping intervals', 'Medium', 'https://leetcode.com/problems/merge-intervals/', 25, 76.0),
          ('Word Search II', google_id, 'Coding', 'Find words in a 2D grid using Trie and Backtracking', 'Hard', 'https://leetcode.com/problems/word-search-ii/', 40, 65.0),
          ('Design a URL Shortener', google_id, 'System Design', 'Design TinyURL system with high availability', 'Medium', NULL, 50, 58.0),
          ('Design Google Drive', google_id, 'System Design', 'Design distributed cloud storage system', 'Hard', NULL, 60, 52.0);
    END IF;

    -- Amazon Questions
    IF amazon_id IS NOT NULL THEN
        INSERT INTO questions (title, company_id, round_type, problem_summary, difficulty, source_url, xp, frequency_pct)
        VALUES
          ('LRU Cache Implementation', amazon_id, 'Coding', 'Design and implement a Least Recently Used (LRU) cache', 'Medium', 'https://leetcode.com/problems/lru-cache/', 25, 82.0),
          ('K-th Largest Element in Array', amazon_id, 'Coding', 'Find the kth largest element in an unsorted array', 'Medium', 'https://leetcode.com/problems/kth-largest-element-in-an-array/', 25, 74.0),
          ('Tell me about a time you owned something end-to-end', amazon_id, 'HR', 'Behavioral Leadership Principle: Ownership', 'Medium', NULL, 15, 95.0);
    END IF;

    -- Flipkart Questions
    IF flipkart_id IS NOT NULL THEN
        INSERT INTO questions (title, company_id, round_type, problem_summary, difficulty, source_url, xp, frequency_pct)
        VALUES
          ('Design a Parking Lot', flipkart_id, 'LLD', 'Low Level Design for parking lot management with Object Oriented Principles', 'Medium', NULL, 50, 68.0),
          ('House Robber', flipkart_id, 'Coding', 'Dynamic Programming maximum sum non-adjacent elements', 'Medium', 'https://leetcode.com/problems/house-robber/', 20, 72.0);
    END IF;

    -- Razorpay Questions
    IF razorpay_id IS NOT NULL THEN
        INSERT INTO questions (title, company_id, round_type, problem_summary, difficulty, source_url, xp, frequency_pct)
        VALUES
          ('Design a Payment Gateway', razorpay_id, 'System Design', 'Design high-reliability payment processing pipeline with webhook notifications', 'Hard', NULL, 60, 85.0),
          ('Explain webhook vs polling', razorpay_id, 'Domain', 'Asynchronous event notification vs recurring request polling', 'Easy', NULL, 15, 70.0);
    END IF;

    -- TCS Questions
    IF tcs_id IS NOT NULL THEN
        INSERT INTO questions (title, company_id, round_type, problem_summary, difficulty, source_url, xp, frequency_pct)
        VALUES
          ('What is normalization?', tcs_id, 'Domain', 'DBMS 1NF, 2NF, 3NF, BCNF explanation', 'Easy', NULL, 10, 85.0),
          ('Explain OSI model layers', tcs_id, 'Domain', '7 layers of ISO OSI computer networking model', 'Easy', NULL, 10, 80.0),
          ('TCS NQT Aptitude — Speed & Distance', tcs_id, 'Aptitude', 'Quantitative aptitude train and relative speed problems', 'Easy', NULL, 10, 90.0);
    END IF;
END $$;
