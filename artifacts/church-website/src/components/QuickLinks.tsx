import { Link } from "wouter";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Branches", href: "/assemblies" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export function QuickLinks() {
  return (
    <nav
      aria-label="Quick links"
      className="overflow-x-auto bg-afm-white py-5 shadow-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="mx-auto flex min-w-max items-center justify-start gap-3 px-5 md:min-w-0 md:justify-center">
        {quickLinks.map((link) => (
          <li key={link.href} className="shrink-0">
            <Link
              href={link.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-afm-navy/10 bg-afm-white px-5 text-sm font-bold text-afm-navy shadow-sm transition hover:-translate-y-0.5 hover:border-afm-gold hover:bg-afm-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
