"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
/* `socialMeta` is only used by the commented-out social row below, so the named
   import comes back with it: `import Icon, { socialMeta } from "./Icons"` */
import Icon from "./Icons";
import { mailtoLink, navLinks, site, telLink, utilityLinks } from "@/lib/site";
import { openLead } from "@/lib/lead";

/* ------------------------------------------------------------------ */
/* Scroll progress — a hairline gradient that tracks page position.    */
/* ------------------------------------------------------------------ */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-px bg-white/[0.06]"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-[#ff176e] via-[#ff5aa1] to-[#b356ff] shadow-[0_0_12px_rgba(255,23,110,.8)] transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/* Utility bar — contact + status, collapses away as you scroll.       */
/*                                                                     */
/* `max-h-0` + `opacity-0` hides this visually but leaves all six of   */
/* its links (email, phone, four socials) in the tab order, so keyboard*/
/* focus jumps to controls the user cannot see — WCAG 2.4.3 and 2.4.7. */
/* `inert` pulls the subtree out of the focus order *and* the          */
/* accessibility tree while collapsed. It does not affect the collapse */
/* transition, and `|| undefined` omits the attribute entirely when    */
/* the bar is expanded.                                                */
/* ------------------------------------------------------------------ */
function UtilityBar({ collapsed }) {
  /* Only the commented-out social row below consumed this, so it goes with it. */
  // const socials = site.sameAs.slice(0, 4);
  return (
    <div
      inert={collapsed || undefined}
      /* `pointer-events-auto` is load-bearing. The <header> sets
         `pointer-events-none` so its transparent areas do not swallow clicks
         meant for the hero, and every interactive subtree has to opt back in.
         The nav row and the mobile panel both do; this bar did not, so its
         email and phone links were unclickable — hit-testing passed straight
         through to the section beneath. Only the two <a>s need to be
         reachable, but the row is the natural boundary: it is 40px tall and
         reads as part of the header, so capturing clicks there is expected. */
      className={`pointer-events-auto hidden overflow-hidden border-b border-white/[0.06] transition-all duration-500 ease-out lg:block ${
        collapsed ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-12 py-2 text-[11px] font-medium tracking-[0.08em] text-muted">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="uppercase tracking-[0.18em] text-zinc-400">
            Booking Q4 2026 launches
          </span>
          <span aria-hidden="true" className="text-zinc-700">
            /
          </span>
          <span>Three slots remaining</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Both links are `-mx-2 px-2`, which widens the hit area past the
              text without moving it. The `py-1` is not decoration: at 11px the
              text box is only 17px tall, under the 24px minimum WCAG 2.5.8 asks
              for, and this brings it to 25px. The hover fill then makes the
              pair read as controls rather than plain labels, and `title`
              restates the action for anyone hovering. */}
          <a
            href={mailtoLink({ subject: "New project enquiry" })}
            title={`Email ${site.email}`}
            className="-mx-2 inline-flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-white/[0.06] hover:text-white"
          >
            <Icon name="mail" className="h-3.5 w-3.5 text-[#ff4b8f]" />
            {site.email}
          </a>
          <span aria-hidden="true" className="h-3 w-px bg-white/10" />
          <a
            href={telLink()}
            title={`Call ${site.phoneDisplay}`}
            className="-mx-2 inline-flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-white/[0.06] hover:text-white"
          >
            <Icon name="phone" className="h-3.5 w-3.5 text-[#ff4b8f]" />
            {site.phoneDisplay}
          </a>
          {/* SOCIAL ICONS — commented out until real profile URLs exist.
              `site.sameAs` still holds placeholder handles, so these links are
              dead. The `socials` slice below is commented with them because it
              has no other consumer, and the divider goes too so nothing dangles
              at the end of the row.

          <span aria-hidden="true" className="h-3 w-px bg-white/10" />
          <ul className="flex items-center gap-1">
            {socials.map((url) => {
              const { icon, label } = socialMeta(url);
              if (!icon) return null;
              return (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Loud Launchers on ${label}`}
                    className="btn-3d btn-3d--ghost flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-white/[0.06] hover:text-white"
                  >
                    <Icon name={icon} className="h-3.5 w-3.5" />
                  </a>
                </li>
              );
            })}
          </ul>

          */}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Services mega menu                                                  */
