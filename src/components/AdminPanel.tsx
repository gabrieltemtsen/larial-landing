"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  Job,
  Service,
  Settings,
  Testimonial,
  Work,
  WorkCategory,
} from "@/lib/content";

const WORK_CATEGORIES: WorkCategory[] = [
  "CAC",
  "Software",
  "Mobile",
  "Web",
  "Design",
];

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
    .map((line) => line.trim())
    .filter(Boolean);
}

function joinLines(lines: string[]) {
  return lines.join("\n");
}

function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function FieldLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return <label className="text-sm font-semibold text-slate-700">{children}</label>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring ${
        props.className ?? ""
      }`.trim()}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`mt-1 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring ${
        props.className ?? ""
      }`.trim()}
    />
  );
}

export function AdminPanel() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [draftStatus, setDraftStatus] = useState<string | null>(null);

  const [settings, setSettings] = useState<Settings | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [works, setWorks] = useState<Work[]>([]);

  const canPublish = useMemo(
    () => authed && !!settings && !publishing,
    [authed, settings, publishing]
  );

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(null), 5000);
    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    if (!draftStatus) return;
    const timer = setTimeout(() => setDraftStatus(null), 5000);
    return () => clearTimeout(timer);
  }, [draftStatus]);

  function draftKey(currentPin: string) {
    return `larial_admin_draft_v2:${currentPin}`;
  }

  function saveDraft(currentPin: string) {
    if (!settings) return;
    const payload = {
      savedAt: new Date().toISOString(),
      settings,
      services,
      jobs,
      testimonials,
      works,
    };
    localStorage.setItem(draftKey(currentPin), JSON.stringify(payload));
    setDraftStatus("Draft saved on this device.");
  }

  function loadDraft(currentPin: string) {
    const raw = localStorage.getItem(draftKey(currentPin));
    if (!raw) {
      setDraftStatus("No draft found on this device.");
      return;
    }

    try {
      const draft = JSON.parse(raw) as {
        savedAt: string;
        settings: Settings;
        services: Service[];
        jobs: Job[];
        testimonials: Testimonial[];
        works: Work[];
      };
      setSettings(draft.settings);
      setServices(draft.services);
      setJobs(draft.jobs);
      setTestimonials(draft.testimonials);
      setWorks(draft.works);
      setDraftStatus(
        `Draft loaded (saved ${new Date(draft.savedAt).toLocaleString()}).`
      );
    } catch {
      setDraftStatus("Draft was corrupted. Please re-create it.");
    }
  }

  function clearDraft(currentPin: string) {
    localStorage.removeItem(draftKey(currentPin));
    setDraftStatus("Draft cleared.");
  }

  async function authAndLoad(currentPin: string) {
    setError(null);
    setLoading(true);

    try {
      const ping = await fetch("/api/admin/load", {
        method: "POST",
        headers: {
          authorization: `Bearer ${currentPin}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ ping: true }),
      });
      if (!ping.ok) throw new Error("Invalid PIN");

      const res = await fetch("/api/admin/load", {
        headers: { authorization: `Bearer ${currentPin}` },
      });
      if (!res.ok) throw new Error("Failed to load content");

      const data = (await res.json()) as {
        settings: Settings;
        services: Service[];
        jobs: Job[];
        testimonials: Testimonial[];
        works: Work[];
      };

      setSettings(data.settings);
      setServices(data.services);
      setJobs(data.jobs);
      setTestimonials(data.testimonials);
      setWorks(data.works);
      setAuthed(true);
      setSuccess("Loaded");

      if (localStorage.getItem(draftKey(currentPin))) {
        setDraftStatus("Draft found on this device (click Load Draft).");
      }
    } catch (e: unknown) {
      setAuthed(false);
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  async function publishAll() {
    if (!settings) return;

    setError(null);
    setSuccess(null);
    setPublishing(true);

    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: {
          authorization: `Bearer ${pin}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          settings,
          services,
          jobs,
          testimonials,
          works,
        }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error || "Publish failed");

      clearDraft(pin);
      setSuccess("Published! Vercel will redeploy shortly.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Publish failed");
    } finally {
      setPublishing(false);
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
          <Input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            inputMode="numeric"
            placeholder="PIN"
            className="mt-0 h-12"
          />
          <button
            type="button"
            disabled={loading || pin.length < 4}
            onClick={() => authAndLoad(pin)}
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "Continue"}
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-sm text-slate-600">
          You can <span className="font-semibold">Save Draft</span> on this device,
          then <span className="font-semibold">Publish</span> when ready.
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => loadDraft(pin)}
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Load Draft
          </button>
          <button
            type="button"
            onClick={() => saveDraft(pin)}
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={publishAll}
            disabled={!canPublish}
            className="inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {publishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {draftStatus ? (
        <div className="text-sm text-slate-700">{draftStatus}</div>
      ) : null}
      {error ? <div className="text-sm text-red-600">{error}</div> : null}
      {success ? (
        <div className="text-sm text-emerald-700">{success}</div>
      ) : null}

      <SectionCard title="Site settings">
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              { key: "name", label: "Business name" },
              { key: "tagline", label: "Tagline" },
              { key: "email", label: "Email" },
              { key: "whatsappE164", label: "WhatsApp (E.164)" },
            ] as Array<{ key: keyof Settings; label: string }>
          ).map(({ key, label }) => (
            <div key={key}>
              <FieldLabel>{label}</FieldLabel>
              <Input
                value={settings[key]}
                onChange={(e) =>
                  setSettings({ ...settings, [key]: e.target.value } as Settings)
                }
              />
            </div>
          ))}

          <div className="sm:col-span-2">
            <FieldLabel>Address</FieldLabel>
            <Input
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />
          </div>

          <div className="sm:col-span-2">
            <FieldLabel>Working hours</FieldLabel>
            <Input
              value={settings.hours}
              onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
            />
          </div>

          <div className="sm:col-span-2">
            <FieldLabel>Description</FieldLabel>
            <Textarea
              rows={4}
              value={settings.description}
              onChange={(e) =>
                setSettings({ ...settings, description: e.target.value })
              }
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Services"
        action={
          <button
            type="button"
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
        }
      >
        <div className="space-y-4">
          {services.map((service, idx) => (
            <div
              key={`${service.title}-${idx}`}
              className="rounded-3xl border border-slate-200 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Service {idx + 1}
                </div>
                <button
                  type="button"
                  onClick={() => setServices(services.filter((_, i) => i !== idx))}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    value={service.title}
                    onChange={(e) => {
                      const next = [...services];
                      next[idx] = { ...service, title: e.target.value };
                      setServices(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Starting price (NGN)</FieldLabel>
                  <Input
                    value={service.startingFromNgn ?? ""}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      const next = [...services];
                      next[idx] = {
                        ...service,
                        startingFromNgn: value ? Number(value) : undefined,
                      };
                      setServices(next);
                    }}
                    inputMode="numeric"
                    placeholder="Leave empty if not fixed"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    rows={3}
                    value={service.description}
                    onChange={(e) => {
                      const next = [...services];
                      next[idx] = { ...service, description: e.target.value };
                      setServices(next);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Open roles"
        action={
          <button
            type="button"
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
        }
      >
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div
              key={`${job.id}-${idx}`}
              className="rounded-3xl border border-slate-200 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Role {idx + 1}
                </div>
                <button
                  type="button"
                  onClick={() => setJobs(jobs.filter((_, i) => i !== idx))}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    value={job.title}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = { ...job, title: e.target.value };
                      setJobs(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Role ID</FieldLabel>
                  <Input
                    value={job.id}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = { ...job, id: slugify(e.target.value) || job.id };
                      setJobs(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Location</FieldLabel>
                  <Input
                    value={job.location}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = { ...job, location: e.target.value };
                      setJobs(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Type</FieldLabel>
                  <Input
                    value={job.type}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = { ...job, type: e.target.value };
                      setJobs(next);
                    }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Summary</FieldLabel>
                  <Textarea
                    rows={3}
                    value={job.summary}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = { ...job, summary: e.target.value };
                      setJobs(next);
                    }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Responsibilities (one per line)</FieldLabel>
                  <Textarea
                    rows={4}
                    value={joinLines(job.responsibilities)}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = {
                        ...job,
                        responsibilities: parseLines(e.target.value),
                      };
                      setJobs(next);
                    }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Requirements (one per line)</FieldLabel>
                  <Textarea
                    rows={4}
                    value={joinLines(job.requirements)}
                    onChange={(e) => {
                      const next = [...jobs];
                      next[idx] = {
                        ...job,
                        requirements: parseLines(e.target.value),
                      };
                      setJobs(next);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Testimonials"
        action={
          <button
            type="button"
            onClick={() =>
              setTestimonials([
                ...testimonials,
                {
                  id: slugify(`testimonial-${testimonials.length + 1}`),
                  name: "Client name",
                  role: "Founder, Business name",
                  location: "Lagos, NG",
                  quote: "",
                  rating: 5,
                  service: "Company Registration (LTD)",
                  year: new Date().getFullYear(),
                  featured: false,
                },
              ])
            }
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            + Add
          </button>
        }
      >
        <div className="space-y-4">
          {testimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="rounded-3xl border border-slate-200 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Testimonial {idx + 1}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setTestimonials(testimonials.filter((_, i) => i !== idx))
                  }
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={testimonial.name}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx] = { ...testimonial, name: e.target.value };
                      setTestimonials(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>ID</FieldLabel>
                  <Input
                    value={testimonial.id}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx] = {
                        ...testimonial,
                        id: slugify(e.target.value) || testimonial.id,
                      };
                      setTestimonials(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Role / business</FieldLabel>
                  <Input
                    value={testimonial.role}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx] = { ...testimonial, role: e.target.value };
                      setTestimonials(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Location</FieldLabel>
                  <Input
                    value={testimonial.location}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx] = { ...testimonial, location: e.target.value };
                      setTestimonials(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Service</FieldLabel>
                  <Input
                    value={testimonial.service}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx] = { ...testimonial, service: e.target.value };
                      setTestimonials(next);
                    }}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Rating (1-5)</FieldLabel>
                    <Input
                      value={testimonial.rating}
                      onChange={(e) => {
                        const next = [...testimonials];
                        next[idx] = {
                          ...testimonial,
                          rating: Number(e.target.value || 5),
                        };
                        setTestimonials(next);
                      }}
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <FieldLabel>Year</FieldLabel>
                    <Input
                      value={testimonial.year}
                      onChange={(e) => {
                        const next = [...testimonials];
                        next[idx] = {
                          ...testimonial,
                          year: Number(e.target.value || new Date().getFullYear()),
                        };
                        setTestimonials(next);
                      }}
                      inputMode="numeric"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Quote</FieldLabel>
                  <Textarea
                    rows={4}
                    value={testimonial.quote}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx] = { ...testimonial, quote: e.target.value };
                      setTestimonials(next);
                    }}
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-3">
                  <input
                    id={`testimonial-featured-${idx}`}
                    type="checkbox"
                    checked={testimonial.featured}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[idx] = { ...testimonial, featured: e.target.checked };
                      setTestimonials(next);
                    }}
                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  <label
                    htmlFor={`testimonial-featured-${idx}`}
                    className="text-sm font-medium text-slate-700"
                  >
                    Show as featured
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Our Work"
        action={
          <button
            type="button"
            onClick={() =>
              setWorks([
                ...works,
                {
                  id: slugify(`work-${works.length + 1}`),
                  slug: slugify(`work-${works.length + 1}`),
                  title: "New project",
                  client: "Confidential client",
                  anonymized: true,
                  category: "CAC",
                  summary: "",
                  outcome: "",
                  year: new Date().getFullYear(),
                  cover: null,
                  tags: [],
                  url: null,
                  featured: false,
                  story: {
                    challenge: "",
                    approach: "",
                    result: "",
                  },
                },
              ])
            }
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            + Add
          </button>
        }
      >
        <div className="space-y-4">
          {works.map((work, idx) => (
            <div
              key={`${work.id}-${idx}`}
              className="rounded-3xl border border-slate-200 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  Work item {idx + 1}
                </div>
                <button
                  type="button"
                  onClick={() => setWorks(works.filter((_, i) => i !== idx))}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    value={work.title}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = { ...work, title: e.target.value };
                      setWorks(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Client</FieldLabel>
                  <Input
                    value={work.client}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = { ...work, client: e.target.value };
                      setWorks(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>ID</FieldLabel>
                  <Input
                    value={work.id}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = { ...work, id: slugify(e.target.value) || work.id };
                      setWorks(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Slug</FieldLabel>
                  <Input
                    value={work.slug}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = {
                        ...work,
                        slug: slugify(e.target.value) || work.slug,
                      };
                      setWorks(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>Category</FieldLabel>
                  <select
                    value={work.category}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = {
                        ...work,
                        category: e.target.value as WorkCategory,
                      };
                      setWorks(next);
                    }}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  >
                    {WORK_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel>Year</FieldLabel>
                  <Input
                    value={work.year}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = {
                        ...work,
                        year: Number(e.target.value || new Date().getFullYear()),
                      };
                      setWorks(next);
                    }}
                    inputMode="numeric"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Summary</FieldLabel>
                  <Textarea
                    rows={3}
                    value={work.summary}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = { ...work, summary: e.target.value };
                      setWorks(next);
                    }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Outcome</FieldLabel>
                  <Textarea
                    rows={2}
                    value={work.outcome}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = { ...work, outcome: e.target.value };
                      setWorks(next);
                    }}
                  />
                </div>

                <div>
                  <FieldLabel>External URL (optional)</FieldLabel>
                  <Input
                    value={work.url ?? ""}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = {
                        ...work,
                        url: e.target.value.trim() || null,
                      };
                      setWorks(next);
                    }}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <FieldLabel>Cover image path (optional)</FieldLabel>
                  <Input
                    value={work.cover ?? ""}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = {
                        ...work,
                        cover: e.target.value.trim() || null,
                      };
                      setWorks(next);
                    }}
                    placeholder="/works/project-cover.jpg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Tags (one per line)</FieldLabel>
                  <Textarea
                    rows={3}
                    value={joinLines(work.tags)}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = { ...work, tags: parseLines(e.target.value) };
                      setWorks(next);
                    }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Challenge</FieldLabel>
                  <Textarea
                    rows={3}
                    value={work.story.challenge}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = {
                        ...work,
                        story: { ...work.story, challenge: e.target.value },
                      };
                      setWorks(next);
                    }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Approach</FieldLabel>
                  <Textarea
                    rows={3}
                    value={work.story.approach}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = {
                        ...work,
                        story: { ...work.story, approach: e.target.value },
                      };
                      setWorks(next);
                    }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FieldLabel>Result</FieldLabel>
                  <Textarea
                    rows={3}
                    value={work.story.result}
                    onChange={(e) => {
                      const next = [...works];
                      next[idx] = {
                        ...work,
                        story: { ...work.story, result: e.target.value },
                      };
                      setWorks(next);
                    }}
                  />
                </div>

                <div className="sm:col-span-2 flex flex-wrap gap-6">
                  <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={work.anonymized}
                      onChange={(e) => {
                        const next = [...works];
                        next[idx] = { ...work, anonymized: e.target.checked };
                        setWorks(next);
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    Confidential / anonymized
                  </label>

                  <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={work.featured}
                      onChange={(e) => {
                        const next = [...works];
                        next[idx] = { ...work, featured: e.target.checked };
                        setWorks(next);
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    Show as featured
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
