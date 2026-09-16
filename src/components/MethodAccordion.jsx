"use client";

import { useState } from "react";
import { stages } from "@/lib/site";

export default function MethodAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
          03 / The launch sequence
        </p>
        <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
          From signal
          <br />{" "}
          to <span className="text-[#ff176e]">lift-off.</span>
        </h2>
        <p className="mt-7 max-w-md text-lg leading-relaxed text-zinc-400">
          Clear stages keep the work moving, keep decisions useful and keep your
          business close to the process.
        </p>
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
            Active stage
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="font-mono text-3xl font-bold text-[#ff176e]">
              {stages[active].num}
            </span>
            <div>
              <p className="font-bold text-white">{stages[active].title}</p>
              <p className="mt-1 text-sm text-muted">
                {stages[active].subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        {stages.map((stage, index) => {
          const isActive = index === active;
          return (
            <button
              key={stage.num}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={isActive}
              className={`group grid w-full gap-5 border-b border-white/10 py-8 text-left transition sm:grid-cols-[4rem_1fr_auto] sm:items-center ${
                isActive ? "text-white" : "text-muted hover:text-white"
              }`}
            >
              <span className={`font-mono text-sm ${isActive ? "text-[#ff4b8f]" : ""}`}>
                {stage.num}
              </span>
              <span>
                <span className="block text-2xl font-bold sm:text-3xl">
                  {stage.title}
                </span>
                <span className="mt-2 block leading-relaxed">
                  {stage.description}
                </span>
              </span>
              {/* The row is a flat list row, so the depth treatment belongs on
                  its trailing disc — that is the part that reads as a button.
                  The rotation lives on the glyph rather than on the disc so the
                  intent is explicit; the disc is radially symmetric, so
                  rotating it instead would look identical. */}
              <span
                className={`btn-3d flex h-11 w-11 items-center justify-center rounded-full ${
                  isActive
                    ? "btn-3d--pink text-[#050507]"
                    : "btn-3d--outline btn-3d--soft border border-white/10 group-hover:border-[#ff176e] group-hover:text-[#ff4b8f]"
                }`}
              >
                <span className="transition duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
