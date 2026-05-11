import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions — Plonk Golf",
};

export default function TermsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        image="/images/gallery09.jpg"
      />
      <article className="mx-auto max-w-3xl px-6 py-16 text-sm leading-relaxed text-cream/80">
        <p>
          The full Plonk Golf terms & conditions are being updated alongside
          the new booking system. For booking-specific questions in the
          meantime, please email{" "}
          <a href="mailto:info@plonkgolf.co.uk" className="underline">
            info@plonkgolf.co.uk
          </a>
          .
        </p>
      </article>
    </main>
  );
}
