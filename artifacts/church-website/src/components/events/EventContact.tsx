import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";
import type { Event } from "@workspace/api-client-react";

export function EventContact({ event }: { event: Event }) {
  const { contactName, contactPhone, contactEmail, contactWhatsapp, organizer } = event;
  if (!contactName && !contactPhone && !contactEmail && !contactWhatsapp && !organizer) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-8">Contact</h2>
      <div className="border border-border bg-card p-6 sm:p-8 flex flex-col gap-4">
        {(contactName || organizer) && (
          <p className="font-light">
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground mr-2">
              Organizer
            </span>
            {contactName || organizer}
          </p>
        )}
        {contactPhone && (
          <a
            href={`tel:${contactPhone.replace(/[^+\d]/g, "")}`}
            className="inline-flex items-center gap-3 font-light hover:text-primary transition-colors w-fit"
          >
            <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            {contactPhone}
          </a>
        )}
        {contactEmail && (
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-3 font-light hover:text-primary transition-colors w-fit"
          >
            <Mail className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            {contactEmail}
          </a>
        )}
        {contactWhatsapp && (
          <a
            href={`https://wa.me/${contactWhatsapp.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-light hover:text-primary transition-colors w-fit"
          >
            <MessageCircle className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            WhatsApp
          </a>
        )}
      </div>
    </motion.section>
  );
}