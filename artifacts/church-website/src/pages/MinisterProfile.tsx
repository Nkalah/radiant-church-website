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

export default function MinisterProfile() {
  const { id } = useParams<{ id: string }>();
  // Swap this for a `useGetMinistry(id)` API hook when the backend
  // endpoint is available — falls back to the local mock data for now.
  const minister = ministriesData.find((m) => String(m.id) === id);

  if (!minister) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl mb-4">Minister Not Found</h1>
          <p className="text-muted-foreground font-light mb-8">
            We couldn't find a profile for that minister.
          </p>
          <Link
            href="/ministries"
            className="uppercase tracking-widest text-xs font-medium text-primary"
          >
            ← Back to Ministries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-10"
        >
          <Link
            href="/ministries"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Back to Ministries
          </Link>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
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
              <p className="font-serif text-3xl md:text-5xl leading-snug text-foreground/90">
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
