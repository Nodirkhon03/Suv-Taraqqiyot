import PipesDrawing from "@/components/pages/drawings/PipesDrawing";
import FacilitiesDrawing from "@/components/pages/drawings/FacilitiesDrawing";
import TowerDrawing from "@/components/pages/drawings/TowerDrawing";
import CivilDrawing from "@/components/pages/drawings/CivilDrawing";
import WellDrawing from "@/components/pages/drawings/WellDrawing";
import type { DwgText } from "@/components/pages/drawings/parts";

/**
 * One engineering detail per service, in the line language of the home hero drawing (navy structure, blue
 * dimensions and leaders, cyan water, sand ground, grey concrete) on the light drafting grid. Server-rendered SVG,
 * complete when static; CSS loops (app/globals.css, "service drawings") run only with prefers-reduced-motion:
 * no-preference and pause off-screen (DrawingMotion on the services page). Every figure on a drawing is repeated in
 * the text beside it, so the drawing is decorative.
 */
export type ServiceKey = "pipes" | "facilities" | "towers" | "civil" | "wells";
export type DrawingText = DwgText;

export default function ServiceDrawing({ name, text }: { name: ServiceKey; text: DrawingText }) {
  return (
    <figure className={`dwg dwg-${name}`} aria-hidden="true">
      {name === "pipes" && <PipesDrawing t={text} />}
      {name === "facilities" && <FacilitiesDrawing t={text} />}
      {name === "towers" && <TowerDrawing t={text} />}
      {name === "civil" && <CivilDrawing t={text} />}
      {name === "wells" && <WellDrawing t={text} />}
    </figure>
  );
}
