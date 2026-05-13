"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Map of editable-slot key → saved value (only slots the admin has
// actually edited will be in here; everything else falls back to the
// hardcoded default each component passes to useContent / useImage).
type ContentMap = Map<string, string>;

const ContentContext = createContext<ContentMap>(new Map());

// Separate context so the in-place editors can push a freshly-saved
// value back into the live map without a full reload from Supabase.
const ContentSetterContext = createContext<(key: string, value: string) => void>(
  () => {},
);

// Mounted once near the top of the public layout. Fetches every
// page_content row from Supabase, ignores blanks (so the consumer's
// fallback wins), and stores the rest in a Map for the rest of the
// page to read synchronously.
//
// When the page is loaded inside the admin's live-preview iframe
// (parent posts `{type:'plonk:preview', drafts:{...}}` messages),
// the provider also overlays those unsaved drafts on top of the
// saved Supabase values so the admin sees changes as they type.
export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<ContentMap>(new Map());
  const [drafts, setDrafts] = useState<ContentMap>(new Map());

  // Pulls every page_content row, ignores blanks, and replaces the
  // saved map. Re-used by the initial mount AND by post-save
  // refreshes so in-place edits show up immediately even if
  // optimistic local patching missed something.
  const refetch = useCallback(async () => {
    try {
      const { data, error } = await supabase()
        .from("page_content")
        .select("key, value");
      if (error) return;
      const next: ContentMap = new Map();
      for (const row of (data ?? []) as { key: string; value: string }[]) {
        if (row.value && row.value.trim()) next.set(row.key, row.value);
      }
      setSaved(next);
    } catch {
      /* Network blips just leave us with the existing values. */
    }
  }, []);

  // Initial load.
  useEffect(() => {
    refetch();
  }, [refetch]);

  // After any in-place save anywhere on the page, refetch so the
  // map is guaranteed to be current. Components dispatch this
  // CustomEvent at the end of their save flow.
  useEffect(() => {
    function onChange() {
      refetch();
    }
    window.addEventListener("plonk:content-changed", onChange as EventListener);
    return () =>
      window.removeEventListener("plonk:content-changed", onChange as EventListener);
  }, [refetch]);

  // Live-preview channel — only active when this page is embedded
  // in another window from the same origin (the admin editor).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.parent === window) return; // not iframed
    function handle(ev: MessageEvent) {
      // Same-origin only — refuse messages from other sites.
      if (ev.origin !== window.location.origin) return;
      const data = ev.data;
      if (!data || typeof data !== "object") return;
      if (data.type !== "plonk:preview") return;
      const next: ContentMap = new Map();
      if (data.drafts && typeof data.drafts === "object") {
        for (const [k, v] of Object.entries(data.drafts as Record<string, string>)) {
          if (typeof v === "string" && v.trim()) next.set(k, v);
        }
      }
      setDrafts(next);
    }
    window.addEventListener("message", handle);
    // Announce readiness so the admin can push its current drafts
    // immediately rather than waiting for the next keystroke.
    try {
      window.parent.postMessage(
        { type: "plonk:preview-ready" },
        window.location.origin,
      );
    } catch {
      /* ignore */
    }
    return () => window.removeEventListener("message", handle);
  }, []);

  // Drafts win over saved values; saved values win over the
  // consumer's hardcoded fallback (handled inside useContent).
  const merged: ContentMap = (() => {
    if (drafts.size === 0) return saved;
    const out = new Map(saved);
    for (const [k, v] of drafts) out.set(k, v);
    return out;
  })();

  // Called by in-place editors after they persist a value, so the
  // page re-renders with the new content immediately instead of
  // waiting for a manual reload.
  const applyLocalEdit = useCallback((key: string, value: string) => {
    setSaved((prev) => {
      const next = new Map(prev);
      if (value && value.trim()) next.set(key, value);
      else next.delete(key);
      return next;
    });
  }, []);

  return (
    <ContentSetterContext.Provider value={applyLocalEdit}>
      <ContentContext.Provider value={merged}>{children}</ContentContext.Provider>
    </ContentSetterContext.Provider>
  );
}

// Used by Editable / EditableImage to push a freshly-saved value
// straight into the in-memory map.
export function useApplyContentEdit() {
  return useContext(ContentSetterContext);
}

// Returns the Supabase value for a key if the admin has edited it,
// otherwise the supplied fallback. The fallback is what we keep in the
// source so the static-export build (pre-hydration) still renders the
// site with the right copy; once React hydrates and the provider has
// loaded, edited values take over.
export function useContent(key: string, fallback: string): string {
  const map = useContext(ContentContext);
  return map.get(key) ?? fallback;
}

// Same shape, but with a useful default of "" when there's no fallback —
// keeps consumer code that conditionally renders images cleaner.
export function useImage(key: string, fallback: string): string {
  return useContent(key, fallback);
}

// Load every active image in a named gallery, with a per-call fallback
// for when the admin hasn't populated it yet. Used by the homepage
// features section, the about page strip, and the venue page galleries.
export function useGallery<T extends { src: string; alt?: string | null }>(
  galleryKey: string,
  fallback: T[],
): { src: string; alt?: string | null }[] {
  const [rows, setRows] = useState<{ src: string; alt: string | null }[] | null>(
    null,
  );
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data, error } = await supabase()
          .from("gallery_images")
          .select("src, alt, sort_order, active")
          .eq("gallery_key", galleryKey)
          .eq("active", true)
          .order("sort_order");
        if (cancelled || error) return;
        setRows(
          ((data ?? []) as { src: string; alt: string | null }[]).map((r) => ({
            src: r.src,
            alt: r.alt,
          })),
        );
      } catch {
        if (!cancelled) setRows([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [galleryKey]);
  if (rows && rows.length > 0) return rows;
  return fallback;
}
