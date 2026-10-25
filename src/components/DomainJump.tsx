"use client";

/** "Search domain" button for the Buy Domain page: scrolls to the search bar and puts the cursor in it. */
export default function DomainJump({ className = "btn", children = "Search domain" }: { className?: string; children?: React.ReactNode }) {
  return (
    <a
      href="#domain"
      className={className}
      onClick={(e) => {
        const input = document.getElementById("domain-input") as HTMLInputElement | null;
        const panel = document.getElementById("domain");
        if (!input || !panel) return;
        e.preventDefault();
        const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
        panel.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "center" });
        window.setTimeout(() => input.focus({ preventScroll: true }), calm ? 0 : 450);
      }}
    >
      {children}
    </a>
  );
}
