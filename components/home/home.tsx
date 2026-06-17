'use client'

import { useEffect, useRef, useState } from "react";
import { Menu, X, Play, Pause } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";


const THEMES = [
  { id: "taupe", label: "Taupe", swatch: "#9a8978" },
  { id: "sand", label: "Sand", swatch: "#d5b896" },
  { id: "blush", label: "Blush", swatch: "#dcc6b6" },
  { id: "cream", label: "Cream", swatch: "#eadfd1" },
  { id: "stone", label: "Stone", swatch: "#d8d4ce" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

const NAV = [
  { href: "#story", label: "Our Story" },
  { href: "#venue", label: "Venue" },
  { href: "#gallery", label: "Moments" },
  { href: "#details", label: "Details" },
  { href: "#rsvp", label: "RSVP" },
];

export default function HomePage() {
  const [theme, setTheme] = useState<ThemeId>("taupe");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("wedding-theme")) as ThemeId | null;
    if (stored && THEMES.some((t) => t.id === stored)) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.scrollBehavior = "smooth";
    localStorage.setItem("wedding-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Header theme={theme} setTheme={setTheme} />
      <Hero />
      <Story />
      <Venue />
      <Gallery />
      <RsvpDetails />
      <RsvpForm />
      <Footer />
      <MusicPlayer />
    </div>
  );
}

function MusicPlayer() {
  // Royalty-free track. Replace with your own song URL anytime.
  const SRC = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true;
    a.volume = 0.35;
    a.preload = "auto";
    a.addEventListener("canplaythrough", () => setReady(true));
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (a.paused) {
        await a.play();
        setPlaying(true);
      } else {
        a.pause();
        setPlaying(false);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed left-5 bottom-5 z-50 flex items-center gap-2 rounded-full border border-border bg-background/85 px-4 py-3 text-foreground shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-background"
    >
      <span className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground ${playing ? "animate-pulse" : ""}`}>
        {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </span>
      <span className="hidden text-[10px] uppercase tracking-[0.3em] text-foreground/70 sm:inline">
        {playing ? "Pause" : ready ? "Play music" : "Loading…"}
      </span>
    </button>
  );
}

function Header({ theme, setTheme }: { theme: ThemeId; setTheme: (t: ThemeId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span style={{ fontFamily: "var(--font-script)" }} className="text-2xl text-primary">
            S &amp; P
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[11px] uppercase tracking-[0.3em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeDots theme={theme} setTheme={setTheme} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-[11px] uppercase tracking-[0.3em] text-foreground/80"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function ThemeDots({ theme, setTheme }: { theme: ThemeId; setTheme: (t: ThemeId) => void }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-2 py-1.5 backdrop-blur-sm">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          aria-label={`Switch to ${t.label} theme`}
          title={t.label}
          className={`h-4 w-4 rounded-full transition-transform hover:scale-125 ${
            theme === t.id ? "ring-2 ring-offset-1 ring-foreground/50 ring-offset-card" : ""
          }`}
          style={{ backgroundColor: t.swatch }}
        />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        width={1000}
        height={1000}
        src={'/wedding-hero.jpg'}
        alt="Wedding tablescape with neutral florals"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/30 to-background" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          Together with their families
        </p>
        <h1 className="mt-8 font-display text-6xl leading-[0.95] text-foreground sm:text-7xl md:text-8xl">
          Samantha
          <span className="mx-3 italic text-primary" style={{ fontFamily: "var(--font-script)" }}>
            &amp;
          </span>
          Prince
        </h1>
        <div className="mx-auto mt-10 h-px w-24 bg-foreground/30" />
        <p className="mt-10 text-sm uppercase tracking-[0.35em] text-foreground/80">
          14 · February · 2027
        </p>
        <p className="mt-2 text-sm tracking-widest text-muted-foreground">Udaipur, India</p>
        <a
          href="#rsvp"
          className="mt-12 inline-block rounded-none border border-foreground/40 px-8 py-3 text-[11px] uppercase tracking-[0.35em] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Reserve your seat
        </a>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        scroll
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-4 text-4xl text-foreground sm:text-5xl md:text-6xl">
        <span style={{ fontFamily: "var(--font-script)" }} className="text-primary">
          {title}
        </span>
      </h2>
      <div className="mx-auto mt-6 h-px w-16 bg-foreground/20" />
    </div>
  );
}

function Story() {
  return (
    <section id="story" className="bg-secondary/40 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Chapter One" title="our story" />
        <div className="mt-16 grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="relative">
            <Image
              src={'/couple-1.jpg'}
              alt="Couple walking at golden hour"
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-4/5 w-full object-cover"
            />
            <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 border border-primary md:block" />
          </div>
          <div className="space-y-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              How it began
            </p>
            <p>
              We met on a slow Sunday in a Bombay bookshop — both reaching for the last copy
              of the same novel. Rohan let Aanya have it, on one condition: coffee, after she
              finished it.
            </p>
            <p>
              Three years, two cities, and one very small kitten later, we&rsquo;re trading
              dog-eared pages for vows. We&rsquo;d be honoured to have you with us as we begin
              the next chapter.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                { n: "2024", l: "First met" },
                { n: "2025", l: "First trip" },
                { n: "2026", l: "The proposal" },
              ].map((s) => (
                <div key={s.n}>
                  <p className="font-display text-2xl text-primary">{s.n}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section id="venue" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Save the Date" title="when & where" />
        <div className="mt-16 grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <Image
              src={'/lobola-10.jpg'}
              alt="Lake Palace Udaipur at sunset"
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-4/5 w-full object-cover md:aspect-auto md:h-full"
            />
          </div>
          <div className="space-y-6 md:col-span-2">
            <div className="border border-border bg-card p-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Ceremony</p>
              <h3 className="mt-4 text-2xl text-foreground">Lake Pichola Pavilion</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Sunday, 14 February 2027<br />
                4:30 pm — Vows at golden hour<br />
                Taj Lake Palace, Udaipur
              </p>
            </div>
            <div className="border border-border bg-card p-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Reception</p>
              <h3 className="mt-4 text-2xl text-foreground">The Mewar Courtyard</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Sunday, 14 February 2027<br />
                7:00 pm — Dinner &amp; dancing<br />
                Black tie optional
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    { src: '/lobola-9.jpg', label: "Roora Day", span: "sm:col-span-2 sm:row-span-2 aspect-square" },
    { src: '/couple-2.jpg', label: "Just us", span: "aspect-[3/4]" },
    { src: '/lobola-2.jpg', label: "The sisters", span: "aspect-[3/4]" },
    { src: '/lobola-12.jpg', label: "Family", span: "aspect-[3/4]" },
    { src: '/lobola-11.jpg', label: "The table", span: "aspect-[3/4]" },
    { src: '/lobola-14.jpg', label: "Celebration", span: "sm:col-span-2 aspect-[16/10]" },
    { src: '/lobola-13.jpg', label: "Toasts", span: "aspect-[3/4]" },
    { src: '/lobola-15.jpg', label: "Quiet moments", span: "aspect-[3/4]" },
    { src: '/couple-1.jpg', label: "Us, lately", span: "aspect-[3/4]" },
  ];
  return (
    <section id="gallery" className="bg-muted/40 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="A glimpse" title="moments" />
        <div className="mt-16 grid auto-rows-[minmax(0,auto)] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {items.map((it, i) => (
            <figure key={i} className={`group overflow-hidden ${it.span ?? ""}`}>
              <div className="h-full overflow-hidden">
                <Image
                  width={1000}
                  height={1000}
                  src={it.src}
                  alt={it.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-3 text-center text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                {it.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function RsvpDetails() {
  return (
    <section id="details" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Before you reply" title="rsvp details" />
        <div className="mt-16 grid gap-10 text-left sm:grid-cols-3">
          {[
            { h: "Kindly respond by", p: "15 January 2027 so we can finalise seating and the menu." },
            { h: "Plus ones", p: "Named on your invitation — we ask for no additional guests." },
            { h: "Dress code", p: "Festive neutrals. Soft beige, ivory, and warm taupe encouraged." },
          ].map((d) => (
            <div key={d.h} className="border-t border-border pt-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{d.h}</p>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">{d.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RsvpForm() {
  const [submitting, setSubmitting] = useState(false);
  const [attending, setAttending] = useState("yes");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    if (!name) {
      toast.error("Please share your name.");
      setSubmitting(false);
      return;
    }
    setTimeout(() => {
      toast.success(
        attending === "yes"
          ? `Thank you, ${name.split(" ")[0]} — we can't wait to celebrate with you.`
          : `Thank you for letting us know, ${name.split(" ")[0]}. You'll be missed.`,
      );
      (e.target as HTMLFormElement).reset();
      setAttending("yes");
      setSubmitting(false);
    }, 600);
  }

  const fieldCls =
    "border-x-0 border-t-0 border-b border-border bg-transparent rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground";

  return (
    <section id="rsvp" className="relative overflow-hidden bg-secondary/40 px-6 py-24 sm:py-32">
      <Image
        width={1000}
        height={1000}
        src={'/wedding-florals .jpg'}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 hidden h-105 w-[320px] object-cover opacity-30 md:block"
      />
      <Image
        width={1000}
        height={1000}
        src={'/wedding-invite.jpg'}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 hidden h-95 w-75 object-cover opacity-25 md:block"
      />
      <div className="relative mx-auto max-w-2xl">
        <SectionHeading eyebrow="Won't you join us?" title="rsvp" />
        <form onSubmit={onSubmit} className="mt-16 space-y-6 text-left">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Full name
            </Label>
            <Input id="name" name="name" required maxLength={100} className={fieldCls} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Email
            </Label>
            <Input id="email" name="email" type="email" required maxLength={150} className={fieldCls} />
          </div>
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Will you be joining us?
            </Label>
            <RadioGroup value={attending} onValueChange={setAttending} className="flex gap-6 pt-1">
              <label className="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="yes" id="yes" />
                <span className="text-sm">Joyfully accepts</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="no" id="no" />
                <span className="text-sm">Regretfully declines</span>
              </label>
            </RadioGroup>
          </div>
          {attending === "yes" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="guests" className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Number of guests (incl. you)
                </Label>
                <Input id="guests" name="guests" type="number" min={1} max={4} defaultValue={1} className={fieldCls} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diet" className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Dietary notes
                </Label>
                <Textarea id="diet" name="diet" rows={3} maxLength={400} className="rounded-none border border-border bg-transparent focus-visible:border-foreground focus-visible:ring-0" />
              </div>
            </>
          )}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-none bg-primary py-6 text-xs uppercase tracking-[0.35em] text-primary-foreground hover:bg-primary/90"
          >
            {submitting ? "Sending…" : "Send response"}
          </Button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 text-center">
      <p style={{ fontFamily: "var(--font-script)" }} className="text-3xl text-primary">
        S &amp; P
      </p>
      <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        14 · 02 · 2027 · Udaipur
      </p>
      <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
        With love
      </p>
    </footer>
  );
}
