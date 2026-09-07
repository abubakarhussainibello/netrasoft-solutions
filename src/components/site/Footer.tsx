import Link from "next/link";
import { ArrowRight, CubeMark } from "./icons";
import { Reveal } from "./motion";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Custom Web Applications", href: "/#services" },
      { label: "Mobile Apps", href: "/#services" },
      { label: "Cloud & DevOps", href: "/#services" },
      { label: "Systems Integration", href: "/#services" },
      { label: "AI & Automation", href: "/#services" },
      { label: "Product & UI/UX Design", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Our Work", href: "/work" },
      { label: "How We Work", href: "/#approach" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Start a Project", href: "/#start" },
      { label: "Book a Call", href: "/#contact" },
      { label: "Our Process", href: "/#process" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

const socials = [
  { label: "in", title: "LinkedIn" },
  { label: "X", title: "X" },
  { label: "gh", title: "GitHub" },
  { label: "@", title: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <Reveal variant="fade-right">
            <div>
              <Link href="/" aria-label="NetraSoft Solutions home" className="group inline-flex items-center gap-2.5">
                <CubeMark className="h-8 w-auto transition-transform duration-500 group-hover:rotate-[8deg]" title="NetraSoft Solutions" />
                <span className="display text-[21px] leading-none text-ink">NetraSoft</span>
              </Link>
              <p className="mt-5 max-w-xs text-[15px] leading-[1.7] text-[#5c5c5e]">
                A software development studio. We design, build and maintain the
                systems companies run on — and we stay after launch.
              </p>
              <div className="mt-6 flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.title}
                    href="#"
                    aria-label={s.title}
                    title={s.title}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-line text-[13px] text-[#5c5c5e] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col, i) => (
              <Reveal key={col.title} delay={i * 90}>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="group inline-flex items-center gap-1.5 text-[15px] text-[#5c5c5e] transition-colors hover:text-brand"
                        >
                          <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Release notes */}
        <div className="mt-14 grid gap-6 border-t border-line pt-10 sm:grid-cols-2 sm:items-center">
          <div>
            <h3 className="text-[16px] font-semibold text-ink">Engineering notes</h3>
            <p className="mt-1 text-[15px] text-[#5c5c5e]">
              Occasional writing on shipping software that lasts. No spam.
            </p>
          </div>
          <form className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Your email address"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-[12px] border border-line-strong bg-white px-4 py-2.5 text-[15px] text-ink transition-colors placeholder:text-muted-dim focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              className="btn-brand inline-flex shrink-0 items-center gap-1.5 rounded-[12px] px-4 py-2.5 text-[15px] font-medium"
            >
              Subscribe
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-7 text-[13px] text-muted-dim sm:flex-row">
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-brand">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-brand">Privacy</a>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em]">
            Scope · Build · Test · Ship
          </p>
          <p>© {new Date().getFullYear()} NetraSoft Solutions.</p>
        </div>
      </div>
    </footer>
  );
}
