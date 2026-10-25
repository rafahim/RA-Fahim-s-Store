import { priceLabel, services, type Service } from "@/data/site";

export type Field = {
  key: string;
  label: string;
  type: "text" | "select" | "textarea" | "number";
  options?: string[];
  required?: boolean;
  placeholder?: string;
};

export const GENERAL = "general";

const timeline = ["As soon as possible", "Within 2 weeks", "Within a month", "I’m flexible"];

type Config = { fields: Field[]; timeline?: boolean; budget?: boolean; notesLabel: string; notesRequired?: boolean };

// What each service needs to know before a price and timeline can be confirmed.
export const orderConfig: Record<string, Config> = {
  [GENERAL]: { fields: [], notesLabel: "Tell me about your project", notesRequired: true },
  "custom-website": {
    timeline: true, budget: true, notesLabel: "Anything else I should know? (optional)",
    fields: [
      { key: "Business or brand", label: "Business or brand name", type: "text", placeholder: "e.g. Rahim Traders" },
      { key: "Website size", label: "What do you need?", type: "select", required: true, options: ["Single landing page", "Small website (2–5 pages)", "Larger website (6+ pages)", "Online shop", "Not sure yet"] },
      { key: "Domain and hosting", label: "Do you already have a domain and hosting?", type: "select", options: ["I have both", "Domain only", "Hosting only", "Neither yet"] },
      { key: "Websites you like", label: "Websites you like (optional)", type: "text", placeholder: "Links to sites with a style you like" },
    ],
  },
  "wordpress-website": {
    timeline: true, budget: true, notesLabel: "Anything else I should know? (optional)",
    fields: [
      { key: "Business or brand", label: "Business or brand name", type: "text" },
      { key: "Website type", label: "What kind of website?", type: "select", required: true, options: ["Business website", "WooCommerce store", "Blog or magazine", "Landing page", "Fix or move an existing site"] },
      { key: "Existing site", label: "Current website link (optional)", type: "text", placeholder: "https://" },
    ],
  },
  domain: {
    notesLabel: "Anything else I should know? (optional)",
    fields: [
      { key: "Domain wanted", label: "Domain you want", type: "text", required: true, placeholder: "e.g. yourbrand.com" },
      { key: "Backup names", label: "Backup names (optional)", type: "text", placeholder: "In case the first one is taken" },
      { key: "Hosting", label: "Do you need hosting too?", type: "select", options: ["Domain only", "I need hosting too", "I already have hosting"] },
    ],
  },
  hosting: {
    timeline: true, notesLabel: "Anything else I should know? (optional)",
    fields: [
      { key: "Website type", label: "What kind of website?", type: "select", required: true, options: ["WordPress", "Custom or Next.js website", "Not sure"] },
      { key: "Job", label: "What do you need?", type: "select", options: ["Host a new website", "Move my existing website"] },
      { key: "Domain", label: "Your domain (optional)", type: "text", placeholder: "yourbrand.com" },
    ],
  },
  "website-seo": {
    timeline: true, notesLabel: "Anything else I should know? (optional)",
    fields: [
      { key: "Website", label: "Your website link", type: "text", required: true, placeholder: "https://" },
      { key: "Wanted searches", label: "What should people find you for?", type: "text", placeholder: "e.g. printing service in Dhaka" },
    ],
  },
  "website-redesign": {
    timeline: true, budget: true, notesLabel: "Anything else I should know? (optional)",
    fields: [
      { key: "Current website", label: "Your current website link", type: "text", required: true, placeholder: "https://" },
      { key: "Improve", label: "What do you want to improve?", type: "textarea", placeholder: "Design, mobile layout, speed, something else…" },
    ],
  },
  "browser-extensions": {
    timeline: true, budget: true, notesLabel: "Anything else I should know? (optional)",
    fields: [
      { key: "Browser", label: "Which browser?", type: "select", options: ["Chrome", "Edge", "Other Chromium browser"] },
      { key: "Websites involved", label: "Websites involved", type: "text", placeholder: "Where will you use it?" },
      { key: "Task", label: "What should it do?", type: "textarea", required: true, placeholder: "Describe the task you repeat" },
    ],
  },
  "dollar-buy-sell": {
    notesLabel: "Anything else I should know? (optional)",
    fields: [
      { key: "Direction", label: "Buy or sell?", type: "select", required: true, options: ["Buy dollars", "Sell dollars"] },
      { key: "Amount (USD)", label: "Amount in USD", type: "number", required: true, placeholder: "100" },
      { key: "Payment method", label: "Payment method", type: "select", required: true, options: ["bKash", "Nagad", "Rocket"] },
    ],
  },
};

export const timelineOptions = timeline;
export const orderHref = (subject?: string) => (subject ? `/order/?topic=${encodeURIComponent(subject)}` : "/order/");

export type Topic = { slug: string; values: Record<string, string> };

// Turns the subject text the site's buttons send (e.g. "Domain registration: name.com") into a form preset.
export function parseTopic(subject: string | null, serviceParam: string | null): Topic {
  const byParam = services.find((s) => s.slug === serviceParam);
  if (byParam) return { slug: byParam.slug, values: {} };
  if (!subject) return { slug: GENERAL, values: {} };
  const [head, ...rest] = subject.split(":");
  const tail = rest.join(":").trim();
  if (/^dollar/i.test(head)) {
    const m = tail.match(/^(\$?[\d.,]+)?.*?via\s+(bKash|Nagad|Rocket)/i);
    const values: Record<string, string> = { Direction: /sell/i.test(head) ? "Sell dollars" : "Buy dollars" };
    if (m?.[1]) values["Amount (USD)"] = m[1].replace(/[^\d.]/g, "");
    if (m?.[2]) values["Payment method"] = ["bKash", "Nagad", "Rocket"].find((x) => x.toLowerCase() === m[2].toLowerCase()) ?? "bKash";
    return { slug: "dollar-buy-sell", values };
  }
  if (/^domain/i.test(head)) return { slug: "domain", values: tail ? { "Domain wanted": tail } : {} };
  const match = services.find((s) => s.name.toLowerCase() === head.trim().toLowerCase());
  return { slug: match?.slug ?? GENERAL, values: {} };
}

export const serviceLabel = (slug: string, list: Service[] = services) => list.find((s) => s.slug === slug)?.name ?? "General enquiry";
export const servicePrice = (slug: string) => { const s = services.find((x) => x.slug === slug); return s ? priceLabel(s) : "Price confirmed on WhatsApp"; };
