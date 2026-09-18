"use client";

import { useEffect, useState, use } from "react";
import { getProductsByCategory } from "@/lib/db/api";
import type { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";

export default function CategoryClient({
    slugPromise,
}: {
    slugPromise: Promise<string>;
}) {
    const slug = use(slugPromise);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProductsByCategory(slug).then((data) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, [slug]);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 text-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-heading text-navy">Loading collection...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
                <p className="font-body text-sm text-navy/60">
                    Showing all {products.length} products
                </p>
            </div>

            {products.length === 0 ? (
                <div className="py-20 text-center bg-ivory rounded-2xl border border-navy/10">
                    <p className="font-heading text-xl text-navy">No products available in this category yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
