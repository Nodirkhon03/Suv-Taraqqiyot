/**
 * One small construction drawing per service, in the line language of the home hero drawing
 * (navy structure, blue dimensions, cyan water, sand ground) set on the light drafting grid.
 * Every figure on a drawing is repeated in the text beside it, so the drawing is decorative.
 */
export type ServiceKey = "pipes" | "facilities" | "towers" | "civil" | "wells";
export interface DrawingText {
  a: string;
  b: string;
  c: string;
}

function Hatch({ id }: { id: string }) {
  return (
    <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" className="d-h" />
    </pattern>
  );
}

function Arrow({ id }: { id: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 1 L10 5 L0 9" fill="none" stroke="#2C86C7" strokeWidth="1.4" />
    </marker>
  );
}

export default function ServiceDrawing({ name, text }: { name: ServiceKey; text: DrawingText }) {
  const h = `h-${name}`;
  const ar = `a-${name}`;
  return (
    <figure className="dwg" aria-hidden="true">
      <svg viewBox="0 0 400 240">
        <defs>
          <Hatch id={h} />
          <Arrow id={ar} />
        </defs>
        {name === "pipes" && (
          <g>
            <rect x="0" y="110" width="400" height="12" fill={`url(#${h})`} />
            <path className="d-g" d="M0 110 H400" />
            {/* trench section */}
            <path className="d-n" d="M36 110 L66 206 H144 L174 110" />
            <circle className="d-n" cx="105" cy="178" r="24" />
            <circle className="d-w" cx="105" cy="178" r="17" />
            <path className="d-b" d="M129 178 H150 L162 222 H196" />
            <text x="200" y="227">{text.b}</text>
            {/* run of the main with welded joints */}
            <path className="d-n" d="M206 166 H392 M206 186 H392" />
            <path className="d-b" d="M244 160 V192 M284 160 V192 M324 160 V192 M364 160 V192" />
            <path className="d-w" d="M210 176 H388" />
            <line x1="206" y1="84" x2="392" y2="84" className="d-t" markerStart={`url(#${ar})`} markerEnd={`url(#${ar})`} />
            <path className="d-b" d="M206 76 V104 M392 76 V104" />
            <text x="299" y="70" textAnchor="middle">{text.c}</text>
            <text className="lb" x="20" y="40">{text.a}</text>
          </g>
        )}
        {name === "facilities" && (
          <g>
            <rect x="0" y="164" width="400" height="12" fill={`url(#${h})`} />
            <path className="d-g" d="M0 164 H400" />
            {/* intake */}
            <path className="d-n" d="M18 164 V112 H86 V164 M12 112 L52 84 L92 112" />
            <rect className="d-n" x="30" y="164" width="44" height="44" />
            <path className="d-b" d="M2 196 Q 14 190 26 196 T 50 196" />
            {/* reservoir */}
            <rect className="d-n" x="120" y="132" width="120" height="56" />
            <path className="d-b" d="M120 142 H240" strokeDasharray="4 4" />
            <line x1="120" y1="214" x2="240" y2="214" className="d-t" markerStart={`url(#${ar})`} markerEnd={`url(#${ar})`} />
            <text x="180" y="234" textAnchor="middle">{text.c}</text>
            {/* pump station */}
            <rect className="d-n" x="270" y="96" width="96" height="68" />
            <path className="d-n" d="M262 96 H374" />
            <circle className="d-b" cx="304" cy="140" r="13" />
            <path className="d-b" d="M297 132 L314 140 L297 148 Z" />
            {/* water line */}
            <path className="d-w" d="M8 196 H52 V176 H180 V160 H304 V140 H396" />
            <text className="lb" x="12" y="60">{text.a}</text>
            <text className="lb" x="388" y="60" textAnchor="end">{text.b}</text>
            <path className="d-b" d="M52 66 V80 M318 66 V88" />
          </g>
        )}
        {name === "towers" && (
          <g>
            <rect x="0" y="206" width="400" height="12" fill={`url(#${h})`} />
            <path className="d-g" d="M0 206 H400" />
            <path className="d-n" d="M150 92 H250 V54 Q200 34 150 54 Z" />
            <path className="d-b" d="M154 64 H246" strokeDasharray="4 4" />
            <path className="d-n" d="M172 92 L160 206 M228 92 L240 206" />
            <path className="d-b" d="M167 130 H233 M164 168 H236 M167 130 L236 168 M233 130 L164 168" />
            <path className="d-w" d="M200 204 V58" />
            <path className="d-b" d="M262 54 H286 M262 92 H286 M278 54 V92" />
            <text x="294" y="78">{text.b}</text>
            <text className="lb" x="200" y="24" textAnchor="middle">{text.a}</text>
            <text x="20" y="232">{text.c}</text>
          </g>
        )}
        {name === "civil" && (
          <g>
            <rect x="0" y="110" width="400" height="12" fill={`url(#${h})`} />
            <path className="d-g" d="M0 110 H96 M304 110 H400" />
            <path className="d-b" d="M60 110 L96 196 M340 110 L304 196" strokeDasharray="5 4" />
            <rect className="d-n" x="116" y="70" width="168" height="120" />
            <path className="d-n" d="M104 70 H296" />
            <path className="d-b" d="M132 70 V190 M268 70 V190" strokeDasharray="2 5" />
            <rect x="104" y="190" width="192" height="18" fill={`url(#${h})`} />
            <path className="d-n" d="M104 190 H296 V208 H104 Z" />
            <path className="d-w" d="M128 160 H272" />
            <text className="lb" x="200" y="50" textAnchor="middle">{text.a}</text>
            <path className="d-b" d="M296 200 H312 L322 214" />
            <text x="392" y="231" textAnchor="end">{text.b}</text>
            <path className="d-b" d="M70 136 L52 206 H16" />
            <text x="16" y="228">{text.c}</text>
          </g>
        )}
        {name === "wells" && (
          <g>
            <rect x="0" y="70" width="400" height="12" fill={`url(#${h})`} />
            <path className="d-g" d="M0 70 H400" />
            <rect className="d-n" x="178" y="42" width="44" height="28" />
            <path className="d-n" d="M188 70 V226 M212 70 V226 M188 226 H212" />
            <path className="d-b" d="M188 168 H212 M188 180 H212 M188 192 H212 M188 204 H212 M188 216 H212" />
            <path className="d-b" d="M20 128 H380" strokeDasharray="6 5" />
            <path className="d-w" d="M200 220 V48" />
            <line x1="292" y1="70" x2="292" y2="226" className="d-t" markerStart={`url(#${ar})`} markerEnd={`url(#${ar})`} />
            <path className="d-b" d="M222 226 H300" />
            <text x="304" y="154">{text.b}</text>
            <path className="d-b" d="M188 196 H150 L138 212 H118" />
            <text x="114" y="217" textAnchor="end">{text.c}</text>
            <text className="lb" x="200" y="28" textAnchor="middle">{text.a}</text>
          </g>
        )}
      </svg>
    </figure>
  );
}
