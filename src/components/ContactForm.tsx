"use client";
import { useState } from "react";
import { services } from "@/data/site";
import { waUrl } from "@/lib/whatsapp";

export default function ContactForm() {
  const [f, setF] = useState({ name: "", phone: "", topic: "", message: "" });
  const [sent, setSent] = useState("");
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = ["*New message from the store*", "", `Name: ${f.name.trim()}`, `Phone: ${f.phone.trim()}`];
    if (f.topic) lines.push(`About: ${f.topic}`);
    lines.push("", f.message.trim());
    const url = waUrl(lines.join("\n"));
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className="ct-form" aria-label="Send a message on WhatsApp">
      <div className="ct-form-grid">
        <label className="ord-field"><span>Your name</span><input className="field" autoComplete="name" maxLength={100} required value={f.name} onChange={set("name")} /></label>
        <label className="ord-field"><span>Phone or WhatsApp</span><input className="field" type="tel" autoComplete="tel" maxLength={30} required value={f.phone} onChange={set("phone")} /></label>
        <label className="ord-field ord-wide"><span>What is it about?</span>
          <select className="field" value={f.topic} onChange={set("topic")}><option value="">Choose a topic (optional)</option>{services.map((s) => <option key={s.slug}>{s.name}</option>)}<option>Something else</option></select>
        </label>
        <label className="ord-field ord-wide"><span>Your message</span><textarea className="field" rows={5} maxLength={2000} required value={f.message} onChange={set("message")} /></label>
      </div>
      <div className="ct-form-foot">
        <button className="btn">Send on WhatsApp</button>
        <p>Your message opens in WhatsApp, ready to send.</p>
      </div>
      {sent && <p className="ct-sent" role="status">WhatsApp should have opened. If it did not, <a href={sent} target="_blank" rel="noopener noreferrer">open it here</a>.</p>}
    </form>
  );
}
