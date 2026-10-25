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

const FOOTER_LIMIT = 5;

export default function Footer() {
  const title = "text-[11px] font-black uppercase tracking-[.26em] text-sky-400";
  const link = "group inline-flex items-center gap-2 text-sm font-semibold leading-snug text-slate-400 transition hover:text-white";
  const dot = <span aria-hidden="true" className="h-px w-3 bg-sky-500/50 transition-all duration-300 group-hover:w-5 group-hover:bg-sky-400" />;

  return <footer className="site-footer relative isolate mt-10 overflow-hidden rounded-t-[2rem] bg-slate-950 px-5 pb-8 pt-14 text-white sm:mt-16 sm:rounded-t-[3rem] sm:px-8 sm:pt-20 lg:px-10 print:hidden">
    {/* Decorative background: soft sky glows and a faint grid */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute inset-0 opacity-[.05]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "44px 44px", maskImage: "radial-gradient(ellipse at top,#000,transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at top,#000,transparent 70%)" }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />
    </div>

    <div className="mx-auto max-w-7xl">
      <section aria-labelledby="ft-cta-title" className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-white/[.04] to-transparent p-6 backdrop-blur sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className="text-[11px] font-black uppercase tracking-[.26em] text-sky-300">Let&apos;s work together</p>
            <h2 id="ft-cta-title" className="mt-3 font-display text-3xl font-semibold leading-[1.1] text-white sm:text-4xl lg:text-5xl">Have a project <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">in mind?</span></h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">Tell me what you need. You get a clear price and timeline before any work starts.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
            <a href={waUrl("Hi RA Fahim, I would like to discuss a project.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-sky-500 px-7 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-400">Chat on WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            <Link href="/order/" className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-sky-300 hover:bg-white/10">Order now</Link>
          </div>
        </div>
      </section>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:gap-x-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-14">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3 font-black tracking-tight" aria-label={`${site.name} — home`}>
            <Image src={logo} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-2 ring-sky-400/60" />
            <span className="text-xl">RA <span className="text-sky-400">Fahim&apos;s</span> Store</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">The digital service store of RA Fahim, a web developer from Bangladesh. Websites, domains and practical tools, with one person to talk to.</p>
          <ul className="mt-6 space-y-3 text-sm font-semibold">
            <li><a href={`mailto:${site.email}`} className="group inline-flex items-center gap-3 break-all text-slate-300 transition hover:text-white">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-sky-400 transition group-hover:border-sky-400/60"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg></span>{site.email}</a></li>
            <li><a href={`tel:${site.phone}`} className="group inline-flex items-center gap-3 text-slate-300 transition hover:text-white">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-sky-400 transition group-hover:border-sky-400/60"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg></span>{site.phone}</a></li>
          </ul>
          <nav aria-label="Social media" className="mt-6">
            <ul className="flex flex-wrap gap-2.5">
              {site.socials.map(s => <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} title={s.label}
                  className="footer-pill grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500/30">
                  <span className="block h-[18px] w-[18px] [&>svg]:h-[18px] [&>svg]:w-[18px]"><SocialIcon name={s.label} /></span>
                </a>
              </li>)}
            </ul>
          </nav>
        </div>

        <nav aria-label="Footer services" className="col-span-2 md:col-span-1">
          <h2 className={title}>Services</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 md:grid-cols-1">
            {services.slice(0, FOOTER_LIMIT).map(s => <li key={s.slug}><Link href={`/services/${s.slug}/`} className={link}>{dot}{s.slug === "domain" ? "Buy Domain" : s.name}</Link></li>)}
            {services.length > FOOTER_LIMIT && (
              <li><Link href="/services/" className="group inline-flex items-center gap-1.5 text-sm font-extrabold leading-snug text-sky-400 transition hover:text-sky-300">View all <span aria-hidden="true" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span><span className="sr-only"> services</span></Link></li>
            )}
          </ul>
        </nav>

        <nav aria-label="Footer explore">
          <h2 className={title}>Explore</h2>
          <ul className="mt-5 space-y-3.5">
            {explore.map(l => <li key={l.href}>{l.external
              ? <a href={l.href} target="_blank" rel="noopener noreferrer" className={link}>{dot}{l.label} <span aria-hidden="true" className="text-sky-400">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              : <Link href={l.href} className={link}>{dot}{l.label}</Link>}</li>)}
          </ul>
        </nav>

        <nav aria-label="Footer information">
          <h2 className={title}>Good to know</h2>
          <ul className="mt-5 space-y-3.5">
            <li><Link href="/privacy/" className={link}>{dot}Privacy Policy</Link></li>
            <li><Link href="/terms/" className={link}>{dot}Terms and Conditions</Link></li>
            <li><Link href="/refund/" className={link}>{dot}Refund Policy</Link></li>
          </ul>
        </nav>
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs font-semibold text-slate-500 sm:flex-row sm:text-left">
        <p>© {new Date().getFullYear()} <a href={site.portfolio} target="_blank" rel="noopener noreferrer" className="text-slate-300 transition hover:text-sky-400">rafahim.com</a>. All rights reserved.</p>
        <p className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />Based in Bangladesh, working online</p>
      </div>
    </div>
  </footer>;
}
