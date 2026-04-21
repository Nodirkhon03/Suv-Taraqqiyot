"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS = ["q1", "q2", "q3"] as const;

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering rounded"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-navy">{question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-engineering"
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-gray-600 max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SeoKeywords() {
  const t = useTranslations("seoFaq");
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) =>
    setOpenIndex((current) => (current === idx ? null : idx));

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-engineering font-medium"
        >
          {t("label")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-3 text-3xl sm:text-4xl font-bold text-navy tracking-tighter"
        >
          {t("title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 max-w-4xl"
        >
          {ITEMS.map((key, idx) => (
            <FaqItem
              key={key}
              question={t(`items.${key}.q`)}
              answer={t(`items.${key}.a`)}
              isOpen={openIndex === idx}
              onToggle={() => toggle(idx)}
            />
          ))}
        </motion.div>

        {/* Uzbek Cyrillic fallback — visible on UZ locale to support Cyrillic-script searches */}
        {locale === "uz" && (
          <div className="mt-12 max-w-4xl">
            <p className="text-xs uppercase tracking-widest text-engineering font-medium">
              Ўзбек кирилл
            </p>
            <h3 className="mt-3 text-2xl font-bold text-navy">
              Тошкент ва бошқа вилоятларда хизматлар
            </h3>
            <div className="mt-6 space-y-6 text-sm leading-relaxed text-gray-600">
              <div>
                <p className="font-medium text-navy">
                  Тошкент ва бошқа вилоятларда артезиан қудруқ бурғулайсизми?
                </p>
                <p className="mt-2">
                  Ҳа. СУВ-ТАРАККИЁТ МЧЖ Ўзбекистоннинг барча вилоятларида —
                  Тошкент, Наманган, Самарқанд, Қашқадарё, Сирдарё ва Фарғона
                  водийсида — артезиан ҳамда гидрогеологик қудруқларни бурғулайди.
                  Чуқурлик 1200 м гача.
                </p>
              </div>
              <div>
                <p className="font-medium text-navy">
                  Қандай диаметрли сув қувурларини ўрнатасиз?
                </p>
                <p className="mt-2">
                  32 мм дан 1200 мм гача бўлган диаметрли ПЕ ва пўлат қувурлардан
                  сув қувурлари қурилишини амалга оширамиз. Йиллик ҳажм — 200 км
                  гача қувур.
                </p>
              </div>
              <div>
                <p className="font-medium text-navy">
                  Жаҳон банки ва ЕБРР лойиҳаларида ишлайсизми?
                </p>
                <p className="mt-2">
                  Ҳа. СУВ-ТАРАККИЁТ Жаҳон банки, Европа тикланиш ва тараққиёт
                  банки, Осиё тараққиёт банки, ОПЕК жамғармаси ва Саудия
                  тараққиёт жамғармаси томонидан молиялаштирилган лойиҳаларни
                  амалга оширган.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
