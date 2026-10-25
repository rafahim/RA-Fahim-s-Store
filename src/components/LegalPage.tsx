export default function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <main id="main-content" className="mx-auto legal-page max-w-4xl px-5 py-16">
      <span className="eyebrow">THE DETAILS, CLEARLY EXPLAINED</span>
      <h1 className="font-display mt-5 text-4xl font-semibold md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated October 2026</p>
      <div className="mt-10 space-y-9">
        {sections.map((s) => (
          <section key={s.h} className="legal-section">
            <h2 className="font-display text-xl font-semibold">{s.h}</h2>
            {s.p.map((t) => (
              <p key={t} className="mt-3 leading-relaxed text-muted">{t}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
