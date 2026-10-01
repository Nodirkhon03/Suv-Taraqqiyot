/*
 * «Powered by Nusrat.Tech» — the signature every Nusrat-built site carries in its footer.
 *
 * Canonical source: ~/Developer/brain/nusrat-tech/credit/nusrat-credit/
 * Copied into each project by credit/sync.sh <name>. Edit there, then re-sync; never edit a copy.
 *
 * Built only from the brand's own marks: the handwritten nusrat.tech traced from the
 * approved poster (wordmark.ts) and the four-around-one rosette (the site's HouseMark).
 * The label is English on every locale (founder, 2026-10-01).
 *
 * Alive on its own: a few faint stars twinkle behind it and a falling star crosses every few
 * seconds, as the nusrat.tech sky does. The moment (on first full view on any device, and on every
 * hover or keyboard focus): a falling star strikes the rosette and explodes (flash, shockwave, eight
 * sparks thrown along the rosette's eight points); the rosette flinches, spins a quarter and redraws
 * itself out of the blast, its garnet heart flaring; the wordmark is rewritten in pen order with the
 * crossbar last; and at the end the full stop of nusrat.tech becomes a new star, flares and fades.
 *
 * Everything moves in CSS. The only script is SignOnView (a few lines, an IntersectionObserver)
 * that starts the moment on arrival. The credit is complete with JavaScript off, and under
 * reduced motion nothing moves.
 */
import type { CSSProperties } from "react";
import s from "./credit.module.css";
import { SignOnView } from "./sign-on-view";
import { WORDMARK_DOT, WORDMARK_OUTLINE, WORDMARK_STROKES } from "./wordmark";

/** nusrat.tech is published in ru, en and uz; everything else lands on English. */
const HOME_LOCALE: Record<string, "ru" | "en" | "uz"> = { ru: "ru", en: "en", uz: "uz", oz: "uz" };

/* The wordmark's ink, cropped from the 640 x 177 poster box to the lettering itself. */
const BOX = { x: 8, y: 2, width: 608, height: 152 } as const;

const PEN_WIDTH = 11; // matches the hero: covers the thickest stroke
const PEN_SPEED = 2100; // viewBox units per second: the poster's hand, twice as quick
const PEN_LIFT = 0.05;
const IMPACT = 0.42; // seconds: the falling star reaches the rosette
const PEN_START = IMPACT + 0.2; // the pen starts as the blast clears

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

/* The rosette, as the HouseMark draws it (r = 27, G = 0.25, S = 0.667, cell radius 0.15). */
const ARM = "M-6.75 -18.01L0 -27L6.75 -18.01";
const LATTICE = "M-6.75 -18.01V18.01M6.75 -18.01V18.01M-18.01 -6.75H18.01M-18.01 6.75H18.01";
const CELLS = [
  "M6.75 -18.01L13.96 -18.01A4.05 4.05 0 0 1 18.01 -13.96L18.01 -6.75",
  "M6.75 18.01L13.96 18.01A4.05 4.05 0 0 0 18.01 13.96L18.01 6.75",
  "M-6.75 18.01L-13.96 18.01A4.05 4.05 0 0 1 -18.01 13.96L-18.01 6.75",
  "M-6.75 -18.01L-13.96 -18.01A4.05 4.05 0 0 0 -18.01 -13.96L-18.01 -6.75",
];
const HEART = "M0 -4.6L4.6 0L0 4.6L-4.6 0Z";
const TURNS = [0, 90, 180, 270] as const;
/** The lens sparkle of the constellation's stars: four points, concave sides. */
const SPARK = "M0 -3.4Q0 0 3.4 0Q0 0 0 3.4Q0 0 -3.4 0Q0 0 0 -3.4Z";

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
/**
 * The blast, in the rosette's own units (36 px = 62 units). Eight sparks fly out along the
 * rosette's eight points: the four axis ones (its star tips) are four-point sparkles and fly
 * further, the four diagonal ones are embers.
 */
