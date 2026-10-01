import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";
import { SITE_URL } from "@/lib/site";
import { jsonLd, routeMetadata, siteGraph } from "@/lib/seo";


/* Plex covers uz Latin, ru Cyrillic and tr. ʻ ʼ come from the "Okina" subset in globals.css.
   `subsets` decides what is PRELOADED; every subset stays available through unicode-range.
   Preloading all 3 subsets made 9 font requests compete with the HTML on mobile; now 3 latin
   files are preloaded (Sans variable + Mono 400/500, both used above the fold — not preloading
   Mono caused CLS 0.15 on /projects). Cyrillic and latin-ext load on first use. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
    ...routeMetadata(locale, ""),
    applicationName: "SUV-TARAQQIYOT",
    authors: [{ name: "SUV-TARAQQIYOT LLC", url: SITE_URL }],
    creator: "SUV-TARAQQIYOT LLC",
    publisher: "SUV-TARAQQIYOT LLC",
    formatDetection: { telephone: false, email: false, address: false },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: "/favicon.svg",
      apple: "/images/logo-light.png",
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
      ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
        ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
        : {}),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B2B43",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const tSite = await getTranslations({ locale, namespace: "site" });

  return (
    <html lang={locale} className={`${plexSans.variable} ${plexMono.variable}`}>
      <head>
        {/* 1 KB: ʻ ʼ glyphs used in every Uzbek heading; preloaded so the swap cannot shift text. */}
        <link rel="preload" href="/fonts/okina-sourceserif4.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteGraph(locale)) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip">
          {tSite("skip")}
        </a>
        {/* No site-wide NextIntlClientProvider: every component is server-rendered except the contact
            form, which gets its own provider with only its namespace (app/[locale]/contact/page.tsx). */}
        <Header locale={locale} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
