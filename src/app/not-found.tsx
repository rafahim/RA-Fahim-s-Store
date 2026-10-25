import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {title:"Page not found",robots:{index:false,follow:true}};
export default function NotFound(){return <main id="main-content" className="mx-auto max-w-3xl px-5 py-24 text-center"><span className="eyebrow">404 · A SMALL DETOUR</span><h1 className="mt-6 font-display text-5xl font-semibold">Let’s get you back on track.</h1><p className="mt-5 text-muted">This page isn’t here. Your next idea still has a place to start.</p><Link href="/" className="btn mt-8">Back to home ↗</Link></main>}
