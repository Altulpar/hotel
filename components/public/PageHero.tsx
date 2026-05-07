type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-coast-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coast-clay">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold text-coast-ink md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-coast-ink/70">{description}</p>
      </div>
    </section>
  );
}
