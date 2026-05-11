import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Deals & Events — Plonk Golf",
  description:
    "Boozy Ballzy Brunch, Monday 2-for-1 games, Tuesday game & drink, Wednesday pool tournaments, ping pong, chess & jazz. Midweek and off-peak deals at Plonk.",
};

type Deal = {
  day: string;
  title: string;
  venue?: string;
  body: string;
  highlight?: string;
};

const HEADLINE: Deal = {
  day: "Every Saturday",
  title: "Boozy Ballzy Brunch",
  venue: "Hackney",
  body:
    "Join us for the ultimate bottomless brunch experience. Epic games, unlimited drinks, delicious food, and endless fun.",
  highlight: "Headline",
};

const DEALS: Deal[] = [
  {
    day: "Mondays",
    title: "2-for-1 on Games — All Day",
    venue: "Hackney",
    body:
      "2-for-1 on arcade tokens, games, pool and golf. For online sales, buy one round of golf / tokens for two players.",
  },
  {
    day: "Tuesdays",
    title: "Game & Drink — All Day",
    venue: "Hackney",
    body:
      "£10 — a round of golf, three arcade tokens and a house drink.",
  },
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
  {
    day: "Always on",
    title: "10% Off — Students & Hospitality Workers",
    body:
      "Use across different items at different venues. Cannot be used in conjunction with other offers or with food from Taco Mates at Hackney.",
  },
];

export default function DealsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Events & Deals"
        title="Midweek Plonkings"
        intro="Every week across our venues we run events and off-peak deals on games, drinks and food. Some offers vary by site and opening times — you're always in for a treat."
        image="/images/gallery08.jpg"
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        {/* Headline brunch */}
        <article className="overflow-hidden rounded-3xl border border-plonkPink/40 bg-gradient-to-br from-plonkPink/15 to-ink p-8 md:p-10">
          {HEADLINE.highlight && (
            <p className="text-xs font-bold uppercase tracking-widest text-plonkPink">
              {HEADLINE.highlight}
            </p>
          )}
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

        {/* Grid of deals */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {DEALS.map((d) => (
            <article
              key={d.title}
              className="rounded-2xl border border-cream/10 bg-ink/40 p-6"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
                {d.day}
                {d.venue ? ` · ${d.venue}` : ""}
              </p>
              <h3 className="mt-2 font-display text-xl">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                {d.body}
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
