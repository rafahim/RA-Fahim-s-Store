"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
export default function Experience() {
  const path = usePathname();
  const [bar, setBar] = useState<"idle" | "run" | "done">("idle");
  const started = useRef(0);
  const first = useRef(true);
  const [top, setTop] = useState(false);
  useEffect(() => {
    // Route changed: let the bar run for at least ~450ms so the change feels deliberate, then finish it.
    let finish: ReturnType<typeof setTimeout> | undefined, hide: ReturnType<typeof setTimeout> | undefined;
    if (first.current) first.current = false;
    else if (started.current) {
      const wait = Math.max(0, 450 - (performance.now() - started.current));
      finish = setTimeout(() => { setBar("done"); hide = setTimeout(() => setBar("idle"), 420); }, wait);
      started.current = 0;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add("is-visible");observer.unobserve(e.target);} }), {threshold: .07});
    document.querySelectorAll("main section, .service-card, .project-card").forEach(el => {el.classList.add("reveal");observer.observe(el);});
    let timer: ReturnType<typeof setTimeout>;
    const click = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if(url.origin === location.origin && url.pathname !== location.pathname){started.current=performance.now();setBar("run"); clearTimeout(timer);timer=setTimeout(()=>setBar("idle"),8000);}
    };
    const scroll = () => setTop(window.scrollY > 650);
    scroll(); document.addEventListener("click",click); window.addEventListener("scroll",scroll,{passive:true});
    return () => {observer.disconnect();clearTimeout(timer);clearTimeout(finish);clearTimeout(hide);document.removeEventListener("click",click);window.removeEventListener("scroll",scroll);};
  },[path]);
  return <>{bar !== "idle" && <div className={`route-progress${bar === "done" ? " is-done" : ""}`} role="status" aria-label="Loading page"/>}{top && <button className="back-top" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}>↑</button>}</>;
}
