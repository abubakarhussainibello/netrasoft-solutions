"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";
import BookCallButton from "./BookCall";
import { Reveal } from "./motion";
import {
  ArrowRight,
  Blocks,
  Bolt,
  Check,
  Cloud,
  Layers,
  Phone,
  Plus,
  Terminal,
} from "./icons";

const TYPES = [
  { key: "web", label: "Web application", Icon: Blocks },
  { key: "mobile", label: "Mobile app", Icon: Phone },
  { key: "enterprise", label: "Enterprise / internal system", Icon: Layers },
  { key: "integration", label: "Integration & APIs", Icon: Cloud },
  { key: "ai", label: "AI & automation", Icon: Bolt },
  { key: "design", label: "Product & UI/UX design", Icon: Terminal },
  { key: "other", label: "Something else", Icon: Plus },
];

const BUDGETS = [
  { key: "s", label: "Under $5k" },
  { key: "m", label: "$5k – $15k" },
  { key: "l", label: "$15k – $50k" },
  { key: "xl", label: "$50k+" },
  { key: "unsure", label: "Not sure yet" },
];

const TIMELINES = [
  { key: "asap", label: "As soon as possible" },
  { key: "8", label: "Within 8 weeks" },
  { key: "quarter", label: "1 – 3 months" },
  { key: "flex", label: "Flexible" },
];

const STAGES = [
  { key: "idea", label: "Still an idea" },
  { key: "spec", label: "Scoped and specced" },
  { key: "live", label: "Live, needs work" },
  { key: "rescue", label: "Rescuing a build" },
];

const NEXT_STEPS = [
  "We read your brief and reply within one business day.",
  "A 30-minute call to pin down scope and constraints.",
  "A fixed proposal: what ships, when, and what it costs.",
];

