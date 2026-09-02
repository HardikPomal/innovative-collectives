import Link from "next/link";
import { categories } from "@/data/products";
import { categoryIcons } from "@/lib/categoryIcons";

export default function CategoryGrid() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-20">
            <div className="text-center mb-12">
                <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold">
                    Explore
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-2">
                    Shop by Category
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {categories.map((cat) => {
                    const Icon = categoryIcons[cat.slug];
                    return (
                        <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="group flex flex-col items-center gap-4 bg-cream rounded-2xl px-4 py-8 border border-gold/10 hover:border-gold/40 hover:shadow-lg hover:shadow-navy/5 transition-all"
                        >
                            <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center group-hover:bg-gold transition-colors">
                                <Icon
                                    size={28}
                                    className="text-gold group-hover:text-navy transition-colors"
                                    strokeWidth={1.5}
                                />
                            </div>
                            <span className="font-body text-sm font-medium text-navy text-center">
                                {cat.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}