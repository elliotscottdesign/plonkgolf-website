"use client";

// =============================================================
// Plonk Golf admin — media library picker
// =============================================================
// Modal that lists every image in public/ (read from
// /media-manifest.json, generated at build time by
// scripts/generate-media-manifest.mjs). Editors click a thumbnail
// to pick it, the modal closes and the parent receives the path.
//
// Usage:
//   const [open, setOpen] = useState(false);
//   {open && (
//     <MediaPicker
//       onPick={(path) => { onChange(path); setOpen(false); }}
//       onClose={() => setOpen(false)}
//     />
//   )}
// =============================================================

import { useEffect, useMemo, useState } from "react";

type MediaItem = {
  path: string;
  size: number;
  folder: string;
  filename: string;
};

type Manifest = {
  generated_at: string;
  count: number;
  images: MediaItem[];
};

export default function MediaPicker({
  onPick,
  onClose,
}: {
  onPick: (path: string) => void;
  onClose: () => void;
}) {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [err, setErr] = useState("");
  const [query, setQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Cache-bust on every open so admins see images added by
        // a recent deploy without having to hard-refresh the page.
        const res = await fetch(`/media-manifest.json?t=${Date.now()}`);
        if (!res.ok) throw new Error(`Manifest fetch failed: ${res.status}`);
        const json = (await res.json()) as Manifest;
        if (!cancelled) setManifest(json);
      } catch (e) {
        if (!cancelled)
          setErr(
            e instanceof Error
              ? e.message
              : "Could not load media library. Try a fresh deploy first.",
          );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const folders = useMemo(() => {
    if (!manifest) return [];
    const set = new Set<string>();
    for (const img of manifest.images) set.add(img.folder);
    return Array.from(set).sort();
  }, [manifest]);

  const filtered = useMemo(() => {
    if (!manifest) return [];
    const q = query.trim().toLowerCase();
    return manifest.images.filter((img) => {
      if (activeFolder !== "all" && img.folder !== activeFolder) return false;
      if (!q) return true;
      return (
        img.filename.toLowerCase().includes(q) ||
        img.folder.toLowerCase().includes(q)
      );
    });
  }, [manifest, query, activeFolder]);

  return (
    <div className="fixed inset-0 z-[60] flex items-stretch justify-center bg-ink/85 p-3 sm:items-center sm:p-6">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-cream/15 bg-ink shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-cream/10 px-5 py-4">
          <div>
            <h3 className="font-display text-xl">Media library</h3>
            <p className="text-xs text-cream/55">
              {manifest
                ? `${manifest.count} images across ${folders.length} folders`
                : "Loading…"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-cream/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-cream/85 hover:bg-cream/5"
          >
            Close
          </button>
        </div>

        {/* Search + folder filter */}
        <div className="flex flex-col gap-3 border-b border-cream/10 px-5 py-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search filename or folder…"
            className="flex-1 rounded-lg border border-cream/15 bg-ink/40 px-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-plonkPink focus:outline-none"
          />
          <select
            value={activeFolder}
            onChange={(e) => setActiveFolder(e.target.value)}
            className="rounded-lg border border-cream/15 bg-ink/40 px-3 py-2 text-sm text-cream focus:border-plonkPink focus:outline-none"
          >
            <option value="all">All folders</option>
            {folders.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {err && (
            <div className="mb-4 rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-300">
              {err}
              <p className="mt-1 text-xs text-red-300/70">
                If this is the first time you've opened the picker, deploy once
                so the build script generates /media-manifest.json.
              </p>
            </div>
          )}
          {!manifest && !err && (
            <p className="text-sm text-cream/60">Loading media library…</p>
          )}
          {manifest && filtered.length === 0 && !err && (
            <p className="text-sm text-cream/60">No images match.</p>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((img) => (
              <button
                key={img.path}
                type="button"
                onClick={() => onPick(img.path)}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-cream/10 bg-ink/40 text-left transition hover:border-plonkPink"
                title={img.path}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.path}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full object-cover transition group-hover:opacity-90"
                />
                <div className="px-2 py-1.5">
                  <p className="truncate text-[11px] text-cream/85">
                    {img.filename}
                  </p>
                  <p className="truncate text-[10px] text-cream/45">
                    {img.folder}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
