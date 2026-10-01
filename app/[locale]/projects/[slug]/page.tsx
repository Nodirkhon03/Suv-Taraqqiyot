import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { locales, type Locale } from "@/i18n";
import { ORG_ID, inLanguage, jsonLd, localeUrl, pageGraph, pageMetadata, projectMetaTitle } from "@/lib/seo";
import PageHero from "@/components/pages/PageHero";
import ClosingCta from "@/components/home/ClosingCta";
import { getProjectText } from "@/lib/content/projects-i18n";
import { contractLabel, formatMillions, millions } from "@/lib/format";


export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const p of projects) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

/** "2019–2021" → "2019/2021", "2022–present" → "2022/..", "2012" → "2012" (ISO 8601 interval). */
function isoYears(year: string): string {
  const [from, to] = year.split("–");
  if (!to) return from;
  return `${from}/${to === "present" ? ".." : to}`;
}

/** Region (English, for structured data) from the ledger's English location, or undefined. */
function regionOf(location: string): string | undefined {
  const m = location.match(/([A-Za-z]+) Region/);
  if (m) return `${m[1]} Region`;
  if (/Namangan City/.test(location)) return "Namangan Region";
  if (/Yangiyul/.test(location)) return "Tashkent Region";
  if (/Tashkent/.test(location)) return "Tashkent";
  return undefined;
}

