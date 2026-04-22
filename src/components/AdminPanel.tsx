"use client";

import { useEffect, useMemo, useState } from "react";

type Settings = {
  name: string;
  tagline: string;
  description: string;
  address: string;
  hours: string;
  whatsappE164: string;
  email: string;
};

type Service = {
  title: string;
  description: string;
  startingFromNgn?: number;
};

type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function AdminPanel() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [settings, setSettings] = useState<Settings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  const canSave = useMemo(
    () => authed && !!settings && !saving,
    [authed, settings, saving]
  );

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(null), 5000);
    return () => clearTimeout(t);
  }, [success]);

  async function authAndLoad(p: string) {
    setError(null);
    setLoading(true);

    try {
      // quick PIN validation
      const ping = await fetch("/api/admin/load", {
        method: "POST",
        headers: {
          authorization: `Bearer ${p}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ ping: true }),
      });
      if (!ping.ok) throw new Error("Invalid PIN");

      const res = await fetch("/api/admin/load", {
        headers: { authorization: `Bearer ${p}` },
      });
      if (!res.ok) throw new Error("Failed to load content");
      const data = (await res.json()) as {
        settings: Settings;
        services: Service[];
        jobs: Job[];
      };

      setSettings(data.settings);
      setServices(data.services);
      setJobs(data.jobs);
      setAuthed(true);
      setSuccess("Loaded");
    } catch (e: unknown) {
      setAuthed(false);
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  async function saveAll() {
    if (!settings) return;

    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: {
          authorization: `Bearer ${pin}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ settings, services, jobs }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || "Save failed");
      }

      setSuccess("Saved! Vercel will redeploy shortly.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!authed) {
    return (
      <div className="max-w-md">
        <div className="text-sm font-semibold text-slate-900">Enter Admin PIN</div>
        <p className="mt-1 text-sm text-slate-600">
          This PIN is required to edit website content.
        </p>

        <div className="mt-4 flex gap-3">
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            inputMode="numeric"
            placeholder="PIN"
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none ring-sky-500/30 focus:ring"
          />
          <button
            disabled={loading || pin.length < 4}
            onClick={() => authAndLoad(pin)}
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading…" : "Continue"}
          </button>
        </div>

        {error ? <div className="mt-3 text-sm text-red-600">{error}</div> : null}
        {success ? (
          <div className="mt-3 text-sm text-emerald-700">{success}</div>
        ) : null}
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          Logged in. Make edits and click <span className="font-semibold">Save</span>.
        </div>
        <button
          onClick={saveAll}
          disabled={!canSave}
          className="inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      {error ? <div className="text-sm text-red-600">{error}</div> : null}
      {success ? (
        <div className="text-sm text-emerald-700">{success}</div>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-bold text-slate-900">Site settings</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {(
            [
              { key: "name", label: "Business name" },
              { key: "tagline", label: "Tagline" },
              { key: "email", label: "Email" },
              { key: "whatsappE164", label: "WhatsApp (E.164)" },
            ] as Array<{ key: keyof Settings; label: string }>
          ).map(({ key, label }) => (
            <div key={key}>
              <label className="text-sm font-semibold text-slate-700">
                {label}
              </label>
              <input
                value={settings[key]}
                onChange={(e) =>
                  setSettings({ ...settings, [key]: e.target.value } as Settings)
                }
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
              />
            </div>
          ))}

          <div className="sm:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Address</label>
            <input
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Working hours</label>
            <input
              value={settings.hours}
              onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea
              rows={4}
              value={settings.description}
              onChange={(e) =>
                setSettings({ ...settings, description: e.target.value })
              }
              className="mt-1 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-slate-900">Services</h2>
          <button
            onClick={() =>
              setServices([
                ...services,
                { title: "New service", description: "", startingFromNgn: undefined },
              ])
            }
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            + Add
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {services.map((svc, idx) => (
            <div key={`${svc.title}-${idx}`} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Service {idx + 1}
                </div>
                <button
                  onClick={() => setServices(services.filter((_, i) => i !== idx))}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Title</label>
                  <input
                    value={svc.title}
                    onChange={(e) => {
                      const next = [...services];
                      next[idx] = { ...svc, title: e.target.value };
                      setServices(next);
                    }}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Starting price (NGN)
                  </label>
                  <input
                    value={svc.startingFromNgn ?? ""}
                    onChange={(e) => {
                      const v = e.target.value.trim();
                      const next = [...services];
                      next[idx] = {
                        ...svc,
                        startingFromNgn: v ? Number(v) : undefined,
                      };
                      setServices(next);
                    }}
                    inputMode="numeric"
                    placeholder="Leave empty if not fixed"
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Description</label>
                  <textarea
                    rows={3}
                    value={svc.description}
                    onChange={(e) => {
                      const next = [...services];
                      next[idx] = { ...svc, description: e.target.value };
                      setServices(next);
                    }}
                    className="mt-1 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-slate-900">Open roles</h2>
          <button
            onClick={() =>
              setJobs([
                ...jobs,
                {
                  id: slugify(`role-${jobs.length + 1}`),
                  title: "New role",
                  location: "Kaduna",
                  type: "Full-time",
                  summary: "",
                  responsibilities: [],
                  requirements: [],
                },
              ])
            }
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            + Add
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {jobs.map((job, idx) => (
            <div key={`${job.id}-${idx}`} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Role {idx + 1}
                </div>
                <button
                  onClick={() => setJobs(jobs.filter((_, i) => i !== idx))}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Title</label>
                  <input
                    value={job.title}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = { ...job, title: e.target.value };
                      setJobs(next);
                    }}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Role ID</label>
                  <input
                    value={job.id}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = { ...job, id: slugify(e.target.value) || job.id };
                      setJobs(next);
                    }}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Location</label>
                  <input
                    value={job.location}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = { ...job, location: e.target.value };
                      setJobs(next);
                    }}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">Type</label>
                  <input
                    value={job.type}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = { ...job, type: e.target.value };
                      setJobs(next);
                    }}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Summary</label>
                  <textarea
                    rows={3}
                    value={job.summary}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = { ...job, summary: e.target.value };
                      setJobs(next);
                    }}
                    className="mt-1 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Responsibilities (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={job.responsibilities.join("\n")}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = {
                        ...job,
                        responsibilities: parseLines(e.target.value),
                      };
                      setJobs(next);
                    }}
                    className="mt-1 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Requirements (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={job.requirements.join("\n")}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = {
                        ...job,
                        requirements: parseLines(e.target.value),
                      };
                      setJobs(next);
                    }}
                    className="mt-1 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
