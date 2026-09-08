import Image from "next/image";
import BookCallButton from "./BookCall";
import { Scatter } from "./icons";
import { IsoLaunch } from "./iso-scenes";
import { Reveal, Spotlight } from "./motion";

const perks = ["30 minutes", "You speak to an engineer", "No commitment", "Straight answer"];

export default function CtaSection() {
  return (
    <section id="contact" className="relative border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Reveal variant="scale-in">
          <Spotlight className="relative isolate overflow-hidden rounded-3xl border border-line bg-white px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="blueprint pointer-events-none absolute inset-0 opacity-70" aria-hidden />
            <div className="spotlight pointer-events-none absolute inset-0" aria-hidden />
            <div className="hatch anim-drift pointer-events-none absolute -left-10 bottom-0 h-[180px] w-[180px] rotate-6" aria-hidden />
            <div className="hatch anim-drift pointer-events-none absolute -right-10 top-0 h-[180px] w-[180px] -rotate-6" aria-hidden />

            <div className="relative">
              <Image
                src="/brand/netrasoft-mark.png"
                alt=""
                width={509}
                height={512}
                className="anim-float mx-auto h-12 w-auto"
              />

              <h2 className="display mt-8 text-balance text-[34px] leading-[1.08] text-ink sm:text-[48px]">
                Tell us what you are building.
                <br /> <em>We will tell you what it takes.</em>
              </h2>

              <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.7] text-[#5c5c5e]">
                A 30-minute call, an engineer on the other end, and you leave with
                a scope, a timeline and a number — whether or not you hire us.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#start"
                  className="btn-brand inline-flex items-center gap-2.5 rounded-[12px] px-6 py-3 text-[16px] font-medium"
                >
                  Start a Project
                  <Scatter className="h-3 w-3 opacity-80" />
                </a>
                <BookCallButton className="btn-ink inline-flex items-center gap-2 rounded-[12px] px-6 py-3 text-[16px] font-medium">
                  Book a Call
                </BookCallButton>
              </div>

              <IsoLaunch className="mx-auto mt-12 h-auto w-full max-w-2xl" />

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dim">
                {perks.map((p, i) => (
                  <span
                    key={p}
                    className="anim-drop flex items-center gap-2"
                    style={{ animationDelay: `${i * 130}ms` }}
                  >
                    <span className="h-1 w-1 rounded-full bg-brand" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
