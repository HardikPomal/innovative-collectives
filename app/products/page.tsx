import { Suspense } from "react";
import { products } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryFilter from "@/components/product/CategoryFilter";

export const metadata = {
    title: "All Products | Innovative Collectives",
    description:
        "Browse our full collection of premium mobiles, bags, wallets, watches, perfumes, and sunglasses.",
};

function ProductsContent({
    searchParams,
}: {
    searchParams: { category?: string };
}) {
    const activeCategory = searchParams.category;

    const filteredProducts = activeCategory
        ? products.filter((p) => p.category === activeCategory)
        : products;

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

export default function ProductsPage({
    searchParams,
}: {
    searchParams: { category?: string };
}) {
    return (
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            <div className="mb-10">
                <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold">
                    Collection
                </span>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-2">
                    All Products
                </h1>
            </div>

            <ProductsContent searchParams={searchParams} />
        </main>
    );
}