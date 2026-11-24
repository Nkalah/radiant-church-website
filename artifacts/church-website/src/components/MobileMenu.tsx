import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "wouter";
import { LOGO_URL, navLinks } from "./navigation";

type MobileMenuProps = {
  open: boolean;
  location: string;
  onClose: () => void;
};

const extraLinks = [
  { href: "/giving", label: "Giving" },
  { href: "/prayer", label: "Prayer" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ open, location, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const links = [...navLinks, ...extraLinks];

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    });

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusableElements = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[60] flex h-[100dvh] flex-col bg-afm-off-white/95 px-5 pb-5 pt-4 text-afm-navy shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <div className="mb-5 flex min-h-14 shrink-0 items-center justify-between border-b border-afm-navy/10 pb-4">
            <Link href="/" className="flex items-center gap-2" onClick={onClose}>
              <img
                src={LOGO_URL}
                alt="AFM India logo"
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <span className="font-display text-base leading-tight min-[400px]:text-lg">
                <span className="hidden max-[399px]:block">AFM India</span>
                <span className="max-[399px]:hidden">
                  Apostolic Faith Mission
                  <span className="block">In India</span>
                </span>
              </span>
            </Link>
            <button
              type="button"
              data-autofocus
              aria-label="Close navigation menu"
              onClick={onClose}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-afm-gold text-afm-navy shadow-md transition hover:bg-afm-red hover:text-afm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-navy"
            >
              <X aria-hidden="true" size={22} />
            </button>
          </div>

          <nav aria-label="Main navigation" className="min-h-0 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {links.map((link) => {
                const isActive = location === link.href
                  || (link.href !== "/" && location.startsWith(`${link.href}/`));

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={onClose}
                      className={`flex min-h-14 items-center rounded-2xl px-5 text-sm font-bold uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold ${
                        isActive
                          ? "bg-afm-gold/20 text-afm-navy ring-1 ring-inset ring-afm-gold/40"
                          : "text-afm-navy/80 hover:bg-afm-white hover:text-afm-red"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
