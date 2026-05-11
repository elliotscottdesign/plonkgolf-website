"use client";

import Link from "next/link";

const SOCIALS: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/plonkgolf/" },
  { label: "Facebook", href: "https://www.facebook.com/pages/PLONK-Golf/749762088452016" },
  { label: "Twitter", href: "https://twitter.com/plonkgolf" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCrMFq-Wzdk1ry81KTp0HPyw" },
];

export default function Footer() {
  return (
    <footer className="border-t border-forestLine/40 bg-forestDeep">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl">Plonk Golf</h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">
            London's Original Crazy Golf and Games Bars. Accept no imitators.
          </p>
          <p className="mt-4 text-sm text-cream/70">
            <a href="mailto:info@plonkgolf.co.uk" className="underline-offset-4 hover:text-cream hover:underline">
              info@plonkgolf.co.uk
            </a>
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
            Hackney
          </h4>
          <address className="mt-3 not-italic text-sm leading-relaxed text-cream/65">
            Arch 407, Mentmore Terrace<br />
            London E8 3PP<br />
            <span className="text-cream/45">Main entrance on Parkside</span>
          </address>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
            Borough Market
          </h4>
          <address className="mt-3 not-italic text-sm leading-relaxed text-cream/65">
            Arches B, C, D & E Montague Close<br />
            Off Green Dragon Court<br />
            London SE1 9DA
          </address>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
            Follow
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 transition hover:text-cream"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-forestLine/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Plonk Golf Ltd. All rights reserved.</span>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="hover:text-cream">Privacy</Link>
            <Link href="/terms" className="hover:text-cream">Terms</Link>
            <Link href="/contact" className="hover:text-cream">Contact</Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("plonk:cookies:open"))}
              className="hover:text-cream"
            >
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
