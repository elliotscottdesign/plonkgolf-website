"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Addon, Ticket, Venue } from "@/lib/mockData";
import { fmtMoney } from "@/lib/mockData";

// Mock available slots for a date — every 5 min between 17:00 and 22:00,
// some randomised to be unavailable / nearly full.
function generateSlots(dateStr: string): { time: string; left: number }[] {
  const seed = [...dateStr].reduce((s, c) => s + c.charCodeAt(0), 0);
  const rand = (n: number) => {
    const x = Math.sin(seed * n) * 10000;
    return x - Math.floor(x);
  };
  const slots: { time: string; left: number }[] = [];
  for (let h = 17; h <= 22; h++) {
    for (let m = 0; m < 60; m += 5) {
      if (h === 22 && m > 0) break;
      const i = h * 60 + m;
      const r = rand(i);
      let left: number;
      if (r < 0.18) left = 0;
      else if (r < 0.4) left = Math.floor(r * 10) % 3 + 1;
      else left = 6;
      slots.push({
        time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        left,
      });
    }
  }
  return slots;
}

function getNextDates(n: number): { iso: string; label: string }[] {
  const out: { iso: string; label: string }[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      label:
        i === 0
          ? "Today"
          : i === 1
            ? "Tomorrow"
            : d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
    });
  }
  return out;
}

