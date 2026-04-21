import type { Metadata } from "next";
import { locales } from "@/i18n";

const SITE_URL = "https://suv-taraqqiyot.com";

const titles: Record<string, string> = {
  en: "About Us | 25 Years of Engineering Excellence | SUV-TARAQQIYOT LLC",
  ru: "О компании | 25 лет инженерного мастерства | СУВ-ТАРАККИЁТ ООО",
  uz: "Biz haqimizda | 25 yillik muhandislik mukammalligi | SUV-TARAQQIYOT MChJ",
  tr: "Hakkımızda | 25 Yıllık Mühendislik Mükemmelliği | SUV-TARAQQIYOT LLC",
};

const descriptions: Record<string, string> = {
  en: "SUV-TARAQQIYOT LLC — founded 2001 on NPO Wolfram. ISO 9001, 14001, 45001 certified. 50+ engineers. Delivering hydrogeological drilling and water supply construction across Uzbekistan.",
  ru: "ООО «СУВ-ТАРАККИЁТ» — основано в 2001 году на базе НПО «Вольфрам». Сертификация ISO 9001, 14001, 45001. Более 50 инженеров. Гидрогеологическое бурение и водоснабжение.",
  uz: "SUV-TARAQQIYOT MChJ — 2001 yilda NPO Wolfram bazasida tashkil etilgan. ISO 9001, 14001, 45001 sertifikatlangan. 50+ muhandis. Gidrogeologik burg'ulash va suv ta'minoti.",
  tr: "SUV-TARAQQIYOT LLC — 2001 yılında NPO Wolfram temelinde kuruldu. ISO 9001, 14001, 45001 sertifikalı. 50'yi aşkın mühendis. Sondaj ve su temini inşaatı.",
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
      canonical: `${SITE_URL}/${locale}/about`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${SITE_URL}/${l}/about`]),
        ["x-default", `${SITE_URL}/en/about`],
      ]),
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${SITE_URL}/${locale}/about`,
      type: "website",
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
