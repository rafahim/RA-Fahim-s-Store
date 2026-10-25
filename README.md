# RA Fahim's Store — Premium Edition

A static Next.js storefront with a complete responsive design in the original white and sky-blue color palette. Orders continue through WhatsApp; no database or authentication is required.

## Included

- A redesigned home page with a custom website illustration, service collection, ordering process, selected work and contact section.
- A footer that matches the rafahim.com portfolio footer (white, sky-blue accents): brand and Order now / WhatsApp buttons, Explore, Services and Connect columns (two columns on mobile), social pills, legal links and a back-to-top link.
- A page width and colour palette shared with the portfolio (`max-w-7xl` containers, sky and slate colours).
- A home-page intro animation in the portfolio's style: a ring draws around the RA monogram, then a curtain lifts. It plays once per full load of the home page, respects reduced-motion and is hidden without JavaScript.
- A **Contact page** (`/contact/`). Every Contact link in the navbar, mobile menu and footer opens it. It has WhatsApp, phone and email cards, a message form that opens WhatsApp, social links and the eight projects built by RA Fahim (taken from the rafahim.com source).
- A **Portfolio** link in the navbar and footer that opens https://rafahim.com in a new tab.
- An **Order page** (`/order/`) that works like a checkout: pick a service, fill in service-specific details (for example domain name, amount in USD, website link), then add name and phone. Sending opens WhatsApp with a ready, formatted order and an order reference. Every Order now button on the site (navbar, service pages, domain search, dollar desk) opens this page with the service already chosen.
- A consistent visual system across all eight service pages, service listing, privacy, terms, refund and not-found pages.
- Expanded descriptions on all eight service pages, with a preparation checklist, scope note and in-page navigation.
- Custom website pricing starts at ৳3,500, including the pricing FAQ. WordPress pricing is unchanged.
- Domain search exclusively on **Buy Domain** (`/services/domain/`). It supports input validation, loading feedback, availability results and a manual-check fallback.
- Responsive navigation with an icon-only animated hamburger, animated opening/closing, current-page highlighting, outside-click closing and keyboard/Escape support.
- Scroll entrance animations, gentle hero motion, hover effects, navigation progress, route-loading skeletons and a back-to-top control. Reduced-motion preferences are respected.
- Store identity ties RA Fahim’s Store to web developer RA Fahim and the parent portfolio, rafahim.com.
- Unique page titles and descriptions, social-sharing metadata, a 1200 × 630 preview image, Person/Organization/WebSite structured data, service schemas, starting-price data and breadcrumbs.
- Canonical URLs, sitemap and robots.txt generated from the store’s own configured public URL. Preview deployments are marked noindex.
- Existing service content, pricing, contact details, social links and portfolio links.

## Run locally

Use Node.js 20 or later.

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
```

The `out/` folder contains the prebuilt static website. Upload its **contents** to a static host, or deploy the source with the included GitHub Actions workflow. Use `out` as the publish directory for static hosting.

### Configure the live store URL for SEO

Set `NEXT_PUBLIC_SITE_URL` to the store’s actual public URL before building. This is the URL where this storefront is hosted; do not use rafahim.com merely because it is the parent portfolio. No store domain has been assumed.

The build also detects Vercel’s production project URL (`VERCEL_PROJECT_PRODUCTION_URL`) or Netlify’s site URL (`URL`) when available. An explicitly configured custom domain in `NEXT_PUBLIC_SITE_URL` takes priority. GitHub Actions derives the URL from the repository or the `SITE_URL` repository variable.

For a GitHub project subdirectory, set `NEXT_PUBLIC_BASE_PATH` as well; the included workflow handles the repository path automatically.

The included `out/` is a domain-neutral preview. It intentionally omits absolute canonical/OG-image URLs and sitemap entries until a public store URL is available, rather than publishing localhost or a guessed domain. Rebuild with the real store URL before uploading prebuilt output for production SEO. Titles, descriptions, identity markup and the preview image asset are already included.

SEO metadata has also been validated in a separate build with a temporary test origin. No test origin is included in the final export.

## Edit content

- `src/data/site.ts`: store name, WhatsApp number, email, links, services, prices, projects shown on the contact page, extensions and dollar rates.
- `src/lib/order.ts`: the fields each service asks for on the order page.
- `src/app/contact/page.tsx` and `src/app/order/page.tsx`: the contact and order pages.
- `src/app/page.tsx`: home page sections.
- `src/app/globals.css`: shared colors, typography, spacing and motion.
- `src/components/Illustration.tsx`: original service illustrations.

## Validation

- Contact and order pages added later: checked at 390px, 1024px and 1440px with no horizontal overflow or JavaScript errors. Order and contact messages, service presets (domain, dollar, service pages), form validation and all navbar/footer links were tested in Chromium. No real order was sent.

- Production build and TypeScript checks passed.
- All 13 content pages checked at 320px, 375px, 640px, 768px, 1024px, 1440px and 1920px (91 layout checks), with no horizontal overflow or browser JavaScript errors.
- Internal page links checked with no broken targets.
- Animated mobile navigation, outside click, Escape/focus restoration, closed-menu inertness, order dialog and generated WhatsApp order details checked in Chromium.
- Domain validation, available/taken results and registry failure fallback tested using intercepted responses. Live registry/network availability is external and was not used to assert registration availability.
- Reduced-motion behavior, FAQ expansion, Escape-to-close and the custom website price checked.
- All eight service pages checked for their overview, preparation checklist and four section links.
- A configured-origin build checked all 13 canonical URLs, unique titles/descriptions, OG/Twitter metadata, JSON-LD identities, service starting prices, breadcrumbs and sitemap entries. The domain-neutral export was rebuilt afterwards.

No hosting deployment or real order was submitted during validation.

## Service information references

The service descriptions were written for this store using its existing content and the relevant owner-portfolio pages, reviewed on 25 October 2026:

- https://rafahim.com/services/business-websites
- https://rafahim.com/services/wordpress-development
- https://rafahim.com/services/seo-search-visibility
- https://rafahim.com/services/domain-hosting-deployment
- https://rafahim.com/services/website-redesign-optimization

Browser-extension and dollar-enquiry descriptions follow the existing store offering. No exchange rates or transaction guarantees have been added.
