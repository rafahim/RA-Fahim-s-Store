import type { Metadata } from "next";
import { pageMetadata, storeDescription, storeTitle } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import ServiceCard from "@/components/ServiceCard";
import WebsitePreview from "@/components/WebsitePreview";
import OrderButton from "@/components/OrderButton";
import { services, site } from "@/data/site";
import { waUrl } from "@/lib/whatsapp";
import logo from "@/assets/logo.webp";

export const metadata: Metadata = { ...pageMetadata("Home",storeDescription,"/"), title:{absolute:storeTitle},openGraph:{...pageMetadata("Home",storeDescription,"/").openGraph,title:storeTitle},twitter:{...pageMetadata("Home",storeDescription,"/").twitter,title:storeTitle} };

export default function Home() {
  return <main id="main-content">
    <section className="home-hero">
      <div className="hero-grid mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:px-10 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div>
          <span className="eyebrow"><span className="status-dot" /> THE DIGITAL SERVICE STORE BY RA FAHIM</span>
          <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">Big ideas deserve<br />a <span className="gradient-text">better website.</span></h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">Welcome to RA Fahim’s Store, part of rafahim.com. Websites, domains and digital services from RA Fahim, a web developer from Bangladesh you can talk to directly.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/services/" className="btn">Explore services <span aria-hidden>↗</span></Link><OrderButton subject="New project enquiry" className="btn-ghost">Let’s talk about your idea</OrderButton></div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted"><span>✓ Clear pricing</span><span>✓ Mobile-first design</span><span>✓ Direct support</span></div>
        </div>
        <div className="studio-scene" aria-label="Website design and development with RA Fahim">
          <div className="studio-window"><div className="window-top"><span className="window-dots" /><span>your next big idea</span><span>↗</span></div>
            <div className="window-body"><div className="mock-nav"><b>YOUR BRAND<span>.</span></b><span>Made to stand out</span></div><span className="mock-tag">DESIGNED AROUND YOU</span><h2>A little ambition.<br /><em>A lot of possibility.</em></h2><p>A thoughtful home for everything you do.</p><div className="mock-button">Make it happen ↗</div><div className="mock-tiles"><span><b>01</b>Design</span><span><b>02</b>Develop</span><span><b>03</b>Launch</span></div></div>
          </div>
          <div className="floating-note"><span className="note-icon">✦</span><div><b>Built for your business</b><span>From the first pixel to launch.</span></div></div>
          <div className="developer-note"><Image src={logo} alt="RA Fahim" width={42} height={42} className="rounded-full" /><div><b>RA Fahim</b><span>Your developer, one message away</span></div><span className="status-dot" /></div>
        </div>
      </div>
    </section>
    <div className="capability-strip"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-5 px-5 sm:px-8 lg:px-10 py-6"><span>Small details. Better experiences.</span><b>Design & development</b><b>Domains & hosting</b><b>Tools & support</b></div></div>
    <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20"><div className="section-heading"><div><span className="eyebrow">THE SERVICE COLLECTION</span><h2>Everything you need.<br />All in one place.</h2></div><p>Start with what you need today. Explore each service for the details, pricing and next steps.</p></div><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{services.map(s=><ServiceCard key={s.slug} s={s}/>)}</div></section>
    <section className="process-section"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20"><div className="section-heading"><div><span className="eyebrow">LESS BACK AND FORTH</span><h2>A simple path to<br />something great.</h2></div><p>A real conversation, a clear plan and a launch you can look forward to.</p></div><ol className="mt-10 grid gap-5 md:grid-cols-3">{[["Find your fit","Choose a service and explore exactly what’s included."],["Let’s make a plan","Share your details. We confirm the scope, price and timeline on WhatsApp."],["Bring it to life","Work starts after your confirmation, with progress shared along the way."]].map(([t,d],i)=><li key={t} className="process-card"><span className="step-number">0{i+1}</span><h3 className="mt-8 font-display text-xl font-semibold">{t}</h3><p className="mt-3 leading-relaxed text-muted">{d}</p></li>)}</ol></div></section>
    <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20"><div className="section-heading"><div><span className="eyebrow">BEHIND THE STORE</span><h2>Ideas I’ve brought to life.</h2></div><a className="text-sm font-semibold text-strong" href={site.portfolio} target="_blank" rel="noopener noreferrer">Explore my portfolio ↗</a></div><ul className="mt-10 grid gap-6 md:grid-cols-3">{site.built.map((b,i)=><li key={b.name} className="project-card"><WebsitePreview url={b.href} name={b.name} fallbackImage={"image" in b ? b.image : undefined} /><div className="p-6"><h3 className="font-display text-xl font-semibold">{b.name}</h3><p className="mt-3 min-h-20 leading-relaxed text-muted">{b.text}</p><a href={b.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-3 font-semibold text-strong">Visit project <span aria-hidden>↗</span></a></div></li>)}</ul></section>
    <section id="contact" className="scroll-mt-24 px-5 pb-20 sm:px-8 lg:px-10"><div className="contact-panel mx-auto max-w-7xl"><span className="eyebrow">LET’S BUILD YOUR NEXT CHAPTER</span><h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-5xl">You bring the idea.<br />I’ll bring it online.</h2><p className="mt-5 max-w-lg leading-relaxed">Tell me what you have in mind. You’ll get a clear price and timeline before we start.</p><div className="mt-8 flex flex-wrap gap-4"><a className="btn" href={waUrl("Hi RA Fahim, I found your store and would like to discuss a project.")} target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a><a className="contact-secondary" href={site.portfolio} target="_blank" rel="noopener noreferrer">Get to know RA Fahim ↗</a></div></div></section>
  </main>;
}
