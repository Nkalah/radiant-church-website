import { motion } from "framer-motion";

interface MinisterBiographyProps {
  bio?: string;
}

export function MinisterBiography({ bio }: MinisterBiographyProps) {
  if (!bio) return null;

  const paragraphs = bio.split("\n\n").filter(Boolean);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="max-w-3xl"
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-6">About</h2>
      <div className="space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-muted-foreground font-light leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.section>
  );
}