"use client";

import { COUNTRIES } from "@/lib/countries";

/**
 * PhoneInput — a dial-code picker paired with a number field.
 *
 * Kept fully controlled (`dial` + `number` in, change callbacks out) rather
 * than owning its own state, so the surrounding flow can seed the prefix from
 * the country of residence without fighting an effect for control of it.
 *
 * The prefix list is derived from the country table: one entry per unique
 * dialling code, labelled with the first country that uses it, sorted
 * numerically. Callers decide whether to nudge the prefix when residence
 * changes — most people never open this picker at all.
 */

/** Unique dialling codes, in numeric order, for the prefix select. */
export const DIAL_CODES = (() => {
  const byCode = new Map();
  for (const country of COUNTRIES) {
    if (!byCode.has(country.dial)) byCode.set(country.dial, country.name);
  }
  return [...byCode.entries()]
    .map(([dial, country]) => ({ dial, country }))
    .sort(
      (a, b) =>
        Number(a.dial.replace(/\D/g, "")) - Number(b.dial.replace(/\D/g, "")) ||
        a.dial.localeCompare(b.dial),
    );
})();

/** Joins the two halves into the single string the lead payload carries. */
export function composePhone(dial, number) {
  const digits = String(number || "").trim();
  return digits ? `${dial} ${digits}`.trim() : "";
}

/* Longest prefixes first, so "+1-268" wins over "+1" when splitting. */
const DIAL_BY_LENGTH = [...DIAL_CODES].sort(
  (a, b) => b.dial.length - a.dial.length,
);

/**
 * Splits a stored phone string back into prefix + number. Used when a visitor
 * returns to the phone step from the review screen, so their earlier answer is
 * still there to edit rather than a blank field.
 */
export function splitPhone(value, fallbackDial = "") {
  const text = String(value || "").trim();
  if (!text) return { dial: fallbackDial, number: "" };
  const match = DIAL_BY_LENGTH.find((entry) => text.startsWith(entry.dial));
  if (match) {
    return { dial: match.dial, number: text.slice(match.dial.length).trim() };
  }
  return { dial: fallbackDial, number: text };
}

export default function PhoneInput({
  dial,
  onDialChange,
  number,
  onNumberChange,
  dialId,
  numberId,
  invalid = false,
  describedBy,
  /* Deliberately generic, and deliberately not a real-looking number. An
     example here reads as a pre-filled value and gets submitted by accident,
     and any specific format hint would be wrong for most of the dial codes in
     the list beside it. Do not put the studio's own number in this field. */
  placeholder = "Your number",
  autoFocus = false,
}) {
  const border = invalid
    ? "border-[#ff8fbd]/70 focus-within:border-[#ff8fbd]"
    : "border-white/10 focus-within:border-[#ff176e]";

  return (
    <div
      className={`flex overflow-hidden rounded-xl border bg-[#0d0d13] transition focus-within:ring-2 focus-within:ring-[#ff176e]/30 ${border}`}
    >
      {/* `label` keeps the closed control showing just the dial code. Without
          it the select sizes itself to its widest option ("+1-809 Dominican
          Republic"), and `shrink-0` then lets it starve the number field —
          which collapsed to 24px on a 390px phone. The full country name still
          appears in the open list, where there is room for it. */}
      <select
        id={dialId}
        aria-label="Country dialling code"
        value={dial}
        onChange={(event) => onDialChange(event.target.value)}
        className="max-w-[7rem] shrink-0 border-r border-white/10 bg-transparent py-3 pl-3 pr-1 text-sm font-semibold text-white outline-none transition hover:bg-white/[0.03]"
      >
        {/* Only reachable when no residence country has been chosen yet. */}
        {!dial && <option value="">Code</option>}
        {DIAL_CODES.map((entry) => (
          <option
            key={entry.dial}
            value={entry.dial}
            label={entry.dial}
            className="bg-[#0d0d13]"
          >
            {entry.dial} {entry.country}
          </option>
        ))}
      </select>

      <input
        id={numberId}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        autoFocus={autoFocus}
        value={number}
        placeholder={placeholder}
        onChange={(event) => onNumberChange(event.target.value)}
        className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-white placeholder:text-subtle outline-none"
      />
    </div>
  );
}
