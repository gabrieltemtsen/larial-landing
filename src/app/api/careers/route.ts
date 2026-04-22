import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const CareersSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(30),
  roleId: z.string().min(1).max(100),
  coverNote: z.string().min(0).max(4000).optional(),
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

  const to = process.env.CAREERS_TO_EMAIL || site.email;

  const formData = await req.formData();
  const payload: Record<string, unknown> = {};
  for (const [k, v] of formData.entries()) {
    if (typeof v === "string") payload[k] = v;
  }

  const parsed = CareersSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Invalid form data" },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  const file = formData.get("cv");
  if (!(file instanceof File)) {
    return Response.json({ ok: false, error: "CV is required" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const maxBytes = 7 * 1024 * 1024;
  if (bytes.length > maxBytes) {
    return Response.json(
      { ok: false, error: "CV too large (max 7MB)" },
      { status: 400 }
    );
  }

  const resend = new Resend(resendKey);

  await resend.emails.send({
    from: "LARIAL LTD Careers <onboarding@resend.dev>",
    to,
    replyTo: parsed.data.email,
    subject: `Job application — ${parsed.data.fullName}`,
    text: [
      `Full name: ${parsed.data.fullName}`,
      `Email: ${parsed.data.email}`,
      `Phone: ${parsed.data.phone}`,
      `Role ID: ${parsed.data.roleId}`,
      "",
      parsed.data.coverNote || "(no cover note)",
    ].join("\n"),
    attachments: [
      {
        filename: file.name || "cv.pdf",
        content: bytes.toString("base64"),
      },
    ],
  });

  return Response.json({ ok: true });
}
