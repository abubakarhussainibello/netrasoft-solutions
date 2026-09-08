"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BookCallButton from "./BookCall";

const navLinks = [
  { label: "Home", href: "/#top", watch: "top" },
  { label: "Services", href: "/#services", watch: "services" },
  { label: "Process", href: "/#process", watch: "process" },
  { label: "Work", href: "/#work", watch: "work" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq", watch: "faq" },
];

export default function SiteHeader({ active = "Home" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [current, setCurrent] = useState(active);

  /* Frost the bar once the page moves */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track which section the reader is in */
  useEffect(() => {
    const watched = navLinks.filter((l) => l.watch);
    const nodes = watched
      .map((l) => ({ link: l, el: document.getElementById(l.watch as string) }))
      .filter((n): n is { link: (typeof navLinks)[number]; el: HTMLElement } => Boolean(n.el));

    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const match = nodes.find((n) => n.el === hit.target);
        if (match) setCurrent(match.link.label);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );

    nodes.forEach((n) => io.observe(n.el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-40 w-full transition-all duration-300",
        stuck ? "glass border-b border-line" : "border-b border-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex w-full max-w-6xl items-center justify-between px-6 transition-all duration-300",
          stuck ? "py-3" : "py-6",
        ].join(" ")}
      >
        <Link
          href="/"
          aria-label="NetraSoft Solutions home"
          className="group flex shrink-0 items-center"
        >
          <Image
            src="/brand/netrasoft-logo.png"
            alt="NetraSoft Solutions"
            width={1100}
            height={356}
            priority
            className="h-7 w-auto transition-transform duration-500 group-hover:-translate-y-0.5"
          />
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 lg:flex">
          {navLinks.map((l) => {
            const isActive = l.label === current;
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "group relative inline-flex items-center gap-2 text-[15px] transition-colors duration-200",
                  isActive ? "text-ink" : "text-[#57575a] hover:text-ink",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-block h-2.5 w-2.5 rounded-[2px] transition-all duration-300",
                    isActive
                      ? "scale-110 bg-brand"
                      : "bg-[#e2e2df] group-hover:bg-[#c9c9c5]",
                  ].join(" ")}
                />
                {l.label}
                {/* underline slides out from the centre */}
                <span
                  className={[
                    "absolute -bottom-1.5 left-0 h-px w-full origin-center bg-brand transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <BookCallButton className="btn-outline hidden rounded-[11px] px-5 py-2.5 text-[15px] font-medium md:inline-flex">
            Book a Call
          </BookCallButton>
          <Link
            href="/#start"
            className="btn-brand hidden rounded-[11px] px-5 py-2.5 text-[15px] font-medium sm:inline-flex"
          >
            Start a Project
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[11px] border border-line-strong bg-white text-ink transition-colors hover:border-brand hover:text-brand lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                d={open ? "M5 5l14 14M19 5L5 19" : "M4 7h16M4 12h16M4 17h16"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="absolute left-6 right-6 top-full z-40 rounded-2xl border border-line bg-white p-3 shadow-[0_18px_40px_rgba(17,17,17,0.10)] lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((l, i) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 45}ms` }}
                className="anim-fade flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] text-[#57575a] transition-colors hover:bg-[#f5f5f3] hover:text-ink"
              >
                <span
                  className={[
                    "inline-block h-2.5 w-2.5 rounded-[2px]",
                    l.label === current ? "bg-brand" : "bg-[#e2e2df]",
                  ].join(" ")}
                />
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/#start"
                onClick={() => setOpen(false)}
                className="btn-brand rounded-[11px] px-4 py-2.5 text-center text-[14px] font-medium"
              >
                Start a Project
              </Link>
              <BookCallButton className="btn-outline rounded-[11px] px-4 py-2.5 text-center text-[14px] font-medium">
                Book a Call
              </BookCallButton>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
