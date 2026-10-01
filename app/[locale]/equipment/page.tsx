import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";
import PageHero from "@/components/pages/PageHero";
import SectionHead from "@/components/home/SectionHead";
import ClosingCta from "@/components/home/ClosingCta";
import { equipment } from "@/lib/equipment";
import { equipmentImage, getEquipmentText } from "@/lib/content/equipment-i18n";

/**
 * The core fleet, civil machines first and drilling rigs last (owner, round 2). Names are the
 * keys of lib/equipment.ts; quantities come from there, texts and cutouts from lib/content.
 * Every item in lib/equipment.ts must sit in exactly one group (checked at build).
 */
const GROUPS = [
  {
    key: "earth",
    names: [
      "Hyundai Robex 210W-9S Excavator",
      "Hyundai Excavator RW140",
      "Hyundai Robex 60W-9S Excavator",
      "Hyundai Excavator Robex 55W",
      "Backhoe Loader JCB 4CX",
      "Backhoe Loader Hyundai H940",
      "LiuGong Loader 835H",
      "Mini Loader JCB SSL 155",
      "Mini Loader XCMG XT760",
      "Trencher KMZ (on MTZ Belarus 80.1)",
      "Compactor BOMAG BMP8500",
      "Rammer Ishikawa SR80",
    ],
  },
  {
    key: "cranes",
    names: [
      "Truck Crane Sany STC500",
      "Truck Crane Galichanin KS-55713-4 (Kamaz)",
      "Truck Crane Shacman XCMG SQ8SK3Q",
      "Truck Crane Manipulator Kamaz 65117",
    ],
  },
  {
    key: "trucks",
    names: [
      "Dump Truck SHAANXI CHACMAN F3000",
      "Truck Shaanxi 60 t (pipe carrier)",
      "Flatbed Truck Kamaz 43118",
      "Water Tanker ZIL-130",
      "MTZ Tractor (Minsk Tractor Plant)",
    ],
  },
  {
    key: "welding",
    names: [
      "Pipe Welding Machine Turan Makina AL 800",
      "Pipe Welding Machine Turan Makina AL 500",
      "HDPE Pipe Fusion Machine J.Saouron Pipefuse-630",
      "HDPE Pipe Fusion Machine J.Saouron Pipefuse-250",
      "Extrusion Welding Machine PE/PP",
      "Welding Machine Jasic ARC400",
      "Welding Unit Set",
      "Pipeline Inspection Camera",
    ],
  },
  {
    key: "power",
    names: [
      "Mobile Concrete Mixer ADDFORCE LT3500",
      "Generator AKSA ADP 25A",
      "Generator Eastern Lion GFS-W24",
      "Atlas Copco Compressor",
      "Compressor Oryol PKS-12,25",
      "Rod Vibrator TeXa T-96505",
      "Drainage Pump KSB AmaDrainer N 301",
      "Drainage Pump Wilo-Drain TC 40",
      "Drainage Pump Wilo-Drain TM 32/8",
      "Drainage Pump Grundfos Unilift KP 250",
    ],
  },
  {
    key: "drilling",
    names: [
      "URB 3-AM Drilling Unit",
      "URB 2D3 Drilling Unit",
      "URB 2.5 Drilling Unit",
      "YDZ1500 Drilling Machine",
      "UKS 22 Drilling Machine",
      "BA-15 Drilling Unit",
    ],
  },
] as const;

function quantityOf(name: string): number {
  const item = equipment.find((e) => e.name === name);
  if (!item) throw new Error(`lib/equipment.ts: no "${name}"`);
  return item.quantity;
}

export default async function EquipmentPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "equipmentPage" });
  const tSite = await getTranslations({ locale, namespace: "site" });

  const names: string[] = GROUPS.flatMap((g) => [...g.names]);
  const listed = new Set<string>(names);
  const missing = equipment.filter((e) => !listed.has(e.name));
  if (missing.length) throw new Error(`equipment page: ungrouped machines ${missing.map((m) => m.name).join(", ")}`);
  if (listed.size !== names.length) throw new Error("equipment page: a machine is listed in two groups");
  const totalModels = equipment.length;
  const totalUnits = equipment.reduce((s, e) => s + e.quantity, 0);

  const groups = GROUPS.map((g) => ({
    key: g.key,
    units: g.names.reduce((s, n) => s + quantityOf(n), 0),
    /* plates with a cutout first, text-only plates after them */
    items: g.names
      .map((name) => {
        const text = getEquipmentText(name, locale as Locale);
        return { name, label: text.name, type: text.type, quantity: quantityOf(name), image: equipmentImage[name] };
      })
      .sort((a, b) => Number(!a.image) - Number(!b.image)),
  }));

  return (
    <>
      <PageHero
        title={t("hero.title")}
        lead={t("hero.lead", { models: totalModels, units: totalUnits })}
        aside={
          <nav className="tblock" aria-label={t("hero.toc")}>
            <ol className="toc">
              {groups.map((g, i) => (
                <li key={g.key}>
                  <a href={`#${g.key}`}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {t(`groups.${g.key}`)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      >
        <div className="cta-row">
          <Link className="btn btn-white" href={`/${locale}/contact`}>
            {tSite("cta")}
          </Link>
        </div>
        <p className="note">{t("caption")}</p>
      </PageHero>

      {groups.map((g, i) => (
        <section key={g.key} id={g.key} className={i % 2 ? "sec bg-50" : "sec"} aria-labelledby={`${g.key}-title`}>
          <div className="wrap">
            <SectionHead
              id={`${g.key}-title`}
              label={`${String(i + 1).padStart(2, "0")} · ${t("summary", { models: g.items.length, units: g.units })}`}
              title={t(`groups.${g.key}`)}
            />
            <ul className="eq-grid">
              {g.items.map((m) => (
                <li key={m.name} className={m.image ? undefined : "t"}>
                  <figure className={m.image ? "eq" : "eq text-only"}>
                    {m.image && (
                      <div className="img">
                        <Image
                          src={m.image}
                          alt={`${m.label} — ${m.type}`}
                          fill
                          loading="lazy"
                          sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 300px"
                        />
                      </div>
                    )}
                    <figcaption>
                      <span className="nm">{m.label}</span>
                      <span className="ty">{m.type}</span>
                      <span className="qt">
                        <span>{t("qtyLabel")}</span>
                        {t("quantity", { count: m.quantity })}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <ClosingCta locale={locale} />
    </>
  );
}
