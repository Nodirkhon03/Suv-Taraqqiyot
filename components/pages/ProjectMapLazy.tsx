"use client";

/*
 * Loads Leaflet (and the map tiles) only when the map frame comes within 400px of the viewport.
 * Without JavaScript the frame shows a one-line note; the register above holds every project.
 */
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { MapLabels, MapPoint } from "@/components/ProjectMap";

const ProjectMap = dynamic(() => import("@/components/ProjectMap"), { ssr: false });

export default function ProjectMapLazy({
  points,
  labels,
  loading,
}: {
  points: MapPoint[];
  labels: MapLabels;
  loading: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mapf-canvas">
      {show ? (
        <ProjectMap points={points} labels={labels} />
      ) : (
        <p className="mapf-note js-only" aria-hidden="true">
          {loading}
        </p>
      )}
    </div>
  );
}
