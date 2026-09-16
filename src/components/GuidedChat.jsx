"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Icon from "./Icons";
import CountrySelect from "./CountrySelect";
import PhoneInput, { composePhone, splitPhone } from "./PhoneInput";
import { resolveCountry } from "@/lib/countries";
import {
  CHAT_STEPS,
  SERVICE_OPTIONS,
  formatAnswer,
  reviewRows,
  submitLead,
} from "@/lib/lead";
import { site, whatsappLink } from "@/lib/site";

/**
 * GuidedChat — the scripted lead-qualification assistant.
 *
 * The conversation lives in `CHAT_STEPS` (@/lib/lead); this component renders
 * it. It walks the steps one at a time, then presents a review card the visitor
 * can amend before sending.
 *
 * Two design notes worth keeping if you edit this:
 *
 *  - The transcript is *derived* from `stepIndex` + `values` rather than stored
 *    in a message array. Appending to a log from an effect would mean calling
 *    setState inside an effect on every step change, which triggers cascading
 *    renders (and fails the react-hooks/set-state-in-effect rule). Deriving it
 *    also means editing an earlier answer rewrites history correctly for free.
 *
 *  - Positioning is handled by the parent dock, which renders this inside a
 *    `relative` wrapper. On desktop the panel hangs above the launcher bubble;
 *    on phones it fills the viewport so the on-screen keyboard cannot cover the
 *    field being typed into.
 */

const REVIEW_INDEX = CHAT_STEPS.findIndex((step) => step.control === "review");

/* ------------------------------------------------------------------ */
/* Viewport mode                                                       */
/* ------------------------------------------------------------------ */
/* The panel is a popover on desktop but fills the screen on phones.    */
/* That one difference decides two behaviours that must not drift       */
/* apart: whether the page behind may scroll, and whether this counts   */
/* as a modal dialog that has to hold focus. Both read this one query.  */
/*                                                                     */
/* `useSyncExternalStore` is used rather than a state-plus-effect pair  */
/* so the first client render already knows the real value, and the     */
/* `react-hooks/set-state-in-effect` rule stays satisfied. The server   */
/* snapshot is `false`, matching the desktop-first markup.              */
/* ------------------------------------------------------------------ */
const PHONE_QUERY = "(max-width: 639px)";

