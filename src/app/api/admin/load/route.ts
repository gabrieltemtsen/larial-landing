import { z } from "zod";
import {
  getJobs,
  getServices,
  getSettings,
  getTestimonials,
  getWorks,
} from "@/lib/content";

export const runtime = "nodejs";

function requirePin(req: Request) {
  const expected = process.env.ADMIN_PIN;
  if (!expected) {
    return { ok: false as const, res: Response.json({ error: "ADMIN_PIN not set" }, { status: 500 }) };
  }

  const auth = req.headers.get("authorization") || "";
  const pin = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "";

  if (!pin || pin !== expected) {
    return { ok: false as const, res: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  return { ok: true as const };
}

export async function GET(req: Request) {
  const gate = requirePin(req);
  if (!gate.ok) return gate.res;

  const [settings, services, jobs, testimonials, works] = await Promise.all([
    getSettings(),
    getServices(),
    getJobs(),
    getTestimonials(),
    getWorks(),
  ]);

  return Response.json({ settings, services, jobs, testimonials, works });
}

const PingSchema = z.object({ ping: z.literal(true) });

export async function POST(req: Request) {
  // Simple health check for client to validate PIN without loading everything.
  const gate = requirePin(req);
  if (!gate.ok) return gate.res;

  const body = await req.json().catch(() => null);
  const parsed = PingSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  return Response.json({ ok: true });
}
