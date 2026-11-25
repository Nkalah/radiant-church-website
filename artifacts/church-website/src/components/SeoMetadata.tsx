import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  getPageMetadata,
  getStructuredData,
  SITE_URL,
} from "@/lib/seo";

function setMeta(attribute: "name" | "property", key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.content = value;
}

export function SeoMetadata() {
  const [location] = useLocation();

  useEffect(() => {
    const metadata = getPageMetadata(location);
    const canonicalUrl = `${SITE_URL}${metadata.path === "/" ? "/" : metadata.path}`;
    const imageUrl = `${SITE_URL}/opengraph.jpg`;

    document.title = metadata.title;
    setMeta("name", "description", metadata.description);
    setMeta("name", "robots", "index, follow");
    setMeta("property", "og:site_name", "Apostolic Faith Mission in India (AFM India)");
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;

    let structuredData = document.head.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"][data-afm-seo]',
    );
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.dataset.afmSeo = "true";
      document.head.append(structuredData);
    }
    structuredData.textContent = JSON.stringify(getStructuredData(metadata));
  }, [location]);

  return null;
}
