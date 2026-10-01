import type { ReactNode } from "react";

/**
 * Navy page hero for the inner pages: the home drafting grid without the system drawing.
 * optional kicker (project detail: back link + position) → H1 → lead → one CTA row; optional title block on the right.
 * Server component; nothing moves.
 */
export default function PageHero({
  kicker,
  title,
  lead,
  children,
  aside,
}: {
  kicker?: ReactNode;
  title: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="phero" aria-labelledby="page-title">
      <div className="wrap">
        <div className="phero-grid">
          <div>
            {kicker && <p className="phero-kicker">{kicker}</p>}
            <h1 id="page-title">{title}</h1>
            {lead && <p className="lead">{lead}</p>}
            {children}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
