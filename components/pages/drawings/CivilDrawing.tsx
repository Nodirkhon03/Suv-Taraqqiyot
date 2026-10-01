import { Defs, Leader, type DwgText } from "./parts";

/**
 * Reinforced-concrete structure (e.g. a buried tank or pump-station wall), half-section to the axis, built in five
 * stages: 1 excavation with a safe side slope (1:m); 2 compacted gravel base (a rammer tamps) and blinding;
 * 3 rebar (bars along the section as lines, bars across it as dots; wall starters bent into the slab) and formwork
 * held by ties; 4 concrete pour, slab then wall, filling from the bottom; 5 formwork stripped, waterproofing on the
 * outer face and under the slab, backfill compacted in layers.
 * Loop 12 s: four stages of 2 s, stage 5 runs 4 s (layers, then a hold). Static state = stage 5 complete.
 */
const P = "cv";
// slope 1:0.5 from the toe (430, 410) to the top (560, 150)
const LAYERS: string[] = [
  "M392 340 H465 L430 410 H420 V390 H400 V380 H392 Z",
  "M373 290 H490 L465 340 H373 Z",
  "M373 240 H515 L490 290 H373 Z",
  "M373 190 H540 L515 240 H373 Z",
  "M373 150 H560 L540 190 H373 Z",
];

