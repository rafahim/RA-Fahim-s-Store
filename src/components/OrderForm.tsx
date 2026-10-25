"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { priceLabel, services } from "@/data/site";
import { GENERAL, orderConfig, parseTopic, serviceLabel, servicePrice, timelineOptions } from "@/lib/order";
import { waUrl } from "@/lib/whatsapp";

const choices = [
  ...services.map((s) => ({ slug: s.slug, name: s.slug === "domain" ? "Buy domain" : s.name, note: priceLabel(s) })),
  { slug: GENERAL, name: "Not sure yet", note: "Tell me about your idea" },
];

export default function OrderForm() {
  const params = useSearchParams();
  const start = useMemo(() => parseTopic(params.get("topic"), params.get("service")), [params]);
  const [slug, setSlug] = useState(start.slug);
  const [values, setValues] = useState<Record<string, string>>(start.values);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [person, setPerson] = useState({ name: "", phone: "", email: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState<{ ref: string; url: string } | null>(null);

  const cfg = orderConfig[slug];
  const set = (key: string, value: string) => setValues((v) => ({ ...v, [key]: value }));
  const pick = (next: string) => { setSlug(next); setValues(next === start.slug ? start.values : {}); setError(""); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = person.phone.replace(/\D/g, "");
    if (digits.length < 7) return setError("Enter a phone or WhatsApp number we can reach, with at least 7 digits.");
    for (const f of cfg.fields) if (f.required && !(values[f.key] ?? "").trim()) return setError(`Please fill in “${f.label}”.`);
    if (cfg.notesRequired && !notes.trim()) return setError("Tell me a little about your project.");
    const ref = `RF-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    const lines = [`*New order: ${serviceLabel(slug)}*`, `Order ref: ${ref}`, `Starting price: ${servicePrice(slug)}`, "", "*Customer*", `Name: ${person.name.trim()}`, `Phone: ${person.phone.trim()}`];
    if (person.email.trim()) lines.push(`Email: ${person.email.trim()}`);
    const detail = cfg.fields.filter((f) => (values[f.key] ?? "").trim()).map((f) => `${f.key}: ${values[f.key].trim()}`);
    if (cfg.timeline && timeline) detail.push(`Needed: ${timeline}`);
    if (cfg.budget && budget.trim()) detail.push(`Budget: ${budget.trim()}`);
    if (detail.length) lines.push("", "*Details*", ...detail);
    if (notes.trim()) lines.push("", cfg.notesRequired ? "*Project*" : "*Notes*", notes.trim());
    const url = waUrl(lines.join("\n"));
    setError("");
    setSent({ ref, url });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (sent) return (
    <div className="ord-done" role="status">
      <span className="ord-done-mark" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9"/></svg></span>
      <h2>Your order is ready on WhatsApp</h2>
      <p>Order ref <b>{sent.ref}</b>. Press send in the WhatsApp chat that opened to place it. I confirm the final price and timeline there before any work starts.</p>
      <div className="ord-done-actions">
        <a href={sent.url} target="_blank" rel="noopener noreferrer" className="btn">Open WhatsApp again <span aria-hidden="true">↗</span></a>
        <Link href="/" className="btn-ghost">Back to home</Link>
        <button type="button" className="ord-link" onClick={() => setSent(null)}>Edit this order</button>
      </div>
    </div>
  );

  return (
    <div className="ord-layout">
      <form id="order-form" onSubmit={submit} className="ord-form">
        <fieldset className="ord-step">
          <legend><span className="ord-n">1</span>What do you need?</legend>
          <div className="ord-choices">
            {choices.map((c) => (
              <label key={c.slug} className={`ord-choice ${slug === c.slug ? "is-on" : ""}`}>
                <input type="radio" name="service" value={c.slug} checked={slug === c.slug} onChange={() => pick(c.slug)} />
                <span className="ord-choice-name">{c.name}</span>
                <span className="ord-choice-note">{c.note}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="ord-step">
          <legend><span className="ord-n">2</span>Project details</legend>
          <div className="ord-fields">
            {cfg.fields.map((f) => (
              <label key={f.key} className={`ord-field ${f.type === "textarea" ? "ord-wide" : ""}`}>
                <span>{f.label}{f.required && <i aria-hidden="true"> *</i>}</span>
                {f.type === "select" ? (
                  <select className="field" required={f.required} value={values[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)}>
                    <option value="">Choose one</option>
                    {f.options!.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea className="field" rows={3} maxLength={800} required={f.required} placeholder={f.placeholder} value={values[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
                ) : (
                  <input className="field" type={f.type} min={f.type === "number" ? 1 : undefined} inputMode={f.type === "number" ? "decimal" : undefined} maxLength={200} required={f.required} placeholder={f.placeholder} value={values[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
                )}
              </label>
            ))}
            {cfg.timeline && (
              <label className="ord-field"><span>When do you need it?</span>
                <select className="field" value={timeline} onChange={(e) => setTimeline(e.target.value)}><option value="">Choose one</option>{timelineOptions.map((o) => <option key={o}>{o}</option>)}</select>
              </label>
            )}
            {cfg.budget && (
              <label className="ord-field"><span>Budget (optional)</span>
                <input className="field" maxLength={60} placeholder="e.g. ৳5,000" value={budget} onChange={(e) => setBudget(e.target.value)} />
              </label>
            )}
            <label className="ord-field ord-wide"><span>{cfg.notesLabel}{cfg.notesRequired && <i aria-hidden="true"> *</i>}</span>
              <textarea className="field" rows={4} maxLength={1500} required={cfg.notesRequired} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
          </div>
        </fieldset>

        <fieldset className="ord-step">
          <legend><span className="ord-n">3</span>Your details</legend>
          <div className="ord-fields">
            <label className="ord-field"><span>Full name <i aria-hidden="true">*</i></span>
              <input className="field" autoComplete="name" maxLength={100} required value={person.name} onChange={(e) => setPerson({ ...person, name: e.target.value })} />
            </label>
            <label className="ord-field"><span>Phone or WhatsApp <i aria-hidden="true">*</i></span>
              <input className="field" type="tel" autoComplete="tel" maxLength={30} required placeholder="01XXXXXXXXX" value={person.phone} onChange={(e) => setPerson({ ...person, phone: e.target.value })} />
            </label>
            <label className="ord-field ord-wide"><span>Email (optional)</span>
              <input className="field" type="email" autoComplete="email" maxLength={120} value={person.email} onChange={(e) => setPerson({ ...person, email: e.target.value })} />
            </label>
          </div>
        </fieldset>
        <p className="ord-error" role="alert" aria-live="assertive">{error}</p>
      </form>

      <aside className="ord-summary" aria-label="Order summary">
        <h2>Your order</h2>
        <dl>
          <div><dt>Service</dt><dd>{serviceLabel(slug)}</dd></div>
          <div><dt>Price</dt><dd>{servicePrice(slug)}</dd></div>
          <div><dt>Payment</dt><dd>Nothing to pay on this site</dd></div>
        </dl>
        <ol className="ord-next">
          <li><b>Send it on WhatsApp.</b> Your details open in a ready-to-send chat.</li>
          <li><b>Confirm the plan.</b> I reply with the final price and timeline.</li>
          <li><b>Work starts</b> once you agree and the payment is arranged.</li>
        </ol>
        <button form="order-form" className="btn w-full">Send order on WhatsApp</button>
        <p className="ord-fine">Prices marked “from” are starting prices. Read the <Link href="/terms/">terms</Link> and <Link href="/refund/">refund policy</Link>.</p>
      </aside>
    </div>
  );
}
