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

function requirePin(req: Request): { ok: true } | { ok: false; res: Response } {
  const expected = process.env.ADMIN_PIN;
  if (!expected) {
    return { ok: false, res: Response.json({ error: "ADMIN_PIN not set" }, { status: 500 }) };
  }
  const auth = req.headers.get("authorization") ?? "";
  const pin = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "";
  if (!pin || pin !== expected) {
    return { ok: false, res: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { ok: true };
}

async function readEvents(): Promise<AnalyticsEvent[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as AnalyticsEvent[];
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const gate = requirePin(req);
  if (!gate.ok) return gate.res;

  const events = await readEvents();

  const { searchParams } = new URL(req.url);
  const days = Number(searchParams.get("days") ?? "30");
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const filtered = events.filter((e) => e.timestamp >= cutoff);

  const pageviews = filtered.filter((e) => e.type === "pageview");
  const clicks = filtered.filter((e) => e.type === "click");
  const formSubmits = filtered.filter((e) => e.type === "form_submit");

  // Active users = unique visitors who sent any event in the last 5 minutes
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const activeVisitors = new Set(
    filtered.filter((e) => e.timestamp >= fiveMinAgo).map((e) => e.visitorId)
  );

  // Traffic sources
  const sources: Record<string, number> = { direct: 0, organic: 0, social: 0, referral: 0 };
  for (const e of pageviews) sources[e.source] = (sources[e.source] ?? 0) + 1;

  // Top pages
  const pageCounts: Record<string, number> = {};
  for (const e of pageviews) pageCounts[e.path] = (pageCounts[e.path] ?? 0) + 1;
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }));

  // Top clicked buttons/links
  const clickCounts: Record<string, number> = {};
  for (const e of clicks) {
    const label = e.meta?.label ?? e.meta?.href ?? "unknown";
    clickCounts[label] = (clickCounts[label] ?? 0) + 1;
  }
  const topClicks = Object.entries(clickCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, count]) => ({ label, count }));

  // Form submissions
  const formCounts: Record<string, number> = {};
  for (const e of formSubmits) {
    const form = e.meta?.form ?? "unknown";
    formCounts[form] = (formCounts[form] ?? 0) + 1;
  }
  const topForms = Object.entries(formCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([form, count]) => ({ form, count }));

  // Daily views for sparkline (last 14 days)
  const dailyViews: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    dailyViews[d.toISOString().slice(0, 10)] = 0;
  }
  for (const e of pageviews) {
    const day = e.timestamp.slice(0, 10);
    if (day in dailyViews) dailyViews[day]++;
  }

  return Response.json({
    summary: {
      totalViews: pageviews.length,
      uniqueVisitors: new Set(pageviews.map((e) => e.visitorId)).size,
      activeUsers: activeVisitors.size,
      totalClicks: clicks.length,
      totalFormSubmits: formSubmits.length,
    },
    sources,
    topPages,
    topClicks,
    topForms,
    dailyViews: Object.entries(dailyViews).map(([date, views]) => ({ date, views })),
    days,
  });
}
