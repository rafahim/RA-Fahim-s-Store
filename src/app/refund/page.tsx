import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/LegalPage";

export const metadata = pageMetadata("Refund Policy", "Read the refund policy for services ordered through RA Fahim’s Store, part of rafahim.com, and how to contact RA Fahim about an order.", "/refund/");

export default function Page() {
  return (
    <LegalPage
      title="Refund Policy"
      sections={[
        { h: "Before work starts", p: ["If you cancel before any work has begun, you get a full refund of what you paid."] },
        { h: "After work has started", p: [
          "If you cancel while work is in progress, you are refunded for the part of the work that has not been done. Work already completed is not refundable.",
        ] },
        { h: "After delivery", p: [
          "Once a website, SEO or redesign project is delivered and accepted, it is not refundable. Fixes to anything that does not match the agreed scope are made free of charge.",
        ] },
        { h: "Domains and hosting", p: [
          "Domain registrations, renewals and hosting fees are not refundable once the order is processed, because registrars and providers do not refund them.",
        ] },
        { h: "Dollar buy and sell", p: [
          "Completed transactions cannot be reversed. If you sent a payment and the order could not be completed, the full amount is returned to you.",
        ] },
        { h: "How to ask for a refund", p: [
          "Message RA Fahim on WhatsApp with your order details. Approved refunds are returned through the same payment method you used.",
        ] },
      ]}
    />
  );
}
