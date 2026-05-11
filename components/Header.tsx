"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV: { label: string; href: string }[] = [
  { label: "Venues", href: "/#venues" },
  { label: "Private Hire", href: "/private-hire" },
  { label: "Deals", href: "/deals" },
  { label: "Vouchers", href: "/vouchers" },
  { label: "FAQs", href: "/faqs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center" aria-label="Plonk Golf — home">
          <Image
            src="/images/plonk-logo.png"
            alt="Plonk Golf"
            width={140}
            height={56}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wider text-cream/80 transition hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#venues"
            className="rounded-full bg-plonkPink px-5 py-2 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-plonkPink/90"
          >
            Book Now
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden p-2 text-cream"
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

      {open && (
        <nav className="border-t border-cream/10 bg-ink px-6 py-4 md:hidden">
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
                href="/#venues"
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
