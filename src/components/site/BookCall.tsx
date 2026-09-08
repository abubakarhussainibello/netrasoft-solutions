"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Clock, Phone, Shield, Users } from "./icons";

const SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

const CHANNELS = [
  { key: "meet", label: "Google Meet" },
  { key: "phone", label: "Phone call" },
  { key: "whatsapp", label: "WhatsApp" },
];

const PERKS = [
  { Icon: Clock, text: "30 minutes, no sales script" },
  { Icon: Users, text: "You speak to an engineer, not a rep" },
  { Icon: Shield, text: "Straight answer on scope, timeline and cost" },
];

const FALLBACK_ZONES = [
  "Africa/Lagos", "Africa/Accra", "Africa/Nairobi", "Africa/Johannesburg",
  "Europe/London", "Europe/Dublin", "Europe/Paris", "Europe/Berlin",
  "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "America/Toronto", "America/Sao_Paulo", "Asia/Dubai", "Asia/Riyadh",
  "Asia/Karachi", "Asia/Kolkata", "Asia/Singapore", "Asia/Shanghai",
  "Asia/Tokyo", "Australia/Sydney", "UTC",
];

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-[14px] text-ink placeholder:text-muted-dim focus:border-brand focus:outline-none";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
      {children}
    </span>
  );
}

