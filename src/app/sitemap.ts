import type { MetadataRoute } from "next";
import { getWorks } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const works = await getWorks();

  const routes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/works", priority: 0.85 },
    { path: "/management", priority: 0.7 },
    { path: "/post-incorporation", priority: 0.85 },
    { path: "/contact", priority: 0.85 },
    { path: "/careers", priority: 0.7 },
  ] as const;

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  const workRoutes = works.map((work) => ({
    url: `${baseUrl}/work/${work.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...workRoutes];
}
