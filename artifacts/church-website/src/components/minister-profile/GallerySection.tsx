import { motion } from "framer-motion";

interface GallerySectionProps {
  images?: string[];
}

export function GallerySection({ images }: GallerySectionProps) {
  if (!images || images.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h2 className="font-serif text-3xl md:text-4xl mb-6">Ministry Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden bg-muted">
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}