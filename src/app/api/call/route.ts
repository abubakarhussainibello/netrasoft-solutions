import { clean, isEmail, row, shell, send } from "@/lib/mail";

const MAX = { long: 3000, short: 200 };

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // honeypot
  if (clean(body.website, MAX.short)) return Response.json({ ok: true });

  const name = clean(body.name, MAX.short);
  const email = clean(body.email, MAX.short);
  const company = clean(body.company, MAX.short) || "Not given";
  const phone = clean(body.phone, MAX.short) || "Not given";
  const date = clean(body.date, MAX.short);
  const time = clean(body.time, MAX.short);
  const timezone = clean(body.timezone, MAX.short) || "Not given";
  const channel = clean(body.channel, MAX.short) || "Not given";
  const topic = clean(body.topic, MAX.long);

  if (name.length < 2) {
    return Response.json({ error: "Please add your name." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return Response.json(
      { error: "That email address does not look right." },
      { status: 400 }
    );
  }
  if (!date || !time) {
    return Response.json(
      { error: "Pick a date and a time that works for you." },
      { status: 400 }
    );
  }

  const pretty = (() => {
    const d = new Date(`${date}T00:00:00`);
    return Number.isNaN(d.getTime())
      ? date
      : d.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  })();

  const html = shell({
    kicker: "New call request",
    title: name,
    rows: [
      row("Preferred date", pretty),
      row("Preferred time", `${time} (${timezone})`),
      row("Call via", channel),
      row("Email", email),
      row("Phone", phone),
      row("Organisation", company),
    ].join(""),
    blockLabel: topic ? "What they want to discuss" : undefined,
    block: topic || undefined,
    replyTo: email,
    replyName: name.split(" ")[0] || name,
  });

  const text = [
    `New call request from ${name} <${email}>`,
    ``,
    `Date:     ${pretty}`,
    `Time:     ${time} (${timezone})`,
    `Via:      ${channel}`,
    `Phone:    ${phone}`,
    `Org:      ${company}`,
    ``,
    topic ? `Topic:\n${topic}` : `No topic given.`,
  ].join("\n");

  const result = await send({
    subject: `Call request — ${name}, ${pretty} at ${time}`,
    html,
    text,
    replyTo: email,
  });

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }
  return Response.json({ ok: true, id: result.id });
}
