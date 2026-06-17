'use client'

import { MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";

export function Foot() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer id="contact" className="bg-brand-blue text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <span className="block h-4 w-4 rounded-sm rotate-45 bg-brand-yellow" />
              </span>
              <span className="text-lg font-semibold">Bridgeway Academy</span>
            </div>
            <p className="mt-3 text-sm text-white/75 max-w-xs">
              A calm, inclusive learning home for children with autism and diverse learning needs.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-yellow" aria-hidden="true" /> 24 Willow Lane, Suite 200</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-yellow" aria-hidden="true" /> (555) 010-3344</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-yellow" aria-hidden="true" /> hello@bridgewayacademy.org</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Quick links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["#programs", "Programs"],
                ["#supports", "Supports"],
                ["#staff", "Our Team"],
                ["#resources", "Resources"],
                ["#visit", "Plan a Visit"],
              ].map(([h, l]) => (
                <li key={h}>
                  <a href={h} className="text-white/85 hover:text-brand-yellow">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Stay in touch</h3>
            <p className="mt-3 text-sm text-white/75">Occasional notes for families—calm, practical, never spammy.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) { setDone(true); setEmail(""); } }}
              className="mt-3 flex gap-2"
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm placeholder:text-white/50 border border-white/20"
              />
              <button type="submit" className="btn-accent rounded-full px-4 py-2 text-sm font-semibold">Join</button>
            </form>
            {done && <p role="status" className="mt-2 text-xs text-brand-yellow">You're on the list. Thank you.</p>}

            
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-white/65">
          <p>© {new Date().getFullYear()} Bridgeway Academy. All rights reserved.</p>
          <p>Built with care for every learner.</p>
        </div>
      </div>
    </footer>
  );
}