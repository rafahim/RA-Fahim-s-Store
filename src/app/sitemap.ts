import type { MetadataRoute } from "next";
import { services } from "@/data/site";
import { isPreview, publicSiteUrl, sitePageUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!publicSiteUrl() || isPreview) return [];
  return ["/","/services/","/contact/",...services.map(s=>`/services/${s.slug}/`),"/privacy/","/terms/","/refund/"].map(path=>({url:sitePageUrl(path)!}));
}
