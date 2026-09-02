import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
    return (
        <section className="bg-cream py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-14">
                    <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold">
                        Testimonials
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-2">
                        What Our Customers Say
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="flex flex-col bg-white rounded-2xl p-6 border border-navy/[0.06]"
                        >
                            <Quote size={22} className="text-gold/40 mb-3" fill="currentColor" />

                            <div className="flex items-center gap-1 mb-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={13}
                                        className={
                                            i < t.rating
                                                ? "fill-gold text-gold"
                                                : "fill-navy/10 text-navy/10"
                                        }
                                    />
                                ))}
                            </div>

                            <p className="font-body text-sm text-navy/70 leading-relaxed flex-1">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            <div className="mt-5 pt-4 border-t border-navy/5">
                                <p className="font-heading text-sm font-semibold text-navy">
                                    {t.name}
                                </p>
                                <p className="font-body text-xs text-navy/40">
                                    {t.location}
                                    {t.purchasedItem ? ` · ${t.purchasedItem}` : ""}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}