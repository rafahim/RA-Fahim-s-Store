import type { Metadata } from "next";
import Link from "next/link";
import FreeSubdomainForm from "@/components/FreeSubdomainForm";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata("Get a free subdomain", "Request a free subdomain from RA Fahim. Fill in your details and send them on WhatsApp.", "/free-subdomain/"),
  robots: { index: false, follow: true },
};

export default function FreeSubdomainPage() {
  return (
    <main id="main-content" className="ord-page">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-14 md:py-20">
        <header className="ord-head mx-auto max-w-3xl">
          <Link href="/services/domain/" className="text-sm font-semibold text-strong hover:underline">← Buy Domain</Link>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Get your free subdomain</h1>
          <p>Choose the name you want under <b>.{site.subdomainBase}</b> and add your details. It opens WhatsApp with everything ready to send, and I confirm the name there.</p>
        </header>
        <div className="mt-10"><FreeSubdomainForm /></div>
      </div>
    </main>
  );
}
