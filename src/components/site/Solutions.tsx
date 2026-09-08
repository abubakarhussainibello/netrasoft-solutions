import Eyebrow from "./Eyebrow";
import { IsoHandover, IsoScopeStack } from "./iso-scenes";
import { Reveal } from "./motion";
import { ArrowUpRight, Check, Cloud, Shield, Terminal, Users } from "./icons";

/* ---------- card visuals: all CSS-driven, so they stay server-rendered ---------- */

/* Scope agreed, one sheet at a time */
function ScopeVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <IsoScopeStack className="h-full w-full" />
    </div>
  );
}

/* Friday demo: cards crossing a board */
function DemoVisual() {
  const cols = [
    { head: "Doing", rows: [70, 45] },
    { head: "Review", rows: [55] },
    { head: "Shipped", rows: [80, 62, 40] },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="grid w-full max-w-[420px] grid-cols-3 gap-3">
        {cols.map((c, ci) => (
          <div key={c.head} className="rounded-xl border border-line bg-white/85 p-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-dim">
              {c.head}
            </div>
            <div className="mt-3 space-y-2">
              {c.rows.map((w, i) => (
                <div
                  key={i}
                  className="anim-float rounded-md border border-line bg-[#fbfbf9] p-2"
                  style={{ animationDelay: `${(ci * 3 + i) * 260}ms` }}
                >
                  <div
                    className={`h-1.5 rounded-full ${ci === 2 ? "bg-live/70" : "bg-brand/60"}`}
                    style={{ width: `${w}%` }}
                  />
                  <div className="mt-1.5 h-1 w-1/2 rounded-full bg-[#e8e8e3]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Handover: the keys crossing to your side */
function OwnershipVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <IsoHandover className="h-full w-full" />
    </div>
  );
}

/* Post-launch: uptime that keeps drawing */
function UptimeVisual() {
  const bars = [58, 72, 64, 86, 78, 92, 84, 96, 88, 99, 94, 100];
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-1.5 p-8">
      {bars.map((b, i) => (
        <span
          key={i}
          className="anim-drop w-full max-w-[18px] rounded-t-[3px]"
          style={{
            height: `${b}%`,
            background:
              i >= bars.length - 3
                ? "linear-gradient(180deg,#3d85ff,#0054e8)"
                : "rgba(17,17,17,0.10)",
            animationDelay: `${i * 70}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- shell ---------- */

function BentoCard({
  span,
  Icon,
  title,
  body,
  delay,
  children,
}: {
  span: string;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay} className={span}>
      <div className="panel panel-hover group flex h-full flex-col rounded-2xl p-3">
        <div className="well relative aspect-[16/10] w-full overflow-hidden rounded-xl">
          <div className="dot-grid fade-edges absolute inset-0 opacity-25" />
          {children}
        </div>
        <div className="px-3 pb-2 pt-5">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-brand transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-[16px] font-semibold text-ink">{title}</h3>
          </div>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#5c5c5e]">{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

const promises = [
  "A fixed proposal before week one",
  "A working demo every Friday",
  "Repo, cloud and docs in your name from day one",
];

export default function Solutions() {
  return (
    <section id="approach" className="relative border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="display mt-6 max-w-2xl text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
            Every one of those failures,
            <br /> <em>designed out</em>
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-[1.7] text-[#5c5c5e]">
            Not promises — the operating rules we run every engagement on.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          <BentoCard
            span="lg:col-span-3"
            Icon={Shield}
            title="Fixed scope, fixed price"
            body="We agree what ships and what it costs before a line of code. Scope changes get re-quoted in the open."
            delay={0}
          >
            <ScopeVisual />
          </BentoCard>

          <BentoCard
            span="lg:col-span-3"
            Icon={Terminal}
            title="Built in the open"
            body="Working software in staging every week, with the engineers who wrote it on the call."
            delay={80}
          >
            <DemoVisual />
          </BentoCard>

          <BentoCard
            span="lg:col-span-3"
            Icon={Users}
            title="You own everything"
            body="Repository, cloud accounts, pipelines and documentation are in your name from the first commit."
            delay={160}
          >
            <OwnershipVisual />
          </BentoCard>

          <BentoCard
            span="lg:col-span-3"
            Icon={Cloud}
            title="We stay after launch"
            body="Monitoring, patches and a named engineer on support — so the first production incident is ours too."
            delay={240}
          >
            <UptimeVisual />
          </BentoCard>

          {/* Closing card */}
          <Reveal delay={300} className="sm:col-span-2 lg:col-span-6">
            <div className="panel grid gap-8 overflow-hidden rounded-2xl p-7 sm:p-9 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-[#faf9f7] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-brand">
                  <span className="pip relative inline-block h-1.5 w-1.5 rounded-full bg-brand text-brand" />
                  No surprise invoices
                </span>
                <h3 className="display mt-5 text-balance text-[28px] leading-tight text-ink">
                  Transparent from kickoff to handover
                </h3>

                <ul className="mt-6 grid gap-3">
                  {promises.map((p, i) => (
                    <li
                      key={p}
                      className="anim-drop flex items-center gap-3 text-[15px] text-[#5c5c5e]"
                      style={{ animationDelay: `${i * 140}ms` }}
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-brand/30 bg-brand-soft text-brand">
                        <Check className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <a
                  href="#start"
                  className="group mt-7 inline-flex items-center gap-2 text-[15px] font-medium text-brand"
                >
                  See what your build would cost
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div className="well relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <div className="dot-grid fade-edges absolute inset-0 opacity-25" />
                <DemoVisual />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
