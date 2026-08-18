import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import type { Event } from "@workspace/api-client-react";
import { formatTimeRange } from "../../lib/event-utils";

const FALLBACK_IMAGE = "/images/event-1.png";

export function EventHero({ event }: { event: Event }) {
  return (
    <section className="relative w-full overflow-hidden bg-muted">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] w-full"
      >
        <img
          src={event.imageUrl || FALLBACK_IMAGE}
          alt={event.title}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Scrim for text legibility, fading into the page background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" aria-hidden="true" />

      <Link
        href="/events"
        className="absolute top-6 left-6 sm:top-8 sm:left-8 inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase px-3 py-2 border border-border bg-background/85 backdrop-blur text-foreground hover:text-primary hover:border-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        Back to Gatherings
      </Link>

      <div className="absolute inset-x-0 bottom-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto px-6 pb-10 sm:pb-14"
        >
          <span className="inline-block text-xs font-medium tracking-widest uppercase px-3 py-1 border border-border bg-background/90 backdrop-blur mb-5">
            {event.category}
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-tight mb-5 text-foreground">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base font-light text-foreground/80">
            <span>{event.date}</span>
            <span>{formatTimeRange(event.time, event.endTime)}</span>
            <span>{event.location}</span>
          </div>

          {event.description && (
            <p className="max-w-2xl mt-5 text-sm sm:text-base font-light text-foreground/70 leading-relaxed">
              {event.description.length > 180
                ? `${event.description.slice(0, 180).trim()}…`
                : event.description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}