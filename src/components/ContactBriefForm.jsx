"use client";

import { useState } from "react";
import Icon from "./Icons";
import { services, site } from "@/lib/site";

/**
 * ContactBriefForm — the long-form brief on /contact.
 *
 * This started life as a plain `<form action="mailto:…">` on the server. That
 * looked harmless but was quietly broken: a `mailto:` form action hands the
 * submission to the visitor's own mail client, which on a phone with no mail
 * account configured, or a desktop with a browser-only setup, simply does
 * nothing. The lead never arrived, and the visitor was told nothing.
 *
 * It now posts to `/api/lead` like every other form on the site, so the brief
 * is emailed through Resend to the address in `.env`. The fields are richer
 * than the chat's — company, budget and a free-text brief — and the route
 * renders those only when they are present.
 *
 * Failure handling matches `NewsletterForm` and `submitLead`: a dropped
 * network or an unconfigured server (503) falls back to opening the visitor's
 * mail client with the brief pre-filled, so no control is ever a dead end.
 */

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-[#0d0d13] px-4 py-3.5 text-white placeholder:text-subtle transition focus:border-[#ff176e] focus:outline-none focus:ring-2 focus:ring-[#ff176e]/30";

const labelClasses =
  "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-400";

/** Composes the fallback `mailto:` for this form's own field set. */
function mailtoFor(values) {
  const subject = encodeURIComponent(
    `Project enquiry — ${
      values.services.length
        ? values.services.join(", ")
        : values.company || values.name
    }`,
  );
  const body = encodeURIComponent(
    [
      "New project enquiry — Loud Launchers",
      "",
      `Name:     ${values.name}`,
      `Email:    ${values.email}`,
      `Company:  ${values.company || "—"}`,
      `Budget:   ${values.budget || "—"}`,
      `Services: ${values.services.length ? values.services.join(", ") : "—"}`,
      "",
      "About the project:",
      values.message,
    ].join("\n"),
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export default function ContactBriefForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      budget: String(data.get("budget") || "").trim(),
      services: data.getAll("services").map(String),
      message: String(data.get("message") || "").trim(),
    };

    setStatus("sending");
    setMessage("");

    const mailtoFallback = () => {
      window.location.href = mailtoFor(values);
      setStatus("done");
      setMessage("Opening your email app so you can send the brief directly.");
    };

    let response;
    try {
      response = await fetch(
        process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kind: "lead",
            ...values,
            source: "contact page brief",
            submittedAt: new Date().toISOString(),
          }),
        },
      );
    } catch {
      mailtoFallback();
      return;
    }

    if (response.status === 503) {
      mailtoFallback();
      return;
    }

    if (response.ok) {
      setStatus("done");
      setMessage("");
      return;
    }

    setStatus("error");
    setMessage(
      "That didn't go through. Try again, or email us directly and we'll pick it up from there.",
    );
  }

  if (status === "done") {
    return (
      <div className="grid gap-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ff176e]/40 bg-[#ff176e]/10">
          <Icon name="check" className="h-5 w-5 text-[#ff4b8f]" />
        </span>
        <h2 className="text-2xl font-black uppercase tracking-[-0.02em] text-white">
          Brief received
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-zinc-400">
          Thanks — it is in our inbox. You will get a real response from the team
          that would run your project, usually within one business day.
        </p>
        <p aria-live="polite" className="text-xs leading-relaxed text-muted">
          {message}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#ff4b8f] transition hover:text-white"
        >
          <Icon name="mail" className="h-4 w-4" />
          {site.email}
        </a>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <h2 className="text-2xl font-black uppercase tracking-[-0.02em] text-white">
        Project brief
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Cooper"
            autoComplete="name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClasses}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Company Inc."
            autoComplete="organization"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="budget" className={labelClasses}>
            Budget range
          </label>
          <select id="budget" name="budget" className={inputClasses}>
            <option>Under $5,000</option>
            <option>$5,000 – $15,000</option>
            <option>$15,000 – $40,000</option>
            <option>$40,000+</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={`${labelClasses} mb-3`}>What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <label
              key={service.slug}
              className="btn-3d btn-3d--outline btn-3d--soft cursor-pointer rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-400 has-checked:border-[#ff176e] has-checked:bg-[#ff176e]/15 has-checked:text-white"
            >
              <input
                type="checkbox"
                name="services"
                value={service.short}
                className="sr-only"
              />
              {service.short}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={labelClasses}>
          About the project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="What are you building, who is it for, and what does success look like?"
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="btn-3d btn-3d--pink group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-bold text-[#050507] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send the brief"}
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-black/25 transition duration-300 group-hover:rotate-45"
        >
          ↗
        </span>
      </button>

      <p className="text-xs leading-relaxed text-muted">
        Goes straight to our inbox — you will usually hear back within one
        business day. Prefer plain email? Write to us directly at{" "}
        <a
          href={`mailto:${site.email}`}
          className="font-semibold text-[#ff4b8f] transition hover:text-white"
        >
          {site.email}
        </a>
        .
      </p>

      <p
        aria-live="polite"
        role={status === "error" ? "alert" : undefined}
        className={`min-h-[1.25rem] text-xs leading-relaxed ${
          status === "error" ? "text-[#ff8fbd]" : "text-muted"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
