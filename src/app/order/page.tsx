import type { Metadata } from "next";
import { Suspense } from "react";
import OrderForm from "@/components/OrderForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata("Order a service", "Choose a service, fill in your details and send your order to RA Fahim on WhatsApp.", "/order/"),
  robots: { index: false, follow: true },
};

export default function OrderPage() {
  return (
    <main id="main-content" className="ord-page">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-14 md:py-20">
        <header className="ord-head">
          <h1 className="font-display text-4xl font-semibold md:text-5xl">Place your order</h1>
          <p>Pick a service, add a few details and send it to me on WhatsApp. I confirm the price and timeline in the chat before anything starts.</p>
        </header>
        <Suspense fallback={<div className="skeleton h-96" aria-hidden="true" />}>
          <OrderForm />
        </Suspense>
      </div>
    </main>
  );
}
