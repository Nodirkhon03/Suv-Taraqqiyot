import { Defs, Leader, r2, type DwgText } from "./parts";

/**
 * Pipeline construction, two typical details.
 * Top — trench cross-section: sloped walls (1:m), sand bedding, haunching to the springline, initial backfill in
 * sand to 30 units over the crown, warning tape, final backfill in excavated soil, compacted surface course;
 * cover depth h (≥ frost depth). A rammer tamps the surface (motion only).
 * Bottom — PE butt fusion, longitudinal section: left pipe in the fixed clamps, right pipe in the moving carriage,
 * heater plate and facing tool parked. Loop (8 s): right end retracts → heater drops in → ends press onto the plate
 * (heat soak, plate and ends glow sand) → plate lifts out → ends press together → double-roll bead forms → hold/cool
 * → water flows through the joined pipe. Static state = finished joint with water, tools parked.
 */
const P = "pp";
// trench: top 40…300 at y 90, bottom 120…220 at y 282 (slope 1:0.42)
const xL = (y: number) => r2(40 + ((y - 90) * 80) / 192);
const xR = (y: number) => r2(300 - ((y - 90) * 80) / 192);
const CX = 170; // pipe centre
const CY = 242;

export default function PipesDrawing({ t }: { t: DwgText }) {
  return (
    <svg viewBox="0 0 640 540">
      <Defs p={P} />

      {/* ───────────── trench cross-section ───────────── */}
      <text className="tt" x="20" y="30">{t.trench}</text>
      <text x="20" y="54">{t.cover}</text>

      {/* natural ground band outside the excavation */}
      <path
        d={`M0 90 H40 L120 282 H220 L300 90 H318 V100 H306.67 L226.67 292 H113.33 L33.33 100 H0 Z`}
        fill={`url(#${P}-earth)`}
      />
      {/* fills, bottom to top */}
      <path className="sd-sandf" d={`M${xL(186)} 186 H${xR(186)} L220 282 H120 Z`} />
      <path d={`M${xL(186)} 186 H${xR(186)} L220 282 H120 Z`} fill={`url(#${P}-sand)`} />
      <path className="sd-soilf" d={`M${xL(100)} 100 H${xR(100)} L${xR(186)} 186 H${xL(186)} Z`} />
      <path d={`M${xL(100)} 100 H${xR(100)} L${xR(186)} 186 H${xL(186)} Z`} fill={`url(#${P}-soil)`} />
      <path className="sd-concf" d={`M40 90 H300 L${xR(100)} 100 H${xL(100)} Z`} />
      <path d={`M40 90 H300 L${xR(100)} 100 H${xL(100)} Z`} fill={`url(#${P}-grav)`} />
      {/* layer boundaries */}
      <path className="sd-bd" d={`M${xL(100)} 100 H${xR(100)} M${xL(186)} 186 H${xR(186)} M${xL(242)} 242 H${xR(242)} M${xL(268)} 268 H${xR(268)}`} />
      {/* excavation outline and ground surface */}
      <path className="sd-n1" d="M40 90 L120 282 H220 L300 90" />
      <path className="sd-g" d="M0 90 H40 M300 90 H318" />
      <path className="sd-n" d="M40 90 H300" />

      {/* warning tape */}
      <path className="sd-tape" d="M136 160 H204" />

      {/* pipe: wall thickness, full of water, flow towards the viewer (⊙) */}
      <circle cx={CX} cy={CY} r="26" className="sd-nf" />
      <circle cx={CX} cy={CY} r="21.5" className="sd-white" />
      <circle cx={CX} cy={CY} r="21.5" className="sd-wash" />
      <circle cx={CX} cy={CY} r="5" className="sd-wl" />
      <circle cx={CX} cy={CY} r="1.8" className="sd-mkw" />

      {/* cover depth h to the crown */}
      <path className="sd-b" d="M112 216 H160" />
      <line x1="118" y1="90" x2="118" y2="216" className="sd-b" markerStart={`url(#${P}-ar)`} markerEnd={`url(#${P}-ar)`} />
      <text x="123" y="150" className="tn">h</text>

      {/* slope 1:m (triangle on the natural-ground side of the left wall) */}
      <path className="sd-b" d={`M${xL(110)} 110 V158 H${xL(158)}`} />
      <text x={xL(110) - 6} y="139" className="tn" textAnchor="end">1</text>
      <text x={r2((xL(110) + xL(158)) / 2)} y="176" className="tn" textAnchor="middle">m</text>

      {/* rammer tamping the surface (Ishikawa-type) */}
      <g className="pp-ram">
        <rect x="228" y="84" width="18" height="6" className="sd-wf" />
        <rect x="232" y="68" width="10" height="16" className="sd-wf" />
        <path className="sd-n1" d="M232 72 H242 M232 76 H242 M232 80 H242" />
        <rect x="229" y="56" width="16" height="12" className="sd-wf" />
        <path className="sd-n" d="M245 60 L258 50 M254 46 L262 54" />
      </g>

      {/* labels (right column) */}
      <Leader d="M282 95 H320" x={282} y={95} />
      <text x="326" y="100">{t.surface}</text>
      <Leader d="M262 128 H320" x={262} y={128} />
      <text x="326" y="133">{t.backfill}</text>
      <Leader d="M204 160 H320" x={204} y={160} />
      <text x="326" y="165">{t.tape}</text>
      <Leader d="M244 194 H320" x={244} y={194} />
      <text x="326" y="199">{t.initial}</text>
      <Leader d={`M${CX + 16.8} 222 H320`} x={CX + 16.8} y={222} />
      <text x="326" y="227" className="tn">{t.pipe}</text>
      <Leader d="M214 254 H320" x={214} y={254} />
      <text x="326" y="259">{t.haunch}</text>
      <Leader d="M200 276 H320" x={200} y={276} />
      <text x="326" y="281">{t.bedding}</text>

      {/* ───────────── PE butt fusion, longitudinal section ───────────── */}
      <path className="sd-sep" d="M20 312 H620" />
      <text className="tt" x="20" y="344">{t.fusion}</text>

      {/* machine frame: guide rods and fixed carriage */}
      <rect x="196" y="492" width="12" height="24" className="sd-wf" />
      <rect x="452" y="492" width="12" height="24" className="sd-wf" />
      <rect x="208" y="484" width="84" height="30" className="sd-wf" />
      <path className="sd-n1" d="M208 498 H452 M208 508 H452" />
      {/* fixed clamps (left) */}
      <rect x="214" y="404" width="22" height="14" className="sd-wf" />
      <rect x="214" y="470" width="22" height="14" className="sd-wf" />
      <rect x="262" y="404" width="22" height="14" className="sd-wf" />
      <rect x="262" y="470" width="22" height="14" className="sd-wf" />

      {/* left pipe (fixed), end face at x 320 */}
      <rect x="24" y="418" width="296" height="6" className="sd-nf" />
      <rect x="24" y="464" width="296" height="6" className="sd-nf" />
      <path className="sd-n1" d="M24 412 V440 L19 444 L29 448 L24 452 V476" />
      <rect x="314" y="418" width="6" height="52" className="sd-melt pp-melt" />

      {/* water in the joined pipe (static); in motion only after the joint is made */}
      <g className="pp-wtr">
        <rect x="24" y="424" width="592" height="40" className="sd-wash" />
        <Flow />
      </g>

      {/* moving carriage: right clamps + right pipe */}
      <g className="pp-r">
        <rect x="352" y="484" width="84" height="30" className="sd-wf" />
        <path className="sd-n1" d="M352 498 H436 M352 508 H436" />
        <rect x="356" y="404" width="22" height="14" className="sd-wf" />
        <rect x="356" y="470" width="22" height="14" className="sd-wf" />
        <rect x="404" y="404" width="22" height="14" className="sd-wf" />
        <rect x="404" y="470" width="22" height="14" className="sd-wf" />
        <rect x="320" y="418" width="296" height="6" className="sd-nf" />
        <rect x="320" y="464" width="296" height="6" className="sd-nf" />
        <path className="sd-n1" d="M616 412 V440 L611 444 L621 448 L616 452 V476" />
        <rect x="320" y="418" width="6" height="52" className="sd-melt pp-melt" />
      </g>

      {/* double-roll fusion bead, outside and inside both walls */}
      <g className="pp-bead">
        <path className="sd-bead pp-b-up" d="M309 418 C309 410 318 410 320 416 C322 410 331 410 331 418 Z" />
        <path className="sd-bead pp-b-dn" d="M309 470 C309 478 318 478 320 472 C322 478 331 478 331 470 Z" />
        <path className="sd-bead pp-b-dn" d="M312 424 C312 430 318.5 430 320 426 C321.5 430 328 430 328 424 Z" />
        <path className="sd-bead pp-b-up" d="M312 464 C312 458 318.5 458 320 462 C321.5 458 328 458 328 464 Z" />
      </g>

      {/* heater plate: parked above the joint; drops in to x 320–330 (y 404–484) */}
      <g className="pp-heat">
        <rect x="320" y="324" width="10" height="80" className="sd-wf" />
        <rect x="321.5" y="326" width="7" height="76" className="sd-glow pp-glow" />
        <path className="sd-n" d="M316 324 V314 H334 V324" />
        <path className="sd-n1" d="M325 314 V304 Q325 296 340 296" />
      </g>
      <g className="pp-hl">
        <Leader d="M318 360 H312" x={318} y={360} />
      </g>
      <text x="306" y="365" textAnchor="end">{t.heater}</text>

      {/* facing tool, parked */}
      <g>
        <rect x="452" y="340" width="34" height="64" className="sd-wf" />
        <circle cx="469" cy="372" r="12" className="sd-wf" />
        <path className="sd-n1" d="M469 360 V384 M457 372 H481" />
        <path className="sd-n" d="M462 340 V330 H476 V340" />
      </g>
      <text x="494" y="377">{t.facer}</text>

      {/* labels */}
      <Leader d="M225 404 L218 392 H210" x={225} y={404} />
      <text x="206" y="397" textAnchor="end">{t.clamp}</text>
      <Leader d="M320 477 V520" x={320} y={477} />
      <text x="328" y="530">{t.bead}</text>
      <text x="540" y="410">{t.pe}</text>
    </svg>
  );
}

function Flow() {
  return (
    <>
      <path className="sd-wc" d="M30 444 H610" strokeWidth={3} />
      <path className="sd-fl pp-fl" d="M30 444 H610" strokeWidth={3} />
    </>
  );
}
