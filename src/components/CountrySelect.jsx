"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { resolveCountry, searchCountries } from "@/lib/countries";
import Icon from "./Icons";

/**
 * CountrySelect — a searchable country picker built as a real ARIA combobox.
 *
 * A native <select> with ~200 options is painful on desktop, and a plain text
 * field invites typos into your CRM, so this does both jobs: free typing with
 * ranked results, plus keyboard navigation that behaves the way a select does.
 *
 * Keyboard: Down/Up move the highlight, Enter selects, Escape closes the list
 * *only* (it calls preventDefault so a surrounding panel's Escape handler can
 * tell the difference and stay open), Tab commits and moves on.
 *
 * `value` is the chosen country name, or whatever the visitor has typed so far.
 * Callers should validate with `resolveCountry()` from @/lib/countries rather
 * than trusting the string.
 *
 * `direction` picks which way the list opens. Both current call sites ask for
 * "up": the chat panel pins its control to the bottom of a clipped panel with
 * no room beneath it, and the modal's country field sits mid-form with only
 * about 180px below — less than the list needs. The default stays "down" for
 * future call sites that have the space.
 */
export default function CountrySelect({
  id,
  value = "",
  onChange,
  placeholder = "Start typing a country…",
  invalid = false,
  className = "",
  autoFocus = false,
  describedBy,
  direction = "down",
}) {
  const reactId = useId();
  const fieldId = id || `${reactId}-country`;
  const listId = `${fieldId}-list`;

  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const listRef = useRef(null);

  /* Keep the field in step when the answer changes from outside — for example
     when the review step sends the visitor back to an earlier question.
     Adjusting state during render is the React-documented alternative to a
     setState-in-effect, and avoids a frame of stale text. */
  const [lastValue, setLastValue] = useState(value);
  if (value !== lastValue) {
    setLastValue(value);
    setQuery(value);
  }

  const results = useMemo(() => searchCountries(query), [query]);

  /* Reset the highlight whenever the result set changes under it. */
  const [lastQuery, setLastQuery] = useState(query);
  if (query !== lastQuery) {
    setLastQuery(query);
    setActive(0);
  }

  const resolved = resolveCountry(value);
  const committed =
    resolved &&
    resolved.name.toLowerCase() === String(query).trim().toLowerCase();

  /* Close when the pointer goes down anywhere outside. */
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  /* Keep the highlighted option inside the scroll viewport. */
  useEffect(() => {
    if (!open || !listRef.current) return;
    const node = listRef.current.querySelector(`[data-index="${active}"]`);
    if (node) node.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function choose(country) {
    onChange?.(country.name);
    setQuery(country.name);
    setOpen(false);
  }

  function onKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActive((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      if (open && results[active]) {
        event.preventDefault();
        choose(results[active]);
      }
    } else if (event.key === "Escape") {
      if (open) {
        /* Consume it so the chat panel or modal stays open — only the list
           should close on the first Escape. */
        event.preventDefault();
        setOpen(false);
      }
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          id={fieldId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-invalid={invalid || undefined}
          aria-activedescendant={
            open && results[active] ? `${listId}-opt-${active}` : undefined
          }
          aria-describedby={describedBy}
          autoComplete="off"
          autoFocus={autoFocus}
          value={query}
          placeholder={placeholder}
          onChange={(event) => {
            setQuery(event.target.value);
            onChange?.(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={`w-full rounded-xl border bg-[#0d0d13] py-3 pl-10 pr-10 text-sm text-white placeholder:text-subtle transition focus:outline-none focus:ring-2 ${
            invalid
              ? "border-[#ff8fbd]/70 focus:border-[#ff8fbd] focus:ring-[#ff8fbd]/30"
              : "border-white/10 focus:border-[#ff176e] focus:ring-[#ff176e]/30"
          }`}
        />
        <Icon
          name="globe"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
        />
        {committed ? (
          <Icon
            name="check"
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff4b8f]"
          />
        ) : (
          <Icon
            name="chevronDown"
            className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle transition duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label="Countries"
          className="thin-scrollbar absolute left-0 right-0 z-30 max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-[#0b0b11] p-1.5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl"
          style={
            direction === "up"
              ? { bottom: "calc(100% + 0.35rem)" }
              : { top: "calc(100% + 0.35rem)" }
          }
        >
          {results.length === 0 && (
            <li className="px-3 py-3 text-sm text-muted">
              No countries match that. Try a different spelling.
            </li>
          )}
          {results.map((country, index) => {
            const isActive = index === active;
            const isSelected = committed && resolved?.code === country.code;
            return (
              <li key={country.code}>
                <button
                  type="button"
                  data-index={index}
                  id={`${listId}-opt-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(country)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    isActive ? "bg-white/[0.07] text-white" : "text-zinc-300"
                  }`}
                >
                  <span className="truncate">{country.name}</span>
                  <span className="shrink-0 font-mono text-[11px] text-subtle">
                    {country.dial}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
