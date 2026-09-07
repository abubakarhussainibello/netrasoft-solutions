import PipelineScene from "./PipelineScene";
import BookCallButton from "./BookCall";
import { ArrowUpRight, Scatter } from "./icons";
import { CountUp, Parallax, Reveal, Spotlight, Typewriter } from "./motion";

/* Architectural rules, hatch patches and crop marks behind the hero */
function Blueprint() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="blueprint fade-bottom absolute inset-0 [background-position:calc(50%+90px)_-40px]" />
      <div className="spotlight absolute inset-0" />

      <div className="absolute inset-y-0 left-1/2 w-full max-w-6xl -translate-x-1/2">
        <div className="absolute inset-y-0 left-6 w-px bg-[rgba(17,17,17,0.07)]" />
        <div className="absolute inset-y-0 right-6 w-px bg-[rgba(17,17,17,0.07)]" />

        <div className="hatch absolute left-6 top-0 hidden h-[170px] w-[170px] border-r border-b border-[rgba(17,17,17,0.07)] lg:block" />
        <div className="absolute right-[24%] top-0 hidden h-[170px] w-[170px] border-l border-b border-[rgba(17,17,17,0.07)] xl:block" />
        <div className="dot-grid anim-drift absolute left-[210px] top-[26px] hidden h-[42px] w-[92px] lg:block" />
      </div>
    </div>
  );
}

const stats = [
  { to: 40, suffix: "+", label: "Products shipped" },
  { to: 120, suffix: "+", label: "Releases a year" },
  { to: 9, suffix: " yrs", label: "Building software" },
  { to: 99.9, suffix: "%", decimals: 1, label: "Uptime we hold" },
];

export default function Hero() {
  return (
    <Spotlight>
      <section id="top" className="relative isolate overflow-hidden">
        <Blueprint />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-6 pb-6 pt-6 lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:gap-2 lg:pb-2 lg:pt-10">
          {/* copy */}
          <div className="relative z-10">
            <Reveal variant="fade-right">
              <span className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-white py-1 pl-4 pr-1 text-[15px] text-[#3f3f42] shadow-[0_1px_2px_rgba(17,17,17,0.05)]">
                <span className="pip relative inline-block h-2 w-2 rounded-full bg-live text-live" />
                Software Development Studio
                <a
                  href="#work"
                  className="btn-brand inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[14px] font-medium"
                >
                  See the work
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </span>
            </Reveal>

            <h1 className="display mt-8 text-[40px] leading-[1.06] text-ink sm:text-[52px] lg:text-[56px] xl:text-[62px]">
              <Reveal variant="blur-in" delay={80}>
                <span className="block">We build software</span>
              </Reveal>
              <Reveal variant="blur-in" delay={220}>
                <span className="block text-brand">
                  <em>
                    <Typewriter
                      phrases={[
                        "that ships.",
                        "that scales.",
                        "that lasts.",
                        "that earns.",
                      ]}
                    />
                  </em>
                </span>
              </Reveal>
            </h1>

            <Reveal variant="fade-up" delay={340}>
              <p className="mt-6 max-w-[28rem] text-[16px] leading-[1.7] text-[#5c5c5e]">
                NetraSoft Solutions designs, builds and maintains the web, mobile
                and cloud software companies actually run on — scoped in the
                open, delivered on a date, and supported after launch.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={440}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#start"
                  className="btn-brand inline-flex items-center gap-2.5 rounded-[12px] px-6 py-3 text-[16px] font-medium"
                >
                  Start a Project
                  <Scatter className="h-3 w-3 opacity-80" />
                </a>
                <BookCallButton className="btn-outline inline-flex items-center gap-2 rounded-[12px] px-6 py-3 text-[16px] font-medium">
                  Book a Call
                </BookCallButton>
              </div>
            </Reveal>

            {/* live counters */}
            <Reveal variant="fade-up" delay={560}>
              <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="display text-[30px] leading-none text-ink">
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

          {/* the delivery line */}
          <div className="relative -mx-6 sm:mx-0 lg:-mr-[14%] lg:-mt-6 lg:w-[124%]">
            <Parallax speed={0.05}>
              <Reveal variant="fade-in" delay={120}>
                <PipelineScene className="h-auto w-full" />
              </Reveal>
            </Parallax>
          </div>
        </div>
      </section>
    </Spotlight>
  );
}
