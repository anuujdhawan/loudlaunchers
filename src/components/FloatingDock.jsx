"use client";

import { useRef, useState } from "react";
import Icon from "./Icons";
import BackToTop from "./BackToTop";
import GuidedChat from "./GuidedChat";
import { site, whatsappLink } from "@/lib/site";

/**
 * FloatingDock — the bottom-right control column.
 *
 * Holds four stacked controls, in reach order from the bottom up:
 *   1. the tap-to-call bubble (phone + tablet only — see below)
 *   2. the guided chat launcher (primary)
 *   3. the WhatsApp redirect
 *   4. back-to-top, which only appears after the visitor has scrolled
 *
 * Keeping them in one flex column is what stops the bubbles and the existing
 * back-to-top button from fighting over the same corner. The column is anchored
 * to the viewport bottom, so appending a control grows it upward and lifts
 * everything above it — no manual offsets to keep in sync.
 *
 * WhatsApp and the phone number are plain links rather than buttons so they
 * work with middle-click, long-press and "open in new tab" like any other link.
 *
 * The call bubble is `lg:hidden`: below `lg` it is the shortest route to a human,
 * and from `lg` up the header already carries the number in plain sight, so a
 * third saturated circle would only add noise to the corner.
 */
export default function FloatingDock() {
  const [chatOpen, setChatOpen] = useState(false);
  const chatButtonRef = useRef(null);

  /* Returning focus to the launcher after closing keeps keyboard navigation
     where the visitor left it instead of dumping them at the top of the page. */
  function closeChat() {
    setChatOpen(false);
    window.requestAnimationFrame(() => chatButtonRef.current?.focus());
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-2.5 sm:bottom-7 sm:right-7">
      <BackToTop className="pointer-events-auto" />

      {/* ------------------------------------------------------ WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message Loud Launchers on WhatsApp at ${site.whatsapp.display}`}
        className="bubble-3d bubble-3d--whatsapp group pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#050507] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#0b0b11] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
        >
          WhatsApp us
        </span>
        <Icon name="whatsapp" className="h-6 w-6" />
      </a>

      {/* ---------------------------------------------------------- Chat */}
      <div className="pointer-events-auto relative">
        <GuidedChat open={chatOpen} onClose={closeChat} />

        <button
          ref={chatButtonRef}
          type="button"
          onClick={() => (chatOpen ? closeChat() : setChatOpen(true))}
          aria-label={chatOpen ? "Close the guided chat" : "Open the guided chat"}
          aria-expanded={chatOpen}
          className="bubble-3d bubble-3d--chat group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#ff176e] text-[#050507] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#0b0b11] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
          >
            {chatOpen ? "Close chat" : "Get a launch plan"}
          </span>
          <Icon
            name={chatOpen ? "close" : "chat"}
            className="h-6 w-6"
            strokeWidth={1.9}
          />
        </button>
      </div>

      {/* ---------------------------------------------------------- Call
          Last in the column, so it sits under the two bubbles and lifts them
          as it appears. Violet is the third colour of the brand gradient, which
          keeps it on-palette while staying distinct from WhatsApp green and the
          chat pink. `#050507` on `#b356ff` is 5.5:1 — the same dark-on-bright
          convention the other two bubbles use. */}
      <a
        href={`tel:${site.phone}`}
        aria-label={`Call Loud Launchers on ${site.phoneDisplay}`}
        className="bubble-3d bubble-3d--call group pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-[#b356ff] text-[#050507] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 lg:hidden"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#0b0b11] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
        >
          Call us
        </span>
        <Icon name="phone" className="h-6 w-6" strokeWidth={1.9} />
      </a>
    </div>
  );
}
