"use client";

import { openLead } from "@/lib/lead";

/**
 * LeadTrigger — a button that opens the lead modal.
 *
 * This exists as its own client component so that server components (the
 * footer, the services pages, the blog sidebar) can render a working trigger
 * without becoming client components themselves or importing the event bus.
 * Style it with `className` exactly as you would any other button.
 */
export default function LeadTrigger({
  children,
  className = "",
  source = "cta",
  ...props
}) {
  return (
    <button
      type="button"
      onClick={() => openLead(source)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
