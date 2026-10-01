"use client";

/*
 * Leaflet map of the project register. Loaded only on /projects, only when its frame scrolls
 * near the viewport (components/pages/ProjectMapLazy.tsx). It gets every text already translated
 * from the server page, so it ships no message catalogue and no project data of its own.
 * No pulsing markers: nothing on the page moves except what the visitor moves.
 * Projects without one stated site (lib/projects.ts has no `coordinates`) are never pinned; the
 * page passes only pinned points, and any point without finite coordinates is skipped here too.
 */
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapPoint {
  slug: string;
  href: string;
  title: string;
  region: string;
  years: string;
  value: string;
  ongoing: boolean;
  lat: number;
  lng: number;
}

export interface MapLabels {
  aria: string;
  completed: string;
  ongoing: string;
  open: string;
}

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export default function ProjectMap({ points, labels }: { points: MapPoint[]; labels: MapLabels }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, {
      center: [40.9, 66.4],
      zoom: 6,
      scrollWheelZoom: false,
      zoomControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
      detectRetina: true,
    }).addTo(map);
    map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');

    const bounds: [number, number][] = [];
    points.filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng)).forEach((p) => {
      const icon = L.divIcon({
        html: `<div class="suv-pin" style="background:${p.ongoing ? "#24B5C6" : "#0B2B43"}"></div>`,
        className: "",
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -10],
      });
      const status = p.ongoing ? labels.ongoing : labels.completed;
      L.marker([p.lat, p.lng], { icon, title: p.title, alt: p.title })
        .bindPopup(
          `<div class="pp-h">${esc(status)} · ${esc(p.years)}</div>
           <div class="pp-b"><b>${esc(p.title)}</b><span>${esc(p.region)}</span>
             <div class="pp-f"><em>${esc(p.value)}</em><a href="${esc(p.href)}">${esc(labels.open)}</a></div>
           </div>`,
          { className: "suv-popup", maxWidth: 300 }
        )
        .addTo(map);
      bounds.push([p.lat, p.lng]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [32, 32] });

    return () => {
      map.remove();
    };
  }, [points, labels]);

  return <div ref={ref} className="mapf-canvas" role="region" aria-label={labels.aria} />;
}
