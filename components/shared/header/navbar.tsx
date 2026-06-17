'use client'

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const links = [
   { to: "/", label: "Home" },
  { to: "/about", label: "Our Approach" },
  { to: "/admissions", label: "Admissions" },
  { to: "/parent-support", label: "Parent Support" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-background/85 border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="The Bridge Way Logo"
            width={400}
            height={400}
            className="h-30 w-40 group-hover:rotate-6 transition-transform"
          />
        
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l,i) => (
            <li key={i}>
              <Link
                href={l.to}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-brand-blue hover:bg-secondary transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/visit"
              className="btn-accent ml-2 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
            >
              Book a Visit
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-brand-blue">Menu</SheetTitle>
              <ul className="mt-6 flex flex-col gap-1">
                {links.map((l,i) => (
                  <li key={i}>
                    <Link
                      href={l.to}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-3 rounded-md text-base font-medium hover:bg-secondary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/visit"
                    onClick={() => setOpen(false)}
                    className="btn-accent mt-2 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-base font-semibold"
                  >
                    Book a Visit
                  </Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}