/** Cut at a word boundary so the description stays within `max` characters. */
function clip(text: string, max = 160): string {
  if (Array.from(text).length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:·—–-]+$/, "")}…`;
}

async function projectSummary(locale: string, slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return undefined;
  const t = await getTranslations({ locale, namespace: "projectDetailPage" });
  const text = getProjectText(slug, locale as Locale);
  const years = project.year.replace("present", t("present"));
  const value = t("amount", { amount: formatMillions(millions(project.amount), locale) });
  const role = t(project.role === "General Contractor" ? "roles.general" : "roles.sub");
  return { project, text, years, value, role };
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const s = await projectSummary(locale, slug);
  if (!s) return {};
  const title = projectMetaTitle(locale, s.text);
  const description = clip(`${s.text.location} · ${s.years} · ${s.value}. ${s.text.description || s.role}`);
  return pageMetadata(locale, `/projects/${slug}`, { title, description, imageAlt: s.text.title });
}

export default async function ProjectDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "projectDetailPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const summary = (await projectSummary(locale, slug))!;
  const path = `/projects/${slug}`;
  const pageUrl = localeUrl(locale, path);
  const region = regionOf(project.location);
  const amountUsd = Math.round(millions(project.amount) * 1_000_000);
  const graph = pageGraph(locale, path, {
    type: "ItemPage",
    name: summary.text.title,
    description: summary.text.description || summary.text.title,
    homeName: tNav("home"),
    crumbs: [
      { name: tNav("projects"), path: "/projects" },
      { name: summary.text.title, path },
    ],
    extra: [
      {
        /* schema.org has no construction-project type: a CreativeWork (the delivered work),
           created by the company, commissioned by the client (sponsor = employer), with the IFI as
           funder only where the project has one. The contract value is a plain PropertyValue: it is
           the price of a works contract with the employer, not a grant (no MonetaryGrant/funding). */
        "@type": "CreativeWork",
        "@id": `${pageUrl}#project`,
        url: pageUrl,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        name: summary.text.title,
        description: summary.text.description || summary.text.title,
        inLanguage: inLanguage[locale as Locale],
        temporalCoverage: isoYears(project.year),
        creativeWorkStatus: project.status === "ongoing" ? "Ongoing" : "Completed",
        locationCreated: {
          "@type": "Place",
          name: summary.text.location,
          address: {
            "@type": "PostalAddress",
            ...(region ? { addressRegion: region } : {}),
            addressCountry: "UZ",
          },
        },
        /* schema.org Role pattern: the company, in its contractual role on this project. */
        creator: { "@type": "Role", roleName: summary.role, creator: { "@id": ORG_ID } },
        sponsor: { "@type": "Organization", name: summary.text.client },
        ...(summary.text.funder ? { funder: { "@type": "Organization", name: summary.text.funder } } : {}),
        additionalProperty: {
          "@type": "PropertyValue",
          name: t("value"),
          value: amountUsd,
          unitCode: "USD",
          unitText: "USD",
        },
        ...(project.contractNumber ? { identifier: contractLabel(project.contractNumber, locale) } : {}),
      },
    ],
  });

  const text = getProjectText(slug, locale as Locale);
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;
  const ongoing = project.status === "ongoing";
  const years = project.year.replace("present", t("present"));
  const role = t(project.role === "General Contractor" ? "roles.general" : "roles.sub");
  const value = t("amount", { amount: formatMillions(millions(project.amount), locale) });

  /* Title block: label/value cells. `wide` cells span both columns. */
  const facts: { key: string; label: string; value: React.ReactNode; className?: string; wide?: boolean }[] = [
    { key: "value", label: t("value"), value, className: "val" },
    {
      key: "status",
      label: t("status"),
      value: (
        <span className={ongoing ? "st-l" : "st-l done"}>
          <i aria-hidden="true" />
          {t(ongoing ? "ongoing" : "completed")}
        </span>
      ),
    },
    { key: "years", label: t("years"), value: years, className: "mono" },
    { key: "role", label: t("role"), value: role },
    { key: "region", label: t("region"), value: text.location, wide: true },
    { key: "client", label: t("client"), value: text.client, wide: true },
    ...(text.funder ? [{ key: "funder", label: t("funder"), value: text.funder, wide: true }] : []),
    ...(project.contractNumber
      ? [{ key: "contract", label: t("contract"), value: contractLabel(project.contractNumber, locale), className: "mono" }]
      : []),
    ...(project.amountUzs ? [{ key: "uzs", label: t("valueUzs"), value: project.amountUzs, className: "mono" }] : []),
  ];
  /* Half-width cells pair up; an unpaired one before a wide cell (or at the end) spans the row. */
  let run = 0;
  facts.forEach((f, i) => {
    if (f.wide) {
      run = 0;
      return;
    }
    run++;
    const nextWide = i === facts.length - 1 || facts[i + 1].wide;
    if (nextWide && run % 2 === 1) f.wide = true;
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      <PageHero
        kicker={
          <>
            <Link href={`/${locale}/projects`}>← {t("back")}</Link>
            <span aria-hidden="true">·</span>
            <span>{t("position", { n: index + 1, total: projects.length })}</span>
          </>
        }
        title={text.title}
        lead={`${text.location} · ${years} · ${role}`}
      >
        <div className="cta-row">
          <Link className="btn btn-white" href={`/${locale}/contact`}>
            {t("cta")}
          </Link>
        </div>
      </PageHero>

      <section className="sec" aria-labelledby="facts-title">
        <div className="wrap">
          <div className="pd">
            <div className="pd-facts">
              <h2 className="tb-cap" id="facts-title">
                {t("factsTitle")}
              </h2>
              <dl className="tb">
                {facts.map((f) => (
                  <div key={f.key} className={f.wide ? "wide" : undefined}>
                    <dt>{f.label}</dt>
                    <dd className={f.className}>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="pd-text">
              {text.description && (
                <>
                  <h2 className="svc-sub">{t("description")}</h2>
                  <p>{text.description}</p>
                </>
              )}
              {text.scope.length > 0 && (
                <>
                  <h2 className="svc-sub">{t("scope")}</h2>
                  <ol className="scope">
                    {text.scope.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          </div>

          <nav className="pager" aria-label={t("back")}>
            {prev && (
              <Link href={`/${locale}/projects/${prev.slug}`} rel="prev">
                <b>← {t("prev")}</b>
                <span>{getProjectText(prev.slug, locale as Locale).title}</span>
              </Link>
            )}
            {next && (
              <Link className="nx" href={`/${locale}/projects/${next.slug}`} rel="next">
                <b>{t("next")} →</b>
                <span>{getProjectText(next.slug, locale as Locale).title}</span>
              </Link>
            )}
          </nav>
        </div>
      </section>

      <ClosingCta locale={locale} title={t("closingTitle")} button={t("cta")} />
    </>
  );
}
