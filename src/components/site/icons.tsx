import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowRight(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export function ChevronDown(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Plus(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Minus(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Check(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function Clock(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Eye(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

export function Layers(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M12 3l9 4.8-9 4.8-9-4.8Z" />
      <path d="M3 12.4l9 4.8 9-4.8" />
      <path d="M3 16.9l9 4.8 9-4.8" />
    </svg>
  );
}

export function Flask(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M9.5 3v6.2L4.6 17.4A2 2 0 0 0 6.3 20.5h11.4a2 2 0 0 0 1.7-3.1L14.5 9.2V3" />
      <path d="M8 3h8M7.4 14.6h9.2" />
    </svg>
  );
}

export function Blocks(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.4" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.4" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.4" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.4" />
    </svg>
  );
}

export function Signal(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8" />
      <path d="M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Shield(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M12 2.8l7.5 3v6c0 4.4-3 8.1-7.5 9.4C7.5 19.9 4.5 16.2 4.5 11.8v-6Z" />
      <path d="M9 12.2l2.2 2.2L15.4 10" />
    </svg>
  );
}

export function Users(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16.2 5.1a3.4 3.4 0 0 1 0 6.6M17.6 14.4A6.2 6.2 0 0 1 21.2 20" />
    </svg>
  );
}

export function Wallet(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <rect x="3" y="6" width="18" height="13" rx="2.4" />
      <path d="M3 10h18M16.5 14.5h1.6" />
    </svg>
  );
}

export function Bug(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <rect x="7.5" y="7.5" width="9" height="12" rx="4.5" />
      <path d="M9.4 7.5a2.6 2.6 0 0 1 5.2 0M3.6 11h3.9M16.5 11h3.9M3.6 17h3.9M16.5 17h3.9M12 7.5v12" />
    </svg>
  );
}

export function Bolt(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M13.2 2.5L4.8 13.4h6L10 21.5l9-11.1h-6.2Z" />
    </svg>
  );
}

export function Target(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Handover(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M3 11.5h5l2.4 2.6a2 2 0 0 0 2.9 0L21 6.6" />
      <path d="M17.6 6.6H21v3.4M3 16.6h4.4l2.2 2.3" />
    </svg>
  );
}

export function Cloud(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M7.4 18.5a4.4 4.4 0 0 1-.5-8.8 5.6 5.6 0 0 1 10.7-1 3.9 3.9 0 0 1 .3 7.7Z" />
    </svg>
  );
}

export function Terminal(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <rect x="2.8" y="4.5" width="18.4" height="15" rx="2.2" />
      <path d="M7 10l2.8 2.6L7 15.2M12.6 15.4h4.2" />
    </svg>
  );
}

export function Phone(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
      <path d="M10.6 5.4h2.8" />
    </svg>
  );
}

export function LinkedIn(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11ZM9.5 9.5h3.8v1.5a4.2 4.2 0 0 1 3.7-2c3 0 4 1.9 4 5v6.5h-4V15c0-1.6-.6-2.6-2-2.6s-2.2 1-2.2 2.6v5.5H9.5v-11Z" />
    </svg>
  );
}

export function Star(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2.6l2.7 5.9 6.4.7-4.8 4.3 1.3 6.3L12 16.6 6.4 19.8l1.3-6.3L2.9 9.2l6.4-.7z" />
    </svg>
  );
}

/* The scatter glyph that trails the primary CTA */
export function Scatter(p: P) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" {...p}>
      <rect x="0" y="1" width="2" height="2" />
      <rect x="4.5" y="4.5" width="2" height="2" />
      <rect x="0" y="8" width="2" height="2" />
      <rect x="9" y="1" width="2" height="2" />
      <rect x="9" y="8" width="2" height="2" />
    </svg>
  );
}

/* Isometric brand cube — the mark in the header and footer */
export function CubeMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg viewBox="0 0 48 52" className={className} role="img" aria-label={title}>
      {title ? <title>{title}</title> : null}
      {/* top face */}
      <path d="M24 2 46 14.5 24 27 2 14.5Z" fill="#F86F38" />
      {/* left face */}
      <path d="M2 14.5 24 27v23L2 37.5Z" fill="#E04A12" />
      {/* right face */}
      <path d="M46 14.5 24 27v23l22-12.5Z" fill="#F1521C" />
      {/* window notches on the left face */}
      <path d="M8 22.5l5 2.9v5.1l-5-2.9Z" fill="#fff" fillOpacity="0.9" />
      <path d="M16 27.1l4 2.3v5.1l-4-2.3Z" fill="#fff" fillOpacity="0.9" />
    </svg>
  );
}
