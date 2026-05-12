"use client";

// =============================================================
// Plonk Golf — preview gate
// =============================================================
// Soft launch gate. The booking flow is live (real Stripe charges)
// so we don't want random discovery visitors booking by accident
// while we test. To unlock the site:
//   1. Visit any page with ?access=PLONK in the URL, OR
//   2. Enter the code PLONK in the gate form.
// Unlock is stored in localStorage under `pg_preview_unlocked` and
// persists across visits on the same browser.
//
// To remove the gate entirely (full public launch), just drop the
// <PreviewGate> wrapper from app/(public)/layout.tsx.
// =============================================================

import { useEffect, useState } from "react";

const ACCESS_CODE = "PLONK";
const STORAGE_KEY = "pg_preview_unlocked";

export default function PreviewGate({ children }: { children: React.ReactNode }) {
  // null = not yet decided (avoids flash of gate during hydration)
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. Already unlocked from a previous visit?
    if (typeof window !== "undefined") {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        setUnlocked(true);
        return;
      }
      // 2. ?access=PLONK in the URL? (Used by the nodice.bar/plonk shortcut.)
      const params = new URLSearchParams(window.location.search);
      const code = params.get("access") ?? params.get("preview");
      if (code && code.toUpperCase() === ACCESS_CODE) {
        localStorage.setItem(STORAGE_KEY, "1");
        setUnlocked(true);
        // Clean the ?access=… off the URL so it's not visible / shareable.
        params.delete("access");
        params.delete("preview");
        const cleaned =
          window.location.pathname +
          (params.toString() ? `?${params.toString()}` : "") +
          window.location.hash;
        window.history.replaceState({}, "", cleaned);
        return;
      }
      setUnlocked(false);
    }
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toUpperCase() === ACCESS_CODE) {
      localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
      setError("");
    } else {
      setError("That's not the right code.");
    }
  }

  // Avoid a flash of either gate or content before we've checked localStorage.
  if (unlocked === null) return null;

  if (unlocked) return <>{children}</>;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0E2A21",
        color: "#F2EBD9",
        padding: "32px 24px",
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
      }}
    >
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 40,
            lineHeight: 1.1,
            margin: "0 0 12px",
          }}
        >
          Plonk Golf
        </h1>
        <p
          style={{
            margin: "0 0 28px",
            color: "rgba(242,235,217,0.7)",
            fontSize: 15,
            lineHeight: 1.5,
          }}
        >
          Preview only. Enter the access code to continue.
        </p>
        <form
          onSubmit={submit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            autoCapitalize="characters"
            autoComplete="off"
            placeholder="Access code"
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid rgba(242,235,217,0.25)",
              background: "rgba(0,0,0,0.25)",
              color: "#F2EBD9",
              fontSize: 16,
              textAlign: "center",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              outline: "none",
            }}
          />
          {error && (
            <p
              style={{
                margin: 0,
                color: "#f3a6b0",
                fontSize: 13,
              }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{
              padding: "14px 20px",
              borderRadius: 999,
              border: "none",
              background: "#E8C547",
              color: "#0E2A21",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
