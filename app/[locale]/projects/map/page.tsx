"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MAP_PROJECTS } from "@/lib/map-projects";

const ProjectMap = dynamic(() => import("@/components/ProjectMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] lg:h-[600px] w-full bg-gray-100 animate-pulse" />
  ),
});

function getStatusDotColor(status: string) {
  return status === "ongoing" ? "bg-[#24B5C6]" : "bg-[#0B2B43]";
}

export default function ProjectMapPage() {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#0B2B43] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            Project Locations Across Uzbekistan
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/70">
            15 projects &middot; $54M+ total value &middot; 2004&ndash;present
          </p>
        </div>
      </section>

      {/* Map + Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map — 65% */}
          <div className="w-full lg:w-[65%] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <ProjectMap
              mode="full"
              onProjectSelect={(p) => setActiveProjectId(p.id)}
              activeProjectId={activeProjectId}
            />
          </div>

          {/* Sidebar — 35% desktop */}
          <div className="hidden lg:block w-full lg:w-[35%]">
            <div className="rounded-2xl border border-gray-100 shadow-sm bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-[#0B2B43] uppercase tracking-wider">
                  All Projects
                </h2>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: "552px" }}>
                {MAP_PROJECTS.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setActiveProjectId(project.id)}
                    className={`w-full text-left px-5 py-4 border-b border-gray-50 transition-colors hover:bg-blue-50 ${
                      activeProjectId === project.id
                        ? "bg-blue-50 border-l-[3px] border-l-[#2C86C7]"
                        : "border-l-[3px] border-l-transparent"
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#0B2B43] leading-tight">
                      {project.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-gray-500">{project.year}</span>
                      <span className="text-xs font-semibold text-[#0B2B43]">{project.amount}</span>
                      <span className={`w-2 h-2 rounded-full ${getStatusDotColor(project.status)}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile bottom drawer */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[1100]">
          {/* Pull handle */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="w-full bg-white border-t border-gray-200 pt-2 pb-1 flex justify-center"
          >
            <div className="w-10 h-1 rounded-full bg-gray-300" />
          </button>
          <div
            className={`bg-white border-t border-gray-200 overflow-y-auto transition-all duration-300 ${
              drawerOpen ? "max-h-[40vh]" : "max-h-0"
            }`}
          >
            {MAP_PROJECTS.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setActiveProjectId(project.id);
                  setDrawerOpen(false);
                }}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 ${
                  activeProjectId === project.id
                    ? "bg-blue-50 border-l-[3px] border-l-[#2C86C7]"
                    : "border-l-[3px] border-l-transparent"
                }`}
              >
                <p className="text-sm font-semibold text-[#0B2B43] leading-tight">
                  {project.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500">{project.year}</span>
                  <span className="text-xs font-semibold text-[#0B2B43]">{project.amount}</span>
                  <span className={`w-2 h-2 rounded-full ${getStatusDotColor(project.status)}`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-[#F8FAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "13", label: "Completed" },
              { value: "2", label: "Ongoing" },
              { value: "$54M+", label: "Total Value" },
              { value: "10+", label: "Regions Covered" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-[#0B2B43]">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
