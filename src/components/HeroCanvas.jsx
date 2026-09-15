"use client";

import { useEffect, useRef } from "react";

/**
 * HeroCanvas — dependency-free particle launch field (Canvas 2D).
 * Particles drift upward like ignition sparks around the hero copy.
 * Pauses when the tab is hidden and renders a single static frame when the
 * user prefers reduced motion.
 */
export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let particles = [];
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (initial) => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 12,
      r: Math.random() * 2.2 + 0.6,
      speed: Math.random() * 0.9 + 0.35,
      drift: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.55 + 0.2,
      hue: Math.random() > 0.25 ? "255,23,110" : "179,86,255",
    });

    const seed = () => {
      const count = Math.min(Math.floor((width * height) / 16000), 110);
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${p.alpha})`;
        ctx.fill();

        if (!reducedMotion) {
          p.y -= p.speed;
          p.x += p.drift;
          p.alpha -= 0.0012;
          if (p.y < -12 || p.alpha <= 0.02) {
            Object.assign(p, spawn(false));
          }
        }
      });
    };

    const loop = () => {
      if (!running) return;
      drawFrame();
      raf = window.requestAnimationFrame(loop);
    };

    resize();
    seed();
    drawFrame();

    if (!reducedMotion) {
      raf = window.requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      seed();
      drawFrame();
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(raf);
      } else if (!reducedMotion) {
        running = true;
        raf = window.requestAnimationFrame(loop);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-20 h-full w-full"
    />
  );
}
