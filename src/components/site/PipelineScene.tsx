/**
 * "The Delivery Line" — NetraSoft's signature diagram.
 *
 * Four podiums climb from left to right: scope, build, test, ship. Work packets
 * ride the rails between them, the build station writes code, the test station
 * goes green, and the finished release lifts off the launch pad.
 *
 * Every podium is the shared `Slab` primitive from ./iso. All motion is CSS, so
 * prefers-reduced-motion switches the whole thing off.
 */

import { FLAT, IsoDefs, Slab, STROKE, type Tone } from "./iso";

/* Bottom of every podium, so the staircase stands on one ground line */
const FLOOR = 660;

type Station = {
  key: string;
  name: string;
  cx: number;
  cy: number;
  hw: number;
  hh: number;
  label: string;
  /* callout box */
  bx: number;
  by: number;
  bw: number;
};

const STATIONS: Station[] = [
  { key: "scope", name: "scope", cx: 175, cy: 555, hw: 112, hh: 56, label: "Scope & Spec", bx: 40, by: 376, bw: 194 },
  { key: "build", name: "build", cx: 460, cy: 507, hw: 112, hh: 56, label: "Build In The Open", bx: 330, by: 316, bw: 226 },
  { key: "test", name: "test", cx: 745, cy: 459, hw: 112, hh: 56, label: "Test & Harden", bx: 622, by: 256, bw: 202 },
  { key: "ship", name: "ship", cx: 1030, cy: 411, hw: 118, hh: 59, label: "Ship & Hand Over", bx: 900, by: 188, bw: 218 },
];

/* Name printed flat on a podium's top face */
function Engraved({ cx, cy, hw, hh, children }: { cx: number; cy: number; hw: number; hh: number; children: string }) {
  return (
    /* Reads down-right from just inside the left vertex, so the whole word
       stays on the diamond instead of running off the front edge. */
    <text
      transform={`${FLAT} ${cx - hw * 0.62} ${cy - hh * 0.02})`}
      fontFamily="var(--font-mono-display), ui-monospace, monospace"
      fontSize="17"
      letterSpacing="1"
      fill="#1b1b1d"
      fillOpacity="0.5"
    >
      {children}
    </text>
  );
}

function Callout({ x, y, w, n, label, delay }: { x: number; y: number; w: number; n: number; label: string; delay: number }) {
  return (
    <g className="anim-drop" style={{ animationDelay: `${delay}ms` }}>
      <rect x={x + 3} y={y - 36} width="36" height="36" fill="#1b1b1d" opacity="0.16" />
      <rect x={x} y={y - 40} width="36" height="36" fill="#17181a" />
      <text
        x={x + 18}
        y={y - 16}
        textAnchor="middle"
        fontFamily="var(--font-mono-display), ui-monospace, monospace"
        fontSize="15"
        fontWeight="500"
        fill="#ffffff"
      >
        {n}
      </text>

      <rect x={x + 3} y={y + 4} width={w} height="40" fill="#1b1b1d" opacity="0.16" />
      <rect x={x} y={y} width={w} height="40" fill="#ffffff" stroke={STROKE} strokeWidth="1.1" />
      <text
        x={x + 15}
        y={y + 26}
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="16"
        fill="#17181a"
        letterSpacing="-0.1"
      >
        {label}
      </text>
    </g>
  );
}

/* A cube of work riding a rail from one station to the next */
function Packet({ x, y, dx, dy, delay, dur, tone = "brand" }: { x: number; y: number; dx: number; dy: number; delay: number; dur: number; tone?: Tone }) {
  return (
    <g
      className="anim-packet"
      style={{
        ["--dx" as string]: `${dx}px`,
        ["--dy" as string]: `${dy}px`,
        ["--dur" as string]: `${dur}s`,
        animationDelay: `${delay}ms`,
      }}
    >
      <Slab cx={x} cy={y} hw={15} hh={7.5} t={11} tone={tone} />
    </g>
  );
}

/* Loose geometry scattered across the ground */
const DEBRIS: { cx: number; cy: number; hw: number; tone?: Tone }[] = [
  { cx: 92, cy: 742, hw: 20 },
  { cx: 168, cy: 786, hw: 16 },
  { cx: 322, cy: 726, hw: 18 },
  { cx: 610, cy: 774, hw: 20 },
  { cx: 676, cy: 736, hw: 15 },
  { cx: 892, cy: 766, hw: 18 },
  { cx: 1148, cy: 706, hw: 16 },
  { cx: 1186, cy: 762, hw: 20, tone: "dark" },
  { cx: 44, cy: 690, hw: 15 },
];

