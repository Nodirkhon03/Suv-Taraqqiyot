import { equipment } from "@/lib/equipment";

/**
 * Standardised equipment cutouts (transparent 1600×1200 WebP) for the six civil machines the
 * home page shows first. Paths come from design/imagery/equipment-map.json (design/ is not
 * deployed, so the mapping is copied here). `source` is the exact name in lib/equipment.ts,
 * which supplies the quantity.
 */
export type FleetType = "excavator" | "backhoe" | "crane" | "dump" | "welder";

export interface FleetPlate {
  model: string;
  type: FleetType;
  image: string;
  quantity: number;
}

const HOME_FLEET: { model: string; type: FleetType; source: string; image: string }[] = [
  { model: "Hyundai Robex 210W-9S", type: "excavator", source: "Hyundai Robex 210W-9S Excavator", image: "/images/equipment/hyundai-r210w-9s.webp" },
  { model: "Hyundai Robex 140W-9S", type: "excavator", source: "Hyundai Excavator RW140", image: "/images/equipment/hyundai-r140w-9s.webp" },
  { model: "JCB 4CX", type: "backhoe", source: "Backhoe Loader JCB 4CX", image: "/images/equipment/jcb-4cx.webp" },
  { model: "Sany STC500", type: "crane", source: "Truck Crane Sany STC500", image: "/images/equipment/sany-stc500e.webp" },
  { model: "Shacman F3000", type: "dump", source: "Dump Truck SHAANXI CHACMAN F3000", image: "/images/equipment/shacman-f3000-dump.webp" },
  { model: "Turan Makina AL 800", type: "welder", source: "Pipe Welding Machine Turan Makina AL 800", image: "/images/equipment/turan-al800.webp" },
];

export const homeFleet: FleetPlate[] = HOME_FLEET.map(({ source, ...plate }) => {
  const item = equipment.find((e) => e.name === source);
  if (!item) throw new Error(`lib/fleet.ts: "${source}" is not in lib/equipment.ts`);
  return { ...plate, quantity: item.quantity };
});
