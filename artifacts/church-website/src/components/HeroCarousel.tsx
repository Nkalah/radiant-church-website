import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type TouchEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "wouter";

type HeroSlide = {
  media: string;
  mediaType: "image" | "video";
  imageAlt: string;
  eyebrow: string;
  heading: string;
  description: string;
  cta: string;
  href: string;
};

const slides: HeroSlide[] = [
  {
    media: "/pastorandmai.jpg",
    mediaType: "image",
    imageAlt: "AFM India church leaders welcoming the congregation",
    eyebrow: "Apostolic Faith Mission in India",
    heading: "AFM",
    description:
      "And they continued stedfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers.",
    cta: "Join Us",
    href: "/about",
  },
  {
    media: "/images/WhatsApp%20Video%202026-11-24%20at%2019.06.27.mp4",
    mediaType: "video",
    imageAlt: "AFM India church gathering video",
    eyebrow: "Faith. Family. Fellowship.",
    heading: "Find your church family",
    description: "Discover a welcoming AFM community and grow together in faith.",
    cta: "Our Branches",
    href: "/assemblies",
  },
  {
    media: "/afm-carousel-logo.png",
    mediaType: "image",
    imageAlt: "Apostolic Faith Mission in India logo",
    eyebrow: "Growing together",
    heading: "A place to belong",
    description: "Explore ministries, serve your community, and take your next step.",
    cta: "Explore Ministries",
    href: "/ministries",
  },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeSlide = slides[activeIndex];
  const isInteracting = isHovered || isTouching || hasFocus;

  useEffect(() => {
    if (prefersReducedMotion) setIsPlaying(false);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isPlaying || isInteracting || slides.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [activeIndex, isInteracting, isPlaying]);

  useEffect(() => {
    const nextSlide = slides[(activeIndex + 1) % slides.length];
    if (nextSlide.mediaType === "video") return;

    const nextImage = new Image();
    nextImage.src = nextSlide.media;
  }, [activeIndex]);

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % slides.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    touchStartX.current = event.changedTouches[0]?.screenX ?? null;
    setIsTouching(true);
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const touchEndX = event.changedTouches[0]?.screenX;
    if (touchStartX.current !== null && touchEndX !== undefined) {
      const swipeDistance = touchEndX - touchStartX.current;
      if (Math.abs(swipeDistance) > 48) {
        swipeDistance > 0 ? showPrevious() : showNext();
      }
    }
    touchStartX.current = null;
    setIsTouching(false);
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    const nextTarget = event.relatedTarget;
    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setHasFocus(false);
    }
  }

  return (
    <section
      aria-label="Featured messages"
      aria-roledescription="carousel"
      className="relative isolate aspect-[4/5] w-full overflow-hidden bg-afm-navy outline-none focus-visible:ring-4 focus-visible:ring-afm-gold md:aspect-[16/7]"
      onBlurCapture={handleBlur}
      onFocusCapture={() => setHasFocus(true)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchCancel={() => {
        touchStartX.current = null;
        setIsTouching(false);
      }}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      role="region"
      tabIndex={0}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={activeSlide.media}
          aria-live="off"
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} of ${slides.length}`}
          className="absolute inset-0"
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {activeSlide.mediaType === "video" ? (
            <video
              src={activeSlide.media}
              aria-hidden="true"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={activeSlide.media}
              alt={activeSlide.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading={activeIndex === 0 ? "eager" : "lazy"}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-afm-navy/90 via-afm-navy/60 to-afm-navy/15" />
          <div className="relative mx-auto flex h-full max-w-7xl items-end px-16 pb-24 sm:px-20 md:items-center md:px-16 md:pb-0 lg:px-20">
            <div className="max-w-3xl text-afm-white">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-afm-gold sm:text-sm sm:tracking-[0.2em]">
                {activeSlide.eyebrow}
              </p>
              <h1
                className={`${activeSlide.heading === "AFM" ? "font-display" : "font-sans"} text-6xl font-medium leading-none tracking-tight sm:text-7xl md:text-8xl`}
              >
                {activeSlide.heading}
              </h1>
              <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-afm-white/95 md:text-xl">
                {activeSlide.description}
              </p>
              <Link
                href={activeSlide.href}
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-afm-gold px-7 text-sm font-bold text-afm-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-afm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-white"
              >
                {activeSlide.cta}
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 top-4 z-10 flex justify-end px-4 sm:px-8 md:top-6 md:px-10">
        <button
          type="button"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          aria-pressed={!isPlaying}
          onClick={() => setIsPlaying((playing) => !playing)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-afm-white/40 bg-afm-white/20 text-afm-white shadow-md backdrop-blur-md transition hover:bg-afm-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold"
        >
          {isPlaying ? <Pause aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
        </button>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={showPrevious}
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-afm-white/40 bg-afm-white/20 text-afm-white shadow-md backdrop-blur-md transition hover:bg-afm-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold sm:left-8 md:left-10 md:h-12 md:w-12"
      >
        <ArrowLeft aria-hidden="true" size={20} />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={showNext}
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-afm-white/40 bg-afm-white/20 text-afm-white shadow-md backdrop-blur-md transition hover:bg-afm-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold sm:right-8 md:right-10 md:h-12 md:w-12"
      >
        <ArrowRight aria-hidden="true" size={20} />
      </button>

      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.media}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afm-gold ${
              index === activeIndex
                ? "w-8 bg-afm-gold"
                : "w-2.5 bg-afm-white/70 hover:bg-afm-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
