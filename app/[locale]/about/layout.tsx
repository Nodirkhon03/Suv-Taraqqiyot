import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { jsonLd, pageCopy, pageGraph, routeMetadata } from "@/lib/seo";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return routeMetadata(locale, "/about");
}

export default async function AboutLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const copy = pageCopy("about", locale);
  const graph = pageGraph(locale, "/about", {
    type: "AboutPage",
    name: copy.title,
    description: copy.description,
    homeName: tNav("home"),
    crumbs: [{ name: tNav("about"), path: "/about" }],
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      {children}
    </>
  );
}
