import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

const DATA_FILE = path.join(process.cwd(), "content", "analytics.json");

type AnalyticsEvent = {
  type: "pageview" | "click" | "form_submit" | "heartbeat";
  path: string;
  source: "direct" | "organic" | "social" | "referral";
  referrer: string;
  visitorId: string;
  sessionId: string;
  timestamp: string;
  meta?: Record<string, string>;
};

async function readEvents(): Promise<AnalyticsEvent[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as AnalyticsEvent[];
  } catch {
    return [];
  }
}

async function appendEvent(event: AnalyticsEvent) {
  const events = await readEvents();
  // Keep last 50,000 events to avoid unbounded growth
  const next = [...events, event].slice(-50000);
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2), "utf8");
}

function classifySource(referrer: string): AnalyticsEvent["source"] {
  if (!referrer) return "direct";
  try {
    const url = new URL(referrer);
    const host = url.hostname.replace("www.", "");
    const socialDomains = [
      "facebook.com", "twitter.com", "x.com", "instagram.com",
      "linkedin.com", "tiktok.com", "youtube.com", "t.co",
      "pinterest.com", "reddit.com", "whatsapp.com",
    ];
    const searchDomains = [
      "google.", "bing.com", "yahoo.com", "duckduckgo.com",
      "yandex.", "baidu.com", "ecosia.org",
    ];
    if (socialDomains.some((d) => host.includes(d))) return "social";
    if (searchDomains.some((d) => host.includes(d))) return "organic";
    return "referral";
  } catch {
    return "direct";
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<AnalyticsEvent>;

    const event: AnalyticsEvent = {
      type: body.type ?? "pageview",
      path: body.path ?? "/",
      referrer: body.referrer ?? "",
      source: classifySource(body.referrer ?? ""),
      visitorId: body.visitorId ?? "unknown",
      sessionId: body.sessionId ?? "unknown",
      timestamp: new Date().toISOString(),
      meta: body.meta,
    };

    await appendEvent(event);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to track event" }, { status: 500 });
  }
}
