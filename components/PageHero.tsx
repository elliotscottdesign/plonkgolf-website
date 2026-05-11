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
    <section className="tint-hero relative isolate flex min-h-[55vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forestDeep/60 via-forestDeep/70 to-forest" />
      </div>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-plonkYellow">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-2xl text-base text-cream/80 sm:text-lg">{intro}</p>
      )}
    </section>
  );
}
