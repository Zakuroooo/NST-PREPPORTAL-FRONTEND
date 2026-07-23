-- Seed: 002_topics.sql
-- Description: Seed canonical topic taxonomy across DSA, System Design, Core CS, Aptitude, and Behavioral categories.

INSERT INTO topics (name, category)
VALUES
  ('Arrays & Strings', 'DSA'),
  ('Dynamic Programming', 'DSA'),
  ('Graphs & BFS/DFS', 'DSA'),
  ('Trees & Binary Search', 'DSA'),
  ('Sliding Window', 'DSA'),
  ('Heaps & Priority Queues', 'DSA'),
  ('Stacks & Queues', 'DSA'),
  ('Backtracking', 'DSA'),
  ('Linked List', 'DSA'),
  ('System Design (HLD)', 'Core CS'),
  ('Low Level Design (LLD)', 'Core CS'),
  ('Operating Systems', 'Core CS'),
  ('DBMS & SQL', 'Core CS'),
  ('Computer Networks', 'Core CS'),
  ('OOP & Design Patterns', 'Core CS'),
  ('Aptitude & Reasoning', 'Domain'),
  ('Full Stack & Web Dev', 'Domain'),
  ('DevOps & Cloud', 'Domain'),
  ('Behavioral (STAR Method)', 'Behavioral'),
  ('Amazon Leadership Principles', 'Behavioral')
ON CONFLICT (name) DO NOTHING;
