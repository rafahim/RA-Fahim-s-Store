import type { Metadata } from "next";
import WebsitePreview from "@/components/WebsitePreview";
import Link from "next/link";
import { projects, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { waUrl } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata("Portfolio", "Portfolio of RA Fahim, a web developer from Bangladesh: selected projects like SITES.BD, Elite Global and Wishly, and ways to get in touch.", "/portfolio/");

const preview = Object.fromEntries(site.built.filter((b) => b.image).map((b) => [b.name, b.image!]));
const shown = site.built.map((b) => projects.find((p) => p.name === b.name)!).filter(Boolean);
const ext = (label: string) => <><span aria-hidden="true"> ↗</span><span className="sr-only"> {label} (opens in a new tab)</span></>;

export default function PortfolioPage() {
  return (
    <main id="main-content">
      <section className="hero-glow">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-14 md:py-20">
          <p className="text-sm font-semibold text-strong">Portfolio</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">RA Fahim<br />Web developer from Bangladesh.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">I design and build websites, web apps, stores and management systems, and I look after the domain, hosting and launch too. Here is a look at what I have made and how to reach me.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.portfolio} target="_blank" rel="noopener noreferrer" className="btn">Go to full portfolio{ext("rafahim.com")}</a>
            <a href={waUrl("Hi RA Fahim, I saw your portfolio and would like to talk about a project.")} target="_blank" rel="noopener noreferrer" className="btn-ghost">Chat on WhatsApp{ext("")}</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20" aria-labelledby="pf-work">
        <div className="section-heading">
          <div><h2 id="pf-work">Selected work</h2></div>
          <p>A few projects I designed and developed. See the rest on my full portfolio.</p>
        </div>
        <ul className="pf-grid pf-grid-3">
          {shown.map((p) => (
            <li key={p.name} className="project-card">
              <WebsitePreview url={p.href} name={p.name} fallbackImage={preview[p.name]} />
              <div className="pf-body">
                <span className="ct-proj-cat">{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <ul className="pf-tags" aria-label={`${p.name} technologies`}>{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="pf-link">Visit project{ext("")}</a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20" aria-labelledby="pf-contact">
        <div className="pf-cta">
          <div>
            <h2 id="pf-contact" className="font-display text-3xl font-semibold md:text-4xl">Want to see more, or work together?</h2>
            <p>The full portfolio has articles, services and my CV. Or message me and you get a clear price and timeline before any work starts.</p>
          </div>
          <div className="pf-cta-actions">
            <a href={site.portfolio} target="_blank" rel="noopener noreferrer" className="btn">Open rafahim.com{ext("")}</a>
            <Link href="/order/" className="btn-ghost">Place an order</Link>
            <Link href="/contact/" className="btn-ghost">Contact</Link>
          </div>
          <ul className="ct-social">
            {site.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}{ext("")}</a></li>)}
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a href={`tel:${site.phone}`}>{site.phone}</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
