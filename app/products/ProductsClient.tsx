"use client";

import { use, useEffect, useState, Suspense } from "react";
import { getProducts } from "@/lib/db/api";
import type { Product } from "@/types";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryFilter from "@/components/product/CategoryFilter";

export default function ProductsClient({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category: activeCategory } = use(searchParams);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, []);

    const filteredProducts = activeCategory
        ? products.filter((p) => p.category === activeCategory)
        : products;

    if (isLoading) {
        return (
            <div className="py-24 text-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-heading text-navy">Loading collection...</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <Suspense fallback={<div className="h-10" />}>
                    <CategoryFilter />
                </Suspense>
                <p className="font-body text-sm text-navy/50 whitespace-nowrap">
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""}
                </p>
            </div>

            <ProductGrid products={filteredProducts} />
        </>
    );
}
