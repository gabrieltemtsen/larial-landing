"use client";

import { useMemo, useState } from "react";

export function CareersApplyForm({
  roleId,
}: {
  roleId: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const disabled = useMemo(() => status === "sending" || status === "sent", [
    status,
  ]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const fd = new FormData(e.currentTarget);
      fd.set("roleId", roleId);

      const res = await fetch("/api/careers", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("failed");

      (e.target as HTMLFormElement).reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="website" className="hidden" tabIndex={-1} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-700">Full name</label>
          <input
            required
            name="fullName"
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <input
            required
            type="email"
            name="email"
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-700">Phone</label>
          <input
            required
            name="phone"
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
            placeholder="+234..."
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">CV (PDF/DOC)</label>
          <input
            required
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700">
          Cover note (optional)
        </label>
        <textarea
          name="coverNote"
          rows={4}
          className="mt-1 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
          placeholder="Tell us briefly why you're a great fit."
        />
      </div>

      <button
        disabled={disabled}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending"
          ? "Submitting…"
          : status === "sent"
            ? "Submitted ✅"
            : "Submit application"}
      </button>

      {status === "error" ? (
        <div className="text-sm text-red-600">
          Something went wrong. Please send your CV to the company email.
        </div>
      ) : null}
    </form>
  );
}
