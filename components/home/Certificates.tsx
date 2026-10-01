import { getTranslations } from "next-intl/server";
import SectionHead from "@/components/home/SectionHead";

const CERTS = [
  { key: "iso9001", code: "ISO 9001:2015" },
  { key: "iso14001", code: "ISO 14001:2019" },
  { key: "iso45001", code: "ISO 45001:2020" },
] as const;

/**
 * 06 — three management-system certificates to Oʻz DSt ISO, national standards of Uzbekistan identical
 * to ISO (AVVISO CERT). The heading always carries the national prefix (`std`): there is no
 * international ISO 14001:2019 or ISO 45001:2020. The same designations are in lib/seo.ts (ISO_CERTS).
 */
export default async function Certificates({
  locale,
  label,
  tone = "bg-100",
}: {
  locale: string;
  label?: string;
  tone?: "" | "bg-50" | "bg-100";
}) {
  const t = await getTranslations({ locale, namespace: "home.certificates" });

  return (
    <section className={`sec ${tone}`.trim()} aria-labelledby="certificates-title">
      <div className="wrap">
        <SectionHead id="certificates-title" label={label ?? t("label")} title={t("title")} />
        <p className="svc-desc">{t("lead")}</p>
        <ul className="iso">
          {CERTS.map((c) => (
            <li key={c.key}>
              <b>
                {t("std")} {c.code}
              </b>
              <span>{t(`items.${c.key}`)}</span>
            </li>
          ))}
        </ul>
        <p className="src">{t("note")}</p>
      </div>
    </section>
  );
}
