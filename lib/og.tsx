import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

/*
 * Open Graph card, 1200×630: navy ground, white IBM Plex Sans, a simplified line drawing of the
 * system the company builds (wells → main → tower) along the bottom. Rendered at build time by
 * app/og/[locale]/[key]/route.tsx. Plex TTF is fetched once per weight from Google Fonts
 * (the CSS API returns TrueType to a client without a browser user agent); it covers uz Latin
 * with ʻ ʼ, Cyrillic and Turkish.
 */

const NAVY = "#0B2B43";
const CYAN = "#24B5C6";
const MUTED = "#C5D3DF";

const fontCache = new Map<string, Promise<ArrayBuffer>>();

/** A TrueType file from the Google Fonts CSS API (`query` is the part after `family=`). */
function googleFont(query: string): Promise<ArrayBuffer> {
  let p = fontCache.get(query);
  if (!p) {
    p = (async () => {
      const css = await fetch(`https://fonts.googleapis.com/css2?family=${query}`).then((r) => {
        if (!r.ok) throw new Error(`og: Google Fonts CSS ${r.status} for ${query}`);
        return r.text();
      });
      const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
      if (!url) throw new Error(`og: no TrueType URL for ${query}`);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`og: font download ${res.status}`);
      return res.arrayBuffer();
    })();
    fontCache.set(query, p);
  }
  return p;
}

const plex = (weight: 400 | 600) => googleFont(`IBM+Plex+Sans:wght@${weight}`);
/* Plex draws U+02BB/U+02BC with a wide advance ("ta ʼ minot"), and satori does not fall back
   per glyph reliably. On the card (a picture, not text) they are drawn as U+2018/U+2019, which
   Plex spaces as punctuation and which have the same shape as the Uzbek marks. */
const marks = (s: string) => s.replace(/\u02BB/g, "\u2018").replace(/\u02BC/g, "\u2019");

let logoCache: Promise<string> | undefined;
function logo(): Promise<string> {
  logoCache ??= readFile(path.join(process.cwd(), "public/images/logo-main.png")).then(
    (b) => `data:image/png;base64,${b.toString("base64")}`,
  );
  return logoCache;
}

/** Wells → pump station → main below ground → water tower, single-weight lines; water in cyan. */
function Motif() {
  const line = "rgba(255,255,255,0.42)";
  const w = 1.5;
  return (
    <svg width="1200" height="170" viewBox="0 0 1200 170" style={{ position: "absolute", left: 0, bottom: 0 }}>
      <line x1="0" y1="96" x2="1200" y2="96" stroke={line} strokeWidth={w} />
      {/* two wells: casing to the bottom edge, water rising in the screen */}
      <rect x="92" y="96" width="14" height="80" fill="none" stroke={line} strokeWidth={w} />
      <rect x="182" y="96" width="14" height="80" fill="none" stroke={line} strokeWidth={w} />
      <line x1="99" y1="134" x2="99" y2="170" stroke={CYAN} strokeWidth="2" strokeDasharray="4 6" />
      <line x1="189" y1="134" x2="189" y2="170" stroke={CYAN} strokeWidth="2" strokeDasharray="4 6" />
      {/* main below ground, with the pump station above it */}
      <line x1="99" y1="118" x2="986" y2="118" stroke={line} strokeWidth={w} />
      <line x1="99" y1="132" x2="972" y2="132" stroke={line} strokeWidth={w} />
      <line x1="112" y1="125" x2="972" y2="125" stroke={CYAN} strokeWidth="3" strokeDasharray="18 12" />
      <rect x="430" y="66" width="86" height="30" fill="none" stroke={line} strokeWidth={w} />
      <circle cx="473" cy="125" r="12" fill={NAVY} stroke={line} strokeWidth={w} />
      {/* water tower: riser, legs, tank with a water level */}
      <line x1="972" y1="132" x2="972" y2="36" stroke={line} strokeWidth={w} />
      <line x1="986" y1="118" x2="986" y2="36" stroke={line} strokeWidth={w} />
      <line x1="944" y1="96" x2="958" y2="36" stroke={line} strokeWidth={w} />
      <line x1="1014" y1="96" x2="1000" y2="36" stroke={line} strokeWidth={w} />
      <rect x="932" y="2" width="94" height="34" rx="4" fill="none" stroke={line} strokeWidth={w} />
      <line x1="938" y1="16" x2="1020" y2="16" stroke={CYAN} strokeWidth="2" />
    </svg>
  );
}

/** `wrapSub`: the sub line may wrap, so keep it clear of the tower on the right. */
export type OgCard = { kicker: string; title: string; sub: string; brand: string; home?: boolean; wrapSub?: boolean };

export async function renderOg({ kicker, title, sub, brand, home, wrapSub }: OgCard): Promise<ImageResponse> {
  const [regular, semibold, logoSrc] = await Promise.all([plex(400), plex(600), logo()]);
  [kicker, title, sub] = [kicker, title, sub].map(marks);
  const titleSize = home ? 66 : title.length > 90 ? 46 : title.length > 60 ? 54 : 62;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: NAVY,
          padding: "56px 72px 0",
          fontFamily: "Plex",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              background: "#FFFFFF",
              borderRadius: 10,
              padding: "6px 10px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={logoSrc} width={80} height={56} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "0.02em" }}>{brand}</div>
            <div style={{ fontSize: 20, color: MUTED }}>www.suv-taraqqiyot.com</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: home ? 40 : 52, maxWidth: 1040 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: CYAN,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
          <div style={{ fontSize: titleSize, fontWeight: 600, lineHeight: 1.12, marginTop: 16 }}>{title}</div>
          <div style={{ fontSize: 26, color: MUTED, marginTop: 22, lineHeight: 1.35, maxWidth: wrapSub ? 840 : 1056 }}>{sub}</div>
        </div>

        <Motif />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Plex", data: regular, weight: 400, style: "normal" },
        { name: "Plex", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
