import { motion } from "framer-motion";
import { Link } from "wouter";
import { ministriesData } from "../data/ministries-data";
import { PageHero } from "../components/PageHero";
import type { Minister } from "../types/minister";

interface LeadershipSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  introduction: string;
  ministers: Minister[];
  compactOnMobile?: boolean;
}

function LeadershipSectionHeading({
  id,
  eyebrow,
  title,
  introduction,
}: Pick<LeadershipSectionProps, "id" | "eyebrow" | "title" | "introduction">) {
  return (
    <header className="max-w-3xl border-b border-afm-navy/10 pb-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-afm-gold">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-serif text-3xl font-medium tracking-tight text-afm-navy sm:text-4xl"
      >
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {introduction}
      </p>
    </header>
  );
}

function getPortraitPositionClass(minister: Minister) {
  return minister.id === 12 ? "object-center" : "object-top";
}

function MinisterCard({
  minister,
  index,
}: {
  minister: Minister;
  index: number;
}) {
  return (
    <Link
      href={`/ministers/${minister.id}`}
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold focus-visible:ring-offset-2"
      aria-label={`View profile for ${minister.leader}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        className="group flex h-full cursor-pointer flex-col items-start gap-8 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary hover:shadow-md sm:flex-row sm:p-8"
      >
        <div className="aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-muted sm:w-40">
          <img
            src={minister.imageUrl || `/images/ministry-${(index % 3) + 1}.png`}
            alt={`${minister.leader}, ${minister.name} at AFM India`}
            width={600}
            height={600}
            loading="lazy"
            className={`h-full w-full object-cover ${getPortraitPositionClass(minister)} transition-transform duration-700 group-hover:scale-105 md:grayscale md:group-hover:grayscale-0`}
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
            {minister.category}
          </div>
          <h3 className="mb-4 font-serif text-3xl transition-colors group-hover:text-primary">
            {minister.name}
          </h3>
          <p className="mb-6 line-clamp-3 text-sm font-light leading-relaxed text-muted-foreground">
            {minister.description}
          </p>
          <div className="mb-6 grid grid-cols-2 gap-4 font-mono text-xs text-muted-foreground">
            <div>
              <span className="mb-1 block text-[10px] uppercase tracking-widest text-foreground/50">
                Leader
              </span>
              {minister.leader}
            </div>
            <div>
              <span className="mb-1 block text-[10px] uppercase tracking-widest text-foreground/50">
                Assembly
              </span>
              {minister.meetingTime}
            </div>
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-foreground transition-colors group-hover:text-primary">
            View Profile →
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

function CompactMinisterCard({ minister }: { minister: Minister }) {
  const responsibilitySummary =
    minister.responsibilities?.slice(0, 3).join(" · ") || minister.name;

  return (
    <Link
      href={`/ministers/${minister.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-afm-navy/10 bg-card shadow-sm transition hover:border-afm-gold/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold focus-visible:ring-offset-2"
      aria-label={`View profile for ${minister.leader}`}
    >
      <div className="aspect-square w-full overflow-hidden bg-muted">
        <img
          src={minister.imageUrl}
          alt={`${minister.leader}, ${minister.name} at AFM India`}
          width={600}
          height={600}
          loading="lazy"
          className={`h-full w-full object-cover ${getPortraitPositionClass(minister)} transition-transform duration-500 group-hover:scale-[1.03]`}
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="font-serif text-base font-semibold leading-snug text-afm-navy">
          {minister.leader}
        </h3>
        <p className="mt-2 line-clamp-3 text-[13px] leading-5 text-muted-foreground">
          {responsibilitySummary}
        </p>
        <span className="mt-auto pt-3 text-xs font-semibold text-afm-navy underline decoration-afm-gold/70 underline-offset-4 transition-colors group-hover:text-primary">
          View Details
        </span>
      </div>
    </Link>
  );
}

function LeadershipSection({
  id,
  eyebrow,
  title,
  introduction,
  ministers,
  compactOnMobile = false,
}: LeadershipSectionProps) {
  const standardGridClass = compactOnMobile
    ? "hidden grid-cols-1 gap-8 md:grid lg:grid-cols-2"
    : "grid grid-cols-1 gap-8 lg:grid-cols-2";

  return (
    <section
      aria-labelledby={id}
      className="space-y-7 border-t border-afm-navy/10 pt-10 first:border-t-0 first:pt-0"
    >
      <LeadershipSectionHeading
        id={id}
        eyebrow={eyebrow}
        title={title}
        introduction={introduction}
      />
      {compactOnMobile && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
          {ministers.map((minister) => (
            <CompactMinisterCard key={minister.id} minister={minister} />
          ))}
        </div>
      )}
      <div className={standardGridClass}>
        {ministers.map((minister, index) => (
          <MinisterCard
            key={minister.id}
            minister={minister}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

const visionary = ministriesData.filter((minister) => minister.id === 1);
const pioneerMinisters = ministriesData.filter(
  (minister) => minister.id >= 2 && minister.id <= 5,
);
const ministerialLeadership = ministriesData.filter(
  (minister) => minister.id >= 6,
);

export default function Ministries() {
  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        align="center"
        title="Find Your Place"
        description="Church is more than a Sunday service. It's a community growing together, serving the city, and shaping the future."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="space-y-14 md:space-y-20">
          <LeadershipSection
            id="visionary-heading"
            eyebrow="National Leadership"
            title="The Visionary"
            introduction="National leadership and vision for AFM India."
            ministers={visionary}
          />
          <LeadershipSection
            id="pioneer-ministers-heading"
            eyebrow="Pioneering Ministers"
            title="Pioneer Ministers"
            introduction="Serving in youth ministry, leadership development and media."
            ministers={pioneerMinisters}
          />
          <LeadershipSection
            id="ministerial-leadership-heading"
            eyebrow="Leadership Across India"
            title="Ministerial Leadership"
            introduction="Ministers serving across assemblies, missions and state leadership."
            ministers={ministerialLeadership}
            compactOnMobile
          />
        </div>
      </div>
    </div>
  );
}
