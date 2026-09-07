import { Resend } from "resend";

export function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function escapeHtml(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #ececea;color:#6a6a68;font-size:13px;width:150px;vertical-align:top;">${escapeHtml(
        label
      )}</td>
      <td style="padding:10px 0;border-bottom:1px solid #ececea;color:#17181a;font-size:14px;font-weight:500;">${escapeHtml(
        value
      )}</td>
    </tr>`;
}

/** Wraps rows + an optional free-text block in the branded email shell. */
export function shell({
  kicker,
  title,
  rows,
  blockLabel,
  block,
  replyTo,
  replyName,
}: {
  kicker: string;
  title: string;
  rows: string;
  blockLabel?: string;
  block?: string;
  replyTo: string;
  replyName: string;
}) {
  const blockHtml =
    block && blockLabel
      ? `<div style="margin-top:22px;">
           <div style="color:#6a6a68;font-size:11px;letter-spacing:.16em;text-transform:uppercase;">${escapeHtml(
             blockLabel
           )}</div>
           <div style="margin-top:10px;color:#17181a;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(
             block
           )}</div>
         </div>`
      : "";

  return `
  <div style="background:#f7f7f5;padding:28px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #ececea;">
      <div style="background:#17181a;padding:22px 28px;">
        <div style="color:#f9915f;font-size:11px;letter-spacing:.16em;text-transform:uppercase;">${escapeHtml(
          kicker
        )}</div>
        <div style="color:#ffffff;font-size:20px;font-weight:600;margin-top:6px;">${escapeHtml(
          title
        )}</div>
      </div>
      <div style="padding:8px 28px 24px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
        ${blockHtml}
        <a href="mailto:${escapeHtml(
          replyTo
        )}" style="display:inline-block;margin-top:24px;background:#f1521c;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:11px 20px;border-radius:12px;">Reply to ${escapeHtml(
    replyName
  )}</a>
      </div>
    </div>
  </div>`;
}

type SendResult = { ok: true; id?: string } | { ok: false; status: number; error: string };

export async function send({
  subject,
  html,
  text,
  replyTo,
}: {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BRIEF_FROM;
  // BRIEF_TO accepts a comma-separated list — everyone listed gets a copy.
  const to = (process.env.BRIEF_TO ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  if (!apiKey || to.length === 0 || !from) {
    console.error(
      "Mail not sent — missing RESEND_API_KEY, BRIEF_TO or BRIEF_FROM in the environment."
    );
    return {
      ok: false,
      status: 500,
      error: "Email is not configured on the server yet.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return {
        ok: false,
        status: 502,
        error: "We could not send that just now. Please try again.",
      };
    }

    return { ok: true, id: data?.id };
  } catch (err) {
    console.error("Send failed:", err);
    return {
      ok: false,
      status: 502,
      error: "We could not send that just now. Please try again.",
    };
  }
}
