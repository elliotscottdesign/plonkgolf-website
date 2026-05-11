import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image: string;
}) {
  return (
    <section className="relative isolate flex min-h-[72vh] flex-col items-center justify-center px-6 pt-24 pb-28 text-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>
      {eyebrow && (
        <p className="text-shadow-hero mb-4 text-xs font-bold uppercase tracking-eyebrow text-plonkYellow">
          {eyebrow}
        </p>
      )}
      <h1 className="text-shadow-hero font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {intro && (
        <p className="text-shadow-hero mt-5 max-w-2xl text-base text-cream sm:text-lg">
          {intro}
        </p>
      )}
    </section>
  );
}
