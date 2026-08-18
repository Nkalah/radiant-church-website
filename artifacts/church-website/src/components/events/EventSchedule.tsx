import { motion } from "framer-motion";
import type { Event } from "@workspace/api-client-react";
import { formatEventTime } from "../../lib/event-utils";

export function EventSchedule({ event }: { event: Event }) {
  const schedule = event.schedule;
  if (!schedule || schedule.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-8">Event Schedule</h2>
      <div className="relative border-l border-border ml-1.5 sm:ml-2">
        {schedule.map((item, i) => (
          <motion.div
            key={`${item.time}-${item.title}-${i}`}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative pl-8 pb-10 last:pb-0"
          >
            <span
              className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-primary"
              aria-hidden="true"
            />
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-1">
              {formatEventTime(item.time)}
            </p>
            <h3 className="font-serif text-xl mb-1">{item.title}</h3>
            {item.description && (
              <p className="text-muted-foreground font-light leading-relaxed">{item.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}