"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLocale } from "next-intl";
import { projects, type Project, isInternationallyFunded } from "@/lib/projects";

const ProjectMap = dynamic(() => import("@/components/ProjectMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[360px] w-full rounded-2xl bg-gray-100 animate-pulse" />
  ),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

type FilterType = "all" | "drilling" | "infrastructure";

export default function ProjectsPage() {
  const t = useTranslations("projectsPage");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "drilling", label: t("filterDrilling") },
    { key: "infrastructure", label: t("filterInfrastructure") },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Stats Bar */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-white border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
            <span className="text-lg font-bold text-[#0B2B43]">
              {t("statsProjects")}
            </span>
            <span className="hidden sm:block w-px h-6 bg-gray-200" />
            <span className="text-lg font-bold text-[#2C86C7]">
              {t("statsValue")}
            </span>
            <span className="hidden sm:block w-px h-6 bg-gray-200" />
            <span className="text-lg font-bold text-[#0B2B43]">
              {t("statsYears")}
            </span>
          </div>
        </div>
      </motion.section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-wrap gap-3"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? "bg-[#0B2B43] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Project Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              t={t}
              locale={locale}
            />
          ))}
        </motion.div>
      </section>

      {/* Geographic Footprint Map */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-xs uppercase tracking-widest text-[#2C86C7] font-medium mb-2">
              {t("mapTitle")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B43] tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
              {t("geographicFootprint")}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <ProjectMap mode="embed" />
            </div>
            <div className="mt-4 text-center">
              <Link
                href={`/${locale}/projects/map`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2C86C7] hover:text-[#0B2B43] transition-colors"
              >
                {t("openFullMap")} &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({
  project,
  t,
  locale,
}: {
  project: Project;
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  return (
    <motion.div variants={cardVariant} className="h-full">
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="group h-full rounded-2xl border border-gray-100 shadow-sm bg-white p-6 flex flex-col transition hover:shadow-md hover:border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering focus-visible:ring-offset-2"
      >
      {/* Badges row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Status badge */}
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
            project.status === "completed"
              ? "bg-green-50 text-green-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {project.status === "completed" ? t("completed") : t("ongoing")}
        </span>
        {/* Category badge */}
        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">
          {project.category}
        </span>
        {/* International funder badge */}
        {isInternationallyFunded(project) && (
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            {t("international")}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[#0B2B43] mt-3 leading-tight group-hover:text-[#2C86C7] transition-colors">
        {project.title}
      </h3>

      {/* Location */}
      <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-500">
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <span>{project.location}</span>
      </div>

      {/* Year */}
      <p className="text-sm text-gray-500 mt-1">{project.year}</p>

      {/* Client */}
      <p className="text-sm text-gray-600 mt-2">{project.client}</p>

      {/* Funder */}
      {project.funder && (
        <p className="text-sm italic text-[#2C86C7] mt-1">
          {t("fundedBy")}: {project.funder}
        </p>
      )}

      {/* Amount */}
      <p className="text-2xl font-bold text-[#0B2B43] mt-3">
        {project.amount}
      </p>

      {/* Role badge + view details arrow */}
      <div className="mt-auto pt-4 flex items-center justify-between">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            project.role === "General Contractor"
              ? "bg-blue-50 text-blue-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {project.role === "General Contractor"
            ? t("generalContractor")
            : t("subcontractor")}
        </span>
        <span className="text-xs font-medium text-[#2C86C7] group-hover:translate-x-0.5 transition-transform">
          {t("viewDetails")} &rarr;
        </span>
      </div>
      </Link>
    </motion.div>
  );
}
