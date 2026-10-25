import type { ArtName } from "@/components/Illustration";

export const site = {
  name: "RA Fahim's Store",
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.URL) || "http://localhost:3000",
  whatsapp: "8801576964319",
  email: "dev@rafahim.com",
  phone: "+8801576964319",
  portfolio: "https://rafahim.com",
  credit: "https://facebook.com/rafahimn",
  socials: [
    { label: "Facebook", href: "https://facebook.com/rafahimn" },
    { label: "Instagram", href: "https://instagram.com/rafahimn" },
    { label: "GitHub", href: "https://github.com/rafahim" },
    { label: "YouTube", href: "https://youtube.com/@rafahimn" },
  ],
  built: [
    { name: "SITES.BD", href: "https://sites.bd/", image: "/projects/sites-bd-home.webp", text: "A platform for domains, hosting, DNS and account management." },
    { name: "Elite Global", href: "https://eliteglobalstore.sites.bd/", image: "/projects/elite-global-home.webp", text: "An e-commerce store with cart, checkout, order tracking and admin tools." },
    { name: "Wishly", href: "https://wishly.rafahim.com/", text: "A wish website maker with templates, photos, music and a secret letter." },
  ],
};

export type Project = { name: string; category: string; text: string; stack: string[]; href: string };

// Selected work from rafahim.com, shown on the contact page.
export const projects: Project[] = [
  { name: "SITES.BD", category: "SaaS / Web platform", text: "A platform for domains, hosting, DNS, email, billing and account management in one modern experience.", stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"], href: "https://sites.bd/" },
  { name: "Elite Global", category: "E-commerce", text: "A lifestyle store with cart, wishlist, checkout, order tracking, reviews, coupons, shipping and admin tools.", stack: ["Next.js", "TypeScript", "Supabase", "Framer Motion"], href: "https://eliteglobalstore.sites.bd/" },
  { name: "Wishly", category: "SaaS / Web platform", text: "A wish website maker for birthdays, proposals and anniversaries, with templates, photos, music and a secret letter shared in one link.", stack: ["Next.js", "Supabase", "Cloudinary", "Tailwind CSS"], href: "https://wishly.rafahim.com/" },
  { name: "Office by Global Skill Lab", category: "Management system", text: "A franchise and training-centre system with student registration, payment links, wallets, commissions, payouts and reports.", stack: ["Next.js", "Prisma", "WooCommerce", "SMS & Email"], href: "https://office.globalskilllab.com/" },
  { name: "TOTO COMPANY", category: "Management system", text: "A staff, salary and accounts system with employee wallets, payroll, withdrawals, attendance, ID cards and a company cashbook.", stack: ["Next.js", "Supabase", "Cloudinary", "PWA"], href: "https://totocompany.sites.bd/" },
  { name: "Karim Properties Development", category: "WordPress website", text: "A real estate developer’s website in Dhaka with project showcases, service pages, a gallery, a blog and booking enquiry paths.", stack: ["WordPress", "Elementor", "SEO"], href: "https://karimpropertiesbd.com/" },
  { name: "Vero Mart BD", category: "WooCommerce store", text: "A Bangladeshi lifestyle store with watches, belts, gadgets and menswear, plus cart, wishlist, accounts and bKash and Nagad payment details.", stack: ["WordPress", "WooCommerce", "Woodmart"], href: "http://veromartbd.com/" },
  { name: "Assignment Cover", category: "Web tool", text: "A browser tool that turns a few student details into print-ready A4 assignment covers, with PDF and PNG export and no account.", stack: ["JavaScript", "A4 print layout"], href: "https://sifaatsakib.sites.bd/" },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  price?: number;
  art: ArtName;
  intro: string;
  details: { heading: string; paragraphs: string[]; prepare: string[]; note: string; portfolio?: string };
  features: { t: string; d: string }[];
  steps: { t: string; d: string }[];
  goodFor: string[];
  faqs: { q: string; a: string }[];
};

export const priceLabel = (s: Service) =>
  s.price ? `from ৳${s.price.toLocaleString("en-US")}` : "Ask for price";

export const services: Service[] = [
  {
    slug: "custom-website",
    details: {
      "heading": "A website shaped around your business.",
      "paragraphs": [
            "Your website should help visitors understand your offer and reach you without extra effort. I plan the pages, navigation and contact points around your audience, then build a responsive interface that feels considered on phones and larger screens.",
            "Projects can range from a focused landing page to a business website with several pages. A CMS, dashboard, booking flow or shop can be discussed when needed. The starting price is ৳3,500; pages, integrations and ongoing costs are agreed separately before work begins."
      ],
      "prepare": [
            "A short description of your business and audience",
            "Your logo, page list, text and images, if available",
            "Reference websites and the features you need"
      ],
      "note": "The final quote lists the pages and functionality included. Domain, hosting and additional systems are confirmed separately.",
      "portfolio": "https://rafahim.com/services/business-websites"
},
    name: "Custom website",
    short: "A site coded from scratch for your business, portfolio or store.",
    tagline: "A website built around your business, not a template.",
    price: 3500,
    art: "website",
    intro:
      "I design and code your website from scratch with Next.js, so it loads fast, looks right on every phone and is easy to grow when your business does.",
    features: [
      { t: "Clean, modern design", d: "A clear structure and polished layout with content written to turn visitors into enquiries." },
      { t: "Mobile first", d: "Built for phones first, then scaled up for tablets and desktops." },
      { t: "Fast to load", d: "Lightweight pages that open quickly, even on a slow connection." },
      { t: "Ready for search", d: "Proper titles, descriptions, sitemap and page structure so search engines can read your site." },
      { t: "Contact built in", d: "WhatsApp button, contact form and social links connected from day one." },
      { t: "Room to grow", d: "Add pages, a shop or an admin dashboard later without starting over." },
    ],
    steps: [
      { t: "Tell me about your business", d: "Message me on WhatsApp with what you sell, who your customers are and any sites you like." },
      { t: "Get a price and timeline", d: "I reply with the final price, what is included and when it will be ready." },
      { t: "I design and build", d: "I share progress while I build, and you tell me what to change." },
      { t: "Launch and handover", d: "Your site goes live on your domain, and I show you how to manage it." },
    ],
    goodFor: ["Business owners", "Freelancers and portfolios", "Small shops", "New startups"],
    faqs: [
      { q: "How much does a custom website cost?", a: "Custom websites start from ৳3,500. The final price depends on the number of pages and features, and I confirm it on WhatsApp before any work starts." },
      { q: "How long will it take?", a: "It depends on the size of the site and how quickly you send your content. I give you a timeline together with the price." },
      { q: "Can you add an online shop later?", a: "Yes. I build the site so that a shop, dashboard or booking feature can be added later." },
    ],
  },
  {
    slug: "wordpress-website",
    details: {
      "heading": "An editable website that grows with your content.",
      "paragraphs": [
            "WordPress suits businesses that want to update their own pages, publish articles or manage products. I organize the content, build the layouts and configure the tools your site needs, with an editing experience you can use after handover.",
            "Depending on the agreed scope, work can include Elementor or Gutenberg pages, WooCommerce, plugin configuration, custom theme changes or integrations. Existing sites can also be reviewed for migration, speed improvements and maintenance. Commercial themes, plugin licences and third-party fees are confirmed before purchase."
      ],
      "prepare": [
            "Your page list, business details and branding",
            "Product and shipping details if you need a store",
            "Existing site details if this is a migration or refresh"
      ],
      "note": "Tell me which parts you want to edit yourself so the dashboard and handover match your day-to-day work.",
      "portfolio": "https://rafahim.com/services/wordpress-development"
},
    name: "WordPress website",
    short: "Business sites, WooCommerce stores and Elementor pages you can manage yourself.",
    tagline: "A WordPress site you can update without a developer.",
    price: 3000,
    art: "wordpress",
    intro:
      "If you want to edit pages, add products and publish posts on your own, WordPress is the right choice. I set it up properly so it looks professional and runs smoothly.",
    features: [
      { t: "Business websites", d: "A complete site with the pages, menus and contact details your customers look for." },
      { t: "WooCommerce stores", d: "Products, cart, checkout, shipping and local payment details such as bKash and Nagad." },
      { t: "Elementor design", d: "Custom, responsive page layouts that never look like a stock template." },
      { t: "Plugins set up right", d: "The right plugins chosen and configured, with small custom ones when nothing ready-made fits." },
      { t: "Speed and security", d: "Faster loading on mobile, plus backups and basic hardening to keep the site safe." },
      { t: "Migration and support", d: "Moving an existing WordPress site to new hosting, and help after launch." },
    ],
    steps: [
      { t: "Share what you need", d: "Tell me whether it is a business site, a store or a landing page, and what you want on it." },
      { t: "Agree the price", d: "I confirm the price and what is included on WhatsApp." },
      { t: "Build and set up", d: "I install, design and configure everything, then send you a preview." },
      { t: "Launch and training", d: "The site goes live, and I show you how to edit pages and add products." },
    ],
    goodFor: ["Online shops", "Service businesses", "Bloggers and publishers", "Anyone who wants to edit their own site"],
    faqs: [
      { q: "What does a WordPress website cost?", a: "WordPress websites start from ৳3,000. A store with many products or custom features costs more, and I tell you the exact price before starting." },
      { q: "Can I sell products with it?", a: "Yes. I build WooCommerce stores with product pages, cart and checkout, and set up the payment details your buyers use." },
      { q: "Will I be able to edit it myself?", a: "Yes. That is the main reason to choose WordPress. I show you how to change text, images and products." },
    ],
  },
  {
    slug: "domain",
    details: {
      "heading": "The right address for your online presence.",
      "paragraphs": [
            "A memorable domain helps people find your business and recognize your brand. Start with the search on this page, then send your preferred name and extension so availability, registration cost and renewal details can be confirmed.",
            "Once the order is agreed, the setup can include connecting the domain to your website through DNS or nameservers. If you already own a domain, share where it is registered and where the website is hosted so the connection work can be planned."
      ],
      "prepare": [
            "Your preferred name and two alternative choices",
            "The extension you want, such as .com or .net",
            "Whether you already have hosting or an existing domain"
      ],
      "note": "A search result does not reserve a name. Registration and renewal prices depend on the registrar and extension.",
      "portfolio": "https://rafahim.com/services/domain-hosting-deployment"
},
    name: "Domain registration",
    short: "Search a name, and I register it and connect it to your site.",
    tagline: "Find the name, and I take care of the rest.",
    art: "domain",
    intro:
      "Your domain is your address on the internet. Search for the name you want, and if it is free I register it and point it to your website.",
    features: [
      { t: "Instant name check", d: "Type any name on this page to see whether it looks available." },
      { t: "Registered for you", d: "You send the order, and I handle the registration with the registrar." },
      { t: "Connected to your site", d: "I set the DNS records so the domain opens your website or hosting." },
      { t: "Popular extensions", d: "Choose .com, .net and other common extensions. Ask me about any other extension." },
      { t: "Advice on the name", d: "Short, easy to spell and easy to remember. I tell you honestly if a name will be hard for customers." },
    ],
    steps: [
      { t: "Check the name", d: "Use the search box on this page, or message me a few options." },
      { t: "Send your order", d: "Tap Order now, fill in your details and confirm the name and price on WhatsApp." },
      { t: "I register it", d: "Once payment is confirmed I register the domain." },
      { t: "I connect it", d: "I point the domain to your website or hosting so it works right away." },
    ],
    goodFor: ["New businesses", "Personal brands", "Existing sites changing their name", "Anyone launching a project"],
    faqs: [
      { q: "How much does a domain cost?", a: "The price depends on the extension. Message me the name you want and I reply with the exact price." },
      { q: "What if the checker cannot tell me?", a: "Some extensions cannot be checked automatically. Send me the name on WhatsApp and I check it for you." },
      { q: "Do I need to renew it?", a: "Domains renew every year at the registrar's renewal price. Renewing on time is important, or the name can be lost." },
    ],
  },
  {
    slug: "hosting",
    details: {
      "heading": "A considered setup from build to live website.",
      "paragraphs": [
            "Hosting is selected around the kind of website you run and how you plan to maintain it. The launch plan covers the provider, domain connection, production settings and checks needed before the site is shared with visitors.",
            "I can configure deployment and required environment settings, connect a custom domain, check HTTPS and verify important pages after release. An existing hosting account can be used when it suits the project. Migration and post-launch improvements are scoped around the current setup."
      ],
      "prepare": [
            "Your website platform and expected usage",
            "Your current hosting provider and domain registrar",
            "Any existing site that needs to be moved"
      ],
      "note": "Hosting subscriptions, usage limits and renewal charges are confirmed with the selected provider. Send project details first, not passwords.",
      "portfolio": "https://rafahim.com/services/domain-hosting-deployment"
},
    name: "Hosting",
    short: "Hosting set up and connected to your domain so your site is live.",
    tagline: "Hosting that is ready when your website is.",
    art: "hosting",
    intro:
      "A website needs a home to be seen. I choose and set up hosting that suits your site, connect your domain and take everything live.",
    features: [
      { t: "Hosting setup", d: "The right hosting for your site, configured and ready before launch." },
      { t: "Domain connected", d: "DNS and nameservers set so your domain opens your site correctly." },
      { t: "Deployment", d: "Your website is uploaded, tested and taken live for you." },
      { t: "Secure by default", d: "HTTPS set up so visitors see the padlock and your site is trusted." },
      { t: "Safe migration", d: "Moving a site from another host to a new one without losing anything." },
    ],
    steps: [
      { t: "Tell me about your site", d: "Is it WordPress or a custom site, and roughly how many visitors do you expect?" },
      { t: "Get a recommendation", d: "I suggest hosting that fits and send you the price." },
      { t: "I set it up", d: "Hosting is created, your site is deployed and your domain is connected." },
      { t: "Go live", d: "I test everything on desktop and mobile, then confirm the site is live." },
    ],
    goodFor: ["New websites", "Sites moving host", "WordPress and custom sites", "People who dislike technical setup"],
    faqs: [
      { q: "How much does hosting cost?", a: "It depends on the kind of site you have. Message me, and I reply with the price for the plan that suits you." },
      { q: "Can you move my existing website?", a: "Yes. I move the site to the new host and check that everything works before switching your domain." },
      { q: "Do I need to buy the domain from you?", a: "No. You can use a domain you already own. I just connect it." },
    ],
  },
  {
    slug: "website-seo",
    details: {
      "heading": "Clearer pages for visitors and search engines.",
      "paragraphs": [
            "SEO work begins with how your site is organized and what each page communicates. I review the technical and on-page foundations, then prioritize practical changes to titles, descriptions, headings, internal links and the way important pages can be discovered.",
            "The agreed work may also cover social-sharing metadata, sitemap checks, mobile usability and performance issues. You receive a summary of the changes so future content can follow the same structure. Search visibility develops over time and rankings are not guaranteed."
      ],
      "prepare": [
            "The website URL and pages that matter most",
            "Your main products, services and target audience",
            "Any existing Search Console reports you can share"
      ],
      "note": "The scope is agreed after a review. Content creation, continuing optimization and additional pages can be quoted separately.",
      "portfolio": "https://rafahim.com/services/seo-search-visibility"
},
    name: "Website SEO",
    short: "Technical and on-page SEO so search engines can find and understand you.",
    tagline: "Be easier to find when people search.",
    art: "seo",
    intro:
      "SEO makes it easier for search engines to crawl, understand and show your pages. I fix the technical foundations first, then improve what each page says.",
    features: [
      { t: "Site check", d: "I review your pages for the problems that stop search engines reading your site." },
      { t: "Titles and descriptions", d: "Clear page titles and descriptions that explain each page and invite the click." },
      { t: "Page structure", d: "Proper headings, links and layout so search engines see what matters." },
      { t: "Sitemap and robots", d: "Files that tell search engines which pages to read." },
      { t: "Speed and mobile", d: "Faster pages and a mobile layout that works, which both help visitors and search." },
      { t: "Search Console setup", d: "Your site connected to Google Search Console so you can see how it is doing." },
    ],
    steps: [
      { t: "Share your website", d: "Send me the link and tell me what you want people to find you for." },
      { t: "I review it", d: "I check the technical and on-page basics and list what needs fixing." },
      { t: "Agree the work", d: "I confirm the price for the fixes on WhatsApp." },
      { t: "I make the changes", d: "I improve the site and send you a summary of what changed." },
    ],
    goodFor: ["Business websites", "Online stores", "New sites", "Sites that never show on Google"],
    faqs: [
      { q: "Will this put me on page one of Google?", a: "No one can promise rankings, because search engines decide them. SEO gives your site the strongest foundation to be found." },
      { q: "How much does SEO cost?", a: "It depends on the size of your site. I review it first and give you a price for the work." },
      { q: "Do you do SEO for sites you did not build?", a: "Yes. I work on any website, including WordPress and custom sites." },
    ],
  },
  {
    slug: "website-redesign",
    details: {
      "heading": "A fresh experience with a clear purpose.",
      "paragraphs": [
            "A redesign starts by understanding where the current site gets in the way. I review visual hierarchy, navigation, page content and mobile behavior, then plan improvements around the tasks visitors need to complete.",
            "The scope can focus on a homepage or selected pages, or extend to the wider website. Useful existing functionality and content are retained where possible, while spacing, components and interactions are refined. The pages and flows affected are agreed before implementation."
      ],
      "prepare": [
            "Your current URL and the issues you want fixed",
            "Brand updates or reference designs you like",
            "The pages, content and functionality you want to keep"
      ],
      "note": "A review determines whether the existing structure can be improved or whether specific parts need rebuilding.",
      "portfolio": "https://rafahim.com/services/website-redesign-optimization"
},
    name: "Website redesign",
    short: "A fresh look, a better mobile layout and faster pages.",
    tagline: "Make your old website look and work like new.",
    art: "redesign",
    intro:
      "If your website looks dated or is hard to use on a phone, you do not always need to start again. I improve the design, usability and speed and keep what already works.",
    features: [
      { t: "Modern visual refresh", d: "Cleaner layout, better spacing and a look that matches your brand today." },
      { t: "Better on mobile", d: "A layout that works comfortably on every screen size." },
      { t: "Easier to use", d: "Clearer menus and page flow so visitors find what they came for." },
      { t: "Faster performance", d: "Lighter pages and better loading speed." },
      { t: "Your content kept", d: "I keep your text, products and domain, and only rebuild what needs it." },
    ],
    steps: [
      { t: "Send me your site", d: "Share the link and tell me what you dislike about it." },
      { t: "I review it", d: "I note what to keep, what to improve and what to replace." },
      { t: "Agree the plan", d: "You get a price and a clear list of changes before I start." },
      { t: "Redesign and launch", d: "I rebuild the design, you review it, and then it goes live." },
    ],
    goodFor: ["Outdated websites", "Sites that look bad on phones", "Slow websites", "Businesses that have rebranded"],
    faqs: [
      { q: "Will I lose my content?", a: "No. I keep your existing text, images and products, and move them into the new design." },
      { q: "How much does a redesign cost?", a: "It depends on the size of the site. I look at it first and give you a price." },
      { q: "Can you redesign a WordPress site?", a: "Yes. I redesign WordPress and custom websites." },
    ],
  },
  {
    slug: "browser-extensions",
    details: {
      "heading": "A practical browser helper for a repeated task.",
      "paragraphs": [
            "If the same sequence of clicks, copying or page actions takes up your day, an extension may help simplify it. Describe the task and the websites involved so I can check what is possible before proposing a tool.",
            "The scope can include a popup, settings and agreed actions within supported pages. Installation instructions and a walkthrough are part of the handover discussion. Browser compatibility, permissions and distribution are agreed for the particular extension; website changes may require later updates."
      ],
      "prepare": [
            "The task you repeat and the websites involved",
            "Your browser and a simple example of the workflow",
            "The actions you want the tool to perform"
      ],
      "note": "Feasibility is checked first. Browser-store publication, extra integrations and future updates are agreed separately."
},
    name: "Browser extensions",
    short: "Small tools that live in your browser and save you clicks.",
    tagline: "Tools for your browser, made to fit the way you work.",
    art: "extension",
    intro:
      "A browser extension adds a button, a panel or an automatic helper to the browser you already use. I build ready-made tools, and I can make a custom one for your workflow.",
    features: [
      { t: "Chrome and Edge", d: "Extensions that work in Chromium-based browsers." },
      { t: "Saves repeat work", d: "Automate the clicking, copying and filling you do every day." },
      { t: "Simple popup", d: "A clean panel with clear buttons and settings." },
      { t: "Made to order", d: "Describe the job, and I tell you what it takes to build." },
      { t: "Easy to install", d: "I explain how to install and use it step by step." },
    ],
    steps: [
      { t: "Describe the problem", d: "Tell me what you do in the browser that takes too long." },
      { t: "Get a plan and price", d: "I explain what the extension will do and what it costs." },
      { t: "I build it", d: "I build and test it, then send it to you." },
      { t: "Install and use", d: "I show you how to install it and use it." },
    ],
    goodFor: ["Daily repeat tasks", "Teams with a fixed workflow", "Online sellers", "Researchers and marketers"],
    faqs: [
      { q: "Can you build an extension just for me?", a: "Yes. Tell me what you want it to do, and I tell you whether it is possible and what it costs." },
      { q: "Which browsers does it work in?", a: "Chrome, Edge and other Chromium-based browsers." },
      { q: "Is the price fixed?", a: "It depends on what the extension does. I give you a price before I start." },
    ],
  },
  {
    slug: "dollar-buy-sell",
    details: {
      "heading": "Start with the details, then confirm the quote.",
      "paragraphs": [
            "Use this page to prepare an enquiry with the buy or sell direction, amount and preferred payment method. The request continues to WhatsApp, where the rate, total and transaction details can be reviewed before you decide to proceed.",
            "When rates are not published, the page asks for a direct quote. An estimate shown on the page is not a completed order. Confirm the agreed details in the conversation before taking the next step, and keep the transaction reference for follow-up."
      ],
      "prepare": [
            "Whether your enquiry is to buy or sell",
            "The amount you want to discuss",
            "Your preferred payment method and any questions"
      ],
      "note": "Rates and transaction details are confirmed individually. The website enquiry form does not collect a payment."
},
    name: "Dollar buy and sell",
    short: "Buy or sell USD through Binance with bKash, Nagad or Rocket.",
    tagline: "Buy or sell dollars, with the rate confirmed before you pay.",
    art: "dollar",
    intro:
      "Need USD, or want to sell some? Pick buy or sell, enter the amount and send your order. I confirm today's rate on WhatsApp before you send any money.",
    features: [
      { t: "Buy and sell", d: "Exchange in either direction through Binance." },
      { t: "Local payment", d: "Pay or get paid with bKash, Nagad or Rocket." },
      { t: "Rate confirmed first", d: "You see the final rate and total before sending anything." },
      { t: "Clear amount", d: "Enter dollars on this page to see the total in taka once rates are set." },
      { t: "Direct support", d: "Everything is handled in one WhatsApp chat with me." },
    ],
    steps: [
      { t: "Choose buy or sell", d: "Enter the amount in USD and your payment method on this page." },
      { t: "Send your details", d: "Tap Order now and send your name and phone number." },
      { t: "Confirm the rate", d: "I confirm the current rate and the total on WhatsApp." },
      { t: "Pay and receive", d: "Once the payment is confirmed, the exchange is completed." },
    ],
    goodFor: ["Online payments abroad", "Freelancers", "Sellers with dollar income", "Anyone who needs USD quickly"],
    faqs: [
      { q: "Is the rate fixed?", a: "Rates change during the day, so I confirm the final rate on WhatsApp before you send any money." },
      { q: "Which payment methods can I use?", a: "bKash, Nagad and Rocket." },
      { q: "Is there a legal side I should know about?", a: "You are responsible for making sure that using this service is lawful where you live. Please read the Terms and Conditions." },
    ],
  },
];

export type Extension = { name: string; desc: string; href: string };
export const extensions: Extension[] = [];

export const dollar: { buy: number | null; sell: number | null; methods: string[] } = {
  buy: null,
  sell: null,
  methods: ["bKash", "Nagad", "Rocket"],
};
