import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "wouter";
import { PageHero } from "./components/PageHero";

type Assembly = {
  name: string;
  date: string;
  location: string;
};

type TimelineEntry = {
  id: string;
  date: string;
  location: string;
  title: string;
  paragraphs: ReactNode[];
  assemblies?: Assembly[];
};

const assemblies: Assembly[] = [
  {
    name: "Philadelphia Assembly",
    date: "31 August 2025",
    location: "Palwal, Haryana",
  },
  {
    name: "Peniel Assembly",
    date: "22 November 2025",
    location: "Rama Mandi, Jalandhar, Punjab",
  },
  {
    name: "Rehoboth Assembly",
    date: "15 February 2026",
    location: "Chandigarh, Punjab",
  },
  {
    name: "Koinonia Assembly",
    date: "1 March 2026",
    location: "Greater Noida, Uttar Pradesh",
  },
  {
    name: "Bethel Assembly",
    date: "18 July 2026",
    location: "Vadodara, Gujarat",
  },
  {
    name: "Salem Assembly",
    date: "13 September 2026",
    location: "Khanna, Punjab",
  },
];

const timeline: TimelineEntry[] = [
  {
    id: "birth-of-the-mission",
    date: "29 December 2024",
    location: "India",
    title: "The Birth of the Mission",
    paragraphs: [
      <>
        The Apostolic Faith Mission in India was established on{" "}
        <strong>29 December 2024</strong> through a divine vision entrusted to a
        group of Zimbabwean students who had travelled to India to pursue their
        bachelor's degree studies. What began as a desire to establish a
        spiritual home for believers of the Apostolic Faith Mission heritage
        gradually developed into a missionary vision with a mandate to spread
        the Gospel throughout the nation of India.
      </>,
      <>
        The vision was birthed through prayer, faith and a deep conviction to
        see the work of God established in the land. It was spearheaded under
        the spiritual leadership and guidance of{" "}
        <strong>Bishop Blessing Makunda</strong>, who provided oversight and
        direction from Zimbabwe. Among the pioneering individuals who became
        the <strong>founding ministers</strong> of the Mission were Nkosilomusa
        Jecheche, Shekaina Mapepa, Praise Murengami and Peter Chokurongerwa,
        working alongside Bishop Makunda.
      </>,
      <>
        The establishment of the Mission was preceded by a long season of
        prayer and fasting. During this period, the pioneers committed
        themselves to seeking God's direction, interceding for the work and
        preparing spiritually for the responsibility of establishing the
        Apostolic Faith Mission in India. This season of spiritual preparation
        became a significant foundation upon which the Mission was built.
      </>,
      <>
        The vision was not merely to create a gathering place for Zimbabwean
        believers but to establish a church that would carry the Apostolic
        Faith Mission heritage and advance the Gospel of Jesus Christ among the
        diverse peoples of India.
      </>,
    ],
  },
  {
    id: "first-gathering-shiloh-assembly",
    date: "28–29 December 2024",
    location: "Jalandhar, Punjab",
    title:
      "The First Gathering and the Establishment of Shiloh Assembly",
    paragraphs: [
      <>
        On <strong>28 December 2024</strong>, the first gathering under the
        banner of the Apostolic Faith Mission was held. Its primary purpose
        was to bring together individuals who shared an Apostolic Faith
        Mission background and establish a platform where believers could
        meet regularly for worship, fellowship, prayer and spiritual growth.
      </>,
      <>
        The gathering was successful and marked a defining moment in the
        history of the Mission. It provided the foundation for the formal
        establishment of the first assembly in India.
      </>,
      <>
        On <strong>29 December 2024</strong>,{" "}
        <strong>Shiloh Assembly</strong> was officially launched in Jalandhar,
        Punjab, becoming the first assembly of the Apostolic Faith Mission in
        India. This marked the formal beginning of the Mission's organised
        presence in the country and the commencement of a journey that would
        extend into different states of India.
      </>,
      <>
        What began as a small gathering of believers gradually developed into
        a growing Christian community. People from different nationalities and
        backgrounds began joining the fellowship, and the church increasingly
        extended its reach beyond its initial Zimbabwean community to embrace
        Indian nationals and other people living in the country.
      </>,
    ],
  },
  {
    id: "spiritual-growth",
    date: "From its inception",
    location: "India",
    title: "Spiritual Growth and the Foundation of the Mission",
    paragraphs: [
      <>
        From its inception, the Apostolic Faith Mission in India established
        its ministry upon prayer, the preaching of the Word of God, worship
        and the fellowship of believers. Regular church services, all-night
        prayer meetings, assembly conferences, worship programmes and other
        spiritual gatherings became important features of the church's
        activities.
      </>,
      <>
        The Mission placed particular emphasis on the purity of the Gospel of
        Jesus Christ and the preservation of sound biblical doctrine. Its
        commitment has been to uphold the foundational teachings of the
        Christian faith and the Apostolic Pentecostal heritage, with a strong
        emphasis on holiness, righteousness, biblical truth and godly living.
      </>,
      <>
        Beyond numerical growth, the Mission has remained committed to raising
        well-established and spiritually mature believers who are firmly
        rooted in the Scriptures. Discipleship, biblical instruction and
        spiritual mentorship have been central to its vision of building a
        people who understand their faith, uphold Christian values and
        demonstrate the character of Christ in their daily lives.
      </>,
      <>
        The Mission's vision has therefore extended beyond gathering
        multitudes to establishing a spiritually grounded church whose members
        are equipped to serve God, strengthen the body of Christ and advance
        the Gospel.
      </>,
    ],
  },
  {
    id: "power-of-god",
    date: "Ongoing ministry",
    location: "India",
    title: "The Manifestation of the Power of God",
    paragraphs: [
      <>
        As a Pentecostal church, the Apostolic Faith Mission in India has
        maintained a strong emphasis on the operation and manifestation of the
        power of the Holy Spirit. Its spiritual gatherings have been
        characterised by fervent prayer, passionate worship and an expectation
        of divine intervention.
      </>,
      <>
        Miracles, signs and wonders have been an important part of the church's
        spiritual identity. Testimonies of divine healing, deliverance,
        breakthroughs and the transforming power of God have contributed to
        strengthening the faith of believers and affirming the church's
        conviction in the living power of the Gospel.
      </>,
      <>
        The prophetic ministry has also been a visible and significant feature
        of the spiritual life of the Mission. The operation of the gifts of
        the Holy Spirit, particularly prophecy, has contributed to the
        edification, encouragement and strengthening of believers. Through its
        emphasis on spiritual gifts, the church continues to recognise and
        uphold the active work of the Holy Spirit in the life of the believer
        and the wider body of Christ, while maintaining the authority of
        Scripture as the foundation for all spiritual teaching and practice.
      </>,
      <>
        The Mission remains committed to a Christianity that is deeply rooted
        in the Word of God and accompanied by the power and presence of the
        Holy Spirit.
      </>,
    ],
  },
  {
    id: "expansion-across-india",
    date: "2025–2026",
    location: "Assemblies across India",
    title: "Expansion and the Establishment of Assemblies Across India",
    paragraphs: [
      <>
        As the work continued to grow, the vision of the Apostolic Faith
        Mission in India expanded beyond its original location in Jalandhar.
        The need to establish additional assemblies in other cities and states
        became increasingly evident.
      </>,
      <>
        Through the dedication of the founding ministers, pioneering members
        and subsequently appointed ministers, the Mission began establishing
        assemblies in different geographical locations. Each new assembly
        represented another step towards fulfilling the broader missionary
        vision of taking the Gospel to the diverse communities of India.
      </>,
      <>Among the assemblies established during this period were:</>,
      <>
        These assemblies became centres of worship, fellowship, discipleship
        and evangelism in their respective communities. Their establishment
        demonstrated the growing reach of the Mission and its commitment to
        making the Gospel accessible to people across different regions of
        India.
      </>,
      <>
        The expansion also reflected the increasing participation of people
        from different nationalities and cultural backgrounds, including
        indigenous Indian believers, in the life and ministry of the church.
      </>,
    ],
    assemblies,
  },
  {
    id: "punjab-youth-conference",
    date: "31 July to 3 August 2025",
    location: "Punjab",
    title: "The Punjab Youth Conference: A New Dimension of Growth",
    paragraphs: [
      <>
        One of the significant milestones in the development of the Apostolic
        Faith Mission in India was the{" "}
        <strong>Punjab Youth Conference</strong>, held from 31 July to 3
        August 2025.
      </>,
      <>
        The conference attracted large numbers of young people and other
        believers, including participants from outside Punjab. It provided a
        platform for spiritual empowerment, worship, fellowship and the
        strengthening of the youth within the Mission.
      </>,
      <>
        The gathering became an important moment in the wider development of
        the church. Its impact extended beyond the immediate conference,
        creating greater awareness of the Mission and opening opportunities
        for the work to reach other states.
      </>,
      <>
        The conference further strengthened the conviction that the Apostolic
        Faith Mission in India had a national missionary mandate, with a
        responsibility to reach people beyond its original geographical
        location.
      </>,
    ],
  },
  {
    id: "first-national-conference",
    date: "11 to 14 June 2026",
    location: "Jalandhar, Punjab",
    title: "The First National Conference",
    paragraphs: [
      <>
        From <strong>11 to 14 June 2026</strong>, the Apostolic Faith Mission
        in India hosted its <strong>first National Conference</strong> in
        Jalandhar, Punjab. This was a historic gathering that brought together
        believers, ministers and church members from different parts of the
        country.
      </>,
      <>
        The conference provided an important opportunity for collective
        worship, spiritual strengthening, fellowship and the consolidation of
        the growing work of the Mission. It also demonstrated the increasing
        geographical reach of the church and the developing relationships
        among its assemblies.
      </>,
      <>
        As the number of assemblies and members continued to increase, the
        need for larger venues and more effective regional gatherings became
        apparent. Consequently, the Mission moved towards organising annual
        state-level conferences from 2027. This development was intended to
        accommodate the growing number of believers, provide suitable venues
        for larger gatherings and strengthen the spiritual and administrative
        coordination of the work within individual states.
      </>,
      <>
        The introduction of state conferences marked another significant step
        in the organisational development of the Apostolic Faith Mission in
        India.
      </>,
    ],
  },
  {
    id: "missionary-church",
    date: "A growing movement",
    location: "Across India",
    title: "The Missionary Church of India",
    paragraphs: [
      <>
        As the Mission continued to establish assemblies across different
        states, its identity as a missionary church in India became
        increasingly evident. What began among a small group of Zimbabwean
        students developed into a growing Christian movement embracing people
        of different nationalities, cultures and backgrounds.
      </>,
      <>
        Under the leadership of <strong>Bishop Blessing Makunda</strong> and{" "}
        <strong>Reverend Nkosilomusa Jecheche</strong>, together with dedicated
        founding ministers and subsequently appointed ministers, the work
        continued to advance through evangelism, discipleship, church planting
        and the establishment of new assemblies.
      </>,
      <>
        The Mission's vision has remained centred on reaching the people of
        India with the Gospel of Jesus Christ, establishing spiritually
        grounded assemblies and raising believers who are equipped to serve
        God and extend His Kingdom.
      </>,
      <>
        Its commitment to the purity of the Gospel, sound biblical doctrine,
        the manifestation of the Holy Spirit and the development of mature
        disciples continues to shape its identity and ministry.
      </>,
      <>
        The name and identity of the Apostolic Faith Mission in India have
        therefore come to represent more than the establishment of church
        assemblies. They represent a missionary undertaking founded upon
        faith, sustained through prayer and driven by the conviction that the
        Gospel of Jesus Christ must reach every nation, community and
        generation.
      </>,
    ],
  },
  {
    id: "continuing-vision",
    date: "The continuing vision",
    location: "Throughout India",
    title: "The Continuing Vision",
    paragraphs: [
      <>
        The Apostolic Faith Mission in India continues to advance its
        missionary vision through the establishment of new assemblies, the
        development of its ministries, the strengthening of its leadership and
        the discipleship of believers.
      </>,
      <>
        The journey that began with a small gathering in Jalandhar has
        developed into a growing work extending across different states of
        India. Each assembly established, each believer discipled, each
        conference conducted and each life transformed forms part of the
        continuing history of the Mission.
      </>,
      <>
        As the church looks to the future, its commitment remains to preserve
        the purity of the Gospel, uphold sound biblical doctrine, nurture the
        spiritual gifts of the Holy Spirit, raise dedicated ministers and
        establish a strong indigenous missionary presence throughout India.
      </>,
      <>
        The Apostolic Faith Mission in India acknowledges the dedication and
        sacrifice of its pioneers, ministers, members and all those who have
        contributed to the establishment and advancement of the work.
      </>,
      <>
        From a small gathering of believers to a growing missionary movement,
        the story of the Apostolic Faith Mission in India remains a testimony
        of faith, prayer, obedience and the enduring work of God. The mission
        continues, and the vision remains alive: to preach Christ, establish
        believers and advance the Gospel across India.
      </>,
    ],
  },
];

