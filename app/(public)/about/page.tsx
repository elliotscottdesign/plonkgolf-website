import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";

const ABOUT_GALLERY = [
  { src: "/images/gallery02.jpg", alt: "Plonk course" },
  { src: "/images/gallery03.jpg", alt: "Plonk crazy golf" },
  { src: "/images/gallery06.jpg", alt: "Plonk course" },
  { src: "/images/gallery07.jpg", alt: "Plonk course" },
  { src: "/images/gallery09.jpg", alt: "Plonk crazy golf" },
  { src: "/images/gallery11.jpg", alt: "Plonk course detail" },
  { src: "/images/gallery12.jpg", alt: "Plonk crazy golf" },
  { src: "/images/gallery13.jpg", alt: "Plonk course detail" },
  { src: "/images/gallery14.jpg", alt: "Plonk crazy golf" },
  { src: "/images/gallery15.jpg", alt: "Plonk course detail" },
  { src: "/images/gallery16.jpg", alt: "Plonk crazy golf" },
  { src: "/images/1SOCIAL_2017-1.jpg", alt: "Plonk crowd" },
];

export const metadata: Metadata = {
  title: "About — Plonk Golf",
  description:
    "Plonk Crazy Golf was founded in 2014 by a troop of set designers from the film industry. We design, build, install and manage every course ourselves.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Plonk"
        title="All About Plonk Golf"
        intro="Founded by a troop of set designers from the film industry, banded together to create the greatest crazy golf courses imaginable and plonk them down around the Capital."
        image="/images/about_header.jpg"
      />

      <section className="tint-forest-to-forestDeep border-t border-forestLine/40">
      <article className="mx-auto max-w-3xl px-6 py-20 text-base leading-relaxed text-cream/85">
        <p>
          Plonk Crazy Golf was founded by a troop of set designers from the
          film industry who banded together for a common cause — using their
          skills to create the greatest crazy golf courses imaginable and
          plonking them down around the Capital.
        </p>
        <p className="mt-5">
          In 2014 we opened our first course in Haggerston, London, built from
          100% up-cycled materials rescued from the streets of Hackney. Since
          that initial success, we've been creating ever more ambitious
          courses across the UK and Europe.
        </p>

        <div className="my-12 grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/about_img01.jpg" alt="" fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src="/images/about_img02.jpg" alt="" fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>

        <h2 className="font-display text-2xl">Totally unique, totally Plonk</h2>
        <p className="mt-4">
          Totally unique and customisable, we work closely with award-winning
          venues, bars, pubs, and museums to create one-of-a-kind golf-stacle
          courses tailored to each venue. Outdoors you can find us working
          with major tourist attractions such as ZSL London Zoo and The
          Horniman Museum and Gardens, bringing our signature nine-hole
          courses to award-winning venues. Indoors, we're creating
          hyper-coloured UV adventures.
        </p>

        <h2 className="mt-10 font-display text-2xl">
          Design · Build · Install · Manage
        </h2>
        <p className="mt-4">
          We design, build, install and manage all of our golf courses
          ourselves, meaning no two are alike. Each Plonk course offers a
          completely new experience tailored to match the venue. Big or
          small, themed or branded, our in-house design team always have
          their pencils sharpened, ready to design the perfect Plonk course.
        </p>
        <p className="mt-5">
          So come on down and join us in one of our putting paradises for a
          plonking good time!
        </p>
      </article>
      </section>

      <Gallery
        heading="A decade of Plonking"
        intro="Highlights from courses past and present."
        images={ABOUT_GALLERY}
        tint="tint-forest-deep"
      />
    </main>
  );
}
