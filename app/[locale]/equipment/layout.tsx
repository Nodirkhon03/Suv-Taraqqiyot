import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { jsonLd, pageCopy, pageGraph, routeMetadata } from "@/lib/seo";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return routeMetadata(locale, "/equipment");
}

export default async function EquipmentLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const copy = pageCopy("equipment", locale);
  const graph = pageGraph(locale, "/equipment", {
    type: "CollectionPage",
    name: copy.title,
    description: copy.description,
    homeName: tNav("home"),
    crumbs: [{ name: tNav("equipment"), path: "/equipment" }],
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      {children}
    </>
  );
}
