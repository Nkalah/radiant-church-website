import { PageHero } from "../components/PageHero";

export default function Live() {
  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Live Now"
        title="Service begins at 10:00 AM EST"
        description="Sunday Worship Experience"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="flex min-h-[520px] flex-col gap-6 lg:h-[calc(100vh-360px)] lg:flex-row">
          {/* Main Video Area */}
          <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-afm-white shadow-sm">
            <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
              <div className="w-3 h-3 bg-afm-red rounded-full animate-pulse"></div>
              <span className="text-afm-red font-semibold tracking-widest uppercase text-sm">Live Now</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-afm-navy/80 space-y-4">
                <p className="font-serif text-3xl">Service begins at 10:00 AM EST</p>
                <p className="font-light tracking-widest uppercase text-sm">Sunday Worship Experience</p>
              </div>
            </div>
            
            {/* Controls Placeholder */}
            <div className="h-16 border-t border-border flex items-center justify-between px-6">
              <div className="flex gap-4 text-afm-navy/65">
                <span>▶</span>
                <span>Volume</span>
                <span>00:00:00 / Live</span>
              </div>
              <div className="text-afm-navy/65">
                <span>Fullscreen</span>
              </div>
            </div>
          </div>

          {/* Sidebar Chat / Schedule */}
          <div className="w-full rounded-2xl border border-border bg-card shadow-sm lg:w-96 flex flex-col">
            <div className="p-6 border-b border-border">
              <h3 className="font-medium tracking-widest uppercase text-sm">Live Chat</h3>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div className="text-center text-muted-foreground text-sm font-light italic">
                Chat connects 15 minutes before service.
              </div>
              {/* Chat Message Example */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-primary">Moderator</span>
                <p className="text-sm font-light text-foreground">Welcome to AFM Church! Let us know where you're watching from.</p>
              </div>
            </div>
            <div className="p-6 border-t border-border">
              <input 
                type="text" 
                placeholder="Type a message..." 
                disabled
                className="w-full rounded-2xl bg-afm-white border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-afm-gold disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
