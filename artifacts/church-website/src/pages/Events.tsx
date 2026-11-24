import { motion } from "framer-motion";
import { Link } from "wouter";
import { useMemo, useState } from "react";
import { useListEvents } from "@workspace/api-client-react";
import { PageHero } from "../components/PageHero";

const FALLBACK_IMAGE = "/images/event-1.png";

export default function Events() {
  const { data: eventsData } = useListEvents({ upcoming: true });
  const events = eventsData ?? [
    { id: 1, title: "Sunday Worship Service", date: "June 7, 2026", time: "10:00 AM", location: "Main Auditorium", category: "Worship", imageUrl: "https://scontent.fluh1-1.fna.fbcdn.net/v/t39.30808-6/484067910_643135518310333_7937541290101860129_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=NuXgDfH-PLgQ7kNvwFtMxKS&_nc_oc=AdpR6wSrjKkIuCIKeJiRSKqyhiddt4fOBc4-nQeZM_kY8rGo8ovnHMfwC2gGklETskMTP6lKci4Mk99uBa0dXfOd&_nc_zt=23&_nc_ht=scontent.fluh1-1.fna&_nc_gid=B0G3lCSVVkteMSRmcVGs-g&_nc_ss=7b2a8&oh=00_Af_jTXwsqBmHXa250Pc2JxvlGe7X-mH1WFBFLeyWXVpe_A&oe=6A2692A1" },
    { id: 2, title: "Youth Conference", date: "June 11-14, 2026", time: "11:00 AM", location: "Ramamandi Hall", category: "Youth", imageUrl: "https://scontent.fluh1-2.fna.fbcdn.net/v/t39.30808-6/668605855_943617618262120_4594833095631455964_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=UDD9o8eMpAQQ7kNvwHZeo5v&_nc_oc=Adrq8iOvmA0nujVwHgeAr8WoH94rjVr2EhpTjd-B4iuqtkYLAOCReiGAOwSZXRrEaDv6F2cwi3xxIZHj-8DYO-iz&_nc_zt=23&_nc_ht=scontent.fluh1-2.fna&_nc_gid=cr_ZRmv52tayX_zS8XYApg&_nc_ss=7b2a8&oh=00_Af83qsAo_I7TKG0MN9GHVQG25eqSkeGItPeon04qmC6E3Q&oe=6A2698B4" },
    { id: 3, title: "Community Outreach", date: "TBA", time: "10:00 AM", location: "Guru Nanaki", category: "Outreach", imageUrl: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800" },
    { id: 4, title: "Wednesday Intercession", date: "Every Wednesday", time: "6:30 PM", location: "Main Sanctuary", category: "Worship", imageUrl: "https://scontent.fluh1-1.fna.fbcdn.net/v/t39.30808-6/484067910_643135518310333_7937541290101860129_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=NuXgDfH-PLgQ7kNvwFtMxKS&_nc_oc=AdpR6wSrjKkIuCIKeJiRSKqyhiddt4fOBc4-nQeZM_kY8rGo8ovnHMfwC2gGklETskMTP6lKci4Mk99uBa0dXfOd&_nc_zt=23&_nc_ht=scontent.fluh1-1.fna&_nc_gid=B0G3lCSVVkteMSRmcVGs-g&_nc_ss=7b2a8&oh=00_Af_jTXwsqBmHXa250Pc2JxvlGe7X-mH1WFBFLeyWXVpe_A&oe=6A2692A1" },
    { id: 5, title: "Bible Study", date: "Every Friday", time: "6:30 PM", location: "Fellowship Hall", category: "Fellowship", imageUrl: "https://scontent.fluh1-1.fna.fbcdn.net/v/t39.30808-6/484067910_643135518310333_7937541290101860129_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=NuXgDfH-PLgQ7kNvwFtMxKS&_nc_oc=AdpR6wSrjKkIuCIKeJiRSKqyhiddt4fOBc4-nQeZM_kY8rGo8ovnHMfwC2gGklETskMTP6lKci4Mk99uBa0dXfOd&_nc_zt=23&_nc_ht=scontent.fluh1-1.fna&_nc_gid=B0G3lCSVVkteMSRmcVGs-g&_nc_ss=7b2a8&oh=00_Af_jTXwsqBmHXa250Pc2JxvlGe7X-mH1WFBFLeyWXVpe_A&oe=6A2692A1" },
    { id: 6, title: "Church Planting", date: "TBA", time: "10:00 AM", location: "GUJARAT", category: "Missions", imageUrl: "https://scontent.fluh1-1.fna.fbcdn.net/v/t39.30808-6/484067910_643135518310333_7937541290101860129_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=NuXgDfH-PLgQ7kNvwFtMxKS&_nc_oc=AdpR6wSrjKkIuCIKeJiRSKqyhiddt4fOBc4-nQeZM_kY8rGo8ovnHMfwC2gGklETskMTP6lKci4Mk99uBa0dXfOd&_nc_zt=23&_nc_ht=scontent.fluh1-1.fna&_nc_gid=B0G3lCSVVkteMSRmcVGs-g&_nc_ss=7b2a8&oh=00_Af_jTXwsqBmHXa250Pc2JxvlGe7X-mH1WFBFLeyWXVpe_A&oe=6A2692A1" },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  // Categories are now derived from the event data instead of hardcoded
  // (Section 18), so a new category shows up automatically.
  const categories = useMemo(() => {
    const unique = Array.from(new Set(events.map((e) => e.category))).filter(Boolean);
    return ["All", ...unique];
  }, [events]);

  const filtered = activeCategory === "All"
    ? events
    : events.filter((e) => e.category === activeCategory);

  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <PageHero
        title="Gatherings"
        description="Where our community connects, grows, and serves together. Find your place here."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full text-xs uppercase tracking-widest font-semibold px-5 py-2.5 border whitespace-nowrap transition-colors
                ${activeCategory === category ? "bg-afm-navy text-afm-white border-afm-navy" : "border-border bg-afm-white text-afm-navy hover:border-afm-gold hover:bg-afm-gold/10"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:border-primary hover:shadow-md transition-all flex flex-col"
            >
              <Link href={`/events/${event.id}`}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={event.imageUrl || FALLBACK_IMAGE}
                    alt={event.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-afm-white/90 backdrop-blur text-afm-navy text-xs uppercase tracking-widest px-3 py-1.5 font-semibold">
                    {event.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4 text-xs font-mono text-muted-foreground">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                  <h3 className="font-serif text-2xl mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light mb-6 flex-1">
                    {event.location}
                  </p>
                  <div className="uppercase tracking-widest text-xs font-medium border-t border-border pt-4 mt-auto w-full group-hover:text-primary transition-colors">
                    View Details →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}