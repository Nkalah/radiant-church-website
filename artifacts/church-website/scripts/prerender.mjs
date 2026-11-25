import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(siteRoot, "dist", "public");
const vite = await createServer({
  configFile: path.join(siteRoot, "vite.config.ts"),
  root: siteRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const [{ default: App }, { getPageMetadata, renderSeoHead, seoRoutes }, { assemblies }, { ministriesData }] =
    await Promise.all([
      vite.ssrLoadModule("/src/App.tsx"),
      vite.ssrLoadModule("/src/lib/seo.ts"),
      vite.ssrLoadModule("/src/pages/assemblies-data.ts"),
      vite.ssrLoadModule("/src/data/ministries-data.ts"),
    ]);

  const paths = [
    ...seoRoutes.map(({ path }) => path),
    ...assemblies.map(({ slug }) => `/assemblies/${slug}`),
    ...ministriesData.map(({ id }) => `/ministers/${id}`),
  ];
  const uniquePaths = [...new Set(paths)];
  const template = await readFile(path.join(outputDirectory, "index.html"), "utf8");
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...uniquePaths.map(
      (route) =>
        `  <url><loc>https://afm-india.netlify.app${route === "/" ? "/" : route}</loc></url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");

  for (const route of uniquePaths) {
    const appHtml = renderToString(createElement(App, { initialLocation: route }));
    const html = template
      .replace(
        /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/,
        renderSeoHead(getPageMetadata(route)),
      )
      .replace(
        '<div id="root"></div>',
        `<div id="root" data-prerendered-path="${route}">${appHtml}</div>`,
      );
    const routeDirectory =
      route === "/" ? outputDirectory : path.join(outputDirectory, route.slice(1));

    await mkdir(routeDirectory, { recursive: true });
    await writeFile(path.join(routeDirectory, "index.html"), html);
  }

  await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap);
  console.log(`Prerendered ${uniquePaths.length} public routes and generated sitemap.xml.`);
} finally {
  await vite.close();
}
