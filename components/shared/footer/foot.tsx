

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="script text-5xl md:text-6xl" style={{ color: "var(--accent)" }}>
          Samantha &amp; Prince
        </p>
        <div className="mx-auto my-8 h-px w-16" style={{ backgroundColor: "var(--accent)" }} />
        <div className="flex flex-col items-center justify-center gap-6 text-sm uppercase tracking-[0.3em] text-muted-foreground md:flex-row md:gap-12">
          <div>
            <p className="text-xs opacity-60">The Date</p>
            <p className="mt-2 text-foreground">04 · 10 · 2026</p>
          </div>
          <div className="hidden h-8 w-px bg-border md:block" />
          <div>
            <p className="text-xs opacity-60">The Place</p>
            <p className="mt-2 text-foreground">Rosewood Gardens</p>
          </div>
          <div className="hidden h-8 w-px bg-border md:block" />
          <div>
            <p className="text-xs opacity-60">The Dress Code</p>
            <p className="mt-2 text-foreground">Garden Formal</p>
          </div>
        </div>
        <p className="mt-12 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          With love, from us to you
        </p>
      </div>
    </footer>
  );
}
