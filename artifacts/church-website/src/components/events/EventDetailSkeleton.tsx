import { Skeleton } from "@/components/ui/skeleton";

export function EventDetailSkeleton() {
  return (
    <div className="site-page min-h-screen bg-background">
      <Skeleton className="w-full h-72 rounded-2xl sm:h-80" />
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 md:py-16 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="w-2/3 h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
          <Skeleton className="w-full h-72" />
        </div>
      </div>
    </div>
  );
}