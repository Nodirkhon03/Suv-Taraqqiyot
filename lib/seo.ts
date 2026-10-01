import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n";
import { EMAIL, SITE_URL } from "@/lib/site";
import { equipment } from "@/lib/equipment";

/*
 * One place for canonical, hreflang, Open Graph, page copy and the site-wide JSON-LD graph.
 * Next merges metadata shallowly: a page that set only `title` used to inherit the layout's
 * `alternates` and `openGraph` whole, so inner pages declared themselves to be the home page.
 * Every route now calls pageMetadata() with its own path.
 *
 * Copy rules: civil engineering first; Uzbek Latin with ʻ (U+02BB) and ʼ (U+02BC), never ASCII ';
 * no superlatives; only figures from the company presentation and lib/projects.ts.
 */

export const ROUTES = ["", "/about", "/services", "/equipment", "/projects", "/contact"] as const;
export type RoutePath = (typeof ROUTES)[number];
export type PageKey = "home" | "about" | "services" | "equipment" | "projects" | "contact";

export const routeKey = (path: RoutePath): PageKey => (path === "" ? "home" : (path.slice(1) as PageKey));

/** Date of the last content change, used as sitemap lastModified. Bump it when content changes. */
export const CONTENT_UPDATED = "2026-10-01";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const ogLocales: Record<Locale, string> = { uz: "uz_UZ", ru: "ru_RU", en: "en_US", tr: "tr_TR" };
export const inLanguage: Record<Locale, string> = { uz: "uz-Latn", ru: "ru", en: "en", tr: "tr" };

export const BRAND: Record<Locale, string> = {
  uz: "SUV-TARAQQIYOT",
  ru: "СУВ-ТАРАККИЁТ",
  en: "SUV-TARAQQIYOT",
  tr: "SUV-TARAQQIYOT",
};

export const LEGAL_NAME: Record<Locale, string> = {
  uz: "“SUV-TARAQQIYOT” MChJ",
  ru: "ООО «СУВ-ТАРАККИЁТ»",
  en: "SUV-TARAQQIYOT LLC",
  tr: "SUV-TARAQQIYOT LLC",
};

export const localeUrl = (locale: string, path = "") => `${SITE_URL}/${locale}${path}`;

export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((l) => [l, localeUrl(l, path)])),
    "x-default": localeUrl("en", path),
  };
}

/** /og/<locale>/<key>.png — rendered by app/og/[locale]/[key]/route.tsx at build time. */
export const ogImagePath = (locale: string, key: string) => `/og/${locale}/${key}.png`;

/** <title> for a project page: "<title> | brand" when that fits in 60 characters, otherwise the
 *  shortTitle (projects-i18n, for titles > 55 chars) or the full title. The visible H1 is unaffected. */
export function projectMetaTitle(locale: string, text: { title: string; shortTitle?: string }): string {
  const brand = BRAND[locale as Locale] ?? BRAND.en;
  const withBrand = `${text.title} | ${brand}`;
  if (Array.from(withBrand).length <= 60) return withBrand;
  return text.shortTitle ?? text.title;
}

