import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

const promos = [
    {
        icon: ShieldCheck,
        title: "Authenticity Guaranteed",
        description: "Every product is 100% genuine, sourced from trusted brands.",
    },
    {
        icon: Truck,
        title: "Fast Nationwide Delivery",
        description: "Quick and reliable shipping across India.",
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        description: "Hassle-free 7-day return and exchange policy.",
    },
    {
        icon: Headphones,
        title: "Dedicated Support",
        description: "Our team is here to help before and after your purchase.",
    },
];

export default function PromoSection() {
    return (
        <section className="bg-navy py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {promos.map((promo) => {
                        const Icon = promo.icon;
                        return (
                            <div
                                key={promo.title}
                                className="flex flex-col items-center text-center gap-3"
                            >
                                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                                    <Icon size={22} className="text-gold" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-heading text-base font-semibold text-cream">
                                    {promo.title}
                                </h3>
                                <p className="font-body text-xs text-cream/50 leading-relaxed max-w-[220px]">
                                    {promo.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}