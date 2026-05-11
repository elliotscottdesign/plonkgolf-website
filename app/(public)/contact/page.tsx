import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact — Plonk Golf",
  description:
    "Get in touch with Plonk Golf. Group bookings, partnerships, venue ideas — drop us a line at info@plonkgolf.co.uk.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Get in touch"
        title="Say Hello"
        image="/images/gallery07.jpg"
      />

      <section className="tint-forest-to-plum border-t border-forestLine/40">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-base leading-relaxed text-cream/85">
          For group bookings, partnership enquiries or anything else, drop us
          a line — we read every message.
        </p>

        <div className="mt-10 rounded-2xl border border-plumLine/60 bg-plumRaised p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
            Email
          </p>
          <a
            href="mailto:info@plonkgolf.co.uk"
            className="mt-2 block font-display text-2xl text-cream hover:underline sm:text-3xl"
          >
            info@plonkgolf.co.uk
          </a>
        </div>

        <p className="mt-10 text-base leading-relaxed text-cream/80">
          We're always looking for new venues to work with — if you have a
          space, an idea, or just want to chat about a Plonk course in your
          location, get in touch.
        </p>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-widest text-plonkYellow">
            Follow Plonk
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <a
                href="https://www.instagram.com/plonkgolf/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-cream"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/pages/PLONK-Golf/749762088452016"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-cream"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/plonkgolf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-cream"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UCrMFq-Wzdk1ry81KTp0HPyw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 hover:text-cream"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      </section>
    </main>
  );
}
