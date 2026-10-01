"use client";

import { useSelectedLayoutSegment } from "next/navigation";

/**
 * The projects layout also wraps /projects/[slug]. This renders the listing's JSON-LD
 * (CollectionPage + BreadcrumbList + ItemList) only when the listing itself is the active page;
 * it is server-rendered into the static HTML like any client component.
 */
export default function ListingLd({ json }: { json: string }) {
  const segment = useSelectedLayoutSegment();
  if (segment !== null) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
