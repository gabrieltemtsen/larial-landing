import { z } from "zod";

export const runtime = "nodejs";

function requirePin(req: Request) {
  const expected = process.env.ADMIN_PIN;
  if (!expected) {
    return {
      ok: false as const,
      res: Response.json({ error: "ADMIN_PIN not set" }, { status: 500 }),
    };
  }

  const auth = req.headers.get("authorization") || "";
  const pin = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : "";

  if (!pin || pin !== expected) {
    return {
      ok: false as const,
      res: Response.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true as const };
}

const SettingsSchema = z.object({
  name: z.string().min(2).max(120),
  tagline: z.string().min(2).max(280),
  description: z.string().min(10).max(2000),
  address: z.string().min(5).max(300),
  hours: z.string().min(2).max(120),
  whatsappE164: z.string().min(8).max(30),
  email: z.string().email(),
});

const ServiceSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(5).max(600),
  startingFromNgn: z.number().int().positive().optional(),
});

const JobSchema = z.object({
  id: z.string().min(1).max(80),
  title: z.string().min(2).max(120),
  location: z.string().min(2).max(120),
  type: z.string().min(2).max(80),
  summary: z.string().min(10).max(800),
  responsibilities: z.array(z.string().min(2).max(200)).max(30),
  requirements: z.array(z.string().min(2).max(200)).max(30),
});

const TestimonialSchema = z.object({
  id: z.string().min(1).max(80),
  name: z.string().min(2).max(120),
  role: z.string().min(2).max(160),
  location: z.string().min(2).max(120),
  quote: z.string().min(10).max(600),
  rating: z.number().int().min(1).max(5),
  service: z.string().min(2).max(120),
  year: z.number().int().min(2000).max(2100),
  featured: z.boolean(),
});

const WorkSchema = z.object({
  id: z.string().min(1).max(80),
  slug: z.string().min(1).max(120),
  title: z.string().min(2).max(160),
  client: z.string().min(2).max(160),
  anonymized: z.boolean(),
  category: z.enum(["CAC", "Software", "Mobile", "Web", "Design"]),
  summary: z.string().min(10).max(800),
  outcome: z.string().min(10).max(300),
  year: z.number().int().min(2000).max(2100),
  cover: z.string().max(300).nullable(),
  tags: z.array(z.string().min(1).max(40)).max(12),
  url: z.string().url().max(300).nullable(),
  featured: z.boolean(),
  story: z.object({
    challenge: z.string().min(10).max(1200),
    approach: z.string().min(10).max(1200),
    result: z.string().min(10).max(1200),
  }),
});

const PayloadSchema = z.object({
  settings: SettingsSchema,
  services: z.array(ServiceSchema).max(100),
  jobs: z.array(JobSchema).max(100),
  testimonials: z.array(TestimonialSchema).max(100),
  works: z.array(WorkSchema).max(100),
});

function b64(s: string) {
  return Buffer.from(s, "utf8").toString("base64");
}

async function ghFetch(url: string, init: RequestInit) {
  const res = await fetch(url, init);
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { res, text, json };
}

async function getFileSha({
  repo,
  branch,
  token,
  path,
}: {
  repo: string;
  branch: string;
  token: string;
  path: string;
}): Promise<string | null> {
  const { res, json } = await ghFetch(
    `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    }
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub read failed for ${path}`);
  }

  if (json && typeof json === "object" && "sha" in json) {
    const sha = (json as Record<string, unknown>).sha;
    if (typeof sha === "string") return sha;
  }
  return null;
}

async function putFile({
  repo,
  branch,
  token,
  path,
  content,
  message,
}: {
  repo: string;
  branch: string;
  token: string;
  path: string;
  content: string;
  message: string;
}) {
  async function attemptWrite(sha: string | null) {
    const body: Record<string, unknown> = {
      message,
      content: b64(content),
      branch,
    };
    if (sha) body.sha = sha;

    return ghFetch(
      `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify(body),
      }
    );
  }

  // First try
  let sha = await getFileSha({ repo, branch, token, path });
  let { res, json, text } = await attemptWrite(sha);

  // If the file changed between read and write, retry once with fresh sha
  if (res.status === 409) {
    sha = await getFileSha({ repo, branch, token, path });
    ({ res, json, text } = await attemptWrite(sha));
  }

  if (!res.ok) {
    throw new Error(
      `GitHub write failed for ${path}: ${res.status} ${JSON.stringify(json ?? text)}`
    );
  }
}

export async function POST(req: Request) {
  const gate = requirePin(req);
  if (!gate.ok) return gate.res;

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return Response.json(
      { error: "Missing GITHUB_TOKEN or GITHUB_REPO" },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = PayloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const settingsJson = JSON.stringify(parsed.data.settings, null, 2) + "\n";
  const servicesJson =
    JSON.stringify({ items: parsed.data.services }, null, 2) + "\n";
  const jobsJson = JSON.stringify({ items: parsed.data.jobs }, null, 2) + "\n";
  const testimonialsJson =
    JSON.stringify({ items: parsed.data.testimonials }, null, 2) + "\n";
  const worksJson = JSON.stringify({ items: parsed.data.works }, null, 2) + "\n";

  const msg = `admin: update site content (${new Date().toISOString()})`;

  try {
    const writes = [
      {
        repo,
        branch,
        token,
        path: "content/settings.json",
        content: settingsJson,
        message: msg,
      },
      {
        repo,
        branch,
        token,
        path: "content/services.json",
        content: servicesJson,
        message: msg,
      },
      {
        repo,
        branch,
        token,
        path: "content/jobs.json",
        content: jobsJson,
        message: msg,
      },
      {
        repo,
        branch,
        token,
        path: "content/testimonials.json",
        content: testimonialsJson,
        message: msg,
      },
      {
        repo,
        branch,
        token,
        path: "content/works.json",
        content: worksJson,
        message: msg,
      },
    ];

    for (const write of writes) {
      await putFile(write);
    }

    return Response.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return Response.json(
      {
        ok: false,
        error: message,
        hint:
          "Check GITHUB_TOKEN permissions (Contents: read/write), repo name, and branch.",
      },
      { status: 500 }
    );
  }
}
