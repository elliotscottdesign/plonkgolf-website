import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public anon key — safe to ship in the browser. Real security comes from
// Row Level Security policies on the database. Both can be overridden via
// build-time env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)
// once we want to rotate them, but the defaults work out of the box.
//
// 2026-07-22: repointed from the scaffolded "bieikfwhzkdekojerdqs" project
// (paused / deleted) to the shared "rntcujcpsozvuxvmlejv" project that
// nodice.bar already uses. One booking source of truth: a Plonk Hackney
// tee time booked here or on nodice.bar/book/hackney lands in the same
// bookings table, uses the same Stripe key, and fires the same
// send-booking-confirmation Edge Function.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://rntcujcpsozvuxvmlejv.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJudGN1amNwc296dnV4dm1sZWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0Nzk0MDIsImV4cCI6MjA5NjA1NTQwMn0.cUMy2GWme7quwDKns_sXq8OY-9SqWaIuZqhYSz3ZwrY";

let _client: SupabaseClient | null = null;

export function supabase(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return _client;
}
