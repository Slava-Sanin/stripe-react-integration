-- database.sql

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  stripe_session_id TEXT NOT NULL,
  amount INTEGER NOT NULL,           -- в центах
  currency VARCHAR(10) NOT NULL DEFAULT 'usd',
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
