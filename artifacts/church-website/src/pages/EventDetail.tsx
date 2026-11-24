import { useEffect } from "react";
import { useParams } from "wouter";
import { useGetEvent, getGetEventQueryKey } from "@workspace/api-client-react";

import { EventHero } from "@/components/events/EventHero";
import { EventMeta } from "@/components/events/EventMeta";
import { EventDescription } from "@/components/events/EventDescription";
import { EventExpectations } from "@/components/events/EventExpectations";
import { EventSchedule } from "@/components/events/EventSchedule";
import { EventSpeaker } from "@/components/events/EventSpeaker";
import { EventLocation } from "@/components/events/EventLocation";
import { EventRegistration } from "@/components/events/EventRegistration";
import { EventContact } from "@/components/events/EventContact";
import { RelatedEvents } from "@/components/events/RelatedEvents";
import { EventDetailSkeleton } from "@/components/events/EventDetailSkeleton";
import { EventNotFound } from "@/components/events/EventNotFound";
import { motion } from "framer-motion";

// TODO: replace with the real church/site name (also update anywhere else this is hardcoded).
const SITE_NAME = "Grace Community Church";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id || "", 10);
  const isValidId = Number.isFinite(eventId);

  const { data: event, isLoading, isError } = useGetEvent(eventId, {
    query: {
      enabled: isValidId,
      queryKey: getGetEventQueryKey(eventId),
      retry: false,
    },
  });

  // Dynamic SEO/metadata (Section 22) using the existing plain-React setup —
  // no extra dependency introduced.
  useEffect(() => {
    if (!event) return;

    const previousTitle = document.title;
    document.title = `${event.title} | ${SITE_NAME}`;

    const description = event.description?.slice(0, 155) ?? `Join us for ${event.title}.`;
    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute("content") ?? null;
    descriptionTag?.setAttribute("content", description);

    let ogImageTag = document.querySelector('meta[property="og:image"]');
    const createdOgTag = !ogImageTag && !!event.imageUrl;
    if (event.imageUrl) {
      if (!ogImageTag) {
        ogImageTag = document.createElement("meta");
        ogImageTag.setAttribute("property", "og:image");
        document.head.appendChild(ogImageTag);
      }
      ogImageTag.setAttribute("content", event.imageUrl);
    }

    return () => {
      document.title = previousTitle;
      if (previousDescription !== null) descriptionTag?.setAttribute("content", previousDescription);
      if (createdOgTag && ogImageTag) ogImageTag.remove();
    };
  }, [event]);

  if (!isValidId || isError) return <EventNotFound />;
  if (isLoading) return <EventDetailSkeleton />;
  if (!event) return <EventNotFound />;

  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <EventHero event={event} />

      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-20">
          <div className="md:col-span-2 space-y-20">
            <EventDescription event={event} />
            <EventExpectations event={event} />
            <EventSchedule event={event} />
            <EventSpeaker event={event} />
            {event.additionalInformation && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <h2 className="text-2xl font-bold md:text-3xl mb-6">Additional Information</h2>
                <div className="space-y-5 max-w-3xl">
                  {event.additionalInformation.split(/\n{2,}/).filter(Boolean).map((paragraph, index) => (
                    <p key={index} className="text-lg font-light leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
          <div>
            <EventMeta event={event} />
          </div>
        </div>

        <div className="space-y-20 mb-20">
          <EventLocation event={event} />
          <EventRegistration event={event} />
          <EventContact event={event} />
        </div>

        <RelatedEvents current={event} />
      </div>
    </div>
  );
}