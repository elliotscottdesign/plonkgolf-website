"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Map of editable-slot key → saved value (only slots the admin has
// actually edited will be in here; everything else falls back to the
// hardcoded default each component passes to useContent / useImage).
type ContentMap = Map<string, string>;

const ContentContext = createContext<ContentMap>(new Map());

// Mounted once near the top of the public layout. Fetches every
// page_content row from Supabase, ignores blanks (so the consumer's
// fallback wins), and stores the rest in a Map for the rest of the
// page to read synchronously.
export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<ContentMap>(new Map());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase()
          .from("page_content")
          .select("key, value");
        if (cancelled || error) return;
        const next: ContentMap = new Map();
        for (const row of (data ?? []) as { key: string; value: string }[]) {
          if (row.value && row.value.trim()) next.set(row.key, row.value);
        }
        setMap(next);
      } catch {
        // Network/auth glitches just leave us with the defaults — that's
        // still the correct site, so we don't surface anything to the user.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ContentContext.Provider value={map}>{children}</ContentContext.Provider>
  );
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
