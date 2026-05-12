"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV: { label: string; href: string }[] = [
  { label: "Hackney", href: "/venue/hackney" },
  { label: "Borough", href: "/venue/borough-market" },
  { label: "Private hire", href: "/private-hire" },
  { label: "Vouchers", href: "/vouchers" },
  { label: "FAQs", href: "/faqs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="flex w-full items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center" aria-label="Plonk Golf — home">
          <Image
            src="/images/plonk-logo.png"
            alt="Plonk Golf"
            width={140}
            height={56}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-semibold uppercase tracking-wider text-cream/75 transition hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="rounded-full bg-plonkPink px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
          >
            Book Now
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/book"
            className="rounded-full bg-plonkPink px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
          >
            Book Now
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="p-2 text-cream"
            onClick={() => setOpen((v) => !v)}
          >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-cream/10 bg-black px-6 py-5 lg:hidden">
          <ul className="flex flex-col gap-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium uppercase tracking-wider text-cream/85"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-full bg-plonkPink px-5 py-2 text-sm font-bold uppercase tracking-wider text-white"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