function ChipGroup({
  options,
  value,
  onChange,
  columns = "sm:grid-cols-2",
}: {
  options: { key: string; label: string; Icon?: React.ComponentType<{ className?: string }> }[];
  value: string;
  onChange: (key: string) => void;
  columns?: string;
}) {
  return (
    <div className={`grid gap-2 ${columns}`}>
      {options.map(({ key, label, Icon }) => {
        const active = value === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={active}
            className={[
              "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-[14px] transition-all duration-200",
              active
                ? "border-brand bg-brand-soft text-ink shadow-[0_2px_10px_rgba(241,82,28,0.14)]"
                : "border-line bg-white text-[#5c5c5e] hover:-translate-y-0.5 hover:border-line-strong hover:text-ink",
            ].join(" ")}
          >
            {Icon ? (
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-brand" : "text-muted-dim"}`} />
            ) : null}
            <span className="flex-1">{label}</span>
            {active ? (
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Check className="h-2.5 w-2.5" />
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
        {label}
      </span>
      <div className="mt-3">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-[14px] text-ink transition-colors placeholder:text-muted-dim focus:border-brand focus:outline-none";

export default function Pricing() {
  const [project, setProject] = useState("");
  const [type, setType] = useState("web");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [stage, setStage] = useState("");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const ready = project.trim().length > 20 && budget !== "" && email.includes("@");
  const labelOf = (list: { key: string; label: string }[], key: string, fallback: string) =>
    list.find((o) => o.key === key)?.label ?? fallback;

  return (
    <section id="start" className="relative border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center>Start a project</Eyebrow>
            <h2 className="display mt-6 text-balance text-[34px] leading-[1.1] text-ink sm:text-[46px]">
              Tell us the idea
              <br /> and the <em>budget</em>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-[#5c5c5e]">
              Send the concept and what you have to spend. You get back scope, a
              timeline and a fixed price — no hidden fees, no obligation.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          {/* Brief */}
          <Reveal variant="fade-right">
            <div className="panel h-full rounded-2xl p-6 sm:p-8">
              {sent ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="anim-drop grid h-14 w-14 place-items-center rounded-2xl border border-brand/30 bg-brand-soft text-brand">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="display mt-6 text-[28px] text-ink">Brief received</h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-[1.7] text-[#5c5c5e]">
                    Thanks {name.split(" ")[0] || "—"}. We will read it and come
                    back to {email} within one business day.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-[15px] text-brand transition-colors hover:text-brand-dark"
                  >
                    Send another brief
                  </button>
                </div>
              ) : (
                <form
                  className="relative space-y-7"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!ready || sending) return;
                    setSending(true);
                    setError("");
                    try {
                      const res = await fetch("/api/brief", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          project,
                          type: labelOf(TYPES, type, "Not given"),
                          budget: labelOf(BUDGETS, budget, "Not given"),
                          timeline: timeline ? labelOf(TIMELINES, timeline, "Not given") : "Not given",
                          stage: stage ? labelOf(STAGES, stage, "Not given") : "Not given",
                          name,
                          organisation,
                          email,
                          company,
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
                  }}
                >
                  <Field label="What are you building?">
                    <textarea
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      rows={4}
                      required
                      placeholder="A booking and payments portal for a clinic group — patients book online, staff see one schedule across nine branches, and billing reconciles automatically."
                      className={`${inputClass} resize-none leading-relaxed`}
                    />
                    <p className="mt-2 text-[12px] text-muted-dim">
                      Rough is fine. The problem you are solving matters more than
                      the feature list.
                    </p>
                  </Field>

                  <Field label="Project type">
                    <ChipGroup
                      options={TYPES}
                      value={type}
                      onChange={setType}
                      columns="sm:grid-cols-2 lg:grid-cols-3"
                    />
                  </Field>

                  <Field label="Budget range">
                    <ChipGroup
                      options={BUDGETS}
                      value={budget}
                      onChange={setBudget}
                      columns="sm:grid-cols-3"
                    />
                  </Field>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Timeline">
                      <ChipGroup options={TIMELINES} value={timeline} onChange={setTimeline} columns="grid-cols-1" />
                    </Field>
                    <Field label="Where it stands">
                      <ChipGroup options={STAGES} value={stage} onChange={setStage} columns="grid-cols-1" />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Your name">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Obi"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Organisation">
                      <input
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        placeholder="Acme Ltd"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="ada@acme.com"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  {/* honeypot — hidden from people, catnip for bots */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      disabled={!ready || sending}
                      className={[
                        "inline-flex items-center gap-2 rounded-[12px] px-6 py-3 text-[15px] font-medium transition-all",
                        ready && !sending
                          ? "btn-brand"
                          : "cursor-not-allowed border border-line bg-[#f4f4f1] text-muted-dim",
                      ].join(" ")}
                    >
                      {sending ? "Sending…" : "Send Project Brief"}
                      {sending ? (
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5" />
                      )}
                    </button>
                    {error ? (
                      <p role="alert" className="text-[13px] text-brand">
                        {error}
                      </p>
                    ) : null}
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* Live summary */}
          <Reveal variant="fade-left" delay={120}>
            <div className="panel relative isolate h-full overflow-hidden rounded-2xl p-6 sm:p-8">
              <div className="blueprint-fine pointer-events-none absolute inset-0 opacity-60" aria-hidden />

              <div className="relative">
                <h3 className="text-[16px] font-semibold text-ink">Your brief</h3>
                <p className="mt-1 text-[13px] text-muted-dim">Updates as you fill the form.</p>

                <dl className="mt-6 space-y-3 text-[14px]">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-[#5c5c5e]">Type</dt>
                    <dd className="text-right text-ink">{labelOf(TYPES, type, "—")}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-line pt-3">
                    <dt className="text-[#5c5c5e]">Budget</dt>
                    <dd className="text-right font-medium text-brand">
                      {budget ? labelOf(BUDGETS, budget, "—") : "Not set"}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-line pt-3">
                    <dt className="text-[#5c5c5e]">Timeline</dt>
                    <dd className="text-right text-ink">
                      {timeline ? labelOf(TIMELINES, timeline, "—") : "Not set"}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-line pt-3">
                    <dt className="text-[#5c5c5e]">Stage</dt>
                    <dd className="text-right text-ink">
                      {stage ? labelOf(STAGES, stage, "—") : "Not set"}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-line pt-3">
                    <dt className="text-[#5c5c5e]">Concept</dt>
                    <dd className="text-right text-ink">
                      {project.trim() ? `${project.trim().split(/\s+/).length} words` : "Empty"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 border-t border-line pt-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
                    What happens next
                  </span>
                  <ol className="mt-4 space-y-3">
                    {NEXT_STEPS.map((s, i) => (
                      <li
                        key={s}
                        className="anim-drop flex gap-3 text-[14px] leading-[1.7] text-[#5c5c5e]"
                        style={{ animationDelay: `${i * 150}ms` }}
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-line bg-[#faf9f7] font-mono text-[10px] text-ink">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>

                <BookCallButton className="mt-7 block w-full text-center text-[14px] text-[#5c5c5e] transition-colors hover:text-brand">
                  Rather talk first? Book a call
                </BookCallButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
