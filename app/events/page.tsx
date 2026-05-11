import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Events — Plonk Golf",
  description:
    "Boozy Ballzy Brunch, pool tournaments, chess & jazz, ping pong nights and queer pool socials — recurring events at Plonk Hackney and Borough Market.",
};

type Event = {
  day: string;
  title: string;
  venue?: string;
  body: string;
};

const HEADLINE: Event = {
  day: "Every Saturday",
  title: "Boozy Ballzy Brunch",
  venue: "Hackney",
  body:
    "Join us for the ultimate bottomless brunch experience. Epic games, unlimited drinks, delicious food, and endless fun.",
};

const EVENTS: Event[] = [
  {
    day: "1st Tuesday of the month",
    title: "Queer Pool Social",
    venue: "Hackney",
    body:
      "Ladies and Queer Pool Social — pool games, prizes, more pool, more prizes. Free entry, just come along.",
  },
  {
    day: "1st & 3rd Wednesdays",
    title: "Singles Pool Tournament",
    venue: "Hackney",
    body:
      "16 players go head-to-head across rounds then a knockout. £5 per player. Always sells out.",
  },
  {
    day: "2nd & 4th Wednesdays",
    title: "Doubles Pool Tournament",
    venue: "Hackney",
    body:
      "8 teams battle across rounds of pool then a knockout. £10 team entry. Over £200 in bar tabs, medals, beer cases and Tees up for grabs.",
  },
  {
    day: "3rd Wednesday of the month",
    title: "Shoreditch Doubles Pool Tournament",
    venue: "Borough Market",
    body:
      "Riotous doubles night under London Bridge. Over £200 in prizes — only 8 slots, always sells out.",
  },
  {
    day: "First Sunday of the month",
    title: "Chess & Jazz",
    venue: "Hackney",
    body:
      "From 7pm — chess and jazz. Bring your own board or use ours. DJ spinning records, social tournament with prizes depending on numbers.",
  },
  {
    day: "Last Sunday of the month",
    title: "Ping Pong Tournament",
    venue: "Hackney",
    body:
      "Heart-racing, ball-chasing evening of ping pong. Teams of two, one player up at a time, first to 11. Rounds then nail-biting knockouts. Bar tab prizes.",
  },
];

export default function EventsPage() {
  return (
    <main>
      <PageHero
        eyebrow="What's on"
        title="Plonk Events"
        intro="Recurring nights across both venues — pool tournaments, queer pool socials, chess & jazz, ping pong, and our headline Boozy Ballzy Brunch."
        image="/images/gallery08.jpg"
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <article className="overflow-hidden rounded-3xl border border-plonkPink/40 bg-gradient-to-br from-plonkPink/15 to-ink p-8 md:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-plonkPink">
            Headline event
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            {HEADLINE.title}
          </h2>
          <p className="mt-1 text-sm uppercase tracking-wider text-cream/60">
            {HEADLINE.day} · {HEADLINE.venue}
          </p>
          <p className="mt-4 text-base leading-relaxed text-cream/85">
            {HEADLINE.body}
          </p>
        </article>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {EVENTS.map((e) => (
            <article
              key={e.title}
              className="rounded-2xl border border-cream/10 bg-ink/40 p-6"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
                {e.day}
                {e.venue ? ` · ${e.venue}` : ""}
              </p>
              <h3 className="mt-2 font-display text-xl">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                {e.body}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-cream/60">
          Bookable events will appear in the new booking system as it rolls
          out. Meanwhile,{" "}
          <a href="mailto:info@plonkgolf.co.uk" className="underline text-cream">
            email the team
          </a>{" "}
          to reserve a slot.
        </p>
      </section>
    </main>
  );
}
