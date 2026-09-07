import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import About from "@/components/site/About";
import CtaSection from "@/components/site/CtaSection";
import Footer from "@/components/site/Footer";
import Eyebrow from "@/components/site/Eyebrow";
import LogoStrip from "@/components/site/LogoStrip";
import { CountUp, Reveal, Spotlight } from "@/components/site/motion";
import { Bolt, Handover, Shield, Target } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "About — NetraSoft Solutions",
  description:
    "The software development studio behind the web, mobile and cloud systems our clients run on — how we scope, build, test and hand over.",
};

const stats = [
  { to: 40, suffix: "+", label: "Products shipped" },
  { to: 9, suffix: " yrs", label: "Building software" },
  { to: 96, suffix: "%", label: "Delivered on date" },
  { to: 82, suffix: "%", label: "Clients who return" },
];

const beliefs = [
  {
    Icon: Target,
    title: "Scope before code",
    body: "Most overruns are not engineering failures — they are agreement failures. We write down what ships before anyone opens an editor.",
  },
  {
    Icon: Bolt,
    title: "Working software weekly",
    body: "A demo you can click beats a status report you have to believe. Every Friday, the real thing, in staging.",
  },
  {
    Icon: Shield,
    title: "Build it to be inherited",
    body: "Tests, documentation and a mainstream stack. If your next engineer cannot pick it up in a week, we built it wrong.",
  },
  {
    Icon: Handover,
    title: "Ownership is not a favour",
    body: "Repo, cloud accounts and pipelines are yours from the first commit. Leaving us should never mean losing anything.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader active="About" />

      {/* Page hero */}
      <Spotlight>
        <section className="relative isolate overflow-hidden border-b border-line">
          <div className="blueprint fade-bottom pointer-events-none absolute inset-0" aria-hidden />
          <div className="spotlight pointer-events-none absolute inset-0" aria-hidden />

          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pb-20 sm:pt-20">
            <Reveal>
              <Eyebrow>About NetraSoft</Eyebrow>
              <h1 className="display mt-7 max-w-3xl text-[38px] leading-[1.08] text-ink sm:text-[52px] lg:text-[60px]">
                We build software
                <br /> that has to <em>keep working</em>
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.75] text-[#5c5c5e]">
                NetraSoft Solutions is a software development studio. Our work is
                the unglamorous kind — the systems a business logs into every
                morning, still running years after launch.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="display text-[36px] leading-none text-brand">
                      <CountUp to={s.to} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-2 font-mono text-[10px] uppercase leading-tight tracking-[0.13em] text-muted-dim">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
      </Spotlight>

      <About />

      {/* What we believe */}
      <section className="relative border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow center>What we believe</Eyebrow>
              <h2 className="display mt-6 text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
                Four rules we do
                <br /> <em>not</em> bend
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {beliefs.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="group h-full bg-white p-8 transition-colors duration-300 hover:bg-[#fdfaf8]">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-[#faf9f7] text-ink transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand-soft group-hover:text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold text-ink">{title}</h3>
                  <p className="mt-2.5 text-[15px] leading-[1.7] text-[#5c5c5e]">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LogoStrip />
      <CtaSection />
      <Footer />
    </div>
  );
}
