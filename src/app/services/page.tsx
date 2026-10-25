import { pageMetadata } from "@/lib/seo";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/site";

export const metadata = pageMetadata("Digital Services by RA Fahim", "Explore custom websites from ৳3,500, WordPress, domains, hosting, SEO, redesign and browser tools at RA Fahim’s Store, part of rafahim.com.", "/services/");

export default function ServicesPage() {
  return (
    <main id="main-content" className="hero-glow">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-16 md:py-20">
        <span className="eyebrow">THOUGHTFUL DIGITAL SOLUTIONS</span>
        <h1 className="font-display mt-5 text-4xl font-semibold md:text-5xl">Your next step starts here.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Choose a service to see what is included, how it works, the price and answers to common questions.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </div>
    </main>
  );
}
