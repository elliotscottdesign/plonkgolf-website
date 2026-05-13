"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import EventsScroller from "@/components/EventsScroller";
import Reveal from "@/components/Reveal";
import { useContent, useImage } from "@/lib/content";

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

export default function HackneyPage() {
  // ---------- Hero ----------
  const eyebrow = useContent("venue.hackney.eyebrow", "Outdoors & covered");
  const title = useContent(
    "venue.hackney.title",
    "Plonk Hackney at No Dice Games Bar",
  );
  const intro = useContent(
    "venue.hackney.intro",
    "Our perfectly positioned games bar and golf spot is just a short walk from Broadway Market and looks across London Fields.",
  );
  const heroImage = useImage("venue.hackney.hero_image", "");

  // ---------- Polynesian intro section ----------
  const bodyEyebrow = useContent("venue.hackney.body_eyebrow", "We've glown up");
  const bodyHeading = useContent(
    "venue.hackney.body_heading",
    "A Polynesian putting paradise",
  );
  const bodyIntro = useContent(
    "venue.hackney.body_intro",
    "Our Hackney course has been rebuilt — bigger, brighter and bolder than ever. Volcano canyons, a tiki forest, golf gods to appease, a stone circle to navigate and octopuses to dodge under the sea — all now fully covered and out of the rain.",
  );
  const bodyImage = useImage(
    "venue.hackney.body_image",
    "/hackney/course/Course_3.jpg",
  );

  // ---------- More than golf section ----------
  const mtgEyebrow = useContent(
    "venue.hackney.morethan.eyebrow",
    "No Dice Games Bar",
  );
  const mtgHeading = useContent(
    "venue.hackney.morethan.heading",
    "More than just golf",
  );
  const f1Image = useImage("venue.hackney.feature1.image", "/hackney/pool/Pool_2.jpg");
  const f1Title = useContent("venue.hackney.feature1.title", "Pool tables");
  const f1Body = useContent(
    "venue.hackney.feature1.body",
    "Two 7ft American pool tables, £5 for 30 minutes. Perfect rematch if you don't fare so well on the course. Over-16s only.",
  );
  const f2Image = useImage("venue.hackney.feature2.image", "/hackney/games/Games_2.jpg");
  const f2Title = useContent("venue.hackney.feature2.title", "Retro arcade");
  const f2Body = useContent(
    "venue.hackney.feature2.body",
    "Pinball, retro multi-game cabinets, shoot-'em-ups, skee-ball and foosball. Hit 270 on the skee-ball and the cocktail's on us.",
  );
  const f3Image = useImage("venue.hackney.feature3.image", "/hackney/drinks/Drinks_3.jpg");
  const f3Title = useContent("venue.hackney.feature3.title", "No Dice Bar");
  const f3Body = useContent(
    "venue.hackney.feature3.body",
    "Fully loaded bar stocked with draught beers, craft cans, speciality ciders, house and classic cocktails, natural wines and a wide range of soft drinks.",
  );
  const f4Image = useImage("venue.hackney.feature4.image", "/hackney/garden/Garden_2.jpg");
  const f4Title = useContent("venue.hackney.feature4.title", "Beer garden");
  const f4Body = useContent(
    "venue.hackney.feature4.body",
    "When the sun's out — kick back with top-of-the-line ping pong tables to keep the competition going outside.",
  );
  const f5Image = useImage("venue.hackney.feature5.image", "/hackney/snack_bar/Snack_bar_1.jpg");
  const f5Title = useContent("venue.hackney.feature5.title", "Snack Bar");
  const f5Body = useContent(
    "venue.hackney.feature5.body",
    "Smash burgers, BBQ chicken, loaded chips. BBQ meat supplied by Smokoloko of Spitalfields.",
  );
  const f6Image = useImage("venue.hackney.feature6.image", "/hackney/games/Games_6.jpg");
  const f6Title = useContent("venue.hackney.feature6.title", "Doubles pool tournament");
  const f6Body = useContent(
    "venue.hackney.feature6.body",
    "2nd and 4th Wednesday of the month. £200+ in bar tabs, medals, beer and Tees. Eight slots — always sells out.",
  );

  // ---------- Events ----------
  const eventsHeading = useContent(
    "venue.hackney.events.heading",
    "Events at No Dice",
  );
  const eventsIntro = useContent(
    "venue.hackney.events.intro",
    "DJs, pool tournaments, parties, pop-ups — what's on at the games bar.",
  );

  // ---------- Find us ----------
  const findusHeading = useContent("venue.hackney.findus.heading", "Find us");
  const findusAddressLabel = useContent(
    "venue.hackney.findus.address_label",
    "Address",
  );
  const findusAddress = useContent(
    "venue.hackney.findus.address",
    "Arch 407, Mentmore Terrace\nLondon E8 3PP\nMain entrance on Parkside",
  );
  const findusTransportLabel = useContent(
    "venue.hackney.findus.transport_label",
    "Getting here",
  );
  const findusTransport = useContent(
    "venue.hackney.findus.transport",
    "2 mins from London Fields Overground\n5 mins from Broadway Market\n10 mins from Hackney Central Overground",
  );

  const sliderImages = [
    "/hackney/course/Course_1.jpg",
    "/hackney/garden/Garden_1.jpg",
    "/hackney/course/Course_3.jpg",
    "/hackney/pool/Pool_1.jpg",
    "/hackney/drinks/Drinks_3.jpg",
    "/hackney/games/Games_2.jpg",
    "/hackney/venue/Interior_2.jpg",
    "/hackney/course/Course_5.jpg",
  ];

  return (
    <main>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        image={heroImage || sliderImages}
      />

      {/* Polynesian intro */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                {bodyEyebrow}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                {bodyHeading}
              </h2>
              <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-cream/80 sm:text-lg">
                {bodyIntro}
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
                src={bodyImage}
                alt="Polynesian course detail"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* More than golf */}
      <section className="relative overflow-hidden px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              {mtgEyebrow}
            </p>
            <h2 className="mt-6 text-center font-display text-4xl sm:text-5xl">
              {mtgHeading}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard image={f1Image} title={f1Title} body={f1Body} />
            <FeatureCard image={f2Image} title={f2Title} body={f2Body} />
            <FeatureCard image={f3Image} title={f3Title} body={f3Body} />
            <FeatureCard image={f4Image} title={f4Title} body={f4Body} />
            <FeatureCard
              image={f5Image}
              title={f5Title}
              body={f5Body}
              href="/snack-bar"
              hrefLabel="See the menu"
            />
            <FeatureCard image={f6Image} title={f6Title} body={f6Body} />
          </div>
        </div>
      </section>

      <EventsScroller
        heading={eventsHeading}
        intro={eventsIntro}
        posters={EVENT_POSTERS}
        tint=""
      />

      {/* Find us */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl">{findusHeading}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-plumLine/60 bg-plumRaised p-7">
                <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                  {findusAddressLabel}
                </p>
                <address className="mt-3 whitespace-pre-line not-italic text-base leading-relaxed text-cream/90">
                  {findusAddress}
                </address>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-plumLine/60 bg-plumRaised p-7">
                <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                  {findusTransportLabel}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-cream/80">
                  {findusTransport
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((line, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-plonkYellow" />
                        {line}
                      </li>
                    ))}
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
