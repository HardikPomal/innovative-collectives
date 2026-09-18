"use client";

import { use, useEffect, useState } from "react";
import { getProducts } from "@/lib/db/api";
import type { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";

export default function SearchClient({
    queryPromise,
}: {
    queryPromise: Promise<string>;
}) {
    const query = use(queryPromise);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProducts().then((allProducts) => {
            if (!query.trim()) {
                setProducts([]);
            } else {
                const q = query.toLowerCase();
                const filtered = allProducts.filter(
                    (p) =>
                        p.name.toLowerCase().includes(q) ||
                        (p.brand && p.brand.toLowerCase().includes(q)) ||
                        (p.description && p.description.toLowerCase().includes(q))
                );
                setProducts(filtered);
            }
            setIsLoading(false);
        });
    }, [query]);

    const hasQuery = query.trim().length > 0;

    if (isLoading) {
        return (
            <div className="py-24 text-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-heading text-navy">Searching products...</p>
            </div>
        );
    }

    if (!hasQuery) {
        return (
            <div className="py-16 text-center max-w-lg mx-auto bg-ivory rounded-2xl shadow-sm border border-navy/5">
                <p className="font-heading text-xl text-navy">Enter a search term</p>
                <p className="text-sm text-navy/60 font-body mt-2 mb-6">
                    Use the search bar in the header to find products.
                </p>
                <Button href="/products" variant="outline">
                    Browse All Products
                </Button>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="py-20 text-center max-w-lg mx-auto bg-ivory rounded-2xl shadow-sm border border-navy/5">
                <div className="w-16 h-16 bg-cream border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gold text-2xl font-serif">!</span>
                </div>
                <p className="font-heading text-xl text-navy">No results found</p>
                <p className="text-sm text-navy/60 font-body mt-2 mb-8 px-6">
                    We couldn't find anything matching &ldquo;{query}&rdquo;. Check for typos or try broader terms.
                </p>
                <Button href="/products" variant="primary">
                    Browse All Products
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
