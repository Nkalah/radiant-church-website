import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function EventNotFound() {
  return (
    <div className="pt-32 pb-32 min-h-screen bg-background text-foreground flex items-center">
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">404</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Gathering Not Found</h1>
        <p className="text-muted-foreground font-light mb-10">
          Sorry, we couldn't find the gathering you're looking for.
        </p>
        <Button asChild className="rounded-none tracking-widest uppercase text-xs px-8">
          <Link href="/events">Back to Gatherings</Link>
        </Button>
      </div>
    </div>
  );
}