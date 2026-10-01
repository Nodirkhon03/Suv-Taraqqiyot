import DrawingMotion from "@/components/home/DrawingMotion";

/**
 * Hero drawing: section through a groundwater-fed water supply scheme, left → right in flow order:
 * well field (submersible pumps, 1st lift) → chlorination → clean-water reservoir → 2nd-lift pumping
 * station → buried transmission main (air valve at the high point, washout at the low point) →
 * Rozhnovsky-type water tower → distribution network and houses.
 *
 * Physics: the dashed white line is the hydraulic grade line. It jumps at each pump, falls in the
 * direction of flow (friction), meets the tower's water level and stays above the houses.
 * Every figure is from the company presentation (design/lab/content.md); other captions are nouns.
 *
 * Static (JS off / reduced motion): water in every pipe, levels at mid position. With
 * prefers-reduced-motion: no-preference, CSS loops (globals.css, "hero drawing" block) move the
 * water, turn the impellers and let the reservoir and tower levels breathe out of phase.
 * DrawingMotion only pauses the loops while the drawing is off-screen.
 */
export interface DrawingLabels {
  aria: string;
  wells: string;
  wellDepth: string;
  staticLevel: string;
  dynamicLevel: string;
  submersible: string;
  aquifer: string;
  chlorination: string;
  reservoir: string;
  pump: string;
  lift: string;
  flow: string;
  checkValve: string;
  gateValve: string;
  gauge: string;
  main: string;
  mainLength: string;
  diameter: string;
  frost: string;
  airValve: string;
  washout: string;
  tower: string;
  towerVolume: string;
  network: string;
  service: string;
  hgl: string;
}

/** A pipe drawn as two walls: white outer stroke, navy bore. */
function Pipe({ d, w }: { d: string; w: number }) {
  return (
    <>
      <path className="pipe" d={d} strokeWidth={w} />
      <path className="bore" d={d} strokeWidth={w - 2.5} />
    </>
  );
}

/** Water in a pipe: a solid cyan core (static state) plus a dashed overlay that moves in flow direction. */
function Water({ d, w, speed }: { d: string; w: number; speed: "main" | "raw" | "lift" | "net" | "svc" }) {
  return (
    <>
      <path className="water" d={d} strokeWidth={w} />
      <path className={`flow f-${speed}`} d={d} strokeWidth={w} />
    </>
  );
}

/** Gate valve symbol (bow-tie with stem and handwheel), horizontal pipe. */
function GateValve({ x, y, s = 9 }: { x: number; y: number; s?: number }) {
  return (
    <g className="valve">
      <path d={`M${x - s} ${y - s * 0.8} L${x + s} ${y + s * 0.8} V${y - s * 0.8} L${x - s} ${y + s * 0.8} Z`} />
      <path d={`M${x} ${y} V${y - s * 1.9} M${x - s * 0.75} ${y - s * 1.9} H${x + s * 0.75}`} />
    </g>
  );
}

/** Check (non-return) valve: bow-tie with a hinged flap that the CSS lets flutter slightly. */
function CheckValve({ x, y, s = 9 }: { x: number; y: number; s?: number }) {
  return (
    <g className="valve">
      <path d={`M${x - s} ${y - s * 0.8} L${x + s} ${y + s * 0.8} V${y - s * 0.8} L${x - s} ${y + s * 0.8} Z`} />
      <path className="flap" d={`M${x} ${y - s * 0.8} L${x + s * 0.55} ${y + s * 0.6}`} />
      <circle cx={x} cy={y - s * 0.8} r={1.6} className="pin" />
    </g>
  );
}

function Gauge({ x, y }: { x: number; y: number }) {
  return (
    <g className="valve">
      <path d={`M${x} ${y + 7} V${y + 15}`} />
      <circle cx={x} cy={y} r={7} />
      <path d={`M${x} ${y} L${x + 4} ${y - 3.5}`} />
    </g>
  );
}

