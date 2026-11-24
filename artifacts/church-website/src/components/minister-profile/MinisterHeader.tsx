import { motion } from "framer-motion";
import type { Minister } from "../../types/minister";

interface MinisterHeaderProps {
  minister: Minister;
}

export function MinisterHeader({ minister }: MinisterHeaderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.54fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-sm"
      >
        <img
          src={minister.imageUrl}
          alt={minister.leader}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {minister.quote && <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col justify-center self-center rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <blockquote className="border-l-4 border-afm-gold pl-5 text-foreground/80 italic text-xl md:text-2xl leading-relaxed">
          "{minister.quote}"
        </blockquote>
      </motion.div>}
    </div>
  );
}