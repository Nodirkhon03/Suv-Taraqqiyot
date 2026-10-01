import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/pages/PageHero";
import SectionHead from "@/components/home/SectionHead";
import CapacitySchedule from "@/components/home/CapacitySchedule";
import Certificates from "@/components/home/Certificates";
import Clients from "@/components/home/Clients";
import ClosingCta from "@/components/home/ClosingCta";
import { formatMillions, millions, projectBySlug } from "@/lib/format";

/** History rows: years and values come from lib/projects.ts, words from messages (aboutPage.history.rows). */
const HISTORY = [
  { key: "founded", slugs: [] as string[], year: "2001" },
  { key: "uzgazoil", slugs: ["uzgazoil-wells-drilling"] },
  { key: "bayaut", slugs: ["bayaut-vertical-drainage-reconstruction"] },
  { key: "syrdarya", slugs: ["syrdarya-water-supply-systems"] },
  { key: "koshrabad", slugs: ["koshrabad-water-w31", "koshrabad-water-w41"] },
  { key: "zhiydakapa", slugs: ["zhiydakapa-water-intake-namangan"] },
  { key: "yangiyul", slugs: ["yangiyul-water-supply"] },
  { key: "namangan2", slugs: ["namangan-water-supply-phase2"] },
] as const;

const LEGAL = ["fullName", "shortName", "tin", "regNo", "regDate", "registrar", "address"] as const;
const LETTERS = ["rmm", "education", "yunusobod", "police"] as const;

/** Company — history, legal details, capacity, ISO, letters of acknowledgment, clients. Server-rendered, no motion. */
export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const tSite = await getTranslations({ locale, namespace: "site" });

  const history = HISTORY.map((h) => {
    const group = h.slugs.map(projectBySlug);
    const first = group[0];
    return {
      key: h.key,
      year: first ? first.year.replace("present", t("history.present")) : "year" in h ? h.year : "",
      href: first ? `/${locale}/projects/${first.slug}` : undefined,
      value: group.length
        ? t("history.amount", { amount: formatMillions(group.reduce((s, p) => s + millions(p.amount), 0), locale) })
        : "",
    };
  });

  return (
    <>
      <PageHero
        title={t("hero.title")}
        lead={t("hero.lead")}
        aside={
          <dl className="tblock">
            <div>
              <dt>{t("hero.foundedLabel")}</dt>
              <dd>{t("hero.founded")}</dd>
            </div>
            <div>
              <dt>{t("hero.tinLabel")}</dt>
              <dd>{t("hero.tin")}</dd>
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

      <section className="sec" aria-labelledby="history-title">
        <div className="wrap">
          <SectionHead id="history-title" label={t("history.label")} title={t("history.title")} />
          <div className="split">
            <div className="prose">
              <p>{t("history.p1")}</p>
              <p>{t("history.p2")}</p>
            </div>
            <div>
              <ol className="ledger">
                {history.map((h) => (
                  <li key={h.key}>
                    <span className="yr">{h.year}</span>
                    <span className="tx">
                      {h.href ? (
                        <Link href={h.href}>{t(`history.rows.${h.key}.title`)}</Link>
                      ) : (
                        <b>{t(`history.rows.${h.key}.title`)}</b>
                      )}
                      <span>{t(`history.rows.${h.key}.text`)}</span>
                    </span>
                    <span className="vl">{h.value}</span>
                  </li>
                ))}
              </ol>
              <p className="src">{t("history.source")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec bg-100" aria-labelledby="legal-title">
        <div className="wrap">
          <SectionHead id="legal-title" label={t("legal.label")} title={t("legal.title")} />
          <dl className="tb">
            {LEGAL.map((key) => (
              <div key={key} className={key === "address" ? "wide" : undefined}>
                <dt>{t(`legal.rows.${key}.label`)}</dt>
                <dd className={key === "tin" || key === "regNo" || key === "regDate" ? "mono" : undefined}>
                  {t(`legal.rows.${key}.value`)}
                </dd>
              </div>
            ))}
          </dl>
          <p className="src">{t("legal.source")}</p>
        </div>
      </section>

      <CapacitySchedule locale={locale} label={t("capacityLabel")} />
      <Certificates locale={locale} label={t("certificatesLabel")} tone="bg-100" />

      <section className="sec" aria-labelledby="letters-title">
        <div className="wrap">
          <SectionHead id="letters-title" label={t("letters.label")} title={t("letters.title")} />
          <ul className="ledger">
            {LETTERS.map((key) => {
              const year = t(`letters.items.${key}.year`);
              return (
                <li key={key}>
                  <span className="yr">{year || t("letters.noYear")}</span>
                  <span className="tx">
                    <b>{t(`letters.items.${key}.authority`)}</b>
                    <span>{t(`letters.items.${key}.text`)}</span>
                  </span>
                  <span className="vl" />
                </li>
              );
            })}
          </ul>
          <p className="src">{t("letters.source")}</p>
        </div>
      </section>

      <Clients locale={locale} label={t("clientsLabel")} tone="bg-50" />
      <ClosingCta locale={locale} />
    </>
  );
}
