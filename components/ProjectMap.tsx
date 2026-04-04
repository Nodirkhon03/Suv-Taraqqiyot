"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAP_PROJECTS, type MapProject } from "@/lib/map-projects";

// Fix Leaflet default icon issue in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: "", iconUrl: "", shadowUrl: "" });

function getMarkerColor(project: MapProject): string {
  if (project.status === "ongoing") return "#24B5C6";
  if (project.category === "drilling") return "#2C86C7";
  return "#0B2B43";
}

function createMarkerIcon(project: MapProject): L.DivIcon {
  const color = getMarkerColor(project);
  const isPulsing = project.status === "ongoing";

  const html = `
    <div style="position:relative;width:20px;height:20px">
      ${isPulsing ? `<div style="position:absolute;top:-4px;left:-4px;width:28px;height:28px;
        border-radius:50%;border:2px solid #24B5C6;animation:suv-pulse 1.5s infinite;opacity:0.6"></div>` : ""}
      <div style="width:20px;height:20px;border-radius:50%;background:${color};
        border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -14],
  });
}

function createPopupContent(project: MapProject): string {
  const statusColor = project.status === "ongoing" ? "#24B5C6" : "#0B2B43";
  const statusLabel = project.status === "ongoing" ? "Ongoing" : "Completed";
  const location = project.title.includes("\u2014")
    ? project.title.split("\u2014")[1].trim()
    : "Uzbekistan";

  return `
    <div>
      <div style="background:${statusColor};padding:10px 14px">
        <span style="color:white;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.06em">${statusLabel}</span>
      </div>
      <div style="padding:14px">
        <p style="font-size:14px;font-weight:600;color:#0B2B43;margin:0 0 8px">${project.title}</p>
        <p style="font-size:12px;color:#64748b;margin:0 0 4px">\u{1F4CD} ${location}</p>
        <p style="font-size:12px;color:#64748b;margin:0 0 4px">\u{1F5D3} ${project.year}</p>
        <p style="font-size:12px;color:#64748b;margin:0 0 10px">\u{1F464} ${project.client}</p>
        ${project.funder ? `<p style="font-size:11px;color:#2C86C7;margin:0 0 10px">Funded by: ${project.funder}</p>` : ""}
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:18px;font-weight:700;color:#0B2B43">${project.amount}</span>
        </div>
      </div>
    </div>
  `;
}

function parseAmount(amount: string): number {
  const num = parseFloat(amount.replace(/[^0-9.]/g, ""));
  if (amount.includes("K")) return num * 1000;
  if (amount.includes("M")) return num * 1000000;
  return num;
}

function formatTotalValue(projects: MapProject[]): string {
  const total = projects.reduce((sum, p) => sum + parseAmount(p.amount), 0);
  return `$${(total / 1_000_000).toFixed(1)}M`;
}

// Inject global pulse animation + popup CSS
if (typeof window !== "undefined") {
  const styleId = "suv-map-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes suv-pulse {
        to { transform: scale(1.8); opacity: 0; }
      }
      .suv-popup .leaflet-popup-content-wrapper {
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        padding: 0;
        overflow: hidden;
        min-width: 260px;
      }
      .suv-popup .leaflet-popup-content { margin: 0; }
      .suv-popup .leaflet-popup-tip-container { display: none; }
    `;
    document.head.appendChild(style);
  }
}

type CategoryFilter = "all" | "drilling" | "infrastructure";
type StatusFilter = "all" | "completed" | "ongoing";

interface ProjectMapProps {
  mode?: "full" | "embed";
  onProjectSelect?: (project: MapProject) => void;
  activeProjectId?: number | null;
}

export default function ProjectMap({
  mode = "embed",
  onProjectSelect,
  activeProjectId,
}: ProjectMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [visibleProjects, setVisibleProjects] = useState<MapProject[]>(MAP_PROJECTS);

  const filterProjects = useCallback((cat: CategoryFilter, stat: StatusFilter) => {
    return MAP_PROJECTS.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (stat !== "all" && p.status !== stat) return false;
      return true;
    });
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [40.5, 67.5],
      zoom: 6,
      scrollWheelZoom: mode === "full",
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    MAP_PROJECTS.forEach((project) => {
      const marker = L.marker([project.lat, project.lng], {
        icon: createMarkerIcon(project),
      });

      marker.bindPopup(createPopupContent(project), {
        className: "suv-popup",
        maxWidth: 300,
        closeButton: true,
      });

      marker.on("click", () => {
        onProjectSelect?.(project);
      });

      marker.addTo(map);
      markersRef.current.set(project.id, marker);
    });

    mapRef.current = map;
    const markers = markersRef.current;

    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter markers
  useEffect(() => {
    const filtered = filterProjects(categoryFilter, statusFilter);
    setVisibleProjects(filtered);
    const filteredIds = new Set(filtered.map((p) => p.id));

    markersRef.current.forEach((marker, id) => {
      if (filteredIds.has(id)) {
        if (mapRef.current && !mapRef.current.hasLayer(marker)) {
          marker.addTo(mapRef.current);
        }
      } else {
        marker.remove();
      }
    });
  }, [categoryFilter, statusFilter, filterProjects]);

  // Fly to active project from sidebar
  useEffect(() => {
    if (activeProjectId == null || !mapRef.current) return;
    const marker = markersRef.current.get(activeProjectId);
    if (marker) {
      const proj = MAP_PROJECTS.find((p) => p.id === activeProjectId);
      if (proj) {
        mapRef.current.flyTo([proj.lat, proj.lng], 9, { duration: 1.2 });
        setTimeout(() => marker.openPopup(), 600);
      }
    }
  }, [activeProjectId]);

  const isEmbed = mode === "embed";

  return (
    <div className="relative w-full" style={isEmbed ? { height: "360px" } : undefined}>
      {/* Map container */}
      <div
        ref={mapContainerRef}
        className={`w-full ${isEmbed ? "h-[360px]" : "h-[400px] lg:h-[600px]"}`}
      />

      {/* Stats panel — top left */}
      {!isEmbed && (
        <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 px-4 py-3">
          <p className="text-sm font-semibold text-[#0B2B43]">
            Showing {visibleProjects.length} of {MAP_PROJECTS.length} projects
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Total value: {formatTotalValue(visibleProjects)}
          </p>
        </div>
      )}

      {/* Filter panel — top right */}
      {!isEmbed && (
        <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-[#0B2B43] font-semibold mb-2">
            Project Filter
          </p>
          <div className="flex gap-1.5 mb-2">
            {(["all", "drilling", "infrastructure"] as CategoryFilter[]).map((key) => (
              <button
                key={key}
                onClick={() => setCategoryFilter(key)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  categoryFilter === key
                    ? "bg-[#0B2B43] text-white"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {key === "all" ? "All" : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {(["all", "completed", "ongoing"] as StatusFilter[]).map((key) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  statusFilter === key
                    ? "bg-[#0B2B43] text-white"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {key === "all" ? "All" : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
