-- Supabase migration: create journal_entries table
-- Run this in the Supabase SQL editor or via psql with the service role key

create table if not exists public.journal_entries (
  id bigint generated always as identity primary key,
  text text not null,
  mood text,
  created_at timestamptz default now()
);

-- Optional: allow RLS or policies as needed for your app
