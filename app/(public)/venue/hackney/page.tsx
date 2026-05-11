import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";

const HACKNEY_GALLERY = [
  { src: "/images/Plonk_Hackeny_1976_web.jpg", alt: "Plonk Hackney" },
  { src: "/images/Plonk_Hackeny_2788_web.jpg", alt: "Plonk Hackney course" },
  { src: "/images/PLONK-HACKNEY-NOV-220190_web.jpg", alt: "Plonk Hackney evening" },
  { src: "/images/PLONK-HACKNEY-NOV-220217_Web.jpg", alt: "Plonk Hackney bar" },
  { src: "/images/PLONK_LF_AW_OCt_20_web.jpg", alt: "Plonk Hackney autumn" },
  { src: "/images/Plonk_LF_2020_web-145.jpg", alt: "Plonk Hackney games" },
  { src: "/images/Plonk_Hackney_Pool_1_web.jpg", alt: "Hackney pool table" },
  { src: "/images/MPL_294A9392_Web.jpg", alt: "Hackney detail" },
  { src: "/images/MPL_294A9492_Web.jpg", alt: "Hackney detail" },
  { src: "/images/PAH-V2-1-1.jpg", alt: "Plonk Hackney venue" },
  { src: "/images/PAH-V2-3.jpg", alt: "Plonk Hackney venue" },
  { src: "/images/HACKNEY_0R1A9980_web1.jpg", alt: "Hackney scene" },
];

export const metadata: Metadata = {
  title: "Plonk Hackney — Crazy Golf in East London",
  description:
    "Polynesian-themed outdoor crazy golf in Hackney, a short walk from Broadway Market. Retro arcade, pool tables, craft cocktails and tacos.",
};

export default function HackneyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Hackney · Outdoor · 9 holes"
        title="Crazy Golf in Hackney"
        intro="Our perfectly positioned games bar and golf spot is just a short walk from Broadway Market and looks across London Fields."
        image="/images/hackney-hero.jpg"
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
              We've glown up!
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              A Polynesian putt paradise
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/80">
              Our Hackney course has been rebuilt and it's bigger and better
              than ever. With new holes set inside a Polynesian-themed putt
              paradise, this new course is the jewel in our mini golf crown.
              Take on volcano canyon, traverse the tiki forest, make an
              offering to our golf gods, whip around stone circle and dive
              under the sea with octopuses — all now covered and out of the
              rain.
            </p>
            <Link
              href="/#venues"
              className="mt-8 inline-block rounded-full bg-plonkPink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
            >
              Book Hackney
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/gallery01.jpg"
              alt="Plonk Hackney course"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-cream/10 bg-ink/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center font-display text-3xl sm:text-4xl">
            More than just golf
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="Pool Tables"
              body="Two 7ft American pool tables at £5 for 30 minutes. Perfect for a rematch if you don't fare so well on the golf course. Under 16s are not permitted to play."
            />
            <FeatureCard
              title="Retro Arcade"
              body="Pinball machines, retro multi-game cabinets, shoot-'em-ups, skeeball and foosball. Hit 270 on our vintage skeeball machine and we'll get you a free cocktail."
            />
            <FeatureCard
              title="Cocktail Bar"
              body="Our tiki-styled bar has a rotating menu of seasonal cocktails. Two cocktails for £12 every weekday until 7pm. Local craft draughts, wines and mocktails too."
            />
            <FeatureCard
              title="El Caravana Tacos"
              body="Our taco caravan in the beer garden, Tuesday–Saturday. Taco Tuesday: £5 for two tacos all day. Paired perfectly with our cassava fries."
            />
            <FeatureCard
              title="Beer Garden"
              body="When the sun is out, kick back in our beer garden — complete with top-of-the-line ping pong tables to keep the competition going."
            />
            <FeatureCard
              title="Doubles Pool Tournament"
              body="2nd and 4th Wednesday of every month. Over £200 in bar tabs, medals, cases of beer and Tees up for grabs. Only 8 slots — always sells out."
            />
          </div>
        </div>
      </section>

      <Gallery
        heading="Inside Plonk Hackney"
        intro="A look around — Polynesian course, beer garden, pool, arcade and tiki bar."
        images={HACKNEY_GALLERY}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-3xl sm:text-4xl">Find us</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-cream/10 bg-ink/40 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
              Address
            </p>
            <address className="mt-3 not-italic text-base leading-relaxed text-cream/85">
              Arch 407, Mentmore Terrace<br />
              London E8 3PP<br />
              <span className="text-cream/60">Main entrance on Parkside</span>
            </address>
          </div>
          <div className="rounded-2xl border border-cream/10 bg-ink/40 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
              Getting here
            </p>
            <ul className="mt-3 space-y-1 text-sm text-cream/80">
              <li>· 2 mins from London Fields Overground</li>
              <li>· 5 mins from Broadway Market</li>
              <li>· 10 mins from Hackney Central Overground</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-cream/10 bg-ink/40 p-6">
      <h3 className="font-display text-xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-cream/75">{body}</p>
    </div>
  );
}
