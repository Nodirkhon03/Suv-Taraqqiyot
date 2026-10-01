import { getTranslations } from "next-intl/server";
import SectionHead from "@/components/home/SectionHead";

const ITEMS = ["q1", "q2", "q3"] as const;

/**
 * FAQ — an SEO/GEO asset: server-rendered questions and answers (in the HTML even with JS off)
 * plus the matching FAQPage JSON-LD. <details> gives the open/close without JavaScript.
 */
export default async function SeoKeywords({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "seoFaq" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ITEMS.map((key) => ({
      "@type": "Question",
      name: t(`items.${key}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`items.${key}.a`),
      },
    })),
  };

  return (
    <section className="sec" aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="wrap">
        <SectionHead id="faq-title" label={`${tHome("faqNo")} · ${t("label")}`} title={t("title")} />
        <div className="faq">
          {ITEMS.map((key, i) => (
            <details key={key} open={i === 0}>
              <summary>{t(`items.${key}.q`)}</summary>
              <p>{t(`items.${key}.a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
