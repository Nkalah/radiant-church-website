import { motion } from "framer-motion";
import type { Minister } from "../../types/minister";

interface MinisterHeaderProps {
  minister: Minister;
}

export function MinisterHeader({ minister }: MinisterHeaderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-10 lg:gap-16 items-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full aspect-[4/5] overflow-hidden bg-muted"
      >
        <img
          src={minister.imageUrl}
          alt={minister.leader}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col justify-center"
      >
        <div className="inline-flex w-fit items-center border border-primary/30 text-primary text-xs tracking-widest uppercase font-medium mb-4 px-3 py-1">
          {minister.category}
        </div>

        <h1 className="font-serif text-4xl md:text-6xl mb-3">
          {minister.leader}
        </h1>

        <p className="text-muted-foreground text-lg font-light mb-6">
          {minister.name}
          {minister.assembly ? ` · ${minister.assembly}` : ""}
          {minister.meetingTime ? ` · ${minister.meetingTime}` : ""}
        </p>

        {minister.quote && (
          <blockquote className="border-l-2 border-primary pl-5 text-foreground/80 font-serif italic text-xl md:text-2xl leading-relaxed">
            "{minister.quote}"
          </blockquote>
        )}
      </motion.div>
    </div>
  );
}