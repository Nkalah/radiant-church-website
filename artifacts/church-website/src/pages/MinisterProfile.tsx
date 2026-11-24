import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ministriesData } from "../data/ministries-data";
import { MinisterHeader } from "../components/minister-profile/MinisterHeader";
import { MinisterBiography } from "../components/minister-profile/MinisterBiography";
import { MinisterVision } from "../components/minister-profile/MinisterVision";
import { MinisterMission } from "../components/minister-profile/MinisterMission";
import { ResponsibilitiesList } from "../components/minister-profile/ResponsibilitiesList";
import { ScriptureCard } from "../components/minister-profile/ScriptureCard";
import { MinisterInfoGrid } from "../components/minister-profile/MinisterInfoGrid";
import { GallerySection } from "../components/minister-profile/GallerySection";
import { EventsTimeline } from "../components/minister-profile/EventsTimeline";
import { ContactSection } from "../components/minister-profile/ContactSection";
import { PageHero } from "../components/PageHero";

export default function MinisterProfile() {
  const { id } = useParams<{ id: string }>();
  // Swap this for a `useGetMinistry(id)` API hook when the backend
  // endpoint is available — falls back to the local mock data for now.
  const minister = ministriesData.find((m) => String(m.id) === id);

  if (!minister) {
    return (
      <div className="site-page min-h-screen bg-background text-foreground">
        <PageHero
          align="center"
          title="Minister Not Found"
          description="We couldn't find a profile for that minister."
        />
        <div className="py-10 text-center">
          <Link href="/ministries" className="rounded-full text-xs font-semibold uppercase tracking-wider text-primary">
            ← Back to Ministries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow={minister.category}
        title={minister.leader}
        description={`${minister.name}${minister.assembly ? ` · ${minister.assembly}` : ""}${minister.meetingTime ? ` · ${minister.meetingTime}` : ""}`}
      >
          <Link
            href="/ministries"
            className="inline-flex items-center gap-2 rounded-full border border-afm-navy/15 bg-afm-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-afm-navy shadow-sm transition hover:border-afm-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Back to Ministries
          </Link>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="space-y-12 md:space-y-16">
          <MinisterHeader minister={minister} />

          <MinisterBiography bio={minister.bio} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MinisterVision vision={minister.vision} />
            <MinisterMission mission={minister.mission} />
          </div>

          <ResponsibilitiesList responsibilities={minister.responsibilities} />

          <ScriptureCard
            scripture={minister.favoriteScripture}
            reference={minister.scriptureReference}
          />

          <MinisterInfoGrid minister={minister} />

          <GallerySection images={minister.galleryImages} />

          <EventsTimeline events={minister.recentEvents} />

          {minister.quote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="text-center max-w-4xl mx-auto py-8"
            >
              <p className="text-2xl md:text-4xl font-semibold leading-snug text-foreground/90">
                "{minister.quote}"
              </p>
            </motion.div>
          )}

          <ContactSection minister={minister} />
        </div>
      </div>
    </div>
  );
}
