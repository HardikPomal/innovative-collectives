// app/shipping/page.tsx
import Link from "next/link";
import { Truck, Clock, Shield, PackageCheck } from "lucide-react";

const TIERS = [
    {
        name: "Complimentary Shipping",
        condition: "Orders above Rs. 5,000",
        time: "3–5 business days",
        carrier: "Premium courier partners",
        highlight: false,
    },
    {
        name: "White-Glove Express",
        condition: "High-value & fragile items",
        time: "1–2 business days",
        carrier: "FedEx Priority / DHL Express Concierge",
        highlight: true,
    },
    {
        name: "Armored Secure Delivery",
        condition: "Items above Rs. 1,00,000",
        time: "2–3 business days",
        carrier: "IC Armored Logistics fleet",
        highlight: false,
    },
];

const STEPS = [
    { icon: PackageCheck, title: "Order confirmed", desc: "You receive an email with your order number and details within minutes." },
    { icon: Shield, title: "Authentication & packing", desc: "Each item is authenticated and packed in tamper-evident, branded IC packaging." },
    { icon: Truck, title: "Dispatched with tracking", desc: "A tracking number is emailed and visible in My Account. Live updates throughout." },
    { icon: Clock, title: "Delivered to your door", desc: "White-glove handover. High-value orders require a signature and government ID." },
];

export default function ShippingPage() {
    return (
        <main>
            {/* Hero */}
            <section className="bg-navy text-cream py-16 md:py-20 px-4 md:px-6 text-center">
                <p className="font-body text-xs text-gold uppercase tracking-[0.18em] mb-3">Logistics</p>
                <h1 className="font-heading text-4xl md:text-5xl mb-4">Shipping & delivery</h1>
                <p className="font-body text-base text-cream/65 max-w-md mx-auto">
                    From our secure facility to your door — every step of the journey is tracked, insured, and premium.
                </p>
            </section>

            {/* Tiers */}
            <section className="max-w-5xl mx-auto px-4 md:px-6 py-14">
                <h2 className="font-heading text-2xl text-navy text-center mb-8">Delivery options</h2>
                <div className="grid md:grid-cols-3 gap-5">
                    {TIERS.map(({ name, condition, time, carrier, highlight }) => (
                        <div key={name} className={`rounded-3xl border p-6 ${highlight ? "bg-navy text-cream border-navy" : "bg-ivory border-navy/8"}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${highlight ? "bg-gold/20" : "bg-gold/10 border border-gold/20"}`}>
                                <Truck size={18} className="text-gold" strokeWidth={1.5} />
                            </div>
                            <p className={`font-heading text-lg mb-1 ${highlight ? "text-cream" : "text-navy"}`}>{name}</p>
                            <p className={`font-body text-xs mb-4 ${highlight ? "text-cream/55" : "text-navy/45"}`}>{condition}</p>
                            <div className="space-y-1.5">
                                <div className={`flex justify-between font-body text-xs ${highlight ? "text-cream/70" : "text-navy/60"}`}>
                                    <span>Estimated time</span><span className="font-medium">{time}</span>
                                </div>
                                <div className={`flex justify-between font-body text-xs ${highlight ? "text-cream/70" : "text-navy/60"}`}>
                                    <span>Carrier</span><span className="font-medium text-right max-w-[55%]">{carrier}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process */}
            <section className="bg-ivory border-t border-navy/8 py-14 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-heading text-2xl text-navy text-center mb-10">How your order travels</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {STEPS.map(({ icon: Icon, title, desc }, i) => (
                            <div key={title} className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-3">
                                    <Icon size={18} className="text-gold" strokeWidth={1.5} />
                                </div>
                                <span className="absolute top-2.5 left-12 font-body text-xs text-navy/20 font-bold">0{i + 1}</span>
                                <p className="font-body text-sm font-semibold text-navy mb-1">{title}</p>
                                <p className="font-body text-xs text-navy/55 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Notes */}
            <section className="max-w-3xl mx-auto px-4 md:px-6 py-10">
                <div className="bg-gold/8 border border-gold/20 rounded-2xl p-6 space-y-3">
                    <p className="font-heading text-base text-navy">Important notes</p>
                    <ul className="font-body text-sm text-navy/65 space-y-2 list-disc list-inside">
                        <li>We currently ship within India only.</li>
                        <li>Delivery times exclude public holidays and extreme weather events.</li>
                        <li>Items above Rs. 1,00,000 require OTP + ID verification on delivery.</li>
                        <li>All shipments are fully insured at the declared product value.</li>
                    </ul>
                </div>
                <div className="text-center mt-8">
                    <Link href="/contact" className="font-body text-sm text-gold hover:text-navy transition-colors">
                        Have shipping questions? Contact us →
                    </Link>
                </div>
            </section>
        </main>
    );
}
