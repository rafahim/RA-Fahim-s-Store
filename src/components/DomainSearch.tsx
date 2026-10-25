"use client";
import { useEffect, useRef, useState } from "react";
import { useOrder } from "./OrderProvider";
import { checkDomain, normalizeDomain, popularExtensions, suggestionNames, type DomainStatus } from "@/lib/domain";
import { waUrl } from "@/lib/whatsapp";

type Result = { s: "idle" | "loading" | "invalid" | DomainStatus; d: string };
type Suggestion = { d: string; s: DomainStatus };

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
  const [sugg, setSugg] = useState<Suggestion[] | "loading">([]);
  const ran = useRef(false);
  const token = useRef(0);
  const input = useRef<HTMLInputElement>(null);

  const run = async (raw: string) => {
    const { d, valid } = normalizeDomain(raw);
    if (!d) return;
    const mine = ++token.current;
    if (!valid) { setSugg([]); return setR({ s: "invalid", d }); }
    setQ(d);
    setR({ s: "loading", d });
    setSugg([]);
    const status = await checkDomain(d);
    if (mine !== token.current) return;
    setR({ s: status, d });
    onResult?.(d, status);
    if (status === "unknown") return;
    // Other extensions and variations, checked at the same time. Only the free ones are shown.
    setSugg("loading");
    const found = await Promise.all(suggestionNames(d).map(async (n) => ({ d: n, s: await checkDomain(n) })));
    if (mine !== token.current) return;
    setSugg(found.filter((x) => x.s === "free").slice(0, 6));
  };

  useEffect(() => {
    if (initial && !ran.current) { ran.current = true; void run(initial); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buy = (d: string, status: DomainStatus) => {
    if (onSelect) onSelect(d, status);
    else open(`Domain registration: ${d}`);
  };

  const pickExt = (ext: string) => {
    const base = q.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[/?#].*$/, "").split(".")[0];
    if (!base) { input.current?.focus(); return; }
    void run(base + ext);
  };

  const isSelected = (d: string) => !!selected && selected === d;
  const Added = () => <span className="dom-chip">Added to your order ✓</span>;
  const BuyBtn = ({ d, st, small }: { d: string; st: DomainStatus; small?: boolean }) =>
    <button type="button" onClick={() => buy(d, st)} className={`btn ${small ? "px-5 py-2 text-[13px]" : "px-6 py-2.5 text-sm"}`}>Buy now <span aria-hidden="true">→</span></button>;

  return (
    <div id="domain" className="domain-panel mt-8 w-full scroll-mt-24">
      <label htmlFor="domain-input" className="dom-label">Find your domain name</label>
      <form onSubmit={(e) => { e.preventDefault(); void run(q); }} className="dom-bar">
        <span className="dom-globe" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" /></svg>
        </span>
        <input
          id="domain-input"
          ref={input}
          required
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          disabled={r.s === "loading"}
          aria-describedby="domain-help"
          aria-invalid={r.s === "invalid"}
          value={q}
          onChange={(e) => { setQ(e.target.value); setR({ s: "idle", d: "" }); setSugg([]); token.current++; }}
          placeholder="yourbrand.com"
          aria-label="Domain name"
        />
        <button className="dom-go" disabled={r.s === "loading"}>
          {r.s === "loading" ? <><span className="spinner" aria-hidden="true" />Checking…</> : <>Search<span aria-hidden="true" className="dom-go-arrow">→</span></>}
        </button>
      </form>

      <div className="dom-exts" role="group" aria-label="Quick extensions">
        <span>Try:</span>
        {popularExtensions.map((x) => <button key={x} type="button" disabled={r.s === "loading"} onClick={() => pickExt(x)}>{x}</button>)}
      </div>
      <p id="domain-help" className="dom-help">Type a name, with or without an extension. No extension? We check .com for you. Availability can change before registration.</p>

      <div aria-live="polite" aria-atomic="true" className="mt-5 min-h-[3rem]">
        {r.s === "loading" && <p className="text-sm font-medium text-muted">Checking the domain registry for {r.d}…</p>}
        {r.s === "invalid" && <p className="text-sm font-medium text-red-700">Enter a valid domain, such as yourbrand.com. Use letters, numbers and hyphens; each part must start and end with a letter or number.</p>}

        {r.s === "free" && (
          <div className="dom-result dom-free">
            <span className="dom-mark" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg></span>
            <div className="dom-body">
              <p className="dom-name">{r.d}</p>
              <p className="dom-note">Good news, this name looks available.</p>
            </div>
            {isSelected(r.d) ? <Added /> : <BuyBtn d={r.d} st="free" />}
          </div>
        )}

        {r.s === "taken" && (
          <div className="dom-result dom-taken">
            <span className="dom-mark" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 5l10 10M15 5L5 15" /></svg></span>
            <div className="dom-body">
              <p className="dom-name">{r.d}</p>
              <p className="dom-note">This name is already registered. Pick one of the available names below.</p>
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
              {isSelected(r.d) ? <Added /> : <BuyBtn d={r.d} st="unknown" />}
              <a href={waUrl(`Domain check: ${r.d}`)} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-2.5 text-sm">Ask on WhatsApp<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
        )}

        {(r.s === "free" || r.s === "taken") && (
          <div className="dom-sugg">
            <h3>{r.s === "taken" ? "Available names for you" : "More names you might like"}</h3>
            {sugg === "loading" && <ul aria-hidden="true">{[0, 1, 2].map((i) => <li key={i} className="dom-skel" />)}</ul>}
            {Array.isArray(sugg) && sugg.length > 0 && (
              <ul>
                {sugg.map((x) => (
                  <li key={x.d}>
                    <div><b>{x.d}</b><span>Available</span></div>
                    {isSelected(x.d) ? <Added /> : <BuyBtn d={x.d} st="free" small />}
                  </li>
                ))}
              </ul>
            )}
            {Array.isArray(sugg) && sugg.length === 0 && r.s === "taken" && <p className="dom-note">No close matches were free. Try a different name or add a word to it.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
