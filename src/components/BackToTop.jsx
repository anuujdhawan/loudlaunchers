"use client";

import { useEffect, useState } from "react";
import Icon from "./Icons";

/**
 * Floating "back to top" control, shown once the visitor has scrolled a screen
 * or so. It is deliberately *not* self-positioning: FloatingDock owns the
 * bottom-right corner and stacks this above the chat and WhatsApp bubbles, so
 * there is one place to reason about what overlaps what.
 */
export default function BackToTop({ className = "" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`btn-3d btn-3d--outline btn-3d--reveal flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#0b0b10]/90 text-zinc-300 backdrop-blur-xl hover:border-[#ff176e]/60 hover:text-white ${className} ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Icon name="arrowUp" className="h-4 w-4" />
    </button>
  );
}
