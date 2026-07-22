import type { Metadata } from "next";
import BookRedirect from "./BookRedirect";

// 2026-07-22 single-venue relaunch. Plonk Borough is closed, so the
// venue picker (Hackney vs Borough) has been retired — /book now
// bounces straight to /book/hackney. Kept as a real page (not a Next.js
// redirect) because static export doesn't support redirects at build
// time. BookRedirect does the meta refresh + JS push + fallback link.
//
// When Borough reopens, restore the picker: put back the VENUES array
// and the two-card grid that lived here in git history (commit 6858c3d
// or earlier).

export const metadata: Metadata = {
  title: "Book Plonk Hackney",
  description: "Book a tee time at Plonk Hackney — Polynesian-themed mini golf at London Fields.",
};

export default function BookingPickerPage() {
  return <BookRedirect />;
}
