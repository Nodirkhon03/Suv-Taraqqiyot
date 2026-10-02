/*
 * «Powered by Nusrat.Tech» — the signature every Nusrat-built site carries in its footer.
 *
 * Canonical source: ~/Developer/brain/nusrat-tech/credit/nusrat-credit/
 * Copied into each project by credit/sync.sh <name>. Edit there, then re-sync; never edit a copy.
 *
 * Built only from the brand's own marks: the star (Proxima Centauri in ultraviolet, the nusrat.tech
 * logo since 2026-10-02; star.ts) and the handwritten nusrat.tech traced from the approved poster
 * (wordmark.ts). The label is English on every locale (founder, 2026-10-01).
 *
 * Alive on its own: a few faint stars twinkle behind it and a falling star crosses every few
 * seconds, as the nusrat.tech sky does. The moment (on first full view on any device, and on every
 * hover or keyboard focus) is a star being born (founder, 2026-10-02): a ring of dust turns and
 * collapses, a protostar glows, the star ignites with four diffraction spikes; the wordmark is
 * then written in pen order, and its full stop becomes a new star, flares and fades.
 *
 * Everything moves in CSS. The only script is SignOnView (a few lines, an IntersectionObserver)
 * that starts the moment on arrival. The credit is complete with JavaScript off, and under
 * reduced motion nothing moves.
 */
import type { CSSProperties } from "react";
import s from "./credit.module.css";
import { SignOnView } from "./sign-on-view";
import { STAR_SRC } from "./star";
import { WORDMARK_DOT, WORDMARK_OUTLINE, WORDMARK_STROKES } from "./wordmark";

/** nusrat.tech is published in ru, en and uz; everything else lands on English. */
const HOME_LOCALE: Record<string, "ru" | "en" | "uz"> = { ru: "ru", en: "en", uz: "uz", oz: "uz" };

/* The wordmark's ink, cropped from the 640 x 177 poster box to the lettering itself. */
const BOX = { x: 8, y: 2, width: 608, height: 152 } as const;

const PEN_WIDTH = 11; // matches the hero: covers the thickest stroke
const PEN_SPEED = 2100; // viewBox units per second: the poster's hand, twice as quick
const PEN_LIFT = 0.05;
const BIRTH = 0.72; // seconds: the star ignites (= --nt-birth in the CSS)
const PEN_START = BIRTH + 0.18; // the pen starts as the star settles

const SIGNATURE = (() => {
  let clock = PEN_START;
  let dotAt = 0;
  const strokes = WORDMARK_STROKES.map((stroke) => {
    if (stroke.afterDot && !dotAt) {
      dotAt = clock;
      clock += 0.1;
    }
    const duration = stroke.length / PEN_SPEED;
    const start = clock;
    clock += duration + PEN_LIFT;
    return { id: stroke.id, d: stroke.d, start, duration };
  });
  return { strokes, dotAt, end: clock };
})();

/*
 * The dust the star is born from, in the mark's units (36 px = 62 units): fourteen grains on a slightly
 * eccentric ring outside the star, spaced by the golden angle so the ring never looks drawn.
 */
const DUST = Array.from({ length: 14 }, (_, i) => {
  const a = i * 2.39996;
  const r = 24 + ((i * 7) % 6);
  return { cx: +(Math.cos(a) * r).toFixed(2), cy: +(Math.sin(a) * r * 0.84).toFixed(2), r: +(0.9 + ((i * 3) % 4) * 0.3).toFixed(2) };
});

/*
 * The sky behind the signature, in px from the sky's top-left (it overhangs the link by
 * 28 px above and below and 48 px each side). Every falling star travels the same bearing,
 * 21 degrees below the horizontal, left to right, as one radiant would send them.
 */
type Fall = { x: number; y: number; run: number; len: number; dur: number; at: number };
const fall = ({ x, y, run, len, dur, at }: Fall) =>
  ({
    "--x0": `${x}px`,
    "--y0": `${y}px`,
    "--x1": `${x + run}px`,
    "--y1": `${Math.round(y + run * 0.384)}px`, // tan 21 deg
    "--len": `${len}px`,
    "--dur": `${dur}s`,
    "--at": `${at}s`,
  }) as CSSProperties;

/** Always falling: two periods that never line up, so the cadence feels irregular (one every ~4 s). */
const AMBIENT: Fall[] = [
  { x: -30, y: -6, run: 250, len: 72, dur: 7.3, at: 1.6 },
  { x: 90, y: -16, run: 220, len: 56, dur: 10.1, at: 4.9 },
];
/** The finale: the full stop of nusrat.tech becomes a star, in wordmark units (30 px = 152 units). */
const NOVA = "M0 -30Q0 0 30 0Q0 0 0 30Q0 0 -30 0Q0 0 0 -30Z";
/** Faint fixed stars, in % of the sky, with their own slow twinkle. */
const TWINKLES = [
  [8, 22, 1.6, 3.1], [21, 78, 1.2, 4.3], [37, 12, 1.4, 3.7], [56, 86, 1.8, 2.9],
  [71, 18, 1.2, 4.9], [84, 64, 1.6, 3.4], [95, 30, 1.2, 4.1],
] as const;

