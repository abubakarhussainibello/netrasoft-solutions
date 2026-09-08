"use client";

/**
 * The site's motion primitives.
 *
 * Everything here is driven by one IntersectionObserver hook and the keyframes
 * declared in globals.css — no animation library. Each primitive subscribes to
 * prefers-reduced-motion and renders its finished state immediately when the
 * viewer has asked for less movement.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Live prefers-reduced-motion. Assumes "no" on the server, corrects on hydrate. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => false
  );
}

/** Fires once when the element first crosses into view. */
export function useInView<T extends HTMLElement>(
  { threshold = 0.2, rootMargin = "0px 0px -10% 0px", once = true } = {}
) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    // Reduced motion skips observation entirely — everything is already shown.
    if (!el || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          if (once) io.disconnect();
        } else if (!once) {
          setSeen(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once, reduced]);

  return { ref, inView: seen || reduced };
}

type Variant =
  | "fade-up"
  | "fade-down"
  | "fade-in"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "blur-in"
  | "drop-in";

/** Reveals its children on scroll. `delay` staggers members of a group. */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  className,
  style,
  threshold,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-shown={inView ? "true" : "false"}
      className={className}
      style={{ ...style, ["--v" as string]: variant, ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Counts up to a number the first time it is seen. */
export function CountUp({
  to,
  duration = 1600,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo — quick out of the gate, settles gently on the number
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(to * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduced]);

  const shown = reduced ? to : value;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Types a rotating list of phrases, one character at a time. */
export function Typewriter({
  phrases,
  className,
  typeMs = 58,
  eraseMs = 26,
  holdMs = 1900,
}: {
  phrases: string[];
  className?: string;
  typeMs?: number;
  eraseMs?: number;
  holdMs?: number;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  /* Starts on the full first phrase so the server renders complete text — an
     empty start put "We build software" alone in the h1 for crawlers, and made
     the line reflow on hydration. */
  const [text, setText] = useState(phrases[0]);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const full = phrases[index % phrases.length];

    // Every state change is deferred into a timer, so nothing fires
    // synchronously while the effect body is still running.
    if (!erasing) {
      if (text === full) {
        const t = setTimeout(() => setErasing(true), holdMs);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setText(full.slice(0, text.length + 1)), typeMs);
      return () => clearTimeout(t);
    }

    if (text === "") {
      const t = setTimeout(() => {
        setErasing(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, 160);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setText(full.slice(0, text.length - 1)), eraseMs);
    return () => clearTimeout(t);
  }, [text, erasing, index, phrases, typeMs, eraseMs, holdMs, reduced]);

  if (reduced) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <span className={className}>
      {text}
      {/* a drawn bar, not a "|" character — a literal pipe ends up in the
          heading's text content and in what crawlers read */}
      <span
        className="anim-caret ml-1 inline-block h-[0.72em] w-[3px] translate-y-[0.04em] bg-current"
        aria-hidden
      />
    </span>
  );
}

/** Tilts toward the pointer. Falls back to a plain box on reduced motion. */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || reduced) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateZ(0)`;
    },
    [max, reduced]
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{ transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </div>
  );
}

/** Writes --px/--py on itself so a child `.spotlight` can follow the cursor. */
export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || reduced) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--px", `${e.clientX - r.left}px`);
      el.style.setProperty("--py", `${e.clientY - r.top}px`);
    },
    [reduced]
  );

  return (
    <div ref={ref} onMouseMove={onMove} className={className}>
      {children}
    </div>
  );
}

/** Scroll-linked parallax. `speed` is a fraction of the scroll distance. */
export function Parallax({
  children,
  speed = 0.08,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Fills a horizontal bar to `pct` when it scrolls into view. */
export function Meter({
  pct,
  className,
  barClassName,
  delay = 0,
}: {
  pct: number;
  className?: string;
  barClassName?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <div ref={ref} className={className}>
      <div
        className={barClassName}
        style={{
          width: inView ? `${pct}%` : "0%",
          transition: `width 1.15s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        }}
      />
    </div>
  );
}