export default function CivilDrawing({ t }: { t: DwgText }) {
  const dotsSlab = Array.from({ length: 15 }, (_, i) => 52 + i * 22);
  const dotsWall = Array.from({ length: 9 }, (_, i) => 160 + i * 22);
  return (
    <svg viewBox="0 0 640 520">
      <Defs p={P} />

      <text className="tt" x="20" y="30">{t.title}</text>
      {/* stage captions: one per stage in motion; the static drawing shows stage 5 */}
      <text className="ts cv-st cv-st1" x="20" y="54">{t.s1}</text>
      <text className="ts cv-st cv-st2" x="20" y="54">{t.s2}</text>
      <text className="ts cv-st cv-st3" x="20" y="54">{t.s3}</text>
      <text className="ts cv-st cv-st4" x="20" y="54">{t.s4}</text>
      <text className="ts cv-st5" x="20" y="54">{t.s5}</text>

      {/* natural ground around the excavation */}
      <path d="M40 410 H430 L560 150 H640 V160 H566.2 L436.2 420 H40 Z" fill={`url(#${P}-earth)`} />
      <path className="sd-g" d="M560 150 H640" />
      {/* original ground line (stage 1 only) */}
      <path className="sd-gd cv-og" d="M40 150 H560" />
      {/* axis of the structure (half-section) */}
      <path className="sd-axis" d="M40 118 V432" />

      {/* stage 2: compacted gravel base + blinding */}
      <g className="cv-s2">
        <rect x="40" y="390" width="380" height="20" className="sd-sandf" />
        <rect x="40" y="390" width="380" height="20" fill={`url(#${P}-grav)`} />
        <path className="sd-n1" d="M40 390 H420 V410" />
      </g>
      <g className="cv-s2b">
        <rect x="40" y="380" width="360" height="10" className="sd-concf" />
        <rect x="40" y="380" width="360" height="10" fill={`url(#${P}-sand)`} />
        <path className="sd-n1" d="M40 380 H400 V390" />
      </g>

      {/* stage 4: concrete, slab then wall, each filling from the bottom */}
      <rect x="40" y="340" width="350" height="40" className="sd-concf cv-slab" />
      <rect x="330" y="140" width="40" height="200" className="sd-concf cv-wall" />
      <g className="cv-st-c1">
        <rect x="40" y="340" width="350" height="40" fill={`url(#${P}-conc)`} />
      </g>
      <g className="cv-st-c2">
        <rect x="330" y="140" width="40" height="200" fill={`url(#${P}-conc)`} />
        <path className="sd-n" d="M40 340 H330 V140 H370 V340 H390 V380 H40" />
      </g>

      {/* stage 3: rebar (stays) */}
      <g className="cv-s3">
        <path className="sd-rb" d="M40 348 H384 V372 H40 M338 146 V362 H296 M362 146 V366 H310 M338 146 H362" />
        {dotsSlab.map((x) => (
          <g key={x}>
            <circle cx={x} cy="352.5" r="2.2" className="sd-nf" />
            <circle cx={x} cy="367.5" r="2.2" className="sd-nf" />
          </g>
        ))}
        {dotsWall.map((y) => (
          <g key={y}>
            <circle cx="342.5" cy={y} r="2.2" className="sd-nf" />
            <circle cx="357.5" cy={y} r="2.2" className="sd-nf" />
          </g>
        ))}
      </g>

      {/* stage 3–4: formwork with walers and ties; slab edge form */}
      <g className="cv-fw">
        <rect x="322" y="134" width="8" height="206" className="sd-fw" />
        <rect x="370" y="134" width="8" height="206" className="sd-fw" />
        <path className="sd-n1" d="M314 170 h8 v10 h-8 Z M314 240 h8 v10 h-8 Z M314 310 h8 v10 h-8 Z M378 170 h8 v10 h-8 Z M378 240 h8 v10 h-8 Z M378 310 h8 v10 h-8 Z" />
        <path className="sd-tie" d="M312 175 H388 M312 245 H388 M312 315 H388" />
        <rect x="390" y="334" width="8" height="46" className="sd-fw" />
        <path className="sd-n1" d="M398 352 L410 380" />
      </g>

      {/* stage 4: concrete pump hose over the wall form */}
      <g className="cv-hose">
        <path className="sd-hose" d="M350 66 V128" />
        <path className="sd-n" d="M344 128 H356" />
      </g>

      {/* stage 5: waterproofing on the outer face and under the slab */}
      <path className="sd-wp cv-wp" d="M371.5 150 V341.5 H391.5 V381.5 H40" />

      {/* stage 5: backfill in compacted layers */}
      {LAYERS.map((d, i) => (
        <g key={i} className={`cv-l cv-l${i + 1}`}>
          <path className="sd-soilf" d={d} />
          <path d={d} fill={`url(#${P}-soil)`} />
        </g>
      ))}
      <g className="cv-l cv-l5">
        <path className="sd-bd" d="M373 340 H465 M373 290 H490 M373 240 H515 M373 190 H540" />
        <path className="sd-g" d="M373 150 H560" />
      </g>

      {/* stage 1: excavation outline (draws itself) */}
      <path className="sd-n cv-exc" d="M40 410 H430 L560 150" pathLength={1} />
      {/* slope 1:m */}
      <path className="sd-b" d="M515 240 V280 H495" />
      <text x="521" y="266" className="tn">1</text>
      <text x="500" y="298" className="tn">m</text>

      {/* stage 2: rammer walks the gravel base */}
      <g className="cv-ram">
        <g className="cv-ram-b">
          <rect x="72" y="384" width="18" height="6" className="sd-wf" />
          <rect x="76" y="368" width="10" height="16" className="sd-wf" />
          <path className="sd-n1" d="M76 372 H86 M76 376 H86 M76 380 H86" />
          <rect x="73" y="356" width="16" height="12" className="sd-wf" />
          <path className="sd-n" d="M89 360 L102 350 M98 346 L106 354" />
        </g>
      </g>

      {/* labels */}
      <g className="cv-lw">
        <Leader d="M350 182 H320" x={350} y={182} />
        <text x="316" y="187" textAnchor="end">{t.wall}</text>
      </g>
      <g className="cv-s3">
        <Leader d="M338 214 H320" x={338} y={214} />
        <text x="316" y="219" textAnchor="end">{t.rebar}</text>
      </g>
      <g className="cv-fw">
        <Leader d="M324 250 H320" x={324} y={250} />
        <text x="316" y="255" textAnchor="end">{t.form}</text>
      </g>
      <g className="cv-wp">
        <Leader d="M372 172 V113 H370" x={372} y={172} />
        <text x="366" y="118" textAnchor="end">{t.wp}</text>
      </g>
      <g className="cv-l5">
        <Leader d="M440 228 V103 H444" x={440} y={228} />
        <text x="448" y="108">{t.backfill}</text>
      </g>
      <g className="cv-st-c1">
        <Leader d="M70 360 V488" x={70} y={360} />
        <text x="78" y="493">{t.slab}</text>
      </g>
      <g className="cv-s2b">
        <Leader d="M110 385 V464" x={110} y={385} />
        <text x="118" y="469">{t.blinding}</text>
      </g>
      <g className="cv-s2">
        <Leader d="M150 400 V440" x={150} y={400} />
        <text x="158" y="445">{t.gravel}</text>
      </g>
    </svg>
  );
}
