import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";
import PageHero from "@/components/pages/PageHero";
import SectionHead from "@/components/home/SectionHead";
import ClosingCta from "@/components/home/ClosingCta";
import ServiceDrawing, { type DrawingText, type ServiceKey } from "@/components/pages/ServiceDrawing";
import DrawingMotion from "@/components/home/DrawingMotion";
import { getProjectText } from "@/lib/content/projects-i18n";
import { formatMillions, millions, projectBySlug } from "@/lib/format";

/** Civil engineering first; drilling is one service of five, listed last (owner, round 2). */
const SERVICES: { key: ServiceKey; refs: string[] }[] = [
  { key: "pipes", refs: ["namangan-water-supply-phase2", "yangiyul-water-supply", "damkhodzha-pipeline-reconstruction"] },
  { key: "facilities", refs: ["zhiydakapa-water-intake-namangan", "koshrabad-water-w41", "vu5-guzar-reconstruction"] },
  { key: "towers", refs: [] },
  { key: "civil", refs: ["uzgazoil-wells-drilling"] },
  { key: "wells", refs: ["uzgazoil-wells-drilling", "bayaut-vertical-drainage-reconstruction", "cng-wells-uztransgaz"] },
];

type Cap = { k: string; v: string };

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const tSite = await getTranslations({ locale, namespace: "site" });

  return (
    <>
      <PageHero
        title={t("hero.title")}
        lead={t("hero.lead")}
        aside={
          <nav className="tblock" aria-label={t("hero.toc")}>
            <ol className="toc">
              {SERVICES.map((s, i) => (
                <li key={s.key}>
                  <a href={`#${s.key}`}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {t(`items.${s.key}.short`)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      >
        <div className="cta-row">
          <Link className="btn btn-white" href={`/${locale}/contact`}>
            {tSite("cta")}
          </Link>
        </div>
      </PageHero>

      {SERVICES.map((s, i) => {
        const scope = t.raw(`items.${s.key}.scope`) as string[];
        const cap = t.raw(`items.${s.key}.cap`) as Cap[];
        const dwg = t.raw(`items.${s.key}.dwg`) as DrawingText;
        const refs = s.refs.map((slug) => {
          const p = projectBySlug(slug);
          return {
            slug,
            title: getProjectText(slug, locale as Locale).title,
            years: p.year.replace("present", t("present")),
            value: t("amount", { amount: formatMillions(millions(p.amount), locale) }),
          };
        });
        return (
          <section
            key={s.key}
            id={s.key}
            className={i % 2 ? "sec bg-50" : "sec"}
            aria-labelledby={`${s.key}-title`}
          >
            <div className="wrap">
              <SectionHead id={`${s.key}-title`} label={t(`items.${s.key}.label`)} title={t(`items.${s.key}.title`)} />
              <div className="svc-body">
                <ServiceDrawing name={s.key} text={dwg} />
                <div>
                  <p className="svc-desc">{t(`items.${s.key}.desc`)}</p>
                  <h3 className="svc-sub">{t("scope")}</h3>
                  <ol className="scope">
                    {scope.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ol>
                  {cap.length > 0 && (
                    <>
                      <h3 className="svc-sub">{t("capacity")}</h3>
                      <dl className="tb cap">
                        {cap.map((c, j) => (
                          <div key={c.k} className={cap.length % 2 === 1 && j === cap.length - 1 ? "wide" : undefined}>
                            <dt>{c.k}</dt>
                            <dd className="val">{c.v}</dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  )}
                  {refs.length > 0 && (
                    <>
                      <h3 className="svc-sub">{t("refs")}</h3>
                      <ul className="refs">
                        {refs.map((r) => (
                          <li key={r.slug}>
                            <Link href={`/${locale}/projects/${r.slug}`}>
                              {r.title}
                              <span>
                                {r.years} · {r.value}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
              {i === SERVICES.length - 1 && (
                <>
                  <p className="src">{t("source")}</p>
                  <p className="src" style={{ marginTop: ".25rem" }}>
                    {t("sourceDepth")}
                  </p>
                </>
              )}
            </div>
          </section>
        );
      })}

      <DrawingMotion selector=".dwg" />
      <ClosingCta locale={locale} />
    </>
  );
}
