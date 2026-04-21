import type { Metadata } from "next";
import { locales } from "@/i18n";

const SITE_URL = "https://suv-taraqqiyot.com";

const titles: Record<string, string> = {
  en: "Contact Us | Tashkent, Uzbekistan | SUV-TARAQQIYOT LLC",
  ru: "Контакты | Ташкент, Узбекистан | СУВ-ТАРАККИЁТ ООО",
  uz: "Aloqa | Toshkent, O'zbekiston | SUV-TARAQQIYOT MChJ",
  tr: "İletişim | Taşkent, Özbekistan | SUV-TARAQQIYOT LLC",
};

const descriptions: Record<string, string> = {
  en: "Contact SUV-TARAQQIYOT LLC for water well drilling, water supply construction, and civil engineering services in Uzbekistan. Based in Tashkent. Response within 24 hours.",
  ru: "Свяжитесь с ООО «СУВ-ТАРАККИЁТ» по вопросам бурения скважин, строительства водоснабжения и гражданского строительства в Узбекистане. Офис в Ташкенте. Ответ в течение 24 часов.",
  uz: "Qudruq burg'ulash, suv ta'minoti qurilishi va muhandislik xizmatlari bo'yicha SUV-TARAQQIYOT MChJ bilan bog'laning. Toshkentda. 24 soat ichida javob.",
  tr: "Su kuyusu sondajı, su temini inşaatı ve inşaat mühendisliği hizmetleri için SUV-TARAQQIYOT LLC ile iletişime geçin. Taşkent merkezli. 24 saat içinde yanıt.",
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
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${SITE_URL}/${l}/contact`]),
        ["x-default", `${SITE_URL}/en/contact`],
      ]),
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${SITE_URL}/${locale}/contact`,
      type: "website",
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
