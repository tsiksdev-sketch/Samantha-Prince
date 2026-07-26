import { title } from "process"
import { z } from "zod"

export const rsvpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
  attending: z.enum(["yes", "no"], { message: "Please let us know if you can attend" }),
  guests: z.enum(["1", "2"], { message: "Please select the number of guests" }),
  note: z.string().trim().max(500, "Please keep your note under 500 characters").optional(),
})

export type RsvpInput = z.infer<typeof rsvpSchema>

// Wedding details reused across the app and the confirmation email.
export const WEDDING_DETAILS = {
  title:"Samantha & Prince's Wedding",
  couple: "Samantha & Prince",
  date: "Saturday, October 4, 2026",
  time: "4:00 PM",
  venueName: "The Rosewood Garden Estate",
  venueAddress: "1420 Vineyard Lane, Sonoma, California",
  dressCode: "Garden formal",
  ownerEmail: "sammytgumbo@gmail.com",
} as const
