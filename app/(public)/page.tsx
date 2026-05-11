import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroBookingWidget from "@/components/HeroBookingWidget";

const PRESS = [
  { name: "Evening Standard", src: "/images/London-Evening-Standard-logo.jpg" },
  { name: "Londonist", src: "/images/londonist.jpg" },
  { name: "Time Out", src: "/images/timeput_logo_2-1.png" },
  { name: "The Nudge", src: "/images/The-Nudge.jpg" },
  { name: "Secret London", src: "/images/SecretLondon.jpg" },
  { name: "Metro", src: "/images/metro-logo.jpg" },
];

const FEATURES = [
  {
    title: "Crazy golf",
    body: "Two original 9-hole courses designed and built in-house. Outdoor in Hackney, indoor under the arches in Borough.",
  },
  {
    title: "Cocktails & craft beer",
    body: "Properly mixed cocktails, rotating local kegs, and a wine list that goes beyond the obvious.",
  },
  {
    title: "Stone-baked food",
    body: "Pizzas, tacos and small plates made for sharing between rounds. Vegan and gluten-free always on.",
  },
  {
    title: "Arcade & games",
    body: "Pool, ping pong, retro arcade cabinets and pinball — the round doesn't have to end on the 9th hole.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-forest">
      {/* ───────────── HERO ───────────── */}
      <section className="relative isolate flex min-h-[92vh] flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/PLONK-BOROUGH_02_241468_Web_2.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forestDeep/60 via-forestDeep/70 to-forest" />
        </div>

        <Reveal>
          <p className="mb-6 text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
            Hackney · Borough Market
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-[88px]">
            Crazy Golf Creations
            <br />
            <span className="italic text-plonkYellow">Across the Capital</span>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-8 max-w-xl text-base text-cream/80 sm:text-lg">
            Two original courses. Two iconic London arches. One unforgettable
            round — with cocktails, food and games to match.
          </p>
        </Reveal>

        <Reveal delay={360} className="w-full">
          <div className="mt-12 w-full max-w-3xl px-2 mx-auto">
            <HeroBookingWidget />
          </div>

          <Link
            href="/book"
            className="mt-8 inline-block rounded-full bg-plonkPink px-10 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-plonkPink/20 transition hover:bg-plonkPink/90 md:hidden"
          >
            Book a tee time
          </Link>
        </Reveal>

        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-eyebrow text-cream/40">
          Scroll
        </div>
      </section>

      {/* ───────────── MISSION ───────────── */}
      <section className="border-t border-forestLine/40 px-6 py-28 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              Original. Independent. London-made.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-8 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
              We don't do off-the-shelf.
              <br />
              <span className="text-cream/60">
                Every hole, every cocktail, every tile —
              </span>
              <br />
              built in-house, in London.
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
              Plonk has been London's original crazy golf bar since 2014.
              Independent, family-run, and still designing every course
              ourselves. No franchises. No imitators.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── VENUES ───────────── */}
      <section id="venues" className="relative">
        <VenueSpotlight
          name="Hackney"
          bookHref="/book/hackney"
          detailHref="/venue/hackney"
          eyebrow="Outdoor · 9 holes · beer garden"
          image="/images/Plonk_Hackeny_2788_web.jpg"
          imageAlt="Plonk Hackney crazy golf"
          blurb="A short walk from Broadway Market overlooking London Fields. Our Polynesian-themed outdoor course, with a beer garden, taco kitchen, pool, retro arcade and craft cocktail bar."
          features={[
            "9-hole Polynesian course",
            "Outdoor beer garden",
            "Taco kitchen",
            "Pool & arcade",
          ]}
          align="left"
        />
        <VenueSpotlight
          name="Borough Market"
          bookHref="/book/borough"
          detailHref="/venue/borough-market"
          eyebrow="Indoor · 9 holes · under London Bridge"
          image="/images/PLONK-BOROUGH-AUGUST-230624_web.jpg"
          imageAlt="Plonk Borough Market crazy golf"
          blurb="Tucked into four railway arches under London Bridge. A London-themed indoor course threading past the city's monuments, surrounded by murals from London's best spray-can talent."
          features={[
            "9-hole London-themed course",
            "4 covered arches",
            "Stone-baked pizza",
            "Ping pong & pinball",
          ]}
          align="right"
        />
      </section>

      {/* ───────────── FEATURES ───────────── */}
      <section className="border-t border-forestLine/40 bg-forestDeep px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              Inside every Plonk
            </p>
            <h2 className="mt-6 text-center font-display text-4xl sm:text-5xl">
              More than mini golf.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-forestLine/50 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="h-full bg-forest p-8">
                  <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                    0{i + 1}
                  </p>
                  <h3 className="mt-4 font-display text-2xl">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── PRESS MARQUEE ───────────── */}
      <section className="overflow-hidden border-y border-forestLine/40 bg-forest py-12">
        <p className="text-center text-xs font-bold uppercase tracking-eyebrow text-cream/40">
          As featured in
        </p>
        <div className="no-scrollbar mt-8 flex w-full overflow-x-hidden">
          <div className="marquee flex shrink-0 items-center gap-16 px-8">
            {[...PRESS, ...PRESS].map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="relative h-10 w-28 shrink-0 opacity-60 grayscale"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="112px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── PRIVATE HIRE + VOUCHERS ───────────── */}
      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <CtaCard
            eyebrow="Bring your people"
            title="Private hire & events"
            blurb="Birthdays, work parties, hen dos, weddings. Take over a course, an arch, or the whole venue."
            href="/private-hire"
            image="/images/PLONK-HACKNEY-NOV-220190_web.jpg"
          />
          <CtaCard
            eyebrow="The easy gift"
            title="Plonk gift vouchers"
            blurb="A round, a meal, a cocktail flight, or all three. Delivered to inbox, redeemable at either venue."
            href="/vouchers"
            image="/images/voucher_banner_web.jpg"
          />
        </div>
      </section>

      {/* ───────────── BIG CTA FOOTER ───────────── */}
      <section className="relative overflow-hidden border-t border-forestLine/40">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/Plonk_Hackney_Pool_1_web.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/90 to-forest" />
        </div>
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
              Right then.
              <br />
              <span className="text-plonkYellow italic">Book your round.</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mx-auto mt-8 max-w-md text-base text-cream/70">
              30 seconds to book. 6 players per slot. 9 holes of chaos.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link
              href="/book"
              className="mt-10 inline-block rounded-full bg-plonkPink px-12 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-plonkPink/20 transition hover:bg-plonkPink/90"
            >
              Book a tee time
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ───────────── components ───────────── */

function VenueSpotlight({
  name,
  bookHref,
  detailHref,
  eyebrow,
  image,
  imageAlt,
  blurb,
  features,
  align,
}: {
  name: string;
  bookHref: string;
  detailHref: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  blurb: string;
  features: string[];
  align: "left" | "right";
}) {
  const imageFirst = align === "left";
  return (
    <div className="border-t border-forestLine/40 px-6 py-20 md:py-32">
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16 ${
          imageFirst ? "" : "md:[&>div:first-child]:order-2"
        }`}
      >
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-forestRaised">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              {eyebrow}
            </p>
            <h3 className="mt-4 font-display text-5xl leading-tight sm:text-6xl">
              {name}
            </h3>
            <p className="mt-6 text-base leading-relaxed text-cream/75 sm:text-lg">
              {blurb}
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-cream/80">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-plonkYellow" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={bookHref}
                className="inline-block rounded-full bg-plonkPink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
              >
                Book {name}
              </Link>
              <Link
                href={detailHref}
                className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-cream/80 transition hover:text-cream"
              >
                Venue details →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function CtaCard({
  eyebrow,
  title,
  blurb,
  href,
  image,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  href: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-forestLine/60 bg-forestRaised transition hover:border-plonkYellow/60"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forestDeep via-forestDeep/40 to-transparent" />
      </div>
      <div className="p-8">
        <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-display text-3xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/70">{blurb}</p>
        <span className="mt-6 inline-block text-sm font-semibold uppercase tracking-wider text-cream group-hover:text-plonkYellow">
          Find out more →
        </span>
      </div>
    </Link>
  );
}
