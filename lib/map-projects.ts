export interface MapProject {
  id: number;
  slug: string;
  lat: number;
  lng: number;
  status: "completed" | "ongoing";
  category: "drilling" | "infrastructure";
  title: string;
  amount: string;
  year: string;
  client: string;
  funder?: string;
}

export const MAP_PROJECTS: MapProject[] = [
  { id: 1, slug: "uzgazoil-wells-drilling", lat: 40.70, lng: 65.50, status: "completed", category: "drilling", title: "148 Wells for Oil Drilling Rigs", amount: "$19.2M", year: "2004\u20132012", client: "UzGazOil / GISSARNEFTIGAZ" },
  { id: 2, slug: "bayaut-vertical-drainage", lat: 40.74, lng: 68.35, status: "completed", category: "infrastructure", title: "Vertical Drainage Reconstruction \u2014 Bayaut", amount: "$1.7M", year: "2012\u20132014", client: "Irrigated Land Reclamation Fund" },
  { id: 4, slug: "state-security-water-supply", lat: 41.30, lng: 64.20, status: "completed", category: "infrastructure", title: "Water Supply for 10 Military Units", amount: "$1.5M", year: "2010\u20132014", client: "State Security Service of Uzbekistan" },
  { id: 5, slug: "vu5-guzar-reconstruction", lat: 38.60, lng: 66.26, status: "completed", category: "infrastructure", title: "Water Intake VU-5 Reconstruction \u2014 Guzar", amount: "$800K", year: "2012\u20132013", client: "Kashkadarya Single Customer Service" },
  { id: 6, slug: "vu5-yakkabag-reconstruction", lat: 38.80, lng: 66.40, status: "completed", category: "infrastructure", title: "Water Intake VU-5 Reconstruction \u2014 Yakkabag", amount: "$1.6M", year: "2013\u20132014", client: "Kashkadarya Single Customer Service" },
  { id: 7, slug: "syrdarya-water-supply", lat: 40.83, lng: 68.70, status: "completed", category: "infrastructure", title: "Water Supply Systems \u2014 Syrdarya Region", amount: "$3.7M", year: "2015\u20132017", client: "Single Customer Service" },
  { id: 8, slug: "damkhodzha-pipeline", lat: 40.50, lng: 65.80, status: "completed", category: "infrastructure", title: "Damkhodzha Interregional Water Pipeline", amount: "$750K", year: "2015", client: "Agency UZKOMMUNHIZMAT" },
  { id: 9, slug: "cng-wells-uztransgaz", lat: 41.20, lng: 64.90, status: "completed", category: "drilling", title: "Wells at CNG Filling Stations", amount: "$480K", year: "2016", client: "Uztransgaz" },
  { id: 10, slug: "orient-holding-water-supply", lat: 41.29, lng: 69.27, status: "completed", category: "infrastructure", title: "Water Supply \u2014 ORIENT Production Facilities", amount: "$2.6M", year: "2017\u20132018", client: "ORIENT Holding" },
  { id: 11, slug: "landscaping-wells", lat: 41.30, lng: 64.00, status: "completed", category: "drilling", title: "Wells for Urban Landscaping", amount: "$430K", year: "2017", client: "Housing & Communal Services Dept." },
  { id: 12, slug: "koshrabad-w31", lat: 39.70, lng: 66.95, status: "completed", category: "infrastructure", title: "Koshrabad Drinking Water Improvement (W/3.1)", amount: "$2.88M", year: "2019\u20132021", client: "UZKOMMUNHIZMAT", funder: "OPEC Fund + Saudi Fund" },
  { id: 13, slug: "koshrabad-w41", lat: 39.72, lng: 66.97, status: "completed", category: "infrastructure", title: "Koshrabad Drinking Water Improvement (W/4.1)", amount: "$3.84M", year: "2019\u20132021", client: "UZKOMMUNHIZMAT", funder: "OPEC Fund + Saudi Fund" },
  { id: 14, slug: "zhiydakapa-water-intake", lat: 40.99, lng: 71.67, status: "ongoing", category: "infrastructure", title: "Zhiydakapa Water Intake Reconstruction \u2014 Namangan", amount: "$5.21M", year: "2022\u2013present", client: "JSC UZSUVTAMINOT", funder: "EBRD" },
  { id: 15, slug: "yangiyul-water-supply", lat: 41.11, lng: 69.04, status: "completed", category: "infrastructure", title: "Water Supply System Reconstruction \u2014 Yangiyul", amount: "$6.1M", year: "2023\u20132024", client: "Ministry of Investment & Foreign Trade" },
  { id: 16, slug: "namangan-water-supply-phase2", lat: 41.01, lng: 71.70, status: "ongoing", category: "infrastructure", title: "Water Supply \u2014 Northern Namangan (Phase 2)", amount: "$3.48M", year: "2023\u2013present", client: "NAMANGAN SUV TAMINOTI", funder: "OPEC Fund" },
];
