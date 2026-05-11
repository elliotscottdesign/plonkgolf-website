import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Private Hire — Plonk Golf",
  description:
    "Private hire venues in London. Corporate events, weddings, birthdays, Christmas parties — full takeover at Plonk Hackney or Plonk Borough Market.",
};

const VENUES = [
  {
    name: "Plonk Borough Market",
    location: "London Bridge",
    minSpend: "from £1,000 minimum spend / per hour",
    capacity: "Up to 120 guests",
    blurb:
      "Plonk at Borough Market is a celebration of all things London. Our newest nine-hole course, full-service cocktail bar and arcade is perfect for private hire takeovers.",
    image: "/images/borough-hero.jpg",
    href: "/venue/borough-market",
  },
  {
    name: "Plonk Hackney",
    location: "London Fields",
    minSpend: "from £1,000 minimum spend for 2 hours",
    capacity: "Up to 65 guests",
    blurb:
      "This isn't just another nine-hole golf course — it's a full games bar and kitchen with a wide range of options to keep you and your guests entertained for hours.",
    image: "/images/hackney-hero.jpg",
    href: "/venue/hackney",
  },
];

export default function PrivateHirePage() {
  return (
    <main>
      <PageHero
        eyebrow="Parties · Private Hire"
        title="Take Over Plonk"
        intro="Corporate events · Weddings · Birthday Parties · Christmas Parties. Whether you're after the perfect team social or something different for your birthday — we've got you covered."
        image="/images/1SOCIAL_2017-1.jpg"
      />

      <section className="tint-forest-to-plum border-t border-forestLine/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="space-y-12">
          {VENUES.map((v) => (
            <article
              key={v.name}
              className="grid gap-8 overflow-hidden rounded-3xl border border-plumLine/60 bg-plumRaised md:grid-cols-2"
            >
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
                  {v.location}
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                  {v.name}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-cream/80">
                  {v.blurb}
                </p>
                <dl className="mt-6 space-y-2 text-sm">
                  <div className="flex gap-3">
                    <dt className="text-cream/50">Spend</dt>
                    <dd className="text-cream/90">{v.minSpend}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-cream/50">Capacity</dt>
                    <dd className="text-cream/90">{v.capacity}</dd>
                  </div>
                </dl>
                <a
                  href="mailto:info@plonkgolf.co.uk?subject=Private%20Hire%20Enquiry"
                  className="mt-6 inline-block rounded-full bg-plonkPink px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
                >
                  Enquire
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-plumLine/60 bg-plumRaised p-8 text-center">
          <p className="text-sm text-cream/70">
            Ready to chat? Drop our bookings team a line at{" "}
            <a
              href="mailto:info@plonkgolf.co.uk"
              className="font-semibold text-cream underline"
            >
              info@plonkgolf.co.uk
            </a>{" "}
            and we'll get back to you fast.
          </p>
        </div>
      </div>
      </section>
    </main>
  );
}
