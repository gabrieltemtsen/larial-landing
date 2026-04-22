import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(30).optional().or(z.literal("")),
  message: z.string().min(10).max(2000),
  company: z.string().max(120).optional().or(z.literal("")),
  // Honeypot
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return Response.json(
      { ok: false, error: "Missing RESEND_API_KEY" },
      { status: 500 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || site.email;

  const body = await req.json().catch(() => null);
  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid form data" },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    // bot
    return Response.json({ ok: true });
  }

  const { name, email, phone, company, message } = parsed.data;

  const resend = new Resend(resendKey);

  await resend.emails.send({
    from: "LARIAL LTD <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `New enquiry — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      `Company: ${company || "-"}`,
      "",
      message,
    ].join("\n"),
  });

  return Response.json({ ok: true });
}
