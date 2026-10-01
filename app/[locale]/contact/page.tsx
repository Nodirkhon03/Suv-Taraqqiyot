import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/pages/PageHero";
import SectionHead from "@/components/home/SectionHead";
import ContactForm from "@/components/pages/ContactForm";
import { EMAIL, PHONE, PHONE_HREF } from "@/lib/site";

/* Static map links instead of an embedded map: no third-party script, works in any viewer. */
const MAP_QUERY = encodeURIComponent("18 Khusan Shams Street, Mirzo Ulugbek District, Tashkent, Uzbekistan");
const GOOGLE_MAPS = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const YANDEX_MAPS = `https://yandex.uz/maps/?text=${MAP_QUERY}`;

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });
  /* The form is the only client component that reads messages; it gets just its own namespace
     (≈1 KB) instead of the whole catalogue being serialised into every page. */
  const messages = await getMessages({ locale });
  const formMessages: AbstractIntlMessages = {
    contactPage: { form: (messages.contactPage as AbstractIntlMessages).form },
  };

  return (
    <>
      <PageHero title={t("hero.title")} lead={t("hero.lead")}>
        <div className="cta-row">
          <a className="btn btn-white" href={PHONE_HREF}>
            {t("hero.call")}
          </a>
          <a className="link-light" href="#sorov">
            {t("hero.toForm")}
          </a>
        </div>
        <p className="note">
          {t("hero.note")} · <a href={PHONE_HREF}>{PHONE}</a>
        </p>
      </PageHero>

      <section className="sec" aria-labelledby="form-title">
        <div className="wrap">
          <div className="ct">
            <div id="sorov">
              <SectionHead id="form-title" label={t("form.label")} title={t("form.title")} />
              <NextIntlClientProvider locale={locale} messages={formMessages}>
                <ContactForm email={EMAIL} />
              </NextIntlClientProvider>
            </div>
            <div>
              <SectionHead id="details-title" label={t("details.label")} title={t("details.title")} />
              <dl className="tb one">
                <div>
                  <dt>{t("details.phone")}</dt>
                  <dd className="val">
                    <a href={PHONE_HREF}>{PHONE}</a>
                  </dd>
                </div>
                <div>
                  <dt>{t("details.email")}</dt>
                  <dd>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </dd>
                </div>
                <div>
                  <dt>{t("details.address")}</dt>
                  <dd>
                    {t("details.addressValue")}
                    <span className="maplinks">
                      <a href={GOOGLE_MAPS} target="_blank" rel="noopener noreferrer">
                        {t("details.google")}
                      </a>
                      <a href={YANDEX_MAPS} target="_blank" rel="noopener noreferrer">
                        {t("details.yandex")}
                      </a>
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>{t("details.hours")}</dt>
                  <dd>{t("details.hoursValue")}</dd>
                </div>
                <div>
                  <dt>{t("details.tin")}</dt>
                  <dd className="mono">203 681 239</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
