"use client";

import { supabase } from "@/lib/supabase";

export type FieldKind = "text" | "textarea" | "html" | "image" | "url";

export type DbContentRow = {
  key: string;
  value: string;
  page: string;
  field_kind: FieldKind;
  label: string;
  helper: string | null;
  sort_order: number;
  updated_at: string;
};

// Load every editable slot across the marketing site in a single call.
// The public ContentProvider does this once on mount; the admin Content
// pages also reuse it and filter client-side by page.
export async function loadAllContent(): Promise<DbContentRow[]> {
  const { data, error } = await supabase()
    .from("page_content")
    .select("key, value, page, field_kind, label, helper, sort_order, updated_at")
    .order("page")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as DbContentRow[];
}

export async function loadPageContent(page: string): Promise<DbContentRow[]> {
  const { data, error } = await supabase()
    .from("page_content")
    .select("key, value, page, field_kind, label, helper, sort_order, updated_at")
    .eq("page", page)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as DbContentRow[];
}

export async function updateContentValue(key: string, value: string): Promise<void> {
  const { error } = await supabase()
    .from("page_content")
    .update({ value })
    .eq("key", key);
  if (error) throw error;
}

// Bulk save — pushes one update per dirty field. Sequential to keep error
// reporting simple (first failure short-circuits and surfaces the message).
export async function updateContentValues(
  patches: { key: string; value: string }[],
): Promise<void> {
  for (const p of patches) {
    await updateContentValue(p.key, p.value);
  }
}
