import { clean, isEmail, row, shell, send } from "@/lib/mail";

const MAX = { brief: 5000, short: 200 };

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Bots fill every field they find.
  if (clean(body.company, MAX.short)) return Response.json({ ok: true });

  const project = clean(body.project, MAX.brief);
  const email = clean(body.email, MAX.short);
  const budget = clean(body.budget, MAX.short);
  const name = clean(body.name, MAX.short) || "Not given";
  const type = clean(body.type, MAX.short) || "Not given";
  const timeline = clean(body.timeline, MAX.short) || "Not given";
  const stage = clean(body.stage, MAX.short) || "Not given";
  const organisation = clean(body.organisation, MAX.short) || "Not given";

  if (project.length < 20) {
    return Response.json(
      { error: "Tell us a little more about the project." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return Response.json(
      { error: "That email address does not look right." },
      { status: 400 }
    );
  }
  if (!budget) {
    return Response.json({ error: "Pick a budget range." }, { status: 400 });
  }

  const html = shell({
    kicker: "New project brief",
    title: name,
    rows: [
      row("Project type", type),
      row("Budget", budget),
      row("Timeline", timeline),
      row("Stage", stage),
      row("Organisation", organisation),
      row("Email", email),
    ].join(""),
    blockLabel: "The project",
    block: project,
    replyTo: email,
    replyName: name.split(" ")[0] || name,
  });

  const text = [
    `New project brief from ${name} <${email}>`,
    ``,
    `Type:      ${type}`,
    `Budget:    ${budget}`,
    `Timeline:  ${timeline}`,
    `Stage:     ${stage}`,
    `Org:       ${organisation}`,
    ``,
    `The project:`,
    project,
  ].join("\n");

  const result = await send({
    subject: `Project brief — ${name} (${budget})`,
    html,
    text,
    replyTo: email,
  });

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }
  return Response.json({ ok: true, id: result.id });
}
