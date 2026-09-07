/**
 * The isometric scenes that carry the hero's language into the rest of the page.
 *
 * All of them build on the shared `Slab` primitive from ./iso and animate with
 * the CSS keyframes in globals.css, so prefers-reduced-motion switches the whole
 * set to a still image.
 *
 * Note on ids: IsoDefs declares the hatch patterns each scene references. When
 * several scenes render on one page the ids repeat, and every reference resolves
 * to the first identical definition — which is exactly the intended fill.
 */

import { FLAT, IsoDefs, Slab, STROKE, type Tone } from "./iso";

/* Name set flat on a top face */
function Engraved({
  cx,
  cy,
  hw,
  hh,
  size = 16,
  dx = -0.6,
  dy = -0.02,
  light = false,
  children,
}: {
  cx: number;
  cy: number;
  hw: number;
  hh: number;
  size?: number;
  /* fractions of hw/hh — nudge the baseline clear of whatever sits on the slab */
  dx?: number;
  dy?: number;
  light?: boolean;
  children: string;
}) {
  return (
    <text
      transform={`${FLAT} ${cx + hw * dx} ${cy + hh * dy})`}
      fontFamily="var(--font-mono-display), ui-monospace, monospace"
      fontSize={size}
      letterSpacing="1"
      fill={light ? "#ffffff" : "#1b1b1d"}
      fillOpacity={light ? 0.7 : 0.55}
    >
      {children}
    </text>
  );
}

/* ==========================================================================
   The sprint loop — plan, build, review, ship, repeating every week
   ========================================================================== */

const LOOP_PATH = "M600 148 L864 280 L600 412 L336 280 Z";

const LOOP_STATIONS = [
  { key: "plan", label: "plan", cx: 600, cy: 148, tone: "light" as Tone },
  { key: "build", label: "build", cx: 864, cy: 280, tone: "dark" as Tone },
  { key: "review", label: "review", cx: 600, cy: 412, tone: "light" as Tone },
  { key: "ship", label: "ship", cx: 336, cy: 280, tone: "orange" as Tone },
];

export function IsoSprintLoop({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 60 1200 460"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An isometric loop of four stations — plan, build, review and ship — with work circulating between them each week around a central sprint platform."
    >
      <IsoDefs />

      {/* ground */}
      <g stroke={STROKE} strokeOpacity="0.07" strokeWidth="1.1" fill="none">
        <path d="M600 100 L1060 330 L600 560 L140 330Z" />
        <path d="M600 190 L900 340 L600 490 L300 340Z" />
      </g>

      {/* the loop rail */}
      <path
        className="rail-flow"
        d={LOOP_PATH}
        fill="none"
        stroke={STROKE}
        strokeOpacity="0.45"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* central sprint platform */}
      <g className="anim-drop">
        <Slab cx={600} cy={286} hw={112} hh={56} t={26} hatch />
        <Engraved cx={600} cy={286} hw={112} hh={56} size={18} dx={-0.66} dy={0.05}>
          sprint
        </Engraved>
        <g fill="none" stroke="#f1521c" strokeWidth="1.5">
          <ellipse cx="600" cy="282" rx="62" ry="31" className="anim-ring" />
          <ellipse cx="600" cy="282" rx="62" ry="31" className="anim-ring" style={{ animationDelay: "1400ms" }} />
        </g>
      </g>

      {/* the four stations */}
      {LOOP_STATIONS.map((s, i) => (
        <g key={s.key} className="anim-drop" style={{ animationDelay: `${i * 130}ms` }}>
          <Slab cx={s.cx} cy={s.cy} hw={78} hh={39} t={22} hatch />
          <Slab cx={s.cx} cy={s.cy - 16} hw={44} hh={22} t={14} tone={s.tone} />
          {/* starts left of the chip and runs down-right, staying inside the
              diamond — push dy much past 0 and the word falls off the front edge */}
          <Engraved cx={s.cx} cy={s.cy} hw={78} hh={39} size={15} dx={-0.72} dy={0.04}>
            {s.label}
          </Engraved>
          <circle
            cx={s.cx + 60}
            cy={s.cy - 2}
            r="4.5"
            fill={s.tone === "orange" ? "#f1521c" : "#2fa84f"}
            stroke={STROKE}
            strokeWidth="1"
            className="anim-tick"
            style={{ animationDelay: `${i * 400}ms` }}
          />
        </g>
      ))}

      {/* work circulating the loop */}
      {[0, 2600, 5200].map((delay, i) => (
        <g
          key={delay}
          className="anim-orbit"
          style={{
            offsetPath: `path("${LOOP_PATH}")`,
            ["--dur" as string]: "9s",
            animationDelay: `${delay}ms`,
          }}
        >
          <Slab cx={0} cy={0} hw={15} hh={7.5} t={11} tone={i === 1 ? "dark" : "orange"} />
        </g>
      ))}
    </svg>
  );
}

