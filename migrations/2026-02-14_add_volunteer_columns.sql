-- Migration: add missing columns to public.volunteer_applications
-- Adds columns required by the API: track, country, city, availability, motivation, cv_url, phone

ALTER TABLE public.volunteer_applications
  ADD COLUMN IF NOT EXISTS track text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS availability text,
  ADD COLUMN IF NOT EXISTS motivation text,
  ADD COLUMN IF NOT EXISTS cv_url text,
  ADD COLUMN IF NOT EXISTS phone text;
