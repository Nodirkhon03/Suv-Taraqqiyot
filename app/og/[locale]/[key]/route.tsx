import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { projects } from "@/lib/projects";
import { getProjectText } from "@/lib/content/projects-i18n";
import { formatMillions, millions } from "@/lib/format";
import { renderOg } from "@/lib/og";
import { BRAND, ROUTES, pageCopy, routeKey, type PageKey } from "@/lib/seo";
import uz from "@/messages/uz.json";
import ru from "@/messages/ru.json";
import en from "@/messages/en.json";
import tr from "@/messages/tr.json";

/* /og/<locale>/<key>.png — one card per page per locale, rendered once at build. */
export const dynamic = "force-static";
export const dynamicParams = false;

const messages = { uz, ru, en, tr } as const;

const FACTS: Record<Locale, string> = {
  uz: "2001-yildan · 12 hudud · 20 loyiha · $55M+ · Oʻz DSt ISO 9001/14001/45001",
  ru: "С 2001 года · 12 регионов · 20 проектов · $55M+ · O‘z DSt ISO 9001/14001/45001",
  en: "Since 2001 · 12 regions · 20 projects · $55M+ · O‘z DSt ISO 9001/14001/45001",
  tr: "2001’den beri · 12 bölge · 20 proje · $55M+ · O‘z DSt ISO 9001/14001/45001",
};

const PAGE_KEYS = ROUTES.map(routeKey);

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...PAGE_KEYS.map((k) => ({ locale, key: `${k}.png` })),
    ...projects.map((p) => ({ locale, key: `projects-${p.slug}.png` })),
  ]);
}

export async function GET(_req: Request, { params }: { params: { locale: string; key: string } }) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale) || !params.key.endsWith(".png")) notFound();
  const key = params.key.slice(0, -4);
  const m = messages[locale];
  const brand = BRAND[locale];

  let card;
  if (key.startsWith("projects-")) {
    const project = projects.find((p) => `projects-${p.slug}` === key);
    if (!project) notFound();
    const text = getProjectText(project.slug, locale);
    const years = project.year.replace("present", m.projectDetailPage.present);
    const value = m.projectDetailPage.amount.replace("{amount}", formatMillions(millions(project.amount), locale));
    card = {
      kicker: `${m.nav.projects} · ${years}`,
      title: text.title,
      sub: [text.location, value, text.funder].filter(Boolean).join(" · "),
      brand,
      wrapSub: true,
    };
  } else if ((PAGE_KEYS as string[]).includes(key)) {
    const page = key as PageKey;
    const copy = pageCopy(page, locale);
    card = {
      kicker: page === "home" ? copy.title.split(" | ")[0] : page === "about" ? m.site.nav.company : m.site.nav[page],
      title: copy.og,
      sub: FACTS[locale],
      brand,
      home: page === "home",
    };
  } else {
    notFound();
  }

  return renderOg(card);
}
