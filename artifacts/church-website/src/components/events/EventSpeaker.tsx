import { motion } from "framer-motion";
import type { Event } from "@workspace/api-client-react";

const FALLBACK_AVATAR = "/images/avatar-placeholder.png";

export function EventSpeaker({ event }: { event: Event }) {
  if (!event.speakerName) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-8">Speaker</h2>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 border border-border bg-card p-6 sm:p-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden bg-muted">
          <img
            src={event.speakerImageUrl || FALLBACK_AVATAR}
            alt={event.speakerName}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_AVATAR;
            }}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-serif text-2xl mb-1">{event.speakerName}</h3>
          {event.speakerRole && (
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
              {event.speakerRole}
            </p>
          )}
          {event.speakerBio && (
            <p className="text-muted-foreground font-light leading-relaxed mb-4">{event.speakerBio}</p>
          )}
          {event.speakerContact && <p className="text-sm font-light">{event.speakerContact}</p>}
        </div>
      </div>
    </motion.section>
  );
}