function BookCallModal({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const slotsRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [channel, setChannel] = useState("meet");
  const [topic, setTopic] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  // The modal only ever mounts client-side (on click), so reading Intl here is safe.
  const [detectedZone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  );
  const [timezone, setTimezone] = useState(detectedZone);

  // Every IANA zone the browser knows, with the visitor's own pinned to the top.
  const zones = useMemo(() => {
    let list: string[];
    try {
      list = Intl.supportedValuesOf("timeZone");
    } catch {
      list = FALLBACK_ZONES;
    }
    const rest = list.filter((z) => z !== detectedZone).sort();
    return [detectedZone, ...rest];
  }, [detectedZone]);

  // Only the selected zone gets an offset lookup — labelling all 400+ is slow.
  const offset = useMemo(() => {
    try {
      return (
        new Intl.DateTimeFormat("en", {
          timeZone: timezone,
          timeZoneName: "shortOffset",
        })
          .formatToParts(new Date())
          .find((part) => part.type === "timeZoneName")?.value ?? ""
      );
    } catch {
      return "";
    }
  }, [timezone]);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  /** Returns the first problem, so the visitor is told what is missing. */
  function firstProblem() {
    if (name.trim().length < 2)
      return { msg: "Please add your name.", el: firstFieldRef.current };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { msg: "Add an email we can reply to.", el: emailRef.current };
    if (!date) return { msg: "Pick a date for the call.", el: dateRef.current };
    if (!time) return { msg: "Pick a time slot.", el: slotsRef.current };
    return null;
  }

  useEffect(() => {
    firstFieldRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;

    const problem = firstProblem();
    if (problem) {
      setError(problem.msg);
      problem.el?.scrollIntoView({ block: "center", behavior: "smooth" });
      if (problem.el instanceof HTMLInputElement) problem.el.focus({ preventScroll: true });
      return;
    }

    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          date,
          time,
          timezone,
          channel: CHANNELS.find((c) => c.key === channel)?.label ?? channel,
          topic,
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setError("Could not reach the server. Check your connection.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-call-title"
    >
      {/* backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="animate-fade fixed inset-0 cursor-default bg-[rgba(23,24,26,0.45)] backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        className="animate-modal relative z-10 flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-white shadow-[0_40px_120px_rgba(17,17,17,0.3)] sm:max-h-[90dvh] sm:rounded-3xl"
      >
        <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-[#e2e2df] sm:hidden" />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 grid h-8 w-8 place-items-center rounded-full border border-line-strong bg-white text-[#57575a] transition-colors hover:text-ink"
        >
          ×
        </button>

        {sent ? (
          <div className="relative flex min-h-[340px] flex-1 flex-col items-center justify-center overflow-y-auto p-8 text-center sm:p-10">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">
              <Check className="h-6 w-6" />
            </div>
            <h2 id="book-call-title" className="display mt-6 text-[28px] text-ink">
              Call requested
            </h2>
            <p className="mt-3 max-w-sm text-[14px] leading-[1.7] text-[#5c5c5e]">
              Thanks {name.split(" ")[0]}. We will confirm {date} at {time} by
              email to {email} — usually within a few hours.
            </p>
            <button
              onClick={onClose}
              className="btn-brand mt-7 rounded-[12px] px-6 py-3 text-[15px] font-medium"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="relative grid min-h-0 flex-1 md:grid-cols-[1fr_1.4fr]">
            {/* Left rail */}
            <div className="hidden min-h-0 flex-col justify-between overflow-y-auto border-r border-line bg-[#fbfbfa] p-8 md:flex">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand">
                  Book a call
                </span>
                <h2
                  id="book-call-title"
                  className="display mt-4 text-[28px] leading-tight text-ink"
                >
                  Let&apos;s talk
                  <br /> about the <em>build</em>
                </h2>
                <p className="mt-4 text-[14px] leading-[1.7] text-[#5c5c5e]">
                  Pick a slot that suits you. We confirm by email before it lands
                  in your calendar.
                </p>

                <div className="mt-8 rounded-2xl border border-line bg-white p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
                    Your call is with
                  </span>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f2f2ef]">
                      <Image
                        src="/brand/netrasoft-mark.png"
                        alt=""
                        width={509}
                        height={512}
                        className="h-4 w-auto"
                      />
                    </span>
                    <span className="text-[13px] leading-snug text-[#5c5c5e]">
                      A NetraSoft
                      <br /> solutions engineer
                    </span>
                  </div>
                </div>
              </div>

              <ul className="mt-10 space-y-3">
                {PERKS.map(({ Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-2.5 text-[13px] text-[#5c5c5e]"
                  >
                    <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={submit} noValidate className="relative flex min-h-0 flex-col">
              <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6 sm:p-8">
                <h2 className="display text-[24px] text-ink md:hidden">Book a call</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <Label>Your name</Label>
                    <input
                      ref={firstFieldRef}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Ada Obi"
                      className={`${inputClass} mt-3`}
                    />
                  </label>
                  <label className="block">
                    <Label>Email</Label>
                    <input
                      ref={emailRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="ada@acme.com"
                      className={`${inputClass} mt-3`}
                    />
                  </label>
                  <label className="block">
                    <Label>Organisation</Label>
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Optional"
                      className={`${inputClass} mt-3`}
                    />
                  </label>
                  <label className="block">
                    <Label>Phone / WhatsApp</Label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Optional"
                      className={`${inputClass} mt-3`}
                    />
                  </label>
                </div>

                <label className="block">
                  <Label>Preferred date</Label>
                  <input
                    ref={dateRef}
                    type="date"
                    value={date}
                    min={todayISO()}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className={`${inputClass} mt-3`}
                  />
                </label>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Label>Preferred time {offset && `· ${offset}`}</Label>
                    <select
                      aria-label="Timezone"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="max-w-[58%] truncate rounded-lg border border-line-strong bg-white px-2.5 py-1.5 font-mono text-[11px] text-[#5c5c5e] transition-colors hover:text-ink focus:border-brand focus:outline-none"
                    >
                      {zones.map((z) => (
                        <option key={z} value={z}>
                          {z === detectedZone ? `${z} — yours` : z}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div ref={slotsRef} className="mt-3 grid grid-cols-3 gap-2">
                    {SLOTS.map((slot) => {
                      const active = time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          aria-pressed={active}
                          className={`rounded-xl border px-2 py-2.5 font-mono text-[12px] transition-all ${
                            active
                              ? "border-brand bg-brand-soft text-brand"
                              : "border-line-strong bg-white text-[#5c5c5e] hover:border-brand/50 hover:text-ink"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label>Call via</Label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {CHANNELS.map((c) => {
                      const active = channel === c.key;
                      return (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => setChannel(c.key)}
                          aria-pressed={active}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-all ${
                            active
                              ? "border-brand bg-brand-soft text-brand"
                              : "border-line-strong bg-white text-[#5c5c5e] hover:border-brand/50 hover:text-ink"
                          }`}
                        >
                          {c.key === "phone" && <Phone className="h-3.5 w-3.5" />}
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="block">
                  <Label>What should we cover?</Label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={3}
                    placeholder="Optional — a sentence on what you are building, or the decision you are weighing."
                    className={`${inputClass} mt-3 resize-none leading-relaxed`}
                  />
                </label>

                {/* honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                />
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-3 border-t border-line bg-white/95 px-6 py-4 backdrop-blur-md sm:px-8">
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-brand inline-flex items-center gap-2 rounded-[12px] px-6 py-3 text-[15px] font-medium transition-all disabled:opacity-70"
                >
                  {sending ? "Requesting…" : "Request This Slot"}
                  {sending ? (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5" />
                  )}
                </button>
                {error && (
                  <p role="alert" className="text-[13px] text-brand-dark">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookCallButton({
  children = "Book a Call",
  className = "",
  icon,
}: {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button ref={triggerRef} onClick={() => setOpen(true)} className={className}>
        {children}
        {icon}
      </button>
      {open && <BookCallModal onClose={close} />}
    </>
  );
}
