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
    meal: z.enum(["meaterian-diet", "vegetarian-diet"], { message: "Please let us know your meal preferance" }),
/*  guests: z.enum(["1", "2"], { message: "Please select the number of guests" }),*/
  note: z.string().trim().max(500, "Please keep your note under 500 characters").optional(),
})

export type RsvpInput = z.infer<typeof rsvpSchema>

// Wedding details reused across the app and the confirmation email.
export const WEDDING_DETAILS = {
  title:"Samantha & Prince's Wedding",
  couple: "Samantha & Prince",
  date: "Sunday, October 4, 2026",
  time: "10:00 AM",
  venueName: "Mount Pavilia Resort",
  venueAddress: "Mazowe",
  dressCode:
    "Garden formal: a balance of elegance and comfort<br/>" +
    "Our color palette features elegant, earthy neutrals: nude tones, champagne, sage green, dusty rose, gold, and taupe<br/>" +
    "For women: knee-length, midi, or tea-length dresses are recommended<br/>" +
    "For men: suits with ties are required. Please choose footwear that's comfortable for standing and dancing",
  ownerEmail: "sammytgumbo@gmail.com",
   direction:"Location: https://maps.app.goo.gl/SdTV9Vx1T6sKcrDS9?g_st=aw"
} as const
