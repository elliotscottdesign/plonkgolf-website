import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import NewsletterPopup from "@/components/NewsletterPopup";

export const metadata: Metadata = {
  title: "Plonk Golf — Crazy Golf Creations Across the Capital",
  description:
    "Plonk Crazy Golf — two original 9-hole courses in London. Hackney and Borough Market. Cocktails, food, arcade and games.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <CookieConsent />
        <NewsletterPopup />
      </body>
    </html>
  );
}
