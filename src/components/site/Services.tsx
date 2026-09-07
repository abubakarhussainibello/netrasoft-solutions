import Eyebrow from "./Eyebrow";
import { Reveal } from "./motion";
import {
  ArrowUpRight,
  Blocks,
  Bolt,
  Cloud,
  Layers,
  Phone,
  Shield,
  Terminal,
  Users,
} from "./icons";

const services = [
  {
    Icon: Blocks,
    title: "Custom Web Applications",
    body: "Dashboards, portals, marketplaces and internal tools — built on a stack your next engineer will recognise.",
  },
  {
    Icon: Phone,
    title: "Mobile Apps",
    body: "iOS and Android from one codebase, with the release pipeline and store submissions handled.",
  },
  {
    Icon: Cloud,
    title: "Cloud & DevOps",
    body: "Provisioning, CI/CD, monitoring and backups on infrastructure that stays in your accounts.",
  },
  {
    Icon: Layers,
    title: "Systems Integration",
    body: "APIs, payment rails, ERPs and legacy databases talking to each other without manual re-entry.",
  },
  {
    Icon: Bolt,
    title: "AI & Automation",
    body: "Document processing, assistants and workflow automation wired into the systems you already run.",
  },
  {
    Icon: Terminal,
    title: "Product & UI/UX Design",
    body: "Research, flows and interface design, delivered as a build-ready system rather than a pretty picture.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>What we build</Eyebrow>
            <h2 className="display mt-6 text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
              Everything between the idea
              <br /> and the <em>running system</em>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-[#5c5c5e]">
              One team for design, engineering and the infrastructure underneath —
              so nothing falls through the gap between vendors.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="group relative h-full overflow-hidden bg-white p-7 transition-colors duration-300 hover:bg-[#fdfaf8]">
                {/* accent rail that grows in on hover */}
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />

                <div className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-[#faf9f7] text-ink transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-brand/40 group-hover:bg-brand-soft group-hover:text-brand">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-[17px] font-semibold text-ink">{title}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-[#5c5c5e]">{body}</p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-dim transition-colors duration-300 group-hover:text-brand">
                  Start here
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Retainer strip */}
        <Reveal delay={120}>
          <div className="panel mt-6 flex flex-col gap-6 rounded-2xl p-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand/25 bg-brand-soft text-brand">
                <Shield className="h-5 w-5" />
              </div>
              <div className="max-w-xl">
                <h3 className="text-[17px] font-semibold text-ink">
                  Maintenance &amp; dedicated teams
                </h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-[#5c5c5e]">
                  Launch is the start of the work, not the end of it. Keep the
                  same engineers on a monthly retainer, or embed them in your team
                  full-time.
                </p>
              </div>
            </div>
            <a
              href="#start"
              className="btn-outline inline-flex shrink-0 items-center justify-center gap-2 rounded-[12px] px-5 py-3 text-[15px] font-medium"
            >
              <Users className="h-4 w-4" />
              Talk about a team
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
