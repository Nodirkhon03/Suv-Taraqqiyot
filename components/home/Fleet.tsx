import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import SectionHead from "@/components/home/SectionHead";
import { homeFleet } from "@/lib/fleet";

/**
 * 04 — own fleet. Cutouts are internet photos of the exact models the company owns, so the
 * caption says once that the photos show models, never the company's own machines.
 */
export default async function Fleet({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.fleet" });
  const lines = t.raw("lines") as string[];

  return (
    <section className="sec bg-50" aria-labelledby="fleet-title">
      <div className="wrap">
        <SectionHead id="fleet-title" label={t("label")} title={t("title")} />
        <div className="fleet">
          <div>
            <ul className="machines">
              {lines.map((line, i) => (
                <li key={line}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <Link className="more" href={`/${locale}/equipment`}>
              {t("link")}
            </Link>
          </div>
          <div>
            <ul className="plates">
              {homeFleet.map((m) => (
                <li key={m.model}>
                  <figure className="plate">
                    <div className="img">
                      <Image
                        src={m.image}
                        alt={`${m.model}, ${t(`types.${m.type}`)}`}
                        fill
                        sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 260px"
                      />
                    </div>
                    <figcaption>
                      <span>
                        <b>{m.model}</b>
                      </span>
                      <span>{t("quantity", { count: m.quantity })}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <p className="src">{t("caption")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
