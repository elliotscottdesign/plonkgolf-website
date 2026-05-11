"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SESSION_KEY = "ndb_admin_unlocked";
// Placeholder gate password — real auth (Supabase) replaces this once backend is wired.
const PLACEHOLDER_PW = "plonk-admin";

export function isUnlocked() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function setUnlocked(v: boolean) {
  if (typeof window === "undefined") return;
  if (v) sessionStorage.setItem(SESSION_KEY, "1");
  else sessionStorage.removeItem(SESSION_KEY);
}

export function logout() {
  setUnlocked(false);
}

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setOk(isUnlocked());
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-cream/60">
        Loading…
      </div>
    );
  }

  if (!ok) return <LoginForm onSuccess={() => setOk(true)} />;
  return <>{children}</>;
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === PLACEHOLDER_PW) {
      setUnlocked(true);
      setErr("");
      onSuccess();
      router.refresh();
    } else {
      setErr("Wrong password");
      setPw("");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-cream/10 bg-ink/60 p-8"
      >
        <h1 className="font-display text-2xl">Plonk Admin</h1>
        <p className="mt-1 text-sm text-cream/60">
          Sign in to manage tickets, bookings and the rest.
        </p>

        <label className="mt-6 block text-xs font-bold uppercase tracking-widest text-plonkYellow">
          Password
        </label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          className="mt-2 w-full rounded-lg border border-cream/15 bg-ink/40 px-4 py-3 text-sm text-cream outline-none focus:border-plonkPink"
        />
        {err && <p className="mt-3 text-sm text-red-400">{err}</p>}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-plonkPink py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
        >
          Sign in
        </button>

        <p className="mt-6 rounded-lg border border-plonkYellow/30 bg-plonkYellow/5 p-3 text-xs leading-relaxed text-plonkYellow">
          <strong>Preview password:</strong> <code>plonk-admin</code>
          <br />
          Real Supabase login replaces this when the backend is wired.
        </p>
      </form>
    </div>
  );
}
