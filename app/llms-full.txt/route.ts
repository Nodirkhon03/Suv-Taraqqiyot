import type { Locale } from "@/i18n";
import { projects } from "@/lib/projects";
import { equipment } from "@/lib/equipment";
import { getProjectText } from "@/lib/content/projects-i18n";
import { getEquipmentText } from "@/lib/content/equipment-i18n";
import { contractLabel, formatMillions, millions, sumMillions } from "@/lib/format";
import { EMAIL, PHONE, SITE_URL } from "@/lib/site";
import { ISO_CERTS, STD_PREFIX, ruPlural } from "@/lib/seo";
import uz from "@/messages/uz.json";
import ru from "@/messages/ru.json";
import en from "@/messages/en.json";

export const dynamic = "force-static";

/*
 * llms-full.txt: the full project register, services and fleet in English, Russian and Uzbek.
 * Generated from lib/projects.ts, lib/content/* and messages/*.json — the same text the pages
 * show — so it cannot drift from the site. Sources as in /llms.txt.
 */

type Lang = "en" | "ru" | "uz";
const messages = { en, ru, uz } as const;
const SERVICE_KEYS = ["pipes", "facilities", "towers", "civil", "wells"] as const;

const L: Record<
  Lang,
  {
    heading: string;
    intro: (total: string, n: number) => string;
    services: string;
    register: string;
    fleet: string;
    fleetNote: string;
    fleetTotal: (models: number, units: number) => string;
    certs: (list: string) => string;
    contact: string;
    f: Record<"years" | "location" | "client" | "funder" | "role" | "value" | "valueUzs" | "contract" | "status" | "scope" | "page" | "capacity" | "units", string>;
    status: { ongoing: string; completed: string };
    address: string;
  }
> = {
  en: {
    heading: "English",
    intro: (total, n) =>
      `SUV-TARAQQIYOT LLC is a water supply infrastructure contractor in Tashkent, Uzbekistan, registered on 21 August 2001 (TIN 203 681 239), founded on the basis of NPO Wolfram. It builds transmission and distribution pipelines, water intake and distribution stations, water towers and civil works, and drills hydrogeological wells. The register below lists ${n} major projects since 2004, combined contract value $${total}M.`,
    services: "Services",
    register: "Project register",
    fleet: "Core fleet",
    fleetNote:
      "Photos of equipment on the site show the models owned (manufacturer or catalogue images); they are illustrative, not photographs of the company's own machines or sites.",
    fleetTotal: (models, units) => `Listed: ${models} models, ${units} units (sources: company presentation, 2025; the company’s tender equipment forms).`,
    certs: (list) =>
      `Certificates: ${list} — national standards of Uzbekistan identical to the corresponding ISO standards; issued by AVVISO CERT LLC.`,
    contact: "Contact",
    f: { years: "Years", location: "Location", client: "Client", funder: "Financed by", role: "Role", value: "Contract value", valueUzs: "Value in UZS", contract: "Contract", status: "Status", scope: "Scope", page: "Page", capacity: "Annual capacity", units: "units" },
    status: { ongoing: "ongoing", completed: "completed" },
    address: "18 Khusan Shams Street, Mirzo Ulugbek District, Tashkent, Uzbekistan",
  },
  ru: {
    heading: "Русский",
    intro: (total, n) =>
      `ООО «СУВ-ТАРАККИЁТ» — подрядчик по строительству инфраструктуры водоснабжения, Ташкент, Узбекистан. Зарегистрировано 21 августа 2001 года (ИНН 203 681 239), основано на базе НПО «Вольфрам». Строит магистральные и разводящие водоводы, водозаборные и водораспределительные сооружения, водонапорные башни, выполняет общестроительные работы и бурит гидрогеологические скважины. В реестре ниже ${n} крупных проектов с 2004 года общей стоимостью $${total} млн.`,
    services: "Услуги",
    register: "Реестр проектов",
    fleet: "Основной парк техники",
    fleetNote:
      "Фотографии техники на сайте показывают модели, которыми владеет компания (изображения производителей и каталогов); они иллюстративны и не являются снимками собственных машин или объектов компании.",
    fleetTotal: (models, units) =>
      `В списке: ${models} ${ruPlural(models, "модель", "модели", "моделей")}, ${units}\u00a0ед. (источники: презентация компании, 2025; формы оборудования из тендерной документации компании).`,
    certs: (list) =>
      `Сертификаты: ${list}\u00a0— национальные стандарты Узбекистана, идентичные соответствующим стандартам ISO; выданы ООО «AVVISO CERT».`,
    contact: "Контакты",
    f: { years: "Годы", location: "Место", client: "Заказчик", funder: "Финансирование", role: "Роль", value: "Стоимость контракта", valueUzs: "Стоимость в сумах", contract: "Контракт", status: "Статус", scope: "Состав работ", page: "Страница", capacity: "Годовые объёмы", units: "ед." },
    status: { ongoing: "в работе", completed: "завершён" },
    address: "г. Ташкент, Мирзо-Улугбекский район, ул. Хусан Шамс, 18, Узбекистан",
  },
  uz: {
    heading: "Oʻzbekcha",
    intro: (total, n) =>
      `“SUV-TARAQQIYOT” MChJ — suv taʼminoti infratuzilmasi pudratchisi, Toshkent, Oʻzbekiston. 2001-yil 21-avgustda roʻyxatdan oʻtgan (STIR 203 681 239), NPO Wolfram negizida tashkil etilgan. Magistral va taqsimlash suv quvurlari, suv olish va taqsimlash inshootlari, suv minoralarini quradi, qurilish ishlarini bajaradi va gidrogeologik quduqlar burgʻulaydi. Quyidagi reyestrda 2004-yildan beri ${n} ta yirik loyiha, umumiy qiymati $${total} mln.`,
    services: "Xizmatlar",
    register: "Loyihalar reyestri",
    fleet: "Asosiy texnika parki",
    fleetNote:
      "Saytdagi texnika suratlari kompaniyaga tegishli modellarni koʻrsatadi (ishlab chiqaruvchi va katalog tasvirlari); ular namuna sifatida berilgan, kompaniyaning oʻz mashinalari yoki obyektlari surati emas.",
    fleetTotal: (models, units) =>
      `Roʻyxatda: ${models} model, ${units}\u00a0dona (manbalar: kompaniya taqdimoti, 2025; kompaniyaning tender texnika shakllari).`,
    certs: (list) =>
      `Sertifikatlar: ${list} — tegishli ISO standartlariga aynan mos Oʻzbekiston milliy standartlari; AVVISO CERT MChJ tomonidan berilgan.`,
    contact: "Aloqa",
    f: { years: "Yillar", location: "Joy", client: "Buyurtmachi", funder: "Moliyalashtiruvchi", role: "Rol", value: "Shartnoma qiymati", valueUzs: "Soʻmdagi qiymati", contract: "Shartnoma", status: "Holat", scope: "Ishlar tarkibi", page: "Sahifa", capacity: "Yillik hajm", units: "dona" },
    status: { ongoing: "davom etmoqda", completed: "yakunlangan" },
    address: "Toshkent shahri, Mirzo Ulugʻbek tumani, Xusan Shams koʻchasi, 18, Oʻzbekiston",
  },
};

