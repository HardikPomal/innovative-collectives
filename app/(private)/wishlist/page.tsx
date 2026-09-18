// app/(private)/wishlist/page.tsx
"use client";

import Link from "next/link";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import ProductImage from "@/components/product/ProductImage";
import Button from "@/components/ui/Button";

export default function WishlistPage() {
    const { items, removeItem } = useWishlist();
    const { addItem } = useCart();

    if (items.length === 0) {
        return (
            <main className="max-w-7xl mx-auto px-4 md:px-6 py-24 flex flex-col items-center text-center">
                <Heart size={40} className="text-gold/40 mb-4" strokeWidth={1.5} />
                <h1 className="font-heading text-2xl text-navy mb-2">Your wishlist is empty</h1>
                <p className="font-body text-sm text-navy/55 mb-8">Save items you love while you browse the collection.</p>
                <Button
                    href="/products"
                    variant="primary"
                >
                    Explore Collection
                </Button>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <div className="flex items-baseline gap-3 mb-8">
                <h1 className="font-heading text-2xl md:text-3xl text-navy">Wishlist</h1>
                <span className="font-body text-sm text-navy/45">{items.length} item{items.length !== 1 ? "s" : ""}</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map((product) => {
                    const discount = getDiscountPercent(product.price, product.compareAtPrice);
                    return (
                        <div key={product.id} className="group bg-ivory border border-navy/8 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-navy/8 transition-all">
                            {/* Image */}
                            <Link href={`/products/${product.slug}`} className="relative block aspect-square bg-cream overflow-hidden">
                                <ProductImage src={product.images[0]} alt={product.name} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                {discount && (
                                    <span className="absolute top-3 left-3 bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        -{discount}%
                                    </span>
                                )}
                            </Link>

                            {/* Info */}
                            <div className="p-4">
                                <Link href={`/products/${product.slug}`}>
                                    <p className="font-body text-sm font-medium text-navy truncate hover:text-gold transition-colors">
                                        {product.name}
                                    </p>
                                </Link>
                                {product.brand && (
                                    <p className="font-body text-xs text-navy/45 mt-0.5">{product.brand}</p>
                                )}
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="font-heading text-base text-navy">{formatPrice(product.price)}</span>
                                    {product.compareAtPrice && (
                                        <span className="font-body text-xs text-navy/35 line-through">{formatPrice(product.compareAtPrice)}</span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 mt-3">
                                    <Button
                                        size="sm"
                                        onClick={() => addItem(product)}
                                        disabled={!product.inStock}
                                        variant="primary"
                                        className="flex-1"
                                        icon={<ShoppingBag size={12} />}
                                        iconPosition="left"
                                    >
                                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                                    </Button>
                                    <button
                                        onClick={() => removeItem(product.id)}
                                        aria-label="Remove from wishlist"
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-navy/15 text-navy/40 hover:text-red-500 hover:border-red-200 transition-colors"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
