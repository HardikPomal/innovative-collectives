"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/data/products";

export default function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category");

    const handleFilter = (slug: string | null) => {
        if (!slug) {
            router.push("/products");
        } else {
            router.push(`/products?category=${slug}`);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => handleFilter(null)}
                className={`font-body text-sm px-4 py-2 rounded-full border transition-colors ${!activeCategory
                        ? "bg-navy text-cream border-navy"
                        : "bg-transparent text-navy border-navy/15 hover:border-gold"
                    }`}
            >
                All
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.slug}
                    onClick={() => handleFilter(cat.slug)}
                    className={`font-body text-sm px-4 py-2 rounded-full border transition-colors ${activeCategory === cat.slug
                            ? "bg-navy text-cream border-navy"
                            : "bg-transparent text-navy border-navy/15 hover:border-gold"
                        }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}