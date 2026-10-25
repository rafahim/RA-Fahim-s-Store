import type { MetadataRoute } from "next";
import { isPreview, sitePageUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots { const sitemap=sitePageUrl("/sitemap.xml");return {rules:{userAgent:"*",...(isPreview?{disallow:"/"}:{allow:"/"})},...(sitemap?{sitemap}:{})}; }
