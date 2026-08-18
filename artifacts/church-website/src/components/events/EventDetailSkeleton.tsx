import { Skeleton } from "@/components/ui/skeleton";

export function EventDetailSkeleton() {
  return (
    <div className="pb-32 min-h-screen bg-background">
      <Skeleton className="w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] rounded-none" />
      <div className="max-w-5xl mx-auto px-6 mt-12 sm:mt-16 space-y-16">
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