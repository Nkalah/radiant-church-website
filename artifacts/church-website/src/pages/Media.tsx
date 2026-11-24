import { motion } from "framer-motion";
import { PageHero } from "../components/PageHero";

export default function Media() {
  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        align="center"
        title="Gallery"
        description="A visual journal of life at AFM. Moments of worship, community, and beauty captured."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="col-span-1 md:col-span-2 row-span-2 relative group overflow-hidden rounded-2xl bg-muted"
          >
            <img src="/images/hero-bg.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative group overflow-hidden rounded-2xl bg-muted"
          >
            <img src="/images/event-1.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-0 md:grayscale md:hover:grayscale-0" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative group overflow-hidden rounded-2xl bg-muted"
          >
            <img src="/images/sermon-1.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-2xl bg-muted"
          >
            <img src="/images/event-2.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative group overflow-hidden rounded-2xl bg-muted"
          >
            <img src="/images/ministry-1.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-0 md:grayscale md:hover:grayscale-0" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative group overflow-hidden rounded-2xl bg-muted"
          >
            <img src="/images/about-interior.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-2xl bg-muted"
          >
            <img src="/images/event-3.png" alt="Gallery" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
