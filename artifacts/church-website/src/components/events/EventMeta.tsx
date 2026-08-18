import type { ComponentType } from "react";
import { Calendar, Clock, MapPin, Tag, User, Users, Ticket, Wallet } from "lucide-react";
import type { Event } from "@workspace/api-client-react";
import { formatTimeRange } from "../../lib/event-utils";

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-4 border-b border-border last:border-b-0">
      <Icon className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
      <div>
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">{label}</p>
        <p className="font-light">{value}</p>
      </div>
    </div>
  );
}

export function EventMeta({ event }: { event: Event }) {
  const registrationStatus = event.registrationRequired
    ? "Registration Required"
    : "No Registration Needed";

  return (
    <div className="border border-border bg-card p-6 sm:p-8">
      <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
        Details
      </h3>
      <div>
        <MetaItem icon={Calendar} label="Date" value={event.date} />
        <MetaItem icon={Clock} label="Time" value={formatTimeRange(event.time, event.endTime)} />
        <MetaItem icon={MapPin} label="Location" value={event.location} />
        <MetaItem icon={Tag} label="Category" value={event.category} />
        <MetaItem icon={User} label="Organizer" value={event.organizer} />
        <MetaItem icon={Users} label="Audience" value={event.audience} />
        <MetaItem icon={Ticket} label="Registration" value={registrationStatus} />
        <MetaItem icon={Wallet} label="Cost" value={event.cost || "Free"} />
      </div>
    </div>
  );
}