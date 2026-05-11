import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";

const BOROUGH_GALLERY = [
  { src: "/images/PLONK-BOROUGH_02_241468_Web_2.jpg", alt: "Plonk Borough course" },
  { src: "/images/PLONK-BOROUGH_02_241533_Web.jpg", alt: "Plonk Borough London course" },
  { src: "/images/PLONK-BOROUGH-AUGUST-230624_web.jpg", alt: "Plonk Borough August" },
  { src: "/images/Plonk_Borough_Arcade_-2_web.jpg", alt: "Borough Market arcade" },
  { src: "/images/PLONK_Shoreditch_0R1A3813_web_adjusted.jpg", alt: "Plonk arches detail" },
  { src: "/images/PLONK_Shoreditch_0R1A3814_web.jpg", alt: "Plonk arches detail" },
  { src: "/images/Shoreditch-Pool-Featured.jpg", alt: "Pool tables under the arches" },
  { src: "/images/Borough_guide_web-copy.jpg", alt: "Borough course guide" },
  { src: "/images/PLONK-COCKTAILS_215298_L_web.jpg", alt: "Plonk cocktails" },
  { src: "/images/PLONK-COCKTAILS_215335_SQ.jpg", alt: "Plonk cocktails" },
  { src: "/images/Margarita.jpg", alt: "Margarita" },
  { src: "/images/bmph.jpg", alt: "Borough Market interior" },
];

export const metadata: Metadata = {
  title: "Plonk Borough Market — Crazy Golf at London Bridge",
  description:
    "London-themed indoor crazy golf under London Bridge in Borough Market. Big red phone boxes, Thames barriers, Tower of London and Tower Bridge — across 4 arches.",
};

export default function BoroughMarketPage() {
  return (
    <main>
      <PageHero
        eyebrow="Borough Market · Indoor · 9 holes"
        title="Crazy Golf at London Bridge"
        intro="Celebrate all things London. A crew of London's most renowned street artists have created a 360° gallery on the walls, ceiling and floors in the arches underneath London Bridge."
        image="/images/borough-hero.jpg"
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:order-2">
            <Image
              src="/images/gallery05.jpg"
              alt="Plonk Borough Market course"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
              Most iconic London course
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              All of London, in one course
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/80">
              Tackle a big red phone box ramp, roll around a Thames Barrier
              wave, jump into the Tower of London, swoosh around the
              Millennium Wheel loop, and skilfully roll down Tower Bridge on
              this unique London crazy golf course. A bar arch serves up top
              cocktails, and a retro arcade arch has pool tables — all right
              underneath London Bridge.
            </p>
            <Link
              href="/book/borough"
              className="mt-8 inline-block rounded-full bg-plonkPink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
            >
              Book Borough Market
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-cream/10 bg-ink/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center font-display text-3xl sm:text-4xl">
            What's under the arches
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="Retro Arcade"
              body="Shooters, button-bashers, foosball, ping pong — plus one of the largest collections of pinball machines in London. Online tickets include tokens. No booking needed: buy tokens at the bar."
            />
            <FeatureCard
              title="Pool Tables"
              body="Two brand-new British 7ft pool tables, bookable online at £5 for 30 minutes. Please note: under 18s not permitted to play."
            />
            <FeatureCard
              title="Cocktails & Crafts"
              body="A fully licensed bar serving signature cocktails, classics, wines, cold craft beers and non-alcoholic drinks. Bar open until 11pm — drink while you putt or button-bash all night."
            />
            <FeatureCard
              title="Doubles Pool Tournament"
              body="3rd Wednesday of every month. Riotous Shoreditch Doubles — over £200 in bar tabs, medals, beer cases and Tees up for grabs. Only 8 slots — always sells out."
            />
          </div>
        </div>
      </section>

      <Gallery
        heading="Inside Plonk Borough"
        intro="The London-themed course, the arcade, the bar — all under London Bridge."
        images={BOROUGH_GALLERY}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-3xl sm:text-4xl">Find us</h2>
        <div className="rounded-2xl border border-plonkYellow/30 bg-plonkYellow/5 p-4 mt-6 text-sm text-plonkYellow">
          <strong>Don't follow the postcode</strong> — follow the directions
          below. We're in the arches under Borough High Street, just off
          Green Dragon Court. Search "Plonk Borough" on Google Maps rather
          than the address.
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-cream/10 bg-ink/40 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
              Address
            </p>
            <address className="mt-3 not-italic text-base leading-relaxed text-cream/85">
              Arches B, C, D & E Montague Close<br />
              Off Green Dragon Court<br />
              London SE1 9DA
            </address>
            <p className="mt-3 text-sm text-cream/60">
              The entrance is in a courtyard just below street level, directly
              next door to Boro Bistro.
            </p>
          </div>
          <div className="rounded-2xl border border-cream/10 bg-ink/40 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
              Accessibility
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              Plonk Borough is accessible. There are step-free ways down to
              our courtyard. If you need help finding the easiest route, get
              in touch ahead of your visit at{" "}
              <a href="mailto:info@plonkgolf.co.uk" className="underline">
                info@plonkgolf.co.uk
              </a>
              .
            </p>
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
