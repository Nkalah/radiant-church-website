import type { Assembly, AssemblyMapLocation } from "../pages/assemblies-data";

const stateMapFiles: Record<AssemblyMapLocation["state"], string> = {
  Gujarat: "gujarat",
  Haryana: "haryana",
  Punjab: "punjab",
  "Uttar Pradesh": "uttar-pradesh",
};

interface AssemblyLocationMapProps {
  assembly: Assembly;
}

export function AssemblyLocationMap({ assembly }: AssemblyLocationMapProps) {
  const { city, state, x, y } = assembly.mapLocation;

  return (
    <section
      aria-labelledby="assembly-location-heading"
      className="mb-24 border-t border-afm-navy/10 pt-12"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-afm-red">
            Our Location
          </p>
          <h2
            id="assembly-location-heading"
            className="mt-3 font-serif text-3xl text-afm-navy sm:text-4xl"
          >
            Find us in {city}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            This map highlights {state}, where {assembly.name} serves. The AFM
            logo marks this assembly’s location.
          </p>
        </div>

        <div className="rounded-2xl border border-afm-navy/10 bg-white p-3 shadow-sm sm:p-6">
          <div className="relative mx-auto w-full max-w-[540px]">
            <img
              src={`/india-afm-assembly-map-${stateMapFiles[state]}.svg`}
              alt={`Map of India with ${state} highlighted.`}
              className="mx-auto block h-auto w-full"
              loading="lazy"
            />
            <img
              src="/afm-carousel-logo.png"
              alt={`AFM logo marking ${assembly.name} in ${city}, ${state}.`}
              className="absolute z-10 aspect-square w-[5.5%] min-w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-afm-gold bg-white object-cover shadow-md"
              style={{ left: `${x}%`, top: `${y}%` }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}