function subscribePhoneQuery(onChange) {
  const query = window.matchMedia(PHONE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getPhoneSnapshot() {
  return window.matchMedia(PHONE_QUERY).matches;
}

function getPhoneServerSnapshot() {
  return false;
}

/** Turns "{name}" in bot copy into the first name already given, if any. */
function interpolate(text, values) {
  if (!text.includes("{name}")) return text;
  const first = String(values.name || "")
    .trim()
    .split(/\s+/)[0];
  return text.replaceAll("{name}", first || "there");
}

/** The working value a step starts from when it is entered. */
function initialDraft(step, values) {
  switch (step.control) {
    case "services":
      return Array.isArray(values.services) ? [...values.services] : [];
    case "phone":
      return splitPhone(
        values.phone,
        resolveCountry(values.residence)?.dial || "",
      );
    default:
      return values[step.key] || "";
  }
}

/**
 * Rebuilds the visible conversation for the current position.
 *
 * Walking back from the review screen re-asks one question, so the answer to
 * that step is deliberately left out — it is about to be replaced.
 */
function buildTranscript(stepIndex, values, editing) {
  const items = [];
  for (let index = 0; index <= stepIndex; index += 1) {
    const step = CHAT_STEPS[index];
    if (!step) continue;
    const isCurrent = index === stepIndex;
    const lines = isCurrent && editing ? step.bot.slice(-1) : step.bot;
    lines.forEach((text, line) => {
      items.push({ key: `b${index}-${line}`, from: "bot", text });
    });
    if (step.control !== "review" && values[step.key] !== undefined) {
      if (!(isCurrent && editing)) {
        items.push({
          key: `u${index}`,
          from: "user",
          text: formatAnswer(step.key, values[step.key]),
        });
      }
    }
  }
  return items;
}

export default function GuidedChat({ open, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState({});
  const [draftState, setDraftState] = useState(() => ({
    step: 0,
    value: initialDraft(CHAT_STEPS[0], {}),
  }));
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [returnToReview, setReturnToReview] = useState(false);

  const panelRef = useRef(null);
  const logRef = useRef(null);

  const isPhone = useSyncExternalStore(
    subscribePhoneQuery,
    getPhoneSnapshot,
    getPhoneServerSnapshot,
  );

  const step = CHAT_STEPS[stepIndex];
  const isReview = step?.control === "review";
  const isDone = status === "done";

  /* Entering a step resets its working value. Adjusting state during render is
     the documented alternative to a setState-in-effect here: it avoids the
     extra commit and the frame of the previous step's answer showing through. */
  if (draftState.step !== stepIndex) {
    setDraftState({
      step: stepIndex,
      value: initialDraft(CHAT_STEPS[stepIndex], values),
    });
    setError("");
  }

  const draft =
    draftState.step === stepIndex
      ? draftState.value
      : initialDraft(CHAT_STEPS[stepIndex], values);

  const transcript = buildTranscript(stepIndex, values, returnToReview);

  function setDraft(next) {
    setDraftState((previous) => ({
      step: stepIndex,
      value:
        typeof next === "function" ? next(previous.value) : next,
    }));
  }

  /* Keep the newest exchange in view. */
  useEffect(() => {
    const node = logRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [stepIndex, values, status, transcript.length]);

  /* Move focus into the panel when it opens, so keyboard and screen-reader
     users land in the conversation rather than behind it. */
  useEffect(() => {
    if (!open) return;
    const node = panelRef.current;
    if (node) node.focus({ preventScroll: true });
  }, [open]);

  /* Escape closes, unless a nested control (the country combobox) consumed it. */
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !event.defaultPrevented) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  /* On phones the panel covers the viewport, so stop the page scrolling behind
     it. Desktop leaves the page alone — the panel is a popover there. */
  useEffect(() => {
    if (!open || !isPhone) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, isPhone]);

  /* Full-screen on a phone means this is a modal, so Tab must stay inside it.
     Without this, focus walked out of the panel and onto controls hidden
     behind it — the launcher bubble, the skip link, the header nav — so a
     keyboard user lost their place with no way to see where they were.
     Desktop deliberately stays a non-modal popover: the page remains usable
     while the chat is open, so focus is free to leave. */
  useEffect(() => {
    if (!open || !isPhone) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const nodes = Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]):not([tabindex="-1"]), input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
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
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, isPhone]);

  function reset() {
    setStepIndex(0);
    setValues({});
    setDraftState({ step: 0, value: initialDraft(CHAT_STEPS[0], {}) });
    setError("");
    setStatus("idle");
    setReturnToReview(false);
  }

  function handleClose() {
    onClose();
    /* A finished conversation should start clean next time; an abandoned one
       keeps its place so the visitor can pick up where they left off. */
    if (status === "done") window.setTimeout(reset, 300);
  }

  /** The value the current step's control is holding. */
  function currentAnswer() {
    if (step.control === "phone") return composePhone(draft.dial, draft.number);
    return draft;
  }

  function commit(event) {
    event?.preventDefault();
    if (!step || isReview) return;

    const answer = currentAnswer();
    const problem = step.validate ? step.validate(answer) : null;
    if (problem) {
      setError(problem);
      return;
    }

    setError("");
    setValues((previous) => ({ ...previous, [step.key]: answer }));

    if (returnToReview) {
      setReturnToReview(false);
      setStepIndex(REVIEW_INDEX);
    } else {
      setStepIndex((index) => Math.min(index + 1, REVIEW_INDEX));
    }
  }

  function editStep(key) {
    const index = CHAT_STEPS.findIndex((entry) => entry.key === key);
    if (index < 0) return;
    setReturnToReview(true);
    setStepIndex(index);
  }

  async function send() {
    setStatus("sending");
    setError("");
    try {
      await submitLead(values, "guided chat");
      setStatus("done");
    } catch {
      setStatus("error");
      setError(
        "That didn't send. Try again, or message us on WhatsApp and we'll take it from there.",
      );
    }
  }

  /* ------------------------------------------------------------ controls */

  function renderControl() {
    if (!step) return null;

    if (step.control === "services") {
      const chosen = Array.isArray(draft) ? draft : [];
      return (
        <fieldset>
          <legend className="sr-only">{step.label}</legend>
          <div className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map((option) => {
              const active = chosen.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setDraft(
                      active
                        ? chosen.filter((item) => item !== option)
                        : [...chosen, option],
                    )
                  }
                  className={`btn-3d btn-3d--soft rounded-full border px-3.5 py-2 text-xs font-semibold ${
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
        </fieldset>
      );
    }

    if (step.control === "country") {
      return (
        <CountrySelect
          id={`chat-${step.key}`}
          value={draft}
          onChange={setDraft}
          invalid={Boolean(error)}
          placeholder="Start typing a country…"
          direction="up"
        />
      );
    }

    if (step.control === "phone") {
      return (
        <PhoneInput
          dial={draft.dial}
          onDialChange={(next) => setDraft((prev) => ({ ...prev, dial: next }))}
          number={draft.number}
          onNumberChange={(next) =>
            setDraft((prev) => ({ ...prev, number: next }))
          }
          dialId={`chat-${step.key}-dial`}
          numberId={`chat-${step.key}-number`}
          invalid={Boolean(error)}
        />
      );
    }

    return (
      <input
        id={`chat-${step.key}`}
        type={step.control === "email" ? "email" : "text"}
        inputMode={step.control === "email" ? "email" : "text"}
        autoComplete={
          step.control === "email"
            ? "email"
            : step.key === "name"
              ? "name"
              : "off"
        }
        value={draft}
        placeholder={step.placeholder}
        aria-label={step.label}
        aria-invalid={Boolean(error) || undefined}
        onChange={(event) => setDraft(event.target.value)}
        className={`w-full rounded-xl border bg-[#0d0d13] px-3.5 py-3 text-sm text-white placeholder:text-subtle transition focus:outline-none focus:ring-2 ${
          error
            ? "border-[#ff8fbd]/70 focus:border-[#ff8fbd] focus:ring-[#ff8fbd]/30"
            : "border-white/10 focus:border-[#ff176e] focus:ring-[#ff176e]/30"
        }`}
      />
    );
  }

  function renderReview() {
    return (
      <>
        <dl className="grid gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
          {reviewRows(values).map((row) => (
            <div key={row.key} className="flex items-center justify-between gap-3">
              <dt className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                {row.label}
              </dt>
              <dd className="flex min-w-0 items-center gap-1.5 text-right">
                <span className="min-w-0 break-words text-xs font-semibold text-white">
                  {row.value}
                </span>
                <button
                  type="button"
                  onClick={() => editStep(row.key)}
                  aria-label={`Edit ${row.label}`}
                  className="btn-3d btn-3d--ghost btn-3d--soft shrink-0 rounded-lg p-1 text-subtle hover:bg-white/[0.06] hover:text-[#ff4b8f]"
                >
                  <Icon name="pencil" className="h-3.5 w-3.5" />
                </button>
              </dd>
            </div>
          ))}
        </dl>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-3d btn-3d--pink group inline-flex w-full items-center justify-center gap-3 rounded-xl px-5 py-3.5 text-sm font-black text-[#050507] disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send my brief"}
          <Icon
            name="arrowRight"
            className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1"
          />
        </button>

        <p className="text-center text-[11px] leading-relaxed text-subtle">
          No spam, no drip sequence. A real reply within one business day.
        </p>
      </>
    );
  }

  function renderSuccess() {
    const handoff = whatsappLink(
      [
        `Hi ${site.name} — I'm ${values.name}. I just sent a brief through the website.`,
        "",
        `Services: ${formatAnswer("services", values.services)}`,
        `Country of origin: ${formatAnswer("origin", values.origin)}`,
        `Country of residence: ${formatAnswer("residence", values.residence)}`,
        `Email: ${formatAnswer("email", values.email)}`,
        `Phone: ${formatAnswer("phone", values.phone)}`,
      ].join("\n"),
    );

    return (
      <div className="rounded-2xl border border-[#ff176e]/30 bg-gradient-to-br from-[#1c0a14] to-[#0d0d13] p-5">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ff176e] text-[#050507]">
          <Icon name="check" className="h-5 w-5" strokeWidth={2.4} />
        </span>
        <p className="mt-4 text-base font-black uppercase tracking-[-0.01em] text-white">
          Brief received
        </p>
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
          Thanks{values.name ? `, ${String(values.name).split(/\s+/)[0]}` : ""} —
          that&apos;s with the team. Expect a reply within one business day, and
          usually sooner.
        </p>
        <div className="mt-5 grid gap-2">
          <a
            href={handoff}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d btn-3d--outline inline-flex items-center justify-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-400/15"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={handleClose}
            className="btn-3d btn-3d--ghost rounded-xl px-4 py-2.5 text-sm font-semibold text-muted hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={isPhone || undefined}
      aria-label="Guided project chat"
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 top-3 z-[70] flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b11] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)] outline-none sm:absolute sm:inset-x-auto sm:bottom-full sm:right-0 sm:top-auto sm:mb-3 sm:h-[min(78vh,40rem)] sm:w-[24rem]"
    >
      {/* --------------------------------------------------------- header */}
      <div className="relative flex shrink-0 items-center gap-3 border-b border-white/10 bg-white/[0.02] px-4 py-3.5">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff176e] to-[#b356ff] text-[#050507]">
          <Icon name="rocket" className="h-4 w-4" strokeWidth={1.8} />
          {!isDone && (
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0b0b11] bg-emerald-400" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-tight text-white">Nova</p>
          <p className="truncate text-[11px] text-muted">
            {isDone ? "Brief sent" : "Launch assistant · replies instantly"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close chat"
          className="btn-3d btn-3d--ghost btn-3d--soft flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-white/[0.06] hover:text-white"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>
      </div>

      {/* ----------------------------------------------------- transcript */}
      <div
        ref={logRef}
        className="thin-scrollbar flex-1 overflow-y-auto px-4 py-5"
      >
        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="grid gap-2.5"
        >
          {transcript.map((message) =>
            message.from === "bot" ? (
              <p
                key={message.key}
                className="max-w-[92%] rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2.5 text-sm leading-relaxed text-zinc-200"
              >
                {interpolate(message.text, values)}
              </p>
            ) : (
              <p
                key={message.key}
                className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-[#ff176e] px-3.5 py-2.5 text-sm font-semibold text-[#050507]"
              >
                {message.text}
              </p>
            ),
          )}
        </div>

      </div>

      {/* --------------------------------------------------- active control */}
      {/* Pinned below the transcript rather than inline inside it. The country
          combobox opens upward, and a menu rendered inside a scroll container
          would be clipped by that container's bounds. */}
      <div className="shrink-0 border-t border-white/10 bg-white/[0.02] px-4 py-4">
        {isDone
          ? renderSuccess()
          : step && (
              <form
                onSubmit={
                  isReview
                    ? (event) => {
                        event.preventDefault();
                        send();
                      }
                    : commit
                }
                className="grid gap-3"
              >
                {isReview ? renderReview() : renderControl()}

                {!isReview && (
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-3d btn-3d--pink group inline-flex w-full items-center justify-center gap-3 rounded-xl px-5 py-3 text-sm font-black text-[#050507] disabled:pointer-events-none disabled:opacity-60"
                  >
                    {step.control === "services" || step.control === "country"
                      ? "Continue"
                      : "Next"}
                    <Icon
                      name="arrowRight"
                      className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1"
                    />
                  </button>
                )}

                {error && (
                  <p
                    role="alert"
                    className="text-xs leading-relaxed text-[#ff8fbd]"
                  >
                    {error}
                  </p>
                )}
              </form>
            )}
      </div>

      {/* --------------------------------------------------------- progress */}
      {!isDone && (
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {Array.from({ length: REVIEW_INDEX + 1 }).map((_, index) => (
              <span
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index < stepIndex
                    ? "w-4 bg-[#ff176e]"
                    : index === stepIndex
                      ? "w-6 bg-[#ff4b8f]"
                      : "w-2 bg-white/15"
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] font-semibold text-muted">
            Step {Math.min(stepIndex + 1, REVIEW_INDEX + 1)} of {REVIEW_INDEX + 1}
          </p>
        </div>
      )}
    </div>
  );
}
