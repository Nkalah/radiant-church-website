import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn(
          "mb-3 text-xs font-bold uppercase tracking-[0.18em]",
          inverted ? "text-afm-gold" : "text-afm-red",
        )}>
          {eyebrow}
        </p>
      )}
      <h1 className={cn(
        "text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl",
        inverted ? "text-afm-white" : "text-afm-navy",
      )}>
        {title}
      </h1>
      {description && (
        <p className={cn(
          "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
          inverted ? "text-afm-white/85" : "text-muted-foreground",
          align === "center" && "mx-auto",
        )}>
          {description}
        </p>
      )}
    </div>
  );
}

type PageHeroProps = SectionHeadingProps & {
  image?: string;
  imageFallback?: string;
  imageAlt?: string;
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function PageHero({
  image,
  imageFallback,
  imageAlt = "",
  meta,
  children,
  className,
  ...heading
}: PageHeroProps) {
  const inverted = Boolean(image);

  return (
    <section className={cn(
      "relative isolate overflow-hidden border-b border-border",
      image ? "bg-afm-navy py-12 sm:py-16" : "bg-afm-off-white py-10 sm:py-14",
      className,
    )}>
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt}
            aria-hidden={imageAlt ? undefined : true}
            onError={(event) => {
              if (imageFallback && event.currentTarget.getAttribute("src") !== imageFallback) {
                event.currentTarget.src = imageFallback;
              }
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-afm-navy/90 via-afm-navy/75 to-afm-navy/55" />
        </>
      )}
      <Container className="relative">
        {children && <div className="mb-5">{children}</div>}
        <SectionHeading {...heading} inverted={inverted} />
        {meta && (
          <div className={cn(
            "mt-5",
            inverted ? "text-afm-white/85" : "text-muted-foreground",
          )}>
            {meta}
          </div>
        )}
      </Container>
    </section>
  );
}
