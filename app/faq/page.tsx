// app/faq/page.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

const FAQS = [
    {
        category: "Orders & Payments",
        items: [
            { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, Amex) and Cash on Delivery for eligible pin codes." },
            { q: "Can I cancel or modify my order?", a: "Orders can be cancelled within 1 hour of placement by contacting our concierge team. Modifications are subject to availability." },
            { q: "Is it safe to pay on your website?", a: "Absolutely. All transactions are encrypted via TLS and processed through PCI-DSS compliant payment gateways. We never store card details." },
            { q: "Do you charge any additional fees?", a: "There are no hidden fees. The price you see at checkout is what you pay — import duties and taxes are included for India." },
        ],
    },
    {
        category: "Authenticity & Products",
        items: [
            { q: "How do you guarantee product authenticity?", a: "Every product undergoes a multi-point provenance and authenticity audit by certified experts before being listed on the platform." },
            { q: "Do products come with a warranty?", a: "Yes. All electronics carry the manufacturer warranty. Luxury goods include our IC authenticity certificate and, where applicable, the brand's international warranty." },
            { q: "Where do you source your products?", a: "We source exclusively from authorized distributors, brand-owned ateliers, and certified global partners — never from grey-market channels." },
        ],
    },
    {
        category: "Shipping & Delivery",
        items: [
            { q: "How long does delivery take?", a: "Standard delivery: 3–5 business days. White-glove express: 1–2 business days for select cities. High-value items ship with armored couriers." },
            { q: "Do you offer free shipping?", a: "Yes — all orders over Rs. 5,000 qualify for complimentary shipping. Orders below this threshold incur a flat fee of Rs. 199." },
            { q: "Can I track my order?", a: "Yes. You will receive a tracking number by email once your order is dispatched. Live tracking is available in My Account → My Orders." },
            { q: "Do you ship internationally?", a: "Currently we serve India only. International expansion is planned for Q1 2027. Join our waitlist at contact@innovativecollectives.com." },
        ],
    },
    {
        category: "Returns & Refunds",
        items: [
            { q: "What is your return policy?", a: "We offer a 7-day hassle-free return window from the date of delivery, provided items are unused and in original packaging with all accessories." },
            { q: "How do I initiate a return?", a: "Contact our concierge team via email or phone. We will arrange a free pickup from your address within 48 hours of approval." },
            { q: "When will I receive my refund?", a: "Refunds are processed within 5–7 business days after the returned item has passed our quality inspection." },
        ],
    },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-navy/8 last:border-0">
            <button
                onClick={() => setOpen((p) => !p)}
                className="w-full flex items-center justify-between gap-4 py-4 text-left group"
            >
                <span className={`font-body text-sm font-medium transition-colors ${open ? "text-gold" : "text-navy group-hover:text-gold"}`}>
                    {q}
                </span>
                <ChevronDown
                    size={16}
                    className={`shrink-0 text-navy/40 transition-transform duration-200 ${open ? "rotate-180 text-gold" : ""}`}
                />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${open ? "max-h-48 pb-4" : "max-h-0"}`}>
                <p className="font-body text-sm text-navy/60 leading-relaxed">{a}</p>
            </div>
        </div>
    );
}

export default function FAQPage() {
    return (
        <main>
            {/* Hero */}
            <section className="bg-navy text-cream py-16 md:py-20 px-4 md:px-6 text-center">
                <p className="font-body text-xs text-gold uppercase tracking-[0.18em] mb-3">Support</p>
                <h1 className="font-heading text-4xl md:text-5xl mb-4">Frequently asked questions</h1>
                <p className="font-body text-base text-cream/65 max-w-md mx-auto">
                    Everything you need to know about shopping with Innovative Collectives.
                </p>
            </section>

            <section className="max-w-3xl mx-auto px-4 md:px-6 py-14 space-y-10">
                {FAQS.map(({ category, items }) => (
                    <div key={category}>
                        <h2 className="font-heading text-lg text-navy mb-1">{category}</h2>
                        <div className="h-px bg-gold/25 mb-4" />
                        <div className="bg-ivory border border-navy/8 rounded-2xl px-5">
                            {items.map(({ q, a }) => (
                                <FAQItem key={q} q={q} a={a} />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Contact CTA */}
                <div className="bg-navy text-cream rounded-3xl p-8 text-center">
                    <p className="font-heading text-xl mb-2">Still have questions?</p>
                    <p className="font-body text-sm text-cream/65 mb-5">Our concierge team is standing by to help.</p>
                    <Button
                        href="/contact"
                        variant="secondary"
                    >
                        Contact us
                    </Button>
                </div>
            </section>
        </main>
    );
}
