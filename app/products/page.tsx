import ProductsClient from "./ProductsClient";

export const metadata = {
    title: "All Products | Innovative Collectives",
    description:
        "Browse our full collection of premium mobiles, bags, wallets, watches, perfumes, and sunglasses.",
};

export default function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
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

            <ProductsClient searchParams={searchParams} />
        </main>
    );
}