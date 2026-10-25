import type { Metadata } from "next";
import { site } from "@/data/site";

// Only the store's own deployment URL may become its canonical origin.
// rafahim.com identifies the developer; it is not a substitute store URL.
export function publicSiteUrl(): string | undefined {
  try {
    const url = new URL(site.url);
    if (!/^https?:$/.test(url.protocol) || /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(url.hostname) || url.hostname.endsWith(".invalid")) return undefined;
    return url.href.replace(/\/$/, "");
  } catch { return undefined; }
}
export function sitePageUrl(path: string): string | undefined {
  const origin = publicSiteUrl();
  return origin ? `${origin}/${path.replace(/^\//, "")}` : undefined;
}
export const storeDescription = "RA Fahim’s Store is the official store of rafahim.com, by RA Fahim, a web developer from Bangladesh. Websites, domains, hosting, free subdomains and more.";
export const storeTitle = "RA Fahim’s Store | rafahim.com Digital Services by RA Fahim";
export const isPreview = process.env.VERCEL_ENV === "preview" || process.env.CONTEXT === "deploy-preview";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = sitePageUrl(path);
  const image = sitePageUrl("/og-image.png");
  const fullTitle = `${title} | RA Fahim’s Store (rafahim.com)`;
  return {
    title, description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {title:fullTitle,description,siteName:site.name,type:"website",locale:"en_US",...(url?{url}:{}),...(image?{images:[{url:image,width:1200,height:630,alt:"RA Fahim’s Store — Digital services by web developer RA Fahim, part of rafahim.com"}]}:{})},
    twitter: {card:"summary_large_image",title:fullTitle,description,...(image?{images:[image]}:{})},
  };
}
export function jsonLd(value: unknown): string { return JSON.stringify(value).replace(/</g,"\\u003c"); }

export function identitySchema() {
  const url=publicSiteUrl();
  const person={"@type":"Person","@id":"https://rafahim.com/#ra-fahim",name:"RA Fahim",url:site.portfolio,jobTitle:"Web Developer & Creator",sameAs:site.socials.map(s=>s.href)};
  const organization={"@type":"Organization",...(url?{"@id":`${url}/#store`,url:`${url}/`,logo:sitePageUrl('/brand-logo.png')}:{"@id":"#store"}),name:site.name,sameAs:[site.portfolio],alternateName:["RA Fahim Store","RA Fahim Developer Store","rafahim.com store","rafahim store"],description:storeDescription,founder:{"@id":person["@id"]},contactPoint:{"@type":"ContactPoint",telephone:`+${site.whatsapp}`,contactType:"customer service",availableLanguage:["English","Bengali"]}};
  const website={"@type":"WebSite",...(url?{"@id":`${url}/#website`,url:`${url}/`}:{"@id":"#website"}),name:site.name,alternateName:"RA Fahim Developer Store",description:storeDescription,inLanguage:"en",publisher:{"@id":organization["@id"]},creator:{"@id":person["@id"]},isPartOf:{"@type":"WebSite","@id":"https://rafahim.com/#website",url:site.portfolio,name:"rafahim.com"}};
  return {"@context":"https://schema.org","@graph":[person,organization,website]};
}
