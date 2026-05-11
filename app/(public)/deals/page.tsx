import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Deals — Plonk Golf",
  description:
    "Midweek deals on games, drinks and food at Plonk Hackney and Borough Market — 2-for-1 Mondays, £10 game-and-drink Tuesdays, plus 10% off for students and hospitality workers.",
};

type Deal = {
  day: string;
  title: string;
  venue?: string;
  body: string;
};

const DEALS: Deal[] = [
  {
    day: "Mondays — All day",
    title: "2-for-1 on Games",
    venue: "Hackney",
    body:
      "2-for-1 on arcade tokens, games, pool and golf. For online sales, buy one round of golf or tokens for two players.",
  },
  {
    day: "Tuesdays — All day",
    title: "Game & Drink — £10",
    venue: "Hackney",
    body:
      "A round of golf, three arcade tokens and a house drink — all for £10.",
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
        eyebrow="Save on midweek"
        title="Plonk Deals"
        intro="Off-peak deals on games, drinks and food across our venues. Some offers vary by site and opening times — you're always in for a treat."
        image="/images/gallery07.jpg"
      />

      <section className="tint-forest-to-plum border-t border-forestLine/40">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {DEALS.map((d) => (
            <article
              key={d.title}
              className="rounded-2xl border border-plumLine/60 bg-plumRaised p-6"
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

        <div className="mt-16 rounded-2xl border border-plumLine/60 bg-plumRaised p-8 text-center">
          <p className="text-base text-cream/80">
            Looking for tournaments, brunches, chess & jazz, ping pong nights?
          </p>
          <a
            href="/events"
            className="mt-3 inline-block text-sm font-semibold uppercase tracking-wider text-plonkYellow hover:underline"
          >
            See what's on →
          </a>
        </div>
      </div>
      </section>
    </main>
  );
}
