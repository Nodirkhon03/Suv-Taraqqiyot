import Link from "next/link";
import { getTranslations } from "next-intl/server";
import SectionHead from "@/components/home/SectionHead";
import { projects, type Project } from "@/lib/projects";
import { formatMillions, millions, projectBySlug } from "@/lib/format";

/**
 * 02 — six rows (seven projects) of the 20-project ledger. Years, values, status and links come from
 * lib/projects.ts; titles, regions and client names are translated in messages (home.register.rows).
 * Qoʻshrabot W/3.1 + W/4.1 are two contracts shown as one row; their values are summed, and the
 * "shown / total" counter counts projects (7), not rows (6).
 */
const ROWS = [
  { key: "uzgazoil", slugs: ["uzgazoil-wells-drilling"] },
  { key: "koshrabad", slugs: ["koshrabad-water-w31", "koshrabad-water-w41"] },
  { key: "yangiyul", slugs: ["yangiyul-water-supply"] },
  { key: "zhiydakapa", slugs: ["zhiydakapa-water-intake-namangan"] },
  { key: "syrdarya", slugs: ["syrdarya-water-supply-systems"] },
  { key: "namangan2", slugs: ["namangan-water-supply-phase2"] },
] as const;

function pick(slugs: readonly string[]): Project[] {
  return slugs.map(projectBySlug);
}

export default async function ProjectRegister({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home.register" });

  const rows = ROWS.map(({ key, slugs }) => {
    const group = pick(slugs);
    const first = group[0];
    const ongoing = group.some((p) => p.status === "ongoing");
    return {
      key,
      href: `/${locale}/projects/${first.slug}`,
      years: first.year.replace("present", t("present")),
      value: t("amount", { amount: formatMillions(group.reduce((s, p) => s + millions(p.amount), 0), locale) }),
      ongoing,
      hasFunder: group.some((p) => !!p.funder),
    };
  });

  return (
    <section className="sec bg-100" id="loyihalar" aria-labelledby="register-title">
      <div className="wrap">
        <SectionHead id="register-title" label={t("label")} title={t("title")} />
        <table className="reg">
          <thead>
            <tr>
              <th scope="col">{t("columns.years")}</th>
              <th scope="col">{t("columns.project")}</th>
              <th scope="col">{t("columns.region")}</th>
              <th scope="col">{t("columns.client")}</th>
              <th scope="col" className="val">{t("columns.value")}</th>
              <th scope="col">{t("columns.status")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key}>
                <td className="yr">{r.years}</td>
                <td className="prj">
                  <Link href={r.href}>{t(`rows.${r.key}.title`)}</Link>
                </td>
                <td className="rg">{t(`rows.${r.key}.region`)}</td>
                <td className="cl">
                  <span>{t(`rows.${r.key}.client`)}</span>
                  {r.hasFunder && <span>{t(`rows.${r.key}.funder`)}</span>}
                </td>
                <td className="val">{r.value}</td>
                <td className={r.ongoing ? "st" : "st done"}>
                  <i aria-hidden="true" />
                  {t(r.ongoing ? "status.ongoing" : "status.completed")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="reg-foot">
          <Link className="more" href={`/${locale}/projects`}>
            {t("allLink")}
          </Link>
          <span className="src" style={{ margin: 0 }}>
            {t("count", { shown: ROWS.reduce((n, r) => n + r.slugs.length, 0), total: projects.length })}
          </span>
        </div>
      </div>
    </section>
  );
}
