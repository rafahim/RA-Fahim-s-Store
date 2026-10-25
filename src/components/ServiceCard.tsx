import Link from "next/link";
import Illustration from "./Illustration";
import { priceLabel, type Service } from "@/data/site";

export default function ServiceCard({ s }: { s: Service }) {
  return (
    <Link
      href={`/services/${s.slug}/`}
      className="service-card group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-200/60"
    >
      <Illustration name={s.art} className="w-full" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold">{s.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-strong">{priceLabel(s)}</span>
          <span className="font-semibold text-ink group-hover:text-strong">View details ↗</span>
        </div>
      </div>
    </Link>
  );
}
