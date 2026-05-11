import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plonk Golf — Crazy Golf in London",
  description:
    "Plonk Crazy Golf — the wackiest mini golf courses and coolest arcade and games bars across London. Hackney & Borough Market.",
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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
