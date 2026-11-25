const locations = [
  { name: "Andhra Pradesh", detail: "State", x: 40.344, y: 66.5 },
  { name: "Haryana", detail: "State", x: 30.266, y: 27.515 },
  { name: "Gujarat", detail: "State", x: 16.609, y: 48.824 },
  { name: "Punjab", detail: "State", x: 28.188, y: 22.338 },
  { name: "Banur", detail: "Punjab", x: 32.094, y: 23.706 },
  { name: "Greater Noida", detail: "Uttar Pradesh", x: 34.406, y: 30.044 },
];

export function ExpansionMap() {
  return (
    <section
      id="afm-expansion"
      className="border-t border-afm-navy/10 bg-afm-off-white px-5 py-16 sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-afm-red">
            AFM Expansion
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-afm-navy sm:text-4xl md:text-5xl">
            Growing across India
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-afm-navy/70 sm:text-lg">
            Our church communities serve in Andhra Pradesh, Haryana, Gujarat and
            Punjab, with local locations in Banur and Greater Noida.
          </p>
        </div>

        <div className="mt-10 grid items-center gap-8 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="rounded-2xl border border-afm-navy/10 bg-white p-3 shadow-sm sm:p-6">
            <div className="relative mx-auto w-full max-w-[540px]">
              <img
                src="/india-afm-expansion-map.svg"
                alt="Map of India with Andhra Pradesh, Gujarat, Haryana, and Punjab highlighted and AFM markers for six locations."
                className="mx-auto block h-auto w-full"
                loading="lazy"
              />
              {locations.map((location) => (
                <img
                  key={location.name}
                  src="/afm-carousel-logo.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute z-10 aspect-square w-[4.7%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-afm-gold bg-white object-cover shadow-md"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-afm-navy/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-afm-red">
                Our presence
              </p>
              <h3 className="mt-2 text-2xl font-bold text-afm-navy sm:text-3xl">
                Locations we serve
              </h3>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {locations.map((location) => (
                <li
                  key={location.name}
                  className="flex items-center gap-3 rounded-xl border border-afm-navy/10 bg-afm-off-white/70 px-4 py-3"
                >
                  <img
                    src="/afm-carousel-logo.png"
                    alt=""
                    aria-hidden="true"
                    className="h-9 w-9 shrink-0 rounded-full border border-afm-gold/60 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-afm-navy">{location.name}</p>
                    <p className="text-xs text-afm-navy/65">{location.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