export default function History() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const lineProgress =
    activeIndex / Math.max(timeline.length - 1, 1);

  useEffect(() => {
    const timelineElement = timelineRef.current;
    if (!timelineElement || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      () => {
        const readingPosition = window.innerHeight * 0.4;
        const entries = Array.from(
          timelineElement.querySelectorAll<HTMLElement>("[data-timeline-index]"),
        );
        const activeEntry = entries.reduce((closest, entry) =>
          Math.abs(entry.getBoundingClientRect().top - readingPosition) <
          Math.abs(closest.getBoundingClientRect().top - readingPosition)
            ? entry
            : closest,
        );
        setActiveIndex(Number(activeEntry.dataset.timelineIndex));
      },
      {
        rootMargin: "-30% 0px -52% 0px",
        threshold: 0,
      },
    );

    timelineElement
      .querySelectorAll<HTMLElement>("[data-timeline-index]")
      .forEach((entry) => observer.observe(entry));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-page min-h-screen bg-afm-off-white text-afm-navy">
      <PageHero
        video="/images/kling_20261125_VIDEO_Create_an__2465_0.mp4"
        eyebrow="Our Heritage"
        title={
          <span className="font-display text-[1.85rem] font-semibold leading-[1.08] sm:text-4xl md:text-5xl">
            The History of AFM International
          </span>
        }
        description="From a humble revival on Azusa Street to a global Pentecostal movement — the story of how the fire of God travelled from Los Angeles to South Africa, Zimbabwe, and the nations of the world."
        className="py-9 sm:py-12 lg:py-24"
      />

      <main>
        <section
          aria-label="History of the Apostolic Faith Mission in India"
          className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl sm:mb-14 md:ml-[14rem]">
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-afm-red">
                A growing legacy
              </p>
              <p className="font-display text-2xl leading-snug text-afm-navy sm:text-3xl">
                A journey shaped by prayer, faith and a vision for India.
              </p>
            </div>

            <div
              ref={timelineRef}
              aria-label="AFM India historical milestones"
              className="relative"
            >
              <div
                aria-hidden="true"
                className="absolute bottom-1 left-[6px] top-[0.4rem] w-px bg-afm-navy/15 md:left-[12.5rem]"
              />
              <motion.div
                aria-hidden="true"
                className="absolute bottom-1 left-[6px] top-[0.4rem] w-px origin-top bg-afm-gold md:left-[12.5rem]"
                initial={false}
                animate={{ scaleY: lineProgress }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.55,
                  ease: "easeInOut",
                }}
              />

              <div className="space-y-10 sm:space-y-12 md:space-y-16">
                {timeline.map((item, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <article
                      key={item.id}
                      aria-current={isActive ? "step" : undefined}
                      aria-labelledby={`${item.id}-title`}
                      data-timeline-index={index}
                      className="relative grid min-w-0 grid-cols-1 gap-3 pl-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-12 md:gap-y-0 md:pl-0"
                    >
                      <motion.span
                        aria-hidden="true"
                        className={`absolute left-0 top-[0.15rem] z-10 flex h-[13px] w-[13px] items-center justify-center rounded-full border bg-afm-off-white transition-colors duration-300 motion-reduce:transition-none md:left-[12.0625rem] ${
                          isActive
                            ? "border-afm-gold"
                            : "border-afm-navy/35"
                        }`}
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : { scale: isActive ? 1 : 0.86 }
                        }
                        transition={{ duration: 0.25 }}
                      >
                        <span
                          className={`h-1 w-1 rounded-full transition-colors duration-300 motion-reduce:transition-none ${
                            isActive ? "bg-afm-red" : "bg-transparent"
                          }`}
                        />
                      </motion.span>

                      <div className="min-w-0 md:pt-0 md:pr-6 md:text-right">
                        <p
                          className={`text-xs font-semibold uppercase leading-relaxed tracking-[0.13em] ${
                            isActive ? "text-afm-navy" : "text-afm-navy/60"
                          }`}
                        >
                          {item.date}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-afm-navy/60">
                          {item.location}
                        </p>
                      </div>

                      <div
                        className={`min-w-0 border-l py-1 pl-4 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-6 md:col-start-2 md:row-start-1 md:px-7 md:py-6 ${
                          isActive
                            ? "border-afm-gold bg-white/80 shadow-sm"
                            : "border-afm-navy/10 hover:border-afm-navy/30 hover:bg-white/45"
                        } motion-reduce:transition-none`}
                      >
                        <h2
                          id={`${item.id}-title`}
                          className={`font-display text-[1.65rem] font-semibold leading-tight sm:text-3xl ${
                            isActive ? "text-afm-navy" : "text-afm-navy/90"
                          }`}
                        >
                          {item.title}
                        </h2>
                        <div className="mt-5 max-w-3xl space-y-4 text-base leading-[1.75] text-afm-navy/75 sm:text-[1.0625rem]">
                          {item.paragraphs.map((paragraph, paragraphIndex) => (
                            <p key={`${item.id}-paragraph-${paragraphIndex}`}>
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {item.assemblies && (
                          <ul
                            aria-label="Assemblies established during this period"
                            className="mt-7 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
                          >
                            {item.assemblies.map((assembly) => (
                              <li
                                key={assembly.name}
                                className="group min-w-0 border border-afm-navy/10 bg-afm-off-white/70 p-4 transition-colors duration-200 hover:border-afm-gold/70 hover:bg-white motion-reduce:transition-none"
                              >
                                <div className="flex items-start gap-3">
                                  <MapPin
                                    aria-hidden="true"
                                    className="mt-0.5 shrink-0 text-afm-gold transition-colors duration-200 group-hover:text-afm-red motion-reduce:transition-none"
                                    size={16}
                                    strokeWidth={1.7}
                                  />
                                  <div className="min-w-0">
                                    <h3 className="font-display text-xl font-semibold leading-tight text-afm-navy">
                                      {assembly.name}
                                    </h3>
                                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-afm-red">
                                      {assembly.date}
                                    </p>
                                    <p className="mt-1 break-words text-sm leading-relaxed text-afm-navy/65">
                                      {assembly.location}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <section
              aria-labelledby="history-closing-title"
              className="relative mt-16 overflow-hidden bg-afm-navy px-6 py-10 sm:mt-24 sm:px-10 sm:py-14 md:px-14"
            >
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-1 bg-afm-gold"
              />
              <div className="relative mx-auto max-w-3xl">
                <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-afm-gold">
                  The work continues
                </p>
                <h2
                  id="history-closing-title"
                  className="font-display text-3xl font-medium leading-tight text-afm-white sm:text-4xl md:text-5xl"
                >
                  From a small gathering of believers to a growing missionary
                  movement, the mission continues.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-[1.75] text-afm-white/80 sm:text-[1.0625rem]">
                  The story of the Apostolic Faith Mission in India remains a
                  testimony of faith, prayer, obedience and the enduring work
                  of God. The vision remains alive: to preach Christ,
                  establish believers and advance the Gospel across India.
                </p>
                <Link
                  href="/"
                  aria-label="Back to the AFM India home page"
                  className="mt-8 inline-flex min-h-11 items-center gap-2 border border-afm-white/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-afm-white transition-colors hover:border-afm-gold hover:bg-afm-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-afm-gold"
                >
                  <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.8} />
                  Back to Home
                </Link>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
