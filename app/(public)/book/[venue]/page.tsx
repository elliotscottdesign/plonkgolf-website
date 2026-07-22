import { Suspense } from "react";
import CatalogueLoader from "./CatalogueLoader";

// Single-venue relaunch (2026-07-22). Plonk Borough closed — /book/borough
// no longer statically generated. When Borough reopens, add `{ venue: "borough" }`
// to the array below and restore the "borough" entry in VENUE_NAMES.
export function generateStaticParams() {
  return [{ venue: "hackney" }];
}

const VENUE_NAMES: Record<string, string> = {
  hackney: "Plonk Hackney",
};

export function generateMetadata({ params }: { params: { venue: string } }) {
  const name = VENUE_NAMES[params.venue];
  return {
    title: name ? `Book ${name}` : "Book Plonk",
    description: "Pick a date, time and party size.",
  };
}

export default function VenueBookingPage({
  params,
}: {
  params: { venue: string };
}) {
  return (
    <Suspense fallback={null}>
      <CatalogueLoader venueSlug={params.venue} />
    </Suspense>
  );
}
