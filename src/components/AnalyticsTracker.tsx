"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getId(key: string, storage: Storage, ttlMs?: number): string {
  try {
    const raw = storage.getItem(key);
    if (raw) {
      const { id, exp } = JSON.parse(raw) as { id: string; exp?: number };
      if (!exp || Date.now() < exp) return id;
    }
  } catch { /* ignore */ }

  const id = crypto.randomUUID();
  const exp = ttlMs ? Date.now() + ttlMs : undefined;
  try { storage.setItem(key, JSON.stringify({ id, exp })); } catch { /* ignore */ }
  return id;
}

function getVisitorId(): string {
  // 365-day persistent visitor ID in localStorage
  return getId("_vid", localStorage, 365 * 24 * 60 * 60 * 1000);
}

function getSessionId(): string {
  // Session ID in sessionStorage (cleared when tab closes)
  return getId("_sid", sessionStorage);
}

function track(payload: {
  type: "pageview" | "click" | "form_submit" | "heartbeat";
  path: string;
  referrer?: string;
  meta?: Record<string, string>;
}) {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  navigator.sendBeacon(
    "/api/analytics/track",
    new Blob(
      [JSON.stringify({ ...payload, visitorId, sessionId, referrer: document.referrer })],
      { type: "application/json" }
    )
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AnalyticsTracker() {
  const pathname = usePathname();

  // Track pageview on route change
  useEffect(() => {
    // Skip admin pages
    if (pathname.startsWith("/admin")) return;

    track({ type: "pageview", path: pathname });
  }, [pathname]);

  // Track clicks (buttons, links) via event delegation
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const btn = target.closest("button, a, [data-track]");
      if (!btn) return;

      const label =
        btn.getAttribute("data-track-label") ??
        btn.getAttribute("aria-label") ??
        (btn as HTMLElement).innerText?.trim().slice(0, 60) ??
        "unknown";

      const href = btn instanceof HTMLAnchorElement ? btn.href : undefined;

      track({
        type: "click",
        path: window.location.pathname,
        meta: {
          label,
          ...(href ? { href } : {}),
          tag: btn.tagName.toLowerCase(),
        },
      });
    }

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Track form submissions
  useEffect(() => {
    function handleSubmit(e: SubmitEvent) {
      const form = e.target as HTMLFormElement;
      const name =
        form.getAttribute("data-form-name") ??
        form.getAttribute("id") ??
        form.getAttribute("name") ??
        form.action?.split("/").pop() ??
        "unknown";

      track({
        type: "form_submit",
        path: window.location.pathname,
        meta: { form: name },
      });
    }

    document.addEventListener("submit", handleSubmit, { passive: true });
    return () => document.removeEventListener("submit", handleSubmit);
  }, []);

  // Heartbeat every 60s so we can count active users
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const interval = setInterval(() => {
      track({ type: "heartbeat", path: window.location.pathname });
    }, 60_000);

    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
