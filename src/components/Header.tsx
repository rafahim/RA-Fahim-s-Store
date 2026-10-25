"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import logo from "@/assets/logo.png";

const nav: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Buy Domain", href: "/services/domain/" },
  { label: "Extensions", href: "/services/browser-extensions/" },
  { label: "Dollar", href: "/services/dollar-buy-sell/" },
  { label: "Portfolio", href: site.portfolio, external: true },
  { label: "Contact", href: "/contact/" },
];

export default function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const active = (href: string) => href === "/" ? path === "/" : href === "/services/" ? path === "/services" || path === "/services/" : !href.startsWith("http") && path.replace(/\/$/, "") === href.replace(/\/$/, "");
  useEffect(() => { setMenu(false); }, [path]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (desktop.matches) setMenu(false); };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const key = (e: KeyboardEvent) => { if(e.key === "Escape") { setMenu(false); toggle.current?.focus(); } };
    const inside = (t: EventTarget | null) => !!(header.current?.contains(t as Node) || panel.current?.contains(t as Node));
    const outside = (e: PointerEvent) => { if(!inside(e.target)) setMenu(false); };
    const focus = (e: FocusEvent) => { if(!inside(e.target)) setMenu(false); };
    window.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", focus);
    return () => {window.removeEventListener("keydown",key);document.removeEventListener("pointerdown",outside);document.removeEventListener("focusin",focus);};
  }, [menu]);
  // Freeze the page under the open menu and restore the exact scroll position (same as the portfolio).
  useEffect(() => {
    if (!menu) return;
    const scrollY = window.scrollY;
    const html = document.documentElement, body = document.body;
    html.style.overflow = "hidden"; body.style.overflow = "hidden"; body.style.position = "fixed"; body.style.top = `-${scrollY}px`; body.style.width = "100%";
    return () => { html.style.overflow = ""; body.style.overflow = ""; body.style.position = ""; body.style.top = ""; body.style.width = ""; window.scrollTo(0, scrollY); };
  }, [menu]);


  const iconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const drawerLabel = (label: string) => <><span className="flex items-center gap-3"><span className="text-xs font-black uppercase tracking-[.2em] text-slate-400">→</span>{label}</span><span className="text-xs text-sky-400" aria-hidden="true">↗</span></>;

  return <>
    <header ref={header} className="glass sticky top-0 z-30 border-b border-line">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10 py-2.5">
        <Link href="/" className="flex items-center gap-3"><Image src={logo} alt="RA Fahim logo" width={42} height={42} className="h-[42px] w-[42px] rounded-full" priority/><span className="font-display text-lg font-semibold">{site.name}</span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 text-sm font-medium text-muted lg:flex">{nav.map(n=>n.external
          ? <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className="nav-external hover:text-strong">{n.label}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          : <Link key={n.href} href={n.href} aria-current={active(n.href)?"page":undefined} className={active(n.href)?"nav-active":"hover:text-strong"}>{n.label}</Link>)}</nav>
        <div className="flex items-center gap-2">
          <Link href="/order/" aria-current={active("/order/")?"page":undefined} className="btn hidden px-5 py-2 text-sm sm:inline-flex">Order now</Link>
          <button ref={toggle} type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-sky-100 text-slate-700 lg:hidden" aria-label="Toggle menu" aria-controls="mobile-navigation" aria-expanded={menu} onClick={()=>setMenu(value=>!value)}>
            {menu ? <svg {...iconProps}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> : <svg {...iconProps}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>}
          </button>
        </div>
      </div>
    </header>

    {/* Outside the header on purpose: the header's backdrop-filter would otherwise trap these fixed layers inside it. */}
    <button type="button" aria-label="Close menu overlay" tabIndex={menu ? 0 : -1} className={`store-menu-overlay lg:hidden${menu ? " is-open" : ""}`} onClick={()=>setMenu(false)} />
    <div ref={panel} id="mobile-navigation" aria-label="Mobile navigation" role="navigation" aria-hidden={!menu} inert={!menu} className={`store-menu lg:hidden${menu ? " is-open" : ""}`}>
      {nav.map((n,i)=>n.external
        ? <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" onClick={()=>setMenu(false)} style={{"--i":i} as React.CSSProperties}>{drawerLabel(n.label)}<span className="sr-only"> (opens in a new tab)</span></a>
        : <Link key={n.href} href={n.href} onClick={()=>setMenu(false)} aria-current={active(n.href)?"page":undefined} style={{"--i":i} as React.CSSProperties}>{drawerLabel(n.label)}</Link>)}
      <Link href="/order/" onClick={()=>setMenu(false)} aria-current={active("/order/")?"page":undefined} style={{"--i":nav.length} as React.CSSProperties}>{drawerLabel("Order now")}</Link>
      <div className="store-menu-note">RA Fahim • Let&apos;s build something useful</div>
    </div>
  </>;
}
