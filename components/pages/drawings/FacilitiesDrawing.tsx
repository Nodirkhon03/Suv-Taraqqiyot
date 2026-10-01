import { Balloon, Defs, GateValve, LevelMark, Pipe, Txt, Water, type DwgText } from "./parts";

/**
 * Clean-water reservoir + second-lift pumping station, section.
 * Reservoir: inflow discharges above the top water level (air gap), overflow lip between the inflow and max level,
 * roof vent, access hatch, outlet near the floor. Pump hall sunk so the pump centreline (y 350) is below the minimum
 * water level (y 320): flooded suction. Suction: gate valve → centrifugal pump (motor on a common baseplate and
 * plinth). Delivery: check valve → gate valve → flow meter → pressure gauge → discharge header → network.
 * Loop (12 s): pump runs 0–60 % (impeller turns, check-valve disc open, suction and delivery water moves, gauge rises
 * and settles with a flicker, reservoir level falls); pump stops 60–100 % (impeller stops, disc closes, gauge drops to
 * the network's static pressure, level refills from the steady inflow). Static state = pump running, level at mid.
 */
const P = "fa";
const PX = 360; // pump centre
const PY = 350;

export default function FacilitiesDrawing({ t }: { t: DwgText }) {
  const legend: [number, string][] = [
    [1, t.vent],
    [2, t.overflow],
    [3, t.gate],
    [4, t.pump],
    [5, t.motor],
    [6, t.check],
    [7, t.meter],
    [8, t.gauge],
  ];
  return (
    <svg viewBox="0 0 640 540">
      <Defs p={P}>
        <clipPath id={`${P}-tank`}>
          <rect x="40" y="172" width="200" height="200" />
        </clipPath>
      </Defs>

      <text className="tt" x="20" y="30">{t.reservoir}</text>
      <text className="tt" x="300" y="30">{t.station}</text>
      <text className="tn" x="300" y="52">{t.flow}</text>

      {/* ground: surface y 200, earth bands beside the buried walls and under the floors */}
      <path d="M0 200 H30 V386 H20 V210 H0 Z" fill={`url(#${P}-earth)`} />
      <path d="M250 200 H270 V414 H258 V386 H250 Z" fill={`url(#${P}-earth)`} />
      <path d="M610 200 H640 V210 H620 V424 H610 Z" fill={`url(#${P}-earth)`} />
      <path d="M22 386 H258 V396 H22 Z M262 414 H618 V424 H262 Z" fill={`url(#${P}-earth)`} />
      <path className="sd-g" d="M0 200 H30 M250 200 H270 M610 200 H640" />

      {/* ── reservoir (reinforced concrete) ── */}
      <Concrete
        rects={[[30, 160, 220, 12], [30, 172, 10, 200], [240, 172, 10, 200], [22, 372, 236, 14]]}
        outline="M30 160 H250 V372 H258 V386 H22 V372 H30 Z M40 172 H240 V372 H40 Z"
      />
      {/* water body: drawn at mid level (y 265), moves between y 220 and 300 — never above max (210) or below min (320) */}
      <g clipPath={`url(#${P}-tank)`}>
        <rect x="40" y="265" width="200" height="107" className="sd-wash fa-lvl" />
        <path className="sd-wl fa-surf" d="M40 265 H240" />
      </g>
      {/* max / min operating levels */}
      <path className="sd-lvl" d="M100 210 H238 M100 320 H238" />
      <LevelMark x={231} y={210} />
      <LevelMark x={231} y={320} />
      <text x="104" y="205">{t.max}</text>
      <text x="104" y="315">{t.min}</text>

      {/* vent */}
      <path className="sd-n" d="M150 160 V142 M140 142 Q150 130 160 142 Z" />
      {/* access hatch */}
      <path className="sd-n" d="M196 160 V152 H220 V160 M194 152 H222" />

      {/* inflow: through the wall under the roof, free discharge above the overflow lip */}
      <Pipe d="M0 182 H92 V194" w={10} />
      <Water d="M0 182 H92 V194" flow="fa-in" />
      <path className="sd-wc" d="M92 198 V206" strokeWidth={2} markerEnd={`url(#${P}-fa)`} />
      <text x="4" y="152">{t.inflow}</text>

      {/* overflow: bell lip at y 200, down and out through the wall to a drain */}
      <Pipe d="M56 202 V352 H0" w={9} />
      <path className="sd-n" d="M46 196 L52 203 M66 196 L60 203" />

      {/* outlet near the floor → suction (y 350) */}
      <path className="sd-n" d="M222 340 V360" />
      <Pipe d={`M224 ${PY} H${PX - 20}`} w={14} />
      <Water d={`M224 ${PY} H${PX - 20}`} flow="fa-run" />

      {/* ── pumping station hall (sunk) ── */}
      <Concrete
        rects={[[262, 120, 356, 12], [270, 132, 10, 268], [600, 132, 10, 268], [262, 400, 356, 14]]}
        outline="M262 120 H618 V132 H610 V400 H618 V414 H262 V400 H270 V132 H262 Z M280 132 H600 V400 H280 Z"
      />
      {/* overhead monorail with chain hoist over the pump set */}
      <path className="sd-n" d="M300 156 H570 M320 132 V156 M550 132 V156" />
      <rect x="352" y="158" width="16" height="10" className="sd-wf" />
      <path className="sd-n1" d="M360 168 V186 M356 186 Q356 192 360 192 Q364 192 364 188" />
      {/* plinth + baseplate */}
      <rect x="300" y="378" width="160" height="22" className="sd-concf" />
      <rect x="300" y="378" width="160" height="22" fill={`url(#${P}-conc)`} />
      <rect x="300" y="378" width="160" height="22" className="sd-n1" fill="none" />
      <rect x="304" y="372" width="152" height="6" className="sd-wf" />

      {/* delivery: tangential discharge up, then check valve → gate valve → meter → gauge → header → network */}
      <Pipe d={`M${PX + 14} ${PY - 14} V250 H640`} w={14} />
      <Water d={`M${PX + 14} ${PY - 14} V250 H640`} flow="fa-run" />
      <path className="sd-wc" d="M626 262 H638" strokeWidth={2} markerEnd={`url(#${P}-fa)`} />
      <text x="596" y="282" textAnchor="end">{t.network}</text>

      {/* suction gate valve */}
      <GateValve x={305} y={PY} />
      {/* pump: volute + impeller (turns counter-clockwise, discharge tangential at the top right) */}
      <g>
        <path className="sd-n" d={`M${PX - 12} 370 H${PX + 12} M${PX - 8} 370 V372 M${PX + 8} 370 V372`} />
        <circle cx={PX} cy={PY} r="20" className="sd-wf" />
        <g className="fa-imp">
          <circle cx={PX} cy={PY} r="13" className="sd-imp" />
          <path className="sd-imp" d={`M${PX} ${PY - 3} Q${PX + 6} ${PY - 6} ${PX + 9} ${PY - 10} M${PX + 3} ${PY} Q${PX + 6} ${PY + 6} ${PX + 10} ${PY + 9} M${PX} ${PY + 3} Q${PX - 6} ${PY + 6} ${PX - 9} ${PY + 10} M${PX - 3} ${PY} Q${PX - 6} ${PY - 6} ${PX - 10} ${PY - 9}`} />
        </g>
        <circle cx={PX} cy={PY} r="2.2" className="sd-nf" />
      </g>
      {/* coupling + motor */}
      <rect x="382" y="344" width="10" height="12" className="sd-wf" />
      <rect x="392" y="336" width="54" height="30" className="sd-wf" />
      <path className="sd-n1" d="M400 336 V366 M408 336 V366 M416 336 V366 M424 336 V366 M432 336 V366 M446 346 H452 V356 H446" />
      <path className="sd-n" d="M420 372 V366 M398 372 V366 M440 372 V366" />

      {/* check valve: disc hinged at the top, open while pumping */}
      <g className="sd-vv">
        <path d="M410 242 L430 258 V242 L410 258 Z" />
        <path className="sd-disc fa-disc" d="M418 241.5 L426.5 246" />
        <circle cx="418" cy="241.5" r="1.6" className="sd-nf" />
      </g>
      <GateValve x={468} y={250} />
      {/* flow meter: flanged spool with transmitter head */}
      <g className="sd-vv">
        <rect x="502" y="240" width="28" height="20" />
        <path className="sd-stem" d="M502 237 V263 M530 237 V263 M516 240 V230" />
        <rect x="508" y="220" width="16" height="10" />
      </g>
      {/* pressure gauge with needle */}
      <g>
        <path className="sd-n" d="M562 243 V229" />
        <circle cx="562" cy="219" r="10" className="sd-wf" />
        <g className="fa-ndl">
          <circle cx="562" cy="219" r="7" className="sd-none" />
          <path className="sd-ndl" d="M562 219 L567 213" />
        </g>
        <circle cx="562" cy="219" r="1.5" className="sd-nf" />
      </g>

      {/* balloons */}
      <path className="sd-b" d="M157 140 L170 132" />
      <Balloon x={180} y={128} n={1} />
      <path className="sd-b" d="M12 352 V346" />
      <Balloon x={12} y={334} n={2} />
      <path className="sd-b" d="M305 333 V320" />
      <Balloon x={305} y={308} n={3} />
      <path className="sd-b" d="M468 234 V218" />
      <Balloon x={468} y={206} n={3} />
      <path className="sd-b" d="M346 336 L338 318" />
      <Balloon x={334} y={306} n={4} />
      <path className="sd-b" d="M432 336 L438 318" />
      <Balloon x={442} y={306} n={5} />
      <path className="sd-b" d="M420 241 V218" />
      <Balloon x={420} y={206} n={6} />
      <path className="sd-b" d="M516 220 V218" />
      <Balloon x={516} y={206} n={7} />
      <path className="sd-b" d="M570 211 L580 202" />
      <Balloon x={588} y={194} n={8} />

      {/* legend */}
      <path className="sd-sep" d="M20 438 H620" />
      {legend.map(([n, s], i) => {
        const x = i < 4 ? 20 : 330;
        const y = 462 + (i % 4) * 22;
        return (
          <g key={n}>
            <Balloon x={x + 10} y={y - 5} n={n} />
            <Txt x={x + 28} y={y}>{s}</Txt>
          </g>
        );
      })}
    </svg>
  );
}

/** Reinforced-concrete members: grey fill + stipple per member, one outline. */
function Concrete({ rects, outline }: { rects: [number, number, number, number][]; outline: string }) {
  return (
    <g>
      {rects.map(([x, y, w, h]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width={w} height={h} className="sd-concf" />
          <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-conc)`} />
        </g>
      ))}
      <path className="sd-n" d={outline} />
    </g>
  );
}
