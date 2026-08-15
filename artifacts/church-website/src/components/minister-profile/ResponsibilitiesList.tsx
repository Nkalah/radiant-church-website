import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ResponsibilitiesListProps {
  responsibilities?: string[];
}

export function ResponsibilitiesList({ responsibilities }: ResponsibilitiesListProps) {
  if (!responsibilities || responsibilities.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-6">Responsibilities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {responsibilities.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border border-border bg-card px-5 py-4"
          >
            <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
            <span className="text-sm font-light">{item}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}