/** Submersible pump in a well: pump section (impeller) over the motor. */
function SubPump({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 8} y={340} width={16} height={26} className="body" />
      <rect x={x - 8} y={368} width={16} height={26} className="body" />
      <path className="s-bt" d={`M${x - 8} 376 H${x + 8} M${x - 8} 384 H${x + 8}`} />
      <g className="imp imp-sub">
        <circle cx={x} cy={353} r={5.5} />
        <path d={`M${x} 353 V347.5 M${x} 353 L${x + 4.8} 355.8 M${x} 353 L${x - 4.8} 355.8`} />
      </g>
    </g>
  );
}

/** Drilled well: borehole, casing with screen, wellhead pavilion, riser. Water level marks are drawn separately. */
function Well({ x }: { x: number }) {
  const l = x - 13;
  const r = x + 13;
  return (
    <g>
      {/* borehole wall (dashed) and casing */}
      <path className="s-bt bh" d={`M${x - 17} 258 V436 M${x + 17} 258 V436`} />
      <rect x={l} y={244} width={26} height={190} className="casing-fill" />
      <rect x={l + 0.5} y={322} width={25} height={112} className="wfill" />
      <path className="s-w" d={`M${l} 244 V398 M${r} 244 V398 M${l} 428 V434 H${r} V428`} />
      <path className="s-w screen" d={`M${l} 398 V428 M${r} 398 V428`} />
      {/* wellhead plate + pavilion */}
      <path className="s-w" d={`M${x - 17} 244 H${x + 17}`} strokeWidth={2} />
      <rect x={x - 24} y={222} width={48} height={28} className="s-w" />
      <path className="s-w" d={`M${x - 28} 222 L${x} 208 L${x + 28} 222`} />
    </g>
  );
}

/** Depth break across a borehole: navy gap between two zigzags (drawn over the water so it cuts it). */
function DepthBreak({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 20} y={277} width={40} height={6} className="gap" />
      <path className="s-bt" d={`M${x - 20} 277 L${x - 10} 274 L${x} 280 L${x + 10} 274 L${x + 20} 277 M${x - 20} 283 L${x - 10} 280 L${x} 286 L${x + 10} 280 L${x + 20} 283`} />
    </g>
  );
}

/** Ground band: profile line plus hatched strip of 10 units below it. */
function Ground({ pts }: { pts: [number, number][] }) {
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const band = `${line} ${[...pts].reverse().map(([x, y]) => `L${x} ${y + 10}`).join(" ")} Z`;
  return (
    <>
      <path d={band} fill="url(#hat)" />
      <path className="s-sand" d={line} />
    </>
  );
}

// Hydraulic paths, each drawn in the direction the water moves.
const W1 = "M60 340 V236 H76 V268"; // well 1 riser → wellhead → down into the collector
const W2 = "M150 340 V236 H166 V268"; // well 2 riser
const RAW = "M76 268 H326 V238 H354 V246"; // collector → chlorination → reservoir inlet (free discharge)
const SUCTION = "M470 298 H549"; // reservoir outlet near the floor → pump eye (flooded suction)
const DISCHARGE = "M576 286 V262 H702 V290 H770 L820 274 H860 L950 302 H990 L1040 290 H1100";
const RISER = "M1100 290 V136"; // tower inlet/outlet riser inside the shaft
const NET = "M1100 290 H1306";
const SVC1 = "M1205 290 V240 H1213";
const SVC2 = "M1277 290 V240 H1285";

