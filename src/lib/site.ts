/**
 * One source of truth for anything that needs the site's public address —
 * metadata, the sitemap, robots.txt and the JSON-LD block.
 *
 * Set NEXT_PUBLIC_SITE_URL in the host's environment to the real domain. Until
 * it is set everything falls back to the Render URL, which is correct but will
 * make canonical tags and Open Graph images point at onrender.com.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://netrasoft-web.onrender.com"
).replace(/\/$/, "");

export const siteName = "NetraSoft Solutions";

export const siteDescription =
  "We design, build and maintain the web, mobile and cloud software companies run on. Fixed scope, fixed price, a working build every week — and we stay after launch.";

/** Routes that belong in the sitemap, with their relative importance. */
export const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
];
