import { motion } from "framer-motion";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="site-page min-h-screen bg-background text-foreground">
      <section
        aria-label="About the Apostolic Faith Mission in India"
        className="relative isolate overflow-hidden border-b border-border bg-afm-navy sm:bg-afm-off-white sm:py-14"
      >
        <div className="absolute -right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-afm-white/35 bg-afm-white p-1.5 shadow-xl sm:hidden">
          <img
            src="/afm-carousel-logo.png"
            alt=""
            aria-hidden="true"
            width={768}
            height={768}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-afm-navy via-afm-navy/95 to-afm-navy/20 sm:hidden"
        />
        <div className="relative mx-auto flex min-h-[15rem] max-w-7xl items-center px-4 py-10 sm:min-h-0 sm:block sm:px-6 sm:py-0 lg:px-8">
          <div className="max-w-[58%] sm:max-w-3xl sm:pt-8 md:pt-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-afm-gold sm:text-afm-red">
              Our Story
            </p>
            <h1 className="font-display text-3xl font-semibold leading-tight text-afm-white sm:font-bold sm:tracking-tight sm:text-afm-navy sm:text-4xl md:text-5xl">
              Created for <span className="text-afm-gold sm:text-afm-red">Connection</span>
            </h1>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 mb-16 md:mb-20">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed mb-8"
            >
             About Us

The Apostolic Faith Mission (AFM) Church in India was established nearly two years ago with a clear mission: to proclaim the Gospel of salvation to all people and lead them into a life-changing relationship with Jesus Christ.

We are committed to sharing the message of hope, grace, and eternal life through both our words and our deeds. In obedience to the Great Commission, we baptize believers in water in the name of the Father, the Son, and the Holy Spirit, and we prayerfully prepare converts to receive the baptism of the Holy Spirit with the evidence of speaking in tongues.

As a Spirit-filled church, we believe in the healing power of Jesus Christ and faithfully pray for the sick. We are dedicated to making disciples, equipping believers for ministry, and raising men and women who will serve God with passion, integrity, and purpose.

Our mission is to prepare God's people for the Second Coming of our Lord Jesus Christ through sound biblical teaching, fervent prayer, fasting, Christian education, fellowship, counseling, and practical acts of compassion. We strive to serve our communities by assisting those in need and demonstrating the love of Christ through various works of faith.

At AFM Church India, everyone is welcome to grow in faith, experience the presence of God, and become part of a vibrant family of believers committed to advancing the Kingdom of God.
.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg font-light leading-relaxed"
            >
             
            </motion.p>
          </div>
          <div className="relative mx-auto hidden aspect-square w-full max-w-[32rem] place-items-center overflow-hidden border border-afm-navy/10 bg-white p-5 shadow-sm sm:grid sm:p-8">
            <img 
              src="/afm.jpg"
              alt="Apostolic Faith Mission in India logo"
              width={2048}
              height={2048}
              className="h-full w-full object-contain"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-afm-navy/10"></div>
          </div>
        </div>

        <div className="mb-16 md:mb-20">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-8 border border-border bg-card">
              <h3 className="font-serif text-2xl mb-4 text-primary">Reverence</h3>
              <p className="text-muted-foreground font-light leading-relaxed">Approaching the divine with awe, intention, and quiet respect in a noisy world.</p>
            </div>
            <div className="p-8 border border-border bg-card">
              <h3 className="font-serif text-2xl mb-4 text-primary">Community</h3>
              <p className="text-muted-foreground font-light leading-relaxed">Living life together, sharing burdens, and celebrating victories in authentic relationship.</p>
            </div>
            <div className="p-8 border border-border bg-card">
              <h3 className="font-serif text-2xl mb-4 text-primary">Excellence</h3>
              <p className="text-muted-foreground font-light leading-relaxed">Honoring God through the careful craft of everything we create, from music to architecture.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative aspect-square lg:aspect-[4/5] max-w-md mx-auto w-full">
            <img 
              src="mom.jpg"
              alt="Pastor B. Makunda, AFM India leader"
              className="w-full h-full object-cover grayscale-0 md:grayscale"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">Leadership</span>
            <h2 className="font-serif text-5xl mb-6">Pastor B. Makunda</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
  Pastor Makunda and his wife have faithfully served the Lord by establishing and leading the Apostolic Faith Mission (AFM) Church ministry in India. With a deep passion for evangelism, discipleship, and Spirit-filled ministry, they are committed to seeing lives transformed through the power of the Gospel of Jesus Christ.

Through their leadership, the church continues to grow as a community of faith dedicated to worship, prayer, biblical teaching, and outreach. Their vision is to equip believers for ministry, strengthen families, raise future leaders, and prepare God's people for the return of our Lord Jesus Christ.

Together, they continue to serve with humility and dedication, building a Christ-centered church that impacts lives, communities, and future generations for the glory of God.
.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
