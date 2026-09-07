import Eyebrow from "./Eyebrow";
import { Reveal } from "./motion";
import { Bug, Clock, Handover } from "./icons";

const problems = [
  {
    Icon: Clock,
    title: "The date keeps moving",
    body: "Three months becomes nine. Nobody can say why, because nobody agreed what \"done\" meant in the first place.",
    note: "Budget spent, nothing live",
  },
  {
    Icon: Bug,
    title: "Code you cannot inherit",
    body: "It works on the demo and nowhere else. No tests, no documentation, and one person who understands it.",
    note: "Rewrite within a year",
  },
  {
    Icon: Handover,
    title: "The team disappears at launch",
    body: "The invoice clears, the contact goes quiet, and the first production bug lands on your desk alone.",
    note: "No one left to call",
  },
];

export default function Problems() {
  return (
    <section id="problems" className="relative border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>Why builds go wrong</Eyebrow>
            <h2 className="display mt-6 text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
              Most software projects fail
              <br /> in the <em>same three ways</em>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-[#5c5c5e]">
              None of them are technical problems. All of them are avoidable.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {problems.map(({ Icon, title, body, note }, i) => (
            <Reveal key={title} delay={i * 110} variant="fade-up">
              <article className="panel panel-hover group h-full rounded-2xl p-7">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-brand/20 bg-brand-soft text-brand transition-transform duration-500 group-hover:rotate-6">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-ink">{title}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-[#5c5c5e]">{body}</p>
                <div className="mt-6 flex items-center gap-2 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
                  <span className="pip relative inline-block h-1.5 w-1.5 rounded-full bg-brand text-brand" />
                  {note}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
