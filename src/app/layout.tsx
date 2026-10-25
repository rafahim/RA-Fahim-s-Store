import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { site } from "@/data/site";
import { identitySchema, isPreview, jsonLd, pageMetadata, publicSiteUrl, storeDescription, storeTitle } from "@/lib/seo";
import OrderProvider from "@/components/OrderProvider";
import Header from "@/components/Header";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import StoreIntro from "@/components/StoreIntro";

const origin = publicSiteUrl();
const home = pageMetadata("Home", storeDescription, "/");
export const metadata: Metadata = {
  ...home,
  ...(origin ? {metadataBase:new URL(`${origin}/`)} : {}),
  title:{ default:storeTitle,template:"%s | RA Fahim’s Store (rafahim.com)" },
  applicationName:site.name,
  authors:[{name:"RA Fahim",url:site.portfolio}],
  creator:"RA Fahim",publisher:site.name,
  keywords:["RA Fahim Store","RA Fahim’s Store","RA Fahim developer store","rafahim.com","rafahim.com store","rafahim store","RA Fahim rafahim.com","web developer Bangladesh","custom website development","WordPress website services","domain and hosting"],
  category:"Web development and digital services",
  robots:{index:!isPreview,follow:true},
  openGraph:{...home.openGraph,title:storeTitle},
  twitter:{...home.twitter,title:storeTitle},
  referrer:"strict-origin-when-cross-origin",
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(identitySchema())}} />
        <noscript><style>{".store-intro{display:none!important}"}</style></noscript>
        <StoreIntro />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <OrderProvider>
          <Experience />
          <Header />
          {children}
          <Footer />
        </OrderProvider>
      </body>
    </html>
  );
}
