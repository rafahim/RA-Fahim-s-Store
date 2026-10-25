"use client";
import { useState } from "react";
import { useOrder } from "./OrderProvider";

type Result = { s: "idle" | "loading" | "free" | "taken" | "unknown" | "invalid"; d: string };

export default function DomainSearch() {
  const { open } = useOrder();
  const [q, setQ] = useState("");
  const [r, setR] = useState<Result>({ s: "idle", d: "" });

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    let d = q.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
    if (!d) return;
    if (!d.includes(".")) d += ".com";
    if (d.length > 253 || !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,63}$/.test(d)) return setR({ s: "invalid", d });
    setR({ s: "loading", d });
    try {
      const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(d)}`, {
        signal: AbortSignal.timeout(8000),
      });
      setR({ s: res.status === 404 ? "free" : res.ok ? "taken" : "unknown", d });
    } catch {
      setR({ s: "unknown", d });
    }
  };

  return (
    <div id="domain" className="domain-panel mt-8 max-w-3xl scroll-mt-24">
      <label htmlFor="domain-input" className="mb-3 block text-sm font-semibold">Your domain name</label>
      <form onSubmit={check} className="search flex flex-col gap-3 rounded-2xl border border-line bg-surface p-3 sm:flex-row">
        <input
          id="domain-input"
          required
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          disabled={r.s === "loading"}
          aria-describedby="domain-help"
          aria-invalid={r.s === "invalid"}
          value={q}
          onChange={(e) => { setQ(e.target.value); setR({s:"idle",d:""}); }}
          placeholder="Find your domain, e.g. yourbrand.com"
          aria-label="Domain name"
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-lg text-ink placeholder:text-muted focus:outline-none"
        />
        <button className="btn px-7" disabled={r.s === "loading"}>
          {r.s === "loading" && <span className="spinner" aria-hidden="true" />}{r.s === "loading" ? "Checking…" : "Check domain ↗"}
        </button>
      </form>

      <p id="domain-help" className="mt-3 text-xs leading-relaxed text-muted">Try .com, .net or .org. No extension? We’ll check .com for you. Domain availability can change before registration.</p>
      <div aria-live="polite" aria-atomic="true" className="mt-4 min-h-[3rem]">
        {r.s === "loading" && <p className="text-sm text-muted">Checking the domain registry for {r.d}…</p>}
        {r.s === "invalid" && <p className="text-sm text-red-700">Enter a valid domain, such as yourbrand.com. Use letters, numbers and hyphens; each label must start and end with a letter or number.</p>}
        {r.s === "free" && (
          <div className="flex flex-wrap items-center gap-4">
            <p><span className="font-semibold text-strong">{r.d}</span> looks available.</p>
            <button onClick={() => open(`Domain registration: ${r.d}`)} className="btn px-4 py-2 text-sm">Register {r.d}</button>
          </div>
        )}
        {r.s === "taken" && (
          <p className="text-muted"><span className="font-semibold text-ink">{r.d}</span> is already registered. Try another name or extension.</p>
        )}
        {r.s === "unknown" && (
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-muted">Couldn&apos;t check {r.d} automatically. Send it to me and I&apos;ll check it for you.</p>
            <button onClick={() => open(`Domain check: ${r.d}`)} className="btn-ghost px-4 py-2 text-sm">Ask on WhatsApp</button>
          </div>
        )}
      </div>
    </div>
  );
}
