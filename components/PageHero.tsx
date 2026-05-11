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
   *  The slider is a placeholder until a hero video is ready.                    */
  image: string | string[];
}) {
  const isArray = Array.isArray(image);

  return (
    <section className="relative isolate flex flex-col">
      {/* Image — always fills the full width. aspect-[3/2] matches the natural
          ratio of our venue photos so they fit without top/bottom crop on the
          most common viewports; ultrawide screens see a very minor side crop. */}
      <div className="relative w-full bg-forest aspect-[3/2] max-h-[80vh] min-h-[360px] overflow-hidden">
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
        {/* Subtle top shade so the sticky nav stays legible over light photos */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-forestDeep/55 to-transparent" />
      </div>

      {/* Copy — clean hard edge between image and title band */}
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
