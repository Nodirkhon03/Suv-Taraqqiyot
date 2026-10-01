import { Defs, GateValve, Leader, LevelMark, Pipe, Txt, Water, type DwgText } from "./parts";

/**
 * Hydrogeological well, section through the strata (not to scale; depth break).
 * Soil → loam → clay aquitard → confined sand/gravel aquifer → clay. Conductor casing cemented in the top; production
 * casing telescoping from the pump chamber to the screen; cement grout seals the annulus down through the clay;
 * gravel pack round the screen; sump with a bottom plug. Submersible pump (pump end over the motor) on the riser,
 * below the dynamic level; the motor sits above the screen so inflow cools it. Static (piezometric) level in the clay,
 * cone of depression to the dynamic level at the well. Wellhead: riser → gate valve → water meter → to the reservoir.
 * Motion: water particles move from the aquifer through the gravel pack into the screen, up past the motor into the
 * pump, up the riser and out of the wellhead; impeller turns; the cone and dynamic level breathe; static level steady.
 */
const P = "wl";
const AX = 200;

export default function WellDrawing({ t }: { t: DwgText }) {
  return (
    <svg viewBox="0 0 640 560">
      <Defs p={P} />

      <text className="tt" x="20" y="30">{t.title}</text>

      {/* ── strata (x 40–340) ── */}
      <rect x="40" y="130" width="300" height="24" className="sd-soilf" />
      <rect x="40" y="130" width="300" height="24" fill={`url(#${P}-soil)`} />
      <rect x="40" y="154" width="300" height="44" fill={`url(#${P}-loam)`} />
      <rect x="40" y="212" width="300" height="78" fill={`url(#${P}-clay)`} />
      <rect x="40" y="290" width="300" height="188" className="sd-sandf" />
      <rect x="40" y="290" width="300" height="188" fill={`url(#${P}-grav)`} />
      <rect x="40" y="290" width="300" height="188" className="sd-aq" />
      <rect x="40" y="478" width="300" height="50" fill={`url(#${P}-clay)`} />
      <path className="sd-bd" d="M40 154 H340 M40 212 H340 M40 290 H340 M40 478 H340" />
      <path className="sd-n1" d="M340 130 V528 M40 130 V528" />
      <path className="sd-g" d="M28 130 H352" />

      {/* ── borehole fills: grout (upper annulus), gravel pack (aquifer) ── */}
      <path className="sd-concf" d="M160 130 H240 V180 H232 V290 H168 V180 H160 Z" />
      <path d="M160 130 H240 V180 H232 V290 H168 V180 H160 Z" fill={`url(#${P}-conc)`} />
      <rect x="168" y="290" width="64" height="202" className="sd-white" />
      <rect x="168" y="290" width="64" height="202" fill={`url(#${P}-grav)`} />
      <rect x="168" y="290" width="64" height="202" className="sd-sandf" />
      <path className="sd-bh" d="M160 130 V180 H168 V492 H232 V180 H240 V130" />

      {/* ── casing interiors (opaque), water below the dynamic level ── */}
      <path className="sd-white" d="M179 120 H221 V362 L213 370 V488 H187 V370 L179 362 Z" />
      <rect x="179" y="282" width="42" height="84" className="sd-wash wl-lvl" />
      <path className="sd-wash" d="M179 366 H221 L213 370 V488 H187 V370 Z" />
      <path className="sd-wl wl-surf" d="M179 282 H221" />

      {/* conductor casing (cemented) */}
      <path className="sd-cas" d="M167.5 124 V180 M232.5 124 V180" />
      {/* production casing: pump chamber → reducer → screen → sump → plug */}
      <path className="sd-cas" d="M177.5 120 V362 L185.5 370 M222.5 120 V362 L214.5 370 M185.5 452 V488 M214.5 452 V488" />
      <path className="sd-scr" d="M185.5 370 V452 M214.5 370 V452" />
      <rect x="184" y="488" width="32" height="4" className="sd-nf" />

      {/* submersible pump: pump end (impeller), intake, motor; power cable */}
      <path className="sd-cable" d="M207 116 V292 L211 298 V330" />
      <rect x="192" y="298" width="16" height="24" className="sd-wf" />
      <g className="wl-imp">
        <circle cx={AX} cy="310" r="5.5" className="sd-imp" />
        <path className="sd-imp" d={`M${AX} 310 L${AX + 1} 304.5 M${AX} 310 L${AX + 4.7} 312.5 M${AX} 310 L${AX - 5} 312`} />
      </g>
      <rect x="192" y="322" width="16" height="6" className="sd-wf" />
      <path className="sd-n1" d="M196 322 V328 M200 322 V328 M204 322 V328" />
      <rect x="192" y="328" width="16" height="30" className="sd-wf" />
      <path className="sd-n1" d="M192 336 H208 M192 350 H208" />

      {/* water particles: aquifer → gravel pack → screen, up past the motor to the intake */}
      {[400, 420, 440].map((y) => (
        <g key={y}>
          <path className="sd-pt wl-pt" d={`M44 ${y} H184`} />
          <path className="sd-pt wl-pt" d={`M336 ${y} H216`} />
        </g>
      ))}
      <path className="sd-pt wl-pt" d="M189.5 448 V328" />
      <path className="sd-pt wl-pt" d="M210.5 448 V328" />

      {/* riser and wellhead */}
      <Pipe d={`M${AX} 298 V96 H384`} w={9} />
      <Water d={`M${AX} 298 V96 H384`} w={3} flow="wl-fl" />
      <path className="sd-wc" d="M386 96 H396" strokeWidth={2} markerEnd={`url(#${P}-fa)`} />
      <rect x="152" y="126" width="96" height="8" className="sd-concf" />
      <rect x="152" y="126" width="96" height="8" fill={`url(#${P}-conc)`} />
      <rect x="170" y="114" width="60" height="6" className="sd-nf" />
      <GateValve x={258} y={96} />
      {/* water meter */}
      <g className="sd-vv">
        <rect x="296" y="87" width="30" height="18" />
        <path className="sd-stem" d="M296 84 V108 M326 84 V108" />
        <circle cx="311" cy="78" r="6" />
        <path className="sd-stem" d="M311 87 V84" />
      </g>

      {/* static level (piezometric) and cone of depression to the dynamic level */}
      <path className="sd-lvl" d="M40 244 H160 M240 244 H340" />
      <LevelMark x={320} y={244} />
      <g className="wl-cone">
        <path className="sd-cone" d="M40 244 C110 245 156 258 168 282 M232 282 C244 258 284 245 340 244" />
      </g>
      <g className="wl-dwl">
        <LevelMark x={216} y={282} />
      </g>

      {/* depth dimension with break */}
      <line x1="30" y1="130" x2="30" y2="492" className="sd-b" markerStart={`url(#${P}-ar)`} markerEnd={`url(#${P}-ar)`} />
      <text className="tn" x="20" y="340" textAnchor="middle" transform="rotate(-90 20 340)">{t.depth}</text>
      {/* depth break across the section */}
      <rect x="14" y="198" width="334" height="14" className="sd-gap" />
      <path className="sd-n1" d="M14 200 L80 200 L86 195 L92 205 L98 200 L348 200 M14 210 L80 210 L86 205 L92 215 L98 210 L348 210" />

      {/* strata names, left */}
      <text x="48" y="147">{t.soil}</text>
      <text x="48" y="183">{t.loam}</text>
      <Txt x={48} y={266}>{t.clay}</Txt>
      <Txt x={48} y={322}>{t.aquifer}</Txt>
      <text x="48" y="510">{t.clay2}</text>

      {/* labels, right column */}
      <Leader d="M233 150 H352" x={233} y={150} />
      <text x="360" y="155">{t.conductor}</text>
      <Leader d="M236 176 H352" x={236} y={176} />
      <Txt x={360} y={181}>{t.grout}</Txt>
      <Leader d="M223 222 L234 228 H352" x={223} y={222} />
      <text x="360" y="233">{t.casing}</text>
      <Leader d="M330 244 L338 254 H352" x={330} y={244} />
      <text x="360" y="259">{t.static}</text>
      <Leader d="M204 266 L234 280 H352" x={204} y={266} />
      <text x="360" y="285">{t.riser}</text>
      <Leader d="M218 284 L236 306 H352" x={218} y={284} />
      <text x="360" y="311">{t.dynamic}</text>
      <Leader d="M208 330 L234 332 H352" x={208} y={330} />
      <text x="360" y="337">{t.pump}</text>
      <Leader d="M226 358 H352" x={226} y={358} />
      <text x="360" y="363">{t.gravel}</text>
      <Leader d="M215 380 L234 384 H352" x={215} y={380} />
      <text x="360" y="389">{t.screen}</text>
      <Leader d="M215 470 H352" x={215} y={470} />
      <text x="360" y="475">{t.sump}</text>

      <text x="258" y="72" textAnchor="middle">{t.valve}</text>
      <text x="288" y="126">{t.meter}</text>
      <text x="404" y="101">{t.out}</text>
    </svg>
  );
}
