/**
 * The isometric primitive the whole site draws with.
 *
 * Everything sits on a 2:1 dimetric projection: a slab is a diamond top face
 * plus two extruded side faces, given by the centre of its top face (cx, cy),
 * a horizontal radius (hw), a vertical radius (hh) and a thickness (t).
 */

export const TONES = {
  light: { top: "#ffffff", left: "#e9e9e5", right: "#f5f5f2" },
  dark: { top: "#1c1d20", left: "#0b0b0c", right: "#26282c" },
  orange: { top: "#fa7440", left: "#cd3c09", right: "#ee5119" },
} as const;

export type Tone = keyof typeof TONES;

export const STROKE = "#1b1b1d";

/** Text lying flat on a top face, reading along the down-right iso axis. */
export const FLAT = "matrix(0.894 0.447 -0.894 0.447";

/** Screen position of a lattice cell, `s` units apart, around (cx, cy). */
export function place(cx: number, cy: number, u: number, v: number, s: number) {
  return [cx + (u - v) * s, cy + (u + v) * (s / 2)] as const;
}

export type SlabProps = {
  cx: number;
  cy: number;
  hw: number;
  hh: number;
  t: number;
  tone?: Tone;
  hatch?: boolean;
};

export function Slab({ cx, cy, hw, hh, t, tone = "light", hatch = false }: SlabProps) {
  const c = TONES[tone];
  const top = `M${cx} ${cy - hh}L${cx + hw} ${cy}L${cx} ${cy + hh}L${cx - hw} ${cy}Z`;
  const left = `M${cx - hw} ${cy}L${cx} ${cy + hh}L${cx} ${cy + hh + t}L${cx - hw} ${cy + t}Z`;
  const right = `M${cx + hw} ${cy}L${cx} ${cy + hh}L${cx} ${cy + hh + t}L${cx + hw} ${cy + t}Z`;

  return (
    <g stroke={STROKE} strokeWidth="1.2" strokeLinejoin="round">
      <path d={left} fill={c.left} />
      <path d={right} fill={c.right} />
      {hatch ? (
        <>
          <path d={left} fill="url(#hatch-side)" stroke="none" />
          <path d={right} fill="url(#hatch-side)" stroke="none" />
        </>
      ) : null}
      <path d={top} fill={c.top} />
    </g>
  );
}

/** The hatch patterns the slabs and ground planes reference by id. */
export function IsoDefs() {
  return (
    <defs>
      <pattern
        id="hatch-side"
        width="7"
        height="7"
        patternTransform="rotate(-45)"
        patternUnits="userSpaceOnUse"
      >
        <line x1="0" y1="0" x2="0" y2="7" stroke={STROKE} strokeOpacity="0.16" strokeWidth="1" />
      </pattern>
      <pattern
        id="hatch-ground"
        width="9"
        height="9"
        patternTransform="rotate(-45)"
        patternUnits="userSpaceOnUse"
      >
        <line x1="0" y1="0" x2="0" y2="9" stroke={STROKE} strokeOpacity="0.1" strokeWidth="1" />
      </pattern>
      <pattern
        id="hatch-chip"
        width="5"
        height="5"
        patternTransform="rotate(-45)"
        patternUnits="userSpaceOnUse"
      >
        <line x1="0" y1="0" x2="0" y2="5" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
      </pattern>
    </defs>
  );
}
