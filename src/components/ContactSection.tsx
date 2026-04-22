"use client";

import { useMemo, useState } from "react";

export function ContactSection({
  whatsappHref,
  email,
}: {
  whatsappHref: string;
  email: string;
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

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("failed");

      (e.target as HTMLFormElement).reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Contact LARIAL LTD
          </h2>
          <p className="mt-3 max-w-xl text-slate-600">
            Fastest way: WhatsApp. For detailed enquiries, use the email form and
            we’ll respond.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              className="inline-flex h-12 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              WhatsApp Us
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Email
            </a>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="text-xs font-semibold text-slate-500">Office</div>
            <div className="mt-2 text-sm font-semibold text-slate-900">
              Malha Plaza opp Carwash Kamazou, Yakowa Express Way, Kaduna.
            </div>
            <div className="mt-2 text-sm text-slate-600">Working hours: 9 to 5</div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="text" name="website" className="hidden" tabIndex={-1} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  required
                  name="name"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Email
                </label>
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
                <label className="text-sm font-semibold text-slate-700">
                  Phone (optional)
                </label>
                <input
                  name="phone"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  placeholder="+234..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Company (optional)
                </label>
                <input
                  name="company"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                  placeholder="If you already have one"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                What do you want to register?
              </label>
              <textarea
                required
                name="message"
                rows={5}
                className="mt-1 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-500/30 focus:ring"
                placeholder="Business Name / LTD / NGO... plus any details you already have."
              />
            </div>

            <button
              disabled={disabled}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Sent ✅"
                  : "Send Email"}
            </button>

            {status === "error" ? (
              <div className="text-sm text-red-600">
                Something went wrong. Please WhatsApp us instead.
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
