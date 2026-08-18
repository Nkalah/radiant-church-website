import { motion } from "framer-motion";
import type { Event } from "@workspace/api-client-react";

export function EventDescription({ event }: { event: Event }) {
  if (!event.description) return null;

  const paragraphs = event.description.split(/\n{2,}/).filter(Boolean);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-6">About This Gathering</h2>
      <div className="space-y-5 max-w-3xl">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-lg font-light leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.section>
  );
}