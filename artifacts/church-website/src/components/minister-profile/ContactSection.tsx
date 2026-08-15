import { motion } from "framer-motion";
import { Mail, HandHeart, CalendarDays } from "lucide-react";
import type { Minister } from "../../types/minister";

interface ContactSectionProps {
  minister: Minister;
  onRequestPrayer?: () => void;
  onScheduleMeeting?: () => void;
}

export function ContactSection({
  minister,
  onRequestPrayer,
  onScheduleMeeting,
}: ContactSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="border border-border bg-card px-8 py-10 sm:px-12 sm:py-14 text-center"
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-3">Get in Touch</h2>
      <p className="text-muted-foreground font-light mb-8 max-w-md mx-auto">
        Reach out to {minister.leader} directly, or connect with the ministry team.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {minister.email && (
          <a
            href={`mailto:${minister.email}`}
            className="inline-flex items-center gap-2 uppercase tracking-widest text-xs font-medium border border-border px-6 py-3 hover:border-primary hover:text-primary transition-colors w-full sm:w-auto justify-center"
          >
            <Mail className="w-4 h-4" strokeWidth={1.5} />
            Email Minister
          </a>
        )}
        <button
          onClick={onRequestPrayer}
          className="inline-flex items-center gap-2 uppercase tracking-widest text-xs font-medium border border-border px-6 py-3 hover:border-primary hover:text-primary transition-colors w-full sm:w-auto justify-center"
        >
          <HandHeart className="w-4 h-4" strokeWidth={1.5} />
          Request Prayer
        </button>
        <button
          onClick={onScheduleMeeting}
          className="inline-flex items-center gap-2 uppercase tracking-widest text-xs font-medium bg-primary text-primary-foreground px-6 py-3 hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
        >
          <CalendarDays className="w-4 h-4" strokeWidth={1.5} />
          Schedule Meeting
        </button>
      </div>
    </motion.section>
  );
}