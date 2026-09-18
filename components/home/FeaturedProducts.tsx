"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/db/api";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

export default function FeaturedProducts() {
    const [featured, setFeatured] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then((products) => {
            setFeatured(products.filter(p => p.featured));
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <section className="bg-cream py-20 min-h-[400px] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </section>
        );
    }

    if (featured.length === 0) return null;

    return (
        <section className="bg-cream py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold">
                            Handpicked
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-2">
                            Featured Products
                        </h2>
                    </div>
                    <Link
                        href="/products"
                        className="hidden sm:flex items-center gap-2 font-body text-sm text-navy hover:text-gold transition-colors"
                    >
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {featured.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="flex sm:hidden justify-center mt-10">
                    <Link
                        href="/products"
                        className="flex items-center gap-2 font-body text-sm text-navy hover:text-gold transition-colors"
                    >
                        View All Products <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}