import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";

const BOROUGH_GALLERY = [
  { src: "/borough/course/Course_2.jpg", alt: "Plonk Borough course" },
  { src: "/borough/course/Course_3.jpg", alt: "Borough London-themed course" },
  { src: "/borough/venue/Venue_1.jpg", alt: "Borough arches interior" },
  { src: "/borough/drinks/Cocktail_1.jpg", alt: "Borough cocktail" },
  { src: "/borough/course/Course_4.jpg", alt: "Borough course detail" },
  { src: "/borough/games/Games_3.jpg", alt: "Borough arcade and pool" },
  { src: "/borough/drinks/Beer_1.jpg", alt: "Borough craft beer" },
  { src: "/borough/course/Course_5.jpg", alt: "Borough course" },
  { src: "/borough/drinks/Cocktail_4.jpg", alt: "Borough cocktail trio" },
  { src: "/borough/games/Games_4.jpg", alt: "Borough games" },
  { src: "/borough/drinks/Cocktail_5.jpg", alt: "Borough drinks" },
  { src: "/borough/games/Games_6.jpg", alt: "Borough arcade detail" },
];

export const metadata: Metadata = {
  title: "Plonk Borough Market — Crazy Golf at London Bridge",
  description:
    "London-themed indoor crazy golf under London Bridge in Borough Market. Phone boxes, the Thames Barrier, the Tower of London — across 4 railway arches.",
};

export default function BoroughMarketPage() {
  return (
    <main>
      <PageHero
        eyebrow="Borough Market · Indoor · 9 holes"
        title="Crazy Golf at London Bridge"
        intro="Tucked into four railway arches under London Bridge. A 360° gallery from London's best street artists, surrounding nine holes of London icons."
        image={[
          "/borough/course/Course_1.jpg",
          "/borough/course/Course_3.jpg",
          "/borough/games/Games_1.jpg",
          "/borough/drinks/Cocktail_1.jpg",
          "/borough/course/Course_4.jpg",
          "/borough/games/Games_3.jpg",
          "/borough/drinks/Beer_1.jpg",
          "/borough/venue/Venue_1.jpg",
        ]}
      />

      {/* London course intro (forest → ember) */}
      <section className="tint-forest-to-ember relative overflow-hidden px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-emberDeep md:order-2">
              <Image
                src="/borough/course/Course_2.jpg"
                alt="Borough London-themed course"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="md:order-1">
              <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                London, in one course
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                All of London, in 9 holes
              </h2>
              <p className="mt-6 text-base leading-relaxed text-cream/80 sm:text-lg">
                Putt past a red phone box ramp, roll around the Thames Barrier,
                hop into the Tower of London, loop the London Eye and stride
                down Tower Bridge — all under London Bridge itself, surrounded
                by murals from the city's best spray-can talent.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/book/borough"
                  className="inline-block rounded-full bg-plonkPink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-plonkPink/20 transition hover:bg-plonkPink/90"
                >
                  Book Borough
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
        </div>
      </section>

      {/* What's under the arches (stays in ember) */}
      <section className="tint-ember relative overflow-hidden px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
              Across four arches
            </p>
            <h2 className="mt-6 text-center font-display text-4xl sm:text-5xl">
              What's under the arches
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              image="/borough/games/Games_1.jpg"
              title="Retro arcade"
              body="Shooters, button-bashers, foosball, ping pong, plus one of London's biggest pinball collections. Buy tokens at the bar — no booking needed."
            />
            <FeatureCard
              image="/borough/games/Games_2.jpg"
              title="Pool tables"
              body="Two brand-new British 7ft pool tables, bookable at £5 for 30 minutes. Please note: under-18s aren't permitted to play."
            />
            <FeatureCard
              image="/borough/drinks/Cocktail_3.jpg"
              title="Cocktails & craft"
              body="Fully licensed bar — signature cocktails, classics, wines, cold craft beers and non-alcoholic drinks. Open till 11pm: drink while you putt, or push on into the night."
            />
            <FeatureCard
              image="/borough/drinks/Beer_2.png"
              title="Local beer on tap"
              body="Rotating local kegs alongside our regulars. Whatever's on, it'll be cold and properly poured."
            />
            <FeatureCard
              image="/borough/course/Course_6.jpg"
              title="Murals & street art"
              body="A 360° gallery on the walls, ceiling and floor — painted by some of London's most renowned spray-can talent. The course is the start; the arches are the show."
            />
            <FeatureCard
              image="/borough/games/Games_5.jpg"
              title="Doubles pool tournament"
              body="3rd Wednesday of the month. £200+ in bar tabs, medals, beer cases and Tees. Eight slots — always sells out."
            />
          </div>
        </div>
      </section>

      <Gallery
        heading="Inside Plonk Borough"
        intro="The London-themed course, the arcade, the bar — all under London Bridge."
        images={BOROUGH_GALLERY}
        tint="tint-ember-island-plum"
      />

      {/* Find us (ember → forest) */}
      <section className="tint-ember-to-forest-deep px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl">Find us</h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-6 rounded-2xl border border-plonkYellow/40 bg-plonkYellow/10 p-5 text-sm leading-relaxed text-plonkYellow">
              <strong className="font-bold">Don't follow the postcode.</strong>{" "}
              We're in the arches under Borough High Street, just off Green
              Dragon Court. Search "Plonk Borough" on Google Maps rather than
              the address.
            </div>
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-emberLine/60 bg-emberRaised p-7">
                <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                  Address
                </p>
                <address className="mt-3 not-italic text-base leading-relaxed text-cream/90">
                  Arches B, C, D & E Montague Close<br />
                  Off Green Dragon Court<br />
                  London SE1 9DA
                </address>
                <p className="mt-3 text-sm text-cream/65">
                  The entrance is in a courtyard just below street level,
                  directly next door to Boro Bistro.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-emberLine/60 bg-emberRaised p-7">
                <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
                  Accessibility
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/80">
                  Plonk Borough is accessible — there are step-free ways down
                  to our courtyard. If you need help finding the easiest
                  route, get in touch before your visit at{" "}
                  <a
                    href="mailto:info@plonkgolf.co.uk"
                    className="underline underline-offset-4 hover:text-cream"
                  >
                    info@plonkgolf.co.uk
                  </a>
                  .
                </p>
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
}: {
  image: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal>
      <article className="group h-full overflow-hidden rounded-2xl border border-emberLine/50 bg-ember transition hover:border-plonkYellow/40">
        <div className="relative aspect-[5/3] overflow-hidden bg-emberDeep">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="font-display text-2xl">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/75">{body}</p>
        </div>
      </article>
    </Reveal>
  );
}
