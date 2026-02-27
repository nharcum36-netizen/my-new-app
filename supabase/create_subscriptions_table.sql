-- Supabase migration: create subscriptions table
-- Run this in the Supabase SQL editor or via psql with the service role key

create table if not exists public.subscriptions (
  id bigint generated always as identity primary key,
  stripe_subscription_id text unique,
  stripe_customer_id text,
  price_id text,
  status text,
  current_period_end timestamptz,
  metadata jsonb,
  email text,
  created_at timestamptz default now()
);
