import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "FAQs — Plonk Golf",
  description: "Booking, group sizes, walk-ins, accessibility — answers to the most common Plonk Golf questions.",
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I make a booking?",
    a: "Select the venue, choose the date you'd like to visit, then pick an available start time. Choose the number of tickets and head to checkout. Payment is taken securely online and you'll get a confirmation email.",
  },
  {
    q: "How do I make a larger group booking?",
    a: (
      <>
        We limit the number of tickets in each 5-minute slot to prevent
        overcrowding and ensure everyone has a great time on the greens. For
        7–12 people, book tickets in two consecutive slots and our staff will
        get you playing together. For 13+ people, email{" "}
        <a href="mailto:info@plonkgolf.co.uk" className="underline">
          info@plonkgolf.co.uk
        </a>{" "}
        and our bookings team will arrange it.
      </>
    ),
  },
  {
    q: "I can only see one ticket available for the time I'd like — why?",
    a: "We sell a fixed number of tickets per time slot to prevent overcrowding. If you can only see one ticket available, it's because the others have already been booked by other customers.",
  },
  {
    q: "I'm running late for my booking — will I still be able to play?",
    a: "We'll do our best to accommodate you. Ten or fifteen minutes is normally no problem. If you'll be significantly later we'll do our best to fit you in around other bookings — no guarantees, especially on Saturdays when we're very busy, but it'll usually be fine.",
  },
  {
    q: "I want to book a party",
    a: (
      <>
        For groups of 12+ email{" "}
        <a href="mailto:info@plonkgolf.co.uk" className="underline">
          info@plonkgolf.co.uk
        </a>{" "}
        or see our{" "}
        <a href="/private-hire" className="underline">
          Private Hire page
        </a>{" "}
        for full venue takeovers. We offer packages tailored to each venue.
      </>
    ),
  },
  {
    q: "Fever, Time Out and other partner tickets",
    a: (
      <>
        Once you've purchased or received a voucher from one of these
        vendors, email{" "}
        <a href="mailto:info@plonkgolf.co.uk" className="underline">
          info@plonkgolf.co.uk
        </a>{" "}
        with your code and a member of our team will book you an available
        slot.
      </>
    ),
  },
  {
    q: "Do I need a printout of my ticket?",
    a: "No — you're welcome to print it but there's no need. Just show your ticket to our staff on a mobile device.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Yes — walk in any time, but pre-booked ticket holders always receive priority. On Saturdays we're often fully booked, so we highly recommend booking ahead.",
  },
  {
    q: "What if more players want to join my group?",
    a: "Outside of peak times this is normally fine. We'll always do our best to reshuffle and get everyone playing together — there may be a short delay if we're busy. Easiest is to book more tickets in advance whenever possible.",
  },
];

export default function FAQsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Help & info"
        title="Frequently Asked Questions"
        intro="Booking, group sizes, walk-ins, accessibility — answers to the things we get asked most."
        image="/images/gallery03.jpg"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <ul className="space-y-4">
          {FAQS.map((item) => (
            <li
              key={item.q}
              className="rounded-2xl border border-cream/10 bg-ink/40"
            >
              <details className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-display text-lg sm:text-xl">{item.q}</span>
                  <span className="text-plonkYellow transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <div className="mt-4 text-sm leading-relaxed text-cream/80">
                  {item.a}
                </div>
              </details>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-cream/60">
          Got a question we haven't answered?{" "}
          <a href="mailto:info@plonkgolf.co.uk" className="underline text-cream">
            Email the team
          </a>
          .
        </p>
      </section>
    </main>
  );
}
