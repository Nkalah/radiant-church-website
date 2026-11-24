import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { LOGO_URL, navLinks } from "./navigation";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, location]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-16 border-b border-afm-navy/10 backdrop-blur-xl transition-all duration-300 md:h-[76px] ${
          isScrolled
            ? "bg-afm-white/90 shadow-md"
            : "bg-afm-white/75 shadow-md"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 cursor-pointer items-center gap-2 text-afm-navy"
          >
            <img
              src={LOGO_URL}
              alt="AFM India logo"
              className="h-10 w-10 shrink-0 rounded-full object-cover md:h-12 md:w-12"
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
            {navLinks.map((link) => {
              const isActive = location === link.href
                || (link.href !== "/" && location.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold xl:px-3.5 ${
                    isActive
                      ? "bg-afm-gold/15 text-afm-red"
                      : "text-afm-navy/80 hover:bg-afm-off-white hover:text-afm-red"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-afm-navy transition hover:bg-afm-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold lg:hidden"
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