/* ==========================================================================
   Release cadence as an isometric column city
   ========================================================================== */

export function IsoChart({
  values,
  highlight = 3,
  className,
}: {
  values: number[];
  highlight?: number;
  className?: string;
}) {
  const step = 44;
  const startX = 80;
  const startY = 396;

  /* Columns march along the "away" axis — up and to the right — so the ground
     line and the bar heights both climb. Laid out on the down-right axis the
     ground falls faster than the values grow and a rising series reads as a
     falling one. */
  const columns = values.map((v, i) => ({
    i,
    gx: startX + i * step,
    gy: startY - i * (step / 2),
    h: 24 + (v / 100) * 110,
    hot: i >= values.length - highlight,
  }));

  const last = columns[columns.length - 1];

  return (
    <svg
      viewBox="0 0 660 440"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Isometric column chart of releases shipped over ${values.length} months, rising to the most recent three.`}
    >
      <IsoDefs />

      {/* the ground line the columns stand on */}
      <g stroke={STROKE} strokeOpacity="0.09" strokeWidth="1.1" fill="none">
        <path d={`M${startX - 46} ${startY + 23} L${last.gx + 46} ${last.gy - 23}`} />
        <path d={`M${startX - 46} ${startY + 53} L${last.gx + 46} ${last.gy + 7}`} />
      </g>

      {/* Painted far-to-near: the farthest column is the last one, up and to the
          right, so it has to go down before its nearer neighbours cover it. */}
      {columns
        .slice()
        .reverse()
        .map(({ i, gx, gy, h, hot }) => (
          <g key={i} className="anim-rise" style={{ animationDelay: `${i * 80}ms` }}>
            <ellipse cx={gx} cy={gy + 5} rx="24" ry="11" fill="#17181a" opacity="0.05" />
            <Slab
              cx={gx}
              cy={gy - h}
              hw={24}
              hh={12}
              t={h}
              tone={hot ? "orange" : "light"}
              hatch={!hot}
            />
            {hot ? (
              <circle
                cx={gx}
                cy={gy - h - 24}
                r="3.6"
                fill="#f1521c"
                className="anim-tick"
                style={{ animationDelay: `${i * 220}ms` }}
              />
            ) : null}
          </g>
        ))}
    </svg>
  );
}

/* ==========================================================================
   Handover — the keys crossing from our platform to yours
   ========================================================================== */

export function IsoHandover({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 300"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An isometric handover: repository, cloud and pipeline blocks moving from our platform onto yours."
    >
      <IsoDefs />

      <g stroke={STROKE} strokeOpacity="0.07" strokeWidth="1" fill="none">
        <path d="M240 120 L420 210 L240 300 L60 210Z" />
      </g>

      {/* our side */}
      <g className="anim-drop">
        <Slab cx={126} cy={196} hw={86} hh={43} t={26} tone="dark" />
        <Slab cx={126} cy={178} hw={40} hh={20} t={12} tone="orange" />
      </g>

      {/* your side */}
      <g className="anim-drop" style={{ animationDelay: "160ms" }}>
        <Slab cx={344} cy={172} hw={86} hh={43} t={26} hatch />
        <Engraved cx={344} cy={172} hw={86} hh={43} size={14}>
          yours
        </Engraved>
        <circle cx="404" cy="170" r="4.5" fill="#2fa84f" stroke={STROKE} strokeWidth="1" className="anim-tick" />
      </g>

      {/* the rail between them */}
      <path
        className="rail-flow"
        d="M212 192 C 250 178, 268 168, 302 160"
        fill="none"
        stroke={STROKE}
        strokeOpacity="0.5"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* assets crossing over */}
      {[0, 1100, 2200].map((delay, i) => (
        <g
          key={delay}
          className="anim-packet"
          style={{
            ["--dx" as string]: "90px",
            ["--dy" as string]: "-32px",
            ["--dur" as string]: "3.3s",
            animationDelay: `${delay}ms`,
          }}
        >
          <Slab cx={212} cy={190} hw={14} hh={7} t={10} tone={i === 1 ? "dark" : "orange"} />
        </g>
      ))}
    </svg>
  );
}

/* ==========================================================================
   Scope — the sheet stack that gets agreed before anyone writes code
   ========================================================================== */

export function IsoScopeStack({ className }: { className?: string }) {
  const sheets = [0, 1, 2, 3];

  return (
    <svg
      viewBox="0 0 480 300"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An isometric stack of scope sheets, each one ticking green as it is agreed."
    >
      <IsoDefs />

      <g stroke={STROKE} strokeOpacity="0.07" strokeWidth="1" fill="none">
        <path d="M240 150 L420 240 L240 330 L60 240Z" />
      </g>

      {/* base platform */}
      <g className="anim-drop">
        <Slab cx={240} cy={216} hw={132} hh={66} t={20} hatch />
      </g>

      {/* the agreed sheets, stacking upward */}
      {sheets.map((i) => (
        <g
          key={i}
          className="anim-drop"
          style={{ animationDelay: `${220 + i * 150}ms` }}
        >
          <Slab cx={240} cy={186 - i * 26} hw={96} hh={48} t={9} />
          {/* on the front-right edge — the sheet above only meets this face at a
              point, so every tick in the stack stays visible */}
          <path
            d={`M286 ${192 - i * 26} L300 ${199 - i * 26} L330 ${184 - i * 26} L316 ${177 - i * 26}Z`}
            fill="#2fa84f"
            fillOpacity="0.8"
            className="anim-tick"
            style={{ animationDelay: `${i * 520}ms` }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ==========================================================================
   Launch — three pads, one releasing
   ========================================================================== */

export function IsoLaunch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 300"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Three isometric launch pads with a release lifting off the centre one."
    >
      <IsoDefs />

      <g stroke={STROKE} strokeOpacity="0.07" strokeWidth="1" fill="none">
        <path d="M450 130 L800 305 L450 480 L100 305Z" />
      </g>

      {/* side pads */}
      {[
        { cx: 210, cy: 232, d: 0 },
        { cx: 690, cy: 232, d: 220 },
      ].map((p) => (
        <g key={p.cx} className="anim-drop" style={{ animationDelay: `${p.d}ms` }}>
          <Slab cx={p.cx} cy={p.cy} hw={78} hh={39} t={24} hatch />
          <Slab cx={p.cx} cy={p.cy - 14} hw={34} hh={17} t={12} />
          <circle cx={p.cx + 60} cy={p.cy - 2} r="4.5" fill="#2fa84f" stroke={STROKE} strokeWidth="1" />
        </g>
      ))}

      {/* the launching pad */}
      <g className="anim-drop" style={{ animationDelay: "120ms" }}>
        <Slab cx={450} cy={206} hw={92} hh={46} t={28} hatch />
        <g fill="none" stroke="#f1521c" strokeWidth="1.6">
          <ellipse cx="450" cy="202" rx="54" ry="27" className="anim-ring" />
          <ellipse cx="450" cy="202" rx="54" ry="27" className="anim-ring" style={{ animationDelay: "1400ms" }} />
        </g>
        <path d="M428 190 L472 190 L460 132 L440 132Z" fill="#f1521c" fillOpacity="0.16" className="anim-beam" />
        <g className="anim-lift">
          <Slab cx={450} cy={126} hw={42} hh={21} t={34} tone="orange" />
          <g fill="#ffffff" fillOpacity="0.92">
            <path d="M430 139l8 4.6v8l-8-4.6Z" />
            <path d="M444 147l6 3.4v8l-6-3.4Z" />
          </g>
        </g>
      </g>
    </svg>
  );
}
