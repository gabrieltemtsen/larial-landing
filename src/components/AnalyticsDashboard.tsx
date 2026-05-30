"use client";

import { useCallback, useEffect, useState } from "react";

type Summary = {
  totalViews: number;
  uniqueVisitors: number;
  activeUsers: number;
  totalClicks: number;
  totalFormSubmits: number;
};

type AnalyticsData = {
  summary: Summary;
  sources: Record<string, number>;
  topPages: { path: string; views: number }[];
  topClicks: { label: string; count: number }[];
  topForms: { form: string; count: number }[];
  dailyViews: { date: string; views: number }[];
  days: number;
};

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number | string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </div>
      <div className={`mt-2 text-3xl font-extrabold ${accent ?? "text-slate-900"}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

function MiniBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-100">
      <div
        className="h-1.5 rounded-full bg-sky-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Sparkline({ data }: { data: { date: string; views: number }[] }) {
  const max = Math.max(...data.map((d) => d.views), 1);
  const w = 320;
  const h = 48;
  const pad = 4;
  const step = (w - pad * 2) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = pad + i * step;
    const y = h - pad - ((d.views / max) * (h - pad * 2));
    return `${x},${y}`;
  });

  const polyline = points.join(" ");
  const area = `${pad},${h - pad} ${polyline} ${pad + (data.length - 1) * step},${h - pad}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" aria-hidden="true">
      <polygon points={area} fill="rgb(14 165 233 / 0.12)" />
      <polyline
        points={polyline}
        fill="none"
        stroke="rgb(14 165 233)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SOURCE_LABELS: Record<string, string> = {
  direct: "Direct",
  organic: "Organic Search",
  social: "Social Media",
  referral: "Referral Links",
};

const SOURCE_COLORS: Record<string, string> = {
  direct: "bg-slate-500",
  organic: "bg-sky-500",
  social: "bg-violet-500",
  referral: "bg-emerald-500",
};

export function AnalyticsDashboard({ pin }: { pin: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  const load = useCallback(
    async (d: number) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/analytics/data?days=${d}`, {
          headers: { authorization: `Bearer ${pin}` },
        });
        if (!res.ok) throw new Error("Failed to load analytics");
        const json = (await res.json()) as AnalyticsData;
        setData(json);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Error");
      } finally {
        setLoading(false);
      }
    },
    [pin]
  );

  useEffect(() => {
    load(days);
  }, [load, days]);

  const totalSourceViews = data
    ? Object.values(data.sources).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Analytics</h2>
          <p className="text-sm text-slate-500">Live data from your visitors</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring focus:ring-sky-500/30"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <button
            type="button"
            onClick={() => load(days)}
            disabled={loading}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {data && (
        <>
          {/* Summary stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <StatCard
              label="Total Views"
              value={data.summary.totalViews}
              sub={`Last ${days} days`}
            />
            <StatCard
              label="Unique Visitors"
              value={data.summary.uniqueVisitors}
              sub="By visitor ID"
            />
            <StatCard
              label="Active Now"
              value={data.summary.activeUsers}
              sub="Last 5 minutes"
              accent={data.summary.activeUsers > 0 ? "text-emerald-600" : "text-slate-900"}
            />
            <StatCard
              label="Button Clicks"
              value={data.summary.totalClicks}
              sub={`Last ${days} days`}
            />
            <StatCard
              label="Form Submits"
              value={data.summary.totalFormSubmits}
              sub={`Last ${days} days`}
            />
          </div>

          {/* Sparkline */}
          {data.dailyViews.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Daily Pageviews (14 days)
              </div>
              <Sparkline data={data.dailyViews} />
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>{data.dailyViews[0]?.date}</span>
                <span>{data.dailyViews[data.dailyViews.length - 1]?.date}</span>
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Traffic sources */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Traffic Sources
              </div>
              <div className="space-y-4">
                {(["organic", "direct", "social", "referral"] as const).map((src) => {
                  const count = data.sources[src] ?? 0;
                  const pct =
                    totalSourceViews > 0
                      ? Math.round((count / totalSourceViews) * 100)
                      : 0;
                  return (
                    <div key={src}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium text-slate-700">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${SOURCE_COLORS[src]}`}
                          />
                          {SOURCE_LABELS[src]}
                        </span>
                        <span className="text-slate-500">
                          {count.toLocaleString()}{" "}
                          <span className="text-slate-400">({pct}%)</span>
                        </span>
                      </div>
                      <MiniBar value={count} max={totalSourceViews} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top pages */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Top Pages
              </div>
              {data.topPages.length === 0 ? (
                <p className="text-sm text-slate-400">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {data.topPages.map(({ path, views }) => (
                    <div key={path}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span
                          className="truncate font-mono text-xs text-slate-700"
                          title={path}
                        >
                          {path}
                        </span>
                        <span className="ml-3 shrink-0 text-slate-500">
                          {views.toLocaleString()}
                        </span>
                      </div>
                      <MiniBar value={views} max={data.topPages[0].views} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Button clicks */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Button & Link Clicks
              </div>
              {data.topClicks.length === 0 ? (
                <p className="text-sm text-slate-400">No clicks tracked yet</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-2 text-left text-xs font-semibold text-slate-500">
                        Label
                      </th>
                      <th className="pb-2 text-right text-xs font-semibold text-slate-500">
                        Clicks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topClicks.map(({ label, count }) => (
                      <tr
                        key={label}
                        className="border-b border-slate-50 last:border-0"
                      >
                        <td
                          className="py-2 pr-4 text-slate-700 truncate max-w-[200px]"
                          title={label}
                        >
                          {label}
                        </td>
                        <td className="py-2 text-right font-medium text-slate-900">
                          {count.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Form submissions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Form Submissions
              </div>
              {data.topForms.length === 0 ? (
                <p className="text-sm text-slate-400">No form submissions yet</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-2 text-left text-xs font-semibold text-slate-500">
                        Form
                      </th>
                      <th className="pb-2 text-right text-xs font-semibold text-slate-500">
                        Submissions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topForms.map(({ form, count }) => (
                      <tr
                        key={form}
                        className="border-b border-slate-50 last:border-0"
                      >
                        <td className="py-2 pr-4 capitalize text-slate-700">{form}</td>
                        <td className="py-2 text-right font-medium text-slate-900">
                          {count.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}

      {!data && !loading && !error && (
        <p className="text-sm text-slate-400">No analytics data yet. Data appears as visitors browse the site.</p>
      )}
    </div>
  );
}
