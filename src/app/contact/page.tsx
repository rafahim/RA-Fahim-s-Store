import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { projects, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { waUrl } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata("Contact RA Fahim", "Contact RA Fahim on WhatsApp, phone or email about a website, domain, hosting, SEO or any digital project. See the projects he has built.", "/contact/");

const Icon = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
const icons = {
  chat: "M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5Z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
};

const methods = [
  { label: "WhatsApp", value: "Fastest way to reach me", href: waUrl("Hi RA Fahim, I found your store and would like to discuss a project."), icon: icons.chat, external: true },
  { label: "Phone", value: site.phone, href: `tel:${site.phone}`, icon: icons.phone },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: icons.mail },
];

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="hero-glow ct-hero">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:px-10 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">Let’s talk about<br />your project.</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">Whether it is a new website, a domain, hosting or a fix for an existing site, message me directly. You get a clear price and timeline before any work starts.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={methods[0].href} target="_blank" rel="noopener noreferrer" className="btn">Chat on WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              <Link href="/order/" className="btn-ghost">Place an order</Link>
            </div>
          </div>
          <ul className="ct-methods">
            {methods.map((m) => (
              <li key={m.label}>
                <a href={m.href} {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="ct-icon"><Icon d={m.icon} /></span>
                  <span className="ct-method-text"><b>{m.label}</b><span>{m.value}</span></span>
                  <span className="ct-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:px-10 py-20 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Send a message</h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">Write a few lines about what you need. For a full order with project details, use the order page instead.</p>
          <h3 className="ct-sub">Find me elsewhere</h3>
          <ul className="ct-social">
            {site.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></li>)}
          </ul>
          <p className="ct-place">Based in Bangladesh, working online.</p>
        </div>
        <ContactForm />
      </section>

      <section className="ct-work" aria-labelledby="ct-work-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20">
          <div className="section-heading">
            <div><h2 id="ct-work-title">Projects I have built</h2></div>
            <p>Real products I designed and developed. Open any of them to see how it works.</p>
          </div>
          <ul className="ct-projects">
            {projects.map((p) => (
              <li key={p.name}>
                <div className="ct-proj-main">
                  <span className="ct-proj-cat">{p.category}</span>
                  <h3>{p.name}</h3>
                  <p>{p.text}</p>
                </div>
                <div className="ct-proj-side">
                  <ul aria-label={`${p.name} technologies`}>{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
                  <a href={p.href} target="_blank" rel="noopener noreferrer">Visit project <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
                </div>
              </li>
            ))}
          </ul>
          <p className="ct-more">There is more on <a href={site.portfolio} target="_blank" rel="noopener noreferrer">rafahim.com <span aria-hidden="true">↗</span></a>, including articles, services and my CV.</p>
        </div>
      </section>
    </main>
  );
}
