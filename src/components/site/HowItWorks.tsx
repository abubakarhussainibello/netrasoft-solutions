import Eyebrow from "./Eyebrow";
import { IsoSprintLoop } from "./iso-scenes";
import { Meter, Parallax, Reveal } from "./motion";
import { Bolt, Check, Cloud, Handover, Target, Terminal } from "./icons";

const steps = [
  {
    n: "01",
    Icon: Target,
    title: "Discovery & scope",
    when: "Week 1",
    body: "We pin down the problem, the users and the constraints, then write the scope you sign — features, dates and price.",
    out: "Signed scope + fixed quote",
  },
  {
    n: "02",
    Icon: Terminal,
    title: "Design & architecture",
    when: "Week 1–2",
    body: "Screens, data model and system design agreed before build, so nothing gets discovered halfway through.",
    out: "Clickable prototype",
  },
  {
    n: "03",
    Icon: Bolt,
    title: "Build in sprints",
    when: "Week 2–6",
    body: "Core flows land in staging every week. You use the real thing on a Friday call and steer the next sprint.",
    out: "Weekly working build",
    active: true,
  },
  {
    n: "04",
    Icon: Check,
    title: "Test & harden",
    when: "Week 6–7",
    body: "Automated tests, load checks, a security pass and a fix window before anything touches production.",
    out: "Green suite + report",
  },
  {
    n: "05",
    Icon: Handover,
    title: "Launch & handover",
    when: "Week 8",
    body: "Production release, monitoring wired up, then repo, cloud accounts and documentation handed to your team.",
    out: "You own the whole thing",
  },
];

/* The delivery track: a rail with week markers and a live position pin */
function Track() {
  return (
    <div className="relative mt-14 hidden lg:block">
      <div className="relative h-px w-full bg-line">
        {/* inset-0, not inset-y-0: the bar's width is a % of this box */}
        <Meter
          pct={62}
          className="absolute inset-0"
          barClassName="h-px bg-gradient-to-r from-brand/20 via-brand to-brand"
        />
      </div>

      <div className="mt-0 flex justify-between">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 110} variant="scale-in">
            <div className="-mt-[7px] flex flex-col items-center">
              <span
                className={[
                  "grid h-3.5 w-3.5 place-items-center rounded-full border-2 bg-background transition-colors",
                  s.active ? "border-brand" : "border-line-strong",
                ].join(" ")}
              >
                {s.active ? (
                  <span className="pip relative block h-1.5 w-1.5 rounded-full bg-brand text-brand" />
                ) : null}
              </span>
              <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dim">
                {s.when}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="process" className="relative border-b border-line bg-white">
      <div className="blueprint-fine pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <Eyebrow>The process</Eyebrow>
              <h2 className="display mt-6 text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
                Eight weeks, <em>five checkpoints</em>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-[#5c5c5e]">
                A typical build. Bigger systems run the same loop over more
                sprints — the checkpoints never change.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-line bg-[#faf9f7] px-4 py-2">
              <span className="pip relative inline-block h-2 w-2 rounded-full bg-live text-live" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#57575a]">
                Currently: sprint 3 of 5
              </span>
            </div>
          </div>
        </Reveal>

        {/* the weekly loop the five checkpoints run inside */}
        <Reveal variant="fade-in" delay={120}>
          <Parallax speed={0.03}>
            <IsoSprintLoop className="mx-auto mt-8 h-auto w-full max-w-4xl" />
          </Parallax>
        </Reveal>

        <Track />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ n, Icon, title, when, body, out, active }, i) => (
            <Reveal key={n} delay={i * 90}>
              <article
                className={[
                  "group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300",
                  active
                    ? "border-brand/40 bg-brand-soft/40 shadow-[0_14px_34px_rgba(241,82,28,0.10)]"
                    : "border-line bg-white hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_16px_36px_rgba(17,17,17,0.07)]",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={[
                      "grid h-9 w-9 place-items-center rounded-xl border transition-transform duration-500 group-hover:rotate-6",
                      active
                        ? "border-brand/30 bg-white text-brand"
                        : "border-line bg-[#faf9f7] text-[#57575a]",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[11px] text-muted-dim">{n}</span>
                </div>

                <h3 className="mt-5 text-[16px] font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-[#5c5c5e]">{body}</p>

                <div className="mt-auto pt-5">
                  <div className="flex items-start gap-2 border-t border-line pt-4">
                    <Cloud className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                    <span className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted-dim">
                      {out}
                    </span>
                  </div>
                  <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dim lg:hidden">
                    {when}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
