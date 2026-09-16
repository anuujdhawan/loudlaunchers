import { Resend } from "resend";

/**
 * POST /api/lead — the single delivery point for every form on the site.
 *
 * The guided chat, the "Start a project" modal and the newsletter all post
 * here. One route means one place to change the destination, one place to
 * validate, and no chance of a form quietly posting somewhere else.
 *
 * Configuration lives entirely in `.env` (see that file for setup):
 *   RESEND_API_KEY   — from https://resend.com/api-keys
 *   LEAD_TO_EMAIL    — where leads are delivered
 *   LEAD_FROM_EMAIL  — the verified sending address
 *   LEAD_REPLY_TO    — optional, blank omits the header
 *
 * Deliberate behaviour when RESEND_API_KEY is missing: this returns 503 with a
 * readable message rather than throwing. The client treats that as "not
 * configured" and falls back to opening the visitor's mail client with the
 * brief pre-filled, so an enquiry is never lost while the key is being set up.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Escape everything that reaches the HTML body. Field values are visitor
   input, so they must never be interpolated raw. */
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Reads a value that may arrive as an array (the service multi-select). */
function asText(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return value ? String(value).trim() : "";
}

/** Formats the submission time for a human reader, in the studio's timezone. */
function stamp(iso) {
  const date = iso ? new Date(iso) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

/* ------------------------------------------------------------------ */
/* Email bodies                                                        */
/* ------------------------------------------------------------------ */

/* A light layout on purpose: dark-background HTML email gets stripped or
   inverted by enough clients that it is not worth the risk. The brand pink
   carries the identity instead. */
function shell(title, kicker, inner) {
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#18181b">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7">
    <tr><td style="padding:24px 28px;border-bottom:3px solid #ff176e">
      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#ff176e">${escapeHtml(kicker)}</p>
      <h1 style="margin:8px 0 0;font-size:21px;font-weight:800;letter-spacing:-.01em;color:#09090b">${escapeHtml(title)}</h1>
    </td></tr>
    <tr><td style="padding:24px 28px">${inner}</td></tr>
    <tr><td style="padding:16px 28px 24px;border-top:1px solid #e4e4e7">
      <p style="margin:0;font-size:12px;color:#71717a">Sent automatically from the Loud Launchers website.</p>
    </td></tr>
  </table>
</body></html>`;
}

function table(rows) {
  const cells = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `<tr>
        <td style="padding:9px 0;vertical-align:top;width:150px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#71717a">${escapeHtml(label)}</td>
        <td style="padding:9px 0;vertical-align:top;font-size:15px;color:#18181b">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">${cells}</table>`;
}

function button(href, label) {
  return `<p style="margin:22px 0 0"><a href="${escapeHtml(href)}" style="display:inline-block;background:#ff176e;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 20px;border-radius:999px">${escapeHtml(label)}</a></p>`;
}

/** Plain-text twin of every email, so text-only clients stay readable. */
function plain(lines) {
  return lines.filter(Boolean).join("\n");
}

/* ------------------------------------------------------------------ */
/* Handlers                                                            */
/* ------------------------------------------------------------------ */

function buildLead(data) {
  const name = asText(data.name);
  const email = asText(data.email);
  const services = asText(data.services);
  const origin = asText(data.origin);
  const residence = asText(data.residence);
  const phone = asText(data.phone);
  /* Only the contact page's long-form brief supplies these three; the chat and
     the modal leave them blank, and `table()` drops empty rows. */
  const company = asText(data.company);
  const budget = asText(data.budget);
  const message = asText(data.message);
  const source = asText(data.source) || "website";
  const when = stamp(data.submittedAt);

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Company", company],
    ["Budget", budget],
    ["Country of origin", origin],
    ["Country of residence", residence],
    ["Services", services],
    ["Captured via", source],
    ["Captured at", when],
  ];

  /* A long free-text brief reads badly as a table row, so it gets its own
     block. `pre-wrap` preserves the paragraph breaks the visitor typed. */
  const messageBlock = message
    ? `<h2 style="margin:26px 0 10px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#71717a">About the project</h2>
       <div style="white-space:pre-wrap;font-size:15px;line-height:1.65;color:#18181b;border-left:3px solid #ff176e;padding-left:14px">${escapeHtml(message)}</div>`
    : "";

  /* Services is the most useful subject line when present, then the company. */
  const subject = services
    ? `New project enquiry — ${services}`
    : company
      ? `New project enquiry — ${company}`
      : `New project enquiry from ${name || "the website"}`;

  const html = shell(
    name ? `${name} wants to start a project` : "New project enquiry",
    "New project enquiry",
    table(rows) +
      messageBlock +
      (email
        ? button(`mailto:${email}?subject=${encodeURIComponent("Re: your Loud Launchers enquiry")}`, `Reply to ${name || email}`)
        : ""),
  );

  const text = plain([
    "New project enquiry — Loud Launchers",
    "",
    `Name:                 ${name}`,
    `Email:                ${email}`,
    `Phone:                ${phone}`,
    `Company:              ${company}`,
    `Budget:               ${budget}`,
    `Country of origin:    ${origin}`,
    `Country of residence: ${residence}`,
    `Services:             ${services}`,
    "",
    message ? `About the project:\n${message}\n` : "",
    `Captured via: ${source}`,
    `Captured at:  ${when}`,
  ]);

  return { subject, html, text };
}

