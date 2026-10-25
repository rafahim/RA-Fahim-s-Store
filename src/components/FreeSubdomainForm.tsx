"use client";
import { useRef, useState } from "react";
import { site } from "@/data/site";
import { waUrl } from "@/lib/whatsapp";

const LABEL = /^[a-z0-9](?:[a-z0-9-]{0,28}[a-z0-9])?$/;
const uses = ["Portfolio or personal site", "Business website", "Online shop", "Blog", "Learning or practice project", "Something else"];

/** Keeps only what can go in front of the free domain: "My Shop.sites.bd" becomes "my-shop". */
const clean = (v: string) => v.trim().toLowerCase().replace(new RegExp(`\\.?${site.subdomainBase.replace(".", "\\.")}$`), "").replace(/^https?:\/\//, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export default function FreeSubdomainForm() {
  const [f, setF] = useState({ name: "", phone: "", sub: "", alt: "", use: "", note: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState<{ ref: string; url: string } | null>(null);
  const first = useRef<HTMLInputElement>(null);
  const set = (k: keyof typeof f, v: string) => setF((x) => ({ ...x, [k]: v }));
  const base = site.subdomainBase;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = clean(f.sub), alt = clean(f.alt);
    if (f.phone.replace(/\D/g, "").length < 7) return setError("Enter a phone or WhatsApp number with at least 7 digits.");
    if (!LABEL.test(sub)) return setError("Choose a name with letters, numbers and hyphens only. It must start and end with a letter or number.");
    if (alt && !LABEL.test(alt)) return setError("The second choice is not valid. Use letters, numbers and hyphens only.");
    const ref = `FS-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    const lines = [`*Free subdomain request*`, `Ref: ${ref}`, "", "*Customer*", `Name: ${f.name.trim()}`, `Phone: ${f.phone.trim()}`, "", "*Details*", `Wanted: ${sub}.${base}`];
    if (alt) lines.push(`Second choice: ${alt}.${base}`);
    if (f.use) lines.push(`Use: ${f.use}`);
    if (f.note.trim()) lines.push("", "*Notes*", f.note.trim());
    const url = waUrl(lines.join("\n"));
    setError("");
    setSent({ ref, url });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto max-w-3xl">
        {sent ? (
          <div className="sub-form sub-done" role="status">
            <span className="ord-done-mark" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg></span>
            <h3>Your request is ready on WhatsApp</h3>
            <p>Ref <b>{sent.ref}</b>. Press send in the WhatsApp chat that opened and I will reply there.</p>
            <div className="ord-done-actions">
              <a href={sent.url} target="_blank" rel="noopener noreferrer" className="btn">Open WhatsApp again <span aria-hidden="true">↗</span></a>
              <button type="button" className="ord-link" onClick={() => setSent(null)}>Edit my details</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="sub-form">
            <div className="ord-fields">
              <label className="ord-field"><span>Full name <i aria-hidden="true">*</i></span>
                <input ref={first} className="field" autoComplete="name" maxLength={100} required value={f.name} onChange={(e) => set("name", e.target.value)} />
              </label>
              <label className="ord-field"><span>Phone or WhatsApp <i aria-hidden="true">*</i></span>
                <input className="field" type="tel" autoComplete="tel" maxLength={30} required placeholder="01XXXXXXXXX" value={f.phone} onChange={(e) => set("phone", e.target.value)} />
              </label>
              <label className="ord-field ord-wide"><span>Subdomain you want <i aria-hidden="true">*</i></span>
                <span className="sub-input">
                  <input className="field" required autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={30} placeholder="yourname" value={f.sub} onChange={(e) => set("sub", e.target.value)} onBlur={() => set("sub", clean(f.sub))} aria-describedby="sub-hint" />
                  <b>.{base}</b>
                </span>
                <small id="sub-hint">Letters, numbers and hyphens. Example: rahim-store</small>
              </label>
              <label className="ord-field"><span>Second choice (optional)</span>
                <span className="sub-input">
                  <input className="field" autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={30} placeholder="another-name" value={f.alt} onChange={(e) => set("alt", e.target.value)} onBlur={() => set("alt", clean(f.alt))} />
                  <b>.{base}</b>
                </span>
              </label>
              <label className="ord-field"><span>What is it for?</span>
                <select className="field" value={f.use} onChange={(e) => set("use", e.target.value)}>
                  <option value="">Choose one</option>
                  {uses.map((u) => <option key={u}>{u}</option>)}
                </select>
              </label>
              <label className="ord-field ord-wide"><span>Anything else? (optional)</span>
                <textarea className="field" rows={3} maxLength={800} placeholder="Where is your website hosted, or do you need one built?" value={f.note} onChange={(e) => set("note", e.target.value)} />
              </label>
            </div>
            <p className="ord-error" role="alert" aria-live="assertive">{error}</p>
            <button className="btn mt-2 px-7 py-3">Send on WhatsApp <span aria-hidden="true">→</span></button>
            <p className="sub-fine">Availability is confirmed in the chat. Nothing is sent until you press send in WhatsApp.</p>
          </form>
        )}
    </div>
  );
}