const at = (seconds: number, duration?: number) =>
  ({
    "--at": `${seconds.toFixed(3)}s`,
    ...(duration === undefined ? {} : { "--for": `${duration.toFixed(3)}s` }),
  }) as CSSProperties;

export type NusratCreditProps = {
  /** The page's locale; only chooses which nusrat.tech the link opens (ru, en or uz). */
  locale: string;
  /** Short project slug: the utm_source on the link, and the id of the wordmark's mask. */
  site: string;
  /** The ground it sits on. Dark grounds get ivory dust and spikes and a champagne signature. */
  tone?: "dark" | "light";
  /** Optional CSS colour for the hover ink, e.g. the host's own jewel tone. */
  accent?: string;
  className?: string;
};

export function NusratCredit({ locale, site, tone = "dark", accent, className = "" }: NusratCreditProps) {
  const lang = locale.toLowerCase().split("-")[0] ?? "en";
  const slug = site.toLowerCase().replace(/[^a-z0-9-]/g, "") || "site";
  const ids = `nt-${slug}`;
  const mask = `${ids}-pen`;
  const href = `https://nusrat.tech/${HOME_LOCALE[lang] ?? "en"}?utm_source=${slug}&utm_medium=referral&utm_campaign=powered_by`;
  const style = accent ? ({ "--nt-accent": accent } as CSSProperties) : undefined;

  return (
    <span className={`${s.root} ${tone === "light" ? s.light : s.dark} ${className}`} style={style}>
      <a className={s.credit} href={href} target="_blank" rel="noopener">
        <span className={s.sky} aria-hidden="true">
          {TWINKLES.map(([x, y, size, period]) => (
            <span
              key={`${x}-${y}`}
              className={s.twinkle}
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, "--dur": `${period}s` } as CSSProperties}
            />
          ))}
          {AMBIENT.map((f) => (
            <span key={`a${f.x}${f.y}`} className={`${s.star} ${s.ambient}`} style={fall(f)} />
          ))}
        </span>

        <span className={s.markWrap} aria-hidden="true">
          <svg className={s.dust} viewBox="-31 -31 62 62">
            {DUST.map((g, i) => (
              <circle key={i} cx={g.cx} cy={g.cy} r={g.r} />
            ))}
          </svg>
          <span className={s.proto} />
          {/* eslint-disable-next-line @next/next/no-img-element -- a 4 KB inline still, no optimiser needed */}
          <img className={s.starImg} src={STAR_SRC} alt="" width={36} height={36} decoding="async" />
          <span className={s.spikes} />
        </span>
        {/* the glow the new star in the wordmark's full stop is drawn with */}
        <svg className={s.defs} width="0" height="0" aria-hidden="true">
          <defs>
            <radialGradient id={`${ids}-flash`}>
              <stop offset="0" style={{ stopColor: "var(--nt-hot)", stopOpacity: 1 }} />
              <stop offset="0.35" style={{ stopColor: "var(--nt-glow)", stopOpacity: 0.85 }} />
              <stop offset="1" style={{ stopColor: "var(--nt-glow)", stopOpacity: 0 }} />
            </radialGradient>
          </defs>
        </svg>

        <span className={s.text}>
          <span className={s.label}>Powered by</span>
          <svg
            className={s.wordmark}
            viewBox={`${BOX.x} ${BOX.y} ${BOX.width} ${BOX.height}`}
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <mask id={mask} maskUnits="userSpaceOnUse" x={BOX.x} y={BOX.y} width={BOX.width} height={BOX.height}>
                <g stroke="#fff" strokeWidth={PEN_WIDTH} strokeLinecap="round" strokeLinejoin="round" fill="none">
                  {SIGNATURE.strokes.map((stroke) => (
                    <path
                      key={stroke.id}
                      d={stroke.d}
                      pathLength={1}
                      className={s.pen}
                      style={at(stroke.start, stroke.duration)}
                    />
                  ))}
                </g>
                <circle
                  cx={WORDMARK_DOT.cx}
                  cy={WORDMARK_DOT.cy}
                  r="7"
                  fill="#fff"
                  className={s.dot}
                  style={at(SIGNATURE.dotAt, 0.12)}
                />
                <rect
                  x={BOX.x}
                  y={BOX.y}
                  width={BOX.width}
                  height={BOX.height}
                  fill="#fff"
                  className={s.settle}
                  style={at(SIGNATURE.end, 0.2)}
                />
              </mask>
            </defs>
            <path d={WORDMARK_OUTLINE} fill="currentColor" fillRule="evenodd" mask={`url(#${mask})`} />
            <g transform={`translate(${WORDMARK_DOT.cx} ${WORDMARK_DOT.cy})`}>
              <g className={s.nova} style={at(SIGNATURE.end + 0.05)}>
                <circle r="26" fill={`url(#${ids}-flash)`} />
                <path d="M0 -46V46M-46 0H46" className={s.flare} strokeWidth="2.4" strokeLinecap="round" />
                <path d={NOVA} className={s.hot} />
              </g>
            </g>
          </svg>
          <span className={s.srOnly}>Nusrat.Tech</span>
        </span>
      </a>
      <SignOnView />
    </span>
  );
}

export default NusratCredit;
