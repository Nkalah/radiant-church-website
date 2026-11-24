import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import type { Event } from "@workspace/api-client-react";
import { formatTimeRange } from "../../lib/event-utils";
import { PageHero } from "../PageHero";

const FALLBACK_IMAGE = "/images/event-1.png";

export function EventHero({ event }: { event: Event }) {
  return (
    <PageHero
      image={event.imageUrl || FALLBACK_IMAGE}
      imageFallback={FALLBACK_IMAGE}
      imageAlt={event.title}
      eyebrow={event.category}
      title={event.title}
      description={event.description
        ? event.description.length > 180
          ? `${event.description.slice(0, 180).trim()}…`
          : event.description
        : undefined}
      meta={
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base">
          <span>{event.date}</span>
          <span>{formatTimeRange(event.time, event.endTime)}</span>
          <span>{event.location}</span>
        </div>
      }
    >
      <Link
        href="/events"
        className="inline-flex items-center gap-2 rounded-full border border-afm-white/35 bg-afm-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-afm-white backdrop-blur transition hover:bg-afm-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Gatherings
      </Link>
    </PageHero>
  );
}