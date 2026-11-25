import { Link, useLocation } from "wouter";
import { LOGO_URL } from "./navigation";

export function Footer() {
  const [location] = useLocation();

  return (
    <footer className="bg-afm-navy px-6 py-16 text-afm-white md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt=""
              aria-hidden="true"
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <span className="font-display text-3xl tracking-widest font-light cursor-pointer">
              Apostolic Faith Mission in India
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-afm-white/75">
  Filled with Holy Spirit, we evangelize, heal the sick and prepare our members for our Lord Jesus Christ’s second coming.
          </p>
        </div>
        
        <div>
          <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-afm-white/70">Connect</h4>
          <ul className="space-y-4 text-sm text-afm-white/85">
            <li><Link href="/about"><span className="cursor-pointer transition-colors hover:text-afm-gold">Our Story</span></Link></li>
            <li><Link href="/sermons"><span className="cursor-pointer transition-colors hover:text-afm-gold">Sermons</span></Link></li>
            <li><Link href="/events"><span className="cursor-pointer transition-colors hover:text-afm-gold">Events</span></Link></li>
            <li><Link href="/live"><span className="cursor-pointer transition-colors hover:text-afm-gold">Watch Live</span></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-afm-white/70">Resources</h4>
          <ul className="space-y-4 text-sm text-afm-white/85">
            <li><Link href="/giving"><span className="cursor-pointer transition-colors hover:text-afm-gold">Give</span></Link></li>
            <li><Link href="/prayer"><span className="cursor-pointer transition-colors hover:text-afm-gold">Prayer Requests</span></Link></li>
            <li><Link href="/blog"><span className="cursor-pointer transition-colors hover:text-afm-gold">Journal</span></Link></li>
            <li><Link href="/contact"><span className="cursor-pointer transition-colors hover:text-afm-gold">Contact</span></Link></li>
          </ul>
        </div>
      </div>

      {location === "/" && (
        <p className="mx-auto mt-10 max-w-7xl text-center text-[10px] leading-relaxed text-afm-white/55">
          India state boundaries adapted from{" "}
          <a
            href="https://github.com/datameet/maps/tree/master/States"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-afm-gold"
          >
            DataMeet India Maps
          </a>
          , licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-afm-gold"
          >
            CC BY 4.0
          </a>
          .
        </p>
      )}
      
      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-afm-white/15 pt-8 text-xs uppercase tracking-widest text-afm-white/70 md:mt-20 md:flex-row">
        <p>© {new Date().getFullYear()} AFM In India. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/afm_in_india/" className="transition-colors hover:text-afm-gold">Instagram</a>
          <a href="https://chat.whatsapp.com/Il9Fj0qOx8VDDq4xpNopQZ" className="transition-colors hover:text-afm-gold">Whatsapp</a>
          <a href="https://www.facebook.com/profile.php?id=61586109035850" className="transition-colors hover:text-afm-gold">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
