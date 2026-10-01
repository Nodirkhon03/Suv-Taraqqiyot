import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";
import PageHero from "@/components/pages/PageHero";
import SectionHead from "@/components/home/SectionHead";
import ClosingCta from "@/components/home/ClosingCta";
import ProjectMapLazy from "@/components/pages/ProjectMapLazy";
import type { MapPoint } from "@/components/ProjectMap";
import { projects, type Project } from "@/lib/projects";
import { getProjectText } from "@/lib/content/projects-i18n";
import { formatMillions, millions, sumMillions } from "@/lib/format";

const CATEGORIES = ["infrastructure", "drilling"] as const;

/**
 * The full 20-project register. The type filter works without JavaScript: each filter is a link to
 * an empty anchor placed before the table, and CSS (:target ~ …) hides the other rows and swaps the
 * sum line. The Leaflet map below is optional and loads only when scrolled near.
 */
export default async function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const tSite = await getTranslations({ locale, namespace: "site" });
  const loc = locale as Locale;

  const years = (p: Project) => p.year.replace("present", t("register.present"));
  const value = (n: number) => t("register.amount", { amount: formatMillions(n, locale) });

  const rows = projects.map((p) => {
    const text = getProjectText(p.slug, loc);
    return { p, text, years: years(p), value: value(millions(p.amount)) };
  });

  const done = projects.filter((p) => p.status === "completed").length;
  const ongoing = projects.length - done;

  /* Only projects with one stated site get a pin (lib/projects.ts `coordinates`); the rest are
     named in the note under the map frame and listed in the register above. */
  const points: MapPoint[] = rows.flatMap(({ p, text, years: y, value: v }) =>
    p.coordinates
      ? [
          {
            slug: p.slug,
            href: `/${locale}/projects/${p.slug}`,
            title: text.title,
            region: text.location,
            years: y,
            value: v,
            ongoing: p.status === "ongoing",
            lat: p.coordinates[0],
            lng: p.coordinates[1],
          },
        ]
      : []
  );
  const unpinned = projects.length - points.length;

  return (
    <>
      <PageHero
        title={t("hero.title")}
        lead={t("hero.lead")}
        aside={
          <dl className="tblock">
            <div>
              <dt>{t("hero.totalLabel")}</dt>
              <dd className="big">{t("hero.total")}</dd>
            </div>
            <div>
              <dt>{t("hero.statusLabel")}</dt>
              <dd>{t("hero.status", { done, ongoing })}</dd>
            </div>
          </dl>
        }
      >
        <div className="cta-row">
          <Link className="btn btn-white" href={`/${locale}/contact`}>
            {tSite("cta")}
          </Link>
        </div>
      </PageHero>

      <section className="sec bg-100" aria-labelledby="register-title">
        <div className="wrap">
          <SectionHead id="register-title" label={t("register.label")} title={t("register.title")} />
          <div className="regf">
            <span id="f-all" className="ftgt" />
            <span id="f-infrastructure" className="ftgt" />
            <span id="f-drilling" className="ftgt" />
            <nav className="filt" aria-label={t("register.filterLabel")}>
              <span aria-hidden="true">{t("register.filterLabel")}</span>
              <a href="#f-all" data-f="all">
                {t("register.filters.all")} <i>{projects.length}</i>
              </a>
              {CATEGORIES.map((c) => (
                <a key={c} href={`#f-${c}`} data-f={c}>
                  {t(`register.filters.${c}`)} <i>{projects.filter((p) => p.category === c).length}</i>
                </a>
              ))}
            </nav>
            <table className="reg">
              <thead>
                <tr>
                  <th scope="col">{t("register.columns.years")}</th>
                  <th scope="col">{t("register.columns.project")}</th>
                  <th scope="col">{t("register.columns.region")}</th>
                  <th scope="col">{t("register.columns.client")}</th>
                  <th scope="col" className="val">{t("register.columns.value")}</th>
                  <th scope="col">{t("register.columns.status")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ p, text, years: y, value: v }) => (
                  <tr key={p.slug} data-cat={p.category}>
                    <td className="yr">{y}</td>
                    <td className="prj">
                      <Link href={`/${locale}/projects/${p.slug}`}>{text.title}</Link>
                    </td>
                    <td className="rg">{text.location}</td>
                    <td className="cl">
                      <span>{text.client}</span>
                      {text.funder && <span>{text.funder}</span>}
                    </td>
                    <td className="val">{v}</td>
                    <td className={p.status === "ongoing" ? "st" : "st done"}>
                      <i aria-hidden="true" />
                      {t(p.status === "ongoing" ? "register.status.ongoing" : "register.status.completed")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="regsum" data-f="all">
              {t("register.sumAll", { count: projects.length })}
            </p>
            {CATEGORIES.map((c) => {
              const list = projects.filter((p) => p.category === c);
              return (
                <p key={c} className="regsum" data-f={c}>
                  {t("register.sumPart", { count: list.length, value: value(sumMillions(list)) })}
                </p>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="map-title">
        <div className="wrap">
          <SectionHead id="map-title" label={t("map.label")} title={t("map.title")} />
          <p className="svc-desc">{t("map.lead")}</p>
          <div className="mapf">
            <div className="mapf-bar">
              <span>{t("map.frame")}</span>
              <span>
                <i style={{ background: "#0B2B43" }} aria-hidden="true" />
                {t("map.completed")}
                <i style={{ background: "#24B5C6" }} aria-hidden="true" />
                {t("map.ongoing")}
              </span>
            </div>
            <noscript>
              <style>{".js-only,.mapf-canvas{display:none}"}</style>
              <p className="mapf-note" style={{ position: "static", minHeight: "8rem" }}>
                {t("map.noscript")}
              </p>
            </noscript>
            <ProjectMapLazy
              points={points}
              loading={t("map.loading")}
              labels={{
                aria: t("map.aria"),
                completed: t("map.completed"),
                ongoing: t("map.ongoing"),
                open: t("map.open"),
              }}
            />
          </div>
          {unpinned > 0 && (
            <p className="svc-desc" style={{ margin: "1rem 0 0" }}>
              {t("map.unpinned")}
            </p>
          )}
        </div>
      </section>

      <ClosingCta locale={locale} />
    </>
  );
}
