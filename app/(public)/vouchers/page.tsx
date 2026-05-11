import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Vouchers — Plonk Golf",
  description:
    "Give the gift of golf. Plonk gift vouchers are valid for 12 months and redeemable against any ticket at any of our venues.",
};

const PERKS = [
  {
    title: "Valid for 12 months",
    body: "Every voucher is valid for a full year from the date of purchase — plenty of time to find a date that works.",
  },
  {
    title: "Use across all venues",
    body: "Redeemable against any ticket at any of our venues — Hackney and Borough Market.",
  },
  {
    title: "Spend at your own pace",
    body: "Redeemable up to the full value — no need to spend it all at once.",
  },
];

export default function VouchersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Gifts & vouchers"
        title="The Gift of Golf"
        intro="Looking for an unusual gift for a friend or loved one? Forgot someone's birthday? We've got you covered."
        image="/borough/drinks/Cocktail_1.jpg"
      />

      <section className="tint-forest-to-forestDeep mx-auto max-w-none px-6 py-20 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="text-base leading-relaxed text-cream/80 sm:text-lg">
          All of our vouchers are valid for twelve months from the date of
          purchase, and redeemable against any ticket at any of our venues.
          They're also redeemable up to their full value, so no need to spend
          them all at once.
        </p>

        <Link
          href="/#venues"
          className="mt-8 inline-block rounded-full bg-plonkPink px-10 py-4 text-base font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
        >
          Buy a Voucher
        </Link>
        <p className="mt-3 text-xs text-cream/50">
          Vouchers shop coming with the new booking system — meanwhile,{" "}
          <a href="mailto:info@plonkgolf.co.uk" className="underline">
            email us
          </a>{" "}
          to arrange one.
        </p>
      </div>
      </section>

      <section className="tint-forestDeep-to-forest">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-8 md:grid-cols-3">
            {PERKS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-forestLine/60 bg-forestRaised p-6"
              >
                <h3 className="font-display text-xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
