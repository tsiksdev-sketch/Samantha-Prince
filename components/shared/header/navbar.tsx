'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

const THEMES = [
  { id: "sage", label: "Sage Green", swatch: "#a8b89e" },
  { id: "ivory", label: "Ivory", swatch: "#f4ecd8" },
  { id: "rose", label: "Dusty Rose", swatch: "#c9848c" },
  { id: "champagne", label: "Champagne", swatch: "#efd9a8" },
  { id: "gold", label: "Antique Gold", swatch: "#c3a353" },
  { id: "taupe", label: "Soft Taupe", swatch: "#c8bfb2" },
] as const;

const NAV = [
  { to: "/", label: "Our Story" },
  { to: "/when-where", label: "When & Where" },
  { to: "/gallery", label: "Gallery" },
  { to: "/rsvp", label: "RSVP" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [theme, setTheme] = useState<string>("sage");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("wedding-theme") : null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("wedding-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={`script text-2xl md:text-3xl transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          style={{ color: scrolled ? "var(--accent)" : undefined }}
        >
          S &amp; P
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              href={item.to}
             
              className={`text-[11px] uppercase tracking-[0.3em] transition-colors ${
                scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/85 hover:text-white"
              }`}
            
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setThemeOpen((v) => !v)}
              className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.25em] transition ${
                scrolled
                  ? "border-border bg-card text-foreground hover:bg-muted"
                  : "border-white/40 bg-black/30 text-white backdrop-blur-md hover:bg-black/50"
              }`}
            >
              Dress Code
            </button>
            {themeOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-lg border border-border bg-card p-3 shadow-xl">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Choose a palette
                </p>
                <div className="space-y-1">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition hover:bg-muted ${
                        theme === t.id ? "bg-muted" : ""
                      }`}
                    >
                      <span
                        className="h-5 w-5 rounded-full border border-border"
                        style={{ backgroundColor: t.swatch }}
                      />
                      <span className="font-medium">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className={`md:hidden rounded-full border p-2 transition ${
              scrolled ? "border-border text-foreground" : "border-white/40 text-white"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 7h16" strokeLinecap="round" />
                  <path d="M4 12h16" strokeLinecap="round" />
                  <path d="M4 17h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                href={item.to}
          
                onClick={() => setMenuOpen(false)}
                className="py-3 text-xs uppercase tracking-[0.3em] text-foreground/80"
       
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
