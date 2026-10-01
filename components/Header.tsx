import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { DetailsAutoClose, LangLinks, NavLink } from "@/components/PathLinks";
import { LANGUAGES } from "@/lib/languages";

export const NAV_ITEMS = [
  { key: "company", href: "/about" },
  { key: "services", href: "/services" },
  { key: "equipment", href: "/equipment" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
] as const;

/** Server component. Phone menu and language switcher are <details>, so both work without JS. */
export default async function Header({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "site" });
  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];
  const base = `/${locale}`;

  return (
    <header className="hdr">
      <div className="wrap">
        <Link className="logo" href={base} aria-label={t("homeLabel")}>
          <Image src="/images/logo-main.png" width={565} height={396} alt="SUV-TARAQQIYOT" priority sizes="80px" />
        </Link>

        <nav className="nav" aria-label={t("mainNav")}>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.key} href={`${base}${item.href}`}>
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <details className="lang" data-autoclose="">
          <summary aria-label={`${t("language")}: ${current.name}`}>{current.name}</summary>
          <LangLinks locale={locale} asList />
        </details>

        <Link className="btn btn-navy hdr-cta" href={`${base}/contact`}>
          {t("cta")}
        </Link>

        <nav className="phone-nav" aria-label={t("quickNav")}>
          <NavLink href={`${base}/projects`}>{t("nav.projects")}</NavLink>
          <NavLink href={`${base}/contact`}>{t("nav.contact")}</NavLink>
        </nav>

        <details className="menu" data-autoclose="">
          <summary>{t("menu")}</summary>
          <div className="panel">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.key} href={`${base}${item.href}`}>
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <p>{t("language")}</p>
            <div className="langs">
              <LangLinks locale={locale} />
            </div>
          </div>
        </details>
        <DetailsAutoClose />
      </div>
    </header>
  );
}
