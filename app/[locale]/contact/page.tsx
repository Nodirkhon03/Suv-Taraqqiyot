"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

type Status = "idle" | "sending" | "success" | "error";

const INPUT_CLASSES =
  "w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-engineering focus:border-transparent transition";

function Spinner() {
  return (
    <svg
      className="spinner"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      <path d="M9 2a7 7 0 017 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SuccessCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#16A34A" strokeWidth="2" />
      <path
        d="M7 12l3.5 3.5L17 9"
        stroke="#16A34A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="check-path"
      />
    </svg>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const tp = useTranslations("contactPage");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-navy tracking-tighter"
            >
              {t("title")}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 text-gray-600">
              {t("subtitle")}
            </motion.p>

            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className={`mt-8 space-y-5 ${status === "error" ? "shake" : ""}`}
              noValidate={false}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("name")}
                </label>
                <input id="name" name="name" type="text" required className={INPUT_CLASSES} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("email")}
                </label>
                <input id="email" name="email" type="email" required className={INPUT_CLASSES} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("phone")}
                </label>
                <input id="phone" name="phone" type="tel" className={INPUT_CLASSES} />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("company")}
                </label>
                <input id="company" name="company" type="text" className={INPUT_CLASSES} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className={`${INPUT_CLASSES} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl hover:bg-engineering transition font-medium disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering focus-visible:ring-offset-2"
              >
                {status === "sending" && <Spinner />}
                <span>{status === "sending" ? "…" : t("submit")}</span>
              </button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-green-700 font-medium"
                    role="status"
                  >
                    <SuccessCheck />
                    <span>{t("success")}</span>
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-red-600 font-medium"
                    role="alert"
                  >
                    {t("error")}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>

          <motion.div
            className="lg:pt-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-8 space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-engineering font-medium mb-2">
                  {tp("phoneLabel")}
                </h3>
                <a
                  href="tel:+998550553737"
                  className="text-lg font-medium text-navy hover:text-engineering transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering rounded"
                >
                  {tp("phoneValue")}
                </a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-engineering font-medium mb-2">
                  {tp("emailLabel")}
                </h3>
                <a
                  href="mailto:info@suv-taraqqiyot.com"
                  className="text-lg font-medium text-navy hover:text-engineering transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering rounded"
                >
                  info@suv-taraqqiyot.com
                </a>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-engineering font-medium mb-2">
                  {tp("workingHours")}
                </h3>
                <p className="text-gray-600">{tp("workingHoursValue")}</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed">{tp("address")}</p>
                <p className="mt-2 text-xs text-gray-400">{tp("sti")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