const DEBRIS = [0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => ({
  angle,
  tip: i % 2 === 0,
  reach: i % 2 === 0 ? 50 : 34,
  dur: i % 2 === 0 ? 0.85 : 0.65,
}));
/** Where the falling star enters, in rosette units: up and to the left, on the ambient stars' bearing family. */
const COMET_FROM = { x: -120, y: -90 } as const;
const COMET_ANGLE = (Math.atan2(-COMET_FROM.y, -COMET_FROM.x) * 180) / Math.PI;
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
  /** The ground it sits on. Dark grounds get the brass rosette, ivory stars and a champagne signature. */
  tone?: "dark" | "light";
  /** Optional CSS colour for the rosette and the hover ink, e.g. the host's own jewel tone. */
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

        <span className={s.markWrap}>
        <svg className={s.mark} viewBox="-31 -31 62 62" fill="none" aria-hidden="true">
          <g stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
            <path d={LATTICE} pathLength={1} strokeWidth="1.5" className={s.strand} style={at(IMPACT + 0.04)} />
            {TURNS.map((turn, i) => (
              <path
                key={turn}
                d={ARM}
                transform={`rotate(${turn})`}
                pathLength={1}
                strokeWidth="2.3"
                className={s.strand}
                style={at(IMPACT + 0.1 + i * 0.06)}
              />
            ))}
            {CELLS.map((d, i) => (
              <path key={d} d={d} pathLength={1} strokeWidth="2.3" className={s.strand} style={at(IMPACT + 0.22 + i * 0.06)} />
            ))}
          </g>
          {TURNS.map((turn, i) => (
            <g key={turn} transform={`rotate(${turn}) translate(0 -27)`}>
              <path d={SPARK} className={s.spark} style={at(IMPACT + 0.55 + i * 0.05)} />
            </g>
          ))}
          <path d={HEART} className={s.heart} strokeWidth="1.2" strokeLinejoin="round" style={at(IMPACT)} />
        </svg>

        <svg className={s.burst} viewBox="-31 -31 62 62" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={`${ids}-tail`} gradientUnits="userSpaceOnUse" x1="-78" y1="0" x2="0" y2="0">
              <stop offset="0" style={{ stopColor: "var(--nt-glow)", stopOpacity: 0 }} />
              <stop offset="1" style={{ stopColor: "var(--nt-hot)", stopOpacity: 1 }} />
            </linearGradient>
            <radialGradient id={`${ids}-flash`}>
              <stop offset="0" style={{ stopColor: "var(--nt-hot)", stopOpacity: 1 }} />
              <stop offset="0.35" style={{ stopColor: "var(--nt-glow)", stopOpacity: 0.85 }} />
              <stop offset="1" style={{ stopColor: "var(--nt-glow)", stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          <g className={s.comet} style={{ "--cx": `${COMET_FROM.x}px`, "--cy": `${COMET_FROM.y}px` } as CSSProperties}>
            <g transform={`rotate(${COMET_ANGLE.toFixed(2)})`}>
              <path d="M-78 0H0" stroke={`url(#${ids}-tail)`} strokeWidth="2.6" strokeLinecap="round" />
              <circle r="9" fill={`url(#${ids}-flash)`} opacity="0.8" />
              <circle r="2.6" className={s.hot} />
            </g>
          </g>
          <circle r="24" fill={`url(#${ids}-flash)`} className={s.flash} />
          <circle r="20" className={s.ring} strokeWidth="2" />
          {DEBRIS.map(({ angle, tip, reach, dur }) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <g
                className={s.debris}
                style={{ "--d": `${-reach}px`, "--dur": `${dur}s` } as CSSProperties}
              >
                {tip ? <path d={SPARK} transform="scale(1.8)" className={s.hot} /> : <circle r="2.2" className={s.hot} />}
              </g>
            </g>
          ))}
        </svg>
        </span>

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
