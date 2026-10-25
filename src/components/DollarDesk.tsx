"use client";
import { useState } from "react";
import { useOrder } from "./OrderProvider";
import { dollar } from "@/data/site";

const show = (n: number | null) => (n ? `৳${n}` : "Ask");

export default function DollarDesk() {
  const { open } = useOrder();
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [usd, setUsd] = useState("");
  const [method, setMethod] = useState(dollar.methods[0]);

  const rate = dollar[mode];
  const amount = Number(usd);
  const bdt = rate && amount > 0 ? Math.round(rate * amount) : null;

  const order = () =>
    open(`Dollar ${mode}: ${amount > 0 ? `$${amount}` : "amount to confirm"} via ${method}${bdt ? ` (৳${bdt.toLocaleString("en-US")})` : ""}`);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
        <div className="bg-surface p-7">
          <p className="text-muted">You buy at</p>
          <p className="mt-2 font-display text-5xl font-semibold">{show(dollar.buy)}</p>
          <p className="mt-1 text-sm text-muted">per $1</p>
        </div>
        <div className="bg-surface p-7">
          <p className="text-muted">You sell at</p>
          <p className="mt-2 font-display text-5xl font-semibold">{show(dollar.sell)}</p>
          <p className="mt-1 text-sm text-muted">per $1</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          {(["buy", "sell"] as const).map((m) => (
            <button
              key={m}
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={mode === m ? "btn px-6" : "btn-ghost px-6"}
            >
              {m === "buy" ? "Buy dollar" : "Sell dollar"}
            </button>
          ))}
        </div>
        <label className="block text-sm text-muted">
          Amount in USD
          <input type="number" min="1" value={usd} onChange={(e) => setUsd(e.target.value)} className="field mt-1" placeholder="100" />
        </label>
        <label className="block text-sm text-muted">
          Payment method
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="field mt-1">
            {dollar.methods.map((m) => <option key={m}>{m}</option>)}
          </select>
        </label>
        <p className="text-muted">
          {mode === "buy" ? "You pay" : "You receive"}{" "}
          <span className="font-display text-xl font-semibold text-ink">
            {bdt ? `৳${bdt.toLocaleString("en-US")}` : "confirmed on WhatsApp"}
          </span>
        </p>
        <button onClick={order} className="btn w-full sm:w-auto">Order now</button>
      </div>
    </div>
  );
}
