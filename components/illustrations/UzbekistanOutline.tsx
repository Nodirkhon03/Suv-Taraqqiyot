"use client";

import { motion } from "framer-motion";
import { MAP_PROJECTS } from "@/lib/map-projects";

function projectToCanvas(lat: number, lng: number): { x: number; y: number } {
  const minLng = 55.9;
  const maxLng = 73.2;
  const minLat = 37.2;
  const maxLat = 45.6;
  const x = ((lng - minLng) / (maxLng - minLng)) * 780 + 10;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 380 + 10;
  return { x, y };
}

function parseAmount(amount: string): number {
  const num = parseFloat(amount.replace(/[^0-9.]/g, ""));
  if (amount.includes("M")) return num;
  if (amount.includes("K")) return num / 1000;
  return num / 1_000_000;
}

export default function UzbekistanOutline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      role="img"
    >
      {/* Country outline — simplified representation of Uzbekistan */}
      <path
        d="M80,180 L120,150 L200,140 L260,150 L310,130 L360,140 L420,120 L480,130 L520,115 L570,120 L610,140 L650,180 L670,230 L690,270 L720,300 L750,320 L740,355 L700,370 L640,365 L580,345 L520,340 L460,350 L420,345 L380,335 L330,340 L280,345 L240,335 L200,320 L170,290 L140,270 L115,240 L95,210 Z"
        fill="rgba(44, 134, 199, 0.05)"
        stroke="#0B2B43"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Region hints */}
      <line x1="260" y1="150" x2="270" y2="300" stroke="#CBD5E1" strokeWidth="0.5" />
      <line x1="400" y1="130" x2="410" y2="340" stroke="#CBD5E1" strokeWidth="0.5" />
      <line x1="520" y1="120" x2="530" y2="340" stroke="#CBD5E1" strokeWidth="0.5" />

      {/* Project dots */}
      {MAP_PROJECTS.map((project, i) => {
        const { x, y } = projectToCanvas(project.lat, project.lng);
        const value = parseAmount(project.amount);
        const r = Math.max(4, Math.min(12, 4 + value * 1.2));
        return (
          <motion.circle
            key={project.id}
            cx={x}
            cy={y}
            r={r}
            fill="#24B5C6"
            fillOpacity="0.75"
            stroke="white"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <title>{`${project.title} — ${project.amount}`}</title>
          </motion.circle>
        );
      })}

      {/* Legend */}
      <g transform="translate(30, 350)">
        <circle cx="0" cy="0" r="5" fill="#24B5C6" fillOpacity="0.75" stroke="white" strokeWidth="1" />
        <text x="10" y="4" fontSize="11" fontFamily="Inter, sans-serif" fill="#0B2B43">
          Project location
        </text>
      </g>
    </svg>
  );
}
