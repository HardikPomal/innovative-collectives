// app/returns/page.tsx
import Link from "next/link";
import { RotateCcw, CheckCircle, XCircle, Clock } from "lucide-react";
import Button from "@/components/ui/Button";

const ELIGIBLE = [
    "Unused, in original packaging with all accessories and tags",
    "Returned within 7 days of delivery date",
    "Accompanied by the IC authenticity certificate and purchase invoice",
    "Not showing signs of wear, damage, or tampering",
];

const INELIGIBLE = [
    "Items marked as 'Final Sale' or 'Non-returnable' at the time of purchase",
    "Perishables, personalised / engraved items, and digital downloads",
    "Items returned after the 7-day window without prior approval",
    "Products with missing serials, security seals, or authentication tags",
];

const STEPS = [
    { n: "01", title: "Contact our team", desc: "Email returns@innovativecollectives.com or call us within 7 days of delivery. Provide your order number and reason for return." },
    { n: "02", title: "Approval within 24 h", desc: "Our team reviews your request and sends an approval email with a prepaid return shipping label." },
    { n: "03", title: "Ship the item back", desc: "Pack securely in the original IC box. Attach the label and hand it to our pickup agent — free of charge." },
    { n: "04", title: "Inspection & refund", desc: "Once received, our experts inspect the item within 2 business days. Approved refunds are processed in 5–7 business days to your original payment method." },
];

export default function ReturnsPage() {
    return (
        <main>
            {/* Hero */}
            <section className="bg-navy text-cream py-16 md:py-20 px-4 md:px-6 text-center">
                <p className="font-body text-xs text-gold uppercase tracking-[0.18em] mb-3">Peace of mind</p>
                <h1 className="font-heading text-4xl md:text-5xl mb-4">Returns & refunds</h1>
                <p className="font-body text-base text-cream/65 max-w-md mx-auto">
                    Our 7-day hassle-free return policy ensures you are always satisfied with your acquisition.
                </p>
            </section>

            {/* Window callout */}
            <section className="bg-gold/8 border-y border-gold/20 py-8 px-4 md:px-6">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
                    <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                        <Clock size={24} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="font-heading text-xl text-navy">7-day return window</p>
                        <p className="font-body text-sm text-navy/60">From the date of delivery — no questions asked for eligible items.</p>
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-4 md:px-6 py-14">
                {/* Eligibility */}
                <div className="grid md:grid-cols-2 gap-8 mb-14">
                    <div className="bg-ivory border border-navy/8 rounded-3xl p-7">
                        <div className="flex items-center gap-2 mb-5">
                            <CheckCircle size={18} className="text-emerald-500" strokeWidth={1.5} />
                            <h2 className="font-heading text-lg text-navy">Eligible for return</h2>
                        </div>
                        <ul className="space-y-3">
                            {ELIGIBLE.map((item) => (
                                <li key={item} className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                                    <p className="font-body text-sm text-navy/65">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-ivory border border-navy/8 rounded-3xl p-7">
                        <div className="flex items-center gap-2 mb-5">
                            <XCircle size={18} className="text-red-400" strokeWidth={1.5} />
                            <h2 className="font-heading text-lg text-navy">Not eligible</h2>
                        </div>
                        <ul className="space-y-3">
                            {INELIGIBLE.map((item) => (
                                <li key={item} className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-300 shrink-0 mt-1.5" />
                                    <p className="font-body text-sm text-navy/65">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Process */}
                <h2 className="font-heading text-2xl text-navy text-center mb-8">How to return</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-12">
                    {STEPS.map(({ n, title, desc }) => (
                        <div key={n} className="bg-ivory border border-navy/8 rounded-2xl p-5">
                            <p className="font-heading text-2xl text-gold/40 mb-3">{n}</p>
                            <p className="font-body text-sm font-semibold text-navy mb-1.5">{title}</p>
                            <p className="font-body text-xs text-navy/55 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="bg-navy text-cream rounded-3xl p-8 text-center">
                    <RotateCcw size={28} className="text-gold mx-auto mb-3" strokeWidth={1.5} />
                    <p className="font-heading text-xl mb-2">Ready to start a return?</p>
                    <p className="font-body text-sm text-cream/60 mb-5">Contact our concierge team and we&apos;ll handle everything.</p>
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
