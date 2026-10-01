import type { ReactNode } from "react";

/** Numbered section heading in the drawing-sheet style: "01 · Label" over the H2, optional link right. */
export default function SectionHead({
  id,
  label,
  title,
  aside,
}: {
  id: string;
  label: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <div>
        <span className="sec-no">{label}</span>
        <h2 id={id} className="h2">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
