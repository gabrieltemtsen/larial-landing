import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const routes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/management", priority: 0.7 },
    { path: "/post-incorporation", priority: 0.85 },
    { path: "/contact", priority: 0.85 },
    { path: "/careers", priority: 0.7 },
  ] as const;

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r.priority,
  }));
}
