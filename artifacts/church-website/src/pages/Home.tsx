import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { HeroCarousel } from "@/components/HeroCarousel";
import { QuickLinks } from "@/components/QuickLinks";
import { ExpansionMap } from "@/components/ExpansionMap";
import { 
  useGetChurchStats, 
  useGetFeaturedSermon, 
  useListTestimonials, 
  useListEvents,
  useSubscribeNewsletter 
} from "@workspace/api-client-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function Home() {
  const { data: stats } = useGetChurchStats();
  const { data: featuredSermon } = useGetFeaturedSermon();
  const { data: testimonialsData } = useListTestimonials();
  const testimonials = testimonialsData ?? [
    { id: 1, name: "Reverend N.Jecheche", location: "Philadephia, Haryana", quote: "This church changed my life. The community and teaching here is unlike anything I have ever experienced.", avatarUrl: "rev.jpg" },
    { id: 2, name: "Minister Peter", location: "Koinonia, Greater Noida", quote: "I found true fellowship and purpose here. The Word is preached with power and conviction every single week.", avatarUrl: "peter.jpg" },
    { id: 3, name: "Minister Praise", location: "Rehoboth, Chandigarh", quote: "From the moment I walked in, I felt at home. God is truly moving in this place in remarkable ways.",avatarUrl: "praise.jpg"},
    { id: 4, name: "Minister Shekainah", location: "Rehoboth, Chandigarh", quote: "Serving in  the house of the Lord is smomething that has changed the my life physically and spiritually.",avatarUrl: "sheky.jpg"},
  ];
  const { data: eventsData } = useListEvents({ limit: 3, upcoming: true });
  const events = eventsData ?? [
    { id: 1, title: "Sunday Worship Service", date: "Every Sunday", location: "Join us at your designated assembly location. Services begin at 10:00 AM.", category: "Worship", imageUrl: "church1.jpg" },
    { id: 2, title: "Youth Conference", date: "June 11-14, 2026", location: "Fellowship Hall", category: "Youth", imageUrl: "conf.jpg" },
    { id: 3, title: "Community Outreach", date: "TBA", location: "Jalandar", category: "Missions", imageUrl: "reho09.jpg" },
  ];
  
  const subscribeNewsletter = useSubscribeNewsletter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  function onSubscribe(values: z.infer<typeof newsletterSchema>) {
    subscribeNewsletter.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Subscribed",
            description: "You have been added to our newsletter.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to subscribe. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <main className="w-full overflow-hidden bg-afm-off-white font-sans text-afm-navy">
      <HeroCarousel />
      <QuickLinks />

      {/* Featured Sermon */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="flex-1 w-full relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-afm-white shadow-lg">
              <img 
                src="bishop.jpg" 
                alt="Latest Sermon" 
                className="w-full h-full object-cover grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-700"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-afm-navy/10"></div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start text-left">
            <span className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-afm-red">Latest Message</span>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-afm-navy sm:text-4xl md:text-5xl">
              {featuredSermon ? featuredSermon.title : "The Architecture of Faith"}
            </h2>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-afm-navy/75 md:text-lg">
              {featuredSermon?.description || "Discover what it means to build a life of intention, grounded in unshakeable truth. A journey into the sacred spaces of the heart."}
            </p>
            <Link
              href={`/sermons/${featuredSermon?.id || 1}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-afm-red px-7 text-sm font-bold text-afm-white shadow-sm transition hover:-translate-y-0.5 hover:bg-afm-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold"
            >
              Watch Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-afm-navy/10 bg-afm-white py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 text-center sm:gap-5 sm:px-6 md:grid-cols-4">
          <div className="rounded-2xl bg-afm-off-white p-4 sm:p-6">
            <h3 className="mb-2 text-4xl font-extrabold text-afm-navy sm:text-5xl">{stats?.memberCount || "800+"}</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-afm-navy/65">Global Members</p>
          </div>
          <div className="rounded-2xl bg-afm-off-white p-4 sm:p-6">
            <h3 className="mb-2 text-4xl font-extrabold text-afm-navy sm:text-5xl">{stats?.countriesReached || "6"}</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-afm-navy/65">States Reached</p>
          </div>
          <div className="rounded-2xl bg-afm-off-white p-4 sm:p-6">
            <h3 className="mb-2 text-4xl font-extrabold text-afm-navy sm:text-5xl">{stats?.livesTransformed || "100+"}</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-afm-navy/65">Lives Transformed</p>
          </div>
          <div className="rounded-2xl bg-afm-off-white p-4 sm:p-6">
            <h3 className="mb-2 text-4xl font-extrabold text-afm-navy sm:text-5xl">{stats?.yearsEstablished || "1.5"}</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-afm-navy/65">Years Established</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-5 md:mb-12 md:flex-row md:items-end">
          <div>
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.18em] text-afm-red">Gatherings</span>
            <h2 className="text-3xl font-bold text-afm-navy sm:text-4xl md:text-5xl">Upcoming Events</h2>
          </div>
          <Link
            href="/events"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-afm-navy/15 px-5 text-sm font-bold text-afm-navy transition hover:border-afm-gold hover:bg-afm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold"
          >
            View All Events
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-7">
          {events?.map((event, i) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-afm-navy/10 bg-afm-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={event.imageUrl || `/images/event-${(i % 3) + 1}.png`} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-0 md:grayscale md:hover:grayscale-0"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-afm-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-afm-navy shadow-sm backdrop-blur">
                    {event.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-start justify-between text-xs font-semibold text-afm-navy/60">
                    <span>{event.date}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-afm-navy transition-colors group-hover:text-afm-red">
                    {event.title}
                  </h3>
                  <p className="mb-2 flex-1 text-sm leading-relaxed text-afm-navy/70">
                    {event.location}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

     {/* Global Mission */}
<section className="border-y border-afm-navy/10 bg-afm-white py-16 md:py-24">
  <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-5 sm:px-6 md:grid-cols-2 md:gap-16">
    <div>
      <span className="mb-3 block text-sm font-bold uppercase tracking-[0.18em] text-afm-red">Global Impact</span>
      <h2 className="mb-6 text-3xl font-bold leading-tight text-afm-navy sm:text-4xl md:text-5xl">
        Confession of <br/><span className="italic text-afm-gold">Faith</span>
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-afm-navy/70">
        The Church makes the following confession of faith upon which all its beliefs, doctrines, teachings, practices, structures, government, discipline, ministries and departments, functions, activities, this Constitution and the Church's rules, regulations, and policies, and its existence shall be founded, based, and established, namely that the Church and its members shall believe and confess faith in:
      </p>

      <div className="space-y-6 mb-10">
        {[
          "The one true Triune God, God the Father, Son, and Holy Spirit, three persons each with peculiar attributes, yet in absolute and perfect unity.",
          "The authority of the Holy Scripture, otherwise referred to as the Canon, comprising 39 books of the Old Testament and 27 books of the New Testament as listed by one of the Church Fathers, Athanasius in 367 AD and as translated into the various languages of every nation, as the divinely inspired Word of God, given to us as the complete rule of faith and practice.",
          "The spoken Word of God as may be given through prophecy, to be believed and obeyed.",
          "The infallible rule of interpretation of Scripture, namely that the Scripture itself is the supreme judge by which all controversies of religion are to be determined, and all decrees of councils, opinions of ancient writers, doctrines of men, and spirits, are to be examined.",
          "The fallen nature and depravity of man by reason of which he is unable of himself to please God.",
          "The elect purpose and grace of God, whereby He, through the sacrificial death, resurrection, and ascension of His Son, Jesus Christ, provided for man a means of Justification, Regeneration, and Sanctification, which blessings are granted upon a person's repentance and faith, with works that beft repentance being a product of man's justification.",
          "The Church being the Body of Christ, and the fellowship of saints, governed by Christ, the Head of His Church, through His Word and the Scriptural Ministries.",
          "The Christian Sacraments (ordinances) of Water Baptism through triune immersion and the Lord's Supper.",
          "The Baptism in the Holy Spirit and the evidence thereof, including the evidence of speaking in tongues, and the manifestations of His Fruit, Gifts, and Graces.",
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <span className="mt-1 flex-shrink-0 text-lg font-extrabold leading-none text-afm-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="border-l border-afm-navy/15 pl-4 text-sm leading-relaxed text-afm-navy/80">
              {item}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/about"
        className="inline-flex h-12 items-center justify-center rounded-full border border-afm-navy bg-afm-navy px-8 text-xs font-bold uppercase tracking-wider text-afm-white shadow-sm transition hover:bg-afm-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold"
      >
        Discover Our Mission
      </Link>
    </div>

    <div className="grid grid-cols-2 gap-3 md:sticky md:top-32 md:gap-4">
      <div className="aspect-square overflow-hidden rounded-2xl bg-afm-off-white shadow-sm">
        <img src="bible.jpg" alt="An open Bible" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="mt-8 aspect-square overflow-hidden rounded-2xl bg-afm-off-white shadow-sm md:mt-12">
        <img src="conf3.jpg" alt="AFM India members gathered in fellowship" className="h-full w-full object-cover" loading="lazy" />
      </div>
    </div>
  </div>
</section>
      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:py-24">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-3 block text-sm font-bold uppercase tracking-[0.18em] text-afm-red">Stories</span>
          <h2 className="text-3xl font-bold text-afm-navy sm:text-4xl md:text-5xl">Lives Transformed</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {testimonials?.slice(0,4).map((testimonial, i) => (
            <div key={testimonial.id} className="rounded-2xl border border-afm-navy/10 bg-afm-white p-6 text-center shadow-sm sm:p-8">
              <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-full border-2 border-afm-gold/40">
                <img src={testimonial.avatarUrl || `/images/avatar-${i + 1}.png`} alt={testimonial.name} className="w-full h-full object-cover grayscale-0 md:grayscale" />
              </div>
              <p className="mb-5 text-base italic leading-relaxed text-afm-navy/75">
                "{testimonial.quote}"
              </p>
              <h4 className="mb-1 text-sm font-bold uppercase tracking-wider text-afm-navy">{testimonial.name}</h4>
              <p className="text-xs text-afm-navy/60">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-afm-navy/10 bg-afm-off-white px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-afm-red">
            Stay Connected
          </p>
          <h2 className="mb-8 text-3xl font-bold text-afm-navy sm:text-4xl">
            Get news from AFM India
          </h2>
          <form
            name="newsletter"
            method="POST"
            data-netlify="true"
            className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as any).toString(),
              }).then(() => {
                toast({ title: "Subscribed", description: "You have been added to our newsletter." });
                form.reset();
              }).catch(() => {
                toast({ title: "Error", description: "Failed to subscribe. Please try again.", variant: "destructive" });
              });
            }}
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <Input
              type="email"
              aria-label="Your email address"
              placeholder="Your email address"
              className="h-12 flex-1 rounded-full border-afm-navy/15 bg-afm-white px-5 focus-visible:ring-2 focus-visible:ring-afm-gold"
              {...form.register("email")}
            />
            <Button
              type="submit"
              className="h-12 rounded-full bg-afm-gold px-8 text-sm font-bold text-afm-navy shadow-sm hover:bg-afm-navy hover:text-afm-white"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
      <ExpansionMap />
    </main>
  );
}



