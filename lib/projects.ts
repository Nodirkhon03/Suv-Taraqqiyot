export interface Project {
  slug: string;
  title: string;
  year: string;
  location: string;
  client: string;
  funder?: string;
  amount: string;
  amountUzs?: string;
  contractNumber?: string;
  role: "General Contractor" | "Subcontractor";
  status: "completed" | "ongoing";
  category: "drilling" | "infrastructure";
  coordinates: [number, number];
  description?: string;
  scope?: string[];
  images?: string[];
}

export function isInternationallyFunded(project: Project): boolean {
  return !!project.funder;
}

export const projects: Project[] = [
  {
    slug: "uzgazoil-wells-drilling",
    title: "Drilling 148 Wells for Oil Drilling Rigs",
    year: "2004–2012",
    location: "Uzbekistan (multiple sites)",
    client: "UzGazOil LLC / GISSARNEFTIGAZ JV",
    amount: "$19.2M",
    role: "General Contractor",
    status: "completed",
    category: "drilling",
    coordinates: [40.7, 65.5],
    description:
      "Drilling of 148 exploration and production wells for the technical needs of oil drilling rigs and construction of water supply systems at the facilities. Scope included construction of temporary access roads, drilling pads, rotational camps, and foundations for drilling rigs and auxiliary equipment.",
    scope: [
      "148 exploration and production wells",
      "Water supply systems at rig facilities",
      "Temporary access roads and drilling pads",
      "Rotational camps and rig foundations",
    ],
  },
  {
    slug: "bayaut-vertical-drainage-reconstruction",
    title: "Reconstruction of Vertical Drainage Systems — Bayaut District",
    year: "2012–2014",
    location: "Bayaut District, Syrdarya Region",
    client: "Irrigated Land Reclamation Fund, Ministry of Finance",
    amount: "$1.7M",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [40.74, 68.35],
    description:
      "Reconstruction of 12 vertical drainage wells in Bayaut district, Syrdarya region, under the Irrigated Land Reclamation Fund programme to protect agricultural land from waterlogging and salinization.",
    scope: [
      "12 vertical drainage wells reconstructed",
      "Pump and mechanical equipment replacement",
      "Electrical and control systems",
    ],
  },
  {
    slug: "bayaut-reclamation-wells-repair",
    title: "Repair and Restoration of Reclamation Wells — Bayaut Vertical Drainage",
    year: "2012",
    location: "Bayaut District, Syrdarya Region",
    client: "Irrigated Land Reclamation Fund, Ministry of Finance",
    amount: "$1.2M",
    role: "Subcontractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [40.76, 68.4],
    description:
      "Repair and restoration works of reclamation wells of the vertical drainage system in Bayaut district, Syrdarya region. Delivered as subcontractor to the Irrigated Land Reclamation Fund under the Ministry of Finance.",
    scope: [
      "Reclamation well repair and restoration",
      "Vertical drainage rehabilitation",
    ],
  },
  {
    slug: "state-security-water-supply",
    title: "Water Supply for 10 Military Units — State Security Service",
    year: "2010–2014",
    location: "Uzbekistan",
    client: "KSSB of the State Security Service of Uzbekistan",
    amount: "$1.5M",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [41.3, 64.2],
    description:
      "Design and construction of drinking water supply systems for 10 military units under the Command of the Security Service of the Republic of Uzbekistan. Delivered turn-key across multiple locations.",
    scope: [
      "10 military unit water supply systems",
      "Wells, pump houses and distribution",
      "Project-wide commissioning",
    ],
  },
  {
    slug: "vu5-guzar-reconstruction",
    title: "Reconstruction of Water Intake VU-5 — Guzar District",
    year: "2012–2013",
    location: "Guzar District, Kashkadarya Region",
    client: "Engineering Company, Single Customer Service of Kashkadarya",
    amount: "$800K",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [38.6, 66.26],
    description:
      "Full reconstruction of water intake facility VU-5 in Guzar district. Upgraded intake, pump station and associated infrastructure to restore reliable water supply to downstream consumers.",
    scope: [
      "Water intake facility reconstruction",
      "Pump station upgrade",
      "Distribution pipeline connections",
    ],
  },
  {
    slug: "vu5-yakkabag-reconstruction",
    title: "Reconstruction of Water Intake VU-5 — Yakkabag District",
    year: "2013–2014",
    location: "Yakkabag District, Kashkadarya Region",
    client: "Engineering Company, Single Customer Service of Kashkadarya",
    amount: "$1.6M",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [38.8, 66.4],
    description:
      "Reconstruction of VU-5 water intake facility in Yakkabag district. Scope included complete rehabilitation of intake structures, mechanical and electrical systems, and tie-in to the regional distribution network.",
    scope: [
      "Intake structure rehabilitation",
      "Mechanical and electrical works",
      "Tie-in to regional distribution",
    ],
  },
  {
    slug: "syrdarya-water-supply-systems",
    title: "Construction of Water Supply Systems — Syrdarya Region",
    year: "2015–2017",
    location: "Syrdarya Region",
    client: "Engineering Company, Single Customer Service",
    amount: "$3.7M",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [40.83, 68.7],
    description:
      "Construction of new water supply systems across Syrdarya region covering intake, transmission, and distribution works. Delivered as general contractor over a two-year programme.",
    scope: [
      "New intake wells and pumps",
      "Transmission pipelines",
      "Distribution networks and house connections",
    ],
  },
  {
    slug: "damkhodzha-pipeline-reconstruction",
    title: "Reconstruction of Damkhodzha Interregional Water Pipeline",
    year: "2015",
    location: "Uzbekistan (interregional)",
    client: "Agency UZKOMMUNHIZMAT",
    amount: "$750K",
    role: "Subcontractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [40.5, 65.8],
    description:
      "Reconstruction of the Damkhodzha interregional water pipeline delivered as subcontractor to Agency UZKOMMUNHIZMAT. Scope covered damaged section replacement and hydraulic recommissioning.",
    scope: [
      "Damaged pipeline section replacement",
      "Pressure testing and recommissioning",
    ],
  },
  {
    slug: "cng-wells-uztransgaz",
    title: "Drilling Wells at CNG Filling Stations",
    year: "2016",
    location: "Uzbekistan (multiple sites)",
    client: "Uztransgaz",
    amount: "$480K",
    role: "Subcontractor",
    status: "completed",
    category: "drilling",
    coordinates: [41.2, 64.9],
    description:
      "Drilling of production water wells at CNG filling stations operated by Uztransgaz across Uzbekistan. Delivered as subcontractor on accelerated schedule.",
    scope: [
      "Production water wells at CNG stations",
      "Pumping equipment installation",
    ],
  },
  {
    slug: "orient-holding-water-supply",
    title: "Water Supply Systems & Well Drilling — ORIENT Production Facilities",
    year: "2017–2018",
    location: "Uzbekistan",
    client: "ORIENT Holding",
    amount: "$2.6M",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [41.29, 69.27],
    description:
      "Construction of water supply systems and drilling of production wells for ORIENT Holding industrial facilities. Delivered turn-key as general contractor covering design, drilling, piping, and commissioning.",
    scope: [
      "Industrial production wells",
      "Site water supply systems",
      "Pumping and treatment",
    ],
  },
  {
    slug: "landscaping-wells",
    title: "Drilling Wells for Urban Landscaping",
    year: "2017",
    location: "Uzbekistan",
    client: "Housing and Communal Services Department",
    amount: "$430K",
    role: "Subcontractor",
    status: "completed",
    category: "drilling",
    coordinates: [41.3, 64.0],
    description:
      "Drilling of wells supporting urban landscaping programmes under the Housing and Communal Services Department. Delivered as subcontractor across multiple municipal sites.",
    scope: [
      "Irrigation wells for landscaping",
      "Pump installation",
    ],
  },
  {
    slug: "koshrabad-water-w31",
    title: "Improvement of Drinking Water Supply — Koshrabad District (W/3.1)",
    year: "2019–2021",
    location: "Koshrabad District, Samarkand Region",
    client: "Agency UZKOMMUNHIZMAT",
    funder:
      "OPEC Fund for International Development + Saudi Fund for Development",
    amount: "$2.88M",
    contractNumber: "KWSP/ICB/W/3.1",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [39.7, 66.95],
    description:
      "Water supply to rural settlements and construction of water intakes \u201CTepalik\u201D, \u201CUchyogoch\u201D, \u201CChinok\u201D, \u201CKora Kissa\u201D, \u201CKoratosh\u201D, \u201CEjgenrt\u201D, \u201CShurcha\u201D, \u201CTozgora\u201D, and \u201CYangirabod\u201D. Project financed by OPEC Fund for International Development and Saudi Fund for Development.",
    scope: [
      "9 rural water intakes",
      "Transmission and distribution networks",
      "Pumping stations and storage",
    ],
  },
  {
    slug: "koshrabad-water-w41",
    title: "Improvement of Drinking Water Supply — Koshrabad District (W/4.1)",
    year: "2019–2021",
    location: "Koshrabad District, Samarkand Region",
    client: "Agency UZKOMMUNHIZMAT",
    funder:
      "OPEC Fund for International Development + Saudi Fund for Development",
    amount: "$3.84M",
    contractNumber: "KWSP/ICB/W/4.1",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [39.72, 66.97],
    description:
      "Water supply to rural settlements and construction of water intakes \u201CYukorijush\u201D, \u201CYangikishlok\u201D, \u201CKorachokiya\u201D, \u201CUrganji\u201D, \u201CYangihayot\u201D, \u201CKanda\u201D, and \u201CKurgon\u201D under the Koshrabad Water Supply Project. Financed by OPEC Fund for International Development and Saudi Fund for Development.",
    scope: [
      "7 rural water intakes",
      "Transmission and distribution networks",
      "Pumping stations and storage",
    ],
  },
  {
    slug: "akkurgan-olimzhon-water-supply",
    title: "Water Supply Reconstruction — MSG Kh.Olimzhon, Akkurgan District",
    year: "2021–2023",
    location: "MSG Kh.Olimzhon, Akkurgan District, Tashkent Region",
    client: "JV LLC SAINSUVINSHOATLARI",
    amount: "$510K",
    amountUzs: "5 639 841 742 UZS",
    contractNumber: "25-\u0421",
    role: "Subcontractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [40.79, 69.19],
    description:
      "Reconstruction of water supply systems serving MSG Kh.Olimzhon in Akkurgan district, Tashkent region. Delivered as subcontractor to JV LLC SAINSUVINSHOATLARI under contract 25-\u0421.",
    scope: [
      "Distribution pipeline replacement",
      "Pump station rehabilitation",
      "House connection works",
    ],
  },
  {
    slug: "zhiydakapa-water-intake-namangan",
    title: "Reconstruction of Zhiydakapa Water Intake — Namangan Region",
    year: "2022–present",
    location: "Namangan Region",
    client: "JSC UZSUVTAMINOT",
    funder: "European Bank for Reconstruction and Development (EBRD)",
    amount: "$5.21M",
    contractNumber: "NWP-6",
    role: "General Contractor",
    status: "ongoing",
    category: "infrastructure",
    coordinates: [40.99, 71.67],
    description:
      "Reconstruction of the Zhiydakapa water intake in Namangan region under contract NWP-6. Delivered as general contractor for JSC UZSUVTAMINOT, financed by the European Bank for Reconstruction and Development (EBRD).",
    scope: [
      "Intake structure reconstruction",
      "Pumping and filtration upgrade",
      "SCADA and telemetry",
    ],
  },
  {
    slug: "kasbi-tolishbe-water-supply",
    title: "Drinking Water Networks — Tolishbe MFY, Kasbi District",
    year: "2022",
    location: "Tolishbe MFY, Kasbi District, Kashkadarya Region",
    client: "Kashkadarya Regional Single Customer Service Engineering Company",
    amount: "$720K",
    amountUzs: "7 902 589 376 UZS",
    contractNumber: "283",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [38.72, 65.68],
    description:
      "Construction of drinking water networks together with collection and distribution facilities for Tolishbe MFY in Kasbi district, Kashkadarya region. Delivered as prime contractor under contract 283.",
    scope: [
      "Distribution pipeline networks",
      "Collection and distribution facilities",
      "Service connections",
    ],
  },
  {
    slug: "bektemir-new-nurafshon-water-supply",
    title: "Drinking Water Networks — New Nurafshon MFY, Bektemir District",
    year: "2022–2023",
    location: "New Nurafshon MFY, Bektemir District, Tashkent",
    client:
      "Construction of Water Supply and Wastewater Facilities Engineering Company",
    amount: "$410K",
    amountUzs: "4 525 575 574 UZS",
    contractNumber: "6/22",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [41.22, 69.33],
    description:
      "Construction of drinking water distribution networks for New Nurafshon MFY in Tashkent's Bektemir district. Delivered as prime contractor under contract 6/22.",
    scope: [
      "Distribution pipeline networks",
      "Service connections",
      "Pressure testing and commissioning",
    ],
  },
  {
    slug: "payarik-beshkurgon-water-systems",
    title: "Drinking Water Systems — Beshkurgon MFY Guliston, Payarik District",
    year: "2022",
    location: "Beshkurgon MFY Guliston, Payarik District, Samarkand Region",
    client: "Samarkand Regional Government Engineering Company",
    amount: "$410K",
    amountUzs: "4 539 111 456 UZS",
    contractNumber: "20-\u0421\u0423\u0412/\u041E\u041A-2022",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [39.93, 66.28],
    description:
      "Construction and reconstruction of drinking water systems in Beshkurgon MFY of Guliston, Payarik district, Samarkand region. Delivered as prime contractor.",
    scope: [
      "New and reconstructed distribution networks",
      "Pump and valve installations",
      "Service connections",
    ],
  },
  {
    slug: "yangiyul-water-supply",
    title: "Reconstruction of Water Supply System — Yangiyul",
    year: "2022–2024",
    location: "Yangiyul City",
    client:
      "Integrated Development PIU \u2014 Medium-Size Cities, Ministry of Investment and Foreign Trade",
    amount: "$5.59M",
    amountUzs: "60 836 956 408 UZS",
    contractNumber: "MSC-Y/W/1.2",
    role: "General Contractor",
    status: "completed",
    category: "infrastructure",
    coordinates: [41.11, 69.04],
    description:
      "Reconstruction of the water supply system in Yangiyul city under contract MSC-Y/W/1.2. Delivered as general contractor for the Medium-Size Cities Integrated Urban Development Project Implementation Unit of the Ministry of Investment and Foreign Trade.",
    scope: [
      "City-wide distribution network reconstruction",
      "Pump stations and storage",
      "Service connections",
    ],
  },
  {
    slug: "namangan-water-supply-phase2",
    title: "Water Supply to Northern Namangan — Phase 2",
    year: "2023–present",
    location: "Namangan City",
    client: "NAMANGAN SUV TAMINOTI",
    funder: "OPEC Fund for International Development",
    amount: "$3.48M",
    contractNumber: "NWSP/ICB/W-4-2",
    role: "General Contractor",
    status: "ongoing",
    category: "infrastructure",
    coordinates: [41.01, 71.7],
    description:
      "Water supply to the northern part of Namangan city under Phase 2 of the programme, contract NWSP/ICB/W-4-2. Delivered as general contractor for NAMANGAN SUV TAMINOTI, financed by the OPEC Fund for International Development.",
    scope: [
      "Transmission mains to northern Namangan",
      "Distribution network extension",
      "Pumping and storage",
    ],
  },
];
