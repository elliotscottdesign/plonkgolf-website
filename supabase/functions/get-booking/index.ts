// =============================================================
// Plonk Golf — get-booking
// =============================================================
// POST /functions/v1/get-booking
// Body: { reference, payment_intent_id }
//
// The success page calls this after Stripe redirects back. We require
// BOTH the booking reference and the Stripe PaymentIntent ID so a random
// person can't just GET someone else's booking by guessing a short
// reference code — they'd also need to know the pi_xxx id.
//
// Returns the booking row + slots + ticket/addon line items for display.
// =============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { handlePreflight, jsonResponse } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

Deno.serve(async (req) => {
  const pre = handlePreflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return jsonResponse({ error: "POST only" }, { status: 405 });

  let body: { reference?: string; payment_intent_id?: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, { status: 400 });
  }

  const reference = (body.reference ?? "").trim();
  const piId = (body.payment_intent_id ?? "").trim();
  if (!reference || !piId) {
    return jsonResponse(
      { error: "Both reference and payment_intent_id are required" },
      { status: 400 },
    );
  }

  const { data: booking, error } = await db
    .from("bookings")
    .select(
      `
      id, reference, status, total_pence, subtotal_pence, discount_pence, currency,
      customer_name, customer_email, party_size, expires_at, created_at,
      venue:venues!inner(id, slug, name),
      slots:booking_slots(slot_date, slot_time, count),
      tickets:booking_tickets(quantity, unit_price_pence, ticket:tickets(name)),
      addons:booking_addons(quantity, unit_price_pence, addon:addons(name))
      `,
    )
    .eq("reference", reference)
    .eq("stripe_payment_intent_id", piId)
    .maybeSingle();

  if (error) return jsonResponse({ error: error.message }, { status: 500 });
  if (!booking) return jsonResponse({ error: "Not found" }, { status: 404 });

  return jsonResponse({ booking });
});
