import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListEvents } from "@workspace/api-client-react";
import type { Event } from "@workspace/api-client-react";

const FALLBACK_IMAGE = "/images/event-1.png";

export function RelatedEvents({ current }: { current: Event }) {
  const { data } = useListEvents({ upcoming: true, limit: 12 });
  const events = data ?? [];

  const others = events.filter((e) => e.id !== current.id);
  const sameCategory = others.filter((e) => e.category === current.category);
  const rest = others.filter((e) => e.category !== current.category);
  const related = [...sameCategory, ...rest].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-8">More Gatherings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {related.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="group block border border-border bg-card hover:border-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={event.imageUrl || FALLBACK_IMAGE}
                alt={event.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-mono text-muted-foreground mb-2">{event.date}</p>
              <h3 className="font-serif text-lg group-hover:text-primary transition-colors">
                {event.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}