import type { Metadata } from "next";
import { locales } from "@/i18n";

const SITE_URL = "https://suv-taraqqiyot.com";

const titles: Record<string, string> = {
  en: "Construction Equipment & Drilling Rigs Fleet | SUV-TARAQQIYOT LLC",
  ru: "Строительная техника и буровые установки | СУВ-ТАРАККИЁТ ООО",
  uz: "Qurilish texnikasi va burg'ulash uskunalari | SUV-TARAQQIYOT MChJ",
  tr: "İnşaat Ekipmanları ve Sondaj Makineleri | SUV-TARAQQIYOT LLC",
};

const descriptions: Record<string, string> = {
  en: "30+ units of drilling rigs (URB, YDZ1500, UKS), truck cranes, Hyundai excavators, HDPE pipe fusion machines, and specialized tools for water infrastructure projects in Uzbekistan.",
  ru: "Более 30 единиц техники: буровые установки (УРБ, ЙДЗ1500, УКС), автокраны, экскаваторы Hyundai, сварочные машины для ПЭ труб. Для проектов водоснабжения в Узбекистане.",
  uz: "30+ texnika: burg'ulash uskunalari (URB, YDZ1500, UKS), avtokranlar, Hyundai ekskavatorlari, HDPE quvur payvandlash mashinalari. O'zbekiston loyihalari uchun.",
  tr: "30'dan fazla ekipman: sondaj makineleri (URB, YDZ1500, UKS), vinç kamyonları, Hyundai ekskavatörler, HDPE boru kaynak makineleri.",
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/equipment`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${SITE_URL}/${l}/equipment`]),
        ["x-default", `${SITE_URL}/en/equipment`],
      ]),
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${SITE_URL}/${locale}/equipment`,
      type: "website",
    },
  };
}

export default function EquipmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
