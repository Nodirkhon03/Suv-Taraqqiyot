import { ImageResponse } from "next/og";
import { locales } from "@/i18n";

export const alt =
  "SUV-TARAQQIYOT LLC — Hydrogeological well drilling & water supply construction in Uzbekistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const taglines: Record<string, string> = {
  en: "Hydrogeological Well Drilling & Water Supply Construction",
  ru: "Бурение скважин и строительство водоснабжения",
  uz: "Quduq burg'ulash va suv ta'minoti qurilishi",
  tr: "Su Kuyusu Sondajı ve Su Temini İnşaatı",
};

const countryLine: Record<string, string> = {
  en: "Uzbekistan · Since 2001",
  ru: "Узбекистан · с 2001 года",
  uz: "O'zbekiston · 2001 yildan beri",
  tr: "Özbekistan · 2001'den beri",
};

export default function Image({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const tagline = taglines[locale] || taglines.en;
  const country = countryLine[locale] || countryLine.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0B2B43 0%, #0B2B43 55%, #103a5a 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top: brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#24B5C6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B2B43",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div
            style={{
              color: "#7fd4dd",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Water Infrastructure
          </div>
        </div>

        {/* Middle: name + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "78px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            SUV-TARAQQIYOT LLC
          </div>
          <div
            style={{
              marginTop: "24px",
              color: "#cbd5e1",
              fontSize: "34px",
              fontWeight: 400,
              lineHeight: 1.3,
              maxWidth: "900px",
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Bottom: stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "44px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#ffffff", fontSize: "36px", fontWeight: 700 }}>
                20+
              </span>
              <span style={{ color: "#94a3b8", fontSize: "18px" }}>Projects</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#ffffff", fontSize: "36px", fontWeight: 700 }}>
                $57M+
              </span>
              <span style={{ color: "#94a3b8", fontSize: "18px" }}>Delivered</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#ffffff", fontSize: "36px", fontWeight: 700 }}>
                ISO
              </span>
              <span style={{ color: "#94a3b8", fontSize: "18px" }}>
                9001 · 14001 · 45001
              </span>
            </div>
          </div>
          <div style={{ color: "#7fd4dd", fontSize: "22px", fontWeight: 600 }}>
            {country}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
