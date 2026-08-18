import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Music2, BookOpen, HandHelping, Users, HeartHandshake, Sparkles } from "lucide-react";
import type { Event } from "@workspace/api-client-react";

const ICON_RULES: { keywords: string[]; icon: ComponentType<{ className?: string }> }[] = [
  { keywords: ["worship", "music", "praise"], icon: Music2 },
  { keywords: ["teaching", "word", "biblical", "sermon", "message"], icon: BookOpen },
  { keywords: ["prayer", "ministry", "intercession"], icon: HandHelping },
  { keywords: ["fellowship", "community"], icon: Users },
  { keywords: ["outreach", "missions", "service"], icon: HeartHandshake },
];

function getIcon(item: string) {
  const lower = item.toLowerCase();
  const match = ICON_RULES.find(({ keywords }) => keywords.some((k) => lower.includes(k)));
  return match?.icon ?? Sparkles;
}

export function EventExpectations({ event }: { event: Event }) {
  const items = event.whatToExpect;
  if (!items || items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-8">What to Expect</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => {
          const Icon = getIcon(item);
          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-5 border border-border bg-card"
            >
              <Icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
              <span className="font-light">{item}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}