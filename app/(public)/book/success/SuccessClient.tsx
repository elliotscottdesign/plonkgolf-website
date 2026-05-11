"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { VENUES, fmtMoney } from "@/lib/mockData";

function SuccessInner() {
  const params = useSearchParams();
  const ref = params.get("ref") || "PLNK-XXXX";
  const venueId = params.get("venue") || "hackney";
  const date = params.get("date") || "";
  const time = params.get("time") || "";
  const total = parseInt(params.get("total") || "0", 10);
  const email = params.get("email") || "";
  const name = params.get("name") || "";
  const slotsParam = params.get("slots") || "[]";
  const slotGroups: { time: string; count: number }[] = (() => {
    try {
      const parsed = JSON.parse(slotsParam);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const venue = VENUES.find((v) => v.id === venueId);
  const fmtDate = (iso: string) =>
    iso
      ? new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-plonkTeal/20 text-3xl text-plonkTeal">
          ✓
        </div>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl">You're booked in!</h1>
        <p className="mt-3 text-cream/80">
          {name ? `Thanks ${name.split(" ")[0]} — ` : "Thanks — "}
          your booking is confirmed.
          {email && (
            <>
              {" "}
              A confirmation email is on its way to{" "}
              <span className="text-cream">{email}</span>.
            </>
          )}
        </p>

        <div className="mt-10 rounded-2xl border border-cream/10 bg-ink/40 p-8 text-left">
          <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
            Booking reference
          </p>
          <p className="mt-1 font-mono text-2xl">{ref}</p>

          <dl className="mt-6 space-y-3 border-t border-cream/10 pt-6 text-sm">
            <Row label="Venue" value={venue?.name || "—"} />
            <Row label="Date" value={fmtDate(date)} />
            {slotGroups.length > 1 ? (
              <div className="flex justify-between">
                <dt className="text-cream/60">Start times</dt>
                <dd className="text-right">
                  {slotGroups.map((g) => (
                    <div key={g.time} className="font-mono text-sm text-plonkTeal">
                      {g.time} · {g.count} {g.count === 1 ? "player" : "players"}
                    </div>
                  ))}
                </dd>
              </div>
            ) : (
              <Row label="Time" value={time} />
            )}
            <Row label="Total paid" value={fmtMoney(total)} bold />
          </dl>

          {slotGroups.length > 1 && (
            <p className="mt-4 rounded-lg border border-plonkTeal/30 bg-plonkTeal/5 p-3 text-xs leading-relaxed text-cream/80">
              Your group has been split across {slotGroups.length} start times
              so everyone fits in — please arrive together for the first start
              time. Our team will get each group on the course in turn.
            </p>
          )}

          <p className="mt-6 text-xs text-cream/60">
            Show this reference (or your confirmation email) at the bar when
            you arrive. Easy.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full border border-cream/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-cream"
          >
            Back to Plonk
          </Link>
          <Link
            href="/book"
            className="rounded-full bg-plonkPink px-6 py-3 text-sm font-bold uppercase tracking-wider text-white"
          >
            Book another
          </Link>
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-widest text-cream/40">
          Preview — no real booking was made
        </p>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <dt className="text-cream/60">{label}</dt>
      <dd className={bold ? "font-display text-xl text-cream" : "text-cream/90"}>
        {value}
      </dd>
    </div>
  );
}

export default function SuccessClient() {
  return (
    <Suspense fallback={null}>
      <SuccessInner />
    </Suspense>
  );
}
