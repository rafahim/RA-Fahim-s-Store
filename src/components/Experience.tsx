"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export default function Experience() {
  const path = usePathname();
  const [progress, setProgress] = useState(false);
  const [top, setTop] = useState(false);
  useEffect(() => {
    setProgress(false);
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add("is-visible");observer.unobserve(e.target);} }), {threshold: .07});
    document.querySelectorAll("main section, .service-card, .project-card").forEach(el => {el.classList.add("reveal");observer.observe(el);});
    let timer: ReturnType<typeof setTimeout>;
    const click = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if(url.origin === location.origin && url.pathname !== location.pathname){setProgress(true); clearTimeout(timer);timer=setTimeout(()=>setProgress(false),8000);}
    };
    const scroll = () => setTop(window.scrollY > 650);
    scroll(); document.addEventListener("click",click); window.addEventListener("scroll",scroll,{passive:true});
    return () => {observer.disconnect();clearTimeout(timer);document.removeEventListener("click",click);window.removeEventListener("scroll",scroll);};
  },[path]);
  return <>{progress && <div className="route-progress" role="status" aria-label="Loading page"/>}{top && <button className="back-top" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}>↑</button>}</>;
}
