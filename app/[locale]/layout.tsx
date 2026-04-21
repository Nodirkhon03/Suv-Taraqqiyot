import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import "../globals.css";

const SITE_URL = "https://suv-taraqqiyot.com";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
});

const ogLocales: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  uz: "uz_UZ",
  tr: "tr_TR",
};

const pageTitles: Record<string, string> = {
  en: "SUV-TARAQQIYOT LLC | Water Well Drilling & Infrastructure Construction, Uzbekistan",
  ru: "СУВ-ТАРАККИЁТ ООО | Бурение скважин и строительство водоснабжения, Узбекистан",
  uz: "SUV-TARAQQIYOT MChJ | Qudruq burg'ulash va suv ta'minoti qurilishi, O'zbekiston",
  tr: "SUV-TARAQQIYOT LLC | Su Kuyusu Sondajı ve Altyapı İnşaatı, Özbekistan",
};

const pageDescriptions: Record<string, string> = {
  en: "Leading contractor for artesian well drilling (up to 1200m), water pipeline construction (200km/year), and water supply systems in Uzbekistan since 2001. World Bank & EBRD certified projects.",
  ru: "Ведущий подрядчик по бурению гидрогеологических и артезианских скважин (до 1200м), строительству водопровода (200 км/год) и систем водоснабжения в Узбекистане с 2001 года. Проекты Всемирного банка и ЕБРР.",
  uz: "O'zbekistonda artezian qudruq burg'ulash (1200 m gacha), suv quvurlari qurilishi (yiliga 200 km) va suv ta'minoti tizimlarini yaratishda yetakchi pudratchi. 2001 yildan beri Jahon banki va EBRD loyihalari.",
  tr: "Özbekistan'da 2001'den bu yana artezyen kuyu sondajı (1200m'ye kadar), su boru hattı inşaatı ve su dağıtım sistemleri alanında lider müteahhit. Dünya Bankası ve EBRD projeleri.",
};

const keywordsByLocale: Record<string, string[]> = {
  en: [
    "water well drilling Uzbekistan",
    "artesian well drilling Tashkent",
    "hydrogeological drilling contractor",
    "water supply construction Uzbekistan",
    "water pipeline construction Central Asia",
    "civil engineering contractor Uzbekistan",
    "water infrastructure Uzbekistan",
    "borehole drilling company Uzbekistan",
    "water tower construction",
    "EBRD contractor Uzbekistan",
    "World Bank contractor Uzbekistan",
  ],
  ru: [
    "бурение скважин Узбекистан",
    "гидрогеологическое бурение Ташкент",
    "артезианская скважина Узбекистан",
    "строительство водопровода Узбекистан",
    "водоснабжение строительство",
    "буровые работы Узбекистан",
    "водораспределительная система",
    "скважина на воду Ташкент",
    "подрядчик водоснабжение Узбекистан",
    "водонапорная башня строительство",
  ],
  uz: [
    "qudruq burg'ulash Toshkent",
    "suv ta'minoti qurilishi O'zbekiston",
    "artezian qudruq O'zbekiston",
    "gidrogeologik burg'ulash",
    "suv quvuri qurilishi",
    "suv infratuzilmasi O'zbekiston",
    "suv minorasi qurilishi",
    "бурғулаш компанияси Тошкент",
    "сув таъминоти қурилиши",
    "артезиан қудруқ Ўзбекистон",
  ],
  tr: [
    "su kuyusu sondajı Özbekistan",
    "artezyen kuyu Taşkent",
    "hidrojeolojik sondaj",
    "su temini inşaatı",
    "su boru hattı Özbekistan",
  ],
};

function buildLanguages(path: string) {
  return {
    en: `${SITE_URL}/en${path}`,
    ru: `${SITE_URL}/ru${path}`,
    uz: `${SITE_URL}/uz${path}`,
    tr: `${SITE_URL}/tr${path}`,
    "x-default": `${SITE_URL}/en${path}`,
  };
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const title = pageTitles[locale] || pageTitles.en;
  const description = pageDescriptions[locale] || pageDescriptions.en;
  const keywords = keywordsByLocale[locale] || keywordsByLocale.en;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    applicationName: "SUV-TARAQQIYOT LLC",
    authors: [{ name: "SUV-TARAQQIYOT LLC" }],
    creator: "SUV-TARAQQIYOT LLC",
    publisher: "SUV-TARAQQIYOT LLC",
    icons: {
      icon: "/images/logo-light.png",
      apple: "/images/logo-light.png",
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      locale: ogLocales[locale] || "en_US",
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      type: "website",
      siteName: "SUV-TARAQQIYOT LLC",
      images: [
        {
          url: "/images/logo-main.png",
          width: 800,
          height: 600,
          alt: "SUV-TARAQQIYOT LLC",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/logo-main.png"],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: buildLanguages(""),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      yandex: "bfb5d02934a406e9",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SUV-TARAQQIYOT LLC",
    alternateName: [
      "СУВ-ТАРАККИЁТ МЧЖ",
      "Suv-Taraqqiyot MChJ",
      "СУВ-ТАРАККИЁТ ООО",
      "СУВ-ТАРАКҚИЁТ",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-main.png`,
    foundingDate: "2001-08-21",
    description:
      "Leading contractor for hydrogeological well drilling and water supply construction in Uzbekistan. Бурение артезианских скважин. Қудруқ бурғулаш.",
    telephone: "+998998474000",
    email: "office@suv-taraqqiyot.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "18 Khusan Shams Street",
      addressLocality: "Tashkent",
      addressRegion: "Mirzo-Ulugbek District",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.3111,
      longitude: 69.2797,
    },
    areaServed: {
      "@type": "Country",
      name: "Uzbekistan",
    },
    knowsAbout: [
      "Hydrogeological well drilling",
      "Artesian well drilling",
      "Water supply construction",
      "Water pipeline installation",
      "Water distribution systems",
      "Бурение артезианских скважин",
      "Строительство водоснабжения",
      "Гидрогеологическое бурение",
      "Qudruq burg'ulash",
      "Suv ta'minoti qurilishi",
      "Artezian qudruq",
      "Қудруқ бурғулаш",
      "Сув таъминоти қурилиши",
    ],
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50 },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "ISO 9001:2015 Quality Management",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "ISO 14001:2019 Environmental Management",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "ISO 45001:2020 Health & Safety",
      },
    ],
    sameAs: ["https://watec-insaat.com"],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "SUV-TARAQQIYOT LLC",
    image: `${SITE_URL}/images/logo-main.png`,
    url: SITE_URL,
    priceRange: "$$$",
    telephone: "+998998474000",
    email: "office@suv-taraqqiyot.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "18 Khusan Shams Street",
      addressLocality: "Tashkent",
      addressRegion: "Mirzo-Ulugbek District",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.3111,
      longitude: 69.2797,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: { "@type": "Country", name: "Uzbekistan" },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: "SUV-TARAQQIYOT LLC",
    inLanguage: ["en", "ru", "uz", "tr"],
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-inter bg-white text-gray-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
        >
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={locale} />
          <main id="main-content" className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
