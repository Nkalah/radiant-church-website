import { motion } from "framer-motion";
import { Target } from "lucide-react";

interface MinisterMissionProps {
  mission?: string[];
}

export function MinisterMission({ mission }: MinisterMissionProps) {
  if (!mission || mission.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.1 }}
      className="border border-border bg-card p-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <Target className="w-5 h-5 text-primary" strokeWidth={1.5} />
        <h2 className="font-serif text-2xl">Mission</h2>
      </div>
      <ul className="space-y-2">
        {mission.map((item, i) => (
          <li key={i} className="text-muted-foreground font-light leading-relaxed flex gap-3">
            <span className="text-primary font-mono text-xs mt-1.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}