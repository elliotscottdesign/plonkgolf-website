import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative isolate flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hackney-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
        </div>

        <Image
          src="/images/plonk-logo.png"
          alt="Plonk Golf"
          width={260}
          height={104}
          priority
          className="mb-8 w-44 sm:w-56 md:w-64"
        />

        <h1 className="font-display text-4xl leading-tight sm:text-6xl md:text-7xl">
          Crazy Golf in London
        </h1>
        <p className="mt-4 max-w-xl text-base sm:text-lg text-cream/80">
          The wackiest mini golf courses and coolest arcade & games bars across
          London. Hackney · Borough Market.
        </p>

        <Link
          href="#venues"
          className="mt-8 inline-block rounded-full bg-plonkPink px-8 py-3 font-semibold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
        >
          Book Now
        </Link>
      </section>

      {/* Venues */}
      <section id="venues" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center font-display text-3xl sm:text-4xl">
          Our Venues
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <VenueCard
            name="Hackney"
            image="/images/hackney-hero.jpg"
            blurb="Our perfectly positioned games bar and golf spot, a short walk from Broadway Market overlooking London Fields. 9 holes of outdoor crazy golf, craft cocktails, draught beers, tacos, pool, pinball."
            href="/venue/hackney"
          />
          <VenueCard
            name="Borough Market"
            image="/images/borough-hero.jpg"
            blurb="Our biggest indoor venue, tucked under London Bridge across 4 arches — London-themed crazy golf taking you through the capital's monuments, surrounded by graffiti murals."
            href="/venue/borough-market"
          />
        </div>
      </section>

      {/* Placeholder footer */}
      <footer className="border-t border-cream/10 px-6 py-10 text-center text-sm text-cream/60">
        © {new Date().getFullYear()} Plonk Golf Ltd — new site coming
        soon.
      </footer>
    </main>
  );
}

function VenueCard({
  name,
  image,
  blurb,
  href,
}: {
  name: string;
  image: string;
  blurb: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl border border-cream/10 bg-ink/40 transition hover:border-plonkPink/60"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-cream/70">{blurb}</p>
        <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-wider text-plonkYellow">
          Book {name} →
        </span>
      </div>
    </Link>
  );
}
