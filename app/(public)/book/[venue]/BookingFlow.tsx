"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Addon, Ticket, Venue } from "@/lib/mockData";
import { fmtMoney } from "@/lib/mockData";

// Mock available slots for a date — every 10 min between 17:00 and 22:00,
// some randomised to be unavailable / nearly full. Capacity is 6 per slot.
function generateSlots(dateStr: string): { time: string; left: number }[] {
  const seed = [...dateStr].reduce((s, c) => s + c.charCodeAt(0), 0);
  const rand = (n: number) => {
    const x = Math.sin(seed * n) * 10000;
    return x - Math.floor(x);
  };
  const slots: { time: string; left: number }[] = [];
  for (let h = 17; h <= 22; h++) {
    for (let m = 0; m < 60; m += 10) {
      if (h === 22 && m > 0) break;
      const i = h * 60 + m;
      const r = rand(i);
      let left: number;
      if (r < 0.15) left = 0;
      else if (r < 0.4) left = (Math.floor(r * 10) % 3) + 1;
      else left = 6;
      slots.push({
        time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        left,
      });
    }
  }
  return slots;
}

function getNextDates(n: number): { iso: string; topLabel: string; bottomLabel: string }[] {
  const out: { iso: string; topLabel: string; bottomLabel: string }[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    let topLabel: string;
    let bottomLabel: string;
    if (i === 0) {
      topLabel = "Today";
      bottomLabel = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    } else if (i === 1) {
      topLabel = "Tomorrow";
      bottomLabel = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    } else {
      topLabel = d.toLocaleDateString("en-GB", { weekday: "short" });
      bottomLabel = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    }
    out.push({ iso: d.toISOString().slice(0, 10), topLabel, bottomLabel });
  }
  return out;
}

