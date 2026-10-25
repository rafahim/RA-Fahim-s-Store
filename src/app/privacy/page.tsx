import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/LegalPage";

export const metadata = pageMetadata("Privacy Policy", "How RA Fahim’s Store handles service enquiries, WhatsApp details and domain lookups. Read the privacy policy for the store by RA Fahim.", "/privacy/");

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { h: "What this site collects", p: [
          "This site has no accounts, no database and no tracking cookies. Nothing you type here is stored on the site.",
          "When you place an order, the name, phone number and details you enter are put into a WhatsApp message that you choose to send. RA Fahim receives it through WhatsApp, and WhatsApp's own privacy policy applies to that conversation.",
        ] },
        { h: "Domain checker", p: [
          "The domain name you type is sent to a public RDAP lookup service and the relevant domain registry to see whether it is registered. No other personal information is sent.",
        ] },
        { h: "How information is used", p: [
          "Details you send on WhatsApp are used only to reply to you, quote a price and deliver the service you ask for.",
          "For domain registration, hosting and similar services, the details needed by the registrar or provider may be shared with them so the service can be completed. Nothing is sold or shared for advertising.",
        ] },
        { h: "Hosting of this site", p: [
          "This site is hosted on GitHub Pages. GitHub may keep technical logs such as IP addresses, as described in its own privacy statement.",
        ] },
        { h: "Keeping and deleting your information", p: [
          "Chat history stays in WhatsApp until it is deleted. You can ask on WhatsApp for your details to be removed from the conversation and from any order records.",
        ] },
        { h: "Changes", p: [
          "This policy may be updated from time to time. The date at the top shows the latest version.",
        ] },
        { h: "Contact", p: ["Message RA Fahim on WhatsApp using the link on the home page."] },
      ]}
    />
  );
}
