import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DollarDesk from "@/components/DollarDesk";
import DomainSearch from "@/components/DomainSearch";
import Illustration from "@/components/Illustration";
import OrderButton from "@/components/OrderButton";
import ServiceCard from "@/components/ServiceCard";
import { dollar, extensions, priceLabel, services, site } from "@/data/site";
import { jsonLd, pageMetadata, publicSiteUrl, sitePageUrl } from "@/lib/seo";
import { waUrl } from "@/lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? pageMetadata(s.name, `${s.short} By web developer RA Fahim at RA Fahim’s Store, part of rafahim.com.${s.price ? ` Starting from ৳${s.price.toLocaleString("en-US")}.` : ""}`, `/services/${s.slug}/`) : {};
}

const h2 = "font-display text-3xl font-semibold md:text-4xl";

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = services.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const s = services[idx];
  const related = [1, 2, 3].map((n) => services[(idx + n) % services.length]);

  const origin = publicSiteUrl();
  const url = sitePageUrl(`/services/${s.slug}/`);
  const structuredData = {"@context":"https://schema.org","@graph":[
    {"@type":"Service",...(url?{"@id":`${url}#service`,url}:{}),name:s.name,serviceType:s.name,description:s.intro,provider:{"@id":origin?`${origin}/#store`:"#store"},...(s.price?{offers:{"@type":"Offer",priceCurrency:"BDT",priceSpecification:{"@type":"PriceSpecification",minPrice:s.price,priceCurrency:"BDT"},description:"Starting price. Final price depends on the agreed scope.",...(url?{url}:{})}}:{})},
    ...(url?[{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:sitePageUrl("/")},{"@type":"ListItem",position:2,name:"Services",item:sitePageUrl("/services/")},{"@type":"ListItem",position:3,name:s.name,item:url}]}]:[])
  ]};
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(structuredData)}} />
      <section className="hero-glow">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:px-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <Link href="/services/" className="text-sm font-semibold text-strong hover:underline">← All services</Link>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">{s.name}</h1>
            <p className="mt-3 font-display text-xl text-strong">{s.tagline}</p>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">{s.intro}</p>
            <p className="mt-6 font-display text-3xl font-semibold">{priceLabel(s)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <OrderButton subject={s.name} className="btn px-7 py-3">Order now</OrderButton>
              <a href={waUrl(`Hi RA Fahim, I have a question about ${s.name}.`)} target="_blank" rel="noopener noreferrer" className="btn-ghost px-7 py-3">
                Ask a question
              </a>
            </div>
          </div>
          <Illustration name={s.art} className="w-full rounded-3xl shadow-2xl shadow-sky-300/50 ring-1 ring-sky-100" />
        </div>
      </section>

      {s.slug === "domain" && (
        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-20">
          <h2 className={h2}>Find a name for your next idea.</h2>
          <p className="mt-4 text-muted">Search any name below. If it is available, press Buy now and your order is ready to send.</p>
          <DomainSearch />
        </section>
      )}

      {s.slug === "dollar-buy-sell" && (
        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pt-20">
          <h2 className={h2}>Rates and order</h2>
          <p className="mb-10 mt-3 max-w-2xl text-muted">
            Pay with {dollar.methods.join(", ")}. The final rate is confirmed on WhatsApp before you send any money.
          </p>
          <DollarDesk />
        </section>
      )}

      <nav aria-label="On this service page" className="service-jump mx-auto flex max-w-7xl flex-wrap gap-2 px-5 sm:px-8 lg:px-10 pt-10">
        <a href="#service-overview">Overview</a><a href="#service-inclusions">What’s included</a><a href="#service-process">How it works</a><a href="#service-questions">Questions</a>
      </nav>
      <section id="service-overview" className="service-overview mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:px-10 pt-12 lg:grid-cols-[1.4fr_1fr]">
        <div><span className="eyebrow">ABOUT THIS SERVICE</span><h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">{s.details.heading}</h2><div className="mt-5 space-y-4">{s.details.paragraphs.map(text => <p key={text} className="text-base leading-relaxed text-muted">{text}</p>)}</div>{s.details.portfolio && <a href={s.details.portfolio} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-strong">More on rafahim.com <span aria-hidden="true">↗</span></a>}</div>
        <aside className="service-brief"><span className="eyebrow">A GOOD START</span><h3 className="mt-3 font-display text-xl font-semibold">Before we start</h3><ul className="mt-5 space-y-4">{s.details.prepare.map(item=><li key={item} className="flex gap-3 text-sm leading-relaxed text-muted"><span className="text-strong" aria-hidden="true">✓</span><span>{item}</span></li>)}</ul><p className="service-scope-note">{s.details.note}</p></aside>
      </section>
      <section id="service-inclusions" className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20">
        <h2 className={h2}>What you get</h2>
        <ul className="mt-10 grid gap-x-14 gap-y-8 md:grid-cols-2">
          {s.features.map((f) => (
            <li key={f.t} className="feature-card flex gap-4">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-100 text-strong">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{f.t}</h3>
                <p className="mt-1 leading-relaxed text-muted">{f.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {s.slug === "browser-extensions" && (
        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pb-20">
          <h2 className={h2}>Available extensions</h2>
          {extensions.length ? (
            <ul className="mt-8">
              {extensions.map((x) => (
                <li key={x.name} className="grid gap-4 border-t border-line py-7 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{x.name}</h3>
                    <p className="mt-1 max-w-xl text-muted">{x.desc}</p>
                  </div>
                  <a href={x.href} target="_blank" rel="noopener noreferrer" className="btn">Get extension</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 max-w-2xl rounded-2xl border border-line bg-surface p-6 text-muted">
              The first extensions are on the way. Need one made for your workflow? Describe it and I&apos;ll tell you what it takes.
            </p>
          )}
        </section>
      )}

      <section id="service-process" className="bg-surface">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20">
          <h2 className={h2}>How it works</h2>
          <ol className="mt-10 max-w-3xl">
            {s.steps.map((st, i) => (
              <li key={st.t} className="relative flex gap-5 pb-9 last:pb-0">
                {i < s.steps.length - 1 && <span className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-px bg-sky-300" aria-hidden />}
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-strong font-display font-semibold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{st.t}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{st.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="service-questions" className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:px-10 py-20 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className={h2}>Good for</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {s.goodFor.map((g) => (
              <li key={g} className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 font-medium text-sky-800">{g}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={h2}>Questions</h2>
          <div className="mt-8 divide-y divide-sky-100 border-y border-sky-100">
            {s.faqs.map((f) => (
              <details key={f.q} className="faq-item group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-2xl font-normal text-strong transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl contact-panel text-white">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Ready to start with {s.name.toLowerCase()}?</h2>
          <p className="mt-3 max-w-xl text-sky-50">Send your details and you get a clear price and timeline on WhatsApp.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <OrderButton subject={s.name} className="btn">
              Order now
            </OrderButton>
            <a href={waUrl(`Hi RA Fahim, I want to know more about ${s.name}.`)} target="_blank" rel="noopener noreferrer"
              className="contact-secondary">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 pb-24">
        <h2 className={h2}>More from {site.name}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((r) => <ServiceCard key={r.slug} s={r} />)}
        </div>
      </section>
    </main>
  );
}