function maxBookableDateIso(): string {
  // Allow booking up to 1 year ahead.
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function fullDateLabel(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function dayOfWeekFromIso(iso: string): number {
  return new Date(iso + "T00:00:00").getDay(); // 0=Sun..6=Sat
}

function parseHHMM(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + (m || 0);
}

// Returns the pricing rules that apply right now, given the venue + selected
// slot. These are CUSTOMER-FACING — used to recompute prices and explain why.
type PricingContext = {
  happyHour: boolean; // Hackney £5 before 5pm Mon–Fri
  mondayBOGOF: boolean; // Hackney BOGOF Mondays (post-5pm)
  tuesdaySpecial: boolean; // Hackney Tuesday — bundle ticket available
  childCutoff: boolean; // Slot is at/after 18:00 — no child tickets
};

function computePricingContext(
  venueId: string,
  iso: string,
  slotTime: string | null,
): PricingContext {
  const dow = dayOfWeekFromIso(iso);
  const t = slotTime ? parseHHMM(slotTime) : null;
  const isHackney = venueId === "hackney";
  const isWeekday = dow >= 1 && dow <= 5;
  const isMonday = dow === 1;
  const isTuesday = dow === 2;

  return {
    happyHour: isHackney && isWeekday && t !== null && t < 17 * 60,
    mondayBOGOF: isHackney && isMonday && t !== null && t >= 17 * 60,
    tuesdaySpecial: isHackney && isTuesday,
    childCutoff: t !== null && t >= 18 * 60,
  };
}

// Returns the effective unit price for a ticket given context.
// Bundle (Tuesday special) and add-ons are not affected by happy hour / BOGOF.
function effectiveUnitPrice(ticket: Ticket, ctx: PricingContext): number {
  if (ticket.kind === "bundle") return ticket.pricePence;
  if (ctx.happyHour) return 500; // £5 happy-hour price
  return ticket.pricePence;
}

// Returns the subtotal contribution for `qty` of a ticket, applying BOGOF
// where applicable. BOGOF on top of happy-hour is NOT stacked (happy hour
// already discounts to £5 — best of the two applies).
function ticketLineTotal(
  ticket: Ticket,
  qty: number,
  ctx: PricingContext,
): { total: number; paidQty: number; freeQty: number } {
  if (qty <= 0) return { total: 0, paidQty: 0, freeQty: 0 };
  const unit = effectiveUnitPrice(ticket, ctx);
  if (ctx.mondayBOGOF && ticket.kind !== "bundle" && !ctx.happyHour) {
    const paid = Math.ceil(qty / 2);
    return { total: paid * unit, paidQty: paid, freeQty: qty - paid };
  }
  return { total: qty * unit, paidQty: qty, freeQty: 0 };
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

  const dates = useMemo(() => getNextDates(8), []);
  const slots = useMemo(() => generateSlots(dateIso), [dateIso]);
  const isQuickDate = dates.some((d) => d.iso === dateIso);
  const dow = useMemo(() => dayOfWeekFromIso(dateIso), [dateIso]);

  // Filter tickets to those available on the chosen day of the week.
  const availableTickets = useMemo(
    () =>
      tickets.filter(
        (t) => !t.availableDaysOfWeek || t.availableDaysOfWeek.includes(dow),
      ),
    [tickets, dow],
  );

  const ctx = useMemo(
    () => computePricingContext(venue.id, dateIso, slotTime),
    [venue.id, dateIso, slotTime],
  );

  // Per-ticket line totals using pricing rules.
  const ticketLines = useMemo(
    () =>
      availableTickets.map((t) => {
        const qty = ticketQty[t.id] || 0;
        const line = ticketLineTotal(t, qty, ctx);
        return { ticket: t, qty, ...line };
      }),
    [availableTickets, ticketQty, ctx],
  );

  const ticketSubtotal = ticketLines.reduce((s, l) => s + l.total, 0);
  const addonSubtotal = useMemo(() => {
    let s = 0;
    for (const a of addons) s += (addonQty[a.id] || 0) * a.pricePence;
    return s;
  }, [addons, addonQty]);
  const subtotalPence = ticketSubtotal + addonSubtotal;

  const discountPence = promoApplied
    ? Math.round((subtotalPence * promoApplied.pctOff) / 100)
    : 0;
  const totalPence = Math.max(0, subtotalPence - discountPence);
  const totalTickets = Object.values(ticketQty).reduce((s, n) => s + n, 0);

  // Rule: child tickets must always be accompanied by at least one adult/bundle ticket.
  const adultCount = availableTickets
    .filter((t) => t.kind === "adult" || t.kind === "bundle")
    .reduce((s, t) => s + (ticketQty[t.id] || 0), 0);
  const childCount = availableTickets
    .filter((t) => t.kind === "child")
    .reduce((s, t) => s + (ticketQty[t.id] || 0), 0);
  const childRuleViolated = childCount > 0 && adultCount === 0;

  // Rule: child tickets only available before 6pm. If the chosen slot is at
  // or after 18:00 and any child tickets are in the basket, force them to 0.
  const childCutoffViolated = ctx.childCutoff && childCount > 0;

  const canContinue =
    !!slotTime &&
    totalTickets > 0 &&
    !childRuleViolated &&
    !childCutoffViolated;

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
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {dates.map((d) => {
                const active = d.iso === dateIso;
                return (
                  <button
                    key={d.iso}
                    onClick={() => {
                      setDateIso(d.iso);
                      setSlotTime(null);
                    }}
                    className={`flex min-h-[68px] flex-col items-center justify-center rounded-xl border px-3 py-3 transition ${
                      active
                        ? "border-plonkPink bg-plonkPink/15 text-cream"
                        : "border-cream/15 text-cream/80 hover:border-cream/30 active:bg-cream/5"
                    }`}
                  >
                    <span className="text-sm font-semibold">{d.topLabel}</span>
                    <span className="mt-0.5 text-[11px] uppercase tracking-widest text-cream/55">
                      {d.bottomLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col gap-2 rounded-xl border border-cream/15 bg-ink/40 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
                  Or pick any date
                </p>
                {!isQuickDate && (
                  <p className="mt-1 text-sm text-cream">{fullDateLabel(dateIso)}</p>
                )}
              </div>
              <input
                type="date"
                min={todayIso()}
                max={maxBookableDateIso()}
                value={dateIso}
                onChange={(e) => {
                  if (e.target.value) {
                    setDateIso(e.target.value);
                    setSlotTime(null);
                  }
                }}
                className="min-h-[44px] rounded-lg border border-cream/15 bg-ink/60 px-3 py-2 text-sm text-cream focus:border-plonkPink focus:outline-none"
              />
            </div>
          </Step>

          {/* Step 2: Slot */}
          <Step
            number={2}
            title="Pick a time"
            subtitle="6 tickets per 10-minute slot. Numbers shown are tickets still available right now."
          >
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {slots.map((s) => {
                const sold = s.left === 0;
                const active = s.time === slotTime;
                return (
                  <button
                    key={s.time}
                    disabled={sold}
                    onClick={() => setSlotTime(s.time)}
                    className={`flex min-h-[60px] flex-col items-center justify-center rounded-lg border px-2 py-2 text-sm transition ${
                      sold
                        ? "cursor-not-allowed border-cream/5 bg-cream/5 text-cream/30 line-through"
                        : active
                          ? "border-plonkPink bg-plonkPink/15 text-cream"
                          : "border-cream/15 text-cream hover:border-cream/30 active:bg-cream/5"
                    }`}
                  >
                    <p className="font-mono text-base">{s.time}</p>
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
          <Step
            number={3}
            title="How many tickets?"
            subtitle="Under-16s must be accompanied by at least one adult and can only book slots before 6pm."
          >
            {(ctx.happyHour || ctx.mondayBOGOF || ctx.tuesdaySpecial) && (
              <div className="mb-4 space-y-2">
                {ctx.happyHour && (
                  <RuleBanner color="teal">
                    Happy hour — all tickets £5 (Mon–Fri before 5pm)
                  </RuleBanner>
                )}
                {ctx.mondayBOGOF && (
                  <RuleBanner color="pink">
                    Monday — buy one, get one free on tickets
                  </RuleBanner>
                )}
                {ctx.tuesdaySpecial && (
                  <RuleBanner color="yellow">
                    Tuesday special — Drink, Golf & Game bundle available below
                  </RuleBanner>
                )}
              </div>
            )}

            <ul className="space-y-3">
              {availableTickets.map((t) => {
                const unit = effectiveUnitPrice(t, ctx);
                const discounted = unit !== t.pricePence;
                const disabled = t.kind === "child" && ctx.childCutoff;
                return (
                  <li
                    key={t.id}
                    className={`rounded-xl border p-4 ${
                      t.kind === "bundle"
                        ? "border-plonkYellow/40 bg-plonkYellow/5"
                        : "border-cream/10 bg-ink/40"
                    } ${disabled ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium">{t.name}</p>
                          {t.kind === "bundle" && (
                            <span className="rounded-full bg-plonkYellow/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-plonkYellow">
                              Tuesday special
                            </span>
                          )}
                        </div>
                        {t.description && (
                          <p className="mt-1 text-xs text-cream/65">
                            {t.description}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-cream/55">
                          {discounted ? (
                            <>
                              <span className="text-plonkTeal">
                                {fmtMoney(unit)}
                              </span>{" "}
                              <span className="line-through">
                                {fmtMoney(t.pricePence)}
                              </span>{" "}
                              inc. VAT
                            </>
                          ) : (
                            <>{fmtMoney(t.pricePence)} inc. VAT</>
                          )}
                        </p>
                        {disabled && (
                          <p className="mt-1 text-xs text-plonkYellow">
                            Under-16s only available before 6pm — pick an
                            earlier slot
                          </p>
                        )}
                      </div>
                      <QtyStepper
                        value={ticketQty[t.id] || 0}
                        onChange={(v) => setTicketQty({ ...ticketQty, [t.id]: v })}
                        disabled={disabled}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            {childRuleViolated && !childCutoffViolated && (
              <div className="mt-4 rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                Add at least one adult ticket — children can't be booked on
                their own.
              </div>
            )}
            {childCutoffViolated && (
              <div className="mt-4 rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                Children's tickets aren't available after 6pm. Pick an earlier
                time or remove the child tickets.
              </div>
            )}
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
              {ticketLines
                .filter((l) => l.qty > 0)
                .map((l) => (
                  <li key={l.ticket.id} className="py-2.5">
                    <div className="flex justify-between">
                      <span>
                        {l.qty}× {l.ticket.name}
                      </span>
                      <span className="text-cream/85">{fmtMoney(l.total)}</span>
                    </div>
                    {l.freeQty > 0 && (
                      <p className="mt-0.5 text-[11px] text-plonkPink">
                        {l.freeQty} free — Monday BOGOF
                      </p>
                    )}
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
              className="mt-6 w-full rounded-full bg-plonkPink py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {canContinue
                ? "Continue to checkout"
                : childCutoffViolated
                  ? "Children only before 6pm"
                  : childRuleViolated
                    ? "Adult ticket required"
                    : "Pick a time + tickets first"}
            </button>

            {canContinue && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-cream/55">
                <span aria-hidden>⏱</span>
                We'll hold your tickets for 15 mins while you check out
              </p>
            )}

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
  disabled,
}: {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={disabled || value === 0}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-lg disabled:opacity-30"
        aria-label="Decrease"
      >
        −
      </button>
      <span className="w-6 text-center font-medium">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        disabled={disabled}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-lg disabled:opacity-30"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

function RuleBanner({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "teal" | "pink" | "yellow";
}) {
  const styles: Record<typeof color, string> = {
    teal: "border-plonkTeal/40 bg-plonkTeal/10 text-plonkTeal",
    pink: "border-plonkPink/40 bg-plonkPink/10 text-plonkPink",
    yellow: "border-plonkYellow/30 bg-plonkYellow/5 text-plonkYellow",
  };
  return (
    <div
      className={`rounded-xl border px-4 py-2.5 text-xs font-semibold uppercase tracking-widest ${styles[color]}`}
    >
      {children}
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
