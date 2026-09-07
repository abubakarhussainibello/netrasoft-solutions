import Eyebrow from "./Eyebrow";
import { Reveal } from "./motion";
import { ArrowUpRight, Check, Shield, Users } from "./icons";

const principles = [
  {
    Icon: Users,
    title: "Senior engineers only",
    body: "The people on your call are the people writing the code. No juniors parked on your build to pad the invoice.",
  },
  {
    Icon: Shield,
    title: "Fixed scope, fixed price",
    body: "We agree what ships and what it costs before week one. Change the scope and we re-quote it in the open.",
  },
  {
    Icon: Check,
    title: "You own everything",
    body: "Repository, cloud accounts, pipelines and documentation are in your name from the first commit.",
  },
];

const places = ["Abuja", "Lagos", "Remote-first"];

export default function About() {
  return (
    <section id="about" className="relative border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="fade-right">
            <div>
              <Eyebrow>About us</Eyebrow>
              <h2 className="display mt-6 text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
                A small team that
                <br /> ships like a <em>big one</em>
              </h2>

              <div className="mt-7 space-y-4 text-[16px] leading-[1.75] text-[#5c5c5e]">
                <p>
                  NetraSoft Solutions is a software development studio. We build
                  the web, mobile and cloud systems that companies run their
                  operations on — the applications people log into every morning,
                  not the demos that get shown once.
                </p>
                <p>
                  The method is not complicated. Keep the team small and senior,
                  agree the scope in writing before anyone opens an editor, put
                  working software in front of the client every week, and hand
                  over something the next engineer can actually maintain.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dim">
                {places.map((p, i) => (
                  <span
                    key={p}
                    className="anim-drop flex items-center gap-2"
                    style={{ animationDelay: `${i * 140}ms` }}
                  >
                    <span className="h-1 w-1 rounded-full bg-brand" />
                    {p}
                  </span>
                ))}
              </div>

              <a
                href="#start"
                className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-brand"
              >
                Start a project with us
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          <div className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
              How we work
            </span>
            {principles.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 110} variant="fade-left">
                <div className="panel panel-hover group rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand/25 bg-brand-soft text-brand transition-transform duration-500 group-hover:rotate-6">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold text-ink">{title}</h3>
                      <p className="mt-1.5 text-[15px] leading-[1.7] text-[#5c5c5e]">{body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
