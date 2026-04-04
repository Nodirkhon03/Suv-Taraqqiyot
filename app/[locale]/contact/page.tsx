"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function ContactPage() {
  const t = useTranslations("contact");
  const tp = useTranslations("contactPage");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
    <>
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Form */}
            <div>
              <motion.h1
                className="text-3xl sm:text-4xl font-bold text-navy tracking-tighter"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                {t("title")}
              </motion.h1>
              <motion.p
                className="mt-3 text-gray-600"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.1}
              >
                {t("subtitle")}
              </motion.p>

              <motion.form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.2}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-engineering focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-engineering focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("phone")}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-engineering focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("company")}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-engineering focus:border-transparent transition"
                  />
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-engineering focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-navy text-white px-6 py-3 rounded-xl hover:bg-engineering transition font-medium disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering focus-visible:ring-offset-2"
                >
                  {status === "sending" ? "..." : t("submit")}
                </button>

                {status === "success" && (
                  <p className="text-sm text-green-600 font-medium">{t("success")}</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-600 font-medium">{t("error")}</p>
                )}
              </motion.form>
            </div>

            {/* Right: Contact info */}
            <motion.div
              className="lg:pt-16"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              <div className="rounded-2xl border border-gray-100 shadow-sm bg-white p-8 space-y-6">
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
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tp("address")}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">{tp("sti")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
