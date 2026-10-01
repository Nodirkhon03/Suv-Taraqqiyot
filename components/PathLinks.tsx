"use client";

/*
 * The only client code in the header: links that depend on the current path.
 * Rendered to plain <a> elements at build time (usePathname works during static generation),
 * so they work with JavaScript off. With JavaScript on they also close any open
 * <details data-autoclose> after navigation or on an outside click.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { LANGUAGES } from "@/lib/languages";

function swapLocale(pathname: string, code: string) {
  const parts = pathname.split("/");
  parts[1] = code;
  return parts.join("/") || `/${code}`;
}

export function LangLinks({ locale, asList = false }: { locale: string; asList?: boolean }) {
  const pathname = usePathname() || `/${locale}`;
  const links = LANGUAGES.map((l) => (
    <a
      key={l.code}
      href={swapLocale(pathname, l.code)}
      lang={l.code}
      hrefLang={l.code}
      aria-current={l.code === locale ? "true" : undefined}
    >
      {l.name}
    </a>
  ));
  if (!asList) return <>{links}</>;
  return (
    <ul>
      {links.map((a) => (
        <li key={a.key}>{a}</li>
      ))}
    </ul>
  );
}

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const current = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link href={href} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  );
}

export function DetailsAutoClose() {
  const pathname = usePathname();

  useEffect(() => {
    document.querySelectorAll<HTMLDetailsElement>("details[data-autoclose][open]").forEach((d) => {
      d.open = false;
    });
  }, [pathname]);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      document.querySelectorAll<HTMLDetailsElement>("details[data-autoclose][open]").forEach((d) => {
        if (!d.contains(e.target as Node)) d.open = false;
      });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.querySelectorAll<HTMLDetailsElement>("details[data-autoclose][open]").forEach((d) => {
        d.open = false;
        d.querySelector("summary")?.focus();
      });
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
