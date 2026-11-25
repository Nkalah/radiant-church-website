import { assemblies } from "../pages/assemblies-data";
import { ministriesData } from "../data/ministries-data";

export const SITE_URL = "https://afm-india.netlify.app";
export const ORGANIZATION_NAME = "Apostolic Faith Mission in India";
export const ORGANIZATION_ALTERNATE_NAME = "AFM India";
export const ORGANIZATION_DESCRIPTION =
  "A Christian church and ministry organization serving communities in India.";
export const LOGO_URL = `${SITE_URL}/afm.jpg`;
export const SOCIAL_URLS = [
  "https://www.instagram.com/afm_in_india/",
  "https://www.facebook.com/profile.php?id=61586109035850",
  "https://chat.whatsapp.com/Il9Fj0qOx8VDDq4xpNopQZ",
];

export interface PageMetadata {
  path: string;
  title: string;
  description: string;
  label: string;
}

export const seoRoutes: PageMetadata[] = [
  {
    path: "/",
    title: "Apostolic Faith Mission in India | AFM India Official Website",
    description:
      "Discover Apostolic Faith Mission in India (AFM India), our church leadership, assemblies, ministries, history and mission. Explore our official website and learn more about the ministry.",
    label: "Home",
  },
  {
    path: "/about",
    title: "About Apostolic Faith Mission in India | AFM India",
    description:
      "Learn about AFM India, its Christian mission, beliefs, ministry and commitment to sharing the Gospel and equipping believers.",
    label: "About AFM India",
  },
  {
    path: "/history",
    title: "History of Apostolic Faith Mission in India | AFM India",
    description:
      "Explore the history of Apostolic Faith Mission in India, from the mission's founding and first assembly to its continuing work.",
    label: "Church History",
  },
  {
    path: "/ministries",
    title: "Ministries of AFM India | Apostolic Faith Mission in India",
    description:
      "Meet AFM India's national leadership and ministers serving across assemblies, ministries and state leadership.",
    label: "Leadership and Ministries",
  },
  {
    path: "/assemblies",
    title: "AFM India Assemblies | Apostolic Faith Mission in India",
    description:
      "Explore AFM India assemblies, their locations, ministries and service information to find a local church community.",
    label: "Assemblies",
  },
  {
    path: "/contact",
    title: "Contact Apostolic Faith Mission in India | AFM India",
    description:
      "Contact Apostolic Faith Mission in India for information about services, assemblies, ministries or connecting with the church.",
    label: "Contact",
  },
  {
    path: "/events",
    title: "AFM India Church Events | Apostolic Faith Mission in India",
    description:
      "See upcoming gatherings and church events from Apostolic Faith Mission in India.",
    label: "Events",
  },
  {
    path: "/sermons",
    title: "AFM India Sermons | Apostolic Faith Mission in India",
    description:
      "Watch and listen to sermons and biblical teaching from Apostolic Faith Mission in India.",
    label: "Sermons",
  },
  {
    path: "/live",
    title: "Watch AFM India Live | Apostolic Faith Mission in India",
    description:
      "Watch live worship and church services from Apostolic Faith Mission in India.",
    label: "Live",
  },
  {
    path: "/prayer",
    title: "Prayer Requests | Apostolic Faith Mission in India",
    description:
      "Share a prayer request with the Apostolic Faith Mission in India pastoral team.",
    label: "Prayer",
  },
  {
    path: "/giving",
    title: "Giving | Apostolic Faith Mission in India (AFM India)",
    description:
      "Learn how to support the ministry and mission of Apostolic Faith Mission in India.",
    label: "Giving",
  },
  {
    path: "/media",
    title: "AFM India Media | Apostolic Faith Mission in India",
    description:
      "View photos and media from worship, ministry and community life at Apostolic Faith Mission in India.",
    label: "Media",
  },
  {
    path: "/blog",
    title: "Articles and Reflections | Apostolic Faith Mission in India",
    description:
      "Read articles, stories and reflections on faith and ministry from Apostolic Faith Mission in India.",
    label: "Articles",
  },
];

