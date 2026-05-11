import Image from "next/image";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import HeroBookingWidget from "@/components/HeroBookingWidget";

const PLONK_LIFE = [
  { src: "/images/gallery01.jpg", alt: "Plonk crazy golf" },
  { src: "/images/gallery05.jpg", alt: "Plonk course detail" },
  { src: "/images/Plonk_Hackeny_2788_web.jpg", alt: "Plonk Hackney" },
  { src: "/images/PLONK-COCKTAILS_215298_L_web.jpg", alt: "Plonk cocktails" },
  { src: "/images/gallery08.jpg", alt: "Plonk crazy golf hole" },
  { src: "/images/Plonk_Borough_Arcade_-2_web.jpg", alt: "Plonk Borough arcade" },
  { src: "/images/Plonk_Hackney_Pool_1_web.jpg", alt: "Plonk pool table" },
  { src: "/images/gallery10.jpg", alt: "Plonk crazy golf course" },
];

const PRESS = [
  { name: "Evening Standard", src: "/images/London-Evening-Standard-logo.jpg" },
  { name: "Londonist", src: "/images/londonist.jpg" },
  { name: "Time Out", src: "/images/timeput_logo_2-1.png" },
  { name: "The Nudge", src: "/images/The-Nudge.jpg" },
  { name: "Secret London", src: "/images/SecretLondon.jpg" },
  { name: "Metro", src: "/images/metro-logo.jpg" },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative isolate flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hackney-hero.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/65 to-ink" />
        </div>

        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-plonkYellow">
          London · Hackney · Borough Market
        </p>
        <h1 className="font-display text-5xl leading-tight sm:text-6xl md:text-7xl">
          Crazy Golf
          <br />
          in London
        </h1>
        <p className="mt-6 max-w-xl text-base text-cream/80 sm:text-lg">
          The wackiest mini golf courses and coolest arcade & games bars
          across London. Bring your friends and a competitive spirit — we'll
          do the rest.
        </p>

        <div className="mt-10 w-full max-w-3xl px-2">
          <HeroBookingWidget />
        </div>

        <Link
          href="/book"
          className="mt-8 inline-block rounded-full bg-plonkPink px-10 py-4 text-base font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90 md:hidden"
        >
          Book Now
        </Link>
      </section>

      {/* Press strip */}
      <section className="border-y border-cream/10 bg-ink/60 py-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-cream/50">
          As featured in
        </p>
        <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6">
          {PRESS.map((p) => (
            <div key={p.name} className="relative h-12 w-24 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
              <Image src={p.src} alt={p.name} fill className="object-contain" sizes="96px" />
            </div>
          ))}
        </div>
      </section>

      {/* About blurb */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl sm:text-4xl">
          Plonk Crazy Golf & Games Bars
        </h2>
        <p className="mt-6 text-base leading-relaxed text-cream/75 sm:text-lg">
          Enter the world of Plonk Crazy Golf — the wackiest mini golf courses
          and coolest arcade and games bars across London. Our lively venues
          include indoor and outdoor crazy golf, craft beers, cocktails and
          games.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-block text-sm font-semibold uppercase tracking-wider text-plonkYellow hover:underline"
        >
          More about Plonk →
        </Link>
      </section>

      {/* Venues */}
      <section id="venues" className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-12 text-center font-display text-3xl sm:text-4xl">
          Our Venues
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <VenueCard
            name="Hackney"
            tagline="Outdoor — 9 holes — beer garden"
            image="/images/hackney-hero.jpg"
            blurb="Our perfectly positioned games bar and golf spot, a short walk from Broadway Market overlooking London Fields. Polynesian-themed course, retro arcade, pool, tacos and craft cocktails."
            href="/venue/hackney"
          />
          <VenueCard
            name="Borough Market"
            tagline="Indoor — 9 holes — under London Bridge"
            image="/images/borough-hero.jpg"
            blurb="Our biggest indoor venue, tucked under London Bridge across 4 arches — London-themed crazy golf through the capital's monuments, surrounded by graffiti murals by some of London's top spray-can talent."
            href="/venue/borough-market"
          />
        </div>
      </section>

      <Gallery heading="Plonk life" images={PLONK_LIFE} />
    </main>
  );
}

function VenueCard({
  name,
  tagline,
  image,
  blurb,
  href,
}: {
  name: string;
  tagline: string;
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
        <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
          {tagline}
        </p>
        <h3 className="mt-2 font-display text-3xl">{name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/70">{blurb}</p>
        <span className="mt-5 inline-block text-sm font-semibold uppercase tracking-wider text-plonkPink">
          Book {name} →
        </span>
      </div>
    </Link>
  );
}
