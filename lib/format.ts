import { projects, type Project } from "@/lib/projects";

/** "$19.2M" → 19.2, "$800K" → 0.8 (millions of US dollars). */
export function millions(amount: string): number {
  const m = amount.match(/\$([\d.]+)\s*([MK])/);
  if (!m) throw new Error(`lib/projects.ts: cannot read amount "${amount}"`);
  const n = parseFloat(m[1]);
  return m[2] === "K" ? n / 1000 : n;
}

/** 5.54 → "5,54" (uz/ru/tr) or "5.54" (en). */
export function formatMillions(n: number, locale: string): string {
  const fixed = (Math.round(n * 100) / 100).toString();
  return locale === "en" ? fixed : fixed.replace(".", ",");
}

export function sumMillions(list: Project[]): number {
  return list.reduce((s, p) => s + millions(p.amount), 0);
}

export function projectBySlug(slug: string): Project {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`lib/projects.ts: no project "${slug}"`);
  return p;
}

/**
 * Some contract numbers in the ledger are written in Cyrillic ("25-С", "20-СУВ/ОК-2022").
 * Visible Uzbek is Latin only (owner, 2026-09-30), so on /uz they are shown transliterated;
 * every other locale shows them as written in the contract.
 */
const CYR: Record<string, string> = {
  А: "A", Б: "B", В: "V", Г: "G", Д: "D", Е: "E", Ж: "J", З: "Z", И: "I", Й: "Y", К: "K", Л: "L",
  М: "M", Н: "N", О: "O", П: "P", Р: "R", С: "S", Т: "T", У: "U", Ф: "F", Х: "X", Ц: "S", Ч: "Ch",
  Ш: "Sh", Ы: "I", Э: "E", Ю: "Yu", Я: "Ya", Ў: "Oʻ", Қ: "Q", Ғ: "Gʻ", Ҳ: "H",
};
export function contractLabel(value: string, locale: string): string {
  if (locale !== "uz") return value;
  return value.replace(/[А-ЯЎҚҒҲ]/g, (c) => CYR[c] ?? c);
}
