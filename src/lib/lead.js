/**
 * Lead capture — shared definitions for the guided chat bot and the lead modal.
 *
 * Three things live here:
 *  1. A tiny event bus so any component (including server components, via
 *     <LeadTrigger>) can open the lead modal without prop drilling.
 *  2. The script the guided chat bot follows, expressed as data. Reordering or
 *     adding a question means editing `CHAT_STEPS`, not the component.
 *  3. Payload composition and delivery, with the same endpoint-or-mailto
 *     fallback the newsletter form uses so no control is ever a dead end.
 *
 * Delivery: submissions POST to `/api/lead`, which emails them through Resend
 * to the address configured in `.env` (`LEAD_TO_EMAIL`). Set
 * `NEXT_PUBLIC_LEAD_ENDPOINT` to send them to a CRM or form service instead.
 * If the network drops, or the server reports 503 because the key is not set
 * yet, the brief falls back to the visitor's mail client — so no enquiry is
 * ever lost while the setup is being finished.
 */

import { site } from "@/lib/site";

export const LEAD_EVENT = "ll:open-lead";

/** The six services, as short labels, for the multi-select controls. */
export const SERVICE_OPTIONS = [
  "Websites",
  "Apps",
  "Marketing",
  "SEO",
  "Branding",
  "Social",
];

/** Opens the lead modal. Safe to call from anywhere client-side. */
export function openLead(source = "unknown") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: { source } }));
}

/**
 * The guided conversation.
 *
 * `control` selects which input the chat renders for that step:
 *   services — multi-select chips      country — searchable combobox
 *   text     — single-line text        email   — email input
 *   phone    — dial prefix + number    review  — summary and submit
 *
 * `bot` lines are the assistant's messages for the step. `{name}` is
 * interpolated from answers already given, so later steps can sound like they
 * were listening. `validate` returns an error string, or null when valid.
 */
export const CHAT_STEPS = [
  {
    key: "services",
    control: "services",
    label: "Which services are you interested in?",
    bot: [
      "Hi — I'm Nova, the Loud Launchers launch assistant. A couple of minutes and I'll have everything the team needs to come back with a real plan.",
      "First up: what are we launching? Pick everything that applies.",
    ],
    validate: (value) =>
      Array.isArray(value) && value.length
        ? null
        : "Pick at least one service so we know what to scope.",
  },
  {
    key: "origin",
    control: "country",
    label: "Country of origin",
    bot: [
      "Got it — noted.",
      "Which country are you originally based in? This helps us understand your market context.",
    ],
    validate: (value) => (value ? null : "Choose a country from the list."),
  },
  {
    key: "residence",
    control: "country",
    label: "Country of residence",
    bot: [
      "Thanks.",
      "And where are you operating from day to day? This decides who covers your timezone.",
    ],
    validate: (value) => (value ? null : "Choose a country from the list."),
  },
  {
    key: "name",
    control: "text",
    label: "Your name",
    placeholder: "e.g. Priya Sharma",
    bot: ["Perfect. Who should I address the plan to?"],
    validate: (value) =>
      value && value.trim().length >= 2 ? null : "Please enter your name.",
  },
  {
    key: "email",
    control: "email",
    label: "Email address",
    placeholder: "you@company.com",
    bot: ["Thanks, {name}. What's the best email to send it to?"],
    validate: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || "").trim())
        ? null
        : "That email doesn't look right — check it and try again.",
  },
  {
    key: "phone",
    control: "phone",
    label: "Phone number",
    bot: [
      "Last one, {name} — a number we can reach you on.",
      "WhatsApp is fine and usually fastest. Include the country code if you can.",
    ],
    validate: (value) =>
      String(value || "").replace(/\D/g, "").length >= 6
        ? null
        : "Please enter a reachable phone number.",
  },
  {
    key: "review",
    control: "review",
    label: "Review your details",
    bot: [
      "That's everything. Check it over — if something's off, tap the pencil and I'll fix it.",
    ],
  },
];

/** Human-readable labels for the review summary. */
const REVIEW_LABELS = {
  services: "Interested in",
  origin: "Country of origin",
  residence: "Country of residence",
  name: "Name",
  email: "Email",
  phone: "Phone",
};

/** Ordered key list for the summary — matches the question order. */
export const LEAD_KEYS = ["services", "origin", "residence", "name", "email", "phone"];

/** Formats one answer for display (services join into a readable list). */
export function formatAnswer(key, value) {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  return value ? String(value) : "—";
}

/** Builds the review rows for the summary step. */
export function reviewRows(values) {
  return LEAD_KEYS.map((key) => ({
    key,
    label: REVIEW_LABELS[key],
    value: formatAnswer(key, values[key]),
  }));
}

/** Plain-text brief, used for both the email body and the JSON payload. */
export function composeLeadText(values, source = "guided chat") {
  const lines = [
    "New project enquiry — Loud Launchers",
    "",
    `Name:                ${formatAnswer("name", values.name)}`,
    `Email:               ${formatAnswer("email", values.email)}`,
    `Phone:               ${formatAnswer("phone", values.phone)}`,
    `Country of origin:   ${formatAnswer("origin", values.origin)}`,
    `Country of residence:${formatAnswer("residence", values.residence)}`,
    `Services:            ${formatAnswer("services", values.services)}`,
    "",
    `Captured via: ${source}`,
    `Captured at: ${new Date().toISOString()}`,
  ];
  return lines.join("\n");
}

/** A `mailto:` URL carrying the whole brief, used as the offline fallback. */
export function leadMailto(values, source) {
  const subject = encodeURIComponent(
    `Project enquiry — ${formatAnswer("services", values.services)}`,
  );
  const body = encodeURIComponent(composeLeadText(values, source));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

/** Opens the visitor's mail client with the brief pre-filled. */
function mailtoFallback(values, source) {
  if (typeof window !== "undefined") {
    window.location.href = leadMailto(values, source);
  }
  return { ok: true, delivered: "mailto" };
}

/**
 * Delivers the lead. Returns { ok, delivered } or throws.
 *
 * Posts to `/api/lead`, which emails the brief through Resend to the address
 * configured in `.env` (`LEAD_TO_EMAIL`). Set `NEXT_PUBLIC_LEAD_ENDPOINT` to
 * send submissions somewhere else instead — a CRM or form service — and the
 * rest of this file stays as it is.
 *
 * Two cases fall back to the visitor's mail client rather than failing: the
 * network drops, or the server reports 503 because `RESEND_API_KEY` has not
 * been set yet. Either way the enquiry still reaches us, and the UI can show
 * its success state instead of an error the visitor cannot act on.
 */
export async function submitLead(values, source = "guided chat") {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/lead";
  const payload = {
    kind: "lead",
    ...values,
    source,
    submittedAt: new Date().toISOString(),
    brief: composeLeadText(values, source),
  };

  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return mailtoFallback(values, source);
  }

  if (response.ok) return { ok: true, delivered: "email" };
  if (response.status === 503) return mailtoFallback(values, source);

  const detail = await response.json().catch(() => null);
  throw new Error(
    detail?.message || `Lead delivery failed (${response.status})`,
  );
}