const pageMetadataByPath = new Map(
  seoRoutes.map((metadata) => [metadata.path, metadata]),
);

function normalizePath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}

export function getPageMetadata(path: string): PageMetadata {
  const normalizedPath = normalizePath(path);
  const knownPage = pageMetadataByPath.get(normalizedPath);
  if (knownPage) return knownPage;

  const assemblyMatch = normalizedPath.match(/^\/assemblies\/([^/]+)$/);
  if (assemblyMatch) {
    const slug = decodeURIComponent(assemblyMatch[1]);
    const assembly = assemblies.find(
      (item) => item.slug.toLowerCase() === slug.toLowerCase(),
    );
    const label = assembly?.name ?? "AFM India Assembly";
    return {
      path: normalizedPath,
      title: `${label} | Apostolic Faith Mission in India`,
      description:
        assembly?.description ??
        "Learn about an assembly of Apostolic Faith Mission in India.",
      label,
    };
  }

  const ministerMatch = normalizedPath.match(/^\/ministers\/(\d+)$/);
  if (ministerMatch) {
    const minister = ministriesData.find(
      (item) => item.id === Number(ministerMatch[1]),
    );
    const label = minister?.leader ?? "AFM India Minister";
    return {
      path: normalizedPath,
      title: `${label} | AFM India Leadership`,
      description: minister
        ? `${minister.name} at Apostolic Faith Mission in India. ${minister.description}`
        : "Meet the ministers serving Apostolic Faith Mission in India.",
      label,
    };
  }

  const dynamicPage = normalizedPath.match(
    /^\/(events|sermons|blog)\/([^/]+)$/,
  );
  if (dynamicPage) {
    const section = seoRoutes.find(
      (metadata) => metadata.path === `/${dynamicPage[1]}`,
    );
    const itemName = decodeURIComponent(dynamicPage[2])
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
    const label = `${section?.label ?? "AFM India"}: ${itemName}`;
    return {
      path: normalizedPath,
      title: `${itemName} | ${section?.label ?? "AFM India"} | AFM India`,
      description:
        section?.description ??
        "Explore church news and ministry from Apostolic Faith Mission in India.",
      label,
    };
  }

  return {
    path: normalizedPath,
    title: "Apostolic Faith Mission in India | AFM India",
    description: ORGANIZATION_DESCRIPTION,
    label: "Apostolic Faith Mission in India",
  };
}

export function getStructuredData(metadata: PageMetadata) {
  const canonicalUrl = `${SITE_URL}${metadata.path === "/" ? "/" : metadata.path}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Church",
      "@id": `${SITE_URL}/#organization`,
      name: ORGANIZATION_NAME,
      alternateName: ORGANIZATION_ALTERNATE_NAME,
      url: `${SITE_URL}/`,
      description: ORGANIZATION_DESCRIPTION,
      logo: LOGO_URL,
      sameAs: SOCIAL_URLS,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: `${ORGANIZATION_NAME} (${ORGANIZATION_ALTERNATE_NAME})`,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
    },
  ];

  if (metadata.path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: metadata.label,
          item: canonicalUrl,
        },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderSeoHead(metadata: PageMetadata) {
  const canonicalUrl = `${SITE_URL}${metadata.path === "/" ? "/" : metadata.path}`;
  const jsonLd = JSON.stringify(getStructuredData(metadata)).replace(
    /</g,
    "\\u003c",
  );
  const description = escapeHtml(metadata.description);
  const title = escapeHtml(metadata.title);
  const url = escapeHtml(canonicalUrl);
  const image = `${SITE_URL}/opengraph.jpg`;

  return `<!-- SEO_HEAD_START -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta name="robots" content="index, follow" />
    <meta property="og:site_name" content="${ORGANIZATION_NAME} (${ORGANIZATION_ALTERNATE_NAME})" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json" data-afm-seo>${jsonLd}</script>
    <!-- Add the exact Google Search Console verification meta tag here after receiving its code. -->
    <!-- SEO_HEAD_END -->`;
}
