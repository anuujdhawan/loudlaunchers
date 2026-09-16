"use client";

import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icons";
import CountrySelect from "./CountrySelect";
import PhoneInput, { composePhone } from "./PhoneInput";
import { resolveCountry } from "@/lib/countries";
import { LEAD_EVENT, SERVICE_OPTIONS, submitLead } from "@/lib/lead";
import { site, whatsappLink } from "@/lib/site";

/**
 * LeadModal — the compact brief form opened by every "Start a project" CTA.
 *
 * It is mounted once in the root layout and listens for the `ll:open-lead`
 * event, so any button anywhere (including server components, via
 * <LeadTrigger>) can raise it without prop drilling or a context provider.
 *
 * Five fields, arranged to stay short: services as chips, then a two-column
 * row, then the two wider inputs. Country of residence drives the phone
 * prefix — until the visitor touches the picker themselves.
 */

const FIELD =
  "w-full rounded-xl border bg-[#0d0d13] px-3.5 py-3 text-sm text-white placeholder:text-subtle transition focus:outline-none focus:ring-2";
const OK = "border-white/10 focus:border-[#ff176e] focus:ring-[#ff176e]/30";
const BAD = "border-[#ff8fbd]/70 focus:border-[#ff8fbd] focus:ring-[#ff8fbd]/30";
const LABEL =
  "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-muted";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [residence, setResidence] = useState("");
  const [dial, setDial] = useState("");
  const [dialTouched, setDialTouched] = useState(false);
  const [number, setNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [failure, setFailure] = useState("");

  const uid = useId();
  const titleId = `${uid}-title`;
  const panelRef = useRef(null);
  const restoreRef = useRef(null);

  /* Open on demand from anywhere in the app. */
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(LEAD_EVENT, onOpen);
    return () => window.removeEventListener(LEAD_EVENT, onOpen);
  }, []);

  /* Remember where focus was so closing puts it back. */
  useEffect(() => {
    if (!open) return undefined;
    restoreRef.current = document.activeElement;
    const node = panelRef.current?.querySelector("input, select, button");
    if (node) node.focus({ preventScroll: true });
    return () => {
      const target = restoreRef.current;
      if (target instanceof HTMLElement && document.contains(target)) {
        target.focus({ preventScroll: true });
      }
    };
  }, [open]);

  /* Lock the page behind the dialog. */
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Escape closes unless a nested control already consumed the key. */
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !event.defaultPrevented) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function reset() {
    setServices([]);
    setName("");
    setEmail("");
    setResidence("");
    setDial("");
    setDialTouched(false);
    setNumber("");
    setErrors({});
    setStatus("idle");
    setFailure("");
  }

  function close() {
    setOpen(false);
    window.setTimeout(reset, 250);
  }

  /* Keep the phone prefix in step with residence until the visitor overrides
     it — after that it is their choice and we leave it alone. */
  function onResidenceChange(value) {
    setResidence(value);
    if (dialTouched) return;
    const country = resolveCountry(value);
    if (country) setDial(country.dial);
  }

  /** Cycles focus inside the dialog so Tab never escapes to the page behind. */
  function trapFocus(event) {
    if (event.key !== "Tab") return;
    const selector =
      'a[href], button:not([disabled]):not([tabindex="-1"]), input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';
    const nodes = Array.from(
      panelRef.current?.querySelectorAll(selector) || [],
    ).filter((node) => node.offsetParent !== null);
    if (nodes.length < 2) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    const next = {};
    if (!services.length) next.services = "Pick at least one service.";
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
    if (!resolveCountry(residence)) next.residence = "Choose your country.";
    if (composePhone(dial, number).replace(/\D/g, "").length < 6) {
      next.phone = "Enter a reachable number.";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      const firstKey = Object.keys(next)[0];
      panelRef.current
        ?.querySelector(`[data-field="${firstKey}"] input, [data-field="${firstKey}"] select, [data-field="${firstKey}"] button`)
        ?.focus();
      return;
    }

    setStatus("sending");
    setFailure("");
    try {
      await submitLead(
        {
          services,
          name: name.trim(),
          email: email.trim(),
          residence: resolveCountry(residence)?.name || residence,
          phone: composePhone(dial, number),
        },
        "lead modal",
      );
      setStatus("done");
    } catch {
      setStatus("error");
      setFailure(
        "That didn't send. Try again, or message us on WhatsApp and we'll pick it up there.",
      );
    }
  }

  if (!open) return null;

  const field = (key) => (errors[key] ? BAD : OK);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto p-4">
      <div
        aria-hidden="true"
        onClick={close}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={trapFocus}
        className="relative my-auto max-h-[92vh] w-full max-w-lg overflow-y-auto overflow-x-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b11] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#ff176e]/20 blur-3xl"
        />

        {/* ------------------------------------------------------- header */}
        <div className="relative flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              Free launch plan
            </p>
            <h2
              id={titleId}
              className="mt-2 text-xl font-black uppercase tracking-[-0.02em] text-white"
            >
              Start a project
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close form"
            className="btn-3d btn-3d--ghost btn-3d--soft -mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-white/[0.06] hover:text-white"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        {/* --------------------------------------------------------- body */}
        <div className="relative px-6 py-6">
          {status === "done" ? (
            <div className="py-2">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#ff176e] text-[#050507]">
                <Icon name="check" className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <p className="mt-4 text-lg font-black uppercase tracking-[-0.01em] text-white">
                Brief received
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                Thanks{name ? `, ${name.split(/\s+/)[0]}` : ""} — that&apos;s with
                the team. Expect a reply within one business day.
              </p>
              <div className="mt-6 grid gap-2">
                <a
                  href={whatsappLink(
                    `Hi ${site.name} — I'm ${name}. I just sent a brief through the website.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-200 transition hover:border-emerald-400/60 hover:bg-emerald-400/15"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  Continue on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="btn-3d btn-3d--ghost rounded-xl px-4 py-2.5 text-sm font-semibold text-muted hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4">
              {/* services */}
              <fieldset data-field="services">
                <legend className={LABEL}>What do you need?</legend>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((option) => {
                    const active = services.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={active}
                        onClick={() =>
                          setServices(
                            active
                              ? services.filter((item) => item !== option)
                              : [...services, option],
                          )
                        }
                        className={`btn-3d btn-3d--soft rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          active
                            ? "btn-3d--pink border-[#ff176e] text-[#050507]"
                            : "btn-3d--outline border-white/12 text-zinc-300 hover:border-[#ff176e]/50 hover:text-white"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {errors.services && (
                  <p role="alert" className="mt-2 text-xs text-[#ff8fbd]">
                    {errors.services}
                  </p>
                )}
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <div data-field="name">
                  <label htmlFor={`${uid}-name`} className={LABEL}>
                    Your name
                  </label>
                  <input
                    id={`${uid}-name`}
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Priya Sharma"
                    aria-invalid={Boolean(errors.name) || undefined}
                    className={`${FIELD} ${field("name")}`}
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1.5 text-xs text-[#ff8fbd]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div data-field="email">
                  <label htmlFor={`${uid}-email`} className={LABEL}>
                    Email
                  </label>
                  <input
                    id={`${uid}-email`}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email) || undefined}
                    className={`${FIELD} ${field("email")}`}
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1.5 text-xs text-[#ff8fbd]">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div data-field="residence">
                <label htmlFor={`${uid}-residence`} className={LABEL}>
                  Country of residence
                </label>
                <CountrySelect
                  id={`${uid}-residence`}
                  value={residence}
                  onChange={onResidenceChange}
                  invalid={Boolean(errors.residence)}
                  placeholder="Start typing a country…"
                  direction="up"
                />
                {errors.residence && (
                  <p role="alert" className="mt-1.5 text-xs text-[#ff8fbd]">
                    {errors.residence}
                  </p>
                )}
              </div>

              <div data-field="phone">
                <label htmlFor={`${uid}-phone`} className={LABEL}>
                  Phone / WhatsApp
                </label>
                <PhoneInput
                  dial={dial}
                  onDialChange={(next) => {
                    setDial(next);
                    setDialTouched(true);
                  }}
                  number={number}
                  onNumberChange={setNumber}
                  dialId={`${uid}-dial`}
                  numberId={`${uid}-phone`}
                  invalid={Boolean(errors.phone)}
                />
                {errors.phone && (
                  <p role="alert" className="mt-1.5 text-xs text-[#ff8fbd]">
                    {errors.phone}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-3d btn-3d--pink group mt-1 inline-flex w-full items-center justify-center gap-3 rounded-xl px-5 py-3.5 text-sm font-black text-[#050507] disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send my brief"}
                <Icon
                  name="arrowRight"
                  className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1"
                />
              </button>

              {failure && (
                <p role="alert" className="text-xs leading-relaxed text-[#ff8fbd]">
                  {failure}
                </p>
              )}

              <p className="text-center text-[11px] leading-relaxed text-subtle">
                One business day reply, from the team who would run the work. Or{" "}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#ff4b8f] transition hover:text-white"
                >
                  message us on WhatsApp
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
