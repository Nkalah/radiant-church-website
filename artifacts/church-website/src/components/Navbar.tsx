import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { eventLinks, LOGO_URL, navLinks } from "./navigation";

export function Navbar() {
  const [location] = useLocation();
  const isHome = location === "/";
  const [headerMode, setHeaderMode] = useState<"expanded" | "compact" | "hidden">(
    isHome ? "expanded" : "compact",
  );
  const headerModeRef = useRef(headerMode);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const eventsTriggerRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);
  const transitionHeaderTo = useCallback((mode: typeof headerMode) => {
    if (headerModeRef.current === mode) return;
    headerModeRef.current = mode;
    setHeaderMode(mode);
    if (mode === "hidden") setEventsOpen(false);
  }, []);
  const isActive = (href: string) =>
    location === href || (href !== "/" && location.startsWith(`${href}/`));
  const isEventsActive = eventLinks.some((link) => isActive(link.href));
  const isExpanded = headerMode === "expanded";
  const isHidden = headerMode === "hidden";
  const navActiveClass = isExpanded
    ? "bg-afm-white/15 text-afm-white"
    : "bg-afm-gold/15 text-afm-red";
  const navIdleClass = isExpanded
    ? "text-afm-white/90 hover:bg-afm-white/15 hover:text-afm-white"
    : "text-afm-navy/80 hover:bg-afm-off-white hover:text-afm-red";
  const headerHeight = isExpanded
    ? "h-[calc(4.5rem+env(safe-area-inset-top))] md:h-[calc(5rem+env(safe-area-inset-top))]"
    : "h-[calc(3.5rem+env(safe-area-inset-top))] md:h-[calc(4rem+env(safe-area-inset-top))]";

  const renderNavLink = (link: (typeof navLinks)[number]) => (
    <Link
      key={link.href}
      href={link.href}
      aria-current={isActive(link.href) ? "page" : undefined}
      className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold xl:px-3.5 ${
        isActive(link.href)
          ? navActiveClass
          : navIdleClass
      }`}
    >
      {link.label}
    </Link>
  );

  useEffect(() => {
    const topThreshold = 12;
    const directionThreshold = 8;
    const hideAfterScroll = 88;
    let previousY = Math.max(0, window.scrollY);
    let previousDirection = 0;
    let accumulatedDelta = 0;

    transitionHeaderTo(
      previousY <= topThreshold && isHome ? "expanded" : "compact",
    );

    const handleScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      if (currentY <= topThreshold) {
        previousY = currentY;
        previousDirection = 0;
        accumulatedDelta = 0;
        transitionHeaderTo(isHome ? "expanded" : "compact");
        return;
      }

      const delta = currentY - previousY;
      previousY = currentY;
      if (delta === 0) return;

      const direction = delta > 0 ? 1 : -1;
      if (direction !== previousDirection) {
        previousDirection = direction;
        accumulatedDelta = delta;
      } else {
        accumulatedDelta += delta;
      }

      if (Math.abs(accumulatedDelta) < directionThreshold) return;
      accumulatedDelta = 0;

      if (direction < 0) {
        transitionHeaderTo("compact");
      } else {
        transitionHeaderTo(currentY <= hideAfterScroll ? "compact" : "hidden");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, transitionHeaderTo]);

  useEffect(() => {
    closeMenu();
    setEventsOpen(false);
  }, [closeMenu, location]);

  return (
    <>
      <header
        aria-hidden={isHidden}
        inert={isHidden}
        className={`fixed inset-x-0 top-0 z-50 box-border border-b pt-[env(safe-area-inset-top)] transition-[transform,opacity,height,background-color,border-color,box-shadow] duration-300 ease-out ${headerHeight} ${
          isHidden ? "-translate-y-full pointer-events-none opacity-0" : "translate-y-0 opacity-100"
        } ${
          isExpanded
            ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
            : "border-afm-navy/10 bg-afm-white/95 shadow-sm backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className={`flex shrink-0 cursor-pointer items-center gap-2 ${
              isExpanded ? "text-afm-white" : "text-afm-navy"
            }`}
          >
            <img
              src={LOGO_URL}
              alt="Apostolic Faith Mission in India (AFM India) logo"
              width={2048}
              height={2048}
              className={`shrink-0 rounded-full object-cover transition-[width,height] duration-300 ${
                isExpanded ? "h-11 w-11 md:h-12 md:w-12" : "h-9 w-9 md:h-10 md:w-10"
              }`}
            />
            <span className="font-display text-xs font-medium leading-tight min-[400px]:text-sm md:text-base">
              <span className="hidden max-[399px]:block">AFM India</span>
              <span className="max-[399px]:hidden">
                Apostolic Faith Mission
                <span className="block">In India</span>
              </span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {navLinks.slice(0, 2).map(renderNavLink)}

            <div
              className="relative"
              onMouseEnter={() => setEventsOpen(true)}
              onMouseLeave={(event) => {
                if (!event.currentTarget.contains(document.activeElement)) {
                  setEventsOpen(false);
                }
              }}
              onBlur={(event) => {
                const nextTarget = event.relatedTarget;
                if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                  setEventsOpen(false);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setEventsOpen(false);
                  eventsTriggerRef.current?.focus();
                }
              }}
            >
              <button
                ref={eventsTriggerRef}
                type="button"
                aria-expanded={eventsOpen}
                aria-controls="desktop-events-links"
                onClick={() => setEventsOpen(true)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold xl:px-3.5 ${
                  isEventsActive
                    ? navActiveClass
                    : navIdleClass
                }`}
              >
                Events
                <ChevronDown
                  aria-hidden="true"
                  size={14}
                  className={`transition-transform duration-200 ${eventsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                id="desktop-events-links"
                className={`absolute left-0 top-full z-[70] pt-2 transition-[opacity,visibility] duration-150 ${
                  eventsOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <ul className="min-w-40 rounded-2xl border border-afm-navy/10 bg-afm-white p-2 shadow-lg">
                  {eventLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={`block rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold ${
                          isActive(link.href)
                            ? "bg-afm-gold/15 text-afm-red"
                            : "text-afm-navy/80 hover:bg-afm-off-white hover:text-afm-red"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {navLinks.slice(2).map(renderNavLink)}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              href="/giving"
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-afm-red px-5 text-xs font-bold uppercase tracking-wider text-afm-white shadow-sm transition hover:-translate-y-0.5 hover:bg-afm-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold"
            >
              Give
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(true)}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold lg:hidden ${
              isExpanded
                ? "text-afm-white hover:bg-afm-white/15"
                : "text-afm-navy hover:bg-afm-off-white"
            }`}
          >
            <Menu aria-hidden="true" size={25} />
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileMenuOpen}
        location={location}
        onClose={closeMenu}
      />
    </>
  );
}