export default function BookingFlow({
  venue,
  tickets,
  addons,
}: {
  venue: Venue;
  tickets: Ticket[];
  addons: Addon[];
}) {
  const router = useRouter();
  const [dateIso, setDateIso] = useState<string>(getNextDates(1)[0].iso);
  const [slotTime, setSlotTime] = useState<string | null>(null);
  const [ticketQty, setTicketQty] = useState<Record<string, number>>(
    Object.fromEntries(tickets.map((t) => [t.id, 0])),
  );
  const [addonQty, setAddonQty] = useState<Record<string, number>>(
    Object.fromEntries(addons.map((a) => [a.id, 0])),
  );
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState<{ code: string; pctOff: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  const dates = useMemo(() => getNextDates(14), []);
  const slots = useMemo(() => generateSlots(dateIso), [dateIso]);

  const subtotalPence = useMemo(() => {
    let s = 0;
    for (const t of tickets) s += (ticketQty[t.id] || 0) * t.pricePence;
    for (const a of addons) s += (addonQty[a.id] || 0) * a.pricePence;
    return s;
  }, [tickets, addons, ticketQty, addonQty]);

  const discountPence = promoApplied
    ? Math.round((subtotalPence * promoApplied.pctOff) / 100)
    : 0;
  const totalPence = Math.max(0, subtotalPence - discountPence);
  const totalTickets = Object.values(ticketQty).reduce((s, n) => s + n, 0);
  const canContinue = !!slotTime && totalTickets > 0;

  function applyPromo() {
    const code = promoCode.trim().toUpperCase();
    if (code === "FRIDAY20") {
      setPromoApplied({ code, pctOff: 20 });
      setPromoError("");
    } else if (code === "STUDENT10") {
      setPromoApplied({ code, pctOff: 10 });
      setPromoError("");
    } else {
      setPromoError("That code isn't recognised.");
      setPromoApplied(null);
    }
  }

  function continueToCheckout() {
    if (!canContinue) return;
    const params = new URLSearchParams({
      venue: venue.id,
      date: dateIso,
      time: slotTime!,
      tickets: JSON.stringify(ticketQty),
      addons: JSON.stringify(addonQty),
      promo: promoApplied?.code || "",
    });
    router.push(`/book/checkout?${params.toString()}`);
  }

  return (
    <main className="min-h-screen">
      <header className="relative isolate border-b border-cream/10 px-6 py-12">
        <div className="absolute inset-0 -z-10">
          <Image
            src={venue.id === "hackney" ? "/images/hackney-hero.jpg" : "/images/borough-hero.jpg"}
            alt=""
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink" />
        </div>
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-plonkYellow">
            Book
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">{venue.name}</h1>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {/* Step 1: Date */}
          <Step number={1} title="Pick a date">
            <div className="-mx-1 flex flex-wrap gap-2 overflow-x-auto">
              {dates.map((d) => {
                const active = d.iso === dateIso;
                return (
                  <button
                    key={d.iso}
                    onClick={() => {
                      setDateIso(d.iso);
                      setSlotTime(null);
                    }}
                    className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm transition ${
                      active
                        ? "border-plonkPink bg-plonkPink/15 text-cream"
                        : "border-cream/15 text-cream/70 hover:border-cream/30"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </Step>

          {/* Step 2: Slot */}
          <Step
            number={2}
            title="Pick a time"
            subtitle="6 tickets per 5-minute slot. Numbers shown are tickets left."
          >
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6">
              {slots.map((s) => {
                const sold = s.left === 0;
                const active = s.time === slotTime;
                return (
                  <button
                    key={s.time}
                    disabled={sold}
                    onClick={() => setSlotTime(s.time)}
                    className={`rounded-lg border px-2 py-2.5 text-sm transition ${
                      sold
                        ? "cursor-not-allowed border-cream/5 bg-cream/5 text-cream/30 line-through"
                        : active
                          ? "border-plonkPink bg-plonkPink/15 text-cream"
                          : "border-cream/15 text-cream hover:border-cream/30"
                    }`}
                  >
                    <p className="font-mono">{s.time}</p>
                    {!sold && (
                      <p className="mt-0.5 text-[10px] uppercase tracking-widest text-cream/55">
                        {s.left} left
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </Step>

          {/* Step 3: Tickets */}
          <Step number={3} title="How many tickets?">
            <ul className="space-y-3">
              {tickets.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between rounded-xl border border-cream/10 bg-ink/40 p-4"
                >
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-cream/55">{fmtMoney(t.pricePence)} inc. VAT</p>
                  </div>
                  <QtyStepper
                    value={ticketQty[t.id] || 0}
                    onChange={(v) => setTicketQty({ ...ticketQty, [t.id]: v })}
                  />
                </li>
              ))}
            </ul>
          </Step>

          {/* Step 4: Add-ons */}
          {addons.length > 0 && (
            <Step number={4} title="Add a little extra (optional)">
              <ul className="space-y-3">
                {addons.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center justify-between rounded-xl border border-cream/10 bg-ink/40 p-4"
                  >
                    <div>
                      <p className="font-medium">{a.name}</p>
                      <p className="text-xs text-cream/55">{fmtMoney(a.pricePence)}</p>
                    </div>
                    <QtyStepper
                      value={addonQty[a.id] || 0}
                      onChange={(v) => setAddonQty({ ...addonQty, [a.id]: v })}
                    />
                  </li>
                ))}
              </ul>
            </Step>
          )}

          {/* Step 5: Promo */}
          <Step number={5} title="Promo or voucher code (optional)">
            <div className="flex gap-2">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="e.g. FRIDAY20"
                className="flex-1 rounded-lg border border-cream/15 bg-ink/40 px-4 py-2.5 text-sm uppercase tracking-wider placeholder:text-cream/30 focus:border-plonkPink focus:outline-none"
              />
              <button
                onClick={applyPromo}
                disabled={!promoCode.trim()}
                className="rounded-lg bg-cream/10 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-cream disabled:opacity-50"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <p className="mt-2 text-sm text-plonkTeal">
                ✓ {promoApplied.code} applied — {promoApplied.pctOff}% off
              </p>
            )}
            {promoError && <p className="mt-2 text-sm text-red-400">{promoError}</p>}
          </Step>
        </div>

        {/* Sidebar summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-cream/10 bg-ink/60 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
              Your basket
            </p>

            <ul className="mt-4 divide-y divide-cream/10 text-sm">
              {tickets
                .filter((t) => (ticketQty[t.id] || 0) > 0)
                .map((t) => (
                  <li key={t.id} className="flex justify-between py-2.5">
                    <span>
                      {ticketQty[t.id]}× {t.name}
                    </span>
                    <span className="text-cream/85">
                      {fmtMoney((ticketQty[t.id] || 0) * t.pricePence)}
                    </span>
                  </li>
                ))}
              {addons
                .filter((a) => (addonQty[a.id] || 0) > 0)
                .map((a) => (
                  <li key={a.id} className="flex justify-between py-2.5">
                    <span>
                      {addonQty[a.id]}× {a.name}
                    </span>
                    <span className="text-cream/85">
                      {fmtMoney((addonQty[a.id] || 0) * a.pricePence)}
                    </span>
                  </li>
                ))}
              {totalTickets === 0 && (
                <li className="py-4 text-center text-cream/40">No tickets yet.</li>
              )}
            </ul>

            <div className="mt-4 space-y-1.5 border-t border-cream/10 pt-4 text-sm">
              <Row label="Subtotal" value={fmtMoney(subtotalPence)} />
              {promoApplied && (
                <Row
                  label={`Promo (${promoApplied.code})`}
                  value={`−${fmtMoney(discountPence)}`}
                  highlight
                />
              )}
              <Row label="Total inc. VAT" value={fmtMoney(totalPence)} bold />
            </div>

            <button
              disabled={!canContinue}
              onClick={continueToCheckout}
              className="mt-6 w-full rounded-full bg-plonkPink py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {canContinue ? "Continue to checkout" : "Pick a time + tickets first"}
            </button>

            <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-cream/40">
              Preview — no money will be taken
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Step({
  number,
  title,
  subtitle,
  children,
}: {
  number: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-display text-2xl text-plonkYellow">{number}.</span>
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      {subtitle && <p className="mb-4 text-xs text-cream/55">{subtitle}</p>}
      {children}
    </section>
  );
}

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value === 0}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-lg disabled:opacity-30"
        aria-label="Decrease"
      >
        −
      </button>
      <span className="w-6 text-center font-medium">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-lg"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className={highlight ? "text-plonkTeal" : "text-cream/70"}>{label}</span>
      <span
        className={`${bold ? "font-display text-xl" : ""} ${
          highlight ? "text-plonkTeal" : "text-cream"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
