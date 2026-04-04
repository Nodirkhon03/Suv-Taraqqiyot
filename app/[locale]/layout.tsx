import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
});

const localeNames: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  uz: "uz_UZ",
  tr: "tr_TR",
};

const pageTitles: Record<string, string> = {
  en: "SUV-Taraqqiyot LLC — Water Infrastructure & Hydrogeological Drilling",
  ru: "SUV-Taraqqiyot — Водная инфраструктура и гидрогеологическое бурение",
  uz: "SUV-Taraqqiyot MChJ — Suv infratuzilmasi va gidrogeologik burg'ulash",
  tr: "SUV-Taraqqiyot LLC — Su Altyapısı ve Hidrojeolojik Sondaj",
};

const pageDescriptions: Record<string, string> = {
  en: "Hydrogeological well drilling and water supply construction in Uzbekistan since 2001. 15 projects, $54M+ delivered. ISO 9001, 14001, 45001 certified.",
  ru: "Гидрогеологическое бурение скважин и строительство систем водоснабжения в Узбекистане с 2001 года. 15 проектов, $54M+ реализовано. Сертификация ISO.",
  uz: "2001 yildan buyon O'zbekistonda gidrogeologik quduq burg'ulash va suv ta'minoti qurilishi. 15 loyiha, $54M+ amalga oshirilgan. ISO sertifikatlangan.",
  tr: "2001'den bu yana Özbekistan'da hidrojeolojik kuyu sondajı ve su temini inşaatı. 15 proje, 54M$+ teslim edildi. ISO 9001, 14001, 45001 sertifikalı.",
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return {
    title: pageTitles[locale] || pageTitles.en,
    description: pageDescriptions[locale] || pageDescriptions.en,
    icons: {
      icon: "/images/logo-light.png",
      apple: "/images/logo-light.png",
    },
    openGraph: {
      title: pageTitles[locale] || pageTitles.en,
      description: pageDescriptions[locale] || pageDescriptions.en,
      locale: localeNames[locale] || "en_US",
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeNames[l]),
      type: "website",
      siteName: "SUV-Taraqqiyot LLC",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}`])
      ),
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SUV-TARAQQIYOT LLC",
    url: "https://suv-taraqqiyot.com",
    foundingDate: "2001-08-21",
    description:
      "Hydrogeological well drilling and water supply infrastructure construction in Uzbekistan.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Khusan Shams street, 18 building",
      addressLocality: "Tashkent",
      addressRegion: "Mirzo Ulugbek district",
      addressCountry: "UZ",
    },
    sameAs: [],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 50,
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "ISO 9001:2015",
        name: "Quality Management System",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "ISO 14001:2019",
        name: "Environmental Management System",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "ISO 45001:2020",
        name: "Occupational Health & Safety Management System",
      },
    ],
  };

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        {locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`https://suv-taraqqiyot.com/${l}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://suv-taraqqiyot.com/uz"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
