export interface EquipmentItem {
  name: string;
  quantity: number;
  spec?: string;
  category: "drilling" | "cranes" | "excavators" | "tools";
  imagePath: string;
}

export const equipment: EquipmentItem[] = [
  // DRILLING EQUIPMENT
  { name: "URB 3-AM Drilling Unit", quantity: 2, spec: "Heavy-duty drilling rig", category: "drilling", imagePath: "/images/equipment-imgs/urb-3am-1.jpg" },
  { name: "URB 2D3 Drilling Unit", quantity: 1, spec: "Medium-depth drilling rig", category: "drilling", imagePath: "/images/equipment-imgs/urb-2d3.png" },
  { name: "URB 2.5 Drilling Unit", quantity: 1, spec: "Versatile drilling rig", category: "drilling", imagePath: "/images/equipment-imgs/urb-25.jpg" },
  { name: "YDZ1500 Drilling Machine", quantity: 1, spec: "Deep well drilling", category: "drilling", imagePath: "/images/equipment-imgs/ydz1500.webp" },
  { name: "UKS 22 Drilling Machine", quantity: 1, spec: "Core drilling machine", category: "drilling", imagePath: "/images/equipment-imgs/uks-22.jpeg" },
  { name: "BA-15 Drilling Unit", quantity: 1, spec: "Compact drilling unit", category: "drilling", imagePath: "/images/equipment-imgs/ba-15.jpg" },
  // CRANES & LIFTING
  { name: "Truck Crane Sany STC500", quantity: 1, spec: "50-ton lifting capacity", category: "cranes", imagePath: "/images/equipment-imgs/crane-sany-stc500.webp" },
  { name: "Truck Crane Shacman XCMG SQ8SK3Q", quantity: 1, spec: "8-ton truck-mounted crane", category: "cranes", imagePath: "/images/equipment-imgs/crane-shacman-xcmg.png" },
  { name: "Truck Crane Manipulator Kamaz 65117", quantity: 1, spec: "Crane manipulator truck", category: "cranes", imagePath: "/images/equipment-imgs/crane-manipulator-kamaz.jpg" },
  // EXCAVATORS & LOADERS
  { name: "Hyundai Excavator RW140", quantity: 2, spec: "14-ton wheeled excavator", category: "excavators", imagePath: "/images/equipment-imgs/excavator-hyundai-rw140-1.jpg" },
  { name: "Hyundai Robex 210W-9S Excavator", quantity: 1, spec: "21-ton wheeled excavator", category: "excavators", imagePath: "/images/equipment-imgs/excavator-hyundai-210w.webp" },
  { name: "Hyundai Robex 60W-9S Excavator", quantity: 1, spec: "6-ton wheeled excavator", category: "excavators", imagePath: "/images/equipment-imgs/excavator-hyundai-60w.jpg" },
  { name: "Hyundai Excavator Robex 55W", quantity: 2, spec: "5.5-ton compact excavator", category: "excavators", imagePath: "/images/equipment-imgs/excavator-hyundai-55w.jpeg" },
  { name: "Backhoe Loader Hyundai H940", quantity: 1, spec: "Backhoe loader", category: "excavators", imagePath: "/images/equipment-imgs/loader-hyundai-h940.jpg" },
  { name: "Backhoe Loader JCB 4CX", quantity: 1, spec: "4-ton backhoe loader", category: "excavators", imagePath: "/images/equipment-imgs/loader-jcb-4cx.webp" },
  { name: "Mini Loader JCB SSL 155", quantity: 2, spec: "Skid-steer loader", category: "excavators", imagePath: "/images/equipment-imgs/loader-jcb-ssl155.jpeg" },
  { name: "Mini Loader XCMG XT760", quantity: 1, spec: "Skid-steer loader", category: "excavators", imagePath: "/images/equipment-imgs/loader-xcmg-xt760.webp" },
  { name: "LiuGong Loader 835H", quantity: 1, spec: "Front-end wheel loader", category: "excavators", imagePath: "/images/equipment-imgs/loader-liugong-835h.png" },
  { name: "Dump Truck SHAANXI CHACMAN F3000", quantity: 3, spec: "Heavy-duty dump truck", category: "excavators", imagePath: "/images/equipment-imgs/truck-shacman-1.jpg" },
  { name: "Flatbed Truck Kamaz 43118", quantity: 1, spec: "6x6 flatbed truck", category: "excavators", imagePath: "/images/equipment-imgs/crane-manipulator-kamaz.jpg" },
  { name: "MTZ Tractor (Minsk Tractor Plant)", quantity: 1, spec: "Utility tractor", category: "excavators", imagePath: "/images/equipment-imgs/tractor-mtz.webp" },
  // TOOLS & SPECIALIZED
  { name: "Generator Eastern Lion GFS-W24", quantity: 2, spec: "24kW mobile generator", category: "tools", imagePath: "/images/equipment-imgs/generator-eastern-lion.webp" },
  { name: "Generator AKSA ADP 25A", quantity: 2, spec: "25kVA diesel generator", category: "tools", imagePath: "/images/equipment-imgs/generator-aksa.webp" },
  { name: "Atlas Copco Compressor", quantity: 1, spec: "Industrial air compressor", category: "tools", imagePath: "/images/equipment-imgs/compressor-atlas-copco.webp" },
  { name: "Mobile Concrete Mixer ADDFORCE LT3500", quantity: 1, spec: "3.5m\u00B3 self-loading mixer", category: "tools", imagePath: "/images/equipment-imgs/concrete-mixer-addforce.webp" },
  { name: "Pipe Welding Machine Turan Makina AL 800", quantity: 2, spec: "500\u2013800mm butt fusion", category: "tools", imagePath: "/images/equipment-imgs/pipe-welder-turan-800.png" },
  { name: "Pipe Welding Machine Turan Makina AL 500", quantity: 2, spec: "180\u2013500mm butt fusion", category: "tools", imagePath: "/images/equipment-imgs/pipe-welder-turan-500.png" },
  { name: "HDPE Pipe Fusion Machine J.Saouron Pipefuse-630", quantity: 6, spec: "Up to 630mm HDPE fusion", category: "tools", imagePath: "/images/equipment-imgs/pipe-fusion-jsaouron.png" },
  { name: "HDPE Pipe Fusion Machine J.Saouron Pipefuse-250", quantity: 2, spec: "Up to 250mm HDPE fusion", category: "tools", imagePath: "/images/equipment-imgs/pipe-fusion-jsaouron.png" },
  { name: "Pipeline Inspection Camera", quantity: 1, spec: "300m cable length", category: "tools", imagePath: "/images/equipment-imgs/inspection-camera.webp" },
];

export const categories = [
  { key: "drilling" },
  { key: "cranes" },
  { key: "excavators" },
  { key: "tools" },
] as const;
