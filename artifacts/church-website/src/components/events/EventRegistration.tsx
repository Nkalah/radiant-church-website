import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Event } from "@workspace/api-client-react";

export function EventRegistration({ event }: { event: Event }) {
  if (!event.registrationRequired && !event.registrationUrl && !event.registrationDescription) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center shadow-sm"
    >
      <h2 className="font-serif text-3xl mb-3">Reserve Your Place</h2>
      <p className="text-muted-foreground font-light mb-6 max-w-md mx-auto">
        {event.registrationDescription || (event.registrationRequired
          ? "Registration is required for this gathering."
          : "Registration is available for this gathering.")}
      </p>

      {(event.registrationDeadline || typeof event.availableSeats === "number") && (
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-medium tracking-widest uppercase text-muted-foreground mb-8">
          {event.registrationDeadline && <span>Deadline: {event.registrationDeadline}</span>}
          {typeof event.availableSeats === "number" && <span>{event.availableSeats} Seats Left</span>}
        </div>
      )}

      {event.registrationUrl ? (
        <Button asChild className="tracking-widest uppercase text-xs px-8">
          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
            Register Now
          </a>
        </Button>
      ) : (
        <Button className="tracking-widest uppercase text-xs px-8">Register Now</Button>
      )}
    </motion.section>
  );
}