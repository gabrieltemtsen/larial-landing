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
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            Contact
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Tell us what you want to register.
          </h2>
          <p className="mt-3 max-w-xl text-slate-600">
            Fastest way: WhatsApp. For detailed enquiries, use the email form
            and we&apos;ll respond within working hours.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-500 px-6 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .04 5.33.04 11.97a11.9 11.9 0 0 0 1.6 5.96L0 24l6.22-1.63a11.96 11.96 0 0 0 5.78 1.47h.01c6.62 0 11.96-5.33 11.96-11.97 0-3.2-1.25-6.21-3.45-8.39Z" />
              </svg>
              WhatsApp Us
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Email
            </a>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">Office</div>
            <div className="mt-2 text-sm font-bold text-slate-900">
              Malha Plaza opp Carwash Kamazou, Yakowa Express Way, Kaduna.
            </div>
            <div className="mt-2 text-sm text-slate-600">Working hours: 9 to 5</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-100/60 via-white to-indigo-100/60 blur-2xl" />
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
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
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
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
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
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
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                  placeholder="+234..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Company (optional)
                </label>
                <input
                  name="company"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
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
                className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                placeholder="Business Name / LTD / NGO... plus any details you already have."
              />
            </div>

            <button
              disabled={disabled}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-slate-800 px-6 text-sm font-semibold text-white transition hover:from-slate-800 hover:to-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
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
      </div>
    </section>
  );
}
