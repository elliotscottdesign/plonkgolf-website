import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EventsScroller from "@/components/EventsScroller";
import Reveal from "@/components/Reveal";

const EVENT_POSTERS = [
  { src: "/hackney/events/Happy_Hour.jpg", alt: "Happy Hour at No Dice" },
  { src: "/hackney/events/No_Dice_Mondays.jpg", alt: "No Dice Mondays" },
  { src: "/hackney/events/Burger_Deal.jpg", alt: "Burger deal at Snack Bar" },
  { src: "/hackney/events/Fun_of_the_Fair.jpg", alt: "Fun of the Fair" },
  { src: "/hackney/events/Cue.jpg", alt: "Cue — pool night" },
  { src: "/hackney/events/Martini_Fries.jpg", alt: "Martini & Fries — every Thursday at No Dice" },
  { src: "/hackney/events/Rolling_Bones.jpg", alt: "Rolling Bones" },
  { src: "/hackney/events/Fun_Club.jpg", alt: "Fun Club" },
  { src: "/hackney/events/Pingers.jpg", alt: "Pingers — ping pong night" },
];

export const metadata: Metadata = {
  title: "Plonk Hackney — Crazy Golf in East London",
  description:
    "Polynesian-themed crazy golf in Hackney, a short walk from Broadway Market. Retro arcade, pool tables, craft cocktails, tacos and a beer garden.",
};

export default function HackneyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Outdoors & covered"
        title="Plonk Hackney at No Dice Games Bar"
        intro="Our perfectly positioned games bar and golf spot is just a short walk from Broadway Market and looks across London Fields."
        image={[
          "/hackney/course/Course_1.jpg",
          "/hackney/garden/Garden_1.jpg",
          "/hackney/course/Course_3.jpg",
          "/hackney/pool/Pool_1.jpg",
          "/hackney/drinks/Drinks_3.jpg",
          "/hackney/games/Games_2.jpg",
          "/hackney/venue/Interior_2.jpg",
          "/hackney/course/Course_5.jpg",
        ]}
      />

      {/* Polynesian intro (forest → plum) */}
      <section className="tint-forest-to-plum relative overflow-hidden px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                We've glown up
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                A Polynesian putting paradise
              </h2>
              <p className="mt-6 text-base leading-relaxed text-cream/80 sm:text-lg">
                Our Hackney course has been rebuilt — bigger, brighter and
                bolder than ever. Volcano canyons, a tiki forest, golf gods to
                appease, a stone circle to navigate and octopuses to dodge
                under the sea — all now fully covered and out of the rain.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/book/hackney"
                  className="inline-block rounded-full bg-plonkPink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-plonkPink/20 transition hover:bg-plonkPink/90"
                >
                  Book Hackney
                </Link>
                <Link
                  href="/private-hire"
                  className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-cream/80 transition hover:text-cream"
                >
                  Private hire →
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-plumDeep">
              <Image
                src="/hackney/course/Course_3.jpg"
                alt="Polynesian course detail"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* More than golf (stays in plum) */}
      <section className="tint-plum relative overflow-hidden px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              No Dice Games Bar
            </p>
            <h2 className="mt-6 text-center font-display text-4xl sm:text-5xl">
              More than just golf
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              image="/hackney/pool/Pool_2.jpg"
              title="Pool tables"
              body="Two 7ft American pool tables, £5 for 30 minutes. Perfect rematch if you don't fare so well on the course. Over-16s only."
            />
            <FeatureCard
              image="/hackney/games/Games_2.jpg"
              title="Retro arcade"
              body="Pinball, retro multi-game cabinets, shoot-'em-ups, skee-ball and foosball. Hit 270 on the skee-ball and the cocktail's on us."
            />
            <FeatureCard
              image="/hackney/drinks/Drinks_3.jpg"
              title="No Dice Bar"
              body="Fully loaded bar stocked with draught beers, craft cans, speciality ciders, house and classic cocktails, natural wines and a wide range of soft drinks."
            />
            <FeatureCard
              image="/hackney/garden/Garden_2.jpg"
              title="Beer garden"
              body="When the sun's out — kick back with top-of-the-line ping pong tables to keep the competition going outside."
            />
            <FeatureCard
              image="/hackney/snack_bar/Snack_bar_1.jpg"
              title="Snack Bar"
              body="Smash burgers, BBQ chicken, loaded chips. BBQ meat supplied by Smokoloko of Spitalfields."
              href="/snack-bar"
              hrefLabel="See the menu"
              external
            />
            <FeatureCard
              image="/hackney/games/Games_6.jpg"
              title="Doubles pool tournament"
              body="2nd and 4th Wednesday of the month. £200+ in bar tabs, medals, beer and Tees. Eight slots — always sells out."
            />
          </div>
        </div>
      </section>

      <EventsScroller
        heading="Events at No Dice"
        intro="DJs, pool tournaments, parties, pop-ups — what's on at the games bar."
        posters={EVENT_POSTERS}
        tint="tint-plum-island-ember"
      />

      {/* Find us (plum → forest) */}
      <section className="tint-plum-to-forest-deep px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl">Find us</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-plumLine/60 bg-plumRaised p-7">
                <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                  Address
                </p>
                <address className="mt-3 not-italic text-base leading-relaxed text-cream/90">
                  Arch 407, Mentmore Terrace<br />
                  London E8 3PP<br />
                  <span className="text-cream/60">Main entrance on Parkside</span>
                </address>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-plumLine/60 bg-plumRaised p-7">
                <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                  Getting here
                </p>
                <ul className="mt-3 space-y-2 text-sm text-cream/80">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-plonkYellow" />
                    2 mins from London Fields Overground
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-plonkYellow" />
                    5 mins from Broadway Market
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-plonkYellow" />
                    10 mins from Hackney Central Overground
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  image,
  title,
  body,
  href,
  hrefLabel,
  external,
}: {
  image: string;
  title: string;
  body: string;
  href?: string;
  hrefLabel?: string;
  external?: boolean;
}) {
  const inner = (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-plumLine/50 bg-plumRaised transition hover:border-plonkYellow/40">
      <div className="relative aspect-[5/3] overflow-hidden bg-plumDeep">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-contain transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/75">{body}</p>
        {href && (
          <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-plonkYellow transition group-hover:text-cream">
            {hrefLabel ?? "Find out more"} →
          </span>
        )}
      </div>
    </article>
  );

  if (!href) return <Reveal>{inner}</Reveal>;

  return (
    <Reveal>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-plonkYellow/60"
      >
        {inner}
      </a>
    </Reveal>
  );
}