function section(lang: Lang): string {
  const l = L[lang];
  const m = messages[lang];
  const total = formatMillions(sumMillions(projects), lang);
  const items = m.servicesPage.items as Record<string, { title: string; desc: string; scope: string[]; cap: { k: string; v: string }[] }>;

  const services = SERVICE_KEYS.map((k, i) => {
    const s = items[k];
    const cap = s.cap.length ? `\n${l.f.capacity}: ${s.cap.map((c) => `${c.k} — ${c.v}`).join("; ")}.` : "";
    return `### ${i + 1}. ${s.title}\n\n${s.desc}${cap}\n${s.scope.map((x) => `- ${x}`).join("\n")}`;
  }).join("\n\n");

  const register = projects
    .map((p, i) => {
      const t = getProjectText(p.slug, lang as Locale);
      const value = m.projectDetailPage.amount.replace("{amount}", formatMillions(millions(p.amount), lang));
      const lines = [
        `### ${i + 1}. ${t.title}`,
        "",
        `- ${l.f.years}: ${p.year.replace("present", m.projectDetailPage.present)}`,
        `- ${l.f.status}: ${l.status[p.status]}`,
        `- ${l.f.location}: ${t.location}`,
        `- ${l.f.client}: ${t.client}`,
        ...(t.funder ? [`- ${l.f.funder}: ${t.funder}`] : []),
        `- ${l.f.role}: ${t.role}`,
        `- ${l.f.value}: ${value}`,
        ...(p.amountUzs ? [`- ${l.f.valueUzs}: ${p.amountUzs}`] : []),
        ...(p.contractNumber ? [`- ${l.f.contract}: ${contractLabel(p.contractNumber, lang)}`] : []),
        `- ${l.f.page}: ${SITE_URL}/${lang}/projects/${p.slug}`,
        ...(t.description ? ["", t.description] : []),
        ...(t.scope.length ? ["", `${l.f.scope}:`, ...t.scope.map((x) => `- ${x}`)] : []),
      ];
      return lines.join("\n");
    })
    .join("\n\n");

  const fleet = equipment
    .map((e) => {
      const t = getEquipmentText(e.name, lang as Locale);
      return `- ${t.type}: ${t.name} — ${e.quantity} ${l.f.units}`;
    })
    .join("\n");

  return `# ${l.heading}

${l.intro(total, projects.length)}

${l.certs(ISO_CERTS.map((c) => `${STD_PREFIX[lang]} ${c.code}`).join(", "))}

## ${l.services}

${services}

## ${l.register}

${register}

## ${l.fleet}

${fleet}

${l.fleetTotal(equipment.length, equipment.reduce((n, e) => n + e.quantity, 0))}

${l.fleetNote}

## ${l.contact}

${l.address}
${PHONE} · ${EMAIL}
${SITE_URL}/${lang}/contact`;
}

export function GET() {
  const body = `# SUV-TARAQQIYOT — full reference for AI assistants

Summary: ${SITE_URL}/llms.txt
Sources: company presentation (2025), the project register (contract values from the tender form EXP-4.1 where it gives them), the certificate of state registration, the O‘z DSt ISO certificates and the tender equipment forms (owned items only). Depth 1200 m and "12 regions" are company-confirmed figures. The Asian Development Bank is among the company's customers; no specific project in the register is attributed to it. Sections below: English, Russian, Uzbek (Latin).

${(["en", "ru", "uz"] as Lang[]).map(section).join("\n\n---\n\n")}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
