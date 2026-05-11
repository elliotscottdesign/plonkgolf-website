"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TICKETS, ADDONS, VENUES, fmtMoney } from "@/lib/mockData";

const HOLD_MS = 15 * 60 * 1000; // 15 minutes
const HOLD_KEY = "plonk_book_hold_expires_at";

function useHoldTimer(): { msLeft: number; expired: boolean } {
  const [msLeft, setMsLeft] = useState<number>(HOLD_MS);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    let expiresAt = Number(sessionStorage.getItem(HOLD_KEY) || 0);
    if (!expiresAt || expiresAt < Date.now()) {
      expiresAt = Date.now() + HOLD_MS;
      sessionStorage.setItem(HOLD_KEY, String(expiresAt));
    }
    const tick = () => setMsLeft(Math.max(0, expiresAt - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { msLeft, expired: msLeft <= 0 };
}

function fmtCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function CheckoutInner() {
  const router = useRouter();
  const params = useSearchParams();

  const venueId = params.get("venue") || "hackney";
  const date = params.get("date") || "";
  const time = params.get("time") || "";
  const ticketsParam = params.get("tickets") || "{}";
  const addonsParam = params.get("addons") || "{}";
  const promoCode = params.get("promo") || "";

  const venue = VENUES.find((v) => v.id === venueId);
  const ticketQty: Record<string, number> = (() => {
    try {
      return JSON.parse(ticketsParam);
    } catch {
      return {};
    }
  })();
  const addonQty: Record<string, number> = (() => {
    try {
      return JSON.parse(addonsParam);
    } catch {
      return {};
    }
  })();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [heardFrom, setHeardFrom] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const { msLeft, expired } = useHoldTimer();

  const tickets = TICKETS.filter((t) => (ticketQty[t.id] || 0) > 0);
  const addons = ADDONS.filter((a) => (addonQty[a.id] || 0) > 0);

  let subtotal = 0;
  for (const t of tickets) subtotal += ticketQty[t.id] * t.pricePence;
  for (const a of addons) subtotal += addonQty[a.id] * a.pricePence;
  const pct = promoCode === "FRIDAY20" ? 20 : promoCode === "STUDENT10" ? 10 : 0;
  const discount = Math.round((subtotal * pct) / 100);
  const total = Math.max(0, subtotal - discount);

  const fmtDate = (iso: string) => {
    if (!iso) return "";
    return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (expired) return;
    // In production this hits a Supabase Edge Function which creates a
    // Stripe Checkout session and redirects the browser to Stripe.
    // For the preview, jump straight to the success page.
    sessionStorage.removeItem(HOLD_KEY);
    const successParams = new URLSearchParams({
      ref: `PLNK-${Math.random().toString(36).slice(2, 6).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      venue: venueId,
      date,
      time,
      total: String(total),
      email,
      phone,
      heard_from: heardFrom,
      name: `${firstName} ${lastName}`.trim(),
    });
    router.push(`/book/success?${successParams.toString()}`);
  }

  const canPay =
    !expired &&
    email &&
    firstName &&
    lastName &&
    phone &&
    heardFrom &&
    tickets.length > 0;

  if (!venue || tickets.length === 0) {
    return (
      <main className="min-h-screen px-6 py-20 text-center">
        <h1 className="font-display text-3xl">Your basket is empty</h1>
        <Link
          href="/book"
          className="mt-6 inline-block rounded-full bg-plonkPink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white"
        >
          Start a booking
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/book/${venueId}`}
          className="text-xs font-semibold uppercase tracking-widest text-cream/60 hover:text-cream"
        >
          ← Back to booking
        </Link>
        <h1 className="mt-4 font-display text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-cream/70">
          Almost there — just your details, then payment.
        </p>

        {expired ? (
          <div className="mt-6 rounded-xl border border-red-400/40 bg-red-400/10 px-5 py-4">
            <p className="text-sm font-semibold text-red-300">
              Your 15-minute ticket hold has expired
            </p>
            <p className="mt-1 text-xs text-cream/70">
              Tickets have been released so other customers can book. Head
              back to the booking page to pick a slot again.
            </p>
            <Link
              href={`/book/${venueId}`}
              className="mt-3 inline-block rounded-full bg-plonkPink px-5 py-2 text-xs font-bold uppercase tracking-wider text-white"
            >
              Start again
            </Link>
          </div>
        ) : (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-plonkYellow/30 bg-plonkYellow/5 px-5 py-3 text-sm text-plonkYellow">
            <span aria-hidden className="text-lg">⏱</span>
            <span>
              Your tickets are held for{" "}
              <strong className="font-mono">{fmtCountdown(msLeft)}</strong>.
              Finish checkout before then.
            </span>
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <form onSubmit={handlePay} className="space-y-6">
            <section className="rounded-2xl border border-cream/10 bg-ink/40 p-6">
              <h2 className="font-display text-xl">Your details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="First name" required value={firstName} onChange={setFirstName} />
                <Field label="Last name" required value={lastName} onChange={setLastName} />
                <div className="sm:col-span-2">
                  <Field label="Email" type="email" required value={email} onChange={setEmail} />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Phone" type="tel" required value={phone} onChange={setPhone} />
                </div>
                <div className="sm:col-span-2">
                  <SelectField
                    label="Where did you hear about us?"
                    required
                    value={heardFrom}
                    onChange={setHeardFrom}
                    options={[
                      { value: "", label: "Pick one…", disabled: true },
                      { value: "local", label: "Local" },
                      { value: "word_of_mouth", label: "Word of Mouth" },
                      { value: "google", label: "Google" },
                      { value: "social_media", label: "Social Media" },
                    ]}
                  />
                </div>
              </div>
              <label className="mt-4 flex items-start gap-3 text-sm text-cream/70">
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-cream/20 bg-ink/40"
                />
                <span>
                  Email me about Plonk deals and events — no spam, unsub
                  anytime.
                </span>
              </label>
            </section>

            <section className="rounded-2xl border border-cream/10 bg-ink/40 p-6">
              <h2 className="font-display text-xl">Payment</h2>
              <p className="mt-2 text-sm text-cream/70">
                When you hit "Pay", you'll be redirected to Stripe to enter your card.
                Apple Pay, Google Pay and Link are all supported automatically.
              </p>
              <div className="mt-5 rounded-xl border border-plonkYellow/30 bg-plonkYellow/5 px-4 py-3 text-xs text-plonkYellow">
                <strong>Preview mode.</strong> No real card will be charged.
                "Pay" jumps you straight to the confirmation screen for
                preview purposes.
              </div>
            </section>

            <button
              type="submit"
              disabled={!canPay}
              className="w-full rounded-full bg-plonkPink py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {expired ? "Hold expired — start again" : `Pay ${fmtMoney(total)} →`}
            </button>
          </form>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-cream/10 bg-ink/60 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
                {venue.name}
              </p>
              <p className="mt-2 font-display text-lg">{fmtDate(date)}</p>
              <p className="text-sm text-cream/70">{time}</p>

              <ul className="mt-5 divide-y divide-cream/10 border-y border-cream/10 text-sm">
                {tickets.map((t) => (
                  <li key={t.id} className="flex justify-between py-2.5">
                    <span>
                      {ticketQty[t.id]}× {t.name}
                    </span>
                    <span className="text-cream/85">
                      {fmtMoney(ticketQty[t.id] * t.pricePence)}
                    </span>
                  </li>
                ))}
                {addons.map((a) => (
                  <li key={a.id} className="flex justify-between py-2.5">
                    <span>
                      {addonQty[a.id]}× {a.name}
                    </span>
                    <span className="text-cream/85">
                      {fmtMoney(addonQty[a.id] * a.pricePence)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-cream/70">
                  <span>Subtotal</span>
                  <span>{fmtMoney(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-plonkTeal">
                    <span>Promo ({promoCode})</span>
                    <span>−{fmtMoney(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-cream/10 pt-2 text-lg">
                  <span>Total</span>
                  <span className="font-display">{fmtMoney(total)}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-cream/40">
                  Inc. 20% VAT
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-cream/55">
        {label}
        {required && <span className="text-plonkPink"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-cream/15 bg-ink/40 px-4 py-2.5 text-sm focus:border-plonkPink focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  required,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  options: { value: string; label: string; disabled?: boolean }[];
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-cream/55">
        {label}
        {required && <span className="text-plonkPink"> *</span>}
      </span>
      <select
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full appearance-none rounded-lg border border-cream/15 bg-ink/40 px-4 py-2.5 text-sm focus:border-plonkPink focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function CheckoutClient() {
  return (
    <Suspense fallback={null}>
      <CheckoutInner />
    </Suspense>
  );
}
