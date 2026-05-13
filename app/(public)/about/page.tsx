"use client";

import Image from "next/image";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import { useContent, useImage, useGallery } from "@/lib/content";

const ABOUT_GALLERY_FALLBACK = [
  { src: "/hackney/course/Course_1.jpg", alt: "Hackney Polynesian course" },
  { src: "/borough/course/Course_1.jpg", alt: "Borough course" },
  { src: "/hackney/garden/Garden_1.jpg", alt: "Hackney beer garden" },
  { src: "/borough/venue/Venue_1.jpg", alt: "Borough arch interior" },
  { src: "/hackney/course/Course_5.jpg", alt: "Hackney course detail" },
  { src: "/borough/course/Course_3.jpg", alt: "Borough London-themed course" },
  { src: "/hackney/pool/Pool_1.jpg", alt: "Hackney pool tables" },
  { src: "/borough/games/Games_1.jpg", alt: "Borough arcade" },
  { src: "/hackney/games/Games_2.jpg", alt: "Hackney arcade" },
  { src: "/borough/drinks/Cocktail_1.jpg", alt: "Borough cocktail" },
  { src: "/hackney/drinks/Drinks_3.jpg", alt: "Hackney drinks" },
  { src: "/borough/course/Course_5.jpg", alt: "Borough course" },
];

const DEFAULTS = {
  hero_image: "/hackney/garden/Garden_2.jpg",
  intro:
    "Founded by a troop of set designers from the film industry, banded together to create the greatest crazy golf courses imaginable and plonk them down around the Capital.",
  body_image1: "/hackney/course/Course_3.jpg",
  body_image2: "/borough/course/Course_4.jpg",
  body_para1:
    "Plonk Crazy Golf was founded by a troop of set designers from the film industry who banded together for a common cause — using their skills to create the greatest crazy golf courses imaginable and plonking them down around the Capital.\n\nIn 2014 we opened our first course in Haggerston, London, built from 100% up-cycled materials rescued from the streets of Hackney. Since that initial success, we've been creating ever more ambitious courses across the UK and Europe.",
  body_heading2: "Totally unique, totally Plonk",
  body_para2:
    "Totally unique and customisable, we work closely with award-winning venues, bars, pubs, and museums to create one-of-a-kind golf-stacle courses tailored to each venue. Outdoors you can find us working with major tourist attractions such as ZSL London Zoo and The Horniman Museum and Gardens, bringing our signature nine-hole courses to award-winning venues. Indoors, we're creating hyper-coloured UV adventures.",
  body_heading3: "Design · Build · Install · Manage",
  body_para3:
    "We design, build, install and manage all of our golf courses ourselves, meaning no two are alike. Each Plonk course offers a completely new experience tailored to match the venue. Big or small, themed or branded, our in-house design team always have their pencils sharpened, ready to design the perfect Plonk course.\n\nSo come on down and join us in one of our putting paradises for a plonking good time!",
  gallery_heading: "A decade of Plonking",
  gallery_intro: "Highlights from courses past and present.",
};

export default function AboutPage() {
  const title = useContent("about.title", "All About Plonk Golf");
  const intro = useContent("about.intro", DEFAULTS.intro);
  const heroImage = useImage("about.hero_image", DEFAULTS.hero_image);
  const optionalBody = useContent("about.body", "");

  const bodyImage1 = useImage("about.body_image1", DEFAULTS.body_image1);
  const bodyImage2 = useImage("about.body_image2", DEFAULTS.body_image2);
  const para1 = useContent("about.body_para1", DEFAULTS.body_para1);
  const heading2 = useContent("about.body_heading2", DEFAULTS.body_heading2);
  const para2 = useContent("about.body_para2", DEFAULTS.body_para2);
  const heading3 = useContent("about.body_heading3", DEFAULTS.body_heading3);
  const para3 = useContent("about.body_para3", DEFAULTS.body_para3);

  const galleryHeading = useContent("about.gallery_heading", DEFAULTS.gallery_heading);
  const galleryIntro = useContent("about.gallery_intro", DEFAULTS.gallery_intro);
  const galleryImages = useGallery("about.gallery", ABOUT_GALLERY_FALLBACK).map(
    (g) => ({ src: g.src, alt: g.alt ?? "" }),
  );

  return (
    <main>
      <PageHero
        eyebrow="About Plonk"
        title={title}
        intro={intro}
        image={heroImage}
      />

      {/* Optional admin HTML body — sits ABOVE the structured article
          when set, so it doesn't override the layout. Leave the field
          empty to skip it entirely. */}
      {optionalBody && (
        <section>
          <article
            className="mx-auto max-w-3xl px-6 py-16 text-base leading-relaxed text-cream/85 [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_p+p]:mt-4"
            dangerouslySetInnerHTML={{ __html: optionalBody }}
          />
        </section>
      )}

      <section>
        <article className="mx-auto max-w-3xl px-6 py-20 text-base leading-relaxed text-cream/85">
          <div className="space-y-5 whitespace-pre-line">
            {para1.split(/\n\n+/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="my-12 grid gap-6 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={bodyImage1}
                alt=""
                fill
                sizes="(min-width:640px) 50vw, 100vw"
                className="object-cover"
                unoptimized={bodyImage1.startsWith("http")}
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={bodyImage2}
                alt=""
                fill
                sizes="(min-width:640px) 50vw, 100vw"
                className="object-cover"
                unoptimized={bodyImage2.startsWith("http")}
              />
            </div>
          </div>

          <h2 className="font-display text-2xl">{heading2}</h2>
          <div className="mt-4 space-y-4 whitespace-pre-line">
            {para2.split(/\n\n+/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <h2 className="mt-10 font-display text-2xl">{heading3}</h2>
          <div className="mt-4 space-y-5 whitespace-pre-line">
            {para3.split(/\n\n+/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      </section>

      <Gallery
        heading={galleryHeading}
        intro={galleryIntro}
        images={galleryImages}
        tint="tint-forest-deep"
      />
    </main>
  );
}
