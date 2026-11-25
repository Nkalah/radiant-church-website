import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { MapPin, Phone, Mail, Clock, ArrowLeft, Users, Heart, Shield, Star, Music, Globe } from "lucide-react";
import { assemblies } from "./assemblies-data";
import { PageHero } from "../components/PageHero";
import { AssemblyLocationMap } from "../components/AssemblyLocationMap";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Heart, Shield, Star, Music, Globe,
};

export default function AssemblyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const assembly = assemblies.find((a) => a.slug === slug);

  if (!assembly) {
    return (
      <div className="site-page min-h-screen bg-background text-foreground text-center">
        <PageHero title="Assembly Not Found" />
        <div className="py-12">
        <Link href="/assemblies">
          <span className="rounded-full text-xs uppercase tracking-widest font-medium hover:text-primary transition-colors">
            ← Back to Assemblies
          </span>
        </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        image={assembly.heroImage}
        imageAlt={assembly.name}
        eyebrow="AFM India"
        title={assembly.name}
        description={`"${assembly.tagline}"`}
        meta={<span className="inline-flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" />{assembly.location}</span>}
      >
        <Link
          href="/assemblies"
          className="inline-flex items-center gap-2 rounded-full border border-afm-white/35 bg-afm-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-afm-white backdrop-blur transition hover:bg-afm-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold"
        >
          <ArrowLeft className="h-4 w-4" /> All Assemblies
        </Link>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">

        {/* About */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">About</p>
            <h2 className="font-serif text-4xl mb-6">Our Story</h2>
            <p className="text-muted-foreground font-light leading-relaxed text-lg mb-6">
              {assembly.description}
            </p>
            <p className="text-muted-foreground font-light leading-relaxed">
              Established in {assembly.established}, {assembly.name} has been a beacon of hope and a centre of Spirit-filled worship in {assembly.location}. We are committed to making disciples, equipping believers for ministry, and reaching our community with the transforming power of the Gospel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {assembly.gallery.slice(0, 4).map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl">
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Service Times */}
        <div className="mb-24">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">When We Meet</p>
          <h2 className="font-serif text-4xl mb-10">Service Schedule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {assembly.serviceTimes.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-afm-white p-8 shadow-sm"
              >
                <Clock className="w-5 h-5 text-primary mb-4" />
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">{service.day}</p>
                <p className="font-serif text-xl mb-1">{service.name}</p>
                <p className="font-mono text-2xl text-primary">{service.time}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-24">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">Our Leaders</p>
          <h2 className="font-serif text-4xl mb-10">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assembly.leaders.map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border border-border">
                  <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover grayscale-0 md:grayscale" />
                </div>
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-1">{leader.position}</p>
                <h3 className="font-serif text-2xl mb-3">{leader.name}</h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ministries */}
        <div className="mb-24">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">Get Involved</p>
          <h2 className="font-serif text-4xl mb-10">Ministries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assembly.ministries.map((ministry, i) => {
              const Icon = iconMap[ministry.icon] || Users;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary transition-colors group"
                >
                  <Icon className="w-6 h-6 text-primary mb-4" />
                  <h3 className="font-serif text-xl mb-2 group-hover:text-primary transition-colors">{ministry.name}</h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">{ministry.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="p-8 border-b border-border">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Find Us</p>
            <h2 className="font-serif text-3xl">Contact & Location</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            <div className="bg-background p-8">
              <MapPin className="w-5 h-5 text-primary mb-4" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Address</p>
              <p className="font-light leading-relaxed">{assembly.address}</p>
            </div>
            <div className="bg-background p-8">
              <Phone className="w-5 h-5 text-primary mb-4" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Phone</p>
              <p className="font-light">{assembly.phone}</p>
            </div>
            <div className="bg-background p-8">
              <Mail className="w-5 h-5 text-primary mb-4" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Email</p>
              <p className="font-light">{assembly.email}</p>
            </div>
          </div>
        </div>

        <AssemblyLocationMap assembly={assembly} />

        {/* Back */}
        <div className="mt-16 text-center">
          <Link href="/assemblies">
            <span className="text-xs uppercase tracking-widest font-medium border border-border px-8 py-3 hover:bg-foreground hover:text-background transition-colors inline-block cursor-pointer">
              ← All Assemblies
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}