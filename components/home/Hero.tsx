import Link from "next/link";
import { getTranslations } from "next-intl/server";
import SystemDrawing, { type DrawingLabels } from "@/components/home/SystemDrawing";
import { PHONE, PHONE_HREF } from "@/lib/site";

export default async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.hero" });
  const labels = t.raw("drawing") as DrawingLabels;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-top">
          <h1 id="hero-title" className="hero-title">
            {t("title")}
          </h1>
          <div>
            <p className="lead">{t("lead")}</p>
            <div className="cta-row">
              <Link className="btn btn-white" href={`/${locale}/contact`}>
                {t("cta")}
              </Link>
              <Link className="link-light" href={`/${locale}/projects`}>
                {t("projectsLink")}
              </Link>
            </div>
            <p className="note">
              {t("note")} · <a href={PHONE_HREF}>{PHONE}</a>
            </p>
          </div>
          <dl className="tblock">
            <div>
              <dt>{t("clientsLabel")}</dt>
              <dd>{t("clients")}</dd>
            </div>
            <div>
              <dt>{t("fundersLabel")}</dt>
              <dd>{t("funders")}</dd>
            </div>
          </dl>
        </div>
        <SystemDrawing labels={labels} />
      </div>
      <div className="hero-foot" />
    </section>
  );
}
