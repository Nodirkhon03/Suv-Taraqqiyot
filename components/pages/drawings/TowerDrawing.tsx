import { Defs, GateValve, Leader, LevelMark, Pipe, Txt, Water, type DwgText } from "./parts";

/**
 * Rozhnovsky-type steel water tower, section. Concrete foundation; water-filled steel shaft (the shaft is part of the
 * storage and is the single combined inlet/outlet riser); tank with conical bottom; roof hatch and vent; outside
 * ladder; overflow from above the top water level down to a drain; float level indicator; valve chamber at the base.
 * The tower floats on the network: water comes from the pumping station (right), past the houses, to the tower.
 * H = hydrostatic head from the tank water level to the ground; the tank level is the highest point of the network.
 * Loop (12 s): fill 0–50 % — pump on, water moves left in the main and UP the shaft, level rises (stays below the
 * overflow lip); supply 50–100 % — pump off, water moves DOWN the shaft and right to the houses, level falls.
 * Service connections draw all the time. Static state = level at mid, both directions shown on the riser.
 */
const P = "tw";
const AX = 190; // tower axis

export default function TowerDrawing({ t }: { t: DwgText }) {
  return (
    <svg viewBox="0 0 640 540">
      <Defs p={P}>
        <clipPath id={`${P}-tank`}>
          <path d="M131 101 H249 V176 L207 204 V212 H173 V204 L131 176 Z" />
        </clipPath>
      </Defs>

      <text className="tt" x="20" y="28">{t.title}</text>
      <text x="20" y="48">{t.type}</text>

      {/* ground y 440 */}
      <path d="M0 440 H146 V450 H0 Z M256 440 H290 V450 H256 Z M350 440 H640 V450 H350 Z" fill={`url(#${P}-earth)`} />
      <path className="sd-g" d="M0 440 H146 M234 440 H290 M350 440 H640" />

      {/* foundation + plinth */}
      <path className="sd-concf" d="M146 440 H234 V496 H146 Z M160 430 H220 V440 H160 Z" />
      <path d="M146 440 H234 V496 H146 Z M160 430 H220 V440 H160 Z" fill={`url(#${P}-conc)`} />
      <path className="sd-n" d="M146 440 H234 V496 H146 Z M160 430 H220 V440" />

      {/* shaft: water-filled column */}
      <rect x="173" y="204" width="34" height="226" className="sd-white" />
      <rect x="173" y="212" width="34" height="218" className="sd-wash" />

      {/* tank interior: white, then water clipped to the tank */}
      <path className="sd-white" d="M131 101 H249 V176 L207 204 H173 L131 176 Z" />
      <g clipPath={`url(#${P}-tank)`}>
        <rect x="130" y="144" width="120" height="68" className="sd-wash tw-lvl" />
        <path className="sd-wl tw-surf" d="M130 144 H250" />
      </g>
      {/* max / min operating levels */}
      <path className="sd-lvl" d="M150 120 H230 M150 168 H230" />
      <LevelMark x={160} y={120} />

      {/* steel shell */}
      <path className="sd-n" d="M130 100 V176 L172 204 V430 M250 100 V176 L208 204 V430 M128 100 H252" />
      {/* roof, vent, hatch */}
      <path className="sd-n" d="M124 100 L190 72 L256 100" />
      <path className="sd-n" d="M190 72 V62 M182 62 Q190 53 198 62 Z" />
      <path className="sd-n" d="M141 92.5 V85 L157 78.2 V85.7" />

      {/* overflow: lip above max level, down to a drain with an air gap */}
      <Pipe d="M242 112 V432" w={7} />
      <path className="sd-n" d="M236 107 L239.5 113 M248 107 L244.5 113" />
      <path className="sd-n" d="M234 440 V458 H256 V440 M236 444 H254" />

      {/* level float on a guide */}
      <path className="sd-n1" d="M226 103 V172" />
      <rect x="220" y="140" width="12" height="8" className="sd-wf tw-float" />

      {/* ladders + platform */}
      <path className="sd-n1" d="M148 440 V206 M156 440 V206 M116 204 V94 M124 204 V94 M110 204 H172 M110 204 V194 M110 198 H130" />
      <path
        className="sd-n1"
        d={Array.from({ length: 23 }, (_, i) => `M148 ${430 - i * 10} H156`).join(" ") + " " + Array.from({ length: 11 }, (_, i) => `M116 ${196 - i * 10} H124`).join(" ")}
      />

      {/* inlet/outlet: main → valve chamber → into the shaft */}
      <Pipe d={`M640 470 H${AX} V432`} w={10} />
      <Water d="M640 470 H555" flow="tw-pump" />
      <Water d={`M555 470 H${AX} V212`} flow="tw-riser" />
      {/* direction marks on the riser: ↑ fill, ↓ supply (static: both) */}
      <g className="tw-up">
        <path className="sd-arw" d={`M${AX - 6} 300 L${AX} 292 L${AX + 6} 300 M${AX - 6} 360 L${AX} 352 L${AX + 6} 360`} />
      </g>
      <g className="tw-dn">
        <path className="sd-arw" d={`M${AX - 6} 316 L${AX} 324 L${AX + 6} 316 M${AX - 6} 376 L${AX} 384 L${AX + 6} 376`} />
      </g>

      {/* valve chamber */}
      <path className="sd-n" d="M290 440 V500 H350 V440 M308 440 V432 H332 V440 M304 432 H336" />
      <GateValve x={320} y={470} s={7} />

      {/* houses with service connections */}
      {[465, 555].map((x) => (
        <g key={x}>
          <Pipe d={`M${x} 470 V442`} w={7} />
          <Water d={`M${x} 470 V444`} w={2} flow="tw-svc" />
          <path className="sd-n" d={`M${x - 25} 440 V404 H${x + 25} V440 M${x - 31} 404 L${x} 386 L${x + 31} 404`} />
          <rect x={x - 17} y={414} width={11} height={11} className="sd-n1" fill="none" />
        </g>
      ))}

      {/* hydrostatic head H: ground → tank water level (top follows the level) */}
      <g className="tw-hd">
        <path className="sd-b" d="M64 144 H112" />
      </g>
      <line x1="70" y1="440" x2="70" y2="144" className="sd-b tw-hl" markerStart={`url(#${P}-ar)`} markerEnd={`url(#${P}-ar)`} />
      <path className="sd-b" d="M64 440 H76" />
      <text x="54" y="300" className="tn">H</text>

      {/* labels */}
      <Leader d="M198 60 H322" x={198} y={60} />
      <text x="330" y="65">{t.vent}</text>
      <Leader d="M157 84 H322" x={157} y={84} />
      <text x="330" y="89">{t.hatch}</text>
      <Leader d="M248 110 H322" x={248} y={110} />
      <text x="330" y="115">{t.overflow}</text>
      <Leader d="M250 136 H322" x={250} y={136} />
      <text x="330" y="141" className="tn">{t.tank}</text>
      <Leader d="M226 158 L240 162 H322" x={226} y={158} />
      <text x="330" y="167">{t.float}</text>
      <Leader d="M208 250 H322" x={208} y={250} />
      <Txt x={330} y={255}>{t.shaft}</Txt>

      {/* fill / supply legend; the pointer marks the running phase (motion only) */}
      <path className="sd-arw" d="M334 314 L340 306 L346 314" />
      <text x="356" y="315">{t.fill}</text>
      <path className="sd-arw" d="M334 332 L340 340 L346 332" />
      <text x="356" y="341">{t.supply}</text>
      <path className="sd-ptr tw-ptr" d="M320 304 L328 310 L320 316 Z" />

      <text x={AX} y="522" textAnchor="middle">{t.foundation}</text>
      <text x="320" y="522" textAnchor="middle">{t.chamber}</text>
      <text x="632" y="496" textAnchor="end">{t.pump}</text>
    </svg>
  );
}
