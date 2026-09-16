"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal — fades/slides children in when they enter the viewport.
 * Uses IntersectionObserver; respects prefers-reduced-motion by showing
 * content immediately.
 *
 * Any extra props (id, aria-*, data-*) are forwarded to the rendered tag so
 * the wrapper can double as an anchor target or landmark.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      {...rest}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:opacity-100 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
