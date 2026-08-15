import { motion } from "framer-motion";
import { Compass } from "lucide-react";

interface MinisterVisionProps {
  vision?: string;
}

export function MinisterVision({ vision }: MinisterVisionProps) {
  if (!vision) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="border border-border bg-card p-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <Compass className="w-5 h-5 text-primary" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl">Vision</h2>
      </div>
      <p className="text-muted-foreground font-light leading-relaxed">
        {vision}
      </p>
    </motion.div>
  );
}
