import Image from "next/image";
import { Reveal } from "./motion";
import {
  Agriculture,
  Education,
  Energy,
  Fintech,
  Healthcare,
  Logistics,
  PublicSector,
  RealEstate,
  Retail,
  Saas,
} from "./sector-icons";

/**
 * Partners, platforms and institutions we work with.
 *
 * The source files carry different amounts of built-in padding, so each logo
 * gets its own height rather than a shared one — that is what makes the row
 * read as optically even instead of mathematically equal.
 */
const partners = [
  { src: "/partners/ndpc.webp", alt: "Nigeria Data Protection Commission", w: 2560, h: 1440, box: "h-[76px]" },
  { src: "/partners/google-workspace.png", alt: "Google Workspace", w: 738, h: 369, box: "h-[42px]" },
  { src: "/partners/digitalocean.png", alt: "DigitalOcean", w: 795, h: 385, box: "h-[46px]" },
  // ships on a #f7f7f7 plate — the brightness lift clips it to pure white so
  // mix-blend-multiply can drop it, without visibly touching the dark mark
  { src: "/partners/cloud-clusters.webp", alt: "Cloud Clusters", w: 1088, h: 1000, box: "h-[68px] brightness-[1.06]" },
  { src: "/partners/primeguage.png", alt: "Primeguage", w: 410, h: 123, box: "h-[40px]" },
];

const sectors = [
  { label: "Fintech", Icon: Fintech },
  { label: "Healthcare", Icon: Healthcare },
  { label: "Logistics", Icon: Logistics },
  { label: "Energy", Icon: Energy },
  { label: "Education", Icon: Education },
  { label: "Public Sector", Icon: PublicSector },
  { label: "Retail & E-commerce", Icon: Retail },
  { label: "Real Estate", Icon: RealEstate },
  { label: "SaaS Platforms", Icon: Saas },
  { label: "Agriculture", Icon: Agriculture },
];

function SectorRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={ariaHidden || undefined}
    >
      {sectors.map(({ label, Icon }) => (
        <li
          key={label}
          className="group flex items-center gap-3.5 whitespace-nowrap text-[19px] tracking-[-0.01em] text-[#a8a8a2] transition-colors duration-300 hover:text-brand"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line bg-[#fbfbf9] text-[#b6b6b0] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand/35 group-hover:bg-brand-soft group-hover:text-brand">
            <Icon className="h-7 w-7" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}

export default function LogoStrip() {
  return (
    <section aria-label="Partners and sectors" className="relative border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-12">
        <Reveal>
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-dim">
            Partners, platforms and institutions we work with
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((p, i) => (
            <Reveal key={p.src} delay={i * 80} variant="scale-in">
              <div className="flex items-center justify-center">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  /* mix-blend-multiply drops the white/near-white plates these
                     files ship with straight into the white strip */
                  className={`${p.box} w-auto max-w-full object-contain opacity-70 mix-blend-multiply grayscale transition-all duration-500 hover:scale-105 hover:opacity-100 hover:grayscale-0`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* sectors we build for, drifting past underneath */}
      <div className="mt-12 border-t border-line pt-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-dim">
            Shipping production software for teams in
          </p>
        </div>
        <div className="fade-x relative mt-5 overflow-hidden pb-12">
          <div className="anim-marquee flex w-max">
            <SectorRow />
            <SectorRow ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
