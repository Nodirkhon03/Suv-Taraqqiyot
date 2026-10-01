import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n";
import { projects } from "@/lib/projects";
import { getProjectText } from "@/lib/content/projects-i18n";
import ListingLd from "./ListingLd";
import { jsonLd, localeUrl, pageCopy, pageGraph, routeMetadata } from "@/lib/seo";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return routeMetadata(locale, "/projects");
}

export default async function ProjectsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const copy = pageCopy("projects", locale);
  const url = localeUrl(locale, "/projects");
  const graph = pageGraph(locale, "/projects", {
    type: "CollectionPage",
    name: copy.title,
    description: copy.description,
    homeName: tNav("home"),
    crumbs: [{ name: tNav("projects"), path: "/projects" }],
    extra: [
      {
        "@type": "ItemList",
        "@id": `${url}#register`,
        numberOfItems: projects.length,
        itemListOrder: "https://schema.org/ItemListUnordered",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: localeUrl(locale, `/projects/${p.slug}`),
          name: getProjectText(p.slug, locale as Locale).title,
        })),
      },
    ],
  });
  return (
    <>
      <ListingLd json={jsonLd(graph)} />
      {children}
    </>
  );
}
