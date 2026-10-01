import Link from "next/link";
import { getTranslations } from "next-intl/server";
import SectionHead from "@/components/home/SectionHead";
import DrawingMotion from "@/components/home/DrawingMotion";

const ITEMS = ["pipes", "facilities", "towers", "civil", "wells"] as const;

/**
 * One drawn glyph per service: a tiny, still engineering-correct miniature of the matching services-page drawing.
 * Complete when static; slow CSS loops (app/globals.css, "home service glyphs") run only with
 * prefers-reduced-motion: no-preference and pause off-screen (DrawingMotion below). Decorative.
 */
function Glyph({ name }: { name: (typeof ITEMS)[number] }) {
  switch (name) {
    case "pipes":
      // two pipe lengths joined by a bolted flange; water flows left → right
      return (
        <svg viewBox="0 0 96 64" aria-hidden="true">
          <path className="ic" d="M4 24 H42 M54 24 H92 M4 40 H42 M54 40 H92" />
          <path className="ic-w" d="M6 32 H90" />
          <path className="ic-fl" d="M6 32 H90" />
          <rect className="ic-fl-b" x="42" y="15" width="5" height="34" />
          <rect className="ic-fl-b" x="49" y="15" width="5" height="34" />
          <path className="ic-b" d="M38 19 H58 M38 45 H58" />
        </svg>
      );
    case "facilities":
      // reservoir → flooded-suction pump (below the water level) → delivery
      return (
        <svg viewBox="0 0 96 64" aria-hidden="true">
          <rect className="ic-wash gl-lvl" x="7" y="27" width="36" height="26" />
          <path className="ic-w1 gl-surf" d="M7 27 H43" />
          <rect className="ic" x="6" y="12" width="38" height="42" />
          <path className="ic-w" d="M44 46 H62 M75.5 40 V20 H94" />
          <path className="ic-fl" d="M44 46 H62 M75.5 40 V20 H94" />
          <circle className="ic-body" cx="70" cy="46" r="8" />
          <g className="gl-imp">
            <circle className="ic-imp" cx="70" cy="46" r="4.6" />
            <path className="ic-imp" d="M70 46 L72.5 41.8 M70 46 L74.5 48 M70 46 L66 48.5 M70 46 L67 41.8" />
          </g>
          <rect className="ic-body" x="80" y="42" width="11" height="9" />
        </svg>
      );
    case "towers":
      // Rozhnovsky tank on a water-filled shaft; the level rises (fill) and falls (supply)
      return (
        <svg viewBox="0 0 96 64" aria-hidden="true">
          <defs>
            <clipPath id="gl-tank">
              <path d="M35 9 H61 V22 L51.5 29 H44.5 L35 22 Z" />
            </clipPath>
          </defs>
          <path className="ic-g" d="M14 60 H82" />
          <rect className="ic-wash" x="45" y="28" width="6" height="32" />
          <g clipPath="url(#gl-tank)">
            <rect className="ic-wash gl-tlvl" x="34" y="15" width="28" height="15" />
            <path className="ic-w1 gl-tsurf" d="M34 15 H62" />
          </g>
          <path className="ic" d="M34 8 V22 L44 29 V60 M62 8 V22 L52 29 V60 M32 8 L48 2 L64 8 Z" />
          <path className="ic-w1" d="M48 58 V24" />
          <path className="ic-fl gl-riser" d="M48 58 V24" />
        </svg>
      );
    case "civil":
      // wall between formwork panels on a footing: rebar, then concrete fills from the bottom
      return (
        <svg viewBox="0 0 96 64" aria-hidden="true">
          <path className="ic-g" d="M2 50 H18 M78 50 H94" />
          <rect className="ic-conc" x="18" y="50" width="60" height="8" />
          <rect className="ic-conc gl-conc" x="34" y="8" width="28" height="42" />
          <path className="ic" d="M18 50 H78 V58 H18 Z" />
          <rect className="ic-fw" x="29" y="5" width="5" height="45" />
          <rect className="ic-fw" x="62" y="5" width="5" height="45" />
          <path className="ic-r" d="M39 10 V54 H30 M57 10 V54 H66 M39 10 H57" />
          <path className="ic-dot" d="M42 16 h.1 M54 16 h.1 M42 25 h.1 M54 25 h.1 M42 34 h.1 M54 34 h.1 M42 43 h.1 M54 43 h.1" />
          <path className="ic-tie" d="M25 20 H71 M25 38 H71" />
        </svg>
      );
    case "wells":
      // casing with a screen in the aquifer; water enters the screen and rises to the wellhead
      return (
        <svg viewBox="0 0 96 64" aria-hidden="true">
          <rect className="ic-aq" x="4" y="40" width="88" height="18" />
          <path className="ic-b" d="M4 40 H40 M56 40 H92 M4 58 H40 M56 58 H92" strokeDasharray="3 3" />
          <path className="ic-g" d="M4 14 H92" />
          <rect className="ic-wash" x="43" y="30" width="10" height="27" />
          <path className="ic" d="M42 10 V40 M54 10 V40 M42 58 H54 M38 10 H58" />
          <path className="ic ic-scr" d="M42 40 V58 M54 40 V58" />
          <path className="ic-pt" d="M6 49 H40 M90 49 H56" />
          <path className="ic-w1" d="M48 54 V4 H90" />
          <path className="ic-fl" d="M48 54 V4 H90" />
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
        <DrawingMotion selector="ul.svc" />
      </div>
    </section>
  );
}
