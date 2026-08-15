import { motion } from "framer-motion";
import type { Minister } from "../../types/minister";

interface MinisterInfoGridProps {
  minister: Minister;
}

export function MinisterInfoGrid({ minister }: MinisterInfoGridProps) {
  const items: { label: string; value: string }[] = [
    minister.yearsInMinistry !== undefined
      ? { label: "Years in Ministry", value: `${minister.yearsInMinistry}` }
      : null,
    minister.assembly ? { label: "Current Assembly", value: minister.assembly } : null,
    minister.state ? { label: "State", value: minister.state } : null,
    minister.category ? { label: "Ministry Department", value: minister.category } : null,
    minister.email ? { label: "Email", value: minister.email } : null,
    minister.phone ? { label: "Phone", value: minister.phone } : null,
    minister.languages?.length
      ? { label: "Languages Spoken", value: minister.languages.join(", ") }
      : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  if (items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-6">Ministry Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
        {items.map((item) => (
          <div key={item.label} className="border-b border-r border-border px-6 py-6">
            <span className="block uppercase tracking-widest text-[10px] mb-2 text-foreground/50">
              {item.label}
            </span>
            <span className="text-sm font-mono break-words">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}