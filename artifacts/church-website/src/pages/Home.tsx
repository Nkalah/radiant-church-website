import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { ExpansionMap } from "@/components/ExpansionMap";
import { HeroCarousel } from "@/components/HeroCarousel";
import { QuickLinks } from "@/components/QuickLinks";
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
    { id: 1, name: "Reverend N.Jecheche", location: "Shiloh, Punjab", quote: "This church changed my life. The community and teaching here is unlike anything I have ever experienced.", avatarUrl: "rev.jpg" },
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
    <main className="min-h-[100dvh] w-full bg-background overflow-hidden font-sans text-foreground">
      <HeroCarousel />
      <QuickLinks />

      <section
        aria-labelledby="afm-india-introduction"
        className="border-b border-border bg-card px-6 py-12 md:py-16"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="afm-india-introduction"
            className="mb-5 font-serif text-3xl text-foreground md:text-4xl"
          >
            Apostolic Faith Mission in India
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Welcome to Apostolic Faith Mission in India (AFM India), a Christian
            church committed to sharing the Gospel of Jesus Christ, making
            disciples, equipping believers for ministry, and preparing members
            for the return of Jesus Christ. Through worship, prayer, biblical
            teaching, fellowship, and outreach, AFM India serves communities
            across its assemblies in India.
          </p>
          <nav
            aria-label="Explore AFM India"
            className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-primary"
          >
            <Link href="/about">About AFM India</Link>
            <Link href="/ministries">Leadership and ministries</Link>
            <Link href="/assemblies">Find an assembly</Link>
          </nav>
        </div>
      </section>

      {/* Featured Sermon */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/5] overflow-hidden relative">
              <img 
                src="bishop.jpg" 
                alt="AFM India minister sharing a sermon"
                width={1000}
                height={1006}
                className="w-full h-full object-cover grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-border/20 pointer-events-none"></div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start text-left">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Latest Message</span>
            <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-6 leading-tight">
              {featuredSermon ? featuredSermon.title : "The Architecture of Faith"}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
              {featuredSermon?.description || "Discover what it means to build a life of intention, grounded in unshakeable truth. A journey into the sacred spaces of the heart."}
            </p>
            <Link href={`/sermons/${featuredSermon?.id || 1}`} className="group flex items-center gap-4 text-foreground hover:text-primary transition-colors">
              <span className="text-sm tracking-widest uppercase pb-1 border-b border-foreground group-hover:border-primary transition-colors">Watch Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-card text-card-foreground border-y border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
          <div>
            <h3 className="font-serif text-5xl md:text-6xl text-primary mb-2">{stats?.memberCount || "800+"}</h3>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Global Members</p>
          </div>
          <div>
            <h3 className="font-serif text-5xl md:text-6xl text-primary mb-2">{stats?.countriesReached || "6"}</h3>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">States Reached</p>
          </div>
          <div>
            <h3 className="font-serif text-5xl md:text-6xl text-primary mb-2">{stats?.livesTransformed || "100+"}</h3>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Lives Transformed</p>
          </div>
          <div>
            <h3 className="font-serif text-5xl md:text-6xl text-primary mb-2">{stats?.yearsEstablished || "1.5"}</h3>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Years Established</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">Gatherings</span>
            <h2 className="font-serif text-4xl md:text-6xl">Upcoming Events</h2>
          </div>
          <Link href="/events">
            <span className="text-sm tracking-widest uppercase pb-1 border-b border-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer">
              View All Events
            </span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events?.map((event, i) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="group cursor-pointer border border-border bg-card hover:border-primary transition-colors flex flex-col h-full">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={event.imageUrl || `/images/event-${(i % 3) + 1}.png`} 
                    alt={event.title}
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-0 md:grayscale md:hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur text-foreground text-xs uppercase tracking-widest px-3 py-1 font-medium">
                    {event.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4 text-xs font-mono text-muted-foreground">
                    <span>{event.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light mb-6 flex-1">
                    {event.location}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

     {/* Global Mission */}
<section className="py-12 md:py-32 bg-white text-afm-navy">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
    <div>
      <span className="text-afm-red text-sm font-semibold tracking-widest uppercase mb-4 block">Global Impact</span>
      <h2 className="font-sans text-3xl md:text-4xl font-semibold mb-8 leading-tight text-afm-navy">
        Confession of <br/><span className="text-afm-gold italic">Faith</span>
      </h2>
      <p className="text-muted-foreground text-[13px] font-normal leading-5 mb-8">
        The Church makes the following confession of faith upon which all its beliefs, doctrines, teachings, practices, structures, government, discipline, ministries and departments, functions, activities, this Constitution and the Church's rules, regulations, and policies, and its existence shall be founded, based, and established, namely that the Church and its members shall believe and confess faith in:
      </p>

      <div className="space-y-6 mb-10">
        {[
          "The one true Triune God, God the Father, Son, and Holy Spirit, three persons each with peculiar attributes, yet in absolute and perfect unity.",
          "The authority of the Holy Scripture, otherwise referred to as the Canon, comprising 39 books of the Old Testament and 27 books of the New Testament as listed by one of the Church Fathers, Athanasius in 367 AD and as translated into the various languages of every nation, as the divinely inspired Word of God, given to us as the complete rule of faith and practice.",
          "The spoken Word of God as may be given through prophecy, to be believed and obeyed.",
          "The infallible rule of interpretation of Scripture, namely that the Scripture itself is the supreme judge by which all controversies of religion are to be determined, and all decrees of councils, opinions of ancient writers, doctrines of men, and spirits, are to be examined.",
          "The fallen nature and depravity of man by reason of which he is unable of himself to please God.",
          "The elect purpose and grace of God, whereby He, through the sacrificial death, resurrection, and ascension of His Son, Jesus Christ, provided for man a means of Justification, Regeneration, and Sanctification, which blessings are granted upon a person's repentance and faith, with works that befit repentance being a product of man's justification.",
          "The Church being the Body of Christ, and the fellowship of saints, governed by Christ, the Head of His Church, through His Word and the Scriptural Ministries.",
          "The Christian Sacraments (ordinances) of Water Baptism through triune immersion and the Lord's Supper.",
          "The Baptism in the Holy Spirit and the evidence thereof, including the evidence of speaking in tongues, and the manifestations of His Fruit, Gifts, and Graces.",
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <span className="text-afm-gold font-sans font-semibold text-lg leading-none mt-1 flex-shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-muted-foreground text-[13px] font-normal leading-5 border-l border-border pl-4">
              {item}
            </p>
          </div>
        ))}
      </div>

      <Link href="/about">
        <Button className="rounded-full uppercase tracking-widest text-xs px-8 h-12">
          Discover Our Mission
        </Button>
      </Link>
    </div>

    <div className="grid grid-cols-2 gap-4 md:sticky md:top-32">
      <div className="aspect-square bg-background/10 overflow-hidden">
        <img src="bible.jpg" alt="Bible used in AFM India worship and ministry" width={944} height={944} loading="lazy" className="w-full h-full object-cover opacity-80 mix-blend-normal md:mix-blend-luminosity" />
      </div>
      <div className="aspect-square bg-background/10 mt-12 overflow-hidden">
        <img src="conf3.jpg" alt="AFM India church gathering" width={1440} height={1440} loading="lazy" />
      </div>
    </div>
  </div>
</section>
      {/* Testimonials */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">Stories</span>
          <h2 className="font-serif text-4xl md:text-6xl">Lives Transformed</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
          {testimonials?.slice(0,4).map((testimonial, i) => (
            <div key={testimonial.id} className="text-center p-8 border border-border bg-card">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-6 border-2 border-primary/20">
                <img src={testimonial.avatarUrl || `/images/avatar-${i + 1}.png`} alt={`Portrait of ${testimonial.name}`} width={80} height={80} loading="lazy" className="w-full h-full object-cover grayscale-0 md:grayscale" />
              </div>
              <p className="font-serif text-xl italic mb-6 leading-relaxed text-muted-foreground">
                "{testimonial.quote}"
              </p>
              <h4 className="text-sm font-medium tracking-widest uppercase mb-1">{testimonial.name}</h4>
              <p className="text-xs text-muted-foreground">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <form 
  name="newsletter"
  method="POST"
  data-netlify="true"
  className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
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
  placeholder="Your email address" 
  className="h-14 rounded-none border-border bg-background focus-visible:ring-1 focus-visible:ring-primary flex-1"
  {...form.register("email")}
/>
<Button 
  type="submit"
  className="h-14 rounded-none uppercase tracking-widest text-xs px-8"
>
    Subscribe
  </Button>
</form>
      <ExpansionMap />
    </main>
  );
}



