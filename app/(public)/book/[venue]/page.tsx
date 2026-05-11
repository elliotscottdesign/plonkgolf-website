import { Suspense } from "react";
import BookingFlow from "./BookingFlow";
import { TICKETS, ADDONS, VENUES } from "@/lib/mockData";

export function generateStaticParams() {
  return [{ venue: "hackney" }, { venue: "borough" }];
}

export function generateMetadata({ params }: { params: { venue: string } }) {
  const v = VENUES.find((x) => x.id === params.venue);
  return {
    title: v ? `Book ${v.name}` : "Book Plonk",
    description: "Pick a date, time and party size.",
  };
}

export default function VenueBookingPage({
  params,
}: {
  params: { venue: string };
}) {
  const venue = VENUES.find((v) => v.id === params.venue);
  if (!venue) {
    return (
      <main className="min-h-screen px-6 py-20 text-center">
        <h1 className="font-display text-3xl">Venue not found</h1>
      </main>
    );
  }

  // Only golf tickets are bookable through the main flow.
  // Pool sits in the admin but isn't offered here yet.
  const tickets = TICKETS.filter(
    (t) => t.venueId === venue.id && t.active && t.category === "golf",
  ).sort((a, b) => a.sortOrder - b.sortOrder);
  const addons = ADDONS.filter(
    (a) => (a.venueId === venue.id || a.venueId === "all") && a.active,
  );

  return (
    <Suspense fallback={null}>
      <BookingFlow venue={venue} tickets={tickets} addons={addons} />
    </Suspense>
  );
}