/* ------------------------------------------------------------------ */
function MegaMenu({ open, onNavigate, onEnter, onLeave }) {
  const services = navLinks.find((link) => link.children)?.children ?? [];
  return (
    <div
      id="services-menu"
      /* `opacity-0` hides the panel but leaves all eight of its links in the
         tab order, so keyboard users were tabbing through an invisible menu.
         `inert` removes the whole subtree from both focus and the a11y tree
         while it is closed. */
      inert={!open || undefined}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      /* The `before:` strip is the pointer's bridge up to the nav row. The
         panel opens 8px below the row, and without this the pointer crossed a
         band belonging to neither the trigger nor the panel, so the close
         countdown started on the way down. It spans the panel's full width, so
         a diagonal approach works as well as a straight one. Hovering a
         pseudo-element counts as hovering its host, which is what makes this
         work without a real element. */
      className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] origin-top transition-all duration-300 ease-out before:absolute before:-top-7 before:left-0 before:right-0 before:h-7 before:content-[''] ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0f]/95 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        <div className="grid lg:grid-cols-[1fr_18rem]">
          <div className="grid gap-1 p-4 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                onClick={onNavigate}
                className="group flex items-start gap-4 rounded-2xl border border-transparent p-4 transition duration-300 hover:border-white/10 hover:bg-white/[0.04]"
              >
                <span
                  className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition duration-300 group-hover:border-[#ff176e]/50"
                  style={{ color: service.accent }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    className="h-5 w-5"
                  >
                    <path d={service.iconPath} />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {service.short}
                    </span>
                    <Icon
                      name="arrowUpRight"
                      className="h-3.5 w-3.5 text-subtle transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff4b8f]"
                    />
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                    {service.summary}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="relative hidden overflow-hidden border-l border-white/10 bg-gradient-to-br from-[#1c0a14] to-[#0a0a0f] p-7 lg:flex lg:flex-col lg:justify-between">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#ff176e]/25 blur-3xl"
            />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                Not sure where to start?
              </p>
              <p className="mt-4 text-lg font-bold leading-snug text-white">
                Get a free launch plan for your business.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                Tell us the goal. We&apos;ll come back with a scoped plan,
                timeline and clear next steps — usually within one business day.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                openLead("header-mega-menu");
                onNavigate();
              }}
              className="btn-3d btn-3d--white group relative mt-7 inline-flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-black text-black"
            >
              Start a project
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                <Icon name="arrowUpRight" className="h-3 w-3" />
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-3.5">
          <p className="text-[11px] font-medium text-muted">
            Six services. One connected growth engine.
          </p>
          <Link
            href="/services"
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400 transition hover:text-white"
          >
            All services
            <Icon
              name="arrowRight"
              className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const [renderedPath, setRenderedPath] = useState(pathname);
  const closeTimer = useRef(0);
  const headerRef = useRef(null);

  // Reset every menu when the route changes. Adjusting state during render is
  // the React-documented alternative to a setState-in-effect here: it avoids
  // an extra commit and a visible flash of the old menu.
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
    setMegaOpen(false);
    setMobileGroup(null);
  }

  const closeAll = useCallback(() => {
    setOpen(false);
    setMegaOpen(false);
    setMobileGroup(null);
  }, []);

  /* Two elements own the mega menu's hover intent: the Services trigger and
     the panel itself. Leaving either starts a short countdown; entering
     either cancels it. The panel's `before:` strip overlaps the trigger's
     bottom edge, so the pointer hands off between the two without ever
     crossing a band that belongs to neither.
     The countdown is deliberately scoped to those two elements rather than
     to the row wrapping them. The row also holds the logo, the sibling links
     and the CTA, so a row-level handler kept the panel open while the pointer
     was anywhere in the header — dismissing it meant travelling below the
     panel. 220ms is long enough to absorb a diagonal hand-off and short enough
     that a deliberate exit feels immediate. */
  const keepMegaOpen = useCallback(() => {
    window.clearTimeout(closeTimer.current);
  }, []);

  const releaseMega = useCallback(() => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 220);
  }, []);

  /* Elevation on scroll. */
  useEffect(() => {
    const raf = window.requestAnimationFrame(() =>
      setScrolled(window.scrollY > 12),
    );
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* Track the home page section in view so the nav can highlight it. */
  useEffect(() => {
    if (pathname !== "/") return undefined;
    const ids = ["difference", "services", "method", "insights", "faq"];
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
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  /* Lock body scroll while the mobile panel is open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape closes; outside click closes the mega menu. */
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") closeAll();
    };
    const onPointer = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [closeAll]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const isActive = (link) => {
    if (link.href.includes("#")) {
      return pathname === "/" && activeSection === link.href.split("#")[1];
    }
    if (link.href === "/blog") {
      return pathname === "/blog" || pathname.startsWith("/blog/");
    }
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  };

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <ScrollProgress />

      <div
        className={`relative transition-colors duration-500 ${
          scrolled
            ? "border-b border-white/[0.07] bg-[#06060a]/85 shadow-[0_24px_60px_-40px_rgba(0,0,0,1)] backdrop-blur-2xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* Brand hairline — one pink thread along the top edge. It gives the
            bar a defined edge without boxing it in, and brightens once the
            header detaches from the hero. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff176e] to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-70" : "opacity-30"
          }`}
        />
        <UtilityBar collapsed={scrolled} />

        <div className="mx-auto max-w-[1500px] px-3 sm:px-6 lg:px-10">
          {/* No hover handler on this wrapper: it spans the whole header row,
              so scoping the close here kept the panel open over the logo,
              the sibling links and the CTA. The trigger and the panel each
              own their half of the close logic instead. */}
          <div className="relative">
            <div
              className={`pointer-events-auto relative flex min-h-[4.25rem] items-center justify-between gap-4 transition-all duration-500 ${
                scrolled ? "py-1.5" : "py-3"
              }`}
            >
              <Logo />

              {/* -------------------------------------------- desktop nav */}
              {/* A glass capsule rather than loose links: it gives the middle
                  of the bar a real shape, and the inset highlight reads as a
                  physical edge under the blur. It firms up slightly on scroll
                  so the nav stays legible over page content. */}
              <nav
                aria-label="Main navigation"
                className={`absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-full border p-1 backdrop-blur-xl transition-colors duration-500 lg:flex ${
                  scrolled
                    ? "border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
                    : "border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                }`}
              >
                {navLinks.map((link) => {
                  const active = isActive(link);
                  const hasMenu = Boolean(link.children);
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => {
                        if (!hasMenu) return;
                        keepMegaOpen();
                        setMegaOpen(true);
                      }}
                      /* Leaving this item starts the countdown; entering the
                         panel cancels it. The handler belongs here and not on
                         the row that wraps it: the row also contains the logo,
                         the three sibling links and the CTA, so scoping it to
                         the row meant the panel stayed open while the pointer
                         was anywhere in the header — you had to travel below
                         the panel to dismiss it. */
                      onMouseLeave={hasMenu ? releaseMega : undefined}
                    >
                      {/* The gap between this trigger and the panel is now
                          bridged by the panel's own `before:` strip, which
                          spans its full width. The old per-item bridge here
                          only covered this link's width, so a diagonal
                          approach still crossed a dead band. */}
                      <Link
                        href={link.href}
                        aria-expanded={hasMenu ? megaOpen : undefined}
                        aria-haspopup={hasMenu ? "true" : undefined}
                        aria-controls={hasMenu ? "services-menu" : undefined}
                        onClick={(event) => {
                          if (hasMenu && !megaOpen) {
                            event.preventDefault();
                            setMegaOpen(true);
                          }
                        }}
                        onFocus={() => hasMenu && setMegaOpen(true)}
                        className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 ${
                          active ? "text-white" : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {/* Active is a brand-pink pill rather than the old grey
                            wash. It replaces the separate 1px pink dot, which
                            only existed because the grey pill was too faint to
                            read as "you are here". */}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-0 rounded-full border transition duration-300 ${
                            active
                              ? "border-[#ff176e]/40 bg-[#ff176e]/15 shadow-[0_0_26px_-8px_rgba(255,23,110,0.95)]"
                              : "border-transparent group-hover:border-white/10 group-hover:bg-white/[0.06]"
                          }`}
                        />
                        <span className="relative">{link.label}</span>
                        {hasMenu && (
                          <Icon
                            name="chevronDown"
                            className={`relative h-3.5 w-3.5 transition duration-300 ${
                              megaOpen ? "rotate-180 text-[#ff4b8f]" : ""
                            }`}
                          />
                        )}
                      </Link>
                    </div>
                  );
                })}
              </nav>

              {/* ------------------------------------------------- actions */}
              {/* No phone pill here any more. The number lives in the utility
                  bar directly above, which is now actually clickable, and on
                  phones in the drawer's contact block and the dock's call
                  bubble. Repeating it in the nav row made the bar noisy and
                  gave the same number three competing entry points. */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openLead("header-desktop-cta")}
                  className="btn-3d btn-3d--pink group relative hidden items-center gap-3 overflow-hidden rounded-full px-5 py-3 text-sm font-black text-[#050507] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 sm:inline-flex"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full"
                  />
                  <span className="relative">Start a project</span>
                  <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-black/25 transition duration-300 group-hover:rotate-45">
                    <Icon name="arrowUpRight" className="h-3 w-3" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setOpen((value) => !value)}
                  aria-label={open ? "Close navigation" : "Open navigation"}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  className="btn-3d btn-3d--ink btn-3d--soft flex h-11 w-11 items-center justify-center rounded-full text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 lg:hidden"
                >
                  <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
                </button>
              </div>
            </div>

            <MegaMenu
              open={megaOpen}
              onNavigate={closeAll}
              onEnter={keepMegaOpen}
              onLeave={releaseMega}
            />
          </div>
        </div>

        {/* ---------------------------------------------- mobile panel */}
        {/* Collapsed with `max-h-0 opacity-0`, which hides it visually but
            leaves all 20 of its controls focusable — tabbing on a phone
            would walk the user through an invisible menu. `inert` removes
            the subtree from the focus order and the accessibility tree
            while closed. The panel is `lg:hidden`, so this only affects
            phones; desktop never reaches it. Same reasoning as the
            utility bar above. */}
        <div
          id="mobile-menu"
          inert={!open || undefined}
          className={`pointer-events-auto overflow-hidden border-t border-white/[0.07] bg-[#08080c]/97 backdrop-blur-2xl transition-all duration-300 ease-out lg:hidden ${
            open
              ? "max-h-[85vh] opacity-100"
              : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <div className="max-h-[85vh] overflow-y-auto px-4 pb-8 pt-5 sm:px-6">
            <nav aria-label="Mobile navigation">
              <p className="px-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                Navigate the launchpad
              </p>
              <div className="mt-3 grid gap-1.5">
                {navLinks.map((link, index) => {
                  const hasMenu = Boolean(link.children);
                  const expanded = mobileGroup === link.href;
                  return (
                    <div
                      key={link.href}
                      className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]"
                    >
                      <div className="flex items-stretch">
                        <Link
                          href={link.href}
                          onClick={closeAll}
                          className="flex flex-1 items-center gap-4 px-4 py-4"
                        >
                          <span className="font-mono text-xs text-[#ff4b8f]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>
                            <span className="block font-bold text-white">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="mt-1 block text-xs leading-relaxed text-muted">
                                {link.description}
                              </span>
                            )}
                          </span>
                        </Link>
                        {hasMenu && (
                          <button
                            type="button"
                            onClick={() =>
                              setMobileGroup(expanded ? null : link.href)
                            }
                            aria-expanded={expanded}
                            aria-label={`${expanded ? "Collapse" : "Expand"} ${link.label} links`}
                            className="btn-3d btn-3d--ghost flex w-14 shrink-0 items-center justify-center border-l border-white/[0.07] text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                          >
                            <Icon
                              name="chevronDown"
                              className={`h-4 w-4 transition duration-300 ${
                                expanded ? "rotate-180 text-[#ff4b8f]" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      {hasMenu && (
                        <div
                          className={`grid overflow-hidden transition-all duration-300 ease-out ${
                            expanded ? "max-h-[40rem]" : "max-h-0"
                          }`}
                        >
                          <ul className="grid gap-1 border-t border-white/[0.07] p-2">
                            {link.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={closeAll}
                                  className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm transition hover:bg-white/[0.05]"
                                >
                                  <span className="flex items-center gap-3">
                                    <span
                                      aria-hidden="true"
                                      className="h-1.5 w-1.5 rounded-full"
                                      style={{ backgroundColor: child.accent }}
                                    />
                                    <span className="font-semibold text-zinc-300">
                                      {child.short}
                                    </span>
                                  </span>
                                  <Icon
                                    name="chevronRight"
                                    className="h-4 w-4 text-subtle"
                                  />
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href={link.footer.href}
                                onClick={closeAll}
                                className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-3 py-3 text-sm font-bold text-white transition hover:bg-white/[0.07]"
                              >
                                {link.footer.label}
                                <Icon name="arrowRight" className="h-4 w-4" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  openLead("header-mobile-cta");
                  closeAll();
                }}
                className="btn-3d btn-3d--pink group mt-4 flex w-full items-center justify-between rounded-2xl px-5 py-4 font-black text-[#050507]"
              >
                Start a project
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/25 transition duration-300 group-hover:rotate-45">
                  <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                </span>
              </button>
            </nav>

            <div className="mt-6 grid gap-3 border-t border-white/[0.07] pt-6 text-sm">
              <a
                href={mailtoLink({ subject: "New project enquiry" })}
                className="flex items-center gap-3 text-zinc-400 transition hover:text-white"
              >
                <Icon name="mail" className="h-4 w-4 text-[#ff4b8f]" />
                {site.email}
              </a>
              <a
                href={telLink()}
                className="flex items-center gap-3 text-zinc-400 transition hover:text-white"
              >
                <Icon name="phone" className="h-4 w-4 text-[#ff4b8f]" />
                {site.phoneDisplay}
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {utilityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeAll}
                    className="btn-3d btn-3d--outline btn-3d--soft inline-flex rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 hover:border-[#ff176e]/50 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
