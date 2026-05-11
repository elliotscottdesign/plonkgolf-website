"use client";

import { supabase } from "@/lib/supabase";

export type PromoKind = "percent" | "fixed";

export type DbPromoCode = {
  id: string;
  code: string;
  kind: PromoKind;
  value: number; // percent (1-100) when kind = percent, pence when kind = fixed
  valid_from: string; // ISO timestamp
  valid_to: string; // ISO timestamp
  max_uses: number | null;
  uses: number;
  active: boolean;
};

export async function loadPromos(): Promise<DbPromoCode[]> {
  const { data, error } = await supabase()
    .from("promo_codes")
    .select("id, code, kind, value, valid_from, valid_to, max_uses, uses, active")
    .order("active", { ascending: false })
    .order("valid_to", { ascending: true });
  if (error) throw error;
  return (data ?? []) as DbPromoCode[];
}

export async function createPromo(
  promo: Omit<DbPromoCode, "id" | "uses">,
): Promise<DbPromoCode> {
  const { data, error } = await supabase()
    .from("promo_codes")
    .insert({ ...promo, uses: 0 })
    .select()
    .single();
  if (error) throw error;
  return data as DbPromoCode;
}

export async function updatePromo(
  id: string,
  patch: Partial<Omit<DbPromoCode, "id">>,
): Promise<DbPromoCode> {
  const { data, error } = await supabase()
    .from("promo_codes")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as DbPromoCode;
}

export async function deletePromo(id: string): Promise<void> {
  const { error } = await supabase().from("promo_codes").delete().eq("id", id);
  if (error) throw error;
}
