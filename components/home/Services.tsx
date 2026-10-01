import Link from "next/link";
import { getTranslations } from "next-intl/server";
import SectionHead from "@/components/home/SectionHead";

const ITEMS = ["pipes", "facilities", "towers", "civil", "wells"] as const;

/** One drawn glyph per service, same line language as the hero drawing. Decorative. */
function Glyph({ name }: { name: (typeof ITEMS)[number] }) {
  switch (name) {
    case "pipes":
      return (
        <svg viewBox="0 0 96 64" aria-hidden="true">
          <path className="ic" d="M4 26 H92 M4 40 H92" />
          <path className="ic" d="M26 22 V44 M30 22 V44 M66 22 V44 M70 22 V44" />
          <path className="ic-w" d="M8 33 H88" />
          <path className="ic-b" d="M40 54 H56 M40 50 V58 M56 50 V58" />
        </svg>
      );
    case "facilities":
      return (
        <svg viewBox="0 0 96 64" aria-hidden="true">
          <path className="ic-g" d="M2 50 H94" />
          <rect className="ic" x="6" y="34" width="40" height="24" />
          <path className="ic-b" d="M6 40 H46" strokeDasharray="3 3" />
          <rect className="ic" x="56" y="18" width="34" height="32" />
          <path className="ic" d="M52 18 H94" />
          <circle className="ic-b" cx="70" cy="38" r="6" />
          <path className="ic-w" d="M20 46 H80" />
        </svg>
      );
    case "towers":
      return (
        <svg viewBox="0 0 96 64" aria-hidden="true">
          <path className="ic-g" d="M10 60 H86" />
          <path className="ic" d="M36 20 H60 V8 Q48 3 36 8 Z M40 20 L34 60 M56 20 L62 60" />
          <path className="ic-b" d="M37 44 H59 M37 44 L59 30 M59 44 L37 30 M38 30 H58" />
          <path className="ic-w" d="M48 58 V12" />
        </svg>
      );
    case "civil":
      return (
        <svg viewBox="0 0 96 64" aria-hidden="true">
          <path className="ic-g" d="M2 42 H94" />
          <rect className="ic" x="18" y="18" width="60" height="36" />
          <path className="ic" d="M12 18 H84" />
          <path className="ic-b" d="M18 54 L30 42 M30 54 L42 42 M42 54 L54 42 M54 54 L66 42 M66 54 L78 42" />
          <path className="ic-b" d="M18 10 H78 M18 6 V14 M78 6 V14" />
        </svg>
      );
    case "wells":
      return (
        <svg viewBox="0 0 96 64" aria-hidden="true">
          <path className="ic-g" d="M8 18 H88" />
          <path className="ic" d="M40 6 H56 V18 M44 18 V62 M52 18 V62" />
          <path className="ic-b" d="M30 34 H66 M30 50 H66" strokeDasharray="3 3" />
          <path className="ic-w" d="M48 60 V10" />
        </svg>
      );
  }
}

/** 03 — civil engineering first; drilling is one service of five, listed last. */
export default async function Services({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.services" });

  return (
    <section className="sec" aria-labelledby="services-title">
      <div className="wrap">
        <SectionHead
          id="services-title"
          label={t("label")}
          title={t("title")}
          aside={
            <Link className="more" href={`/${locale}/services`}>
              {t("link")}
            </Link>
          }
        />
        <ul className="svc">
          {ITEMS.map((key) => (
            <li key={key}>
              <Glyph name={key} />
              <h3>{t(`items.${key}.title`)}</h3>
              <p>{t(`items.${key}.desc`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
