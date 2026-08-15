import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListMinistries } from "@workspace/api-client-react";
import { ministriesData } from "../data/ministries-data";

export default function Ministries() {
  const { data: ministriesFromApi } = useListMinistries();
  const ministries = ministriesFromApi ?? ministriesData;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl mb-6"
          >
            Find Your Place
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg font-light leading-relaxed"
          >
            Church is more than a Sunday service. It's a community growing together, serving the city, and shaping the future.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ministries.map((ministry, i) => (
            <Link key={ministry.id} href={`/ministers/${ministry.id}`} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group border border-border bg-card hover:border-primary transition-colors p-6 sm:p-8 flex flex-col sm:flex-row gap-8 items-start cursor-pointer h-full"
              >
                <div className="w-full sm:w-40 aspect-square overflow-hidden shrink-0 bg-muted">
                  <img
                    src={ministry.imageUrl || `/images/ministry-${(i % 3) + 1}.png`}
                    alt={ministry.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-primary text-xs tracking-widest uppercase font-medium mb-2">
                    {ministry.category}
                  </div>
                  <h3 className="font-serif text-3xl mb-4 group-hover:text-primary transition-colors">
                    {ministry.name}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light mb-6 line-clamp-3 leading-relaxed">
                    {ministry.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono text-muted-foreground mb-6">
                    <div>
                      <span className="block uppercase tracking-widest text-[10px] mb-1 text-foreground/50">Leader</span>
                      {ministry.leader}
                    </div>
                    <div>
                      <span className="block uppercase tracking-widest text-[10px] mb-1 text-foreground/50">Assembly</span>
                      {ministry.meetingTime}
                    </div>
                  </div>
                  <div className="uppercase tracking-widest text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                    View Profile →
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}