export default function PipelineScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 120 1240 720"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An isometric delivery line: four podiums climbing left to right — scope, build, test and ship — with work packets moving along the rails between them and a finished release lifting off the launch pad."
    >
      <IsoDefs />

      {/* ---------- ground ---------- */}
      <g stroke={STROKE} strokeOpacity="0.07" strokeWidth="1.1" fill="none">
        <path d="M620 560 L1180 840 L620 1120 L60 840Z" />
        <path d="M300 700 L560 830 L300 960 L40 830Z" />
        <path d="M960 690 L1220 820 L960 950 L700 820Z" />
      </g>
      <path d="M300 700 L560 830 L300 960 L40 830Z" fill="url(#hatch-ground)" stroke="none" />

      {/* shadow pooled under each podium */}
      {STATIONS.map((s) => (
        <ellipse
          key={`sh-${s.key}`}
          cx={s.cx}
          cy={FLOOR + 16}
          rx={s.hw * 0.92}
          ry={s.hh * 0.4}
          fill="#17181a"
          opacity="0.055"
        />
      ))}

      {/* ---------- rails between the podiums ---------- */}
      <g fill="none" stroke={STROKE} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round">
        <path className="rail-flow" d="M287 555 C 312 551, 326 512, 348 507" />
        <path className="rail-flow" d="M572 507 C 597 503, 611 464, 633 459" />
        <path className="rail-flow" d="M857 459 C 882 455, 890 416, 912 411" />
      </g>

      {/* ---------- podiums ---------- */}
      {STATIONS.map((s, i) => (
        <g key={s.key} className="anim-drop" style={{ animationDelay: `${i * 130}ms` }}>
          <Slab cx={s.cx} cy={s.cy} hw={s.hw} hh={s.hh} t={FLOOR - s.cy - s.hh} hatch />
          <Engraved cx={s.cx} cy={s.cy} hw={s.hw} hh={s.hh}>
            {s.name}
          </Engraved>
        </g>
      ))}

      {/* ---------- 01 · scope: a wireframe plate ---------- */}
      <g className="anim-drop" style={{ animationDelay: "420ms" }}>
        <Slab cx={175} cy={533} hw={76} hh={38} t={11} />
        <g stroke={STROKE} strokeOpacity="0.45" strokeWidth="1.2" fill="none">
          <path d="M175 511 L219 533 L175 555 L131 533Z" />
        </g>
        {/* wireframe blocks laid flat on the plate */}
        <g fill="#17181a" fillOpacity="0.16">
          <path d="M152 528 L172 538 L162 543 L142 533Z" />
          <path d="M176 516 L200 528 L190 533 L166 521Z" />
          <path d="M166 540 L186 550 L176 555 L156 545Z" />
        </g>
        <path d="M186 524 L206 534 L196 539 L176 529Z" fill="#0060fc" fillOpacity="0.75" />
      </g>

      {/* ---------- 02 · build: code writing itself ---------- */}
      <g className="anim-drop" style={{ animationDelay: "540ms" }}>
        <Slab cx={460} cy={483} hw={80} hh={40} t={14} tone="dark" />
        {/* lines of code, each growing on its own cycle */}
        <g>
          {[
            { x: 432, y: 474, w: 46, c: "#ffffff", o: 0.65, d: 0 },
            { x: 444, y: 481, w: 34, c: "#4d8dff", o: 0.95, d: 400 },
            { x: 456, y: 488, w: 40, c: "#ffffff", o: 0.4, d: 800 },
            { x: 468, y: 495, w: 28, c: "#ffffff", o: 0.55, d: 1200 },
          ].map((l) => (
            <rect
              key={l.d}
              x={l.x}
              y={l.y}
              width={l.w}
              height="3.4"
              rx="1.7"
              fill={l.c}
              fillOpacity={l.o}
              className="anim-code"
              style={{ animationDelay: `${l.d}ms`, transform: "skewY(26.57deg)", transformOrigin: `${l.x}px ${l.y}px` }}
            />
          ))}
        </g>
      </g>

      {/* ---------- 03 · test: the suite going green ---------- */}
      <g className="anim-drop" style={{ animationDelay: "660ms" }}>
        <Slab cx={745} cy={435} hw={80} hh={40} t={14} />
        <g>
          {[0, 1, 2].map((i) => {
            const x = 716 + i * 12;
            const y = 429 + i * 6;
            return (
              <g key={i} className="anim-tick" style={{ animationDelay: `${i * 520}ms` }}>
                <path
                  d={`M${x} ${y} L${x + 15} ${y + 7.5} L${x + 7} ${y + 11.5} L${x - 8} ${y + 4}Z`}
                  fill="#2fa84f"
                  fillOpacity="0.85"
                />
                <path
                  d={`M${x + 24} ${y + 4} L${x + 46} ${y + 15} L${x + 38} ${y + 19} L${x + 16} ${y + 8}Z`}
                  fill="#17181a"
                  fillOpacity="0.14"
                />
              </g>
            );
          })}
        </g>
      </g>

      {/* ---------- 04 · ship: the release leaving the pad ---------- */}
      <g className="anim-drop" style={{ animationDelay: "780ms" }}>
        {/* pad */}
        <Slab cx={1030} cy={389} hw={72} hh={36} t={10} />
        {/* deploy rings */}
        <g fill="none" stroke="#0060fc" strokeWidth="1.6">
          <ellipse cx="1030" cy="386" rx="46" ry="23" className="anim-ring" />
          <ellipse cx="1030" cy="386" rx="46" ry="23" className="anim-ring" style={{ animationDelay: "1400ms" }} />
        </g>
        {/* exhaust */}
        <path
          d="M1010 372 L1050 372 L1038 330 L1022 330Z"
          fill="#0060fc"
          fillOpacity="0.16"
          className="anim-beam"
        />
        {/* the release itself */}
        <g className="anim-lift">
          <Slab cx={1030} cy={322} hw={40} hh={20} t={32} tone="brand" />
          <g fill="#ffffff" fillOpacity="0.92">
            <path d="M1011 334l8 4.6v8l-8-4.6Z" />
            <path d="M1025 342l6 3.4v8l-6-3.4Z" />
          </g>
        </g>
      </g>

      {/* ---------- work packets on the rails ---------- */}
      <Packet x={287} y={551} dx={61} dy={-48} delay={0} dur={3.4} />
      <Packet x={287} y={551} dx={61} dy={-48} delay={1700} dur={3.4} tone="dark" />
      <Packet x={572} y={503} dx={61} dy={-48} delay={600} dur={3.4} />
      <Packet x={572} y={503} dx={61} dy={-48} delay={2300} dur={3.4} tone="dark" />
      <Packet x={857} y={455} dx={55} dy={-44} delay={1200} dur={3.4} />

      {/* ---------- live pips on each podium ---------- */}
      {STATIONS.map((s, i) => (
        <circle
          key={`pip-${s.key}`}
          cx={s.cx + s.hw - 18}
          cy={s.cy - 2}
          r="5"
          fill={i === 3 ? "#0060fc" : "#2fa84f"}
          stroke={STROKE}
          strokeWidth="1"
          className="anim-tick"
          style={{ animationDelay: `${i * 380}ms` }}
        />
      ))}

      {/* ---------- scattered geometry ---------- */}
      {DEBRIS.map((d, i) => (
        <g key={`d-${d.cx}`} className={i % 2 ? "anim-float" : "anim-float-2"} style={{ animationDelay: `${i * 220}ms` }}>
          <Slab cx={d.cx} cy={d.cy} hw={d.hw} hh={d.hw / 2} t={d.hw * 0.42} tone={d.tone ?? "light"} />
        </g>
      ))}

      {/* ---------- annotations ---------- */}
      <g fill="none" stroke={STROKE} strokeOpacity="0.55" strokeWidth="1.3" strokeDasharray="5 5" strokeLinecap="round">
        <path d="M138 420 C 146 452, 160 472, 172 502" />
        <path d="M430 360 C 438 396, 450 420, 458 452" />
        <path d="M720 300 C 728 340, 738 366, 744 404" />
        <path d="M1006 232 C 1014 262, 1024 276, 1029 288" />
      </g>
      {STATIONS.map((s, i) => (
        <Callout key={`c-${s.key}`} x={s.bx} y={s.by} w={s.bw} n={i + 1} label={s.label} delay={900 + i * 120} />
      ))}
    </svg>
  );
}
