import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ecos-sahel.org";
  return [
    { url: `${base}/fr`, lastModified: new Date(), priority: 1 },
    { url: `${base}/en`, lastModified: new Date(), priority: 0.9 },
  ];
}
