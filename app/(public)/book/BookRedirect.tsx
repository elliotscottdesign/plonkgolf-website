"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Client-side redirect + graceful fallback for /book → /book/hackney.
// - meta refresh in <head> catches no-JS browsers and pre-hydration renders
// - router.replace catches JS users cleanly (no history entry)
// - visible link is the fallback for anyone who somehow ends up parked here
//   (script blockers, ad-block over-blocking, etc.)

export default function BookRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/book/hackney");
  }, [router]);

  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/book/hackney" />
      <main className="bed-booking px-6 py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-plonkYellow">
          Booking
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          Taking you to the booking page…
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-cream/70">
          If nothing happens, tap below.
        </p>
        <Link
          href="/book/hackney"
          className="mt-8 inline-block rounded-full bg-plonkPink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white"
        >
          Book Plonk Hackney
        </Link>
      </main>
    </>
  );
}
