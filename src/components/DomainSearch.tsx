"use client";
import { useEffect, useRef, useState } from "react";
import { useOrder } from "./OrderProvider";
import { altExtensions, checkDomain, normalizeDomain, type DomainStatus } from "@/lib/domain";
import { waUrl } from "@/lib/whatsapp";

type Result = { s: "idle" | "loading" | "invalid" | DomainStatus; d: string };

type Props = {
  /** Order page: called instead of opening the order page, so the name is added to the order in place. */
  onSelect?: (domain: string, status: DomainStatus) => void;
  /** Order page: the name currently added to the order. */
  selected?: string;
  /** Order page: told the result of every check, so a name that arrived from "Buy now" keeps its status. */
  onResult?: (domain: string, status: DomainStatus) => void;
  /** Checks this name as soon as the component appears (when arriving from "Buy now"). */
  initial?: string;
};

export default function DomainSearch({ onSelect, selected, initial, onResult }: Props) {
  const { open } = useOrder();
  const [q, setQ] = useState(initial ?? "");
  const [r, setR] = useState<Result>({ s: "idle", d: "" });
  const ran = useRef(false);

  const run = async (raw: string) => {
    const { d, valid } = normalizeDomain(raw);
    if (!d) return;
    if (!valid) return setR({ s: "invalid", d });
    setQ(d);
    setR({ s: "loading", d });
    const status = await checkDomain(d);
    setR({ s: status, d });
    onResult?.(d, status);
  };

  useEffect(() => {
    if (initial && !ran.current) { ran.current = true; void run(initial); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buy = (d: string, status: DomainStatus) => {
    if (onSelect) onSelect(d, status);
    else open(`Domain registration: ${d}`);
  };

  const base = r.d.includes(".") ? r.d.slice(0, r.d.indexOf(".")) : r.d;
  const isSelected = !!selected && selected === r.d;

  return (
    <div id="domain" className="domain-panel mt-8 max-w-3xl scroll-mt-24">
      <label htmlFor="domain-input" className="mb-3 block text-sm font-semibold">Your domain name</label>
      <form onSubmit={(e) => { e.preventDefault(); void run(q); }} className="search flex flex-col gap-3 rounded-2xl border border-line bg-surface p-3 sm:flex-row">
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
          onChange={(e) => { setQ(e.target.value); setR({ s: "idle", d: "" }); }}
          placeholder="Find your domain, e.g. yourbrand.com"
          aria-label="Domain name"
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-lg text-ink placeholder:text-muted focus:outline-none"
        />
        <button className="btn px-7" disabled={r.s === "loading"}>
          {r.s === "loading" && <span className="spinner" aria-hidden="true" />}{r.s === "loading" ? "Checking…" : "Check domain ↗"}
        </button>
      </form>

      <p id="domain-help" className="mt-3 text-xs leading-relaxed text-muted">Try .com, .net or .org. No extension? We’ll check .com for you. Availability can change before registration.</p>

      <div aria-live="polite" aria-atomic="true" className="mt-4 min-h-[3rem]">
        {r.s === "loading" && <p className="text-sm text-muted">Checking the domain registry for {r.d}…</p>}
        {r.s === "invalid" && <p className="text-sm text-red-700">Enter a valid domain, such as yourbrand.com. Use letters, numbers and hyphens; each label must start and end with a letter or number.</p>}

        {r.s === "free" && (
          <div className="dom-result dom-free">
            <span className="dom-mark" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg></span>
            <div className="dom-body">
              <p className="dom-name">{r.d}</p>
              <p className="dom-note">Good news, this name looks available.</p>
            </div>
            {isSelected
              ? <span className="dom-chip">Added to your order ✓</span>
              : <button type="button" onClick={() => buy(r.d, "free")} className="btn px-6 py-2.5 text-sm">Buy now <span aria-hidden="true">→</span></button>}
          </div>
        )}

        {r.s === "taken" && (
          <div className="dom-result dom-taken">
            <span className="dom-mark" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 5l10 10M15 5L5 15" /></svg></span>
            <div className="dom-body">
              <p className="dom-name">{r.d}</p>
              <p className="dom-note">Already registered. Try another extension:</p>
              <div className="dom-alts">
                {altExtensions.filter((x) => !r.d.endsWith(x)).slice(0, 5).map((x) => <button key={x} type="button" onClick={() => void run(base + x)}>{base}{x}</button>)}
              </div>
            </div>
          </div>
        )}

        {r.s === "unknown" && (
          <div className="dom-result dom-unknown">
            <span className="dom-mark" aria-hidden="true">?</span>
            <div className="dom-body">
              <p className="dom-name">{r.d}</p>
              <p className="dom-note">Couldn&apos;t check this one automatically. Order it anyway and I&apos;ll confirm availability before anything starts.</p>
            </div>
            <div className="dom-actions">
              {isSelected
                ? <span className="dom-chip">Added to your order ✓</span>
                : <button type="button" onClick={() => buy(r.d, "unknown")} className="btn px-6 py-2.5 text-sm">Buy now <span aria-hidden="true">→</span></button>}
              <a href={waUrl(`Domain check: ${r.d}`)} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-2.5 text-sm">Ask on WhatsApp<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
