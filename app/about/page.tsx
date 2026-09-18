// app/about/page.tsx
import Link from "next/link";
import { Gem, Shield, Truck, Star } from "lucide-react";
import Button from "@/components/ui/Button";

const PILLARS = [
    {
        icon: Gem,
        title: "Curated Excellence",
        body: "Every product on Innovative Collectives passes a rigorous authenticity and quality audit before it reaches your hands. We partner only with verified brands and authorized distributors.",
    },
    {
        icon: Shield,
        title: "Trust & Authenticity",
        body: "Each item ships with a certificate of authenticity and is traceable through our end-to-end provenance chain — from the atelier to your door.",
    },
    {
        icon: Truck,
        title: "White-Glove Delivery",
        body: "We use armored, insured, and temperature-controlled logistics for high-value items. Your acquisition arrives the way it was designed to — perfectly intact.",
    },
    {
        icon: Star,
        title: "Lifetime Client Service",
        body: "Our concierge team is available seven days a week for after-sales assistance, warranty registration, and exclusive member previews.",
    },
];

const STATS = [
    { value: "6+", label: "Premium Categories" },
    { value: "500+", label: "Curated Products" },
    { value: "50k+", label: "Clients Served" },
    { value: "99.8%", label: "Satisfaction Rate" },
];

export default function AboutPage() {
    return (
        <main>
            {/* Hero */}
            <section className="bg-navy text-cream py-20 md:py-28 px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="font-body text-xs text-gold uppercase tracking-[0.2em] mb-4">Our Story</p>
                    <h1 className="font-heading text-4xl md:text-5xl mb-6 leading-tight">
                        Premium brands, <br className="hidden md:block" />
                        trusted forever.
                    </h1>
                    <p className="font-body text-base text-cream/70 leading-relaxed max-w-xl mx-auto">
                        Innovative Collectives was founded in Ahmedabad with a single conviction: exceptional people deserve access to exceptional things. We are not a marketplace — we are a curated collective.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-cream py-12 px-4 md:px-6 border-b border-navy/8">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map(({ value, label }) => (
                        <div key={label}>
                            <p className="font-heading text-3xl text-navy mb-1">{value}</p>
                            <p className="font-body text-xs text-navy/50 uppercase tracking-wider">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="bg-ivory py-16 md:py-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <p className="font-body text-xs text-gold uppercase tracking-[0.18em] mb-3">Our Mission</p>
                        <h2 className="font-heading text-3xl text-navy mb-5 leading-snug">
                            Democratising access to the world&apos;s finest
                        </h2>
                        <p className="font-body text-sm text-navy/65 leading-relaxed mb-4">
                            From Rolex watches to the latest iPhone, from hand-stitched Italian leather bags to artisanal French perfumes — we make acquiring the best not just possible, but effortless.
                        </p>
                        <p className="font-body text-sm text-navy/65 leading-relaxed">
                            We handle the complexity of global sourcing, authentication, import duties, and last-mile logistics so our clients can focus on enjoying what they acquire.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {["mobiles", "ladies-bags", "watches", "perfumes"].map((cat) => (
                            <Link
                                key={cat}
                                href={`/category/${cat}`}
                                className="aspect-square bg-cream rounded-2xl border border-navy/8 flex items-center justify-center hover:border-gold/40 hover:shadow-md transition-all group"
                            >
                                <span className="font-body text-xs text-navy/50 capitalize group-hover:text-gold transition-colors">{cat.replace("-", " ")}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pillars */}
            <section className="bg-cream py-16 md:py-20 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="font-body text-xs text-gold uppercase tracking-[0.18em] mb-3">Why IC</p>
                        <h2 className="font-heading text-3xl text-navy">The IC difference</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {PILLARS.map(({ icon: Icon, title, body }) => (
                            <div key={title} className="bg-ivory border border-navy/8 rounded-3xl p-7">
                                <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                                    <Icon size={20} className="text-gold" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-heading text-lg text-navy mb-2">{title}</h3>
                                <p className="font-body text-sm text-navy/60 leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-navy text-cream py-16 px-4 md:px-6 text-center">
                <p className="font-body text-xs text-gold uppercase tracking-[0.18em] mb-3">Ready to begin?</p>
                <h2 className="font-heading text-3xl mb-5">Experience the collective.</h2>
                <Button
                    href="/products"
                    variant="secondary"
                >
                    Shop the Collection
                </Button>
            </section>
        </main>
    );
}
