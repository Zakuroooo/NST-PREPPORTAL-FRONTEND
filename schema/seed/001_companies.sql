-- Seed: 001_companies.sql
-- Description: Seed the 12 core companies with intelligence metadata.

INSERT INTO companies (name, slug, country, tier, success_rate, avg_salary, difficulty_rating, hiring_status, avg_process_duration, hiring_note)
VALUES
  ('Google', 'google', 'India', 'MAANG', '18.4%', '₹45 LPA', '9.2/10', 'Active Hiring', '4-6 Weeks', 'Heavy emphasis on Graph algorithms, Dynamic Programming, and High-Level System Design.'),
  ('Amazon', 'amazon', 'India', 'MAANG', '22.1%', '₹32 LPA', '8.5/10', 'Active Hiring', '3-4 Weeks', '14 Leadership Principles are mandatory in every round alongside DSA.'),
  ('Microsoft', 'microsoft', 'India', 'MAANG', '25.0%', '₹28 LPA', '8.1/10', 'Active Hiring', '3-5 Weeks', 'Focuses heavily on Clean Code, LLD, and Data Structures.'),
  ('Flipkart', 'flipkart', 'India', 'Product', '19.8%', '₹26 LPA', '8.7/10', 'Active Hiring', '3-4 Weeks', 'Machine Coding (LLD) round is an absolute eliminator.'),
  ('Razorpay', 'razorpay', 'India', 'Startup', '15.5%', '₹24 LPA', '8.4/10', 'Active Hiring', '2-3 Weeks', 'Tests System Design, Webhooks, Idempotency, and API design.'),
  ('TCS', 'tcs', 'India', 'Service', '65.0%', '₹7 LPA', '4.5/10', 'Active Hiring', '1-2 Weeks', 'Focuses on Aptitude (NQT), SQL, Core CS, and Basic Java/C++.'),
  ('Uber', 'uber', 'India', 'Product', '12.3%', '₹48 LPA', '9.4/10', 'Slow Hiring', '4-5 Weeks', 'Extremely high bar for Algorithms, Concurrency, and Distributed Systems.'),
  ('Swiggy', 'swiggy', 'India', 'Product', '21.0%', '₹22 LPA', '8.0/10', 'Active Hiring', '2-3 Weeks', 'Strong emphasis on Machine Coding and System Design.'),
  ('Infosys', 'infosys', 'India', 'Service', '60.0%', '₹6.5 LPA', '4.8/10', 'Active Hiring', '1-2 Weeks', 'Aptitude test cutoff + basic programming logic.'),
  ('Zepto', 'zepto', 'India', 'Startup', '14.2%', '₹28 LPA', '8.9/10', 'Active Hiring', '2-3 Weeks', 'Fast-paced live coding and system design for scale.'),
  ('Wipro', 'wipro', 'India', 'Service', '58.0%', '₹6 LPA', '4.6/10', 'Active Hiring', '1-2 Weeks', 'Core CS fundamentals (OS, DBMS, Networks) + Aptitude.'),
  ('Paytm', 'paytm', 'India', 'BFSI', '28.0%', '₹18 LPA', '7.6/10', 'Active Hiring', '2-3 Weeks', 'High-concurrency payment architecture questions and DSA.')
ON CONFLICT (slug) DO UPDATE SET
  tier = EXCLUDED.tier,
  success_rate = EXCLUDED.success_rate,
  avg_salary = EXCLUDED.avg_salary,
  difficulty_rating = EXCLUDED.difficulty_rating,
  hiring_status = EXCLUDED.hiring_status;
