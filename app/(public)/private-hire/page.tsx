"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BigEmailCta from "@/components/BigEmailCta";
import { useContent, useImage } from "@/lib/content";

const VENUES = [
  {
    slug: "hackney",
    name: "Plonk Hackney",
    location: "London Fields · Outdoor",
    capacity: "Up to 65 standing · 40 dining · 30 cabaret",
    minSpend: "From £1,000 minimum spend for 2 hours",
    blurb:
      "A full nine-hole Polynesian course, beer garden, two pool tables, retro arcade and a tiki cocktail bar. Outdoor space with a parkside location.",
    image: "/hackney/venue/Interior_5.jpg",
    href: "/private-hire/hackney",
    tags: ["Birthday", "Christmas party", "Corporate event", "Outdoor space"],
  },
  {
    slug: "borough-market",
    name: "Plonk Borough Market",
    location: "London Bridge · Indoor",
    capacity: "Up to 100 standing",
    minSpend: "From £1,000 minimum spend per hour",
    blurb:
      "Four railway arches under London Bridge. London-themed 9-hole course, full-service cocktail bar, packed arcade, and 360° street-art murals.",
    image: "/borough/course/Course_1.jpg",
    href: "/private-hire/borough-market",
    tags: ["Birthday", "Christmas party", "Corporate event", "Unusual space"],
  },
];

const REASONS_FALLBACK = [
  {
    title: "Bring your people",
    body: "Birthdays, hen dos, work socials, Christmas parties, weddings — we'll host them all and they'll remember it for the right reasons.",
  },
  {
    title: "Built-in entertainment",
    body: "A 9-hole course, arcade, pool, ping pong, board games — your guests entertain themselves. No icebreakers required.",
  },
  {
    title: "Full bar & kitchen",
    body: "Signature cocktails, craft on draught, wine, mocktails. Snack Bar burgers at Hackney, sharing platters at Borough.",
  },
];

export default function PrivateHirePage() {
  const heroImage = useImage("privatehire.hero_image", "/borough/course/Course_3.jpg");
  const eyebrow = useContent(
    "privatehire.eyebrow",
    "Parties · Corporate · Christmas · Weddings",
  );
  const title = useContent("privatehire.title", "Take Over Plonk");
  const intro = useContent(
    "privatehire.intro",
    "Two London venues, one unforgettable party. Take over a course, an arch, or the whole place.",
  );

  const reasonsEyebrow = useContent("privatehire.reasons.eyebrow", "Why hire Plonk");
  const reasonsHeading = useContent(
    "privatehire.reasons.heading",
    "The kind of party people actually remember.",
  );
  const r1Title = useContent("privatehire.reason1.title", REASONS_FALLBACK[0].title);
  const r1Body = useContent("privatehire.reason1.body", REASONS_FALLBACK[0].body);
  const r2Title = useContent("privatehire.reason2.title", REASONS_FALLBACK[1].title);
  const r2Body = useContent("privatehire.reason2.body", REASONS_FALLBACK[1].body);
  const r3Title = useContent("privatehire.reason3.title", REASONS_FALLBACK[2].title);
  const r3Body = useContent("privatehire.reason3.body", REASONS_FALLBACK[2].body);
  const reasons = [
    { title: r1Title, body: r1Body },
    { title: r2Title, body: r2Body },
    { title: r3Title, body: r3Body },
  ];

  const venuesEyebrow = useContent("privatehire.venues.eyebrow", "Pick a venue");
  const venuesHeading = useContent(
    "privatehire.venues.heading",
    "Two takeover-ready venues.",
  );
  const venuesIntro = useContent(
    "privatehire.venues.intro",
    "Tap a venue for the full fact sheet — capacities, catering, licences, room features, the lot.",
  );

  return (
    <main>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        image={heroImage}
      />

      {/* Reasons (forest → ember) */}
      <section className="tint-forest-to-emberDeep px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              {reasonsEyebrow}
            </p>
            <h2 className="mt-6 text-center font-display text-4xl sm:text-5xl">
              {reasonsHeading}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="h-full rounded-2xl border border-emberLine/60 bg-emberRaised p-7">
                  <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                    0{i + 1}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{r.title}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-cream/75">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Choose a venue (ember) */}
      <section className="tint-emberDeep-to-ember px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              {venuesEyebrow}
            </p>
            <h2 className="mt-6 text-center font-display text-4xl sm:text-5xl">
              {venuesHeading}
            </h2>
            <p className="mx-auto mt-6 whitespace-pre-line max-w-2xl text-center text-base leading-relaxed text-cream/75">
              {venuesIntro}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {VENUES.map((v, i) => (
              <Reveal key={v.slug} delay={i * 100}>
                <Link
                  href={v.href}
                  className="group block h-full overflow-hidden rounded-3xl border border-emberLine/60 bg-emberRaised transition hover:border-plonkYellow/60"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emberDeep via-emberDeep/30 to-transparent" />
                  </div>
                  <div className="p-7 sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                      {v.location}
                    </p>
                    <h3 className="mt-2 font-display text-3xl">{v.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-cream/80">
                      {v.blurb}
                    </p>

                    <dl className="mt-6 space-y-2 text-sm">
                      <div className="flex gap-3">
                        <dt className="w-20 shrink-0 uppercase tracking-wider text-cream/50">
                          Capacity
                        </dt>
                        <dd className="text-cream/90">{v.capacity}</dd>
                      </div>
                      <div className="flex gap-3">
                        <dt className="w-20 shrink-0 uppercase tracking-wider text-cream/50">
                          Spend
                        </dt>
                        <dd className="text-cream/90">{v.minSpend}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {v.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-emberLine/80 bg-emberDeep/60 px-3 py-1 text-xs text-cream/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="mt-6 inline-flex items-center text-sm font-bold uppercase tracking-wider text-plonkYellow transition group-hover:text-cream">
                      Full fact sheet →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Big email CTA (ember → forest) */}
      <BigEmailCta />
    </main>
  );
}
