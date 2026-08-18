import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Event } from "@workspace/api-client-react";
import { getGoogleMapsUrl } from "../../lib/event-utils";

export function EventLocation({ event }: { event: Event }) {
  const directionsUrl = event.mapUrl || getGoogleMapsUrl(event.address, event.location);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-8">Location</h2>
      <div className="border border-border bg-card p-6 sm:p-8">
        <h3 className="font-serif text-2xl mb-2">{event.location}</h3>
        {event.address && <p className="text-muted-foreground font-light mb-4">{event.address}</p>}
        {event.parkingInfo && (
          <p className="text-sm font-light text-muted-foreground mb-6">
            <span className="font-medium text-foreground">Parking: </span>
            {event.parkingInfo}
          </p>
        )}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          Get Directions
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </motion.section>
  );
}