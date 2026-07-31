import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { rsvpSchema, WEDDING_DETAILS } from "@/lib/rsvp-schema"

const resend = new Resend(process.env.RESEND_API_KEY)

function buildEmailHtml(name: string, attending: string, imageUrl: string) {
  const d = WEDDING_DETAILS
  const isAttending = attending === "yes"

  return `
  <div style="margin:0;padding:0;background-color:#f4f1ec;font-family:Georgia,'Times New Roman',serif;color:#33302b;">
    <div style="max-width:600px;margin:0 auto;background-color:#ffffff;">
      <img src="${imageUrl}" alt="${d.venueName}" width="600" style="display:block;width:100%;height:auto;" />
      <div style="padding:40px 40px 48px;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:4px;font-size:11px;color:#a1875c;text-align:center;">
          ${isAttending ? "We can't wait to celebrate with you" : "We'll miss you dearly"}
        </p>
        <h1 style="margin:16px 0 8px;text-align:center;font-size:34px;font-weight:normal;color:#33302b;">
          Thank you, ${name}
        </h1>
        <div style="width:48px;height:1px;background-color:#a1875c;margin:20px auto;"></div>
        <p style="margin:0 0 28px;text-align:center;font-size:16px;line-height:1.7;color:#5c584f;">
          ${
            isAttending
              ? `Your RSVP has been received and we are thrilled you'll be joining us to celebrate the wedding of <strong>${d.couple}</strong>. Here are the details so you can plan your day.`
              : `Your response has been received. We're sorry you can't make it, but we're grateful you let us know. In case things change, here are the details.`
          }
        </p>

        <table role="presentation" width="100%" style="border-collapse:collapse;background-color:#faf8f4;border:1px solid #ece7dd;border-radius:8px;">
          <tr><td style="padding:20px 24px;">
            <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;color:#5c584f;line-height:1.6;">
              <tr>
                <td style="padding:8px 0;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#a1875c;width:120px;">Celebrating</td>
                <td style="padding:8px 0;">${d.couple}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#a1875c;">Date</td>
                <td style="padding:8px 0;">${d.date}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#a1875c;">Time</td>
                <td style="padding:8px 0;">${d.time}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#a1875c;">Venue</td>
                <td style="padding:8px 0;">${d.venueName}<br/>${d.venueAddress}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#a1875c;">Dress code</td>
                <td style="padding:8px 0;">${d.dressCode}</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <p style="margin:28px 0 0;text-align:center;font-size:14px;line-height:1.7;color:#5c584f;">
          If you have any questions, simply reply to this email. With love,<br/>
          <strong>${d.couple}</strong>
        </p>
      </div>
    </div>
  </div>`
}

function buildOwnerHtml(data: {
  name: string
  email: string
  attending: string
  meal:string
  note?: string
}) {
  const isAttending = data.attending === "yes"
  return `
  <div style="margin:0;padding:24px;background-color:#f4f1ec;font-family:Georgia,'Times New Roman',serif;color:#33302b;">
    <div style="max-width:560px;margin:0 auto;background-color:#ffffff;border:1px solid #ece7dd;border-radius:8px;padding:32px;">
      <p style="margin:0;text-transform:uppercase;letter-spacing:3px;font-size:11px;color:#a1875c;">New RSVP Response</p>
      <h1 style="margin:8px 0 24px;font-size:26px;font-weight:normal;">
        ${data.name} ${isAttending ? "is attending" : "cannot attend"}
      </h1>
      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;color:#5c584f;line-height:1.6;">
        <tr>
          <td style="padding:8px 0;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#a1875c;width:120px;">Name</td>
          <td style="padding:8px 0;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#a1875c;">Email</td>
          <td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#a1875c;">${data.email}</a></td>
        </tr>
      
        <tr>
          <td style="padding:8px 0;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#a1875c;">Attending</td>
          <td style="padding:8px 0;">${isAttending ? "Yes" : "No"}</td>
        </tr>
         <tr>
          <td style="padding:8px 0;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#a1875c;">Guests</td>
          <td style="padding:8px 0;">${data.meal}</td>
        </tr>
        ${
          data.note
            ? `<tr>
                 <td style="padding:8px 0;text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#a1875c;vertical-align:top;">Note</td>
                 <td style="padding:8px 0;">${data.note}</td>
               </tr>`
            : ""
        }
      </table>
    </div>
  </div>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Server-side validation
    const parsed = rsvpSchema.safeParse(body)
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      return NextResponse.json(
        { error: "Validation failed", fieldErrors },
        { status: 400 },
      )
    }

    const { name, email, attending, meal, note } = parsed.data

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured. Please set RESEND_API_KEY." },
        { status: 500 },
      )
    }

    // Build an absolute URL to the venue image so email clients can load it.
    const origin =
      request.headers.get("origin") ??
      `${request.nextUrl.protocol}//${request.headers.get("host")}`
    const imageUrl = `${origin}/wedding-venue.png`
    const ownerEmail = process.env.OWNER_EMAIL ?? WEDDING_DETAILS.ownerEmail

    // Function 1: send a confirmation email to the guest who submitted the RSVP.
    const guestSend = resend.emails.send({
      // Resend's onboarding sender works without a verified domain.
      from: `${WEDDING_DETAILS.couple} <contact@africarbontraining.com>`,
      to: [email],
      subject: `Thank you for your RSVP, ${name.split(" ")[0]}!`,
      html: buildEmailHtml(name, attending, imageUrl),
    })

    // Function 2: notify the wedding owner of the RSVP response.
    const ownerSend = resend.emails.send({
      from: `RSVP Notifications <contact@africarbontraining.com>`,
      to: [ownerEmail],
      replyTo: email,
      subject: `New RSVP: ${name} ${attending === "yes" ? "is attending" : "cannot attend"}`,
      html: buildOwnerHtml({ name, email, attending, meal, note }),
    })

    const [guestResult, ownerResult] = await Promise.all([guestSend, ownerSend])

    if (guestResult.error) {
      console.log("[v0] Resend guest email error:", guestResult.error)
      return NextResponse.json(
        { error: "We couldn't send your confirmation email. Please try again." },
        { status: 502 },
      )
    }

    if (ownerResult.error) {
      // The guest's confirmation succeeded; log the owner-notification failure
      // but don't fail the request for the guest.
      console.log("[v0] Resend owner notification error:", ownerResult.error)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.log("[v0] RSVP route error:", err)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}