"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Same timing model as the portfolio intro (rafahim.com): the intro always plays long
// enough to feel intentional, never blocks the page for long, and only lifts once the
// main thread is quiet so the reveal stays smooth.
const MIN_DURATION_MS = 650;
const MAX_WAIT_MS = 1500;
const QUIET_MS = 60;
const QUIET_CAP_MS = 300;
const RING_R = 54;
const RING_LEN = 2 * Math.PI * RING_R;

/** Resolves once no long task (>50ms) ran for `quietMs`, or after `capMs` at the latest. */
function waitForQuietMainThread(quietMs: number, capMs: number): Promise<void> {
  return new Promise(resolve => {
    const start = performance.now();
    let lastBusy = start;
    let observer: PerformanceObserver | undefined;
    try {
      observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) lastBusy = Math.max(lastBusy, entry.startTime + entry.duration);
      });
      observer.observe({ entryTypes: ["longtask"] });
    } catch { /* long-task API unavailable: the fixed quiet window still applies */ }
    const check = () => {
      const now = performance.now();
      if (now - lastBusy >= quietMs || now - start >= capMs) { observer?.disconnect(); resolve(); return; }
      setTimeout(check, 50);
    };
    check();
  });
}

/**
 * Store intro: a gradient ring draws itself around the "RA" monogram, the letters sharpen
 * into place, a hairline progress bar fills, then the content scales away and a curtain
 * sweeps up to reveal the page. Pure CSS transform/opacity animation (see `.store-intro`
 * in globals.css). Plays once per full page load of the home page; client-side navigation
 * never replays it, and it is skipped on other pages so deep links open instantly.
 */
export default function StoreIntro() {
  const pathname = usePathname();
  // Decided once, from the page the visit started on (the same value on server and client).
  const [enabled] = useState(() => pathname === "/");
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [pageSettled, setPageSettled] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    const fontsReady: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("#main-content img"));
    const decoded = Promise.all(images.map(img => (typeof img.decode === "function" ? img.decode().catch(() => undefined) : Promise.resolve())));
    Promise.all([fontsReady, decoded])
      .then(() => waitForQuietMainThread(QUIET_MS, QUIET_CAP_MS))
      .then(() => { if (!cancelled) requestAnimationFrame(() => requestAnimationFrame(() => !cancelled && setPageSettled(true))); });
    const min = setTimeout(() => setMinTimeElapsed(true), reduce.current ? 0 : MIN_DURATION_MS);
    const max = setTimeout(() => setExiting(true), MAX_WAIT_MS);
    return () => { cancelled = true; clearTimeout(min); clearTimeout(max); };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !minTimeElapsed || !pageSettled) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idle: number | undefined;
    if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(() => setExiting(true), { timeout: 40 });
    else timer = setTimeout(() => setExiting(true), 20);
    return () => {
      if (timer) clearTimeout(timer);
      if (idle !== undefined && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
    };
  }, [enabled, minTimeElapsed, pageSettled]);

  // Safety net in case `animationend` never fires (for example a hidden tab).
  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => setGone(true), 800);
    return () => clearTimeout(timer);
  }, [exiting]);

  if (!enabled || gone) return null;

  return <div
    className={`store-intro${exiting ? " intro-exiting" : ""}`}
    aria-hidden="true"
    onAnimationEnd={e => { if (e.target === e.currentTarget && e.animationName === "intro-curtain-up") setGone(true); }}
  >
    <svg className="intro-curve" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 0 H100 V0 Q50 14 0 0 Z" fill="currentColor" /></svg>
    <div className="intro-glow-wrap"><div className="intro-glow" /></div>
    <div className="intro-inner">
      <div className="intro-mark">
        <svg viewBox="0 0 120 120" fill="none">
          <defs><linearGradient id="intro-ring-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#0284c7" /></linearGradient></defs>
          <circle cx="60" cy="60" r={RING_R} stroke="rgba(14,165,233,0.14)" strokeWidth="1.5" />
          <circle className="intro-ring" cx="60" cy="60" r={RING_R} stroke="url(#intro-ring-grad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={RING_LEN} strokeDashoffset={RING_LEN} style={{ ["--ring-len" as string]: RING_LEN }} />
        </svg>
        <div className="intro-dot-orbit"><span className="intro-dot" /></div>
        <div className="intro-ra"><span style={{ animationDelay: ".12s" }}>R</span><span className="text-sky-500" style={{ animationDelay: ".2s" }}>A</span></div>
      </div>
      <p className="intro-tag">Digital Service Store</p>
      <div className="intro-bar"><div /></div>
    </div>
  </div>;
}
