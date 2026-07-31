"use client"

import type React from "react"
import { useState } from "react"
import { rsvpSchema } from "@/lib/rsvp-schema"

type FieldErrors = Partial<Record<"name" | "email" | "attending" | "meal" | "note", string[]>>

const initialForm = {
  name: "",
  email: "",
  attending: "yes",
  meal:"meaterian-diet",
  note: "",
}

export default function RsvpForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError(null)

    // Client-side validation
    const result = rsvpSchema.safeParse(form)
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      return
    }
    setErrors({})
    setLoading(true)

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors)
        setServerError(data.error ?? "Something went wrong. Please try again.")
        return
      }
      setSubmitted(true)
    } catch {
      setServerError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center">
        <p className="font-serif text-5xl italic text-accent">Thank you</p>
        <div className="mx-auto my-8 h-px w-16 bg-accent" />
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
          Your response has been noted and a confirmation with all the details is on its way to your inbox. We
          can&apos;t wait to celebrate with you.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mt-4 text-2xl md:text-5xl">
          <span className="script text-2xl md:text-5xl" style={{ color: "var(--accent)" }}>
            Rsvp
          </span>
        
          Form
        </h2>
        <p className="p-4 font-bold text-">Rsvp by 1 September 2026 - Strictly by invite , no children and no plus ones allowed </p>
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div>
        <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Full Name
        </label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          aria-invalid={!!errors.name}
          className="mt-2 w-full border-b border-border bg-transparent py-2 text-lg outline-none focus:border-accent"
        />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name[0]}</p>}
      </div>
         <div>
        <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          aria-invalid={!!errors.email}
          className="mt-2 w-full border-b border-border bg-transparent py-2 text-lg outline-none focus:border-accent"
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email[0]}</p>}
      </div>
      


      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="attending" className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Attending
          </label>
          <select
            id="attending"
            value={form.attending}
            onChange={(e) => setForm({ ...form, attending: e.target.value })}
            className="mt-2 w-full border-b border-border bg-transparent py-2 text-lg outline-none focus:border-accent"
          >
            <option value="yes">Joyfully accepts</option>
            <option value="no">Regretfully declines</option>
          </select>
        </div>
          <div>
          <label htmlFor="guests" className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Meal
          </label>
          <select
            id="meal"
            value={form.meal}
            onChange={(e) => setForm({ ...form, meal: e.target.value })}
            className="mt-2 w-full border-b border-border bg-transparent py-2 text-lg outline-none focus:border-accent"
          >
            <option value="meaterian-diet">Meaterian-diet</option>
            <option value="vegeterian-diet">Vegeterian-diet</option>
          </select>
        </div>
       {/* <div>
          <label htmlFor="guests" className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Guests
          </label>
          <select
            id="guests"
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="mt-2 w-full border-b border-border bg-transparent py-2 text-lg outline-none focus:border-accent"
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>  */}
      </div>

      <div>
        <label htmlFor="note" className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          A note for the couple
        </label>
        <textarea
          id="note"
          rows={3}
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          aria-invalid={!!errors.note}
          className="mt-2 w-full border-b border-border bg-transparent py-2 text-base outline-none focus:border-accent"
        />
        {errors.note && <p className="mt-1 text-sm text-destructive">{errors.note[0]}</p>}
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm border border-accent bg-accent px-8 py-4 text-xs uppercase tracking-[0.4em] text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send RSVP"}
      </button>
    </form>
    </div>

     
  )
}
