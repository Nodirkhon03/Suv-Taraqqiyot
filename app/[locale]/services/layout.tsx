import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ORG_ID, inLanguage, jsonLd, localeUrl, pageCopy, pageGraph, routeMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n";

/* Same order as the page: civil engineering first, wells last. */
const SERVICE_KEYS = ["pipes", "facilities", "towers", "civil", "wells"] as const;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return routeMetadata(locale, "/services");
}

export default async function ServicesLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const copy = pageCopy("services", locale);
  const url = localeUrl(locale, "/services");

  const services = SERVICE_KEYS.map((key) => ({
    "@type": "Service",
    "@id": `${url}#${key}`,
    url: `${url}#${key}`,
    name: t(`items.${key}.title`),
    serviceType: t(`items.${key}.short`),
    description: t(`items.${key}.desc`),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    inLanguage: inLanguage[locale as Locale],
  }));

  const graph = pageGraph(locale, "/services", {
    name: copy.title,
    description: copy.description,
    homeName: tNav("home"),
    crumbs: [{ name: tNav("services"), path: "/services" }],
    extra: [
      {
        "@type": "ItemList",
        "@id": `${url}#services`,
        name: t("hero.title"),
        numberOfItems: services.length,
        itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, item: s })),
      },
    ],
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      {children}
    </>
  );
}
