import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";

export function EventNotFound() {
  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        align="center"
        eyebrow="404"
        title="Gathering Not Found"
        description="Sorry, we couldn't find the gathering you're looking for."
      />
      <div className="flex justify-center py-10">
        <Button asChild variant="outline" className="tracking-widest uppercase text-xs px-8">
          <Link href="/events">Back to Gatherings</Link>
        </Button>
      </div>
    </div>
  );
}