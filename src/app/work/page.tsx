import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import Work from "@/components/site/Work";
import Growth from "@/components/site/Growth";
import Tools from "@/components/site/Tools";
import CtaSection from "@/components/site/CtaSection";
import Footer from "@/components/site/Footer";
import Eyebrow from "@/components/site/Eyebrow";
import { CountUp, Reveal, Spotlight } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Our Work — NetraSoft Solutions",
  description:
    "Web, mobile and cloud systems we designed, built and still maintain — described by sector, outcome and the stack behind them.",
};

const stats = [
  { to: 40, suffix: "+", label: "Products shipped" },
  { to: 128, suffix: "", label: "Releases last year" },
  { to: 8, suffix: "", label: "Sectors served" },
  { to: 99.9, suffix: "%", decimals: 1, label: "Uptime held" },
];

const sectors = [
  "Fintech",
  "Healthcare",
  "Logistics",
  "Public sector",
  "Education",
  "Retail & e-commerce",
  "Energy",
  "SaaS platforms",
];

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader active="Work" />

      <Spotlight>
        <section className="relative isolate overflow-hidden border-b border-line">
          <div className="blueprint fade-bottom pointer-events-none absolute inset-0" aria-hidden />
          <div className="spotlight pointer-events-none absolute inset-0" aria-hidden />

          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pb-20 sm:pt-20">
            <Reveal>
              <Eyebrow>Our work</Eyebrow>
              <h1 className="display mt-7 max-w-3xl text-[38px] leading-[1.08] text-ink sm:text-[52px] lg:text-[60px]">
                Software that went live
                <br /> and <em>stayed</em> live
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.75] text-[#5c5c5e]">
                A selection of builds, described by sector and outcome. We name
                clients only where they have agreed to be named — ask on a call
                and we will walk you through the ones we can show.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10 flex flex-wrap gap-2">
                {sectors.map((s, i) => (
                  <span
                    key={s}
                    className="anim-drop rounded-full border border-line bg-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#57575a]"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220}>
              <dl className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="display text-[36px] leading-none text-brand">
                      <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
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

      <Work />
      <Growth />
      <Tools />
      <CtaSection />
      <Footer />
    </div>
  );
}