function buildNewsletter(data) {
  const email = asText(data.email);
  const when = stamp(data.submittedAt);
  const source = asText(data.source) || "website";

  const html = shell(
    "New newsletter subscriber",
    "The monthly signal",
    table([
      ["Email", email],
      ["Source", source],
      ["Subscribed at", when],
    ]),
  );

  const text = plain([
    "New newsletter subscriber — Loud Launchers",
    "",
    `Email:         ${email}`,
    `Source:        ${source}`,
    `Subscribed at: ${when}`,
  ]);

  return { subject: `New newsletter subscriber — ${email}`, html, text };
}

/* ------------------------------------------------------------------ */

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from =
    process.env.LEAD_FROM_EMAIL || "Loud Launchers <onboarding@resend.dev>";
  const replyToOverride = process.env.LEAD_REPLY_TO;

  /* Validate the request before checking configuration. The reverse order
     reported every malformed body as 503 "not configured" — misleading, and
     it made the 400 branches impossible to exercise without a live key. */
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json(
      { ok: false, reason: "bad_request", message: "Expected a JSON body." },
      { status: 400 },
    );
  }

  const kind = data.kind === "newsletter" ? "newsletter" : "lead";
  const visitorEmail = asText(data.email);

  if (!EMAIL_RE.test(visitorEmail)) {
    return Response.json(
      {
        ok: false,
        reason: "bad_request",
        message: "A valid email address is required.",
      },
      { status: 400 },
    );
  }

  /* Not configured yet — tell the client clearly so it can fall back to
     mailto rather than showing the visitor a failure. */
  if (!apiKey) {
    return Response.json(
      {
        ok: false,
        reason: "not_configured",
        message:
          "Lead email is not configured. Set RESEND_API_KEY in .env and restart the dev server.",
      },
      { status: 503 },
    );
  }
  if (!to) {
    return Response.json(
      {
        ok: false,
        reason: "not_configured",
        message: "LEAD_TO_EMAIL is not set in .env.",
      },
      { status: 503 },
    );
  }

  const { subject, html, text } =
    kind === "newsletter" ? buildNewsletter(data) : buildLead(data);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      html,
      text,
      /* Replying to a lead should reach the visitor, not ourselves. Only set
         for real leads — a newsletter subscriber is not expecting a reply. */
      replyTo: replyToOverride || (kind === "lead" ? visitorEmail : undefined),
    });

    if (error) {
      /* Resend reports configuration problems (unverified domain, bad key) as
         a resolved error rather than a rejection, so surface it explicitly. */
      console.error("[lead] Resend rejected the send:", error);
      return Response.json(
        {
          ok: false,
          reason: "send_failed",
          message: error.message || "Resend rejected the send.",
        },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, delivered: "resend", kind });
  } catch (error) {
    console.error("[lead] Unexpected failure:", error);
    return Response.json(
      {
        ok: false,
        reason: "send_failed",
        message: error?.message || "Could not send the email.",
      },
      { status: 502 },
    );
  }
}
