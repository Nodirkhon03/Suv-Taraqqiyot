import type { Metadata } from "next";
import { locales } from "@/i18n";

const SITE_URL = "https://suv-taraqqiyot.com";

const titles: Record<string, string> = {
  en: "Drilling & Water Infrastructure Services | SUV-TARAQQIYOT LLC, Uzbekistan",
  ru: "Услуги бурения и водной инфраструктуры | СУВ-ТАРАККИЁТ ООО, Узбекистан",
  uz: "Burg'ulash va suv infratuzilmasi xizmatlari | SUV-TARAQQIYOT MChJ, O'zbekiston",
  tr: "Sondaj ve Su Altyapı Hizmetleri | SUV-TARAQQIYOT LLC, Özbekistan",
};

const descriptions: Record<string, string> = {
  en: "Hydrogeological well drilling to 1200m depth. Water pipelines 32-1200mm diameter. Water distribution 300-30,000 m³/day. Civil engineering and site preparation across Uzbekistan.",
  ru: "Бурение гидрогеологических скважин до 1200м. Водопроводы диаметром 32-1200мм. Водораспределение 300-30 000 м³/сут. Гражданское строительство по всему Узбекистану.",
  uz: "1200 m chuqurlikkacha gidrogeologik qudruq burg'ulash. 32-1200 mm diametrli suv quvurlari. Kuniga 300-30 000 m³ suv taqsimlash. Muhandislik qurilishi.",
  tr: "1200 m derinliğe kadar hidrojeolojik kuyu sondajı. 32-1200 mm çaplı su boru hatları. Günlük 300-30.000 m³ su dağıtımı. İnşaat mühendisliği.",
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
      canonical: `${SITE_URL}/${locale}/services`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${SITE_URL}/${l}/services`]),
        ["x-default", `${SITE_URL}/en/services`],
      ]),
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${SITE_URL}/${locale}/services`,
      type: "website",
    },
  };
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
