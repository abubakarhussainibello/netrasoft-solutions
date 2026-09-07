import type { SVGProps } from "react";

/**
 * One mark per sector in the marquee. Same line weight and 24px grid as
 * ./icons, so they sit alongside the rest of the site's illustration.
 */

type P = SVGProps<SVGSVGElement>;

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* Payment card */
export function Fintech(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6 14.5h3.5" />
    </svg>
  );
}

/* Heart with a trace running through it */
export function Healthcare(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M12 20.4S4.6 15.9 4.6 10.9A3.9 3.9 0 0 1 12 8.7a3.9 3.9 0 0 1 7.4 2.2c0 5-7.4 9.5-7.4 9.5Z" />
      <path d="M7.4 12.3h2.2l1.3-2.2 1.7 3.7 1.2-1.5h2.7" />
    </svg>
  );
}

/* Delivery truck */
export function Logistics(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M2.5 6.5h10.5v9.5H2.5z" />
      <path d="M13 10h3.9l3.6 3.6V16H13z" />
      <circle cx="6.8" cy="18" r="1.8" />
      <circle cx="16.4" cy="18" r="1.8" />
    </svg>
  );
}

/* Bolt */
export function Energy(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M13.4 2.5 5 13.2h6.2l-1 8.3 8.4-10.7h-6.2z" />
    </svg>
  );
}

/* Mortarboard */
export function Education(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M12 4.2 2.6 8.9 12 13.6l9.4-4.7z" />
      <path d="M6.4 11.3v4.4c0 1.4 2.5 2.5 5.6 2.5s5.6-1.1 5.6-2.5v-4.4" />
      <path d="M21.4 8.9v5" />
    </svg>
  );
}

/* Institutional building */
export function PublicSector(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M2.8 9.4 12 4l9.2 5.4" />
      <path d="M5.2 10.4v7.4M9.7 10.4v7.4M14.3 10.4v7.4M18.8 10.4v7.4" />
      <path d="M3 20h18" />
    </svg>
  );
}

/* Shopping bag */
export function Retail(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M4.6 7.6h14.8l-1.1 12.8H5.7z" />
      <path d="M9 7.6V6.2a3 3 0 0 1 6 0v1.4" />
    </svg>
  );
}

/* House */
export function RealEstate(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M3.6 20V9.6L12 3.8l8.4 5.8V20" />
      <path d="M2.6 20h18.8" />
      <path d="M9.7 20v-5.2h4.6V20" />
    </svg>
  );
}

/* Application window */
export function Saas(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M2.5 9h19" />
      <path d="M5.8 6.8h.01M8.3 6.8h.01" />
    </svg>
  );
}

/* Sprout */
export function Agriculture(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...s} {...p}>
      <path d="M12 20.5v-7.2" />
      <path d="M12 13.3c0-3.1 2.5-5.6 5.6-5.6 0 3.1-2.5 5.6-5.6 5.6Z" />
      <path d="M12 16c-2.9 0-5.2-2.3-5.2-5.2 2.9 0 5.2 2.3 5.2 5.2Z" />
    </svg>
  );
}
