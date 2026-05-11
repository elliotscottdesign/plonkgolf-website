import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Events — Plonk Golf",
  description:
    "Recurring nights run by our partner venues — Plonk Hackney at No Dice Bar, and Plonk Borough. Boozy brunches, pool tournaments, chess & jazz, ping pong nights.",
};

type Event = {
  day: string;
  title: string;
  body: string;
  featured?: boolean;
};

const HACKNEY_EVENTS: Event[] = [
  {
    day: "Every Saturday",
    title: "Boozy Ballzy Brunch",
    body:
      "Join us for the ultimate bottomless brunch experience. Epic games, unlimited drinks, delicious food, and endless fun.",
    featured: true,
  },
  {
    day: "1st Tuesday of the month",
    title: "Queer Pool Social",
    body:
      "Ladies and Queer Pool Social — pool games, prizes, more pool, more prizes. Free entry, just come along.",
  },
  {
    day: "1st & 3rd Wednesdays",
    title: "Singles Pool Tournament",
    body:
      "16 players go head-to-head across rounds then a knockout. £5 per player. Always sells out.",
  },
  {
    day: "2nd & 4th Wednesdays",
    title: "Doubles Pool Tournament",
    body:
      "8 teams battle across rounds of pool then a knockout. £10 team entry. Over £200 in bar tabs, medals, beer cases and Tees up for grabs.",
  },
  {
    day: "First Sunday of the month",
    title: "Chess & Jazz",
    body:
      "From 7pm — chess and jazz. Bring your own board or use ours. DJ spinning records, social tournament with prizes depending on numbers.",
  },
  {
    day: "Last Sunday of the month",
    title: "Ping Pong Tournament",
    body:
      "Heart-racing, ball-chasing evening of ping pong. Teams of two, one player up at a time, first to 11. Rounds then nail-biting knockouts. Bar tab prizes.",
  },
];

const BOROUGH_EVENTS: Event[] = [
  {
    day: "3rd Wednesday of the month",
    title: "Shoreditch Doubles Pool Tournament",
    body:
      "Riotous doubles night under London Bridge. Over £200 in prizes — only 8 slots, always sells out.",
  },
];

export default function EventsPage() {
  return (
    <main>
      <PageHero
        eyebrow="What's on"
        title="Plonk Events"
        intro="Events run by our partner venues — Plonk Hackney at No Dice Bar, and Plonk Borough."
        image="/images/gallery08.jpg"
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <VenueColumn
            name="Plonk Hackney at No Dice Bar"
            events={HACKNEY_EVENTS}
          />
          <VenueColumn name="Plonk Borough" events={BOROUGH_EVENTS} />
        </div>

        <p className="mt-16 text-center text-sm text-cream/60">
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

function VenueColumn({ name, events }: { name: string; events: Event[] }) {
  return (
    <div>
      <div className="border-b border-cream/15 pb-3">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-plonkYellow">
          Venue
        </p>
        <h2 className="mt-1 font-display text-2xl sm:text-3xl">{name}</h2>
      </div>

      <div className="mt-6 space-y-4">
        {events.map((e) => (
          <article
            key={e.title}
            className={`rounded-2xl p-6 ${
              e.featured
                ? "border border-plonkPink/40 bg-gradient-to-br from-plonkPink/15 to-ink"
                : "border border-cream/10 bg-ink/40"
            }`}
          >
            {e.featured && (
              <p className="text-xs font-bold uppercase tracking-widest text-plonkPink">
                Headline event
              </p>
            )}
            <h3 className={`${e.featured ? "mt-1" : ""} font-display text-xl`}>
              {e.title}
            </h3>
            <p className="mt-1 text-sm uppercase tracking-wider text-cream/60">
              {e.day}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              {e.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
