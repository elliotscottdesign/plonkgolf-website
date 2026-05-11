export function AdminCard({
  title,
  children,
  action,
}: {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-cream/10 bg-ink/40">
      {(title || action) && (
        <header className="flex items-center justify-between border-b border-cream/10 px-5 py-3">
          {title && <h2 className="font-display text-lg">{title}</h2>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function PreviewBanner() {
  return (
    <div className="mb-6 rounded-xl border border-plonkYellow/30 bg-plonkYellow/5 px-4 py-3 text-xs text-plonkYellow">
      <strong>Preview mode.</strong> All data shown is sample data — edits
      and "Save" buttons don't persist yet. Real data + saves come online once
      Supabase is wired up.
    </div>
  );
}
