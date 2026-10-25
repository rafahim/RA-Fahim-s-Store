import Link from "next/link";

/** Domain page: explains the free subdomain. The details are collected on the checkout page. */
export default function FreeSubdomain() {
  return (
    <section id="free-subdomain" className="mx-auto max-w-7xl scroll-mt-24 px-5 sm:px-8 lg:px-10 pt-20">
      <div className="sub-panel sub-info">
        <div className="sub-copy">
          <span className="sub-tag">Free</span>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Get a free subdomain.</h2>
          <p>Not ready to buy a domain yet? Get a free subdomain for your website, at no cost.</p>
          <ul>
            <li>Press the button and fill in your details.</li>
            <li>It opens WhatsApp with everything already written. Just press send.</li>
            <li>I confirm the name is free and connect it to your website.</li>
          </ul>
        </div>
        <div className="sub-cta">
          <Link href="/free-subdomain/" className="btn px-8 py-3.5">Get free subdomain <span aria-hidden="true">→</span></Link>
          <p>Free. Nothing to pay on this site.</p>
        </div>
      </div>
    </section>
  );
}
