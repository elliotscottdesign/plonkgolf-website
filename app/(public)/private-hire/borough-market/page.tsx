import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BigEmailCta from "@/components/BigEmailCta";

export const metadata: Metadata = {
  title: "Private Hire — Plonk Borough Market",
  description:
    "Private hire fact sheet for Plonk Borough Market. Capacities, catering, licences, room features and house rules for full-venue takeovers under London Bridge.",
};

const POPULAR_FOR = [
  "Birthday party",
  "Christmas party",
  "Corporate event",
  "Unusual space",
];

const ROOM_FEATURES = [
  "9-hole crazy golf",
  "Full arcade",
  "Cocktail bar",
  "Pool tables",
  "Pinball & ping pong",
  "Street-art murals",
  "Storage space",
  "Step-free access",
];

const WELCOMES = [
  "Games competitions / tournaments",
  "VIP events",
  "Private parties",
  "Own music playlists",
];

export default function BoroughPrivateHirePage() {
  return (
    <main>
      <PageHero
        eyebrow="Private hire · Plonk Borough Market"
        title="Take Over Plonk Borough"
        intro="Four railway arches under London Bridge — yours for the night."
        image="/borough/course/Course_4.jpg"
      />

      {/* Popular for + about (forest → ember) */}
      <section className="tint-forest-to-emberDeep border-t border-forestLine/40 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              Plonk Borough is popular for
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
              Plonk at Borough Market is a celebration of all things London.
              A crew of London's best muralists and street artists have
              created a 360° gallery on the walls, ceiling and floor of the
              arches underneath London Bridge. This festival of street art
              wraps a nine-hole golf course that showcases the city's most
              famous monuments, sights and traditions — and some of our best
              ever obstacles.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/85 sm:text-lg">
              With a full-service cocktail bar and a packed arcade — shooters,
              fighters, button-bashers, air hockey, ping pong, foosball and
              pinball — there's something here for every kind of guest. We
              can accommodate up to{" "}
              <strong className="text-cream">100 people</strong> for private
              hires.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Fact sheet (ember) */}
      <section className="tint-emberDeep-to-ember border-t border-emberLine/40 px-6 py-24">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Capacity */}
          <FactPanel title="Capacity">
            <div className="rounded-2xl border border-emberLine/80 bg-emberDeep/60 p-8 text-center">
              <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                Standing
              </p>
              <p className="mt-3 font-display text-6xl text-cream">100</p>
              <p className="mt-4 text-sm text-cream/65">
                Perfect for smaller takeovers — and ideal to combine with a
                meal out in the market afterwards.
              </p>
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
            <p className="text-sm leading-relaxed text-cream/85 sm:text-base">
              We offer sharing platters and boards at Borough Market —
              vegetarian boards, charcuterie sharers, and dip selections.
            </p>
          </FactPanel>

          {/* Licences */}
          <FactPanel title="Licences">
            <p className="text-sm leading-relaxed text-cream/85 sm:text-base">
              Alcohol licence until <strong className="text-cream">20:00</strong>.
              Temporary Events Notice for later licence may be available on
              request.
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
              No outside catering. Background music only.
            </p>
          </FactPanel>

          {/* Testimonial */}
          <FactPanel title="Testimonial">
            <blockquote className="text-base leading-relaxed text-cream/90 sm:text-lg">
              "Thank you for hosting our 2019 Summer Intern event — the
              feedback from the group has been great, they really enjoyed
              themselves."
            </blockquote>
            <p className="mt-4 text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              — Brad
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

      <BigEmailCta subject="Private Hire Enquiry — Plonk Borough Market" />
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
