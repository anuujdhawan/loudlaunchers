"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/#difference", label: "Why Loud" },
  { href: "/#services", label: "Capabilities" },
  { href: "/#method", label: "Process" },
  { href: "/blog", label: "Insights" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  // Elevation on scroll. Initial state is read lazily by the first event
  // (or on mount via rAF) rather than calling setState synchronously.
  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setScrolled(window.scrollY > 12);
    });
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Track the home page section currently in view.
  useEffect(() => {
    if (pathname !== "/") return undefined;
    const ids = ["difference", "services", "method"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1500px] px-3 pt-3 sm:px-6 lg:px-10">
        <div
          className={`pointer-events-auto relative flex min-h-[4.5rem] items-center justify-between rounded-2xl border px-3 shadow-lg transition duration-500 sm:px-4 ${
            scrolled
              ? "border-white/10 bg-[#08080c]/85 shadow-black/40 backdrop-blur-xl"
              : "border-white/10 bg-[#08080c]/60 shadow-black/10 backdrop-blur-xl"
          }`}
        >
          <Logo />

          <nav
            aria-label="Main navigation"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center rounded-full border border-white/[0.08] bg-black/25 p-1 text-sm font-semibold text-zinc-400 lg:flex"
          >
            {NAV_LINKS.map((link) =>
              link.href.includes("#") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative flex items-center gap-2 rounded-full px-4 py-2.5 transition duration-300 hover:bg-white/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-400"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-[#ff176e] transition duration-300 ${
                      activeSection === link.href.split("#")[1]
                        ? "opacity-100"
                        : "scale-50 opacity-0"
                    }`}
                  />
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center rounded-full px-4 py-2.5 transition duration-300 hover:bg-white/[0.05] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-400 ${
                    pathname.startsWith(link.href) ? "text-white" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="group hidden items-center gap-4 rounded-xl bg-white px-5 py-3 text-sm font-black text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff176e] hover:text-white hover:shadow-lg hover:shadow-pink-900/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-400 sm:inline-flex"
            >
              Start a project
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                ↗
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:border-[#ff176e]/60 hover:bg-[#ff176e]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-400 lg:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`pointer-events-auto mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10]/95 shadow-2xl shadow-black/60 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
            open
              ? "max-h-[32rem] opacity-100"
              : "pointer-events-none max-h-0 border-transparent opacity-0"
          }`}
        >
          <nav aria-label="Mobile navigation" className="p-3">
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                Navigate the launchpad
              </p>
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff176e] shadow-[0_0_14px_3px_rgba(255,23,110,.55)]" />
            </div>
            <div className="grid gap-1">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between rounded-xl border border-transparent px-4 py-3.5 transition hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#ff4b8f]">
                      0{index + 1}
                    </span>
                    <span className="font-bold text-white">{link.label}</span>
                  </span>
                  <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="group mt-2 flex items-center justify-between rounded-xl bg-[#ff176e] px-4 py-4 text-left font-black text-white transition hover:bg-[#ff3d88]"
              >
                Start a project
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition group-hover:rotate-45">
                  ↗
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
