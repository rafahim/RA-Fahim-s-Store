import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/LegalPage";

export const metadata = pageMetadata("Terms and Conditions", "Read the service terms for RA Fahim’s Store, including project scope, starting prices, payments, domain renewals and delivery.", "/terms/");

export default function Page() {
  return (
    <LegalPage
      title="Terms and Conditions"
      sections={[
        { h: "Using this site", p: [
          "By placing an order you agree to these terms. Orders are made through WhatsApp, and a service starts only after the price, scope and timeline are agreed there.",
        ] },
        { h: "Prices", p: [
          "Prices marked \"from\" are starting prices. The final price depends on your requirements and is confirmed before work begins. Services listed as \"Ask for price\" are quoted per request.",
        ] },
        { h: "Payment", p: [
          "Payment methods and any advance payment are agreed on WhatsApp. Work begins once the agreed payment is received.",
        ] },
        { h: "Websites, SEO and redesign", p: [
          "Delivery times are estimates and depend on how quickly you provide content, files and feedback. Search rankings cannot be guaranteed, because search engines decide them.",
        ] },
        { h: "Domains and hosting", p: [
          "Domains and hosting are provided through third-party registrars and hosting providers, whose own terms and renewal fees apply. You are responsible for renewing your domain and hosting on time.",
        ] },
        { h: "Dollar buy and sell", p: [
          "Rates change during the day and the final rate is confirmed at the time of your order. You are responsible for making sure that your use of this service is lawful where you live and for the source of the funds you use.",
          "The service may be limited, paused or declined at any time, for example to meet security or legal requirements.",
        ] },
        { h: "Your content", p: [
          "You confirm you have the right to use any text, images or other material you supply. Completed websites may be shown in RA Fahim's portfolio unless you ask otherwise before delivery.",
        ] },
        { h: "Liability", p: [
          "Services are provided in good faith, but RA Fahim is not liable for indirect losses, loss of profit, or problems caused by third-party providers. Total liability is limited to the amount you paid for the affected service.",
        ] },
        { h: "Governing law", p: ["These terms are governed by the laws of Bangladesh."] },
      ]}
    />
  );
}
