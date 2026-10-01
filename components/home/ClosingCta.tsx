import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { EMAIL, PHONE, PHONE_HREF } from "@/lib/site";

/** Navy closing band. Inner pages may pass their own title and button text. */
export default async function ClosingCta({
  locale,
  title,
  button,
}: {
  locale: string;
  title?: string;
  button?: string;
}) {
  const t = await getTranslations({ locale, namespace: "home.closing" });

  return (
    <section className="close" aria-labelledby="closing-title">
      <div className="wrap">
        <div>
          <h2 id="closing-title" className="h2">
            {title ?? t("title")}
          </h2>
          <div className="contact">
            <a href={PHONE_HREF}>{PHONE}</a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
        <Link className="btn btn-white" href={`/${locale}/contact`}>
          {button ?? t("button")}
        </Link>
      </div>
    </section>
  );
}
