import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const baseUrl = "https://suv-taraqqiyot.com";
const locales = ["en", "ru", "uz", "tr"] as const;

const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/projects/map", changeFrequency: "weekly", priority: 0.8 },
  { path: "/equipment", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
];

function buildAlternates(path: string) {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${baseUrl}/${l}${path}`])
  );
  languages["x-default"] = `${baseUrl}/en${path}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, changeFrequency, priority } of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: buildAlternates(path),
      });
    }
  }

  for (const project of projects) {
    const path = `/projects/${project.slug}`;
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: buildAlternates(path),
      });
    }
  }

  return entries;
}
