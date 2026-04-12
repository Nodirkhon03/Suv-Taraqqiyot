import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const baseUrl = "https://suv-taraqqiyot.com";
const locales = ["en", "ru", "uz", "tr"];
const pages = [
  "",
  "/services",
  "/equipment",
  "/projects",
  "/projects/map",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    }
  }

  for (const project of projects) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${baseUrl}/${l}/projects/${project.slug}`,
            ])
          ),
        },
      });
    }
  }

  return entries;
}
