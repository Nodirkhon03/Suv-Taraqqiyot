import { getTranslations } from "next-intl/server";
import SectionHead from "@/components/home/SectionHead";

type Row = { item: string; qty: string; par: string };

/** 01 — what the company builds in a year, set as a drawing schedule, not a counter row. */
/** `label` and `tone` let inner pages renumber the section and change its ground. */
export default async function CapacitySchedule({
  locale,
  label,
  tone = "",
}: {
  locale: string;
  label?: string;
  tone?: "" | "bg-50" | "bg-100";
}) {
  const t = await getTranslations({ locale, namespace: "home.capacity" });
  const rows = t.raw("rows") as Row[];

  return (
    <section className={`sec ${tone}`.trim()} aria-labelledby="capacity-title">
      <div className="wrap">
        <SectionHead id="capacity-title" label={label ?? t("label")} title={t("title")} />
        <table className="sched">
          <thead>
            <tr>
              <th className="pos" scope="col">{t("columns.pos")}</th>
              <th scope="col">{t("columns.item")}</th>
              <th scope="col">{t("columns.qty")}</th>
              <th scope="col">{t("columns.par")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.item}>
                <td className="pos">{String(i + 1).padStart(2, "0")}</td>
                <th scope="row" className="item">{r.item}</th>
                <td className="qty">{r.qty}</td>
                <td className="par">{r.par}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Two citations: the presentation (annual figures) and the company for the 1200 m depth. */}
        <p className="src">{t("source")}</p>
        <p className="src" style={{ marginTop: ".25rem" }}>
          {t("sourceDepth")}
        </p>
      </div>
    </section>
  );
}
