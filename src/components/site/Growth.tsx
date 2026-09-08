import Eyebrow from "./Eyebrow";
import { IsoChart } from "./iso-scenes";
import { CountUp, Meter, Reveal } from "./motion";

const pillars = [
  {
    n: "01",
    title: "Delivered on the date",
    body: "Nine years of fixed-scope builds, and the launch date in the proposal is the launch date we hit.",
  },
  {
    n: "02",
    title: "Built to be inherited",
    body: "Tests, documentation and a stack your next hire already knows — so you are never locked to us.",
  },
  {
    n: "03",
    title: "Supported past launch",
    body: "Most of our work is for clients we shipped for years ago and still keep running.",
  },
];

const bars = [
  { label: "On-time delivery", pct: 96 },
  { label: "Clients who return", pct: 82 },
  { label: "Test coverage at handover", pct: 78 },
];

/* The release cadence chart — each column draws itself in */
const CADENCE = [34, 48, 42, 61, 55, 72, 66, 84, 76, 92, 88, 100];

export default function Growth() {
  return (
    <section className="relative border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,40%)_minmax(0,60%)] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Track record</Eyebrow>
              <h2 className="display mt-6 text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
                Measured in what
                <br /> is <em>still in production</em>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-[#5c5c5e]">
                Anyone can ship once. The number that matters is how much of it
                is still running years later.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {bars.map((b, i) => (
                <Reveal key={b.label} delay={i * 110}>
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[14px] text-[#3f3f42]">{b.label}</span>
                      <span className="display text-[20px] text-brand">
                        <CountUp to={b.pct} suffix="%" />
                      </span>
                    </div>
                    <Meter
                      pct={b.pct}
                      className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#eeeeea]"
                      barClassName="h-full rounded-full bg-gradient-to-r from-[#3d85ff] to-[#0054e8]"
                      delay={i * 120}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            {/* cadence chart */}
            <Reveal variant="fade-left">
              <div className="panel relative overflow-hidden rounded-2xl p-7">
                <div className="blueprint-fine pointer-events-none absolute inset-0 opacity-50" aria-hidden />

                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
                      Releases shipped · last 12 months
                    </div>
                    <div className="display mt-2 text-[38px] leading-none text-ink">
                      <CountUp to={128} />
                      <span className="ml-2 text-[16px] text-brand">+18% YoY</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5">
                    <span className="pip relative inline-block h-1.5 w-1.5 rounded-full bg-live text-live" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#57575a]">
                      Live
                    </span>
                  </span>
                </div>

                <IsoChart values={CADENCE} highlight={3} className="relative mt-4 h-auto w-full" />
              </div>
            </Reveal>

            <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {pillars.map((p, i) => (
                <Reveal key={p.n} delay={i * 90}>
                  <div className="h-full bg-white p-6 transition-colors duration-300 hover:bg-[#fdfaf8]">
                    <div className="font-mono text-[11px] text-brand">{p.n}</div>
                    <h3 className="mt-3 text-[15px] font-semibold text-ink">{p.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.7] text-[#5c5c5e]">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
