import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Plain-text summary for AI assistants. Every figure here comes from the
// company presentation or from the project ledger in lib/projects.ts.
export function GET() {
  const ledger = projects
    .map(
      (p) =>
        `- ${p.title} — ${p.location}; ${p.year}; ${p.amount}; ${p.role}; client: ${p.client}${
          p.funder ? `; financed by ${p.funder}` : ""
        }. ${SITE_URL}/en/projects/${p.slug}`
    )
    .join("\n");

  const body = `# SUV-TARAQQIYOT LLC

SUV-TARAQQIYOT LLC ("SUV-TARAQQIYOT" MChJ; in Russian: ООО «СУВ-ТАРАККИЁТ») is an engineering and construction contractor in Tashkent, Uzbekistan. It drills hydrogeological and artesian water wells and builds water supply systems. Founded in 2001 on the basis of NPO Wolfram.

## What the company builds

- Water pipelines: up to 200 km per year, diameters 32–1200 mm.
- Water wells: about 120 per year.
- Water distribution units: up to 50 per year, 300–30,000 m³ per day.
- Water intake stations: buildings and structures with a volume over 5,000 m³.
- Water towers: up to 50 per year, 10–75 m³.

## Certification

- O'z DSt ISO 9001:2015 — quality management
- O'z DSt ISO 14001:2019 — environmental management
- O'z DSt ISO 45001:2020 — occupational health and safety
All three issued by AVVISO CERT LLC.

## Clients and financing institutions

State clients include JSC Uzsuvtaminot, Agency Uzkommunhizmat, regional administrations of Syrdarya, Namangan and Samarkand, and Yangiyul city. Projects in the ledger below were financed by the European Bank for Reconstruction and Development, the OPEC Fund for International Development and the Saudi Fund for Development. The company also lists the World Bank and the Asian Development Bank among its main customers.

## Project ledger (${projects.length} projects)

${ledger}

## Pages

- Services: ${SITE_URL}/en/services
- Projects: ${SITE_URL}/en/projects
- Equipment: ${SITE_URL}/en/equipment
- About: ${SITE_URL}/en/about
- Contact: ${SITE_URL}/en/contact

## Languages

Uzbek (${SITE_URL}/uz), Russian (${SITE_URL}/ru), English (${SITE_URL}/en), Turkish (${SITE_URL}/tr).

## Contact

18 Khusan Shams Street, Mirzo-Ulugbek District, Tashkent, Uzbekistan
Phone: +998 55 055 37 37
Email: info@suv-taraqqiyot.com
Taxpayer number (STIR): 203 681 239
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
