import { projects } from "@/lib/projects";
import { getProjectText } from "@/lib/content/projects-i18n";
import { sumMillions } from "@/lib/format";
import { EMAIL, PHONE, SITE_URL } from "@/lib/site";
import { equipment } from "@/lib/equipment";
import { ISO_CERTS, STD_PREFIX } from "@/lib/seo";

export const dynamic = "force-static";

/*
 * llms.txt (https://llmstxt.org): a plain-text brief for AI assistants. Civil engineering first.
 * Every figure comes from the company presentation (info/, 2025), the project register
 * (lib/projects.ts; contract values from the tender form EXP-4.1 where it gives them) or a
 * figure the owner confirmed on 2026-09-30 (1200 m depth, 12 regions). Nothing is added here.
 */
export function GET() {
  const total = sumMillions(projects);
  const ongoing = projects.filter((p) => p.status === "ongoing").length;
  const units = (list: typeof equipment) => list.reduce((n, e) => n + e.quantity, 0);
  const rigs = equipment.filter((e) => e.category === "drilling");
  const certs = ISO_CERTS.map((c) => `- ${STD_PREFIX.en} ${c.code} — ${c.en.replace(/ system$/, "").toLowerCase()}`).join("\n");
  const ledger = projects
    .map((p) => {
      const t = getProjectText(p.slug, "en");
      return `- [${t.title}](${SITE_URL}/en/projects/${p.slug}): ${t.location}; ${p.year.replace("present", "ongoing")}; ${p.amount}; ${t.role.toLowerCase()}; client: ${t.client}${t.funder ? `; financed by ${t.funder}` : ""}`;
    })
    .join("\n");

  const body = `# SUV-TARAQQIYOT LLC

> Water supply infrastructure contractor in Tashkent, Uzbekistan, founded in 2001. Builds transmission and distribution water pipelines, water intake and distribution stations, water towers and the civil works around them, and drills hydrogeological wells. The project register lists ${projects.length} major projects since 2004 (${ongoing} ongoing) with a combined contract value of $${total.toFixed(2)}M, shown on the site as "$55M+".

Legal name: "SUV-TARAQQIYOT" MChJ (Uzbek), ООО «СУВ-ТАРАККИЁТ» (Russian), SUV-TARAQQIYOT LLC (English). Registered 21 August 2001, taxpayer number (STIR/INN) 203 681 239. Founded on the basis of NPO Wolfram.

## Annual capacity (source: company presentation)

- Water pipelines: up to 200 km a year, diameter 32–1200 mm (polyethylene and steel).
- Water distribution units: up to 50 a year, 300–30,000 m³ per day.
- Water intake stations: buildings and structures over 5,000 m³ in volume, new and reconstructed.
- Water towers: up to 50 a year, 10–75 m³, manufactured and installed.
- Hydrogeological wells: about 120 a year, 30–1200 m deep (1200 m confirmed by the company, 2026).
- Works across 12 regions of Uzbekistan (company figure; the register lists the major projects only).

## Certification

${certs}
All three issued by AVVISO CERT LLC. O‘z DSt ISO are national standards of Uzbekistan identical to the corresponding ISO standards.

## Clients and financing institutions

State clients in the register include JSC Uzsuvtaminot, the Uzkommunkhizmat agency, the regional engineering companies of Kashkadarya, Syrdarya and Samarkand, the Irrigated Land Reclamation Fund (Ministry of Finance) and the Medium-Size Cities Integrated Urban Development PIU of the Ministry of Economy and Finance (Yangiyul); industrial clients include UzGazOil, Uztransgaz and ORIENT Holding. Projects in the register were financed by the European Bank for Reconstruction and Development (EBRD), the World Bank (IBRD; the Yangiyul water supply reconstruction, contract MSC-Y/W/1.2), the OPEC Fund for International Development and the Saudi Fund for Development. The Asian Development Bank is also among the company's customers; no specific project in the register is attributed to it.

## Project register

${ledger}

## Pages

- [Services](${SITE_URL}/en/services): pipelines, intake and distribution facilities, water towers, civil works, wells
- [Projects](${SITE_URL}/en/projects): the register with a map
- [Equipment](${SITE_URL}/en/equipment): the company's core fleet by model and unit count (${equipment.length} models, ${units(equipment)} units, including ${units(rigs)} drilling rigs of ${rigs.length} models)
- [About](${SITE_URL}/en/about): history, legal details, certificates, letters of acknowledgment
- [Contact](${SITE_URL}/en/contact): enquiry form, phone, email, address

Equipment photos on the site show the models the company owns (manufacturer or catalogue images); they are illustrative and are not photographs of the company's own machines or sites.

## Languages

Uzbek, Latin script (${SITE_URL}/uz, default), Russian (${SITE_URL}/ru), English (${SITE_URL}/en), Turkish (${SITE_URL}/tr).

## Optional

- [Full register and services in English, Russian and Uzbek](${SITE_URL}/llms-full.txt)

## Contact

18 Khusan Shams Street, Mirzo Ulugbek District, Tashkent, Uzbekistan
Phone: ${PHONE}
Email: ${EMAIL}
Hours: Monday–Friday, 9:00–18:00
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
