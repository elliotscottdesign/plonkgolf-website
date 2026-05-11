import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy — Plonk Golf",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        image="/hackney/garden/Garden_3.jpg"
      />
      <article className="mx-auto max-w-3xl px-6 py-16 text-sm leading-relaxed text-cream/80">
        <p>
          The full Plonk Golf privacy policy is being updated alongside the
          new booking system. In the meantime, any questions about how we
          handle your data can be sent to{" "}
          <a href="mailto:info@plonkgolf.co.uk" className="underline">
            info@plonkgolf.co.uk
          </a>
          .
        </p>
      </article>
    </main>
  );
}
