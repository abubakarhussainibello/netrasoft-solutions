import Eyebrow from "./Eyebrow";
import { Reveal } from "./motion";
import { Star } from "./icons";

/**
 * PLACEHOLDER COPY — replace every quote, name and role below with real,
 * approved client references before this site goes live.
 */
const quotes = [
  {
    quote:
      "They scoped it, priced it, and hit the date. After three agencies in two years that on its own was worth the fee — the software being good was the bonus.",
    name: "Client name",
    role: "COO · logistics operator",
    initials: "01",
  },
  {
    quote:
      "The Friday demo changed everything. We caught two wrong assumptions in week three instead of at launch, and it cost us a conversation instead of a rebuild.",
    name: "Client name",
    role: "Product lead · fintech",
    initials: "02",
  },
  {
    quote:
      "Handover was a folder of documentation, our own AWS account and a repo our new engineer understood in a day. Nothing was held hostage.",
    name: "Client name",
    role: "CTO · health group",
    initials: "03",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonial" className="relative border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <Eyebrow center>Client words</Eyebrow>
            <h2 className="display mt-6 max-w-2xl text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
              What it is like to
              <br /> <em>work with us</em>
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.role} delay={i * 110}>
              <figure className="panel panel-hover group relative h-full overflow-hidden rounded-2xl p-7">
                <span className="absolute -right-2 -top-6 select-none font-serif text-[110px] leading-none text-brand/8 transition-transform duration-500 group-hover:scale-110">
                  &rdquo;
                </span>

                <div className="relative flex gap-1 text-brand">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="anim-tick h-3.5 w-3.5"
                      style={{ animationDelay: `${s * 160}ms` }}
                    />
                  ))}
                </div>

                <blockquote className="relative mt-5 text-[16px] leading-[1.75] text-[#3f3f42]">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>

                <figcaption className="relative mt-7 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f4f4f1] font-mono text-[11px] text-[#57575a] transition-colors duration-300 group-hover:bg-brand-soft group-hover:text-brand">
                    {q.initials}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[14px] font-medium text-ink">{q.name}</span>
                    <span className="block text-[13px] text-muted-dim">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
