import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NAV_ITEMS } from "@/components/Header";

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "site" });
  const base = `/${locale}`;

  return (
    <footer className="site-foot">
      <div className="wrap">
        <div>
          <p>
            <strong>{t("footer.company")}</strong> · {t("footer.founded")} ·{" "}
            <span className="mono">{t("footer.tin")}</span>
          </p>
          <p>{t("footer.address")}</p>
        </div>
        <nav aria-label={t("footerNav")}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.key} href={`${base}${item.href}`}>
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
        <p className="copy">{t("footer.copy", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
