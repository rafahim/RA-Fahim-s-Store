import Image from "next/image";
import Link from "next/link";
import { services, site } from "@/data/site";
import { waUrl } from "@/lib/whatsapp";
import logo from "@/assets/logo.png";

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
  if (name === "Facebook") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.3 21v-8h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H8.1V13h2.8v8h3.4Z"/></svg>;
  if (name === "YouTube") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21v-3.4c-3.9 1.2-4-2-5.5-2.4M15 21v-4c0-1 .1-1.6-.5-2.2 3-.3 6-1.5 6-6.1 0-1.3-.5-2.5-1.4-3.4.2-.6.6-2.1-.2-3.3 0 0-1.2-.4-3.8 1.3a13 13 0 0 0-6.2 0C6.3 1.6 5.1 2 5.1 2c-.8 1.2-.4 2.7-.2 3.3C4 6.2 3.5 7.4 3.5 8.7c0 4.6 3 5.8 6 6.1-.6.6-.5 1.6-.5 2.2"/></svg>;
}

const explore: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "All services", href: "/services/" },
  { label: "Portfolio", href: site.portfolio, external: true },
  { label: "Contact", href: "/contact/" },
  { label: "Order now", href: "/order/" },
];

const FOOTER_LIMIT = 4;

export default function Footer() {
  const title = "text-[10px] font-black uppercase tracking-[.24em] text-sky-600";
  const link = "text-sm font-semibold leading-snug text-slate-500 transition hover:text-sky-600";

  return <footer className="site-footer border-t border-sky-100 bg-white px-5 pb-8 pt-12 text-slate-950 sm:px-8 sm:pt-14 lg:px-10 print:hidden">
    <div className="mx-auto max-w-7xl">
      <section aria-labelledby="ft-cta-title" className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-sky-100 bg-sky-50 px-6 py-7 sm:px-8 md:flex-row md:items-center">
        <div>
          <h2 id="ft-cta-title" className="font-display text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">Have a project in mind?</h2>
          <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">Tell me what you need. You get a clear price and timeline before any work starts.</p>
        </div>
        <div className="flex w-full flex-wrap gap-3 md:w-auto md:shrink-0">
          <a href={waUrl("Hi RA Fahim, I would like to discuss a project.")} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-sky-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-600 md:flex-none">Chat on WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          <Link href="/order/" className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-full border border-sky-100 bg-white px-5 py-3 text-sm font-extrabold text-slate-600 transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-600 md:flex-none">Order now</Link>
        </div>
      </section>

      {/* Same order as before: brand, Services, Explore, Good to know. Two columns on mobile like the portfolio footer. */}
      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-10 lg:grid-cols-[1.25fr_1.4fr_.8fr_.9fr] lg:gap-12">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3 font-black tracking-tight" aria-label={`${site.name} — home`}>
            <Image src={logo} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-sm" />
            <span className="text-xl">RA <span className="text-sky-500">Fahim&apos;s</span> Store</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">The digital service store of RA Fahim, a web developer from Bangladesh. Websites, domains and practical tools, with one person to talk to.</p>
          <a href={`mailto:${site.email}`} className={`${link} mt-4 inline-flex items-center break-all`}>{site.email}</a>
          <nav aria-label="Social media" className="mt-4">
            <ul className="flex flex-wrap gap-2">
              {site.socials.map(s => <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`}
                  className="footer-pill inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3.5 py-2 text-xs font-extrabold text-slate-600 transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-600">
                  <span className="h-3.5 w-3.5 [&>svg]:h-3.5 [&>svg]:w-3.5"><SocialIcon name={s.label} /></span>{s.label}
                </a>
              </li>)}
            </ul>
          </nav>
        </div>

        <nav aria-label="Footer services" className="col-span-2 lg:col-span-1">
          <h2 className={title}>Services</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
            {services.slice(0, FOOTER_LIMIT).map(s => <li key={s.slug}><Link href={`/services/${s.slug}/`} className={link}>{s.slug === "domain" ? "Buy Domain" : s.name}</Link></li>)}
            {services.length > FOOTER_LIMIT && (
              <li><Link href="/services/" className="group inline-flex items-center gap-1 text-sm font-extrabold leading-snug text-sky-600 transition hover:text-sky-700">More <span aria-hidden="true" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span><span className="sr-only"> services</span></Link></li>
            )}
          </ul>
        </nav>

        <nav aria-label="Footer explore">
          <h2 className={title}>Explore</h2>
          <ul className="mt-4 space-y-3">
            {explore.map(l => <li key={l.href}>{l.external
              ? <a href={l.href} target="_blank" rel="noopener noreferrer" className={link}>{l.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              : <Link href={l.href} className={link}>{l.label}</Link>}</li>)}
          </ul>
        </nav>

        <nav aria-label="Footer information">
          <h2 className={title}>Good to know</h2>
          <ul className="mt-4 space-y-3">
            <li><Link href="/privacy/" className={link}>Privacy Policy</Link></li>
            <li><Link href="/terms/" className={link}>Terms and Conditions</Link></li>
            <li><Link href="/refund/" className={link}>Refund Policy</Link></li>
          </ul>
        </nav>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-sky-100 pt-6 text-center text-xs font-semibold text-slate-400 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} <a href={site.portfolio} target="_blank" rel="noopener noreferrer" className="text-slate-500 transition hover:text-sky-600">rafahim.com</a>. All rights reserved.</p>
        <p>Based in Bangladesh, working online</p>
      </div>
    </div>
  </footer>;
}
