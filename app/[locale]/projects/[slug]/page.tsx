import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { projects, isInternationallyFunded } from "@/lib/projects";
import { locales, type Locale } from "@/i18n";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const p of projects) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — SUV-Taraqqiyot LLC`,
    description:
      project.description ||
      `${project.title} — ${project.location} — ${project.year} — ${project.amount}`,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}/projects/${slug}`])
      ),
    },
  };
}

export default async function ProjectDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations("projectDetailPage");

  const statusClasses =
    project.status === "completed"
      ? "bg-green-50 text-green-700"
      : "bg-amber-50 text-amber-700";

  const roleLabel =
    project.role === "General Contractor"
      ? t("generalContractor")
      : t("subcontractor");

  const infoRows: { label: string; value: string }[] = [
    { label: t("location"), value: project.location },
    { label: t("period"), value: project.year },
    { label: t("client"), value: project.client },
    ...(project.funder ? [{ label: t("funder"), value: project.funder }] : []),
    { label: t("amount"), value: project.amount },
    ...(project.amountUzs
      ? [{ label: t("amountUzs"), value: project.amountUzs }]
      : []),
    ...(project.contractNumber
      ? [{ label: t("contractNumber"), value: project.contractNumber }]
      : []),
    { label: t("role"), value: roleLabel },
    {
      label: t("category"),
      value: project.category === "drilling" ? t("drilling") : t("infrastructure"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            &larr; {t("backToProjects")}
          </Link>

          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${statusClasses}`}
            >
              {project.status === "completed" ? t("completed") : t("ongoing")}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
              {project.category === "drilling"
                ? t("drilling")
                : t("infrastructure")}
            </span>
            {isInternationallyFunded(project) && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-700">
                {t("international")}
              </span>
            )}
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h1>

          <p className="mt-4 text-lg text-white/70">{project.location}</p>
        </div>
      </section>

      {/* Content grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Left: description + scope + gallery */}
          <div className="lg:col-span-2 space-y-12">
            {project.description && (
              <div>
                <p className="text-xs uppercase tracking-widest text-engineering font-medium">
                  {t("overview")}
                </p>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {project.scope && project.scope.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-engineering font-medium">
                  {t("scope")}
                </p>
                <ul className="mt-3 space-y-2">
                  {project.scope.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-engineering shrink-0" />
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className="text-xs uppercase tracking-widest text-engineering font-medium">
                {t("gallery")}
              </p>
              {project.images && project.images.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 bg-gray-50"
                    >
                      <Image
                        src={src}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-8 py-12 text-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    aria-hidden="true"
                    className="mx-auto text-gray-300"
                  >
                    <rect
                      x="4"
                      y="8"
                      width="32"
                      height="24"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="14" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M4 28l8-8 6 6 8-10 10 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-4 text-sm text-gray-500">
                    {t("galleryEmpty")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: metadata card */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-gray-100 shadow-sm bg-white p-6">
              <p className="text-2xl font-bold text-navy">{project.amount}</p>
              <p className="text-sm text-gray-500">{t("amount")}</p>
              <dl className="mt-6 divide-y divide-gray-100">
                {infoRows.map((row) => (
                  <div
                    key={row.label}
                    className="py-3 first:pt-0 last:pb-0"
                  >
                    <dt className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-sm text-navy font-medium leading-relaxed">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href={`/${locale}/contact`}
                className="mt-6 block text-center bg-navy text-white px-5 py-3 rounded-xl font-medium hover:bg-engineering transition"
              >
                {t("contactCta")}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
