import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { projects } from "@/lib/projects";
import { CONTENT_UPDATED, ROUTES, languageAlternates, localeUrl } from "@/lib/seo";

/*
 * Every locale × every route, plus the 20 project pages × 4 locales. Each entry lists all four
 * translations and x-default (/en). lastModified is a fixed content date (lib/seo.ts), not the
 * request time, so the file does not claim a change on every crawl. No URL here redirects.
 */
const PRIORITY: Record<string, number> = {
  "": 1,
  "/services": 0.9,
  "/projects": 0.9,
  "/about": 0.8,
  "/equipment": 0.7,
  "/contact": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${CONTENT_UPDATED}T00:00:00Z`);
  const entry = (path: string, priority: number) =>
    locales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: languageAlternates(path) },
    }));

  return [
    ...ROUTES.flatMap((path) => entry(path, PRIORITY[path])),
    ...projects.flatMap((p) => entry(`/projects/${p.slug}`, 0.6)),
  ];
}
