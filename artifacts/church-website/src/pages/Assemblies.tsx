import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin, ArrowRight, Users, Church, Heart, Globe } from "lucide-react";
import { assemblies } from "./assemblies-data";
import { PageHero } from "../components/PageHero";

const stats = [
  { label: "Assemblies", value: "7", icon: Church },
  { label: "Members", value: "500+", icon: Users },
  { label: "Ministers", value: "13", icon: Heart },
  { label: "Cities Reached", value: "5+", icon: Globe },
];

export default function Assemblies() {
  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="AFM India"
        title="Our Assemblies"
        description="Seven communities, one mission — proclaiming the Gospel of Jesus Christ across Punjab and beyond. Find the assembly nearest to you."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16 md:mb-20"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl border border-border bg-afm-white p-8 text-center shadow-sm">
                <Icon className="w-5 h-5 text-primary mx-auto mb-3" />
                <p className="font-serif text-4xl mb-1">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Assembly Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-20">
          {assemblies.map((assembly, i) => (
            <motion.div
              key={assembly.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
            >
              <Link href={`/assemblies/${assembly.slug}`}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={assembly.cardImage}
                    alt={assembly.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-afm-navy/75 via-afm-navy/10 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-afm-white font-semibold text-xl">{assembly.name}</p>
                    <p className="text-afm-white/80 text-xs font-light italic">{assembly.tagline}</p>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{assembly.location}</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed flex-1 mb-6">
                    {assembly.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium border-t border-border pt-4 group-hover:text-primary transition-colors">
                    Explore Assembly <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Overview Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border border-border"
        >
          <div className="p-8 border-b border-border">
            <h2 className="font-serif text-3xl">Quick Overview</h2>
            <p className="text-muted-foreground text-sm font-light mt-1">Find your nearest assembly at a glance</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground font-medium">Assembly</th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground font-medium">Location</th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground font-medium">Established</th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground font-medium">Sunday Service</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {assemblies.map((assembly, i) => (
                  <tr key={assembly.id} className={`border-b border-border hover:bg-accent/5 transition-colors ${i === assemblies.length - 1 ? "border-b-0" : ""}`}>
                    <td className="p-4 font-serif text-base">{assembly.name}</td>
                    <td className="p-4 text-sm text-muted-foreground">{assembly.location}</td>
                    <td className="p-4 text-sm text-muted-foreground font-mono">{assembly.established}</td>
                    <td className="p-4 text-sm text-muted-foreground font-mono">{assembly.serviceTimes[0].time}</td>
                    <td className="p-4">
                      <Link href={`/assemblies/${assembly.slug}`}>
                        <span className="text-xs uppercase tracking-widest font-medium hover:text-primary transition-colors">
                          Visit →
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}