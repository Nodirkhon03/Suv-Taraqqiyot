import { getTranslations } from "next-intl/server";
import SectionHead from "@/components/home/SectionHead";

/** 05 — clients and funders as two ruled lists: no pills, no logo wall. */
export default async function Clients({
  locale,
  label,
  tone = "",
}: {
  locale: string;
  label?: string;
  tone?: "" | "bg-50" | "bg-100";
}) {
  const t = await getTranslations({ locale, namespace: "home.clients" });
  const clients = t.raw("clients") as string[];
  const funders = t.raw("funders") as string[];

  return (
    <section className={`sec ${tone}`.trim()} aria-labelledby="clients-title">
      <div className="wrap">
        <SectionHead id="clients-title" label={label ?? t("label")} title={t("title")} />
        <div className="two">
          <div>
            <h3>{t("clientsLabel")}</h3>
            <ul>
              {clients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t("fundersLabel")}</h3>
            <ul>
              {funders.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
