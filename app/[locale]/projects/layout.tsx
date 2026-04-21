import type { Metadata } from "next";
import { locales } from "@/i18n";

const SITE_URL = "https://suv-taraqqiyot.com";

const titles: Record<string, string> = {
  en: "Project Portfolio | 20 Water Infrastructure Projects | SUV-TARAQQIYOT LLC",
  ru: "Портфель проектов | 20 объектов водной инфраструктуры | СУВ-ТАРАККИЁТ",
  uz: "Loyihalar portfeli | 20 suv infratuzilmasi loyihasi | SUV-TARAQQIYOT",
  tr: "Proje Portföyü | 20 Su Altyapı Projesi | SUV-TARAQQIYOT LLC",
};

const descriptions: Record<string, string> = {
  en: "20 completed and ongoing water infrastructure projects in Uzbekistan. Funded by World Bank, EBRD, ADB, OPEC Fund. Total value $57M+. Drilling, pipeline, and distribution systems.",
  ru: "20 реализованных проектов водоснабжения в Узбекистане. Финансирование: Всемирный банк, ЕБРР, АБР, Фонд ОПЕК. Объём $57M+. Бурение скважин, трубопроводы, водораспределение.",
  uz: "O'zbekistonda 20 ta suv infratuzilmasi loyihasi. Jahon banki, EBRD, ADB, OPEC Fondi tomonidan moliyalashtirilgan. Umumiy qiymati $57M+. Qudruq, quvur va taqsimlash tizimlari.",
  tr: "Özbekistan'da 20 su altyapı projesi. Dünya Bankası, EBRD, ADB ve OPEC Fonu tarafından finanse edildi. Toplam değer 57 milyon doları aşıyor.",
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
      canonical: `${SITE_URL}/${locale}/projects`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${SITE_URL}/${l}/projects`]),
        ["x-default", `${SITE_URL}/en/projects`],
      ]),
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${SITE_URL}/${locale}/projects`,
      type: "website",
    },
  };
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
