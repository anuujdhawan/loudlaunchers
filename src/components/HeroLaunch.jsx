"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const MISSION_WORDS = [
  "Create impact",
  "Build momentum",
  "Make it memorable",
  "Launch with purpose",
];

/**
 * HeroLaunch — the animated logo launch module from the reference template:
 * faint logo watermark, orbiting rings, a logo "rocket" that periodically
 * ignites (shockwave, plume, engine glow, lift-off bounce), HUD cards and a
 * replay trigger. Ported 1:1 from the template's ignition sequence.
 */
export default function HeroLaunch() {
  const shockwaveRef = useRef(null);
  const rocketRef = useRef(null);
  const plumeRef = useRef(null);
  const engineRef = useRef(null);
  const watermarkRef = useRef(null);
  const ignitionTimeouts = useRef([]);
  const [entered, setEntered] = useState(false);
  const [missionIndex, setMissionIndex] = useState(0);
  const [missionFading, setMissionFading] = useState(false);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resetLaunchState = useCallback(() => {
    ignitionTimeouts.current.forEach(clearTimeout);
    ignitionTimeouts.current = [];

    const rocket = rocketRef.current;
    const plume = plumeRef.current;
    const engine = engineRef.current;
    const watermark = watermarkRef.current;
    const shockwave = shockwaveRef.current;

    rocket?.classList.remove(
      "translate-y-6",
      "-translate-y-8",
      "-translate-y-1",
      "scale-[0.96]",
      "scale-[1.03]",
    );
    rocket?.classList.add("translate-y-3");
    plume?.classList.remove("scale-y-[1.45]", "scale-y-75", "opacity-100", "opacity-40");
    plume?.classList.add("scale-y-50", "opacity-20");
    engine?.classList.remove("scale-125", "scale-90", "opacity-100", "opacity-50");
    engine?.classList.add("scale-75", "opacity-40");
    watermark?.classList.remove("scale-105", "opacity-[0.1]");
    watermark?.classList.add("opacity-[0.055]");
    shockwave?.classList.remove("duration-1000", "scale-125", "opacity-70");
    shockwave?.classList.add("scale-50", "opacity-0");
  }, []);

  const ignite = useCallback(() => {
    if (prefersReducedMotion() || document.hidden) return;
    resetLaunchState();

    const rocket = rocketRef.current;
    const plume = plumeRef.current;
    const engine = engineRef.current;
    const watermark = watermarkRef.current;
    const shockwave = shockwaveRef.current;

    // Retrigger the shockwave transition from a collapsed state.
    shockwave?.classList.add("duration-0", "opacity-70");
    shockwave?.classList.remove("opacity-0");
    void shockwave?.offsetWidth;
    shockwave?.classList.remove("duration-0", "scale-50", "opacity-70");
    shockwave?.classList.add("duration-1000", "scale-125", "opacity-0");

    // Crouch.
    rocket?.classList.remove("translate-y-3");
    rocket?.classList.add("translate-y-6", "scale-[0.96]");
    plume?.classList.remove("scale-y-50", "opacity-20");
    plume?.classList.add("scale-y-[1.45]", "opacity-100");
    engine?.classList.remove("scale-75", "opacity-40");
    engine?.classList.add("scale-125", "opacity-100");
    watermark?.classList.remove("opacity-[0.055]");
    watermark?.classList.add("scale-105", "opacity-[0.1]");

    // Blast off.
    ignitionTimeouts.current.push(
      setTimeout(() => {
        rocket?.classList.remove("translate-y-6", "scale-[0.96]");
        rocket?.classList.add("-translate-y-8", "scale-[1.03]");
      }, 230),
    );

    // Settle.
    ignitionTimeouts.current.push(
      setTimeout(() => {
        rocket?.classList.remove("-translate-y-8", "scale-[1.03]");
        rocket?.classList.add("-translate-y-1");
        plume?.classList.remove("scale-y-[1.45]", "opacity-100");
        plume?.classList.add("scale-y-75", "opacity-40");
        engine?.classList.remove("scale-125", "opacity-100");
        engine?.classList.add("scale-90", "opacity-50");
        watermark?.classList.remove("scale-105", "opacity-[0.1]");
        watermark?.classList.add("opacity-[0.055]");
      }, 900),
    );

    ignitionTimeouts.current.push(setTimeout(resetLaunchState, 1550));
  }, [resetLaunchState]);

  // Entrance, ignition loop, replay button.
  useEffect(() => {
    // Reduced motion: skip the animation and show the module immediately.
    if (prefersReducedMotion()) {
      const show = setTimeout(() => setEntered(true), 0);
      return () => clearTimeout(show);
    }
    const entrance = setTimeout(() => setEntered(true), 450);
    const firstIgnition = setTimeout(ignite, 1300);
    const loop = setInterval(ignite, 6200);
    return () => {
      clearTimeout(entrance);
      clearTimeout(firstIgnition);
      clearInterval(loop);
    };
  }, [ignite]);

  // Clean up any in-flight ignition timeouts.
  useEffect(() => {
    return () => {
      ignitionTimeouts.current.forEach(clearTimeout);
      ignitionTimeouts.current = [];
    };
  }, []);

  // Rotating "current mission" word.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const timer = setInterval(() => {
      setMissionFading(true);
      setTimeout(() => {
        setMissionIndex((index) => (index + 1) % MISSION_WORDS.length);
        setMissionFading(false);
      }, 300);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[43rem] items-center justify-center lg:-mr-6">
      {/* Faint logo watermark that brightens during ignition */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[19%] h-[62%] w-[62%] opacity-[0.055] blur-[1px] transition duration-1000 ease-out will-change-transform"
      >
        <Image
          src="/logo-full.webp"
          alt=""
          fill
          sizes="27rem"
          className="object-contain"
        />
      </div>

      {/* Orbit rings */}
      <div
        aria-hidden="true"
        className="absolute inset-[4%] rounded-full border border-white/10 motion-safe:animate-spin [animation-duration:38s]"
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff176e] shadow-[0_0_24px_6px_rgba(255,23,110,.7)]" />
        <span className="absolute bottom-[12%] right-[9%] h-1.5 w-1.5 rounded-full bg-violet-400" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-[15%] rounded-full border border-dashed border-[#ff176e]/25 motion-safe:animate-spin [animation-direction:reverse] [animation-duration:26s]"
      >
        <span className="absolute left-[8%] top-[25%] h-2 w-2 rounded-full bg-white shadow-[0_0_18px_4px_rgba(255,255,255,.5)]" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-[27%] rounded-full border border-white/10 motion-safe:animate-pulse [animation-duration:4s]"
      />

      {/* Launch module */}
      <div
        className={`relative z-10 transition duration-[1400ms] ease-out ${
          entered ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute -inset-16 -z-10 rounded-full bg-[#ff176e]/20 blur-3xl motion-safe:animate-pulse [animation-duration:3s]"
        />
        <div className="relative flex h-52 w-80 items-center justify-center sm:h-60 sm:w-[24rem]">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-28 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff176e]/25 blur-3xl motion-safe:animate-pulse [animation-duration:3s]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-3 top-1/2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-[0_0_24px_4px_rgba(255,23,110,.5)]"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-2 h-[calc(100%-1rem)] w-[calc(100%-2rem)] -translate-x-1/2 rounded-[50%] border border-[#ff176e]/20"
          />
          <span
            id="launch-shockwave"
            ref={shockwaveRef}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-44 w-72 -translate-x-1/2 -translate-y-1/2 scale-50 rounded-[50%] border border-[#ff176e]/70 opacity-0 transition duration-1000"
          />
          <div
            ref={rocketRef}
            className="relative z-20 flex h-full w-full translate-y-3 items-center justify-center transition duration-700 ease-out will-change-transform"
          >
            <Image
              src="/logo-full.webp"
              alt="Loud Launchers"
              width={512}
              height={512}
              priority
              className="h-auto w-[19rem] object-contain drop-shadow-[0_0_20px_rgba(255,23,110,.5)] sm:w-[22rem]"
            />
          </div>
          <div
            ref={plumeRef}
            aria-hidden="true"
            className="absolute left-1/2 top-[72%] z-10 flex h-28 w-20 -translate-x-1/2 origin-top scale-y-50 justify-center gap-1 opacity-20 transition duration-500"
          >
            <span className="h-20 w-2 rounded-full bg-gradient-to-b from-white via-[#ff4b8f] to-transparent blur-[1px]" />
            <span className="h-28 w-3 rounded-full bg-gradient-to-b from-[#ff8fbd] via-[#ff176e] to-transparent blur-sm motion-safe:animate-pulse" />
            <span className="h-16 w-1.5 rounded-full bg-gradient-to-b from-white via-violet-400 to-transparent blur-[1px]" />
          </div>
          <span
            ref={engineRef}
            aria-hidden="true"
            className="absolute bottom-2 left-1/2 h-3 w-28 -translate-x-1/2 scale-75 rounded-full bg-[#ff176e]/60 opacity-40 blur-md transition duration-500"
          />
        </div>
        <div className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[#ff176e]/30 bg-[#0b0b10]/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-pink-200 backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff176e] motion-safe:animate-pulse" />
          Launch system online
        </div>
      </div>

      {/* Vertical light beam */}
      <div
        aria-hidden="true"
        className="absolute bottom-[2%] left-1/2 h-[28%] w-px -translate-x-1/2 bg-gradient-to-b from-[#ff176e] via-[#ff176e]/60 to-transparent opacity-80 shadow-[0_0_25px_4px_rgba(255,23,110,.45)]"
      />

      {/* HUD: ideas → momentum */}
      <div className="absolute bottom-[6%] left-[4%] hidden items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl sm:flex">
        <span className="font-mono text-xs text-[#ff4b8f]">01</span>
        <span className="text-xs font-medium text-zinc-300">
          Ideas → momentum
        </span>
      </div>

      {/* HUD: current mission (rotating) */}
      <div className="absolute right-[2%] top-[12%] hidden rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl sm:block">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Current mission
        </p>
        <p
          className={`mt-1 font-mono text-sm text-white transition duration-300 ${
            missionFading ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {MISSION_WORDS[missionIndex]}
        </p>
      </div>

      {/* Replay ignition */}
      <button
        type="button"
        onClick={ignite}
        className="group absolute bottom-[5%] right-[3%] hidden items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 backdrop-blur-xl transition hover:border-[#ff176e]/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-400 sm:flex"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff176e] text-white transition group-hover:scale-110">
          ↑
        </span>
        Replay ignition
      </button>
    </div>
  );
}
