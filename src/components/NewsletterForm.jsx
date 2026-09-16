"use client";

import { useState } from "react";
import Icon from "./Icons";
import { site } from "@/lib/site";

/**
 * NewsletterForm — subscribes an address to the monthly "Signal" email.
 *
 * Posts to the same `/api/lead` route the enquiry forms use, tagged
 * `kind: "newsletter"`, so every submission on the site is delivered through
 * one place (Resend, configured in `.env`). Set
 * `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` to send subscriptions elsewhere instead.
 *
 * If the network drops, or the server reports 503 because `RESEND_API_KEY` is
 * not set yet, it falls back to opening the visitor's mail client with the
 * address pre-filled — the control is never a dead end.
 */
export default function NewsletterForm({ variant = "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");
    setMessage("");

    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || "/api/lead";

    const mailtoFallback = () => {
      const subject = encodeURIComponent("Subscribe me to the monthly signal");
      const body = encodeURIComponent(
        `Please add ${email} to the Loud Launchers monthly signal.`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("done");
      setMessage("Opening your email app to confirm.");
    };

    let response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "newsletter",
          email,
          source: "newsletter form",
          submittedAt: new Date().toISOString(),
        }),
      });
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
      setMessage("You're on the list. Look out for the next issue.");
      setEmail("");
      return;
    }

    setStatus("error");
    setMessage("That didn't go through. Email us and we'll add you manually.");
  }

  const isLight = variant === "light";

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label
        htmlFor="newsletter-email"
        className={`text-[10px] font-bold uppercase tracking-[0.24em] ${
          isLight ? "text-zinc-600" : "text-muted"
        }`}
      >
        The monthly signal
      </label>
      <p
        className={`mt-3 text-sm leading-relaxed ${
          isLight ? "text-zinc-600" : "text-zinc-400"
        }`}
      >
        One email a month: what changed in search and AI visibility, and what we
        would do about it. No noise, unsubscribe anytime.
      </p>

      <div
        className={`mt-5 flex flex-col gap-2 rounded-2xl border p-2 transition focus-within:border-[#ff176e]/60 sm:flex-row sm:items-center ${
          isLight
            ? "border-black/10 bg-white"
            : "border-white/10 bg-white/[0.03]"
        }`}
      >
        <div className="flex flex-1 items-center gap-3 px-3">
          <Icon
            name="mail"
            className={`h-4 w-4 shrink-0 ${
              isLight ? "text-zinc-500" : "text-muted"
            }`}
          />
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            className={`w-full bg-transparent py-2.5 text-sm outline-none ${
              isLight
                ? "text-black placeholder:text-zinc-500"
                : "text-white placeholder:text-subtle"
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-3d btn-3d--pink group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-[#050507] disabled:opacity-60"
        >
          {status === "sending" ? "Adding…" : "Subscribe"}
          <Icon
            name="arrowRight"
            className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>

      <p
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-xs ${
          status === "error"
            ? "text-[#ff8fbd]"
            : isLight
              ? "text-zinc-600"
              : "text-muted"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
