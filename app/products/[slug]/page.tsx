"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Star, ChevronRight, BadgeCheck } from "lucide-react";
import { getProductBySlug, getProductsByCategory } from "@/lib/db/api";
import type { Product } from "@/types";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCart from "@/components/product/AddToCart";
import ProductGrid from "@/components/product/ProductGrid";
import ShippingInfo from "@/components/product/ShippingInfo";

export default function ProductDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            const p = await getProductBySlug(slug);
            if (p) {
                setProduct(p);
                const related = await getProductsByCategory(p.category);
                setRelatedProducts(related.filter((r) => r.id !== p.id).slice(0, 4));
            }
            setIsLoading(false);
        }
        fetchProduct();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-heading text-navy">Loading product...</p>
            </div>
        );
    }

    if (!product) {
        notFound();
    }

    const discount = getDiscountPercent(product.price, product.compareAtPrice);

    return (
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center flex-wrap gap-1.5 font-body text-xs text-navy/50 mb-5 md:mb-8">
                <Link href="/" className="hover:text-gold transition-colors">
                    Home
                </Link>
                <ChevronRight size={12} />
                <Link href="/products" className="hover:text-gold transition-colors">
                    Products
                </Link>
                <ChevronRight size={12} />
                <Link
                    href={`/category/${product.category}`}
                    className="hover:text-gold transition-colors capitalize"
                >
                    {product.category.replace("-", " ")}
                </Link>
                <ChevronRight size={12} />
                <span className="text-navy">{product.name}</span>
            </nav>

            {/* Main two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 md:gap-10 lg:gap-12 items-start">
                {/* LEFT — sticky gallery */}
                <div className="lg:sticky lg:top-[120px]">
                    <ProductGallery images={product.images} productName={product.name} />
                </div>

                {/* RIGHT — all product details, scrolls independently */}
                <div className="flex flex-col">
                    {/* Brand */}
                    {product.brand && (
                        <span className="font-body text-xs font-semibold text-gold uppercase tracking-widest mb-2">
                            {product.brand}
                        </span>
                    )}

                    {/* Name */}
                    <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-navy mb-3">
                        {product.name}
                    </h1>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center gap-2 mb-5">
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={15}
                                        className={
                                            i < Math.round(product.rating!)
                                                ? "fill-gold text-gold"
                                                : "fill-navy/10 text-navy/10"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="font-body text-sm text-navy/50">
                                {product.rating} ({product.reviewCount} reviews)
                            </span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center flex-wrap gap-2 md:gap-3 mb-6">
                        <span className="font-heading text-2xl sm:text-3xl font-bold text-navy">
                            {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                            <>
                                <span className="font-body text-base text-navy/35 line-through">
                                    {formatPrice(product.compareAtPrice)}
                                </span>
                                <span className="bg-gold/15 text-gold text-xs font-semibold px-2.5 py-1 rounded-full">
                                    Save {discount}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <p className="font-body text-sm text-navy/60 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    {/* Add to cart */}
                    <AddToCart product={product} />

                    {/* Meta */}
                    <div className="mt-8 pt-6 border-t border-navy/10 flex flex-col gap-2">
                        <p className="font-body text-xs text-navy/50">
                            <span className="text-navy font-medium">Availability:</span>{" "}
                            {product.inStock ? (
                                <span className="text-emerald-600 font-medium">In Stock</span>
                            ) : (
                                <span className="text-red-500 font-medium">Out of Stock</span>
                            )}
                        </p>
                        <p className="font-body text-xs text-navy/50">
                            <span className="text-navy font-medium">Category:</span>{" "}
                            <span className="capitalize">{product.category.replace("-", " ")}</span>
                        </p>
                        {product.sku && (
                            <p className="font-body text-xs text-navy/50">
                                <span className="text-navy font-medium">SKU:</span> {product.sku}
                            </p>
                        )}
                    </div>

                    {/* Shipping / returns / authenticity accordion */}
                    <ShippingInfo />

                    {/* ── Specifications ─────────────────────────── */}
                    {product.specifications && product.specifications.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-navy/10">
                            <h2 className="font-heading text-lg font-bold text-navy mb-4">
                                Specifications
                            </h2>
                            <dl className="divide-y divide-navy/5">
                                {product.specifications.map((spec) => (
                                    <div
                                        key={spec.label}
                                        className="flex justify-between py-3 font-body text-sm"
                                    >
                                        <dt className="text-navy/50 shrink-0 mr-4">{spec.label}</dt>
                                        <dd className="text-navy font-medium text-right">
                                            {spec.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}

                    {/* ── Reviews ────────────────────────────────── */}
                    {product.reviews && product.reviews.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-navy/10">
                            <h2 className="font-heading text-lg font-bold text-navy mb-6">
                                Customer Reviews
                                <span className="ml-2 text-sm font-normal text-navy/40">
                                    ({product.reviews.length})
                                </span>
                            </h2>
                            <div className="flex flex-col gap-6">
                                {product.reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="pb-6 border-b border-navy/5 last:border-0"
                                    >
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div className="flex items-center flex-wrap gap-1.5">
                                                <span className="font-heading text-sm font-semibold text-navy">
                                                    {review.name}
                                                </span>
                                                {review.verified && (
                                                    <span className="flex items-center gap-1 text-[11px] text-gold font-medium">
                                                        <BadgeCheck size={13} /> Verified Purchase
                                                    </span>
                                                )}
                                            </div>
                                            <span className="font-body text-xs text-navy/40">
                                                {new Date(review.date).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-0.5 mb-2">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={13}
                                                    className={
                                                        i < review.rating
                                                            ? "fill-gold text-gold"
                                                            : "fill-navy/10 text-navy/10"
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <p className="font-body text-sm text-navy/70 leading-relaxed">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related products */}
            {relatedProducts.length > 0 && (
                <div className="mt-12 md:mt-20">
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-navy mb-6 md:mb-8">
                        You May Also Like
                    </h2>
                    <ProductGrid products={relatedProducts} />
                </div>
            )}
        </main>
    );
}