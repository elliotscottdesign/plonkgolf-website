import Image from "next/image";
import HeroSlider from "./HeroSlider";

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Pass a single src for a static hero, or an array for an auto-cycling slider.
   *  The slider is a placeholder until a hero video is ready — when the video is
   *  in, drop it in here (or swap PageHero for a <video>-aware variant).         */
  image: string | string[];
}) {
  const isArray = Array.isArray(image);

  return (
    <section className="relative isolate flex flex-col">
      {/* Image — uninterrupted, ready for a future video */}
      <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden md:h-[68vh]">
        {isArray ? (
          <HeroSlider images={image.map((src) => ({ src }))} />
        ) : (
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        {/* Subtle top shade so the nav stays legible */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-forestDeep/55 to-transparent" />
        {/* Bottom fade — image dissolves into forest to meet the copy band */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-forest" />
      </div>

      {/* Copy — sits on forest, vertically centred in a tight band */}
      <div className="flex flex-col items-center justify-center bg-forest px-6 py-10 text-center md:py-14">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
