import { motion } from "framer-motion";
import type { MinistryEvent } from "../../types/minister";

interface EventsTimelineProps {
  events?: MinistryEvent[];
}

export function EventsTimeline({ events }: EventsTimelineProps) {
  if (!events || events.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-6">Recent Events</h2>
      <div className="space-y-0 border-t border-border">
        {events.map((event, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 border-b border-border py-6 group"
          >
            <span className="font-serif text-2xl text-primary sm:w-24 shrink-0">
              {event.year}
            </span>
            <div>
              <h3 className="text-base font-medium group-hover:text-primary transition-colors">
                {event.title}
              </h3>
              {event.description && (
                <p className="text-muted-foreground text-sm font-light mt-1">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}