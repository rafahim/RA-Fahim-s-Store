import { site } from "@/data/site";

export const waUrl = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
