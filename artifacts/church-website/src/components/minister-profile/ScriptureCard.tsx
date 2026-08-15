import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface ScriptureCardProps {
  scripture?: string;
  reference?: string;
}

export function ScriptureCard({ scripture, reference }: ScriptureCardProps) {
  if (!scripture) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="relative border border-primary/30 bg-card px-8 py-12 sm:px-14 sm:py-16 text-center"
    >
      <Quote className="w-8 h-8 text-primary/40 mx-auto mb-6" strokeWidth={1.5} />
      <p className="font-serif text-xl md:text-3xl leading-relaxed text-foreground/90 mb-6">
        "{scripture}"
      </p>
      {reference && (
        <span className="text-primary text-xs tracking-widest uppercase font-medium">
          {reference}
        </span>
      )}
    </motion.div>
  );
}