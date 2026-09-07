import Eyebrow from "./Eyebrow";
import { Reveal, Tilt } from "./motion";
import { ArrowUpRight } from "./icons";

/**
 * Case studies are described by sector and outcome rather than by client name —
 * swap in real names and logos once each client has agreed to be referenced.
 */

type Study = {
  sector: string;
  title: string;
  body: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  tone: "ink" | "brand" | "plain";
};

const studies: Study[] = [
  {
    sector: "Logistics",
    title: "Fleet and dispatch platform",
    body: "Replaced a spreadsheet dispatch process with live vehicle tracking, automated route assignment and a driver mobile app.",
    stack: ["Next.js", "Node", "Postgres", "Flutter"],
    metrics: [
      { value: "11 wks", label: "To production" },
      { value: "−38%", label: "Idle fleet time" },
    ],
    tone: "ink",
  },
  {
    sector: "Fintech",
    title: "Lending and collections back office",
    body: "Loan origination, repayment scheduling and reconciliation against three payment providers, with a full audit trail.",
    stack: ["TypeScript", "NestJS", "Postgres", "AWS"],
    metrics: [
      { value: "4.2M", label: "Transactions / yr" },
      { value: "99.97%", label: "Uptime held" },
    ],
    tone: "brand",
  },
  {
    sector: "Public sector",
    title: "Agency licensing portal",
    body: "Applications, document review, payment and certificate issuance for a federal regulator, replacing an in-person process.",
    stack: ["React", "Laravel", "MySQL", "Docker"],
    metrics: [
      { value: "26k+", label: "Applications" },
      { value: "5 days", label: "Cut to 5 hours" },
    ],
    tone: "plain",
  },
  {
    sector: "Healthcare",
    title: "Clinic records and scheduling",
    body: "Patient records, appointments and billing across nine branches, with offline-tolerant sync for low-connectivity sites.",
    stack: ["Next.js", "Python", "Postgres", "Redis"],
    metrics: [
      { value: "9", label: "Branches live" },
      { value: "−60%", label: "Admin time" },
    ],
    tone: "plain",
  },
];

const toneStyles = {
  ink: "bg-ink text-white border-ink",
  brand: "bg-brand text-white border-brand",
  plain: "bg-white text-ink border-line",
} as const;

export default function Work() {
  return (
    <section id="work" className="relative border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="display mt-6 text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
                Systems that are <em>still running</em>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-[#5c5c5e]">
                Described by sector and outcome. We name clients only where they
                have agreed to be named.
              </p>
            </div>
            <a
              href="/work"
              className="btn-outline group inline-flex shrink-0 items-center gap-2 rounded-[12px] px-5 py-3 text-[15px] font-medium"
            >
              All case studies
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {studies.map((s, i) => (
            <Reveal key={s.title} delay={i * 100} variant={i % 2 ? "fade-left" : "fade-right"}>
              <Tilt max={5} className="h-full">
                <article
                  className={[
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-shadow duration-300 hover:shadow-[0_24px_50px_rgba(17,17,17,0.10)]",
                    toneStyles[s.tone],
                  ].join(" ")}
                >
                  {/* sheen sweeps across on hover */}
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span
                      className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/10"
                      style={{ animation: "sheen 1.1s ease-out" }}
                    />
                  </span>

                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={[
                        "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
                        s.tone === "plain"
                          ? "bg-[#f4f4f1] text-[#57575a]"
                          : "bg-white/15 text-white",
                      ].join(" ")}
                    >
                      {s.sector}
                    </span>
                    <span className="font-mono text-[11px] opacity-45">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="display mt-6 text-[26px] leading-tight">
                    {s.title}
                  </h3>
                  <p
                    className={[
                      "mt-3 max-w-md text-[15px] leading-[1.7]",
                      s.tone === "plain" ? "text-[#5c5c5e]" : "text-white/72",
                    ].join(" ")}
                  >
                    {s.body}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-6">
                    {s.metrics.map((m) => (
                      <div key={m.label}>
                        <div
                          className={[
                            "display text-[30px] leading-none",
                            s.tone === "plain" ? "text-brand" : "text-white",
                          ].join(" ")}
                        >
                          {m.value}
                        </div>
                        <div
                          className={[
                            "mt-2 font-mono text-[10px] uppercase tracking-[0.12em]",
                            s.tone === "plain" ? "text-muted-dim" : "text-white/55",
                          ].join(" ")}
                        >
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className={[
                      "mt-auto flex flex-wrap gap-2 pt-8",
                      s.tone === "plain" ? "" : "",
                    ].join(" ")}
                  >
                    {s.stack.map((t) => (
                      <span
                        key={t}
                        className={[
                          "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]",
                          s.tone === "plain"
                            ? "border-line text-muted-dim"
                            : "border-white/20 text-white/65",
                        ].join(" ")}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