export default function SystemDrawing({ labels }: { labels: DrawingLabels }) {
  return (
    <div className="drawing-scroll" id="hero-drawing">
      <svg className="drawing" viewBox="0 0 1340 450" role="img" aria-label={labels.aria}>
        <defs>
          <marker id="ar" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0 1 L10 5 L0 9" fill="none" stroke="#24B5C6" strokeWidth="1.4" />
          </marker>
          <pattern id="hat" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" className="hatch" />
          </pattern>
          <pattern id="clay" width="12" height="5" patternUnits="userSpaceOnUse">
            <line x1="0" y1="2.5" x2="7" y2="2.5" className="clay" />
          </pattern>
          <pattern id="grav" width="14" height="12" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.6" className="grav" />
            <circle cx="10" cy="9" r="1.1" className="grav" />
          </pattern>
          <clipPath id="tank-in">
            <path d="M1063 84 V126 Q1100 150 1137 126 V84 Z" />
          </clipPath>
        </defs>

        {/* ── ground surface ── */}
        <Ground pts={[[0, 250], [322, 250], [340, 240]]} />
        <Ground pts={[[470, 240], [488, 250], [496, 250]]} />
        <Ground pts={[[690, 250], [770, 250], [820, 234], [860, 234], [950, 262], [990, 262], [1040, 250], [1340, 250]]} />

        {/* ── 1 well field: strata section (cut between x 34 and 200) ── */}
        <g>
          <rect x="34" y="288" width="166" height="16" fill="url(#clay)" />
          <rect x="34" y="304" width="166" height="132" className="aq-wash" />
          <rect x="34" y="304" width="166" height="132" fill="url(#grav)" />
          <path className="s-b" d="M34 260 V436 H200 M34 288 H200 M34 304 H200" />
          <path className="s-bt" d="M200 260 L196 280 L204 300 L196 320 L204 340 L196 360 L204 380 L196 400 L204 420 L200 436" />
          {/* static level (piezometric surface) and the cone of depression round the pumped wells */}
          <path className="lvl-line" d="M34 300 H206" />
          <path className="s-bt" d="M34 301 C38 302 41 310 43 322 M77 322 C82 308 92 305 105 305 C118 305 128 308 133 322 M167 322 C172 308 185 302 200 301" />
          <path className="tri" d="M186 293 H196 L191 300 Z" />
        </g>
        <Well x={60} />
        <Well x={150} />
        <SubPump x={60} />
        <SubPump x={150} />
        <path className="tri tri-w" d="M55 315 H65 L60 322 Z" />
        <path className="tri tri-w" d="M145 315 H155 L150 322 Z" />
        {/* depth dimension */}
        <line x1="24" y1="250" x2="24" y2="434" className="tick" markerStart="url(#ar)" markerEnd="url(#ar)" />
        <text className="dim" x="17" y="342" textAnchor="middle" transform="rotate(-90 17 342)">{labels.wellDepth}</text>

        {/* ── 2 chlorination block on the raw-water line ── */}
        <g>
          <rect x="236" y="228" width="60" height="22" className="s-w" />
          <path className="s-w" d="M232 228 H300" />
          <rect x="246" y="233" width="14" height="13" className="s-bt" />
          <circle cx="282" cy="268" r="2.2" className="pin" />
        </g>

        {/* ── 3 clean-water reservoir: partly buried, inflow at top, outflow near the floor, overflow, vent ── */}
        <g>
          <rect x="340" y="228" width="130" height="80" className="casing-fill" />
          <rect x="341" y="268" width="128" height="40" className="wfill lvl lvl-res" />
          <path className="surf surf-res" d="M341 268 H469" />
          <rect x="340" y="228" width="130" height="80" className="s-w" />
          <path className="s-w" d="M334 228 H476" strokeWidth={2} />
          {/* vent */}
          <path className="s-w" d="M420 228 V214 M411 214 Q420 205 429 214 Z" />
          {/* overflow: funnel lip above the top water level, below the inlet */}
          <Pipe d="M456 252 V336" w={5.5} />
          <path className="s-w" d="M449 249 L453.5 254 M463 249 L458.5 254" />
        </g>

        {/* ── 4 second-lift pumping station (sunken hall, flooded suction) ── */}
        <g>
          <rect x="496" y="186" width="194" height="144" className="casing-fill" />
          <rect x="496" y="186" width="194" height="144" className="s-w" />
          <path className="s-w" d="M488 186 H698 M488 182 H698" />
          <path className="s-w" d="M496 330 H690" strokeWidth={2.5} />
          <path className="s-bt" d="M504 198 H682 M600 198 V206 M596 206 H604" />
          {/* base plate and motor */}
          <path className="s-bt" d="M548 314 H640 V318 H548 Z M556 318 V330 M632 318 V330" />
          <rect x="590" y="287" width="46" height="22" className="body" />
          <path className="s-bt" d="M596 287 V309 M603 287 V309 M610 287 V309 M581 298 H590" />
        </g>

        {/* ── pipes (walls) ── */}
        <Pipe d={W1} w={8} />
        <Pipe d={W2} w={8} />
        <Pipe d={RAW} w={9} />
        <Pipe d={SUCTION} w={12} />
        <Pipe d={DISCHARGE} w={14} />
        <Pipe d="M1100 290 V138" w={8} />
        <Pipe d={NET} w={10} />
        <Pipe d={SVC1} w={6} />
        <Pipe d={SVC2} w={6} />

        {/* ── water (static core + moving overlay) ── */}
        <Water d={W1} w={2.5} speed="lift" />
        <Water d={W2} w={2.5} speed="lift" />
        <Water d={RAW} w={3} speed="raw" />
        <Water d={SUCTION} w={3.5} speed="raw" />
        <Water d={DISCHARGE} w={4} speed="main" />
        <Water d={RISER} w={2.5} speed="lift" />
        <Water d={NET} w={3} speed="net" />
        <Water d={SVC1} w={2} speed="svc" />
        <Water d={SVC2} w={2} speed="svc" />
        {/* chlorine dosing line into the collector */}
        <path className="dose" d="M253 246 V258 H282 V264" />

        <DepthBreak x={60} />
        <DepthBreak x={150} />

        {/* pump on top of the pipes: volute + impeller (turns counter-clockwise, tangential discharge up) */}
        <g>
          <circle cx="565" cy="298" r="16" className="body" />
          <g className="imp imp-cf">
            <circle cx="565" cy="298" r="10.5" />
            <path d="M565 298 Q567 292 571 290 M565 298 Q571 300 573 304 M565 298 Q563 304 559 306 M565 298 Q559 296 557 292" />
          </g>
          <circle cx="565" cy="298" r="2" className="pin" />
        </g>
        <GateValve x={520} y={298} s={7} />
        <CheckValve x={608} y={262} />
        <Gauge x={636} y={234} />
        <GateValve x={664} y={262} />

        {/* ── 5 transmission main: joints, frost cover, air valve at the high point, washout at the low point ── */}
        <g className="s-w">
          <rect x="750" y="281" width="4" height="18" className="flange" />
          <rect x="1004" y="288" width="4" height="18" className="flange" transform="rotate(-13.5 1006 297)" />
          <rect x="1062" y="281" width="4" height="18" className="flange" />
          <rect x="903" y="279" width="4" height="18" className="flange" transform="rotate(17.3 905 288)" />
        </g>
        <line x1="724" y1="250" x2="724" y2="283" className="tick" markerStart="url(#ar)" markerEnd="url(#ar)" />
        <text className="dim" x="712" y="322">{labels.frost}</text>
        {/* air valve chamber */}
        <g>
          <path className="s-w" d="M828 234 V258 M862 234 V258" />
          <path className="s-w" d="M845 267 V257" />
          <rect x="839" y="246" width="12" height="11" className="body" />
          <path className="s-w" d="M845 246 V240 M841 240 H849" />
          <circle cx="845" cy="234" r="1.6" className="bubble b1" />
          <circle cx="848" cy="234" r="1.2" className="bubble b2" />
        </g>
        <text className="dim" x="868" y="229">{labels.airValve}</text>
        {/* washout */}
        <g>
          <rect x="954" y="262" width="32" height="88" className="s-w chamber" />
          <Pipe d="M970 309 V344" w={6} />
          <path className="valve" d="M963 321 H977 L963 335 H977 Z" />
        </g>
        <text className="dim" x="970" y="370" textAnchor="middle">{labels.washout}</text>
        {/* diameter callout */}
        <path className="s-bt" d="M1022 303 V338 H1028" />
        <text className="dim" x="1032" y="343">{labels.diameter}</text>
        {/* length dimension */}
        <line x1="705" y1="180" x2="1040" y2="180" className="tick" markerStart="url(#ar)" markerEnd="url(#ar)" />
        <path className="s-bt" d="M705 172 V246 M1040 172 V246" />
        <text className="lbl" x="872" y="166" textAnchor="middle">{labels.main}</text>
        <text className="dim" x="872" y="200" textAnchor="middle">{labels.mainLength}</text>

        {/* ── 6 Rozhnovsky-type steel water tower ── */}
        <g>
          <rect x="1080" y="250" width="40" height="18" className="casing-fill s-w" />
          <path className="s-w" d="M1090 134 V238 L1082 250 M1110 134 V238 L1118 250" />
          <path className="casing-fill" d="M1063 84 V126 Q1100 150 1137 126 V84 Z" />
          <g clipPath="url(#tank-in)">
            <rect x="1062" y="106" width="76" height="34" className="wfill lvl lvl-tow" />
            <path className="surf surf-tow" d="M1062 106 H1138" />
          </g>
          <path className="s-w" d="M1062 84 V126 Q1100 150 1138 126 V84" />
          <path className="s-w" d="M1058 84 L1100 66 L1142 84 Z M1100 66 V60" />
          {/* overflow: lip above the top water level, down past the shaft to a drain */}
          <Pipe d="M1128 90 V246" w={5} />
          <path className="s-w" d="M1123 87 L1126 91 M1133 87 L1130 91 M1122 246 H1134" />
          {/* volume bracket */}
          <path className="s-bt" d="M1144 84 H1152 M1144 126 H1152 M1148 84 V126" />
        </g>
        <text className="dim" x="1148" y="78">{labels.towerVolume}</text>
        <text className="lbl" x="1100" y="40" textAnchor="middle">{labels.tower}</text>
        <line x1="1100" y1="47" x2="1100" y2="56" className="tick" />

        {/* ── 7 distribution network: valve chamber, houses, service connections ── */}
        <g>
          <path className="s-w" d="M1138 250 V304 H1162 V250" />
          <GateValve x={1150} y={290} s={6} />
          <rect x="1180" y="216" width="50" height="34" className="s-w" />
          <path className="s-w" d="M1174 216 L1205 196 L1236 216" />
          <rect x="1252" y="216" width="50" height="34" className="s-w" />
          <path className="s-w" d="M1246 216 L1277 196 L1308 216" />
          <path className="s-bt" d="M1188 224 H1198 V234 H1188 Z M1260 224 H1270 V234 H1260 Z M1213 239 V245 M1285 239 V245" />
          <path className="s-w" d="M1306 284 V296" strokeWidth={2} />
        </g>
        <text className="lbl" x="1146" y="172">{labels.network}</text>
        <line x1="1241" y1="178" x2="1241" y2="194" className="tick" />
        <text className="dim" x="1322" y="320" textAnchor="end">{labels.service}</text>

        {/* ── hydraulic grade line: up at each pump, down along the flow, above the houses ── */}
        <path className="hgl" d="M44 322 V190 L346 228 V268 H565 V72 L1062 106 M1138 106 L1336 134 M134 322 V201" />
        <text className="dim hgl-t" x="588" y="60">{labels.hgl}</text>

        {/* ── labels: well field and underground ── */}
        <text className="lbl" x="40" y="150">{labels.wells}</text>
        <line x1="60" y1="158" x2="60" y2="186" className="tick" />
        <text className="dim" x="212" y="304">{labels.staticLevel}</text>
        <path className="s-bt" d="M164 322 H206 M164 353 H206" />
        <text className="dim" x="212" y="326">{labels.dynamicLevel}</text>
        <text className="dim" x="212" y="357">{labels.submersible}</text>
        <text className="dim" x="212" y="420">{labels.aquifer}</text>

        <text className="lbl" x="266" y="128" textAnchor="middle">{labels.chlorination}</text>
        <line x1="266" y1="136" x2="266" y2="208" className="tick" />
        <text className="lbl" x="405" y="150" textAnchor="middle">{labels.reservoir}</text>
        <line x1="395" y1="158" x2="395" y2="218" className="tick" />
        <text className="lbl" x="574" y="128">{labels.pump}</text>
        <text className="dim" x="574" y="146">{labels.lift} · {labels.flow}</text>
        <line x1="676" y1="156" x2="676" y2="176" className="tick" />

        {/* legend of the station fittings */}
        <g transform="translate(0 0)">
          <CheckValve x={514} y={352} s={6} />
          <text className="dim" x="530" y="357">{labels.checkValve}</text>
          <GateValve x={514} y={378} s={6} />
          <text className="dim" x="530" y="383">{labels.gateValve}</text>
          <g className="valve">
            <circle cx="514" cy="402" r="5.5" />
            <path d="M514 402 L517 399" />
          </g>
          <text className="dim" x="530" y="407">{labels.gauge}</text>
        </g>
      </svg>
      <DrawingMotion targetId="hero-drawing" />
    </div>
  );
}