export function pageMetadata(
  locale: string,
  path: string,
  { title, description, image, imageAlt }: { title: string; description: string; image?: string; imageAlt?: string },
): Metadata {
  const url = localeUrl(locale, path);
  const loc = (locales as readonly string[]).includes(locale) ? (locale as Locale) : "en";
  const img = image ?? ogImagePath(locale, path === "" ? "home" : path.slice(1).replace(/\//g, "-"));
  const images = [{ url: img, width: 1200, height: 630, alt: imageAlt ?? title, type: "image/png" }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: LEGAL_NAME[loc],
      title,
      description,
      url,
      locale: ogLocales[loc],
      alternateLocale: locales.filter((l) => l !== loc).map((l) => ogLocales[l]),
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

/* ─── Page copy: title ≤ 60 characters, description 140–160 where the language allows. ─── */

/** Fleet size from lib/equipment.ts, so the equipment titles never drift from the page. */
const FLEET_MODELS = equipment.length;
export function ruPlural(n: number, one: string, few: string, many: string): string {
  const d = n % 10;
  const h = n % 100;
  if (d === 1 && h !== 11) return one;
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return few;
  return many;
}

type Copy = { title: string; description: string; og: string };

export const PAGE_COPY: Record<PageKey, Record<Locale, Copy>> = {
  home: {
    uz: {
      title: "Suv taʼminoti infratuzilmasi pudratchisi | SUV-TARAQQIYOT",
      description:
        "Magistral suv quvurlari (yiliga 200 km gacha, Ø 32–1200 mm), suv olish va taqsimlash inshootlari, suv minoralari, quduqlar. 2001-yildan 12 hududda 20 loyiha.",
      og: "Suv taʼminoti infratuzilmasini quramiz",
    },
    ru: {
      title: "Строительство систем водоснабжения | СУВ-ТАРАККИЁТ",
      description:
        "Магистральные водоводы (до 200 км в год, Ø 32–1200 мм), водозаборные и водораспределительные сооружения, водонапорные башни, скважины. С 2001 года, 20 проектов.",
      og: "Строим инфраструктуру водоснабжения",
    },
    en: {
      title: "Water Supply Contractor in Uzbekistan | SUV-TARAQQIYOT",
      description:
        "Water mains (up to 200 km a year, Ø 32–1200 mm), intake and distribution stations, water towers, civil works, wells. Since 2001: 20 projects, $55M+, 12 regions.",
      og: "We build water supply infrastructure",
    },
    tr: {
      title: "Özbekistan’da su temini altyapısı | SUV-TARAQQIYOT",
      description:
        "Ana su boru hatları (yılda 200 km’ye kadar, Ø 32–1200 mm), su alma ve dağıtım tesisleri, su kuleleri, inşaat işleri, kuyular. 2001’den beri 12 bölgede 20 proje.",
      og: "Su temini altyapısı inşa ediyoruz",
    },
  },
  about: {
    uz: {
      title: "Kompaniya: 2001-yildan suv inshootlari | SUV-TARAQQIYOT",
      description:
        "“SUV-TARAQQIYOT” MChJ 2001-yilda NPO Wolfram negizida tashkil etilgan. 20 loyiha ($55M+), Oʻz DSt ISO 9001, 14001, 45001, davlat idoralari tashakkurnomalari.",
      og: "2001-yildan beri suv taʼminoti inshootlarini quramiz",
    },
    ru: {
      title: "О компании: подрядчик с 2001 года | СУВ-ТАРАККИЁТ",
      description:
        "ООО «СУВ-ТАРАККИЁТ» основано в 2001 году на базе НПО «Вольфрам». 20 проектов на $55M+, сертификаты O‘z DSt ISO 9001, 14001, 45001, благодарности госорганов.",
      og: "Строим объекты водоснабжения с 2001 года",
    },
    en: {
      title: "About: water supply contractor since 2001 | SUV-TARAQQIYOT",
      description:
        "Founded in 2001 on the basis of NPO Wolfram: 20 major projects worth $55M+, O‘z DSt ISO 9001, 14001 and 45001 certificates, letters of thanks from the state.",
      og: "Building water supply facilities since 2001",
    },
    tr: {
      title: "Hakkımızda: 2001’den beri su temini | SUV-TARAQQIYOT",
      description:
        "2001’de NPO Wolfram temelinde kuruldu: toplam $55M+ değerinde 20 proje, O‘z DSt ISO 9001, 14001 ve 45001 sertifikaları, kamu kurumlarından teşekkürler.",
      og: "2001’den beri su temini tesisleri inşa ediyoruz",
    },
  },
  services: {
    uz: {
      title: "Xizmatlar: quvurlar, inshootlar, minoralar | SUV-TARAQQIYOT",
      description:
        "Magistral va taqsimlash quvurlari (Ø 32–1200 mm, yiliga 200 km gacha), suv olish inshootlari, 10–75 m³ suv minoralari, qurilish ishlari, 1200 m gacha quduqlar.",
      og: "Quvurdan quduqqacha: beshta xizmat, bitta pudratchi",
    },
    ru: {
      title: "Услуги: водоводы, сооружения, башни | СУВ-ТАРАККИЁТ",
      description:
        "Магистральные и разводящие водоводы (Ø 32–1200 мм, до 200 км в год), водозаборные сооружения, башни 10–75 м³, общестроительные работы, скважины до 1200 м.",
      og: "От водовода до скважины: пять услуг, один подрядчик",
    },
    en: {
      title: "Services: pipelines, stations, towers | SUV-TARAQQIYOT",
      description:
        "Transmission and distribution mains (Ø 32–1200 mm, up to 200 km a year), intake and distribution stations, 10–75 m³ water towers, civil works, wells to 1200 m.",
      og: "From pipeline to well: five services, one contractor",
    },
    tr: {
      title: "Hizmetler: boru hatları, tesisler, kuleler | SUV-TARAQQIYOT",
      description:
        "Ana ve dağıtım boru hatları (Ø 32–1200 mm, yılda 200 km’ye kadar), su alma ve dağıtım tesisleri, 10–75 m³ su kuleleri, inşaat işleri, 1200 m’ye kadar kuyular.",
      og: "Boru hattından kuyuya: beş hizmet, tek yüklenici",
    },
  },
  equipment: {
    uz: {
      title: `Asosiy texnika parki: ${FLEET_MODELS} ta model | SUV-TARAQQIYOT`,
      description:
        "Asosiy texnika parki, model va soni bilan: ekskavator va yuklagichlar, avtokranlar, samosvallar, PE quvur payvandlash apparatlari, burgʻulash qurilmalari.",
      og: "Oʻz texnika parki: yer ishlaridan quduq burgʻulashgacha",
    },
    ru: {
      title: `Основной парк техники: ${FLEET_MODELS} ${ruPlural(FLEET_MODELS, "модель", "модели", "моделей")} | СУВ-ТАРАККИЁТ`,
      description:
        "Основной парк техники с моделями и количеством: экскаваторы и погрузчики, автокраны, самосвалы, аппараты сварки полиэтиленовых труб, буровые установки.",
      og: "Собственный парк: от земляных работ до бурения скважин",
    },
    en: {
      title: `Core fleet: ${FLEET_MODELS} equipment models | SUV-TARAQQIYOT`,
      description:
        "Our core fleet by model and unit count: excavators and loaders, truck cranes, dump trucks, polyethylene pipe welding machines, generators and drilling rigs.",
      og: "Our own fleet: from earthworks to well drilling",
    },
    tr: {
      title: `Ana makine parkı: ${FLEET_MODELS} model | SUV-TARAQQIYOT`,
      description:
        "Ana makine parkımız, model ve adetle: ekskavatör ve yükleyiciler, mobil vinçler, damperli kamyonlar, PE boru kaynak makineleri, sondaj makineleri.",
      og: "Kendi ekipman parkımız: hafriyattan kuyu sondajına",
    },
  },
  projects: {
    uz: {
      title: "20 ta loyiha reyestri, $55M+ | SUV-TARAQQIYOT",
      description:
        "2004-yildan beri 20 yirik loyiha: buyurtmachi, moliyalashtiruvchi (YeTTB, Jahon banki, OPEK va Saudiya fondlari), yillar, rol va shartnoma qiymati. Jami $55M+.",
      og: "20 ta loyiha: buyurtmachi, moliyalashtiruvchi va qiymati bilan",
    },
    ru: {
      title: "Реестр 20 проектов на $55M+ | СУВ-ТАРАККИЁТ",
      description:
        "20 крупных проектов с 2004 года: заказчик, финансирование (ЕБРР, Всемирный банк, фонды ОПЕК и Саудовский), годы, роль и стоимость контракта. Всего $55M+.",
      og: "20 проектов — с заказчиком, финансированием и стоимостью",
    },
    en: {
      title: "Register of 20 projects worth $55M+ | SUV-TARAQQIYOT",
      description:
        "20 major projects since 2004, each with client, funder (EBRD, World Bank, OPEC Fund, Saudi Fund for Development), years, role and contract value. Total $55M+.",
      og: "20 projects — each with client, funder and contract value",
    },
    tr: {
      title: "20 projelik sicil, toplam $55M+ | SUV-TARAQQIYOT",
      description:
        "2004’ten beri 20 büyük proje: işveren, finansman (EBRD, Dünya Bankası, OPEC Fonu, Suudi Kalkınma Fonu), yıllar, rol ve sözleşme bedeli. Toplam $55M+.",
      og: "20 proje — işveren, finansman ve sözleşme bedeliyle",
    },
  },
  contact: {
    uz: {
      title: "Aloqa: loyiha boʻyicha soʻrov | SUV-TARAQQIYOT",
      description:
        "Loyiha boʻyicha soʻrov yuboring, 24 soat ichida javob beramiz. +998 55 055 37 37, info@suv-taraqqiyot.com. Xusan Shams koʻchasi, 18, Mirzo Ulugʻbek, Toshkent.",
      og: "Loyihangiz boʻyicha soʻrov yuboring",
    },
    ru: {
      title: "Контакты: запрос по проекту | СУВ-ТАРАККИЁТ",
      description:
        "Отправьте запрос по проекту, ответим за 24 часа. Телефон +998 55 055 37 37, info@suv-taraqqiyot.com. Ташкент, Мирзо-Улугбекский район, ул. Хусан Шамс, 18.",
      og: "Отправьте запрос по вашему проекту",
    },
    en: {
      title: "Contact: send a project enquiry | SUV-TARAQQIYOT",
      description:
        "Send a project enquiry and we reply within 24 hours. Phone +998 55 055 37 37, info@suv-taraqqiyot.com. 18 Khusan Shams Street, Mirzo Ulugbek District, Tashkent.",
      og: "Send an enquiry about your project",
    },
    tr: {
      title: "İletişim: proje talebi gönderin | SUV-TARAQQIYOT",
      description:
        "Projeniz için talep gönderin, 24 saat içinde yanıt veriyoruz. +998 55 055 37 37, info@suv-taraqqiyot.com. Xusan Shams Caddesi 18, Mirzo Uluğbek, Taşkent.",
      og: "Projeniz için talep gönderin",
    },
  },
};

export function pageCopy(key: PageKey, locale: string): Copy {
  return PAGE_COPY[key][(locale as Locale) in PAGE_COPY[key] ? (locale as Locale) : "en"];
}

/** Metadata for one of the six fixed routes. */
export function routeMetadata(locale: string, path: RoutePath): Metadata {
  const copy = pageCopy(routeKey(path), locale);
  return pageMetadata(locale, path, { title: copy.title, description: copy.description, imageAlt: copy.og });
}

/* ─── JSON-LD ─── */

/** JSON for a <script type="application/ld+json">; "<" is escaped so text can never close the tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const ADDRESS: Record<Locale, { streetAddress: string; addressLocality: string; addressRegion: string }> = {
  uz: { streetAddress: "Xusan Shams koʻchasi, 18", addressLocality: "Toshkent", addressRegion: "Mirzo Ulugʻbek tumani" },
  ru: { streetAddress: "ул. Хусан Шамс, 18", addressLocality: "Ташкент", addressRegion: "Мирзо-Улугбекский район" },
  en: { streetAddress: "18 Khusan Shams Street", addressLocality: "Tashkent", addressRegion: "Mirzo Ulugbek District" },
  tr: { streetAddress: "Xusan Shams Caddesi 18", addressLocality: "Taşkent", addressRegion: "Mirzo Uluğbek İlçesi" },
};

const DESCRIPTION: Record<Locale, string> = {
  uz: "Suv taʼminoti infratuzilmasi pudratchisi: magistral va taqsimlash suv quvurlari (yiliga 200 km gacha, Ø 32–1200 mm), suv olish va taqsimlash inshootlari, suv minoralari, qurilish ishlari, gidrogeologik quduqlar (1200 m gacha). 2001-yilda tashkil etilgan.",
  ru: "Подрядчик по строительству инфраструктуры водоснабжения: магистральные и разводящие водоводы (до 200 км в год, Ø 32–1200 мм), водозаборные и водораспределительные сооружения, водонапорные башни, общестроительные работы, гидрогеологические скважины (до 1200 м). Основан в 2001 году.",
  en: "Water supply infrastructure contractor: transmission and distribution pipelines (up to 200 km a year, Ø 32–1200 mm), water intake and distribution stations, water towers, civil works and hydrogeological wells (to 1200 m). Founded in 2001.",
  tr: "Su temini altyapısı yüklenicisi: ana ve dağıtım su boru hatları (yılda 200 km’ye kadar, Ø 32–1200 mm), su alma ve dağıtım tesisleri, su kuleleri, inşaat işleri ve hidrojeolojik kuyular (1200 m’ye kadar). 2001’de kuruldu.",
};

const KNOWS_ABOUT: Record<Locale, string[]> = {
  uz: [
    "Magistral suv quvurlari qurilishi",
    "Suv taqsimlash tarmoqlari",
    "Suv olish inshootlari",
    "Nasos stansiyalari",
    "Suv minoralari",
    "Qurilish ishlari",
    "Gidrogeologik quduq burgʻulash",
  ],
  ru: [
    "Строительство магистральных водоводов",
    "Разводящие сети водоснабжения",
    "Водозаборные сооружения",
    "Насосные станции",
    "Водонапорные башни",
    "Общестроительные работы",
    "Бурение гидрогеологических скважин",
  ],
  en: [
    "Water transmission main construction",
    "Water distribution networks",
    "Water intake facilities",
    "Pumping stations",
    "Water towers",
    "Civil works",
    "Hydrogeological well drilling",
  ],
  tr: [
    "Ana su boru hattı inşaatı",
    "Su dağıtım şebekeleri",
    "Su alma tesisleri",
    "Pompa istasyonları",
    "Su kuleleri",
    "İnşaat işleri",
    "Hidrojeolojik kuyu sondajı",
  ],
};

/**
 * National standards of Uzbekistan identical to the ISO standards (certificates by AVVISO CERT, 05.11.2025).
 * Never written as international "ISO 14001:2019" / "ISO 45001:2020": those editions do not exist.
 * Prefix per locale, as on the pages (messages home.certificates.std): Uzbek ʻ (U+02BB), others ‘ (U+2018).
 */
export const STD_PREFIX: Record<Locale, string> = { uz: "Oʻz DSt", ru: "O‘z DSt", en: "O‘z DSt", tr: "O‘z DSt" };
export const ISO_CERTS = [
  { code: "ISO 9001:2015", en: "Quality management system" },
  { code: "ISO 14001:2019", en: "Environmental management system" },
  { code: "ISO 45001:2020", en: "Occupational health and safety management system" },
] as const;

/** The site-wide graph: one GeneralContractor (Organization + LocalBusiness) and the WebSite. */
export function siteGraph(locale: string) {
  const loc = (locales as readonly string[]).includes(locale) ? (locale as Locale) : "en";
  const logo = {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/images/logo-main.png`,
    contentUrl: `${SITE_URL}/images/logo-main.png`,
    width: 565,
    height: 396,
    caption: "SUV-TARAQQIYOT",
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "GeneralContractor"],
        "@id": ORG_ID,
        name: LEGAL_NAME[loc],
        legalName: "“SUV-TARAQQIYOT” MChJ",
        alternateName: ["SUV-TARAQQIYOT LLC", "ООО «СУВ-ТАРАККИЁТ»", "Suv-Taraqqiyot"],
        url: localeUrl(loc),
        logo,
        image: { "@id": `${SITE_URL}/#logo` },
        description: DESCRIPTION[loc],
        foundingDate: "2001-08-21",
        taxID: "203681239",
        telephone: "+998550553737",
        email: EMAIL,
        address: { "@type": "PostalAddress", ...ADDRESS[loc], addressCountry: "UZ" },
        areaServed: { "@type": "Country", name: "Uzbekistan" },
        knowsAbout: KNOWS_ABOUT[loc],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: "+998550553737",
          email: EMAIL,
          areaServed: "UZ",
        },
        hasCredential: ISO_CERTS.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: `${STD_PREFIX[loc]} ${c.code} — ${c.en}`,
          credentialCategory: "certificate",
          recognizedBy: { "@type": "Organization", name: "AVVISO CERT LLC" },
        })),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "SUV-TARAQQIYOT",
        alternateName: "СУВ-ТАРАККИЁТ",
        inLanguage: locales.map((l) => inLanguage[l]),
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export type Crumb = { name: string; path: string };

/** WebPage + BreadcrumbList for an inner page. `crumbs` excludes Home (added here). */
export function pageGraph(
  locale: string,
  path: string,
  {
    type = "WebPage",
    name,
    description,
    homeName,
    crumbs,
    extra = [],
  }: {
    type?: string;
    name: string;
    description: string;
    homeName: string;
    crumbs: Crumb[];
    extra?: Record<string, unknown>[];
  },
) {
  const url = localeUrl(locale, path);
  const loc = (locales as readonly string[]).includes(locale) ? (locale as Locale) : "en";
  const list = [{ name: homeName, path: "" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: inLanguage[loc],
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}${ogImagePath(locale, path.slice(1).replace(/\//g, "-") || "home")}`,
          width: 1200,
          height: 630,
        },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: list.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: localeUrl(locale, c.path),
        })),
      },
      ...extra,
    ],
  };
}
