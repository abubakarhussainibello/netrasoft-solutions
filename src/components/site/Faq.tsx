"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";
import BookCallButton from "./BookCall";
import { Minus, Plus } from "./icons";
import { Reveal } from "./motion";

const faqs = [
  {
    q: "How long does a build actually take?",
    a: "A focused first version is typically eight weeks from signed scope to production. Larger platforms run the same weekly loop over more sprints — you get a working build every week either way, so the timeline is visible rather than promised.",
  },
  {
    q: "How do you price work?",
    a: "Fixed scope, fixed price. We write down what ships, what it costs and when it lands before week one. If you change the scope mid-build we re-quote that change in the open — there is never an invoice you did not see coming.",
  },
  {
    q: "Who actually writes the code?",
    a: "Senior engineers, and the same ones who join your calls. We do not staff a project with juniors behind a sales contact, and you can ask anyone on the team a technical question directly.",
  },
  {
    q: "Do we own the code and the accounts?",
    a: "Yes, from the first commit. The repository, cloud accounts, CI pipelines, domains and documentation are created in your name. Ending the engagement means we hand over access, not that we hand over a copy.",
  },
  {
    q: "What happens after launch?",
    a: "Monitoring, backups and alerting are set up before go-live. Most clients then move onto a support retainer with a named engineer and an agreed response time; you are free not to, and nothing about the handover depends on it.",
  },
  {
    q: "Can you work with our existing codebase or team?",
    a: "Often. We start with a short architecture review to say honestly whether it is worth building on or worth replacing, then either embed with your engineers or take a defined slice of the work.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,38%)_minmax(0,62%)] lg:gap-20">
          <Reveal variant="fade-right">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="display mt-6 text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
                Before you <em>get in touch</em>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-[#5c5c5e]">
                The six things every client asks on the first call. If yours is
                not here, ask it directly.
              </p>
              <BookCallButton className="btn-outline mt-7 inline-flex items-center rounded-[12px] px-5 py-3 text-[15px] font-medium">
                Book a Call
              </BookCallButton>
            </div>
          </Reveal>

          <div className="divide-y divide-[rgba(17,17,17,0.07)] border-y border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 60} variant="fade-up">
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className={[
                          "text-[17px] leading-snug transition-colors duration-200",
                          isOpen ? "text-brand" : "text-ink group-hover:text-brand",
                        ].join(" ")}
                      >
                        {f.q}
                      </span>
                      <span
                        className={[
                          "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "rotate-180 border-brand bg-brand text-white"
                            : "border-line-strong text-[#57575a] group-hover:border-brand group-hover:text-brand",
                        ].join(" ")}
                      >
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </span>
                    </button>

                    {/* grid-rows trick: animates height without measuring */}
                    <div
                      className="grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-6 text-[15px] leading-[1.75] text-[#5c5c5e]">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
