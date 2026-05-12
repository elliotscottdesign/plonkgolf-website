"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BigEmailCta from "@/components/BigEmailCta";
import { useContent } from "@/lib/content";

const POPULAR_FOR = [
  "Birthday party",
  "Christmas party",
  "Corporate event",
  "Outdoor space",
  "Parkside location",
  "Unusual space",
];

const CAPACITIES = [
  { label: "Standing", value: "65" },
  { label: "Dining", value: "40" },
  { label: "Cabaret", value: "30" },
];

const ROOM_FEATURES = [
  "9-hole crazy golf",
  "Retro arcade",
  "Pool tables",
  "Pinball + board games",
  "Outdoor beer garden",
  "Tiki cocktail bar",
  "Snack Bar kitchen",
  "Natural light",
  "Wi-Fi",
  "Storage space",
  "Step-free access",
];

const CATERING_YES = [
  "In-house catering",
  "Approved caterers only",
  "We provide alcohol",
  "Kitchen facilities available",
  "Halal available",
  "Kosher available",
  "Complimentary water",
  "Extensive vegan menu",
  "Extensive gluten-free menu",
  "Buyout fee for external catering",
];
const CATERING_NO = [
  "External catering (general)",
  "BYOB alcohol",
  "Complimentary tea & coffee",
];

const WELCOMES = [
  "Games competitions / tournaments",
  "VIP events",
  "Private parties",
  "Own music equipment / DJ",
];

export default function HackneyPrivateHirePage() {
  const title = useContent(
    "privatehire.hackney.title",
    "Take Over Plonk Hackney",
  );
  return (
    <main>
      <PageHero
        eyebrow="Private hire · Plonk Hackney"
        title={title}
        intro="Our nine-hole Polynesian course, beer garden, pool, arcade and tiki bar — all yours."
        image="/hackney/garden/Garden_1.jpg"
      />

      {/* Popular for + about (forest → ember) */}
      <section className="tint-forest-to-emberDeep px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              Plonk Hackney is popular for
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {POPULAR_FOR.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-emberLine/80 bg-emberDeep/60 px-4 py-1.5 text-sm text-cream/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="mt-12 font-display text-3xl leading-tight sm:text-4xl">
              About this venue
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream/85 sm:text-lg">
              This isn't just another nine-hole mini golf course — it's a full
              games bar with a wide range of options to keep you and your
              guests entertained for hours. We're ready to host your party or
              event. You bring the people, and we'll provide them with a
              fantastic selection of drinks from our cocktail bar, alongside
              Snack Bar burgers from the kitchen.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/85 sm:text-lg">
              Our Hackney venue features a full nine-hole Polynesian course,
              two pool tables, retro arcade machines, modern pinball and a big
              selection of board games. We can accommodate up to{" "}
              <strong className="text-cream">65 people</strong> for private
              hires.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Fact sheet (ember) */}
      <section className="tint-emberDeep-to-ember px-6 py-24">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Capacity */}
          <FactPanel title="Capacity">
            <div className="grid gap-4 sm:grid-cols-3">
              {CAPACITIES.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-emberLine/80 bg-emberDeep/60 p-6 text-center"
                >
                  <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                    {c.label}
                  </p>
                  <p className="mt-3 font-display text-5xl text-cream">
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
          </FactPanel>

          {/* Room features */}
          <FactPanel title="Room features">
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {ROOM_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-cream/90">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
          </FactPanel>

          {/* Catering */}
          <FactPanel title="Catering">
            <div className="grid gap-x-10 gap-y-3 md:grid-cols-2">
              <ul className="space-y-3">
                {CATERING_YES.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-cream/90">
                    <Check />
                    {c}
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {CATERING_NO.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-sm text-cream/60"
                  >
                    <Cross />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </FactPanel>

          {/* Licences */}
          <FactPanel title="Licences">
            <p className="text-sm leading-relaxed text-cream/85 sm:text-base">
              Alcohol licence until <strong className="text-cream">23:00</strong>.
              Later licenses can be applied for with notice.
            </p>
          </FactPanel>

          {/* Venue welcomes */}
          <FactPanel title="Venue welcomes">
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {WELCOMES.map((w) => (
                <li key={w} className="flex items-center gap-3 text-sm text-cream/90">
                  <Check />
                  {w}
                </li>
              ))}
            </ul>
          </FactPanel>

          {/* Rules */}
          <FactPanel title="House rules">
            <p className="text-sm leading-relaxed text-cream/85 sm:text-base">
              No outside catering. No BYOB. Background music only.
            </p>
          </FactPanel>

          <Reveal>
            <Link
              href="/private-hire"
              className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-cream/70 transition hover:text-cream"
            >
              ← Back to private hire
            </Link>
          </Reveal>
        </div>
      </section>

      <BigEmailCta subject="Private Hire Enquiry — Plonk Hackney" />
    </main>
  );
}

function FactPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="rounded-3xl border border-emberLine/60 bg-emberRaised p-7 sm:p-9">
        <h3 className="font-display text-2xl text-plonkYellow sm:text-3xl">
          {title}
        </h3>
        <div className="mt-6">{children}</div>
      </div>
    </Reveal>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-plonkYellow/15 text-plonkYellow"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function Cross() {
  return (
    <span
      aria-hidden
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream/10 text-cream/50"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  );
}
