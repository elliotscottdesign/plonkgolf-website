import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snack Bar — Plonk Hackney",
  description:
    "Snack Bar at Plonk Hackney — smash burgers, BBQ chicken, loaded chips. BBQ meat and burgers supplied by Smokoloko of Spitalfields.",
};

const MAINS = [
  {
    title: "Smash burger w/ chips",
    price: "12",
    body:
      "8oz homemade patty from olive-fed British wagyu, cheese, crunchy salad, burger sauce, brioche bun.",
  },
  {
    title: "BBQ chicken burger w/ chips",
    price: "12",
    body:
      "6oz chicken thigh marinated for 24 hours and smoked on cherry wood. Cheese, crunchy salad, burger sauce, brioche bun.",
  },
  {
    title: "Loaded chips",
    price: "10",
    body:
      "Choose topping (6oz): BBQ chicken · 12-hour smoked BBQ brisket · garlic shrooms (v). Crossed with mayo & chives.",
  },
];

const SIDES = [
  {
    title: "Green peppers (v)",
    price: "6",
    body: "Like a Padrón pepper — salted in Maldon and fried.",
  },
  {
    title: "Chips (v)",
    price: "5",
    body: "Choose one sauce: mayo · chipotle mayo · burger sauce · ketchup.",
  },
];

const EXTRAS = [
  { title: "Extra meat / shrooms / cheese", price: "4" },
  { title: "Extra sauce", price: "1" },
];

export default function SnackBarMenuPage() {
  return (
    <main className="bed-info">
      {/* HEADER */}
      <header className="relative isolate flex min-h-[40vh] flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hackney/snack_bar/Snack_bar_1.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <p className="text-shadow-hero text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
          Plonk Hackney · Eat
        </p>
        <h1 className="text-shadow-hero mt-3 font-display text-5xl leading-tight sm:text-6xl">
          Snack Bar
        </h1>
        <p className="text-shadow-hero mx-auto mt-5 max-w-xl text-base text-cream sm:text-lg">
          BBQ meat & burgers, supplied by{" "}
          <span className="italic">Smokoloko of Spitalfields</span>.
        </p>
      </header>

      {/* MENU */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          {/* Mains */}
          <MenuSection title="Burgers & loaded chips">
            {MAINS.map((item) => (
              <MenuRow key={item.title} {...item} />
            ))}
          </MenuSection>

          {/* Sides */}
          <MenuSection title="Sides">
            {SIDES.map((item) => (
              <MenuRow key={item.title} {...item} />
            ))}
          </MenuSection>

          {/* Extras */}
          <MenuSection title="Extras">
            <ul className="divide-y divide-forestLine/40 rounded-2xl border border-forestLine/60 bg-forestRaised">
              {EXTRAS.map((e) => (
                <li
                  key={e.title}
                  className="flex items-center justify-between gap-4 px-5 py-3 text-sm"
                >
                  <span className="text-cream/90">{e.title}</span>
                  <span className="font-display text-base text-plonkYellow">
                    £{e.price}
                  </span>
                </li>
              ))}
            </ul>
          </MenuSection>

          {/* Allergies note */}
          <div className="mt-12 rounded-2xl border border-plonkYellow/40 bg-plonkYellow/10 p-5 text-sm leading-relaxed text-plonkYellow">
            <strong className="font-bold">Allergies?</strong> Please let our
            team know when ordering — we'll guide you to safe options.
          </div>

          {/* Back to Hackney */}
          <div className="mt-10 text-center">
            <Link
              href="/venue/hackney"
              className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-cream/80 transition hover:text-cream"
            >
              ← Back to Plonk Hackney
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function MenuSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12 first:mt-0">
      <h2 className="font-display text-2xl text-plonkYellow sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

function MenuRow({
  title,
  price,
  body,
}: {
  title: string;
  price: string;
  body: string;
}) {
  return (
    <article className="rounded-2xl border border-forestLine/60 bg-forestRaised p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl sm:text-2xl">{title}</h3>
        <span className="font-display text-xl text-plonkYellow sm:text-2xl">
          £{price}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-cream/75">{body}</p>
    </article>
  );
}
