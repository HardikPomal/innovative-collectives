// app/(storefront)/cart/page.tsx
"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/product/ProductImage";
import Button from "@/components/ui/Button";

const FREE_SHIPPING_THRESHOLD = 5000;

export default function CartPage() {
    const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 flex flex-col items-center text-center">
                <ShoppingBag size={40} className="text-gold/50 mb-4" strokeWidth={1.5} />
                <h1 className="font-heading text-2xl text-navy mb-2">
                    Your cart is empty
                </h1>
                <p className="font-body text-sm text-navy/60 mb-8">
                    Explore the collection and find something you love.
                </p>
                <Button
                    href="/products"
                    variant="primary"
                >
                    Continue Shopping
                </Button>
            </div>
        );
    }

    const remainingForFreeShipping = Math.max(
        0,
        FREE_SHIPPING_THRESHOLD - subtotal
    );
    const shippingProgress = Math.min(
        100,
        (subtotal / FREE_SHIPPING_THRESHOLD) * 100
    );

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            <h1 className="font-heading text-3xl text-navy mb-8">
                Shopping Cart{" "}
                <span className="font-body text-base text-navy/50">
                    ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
            </h1>

            {/* Free shipping progress */}
            <div className="mb-8 bg-cream rounded-2xl p-5">
                {remainingForFreeShipping > 0 ? (
                    <p className="font-body text-sm text-navy mb-2">
                        Add{" "}
                        <span className="font-medium text-gold">
                            {formatPrice(remainingForFreeShipping)}
                        </span>{" "}
                        more for free shipping
                    </p>
                ) : (
                    <p className="font-body text-sm text-navy mb-2">
                        You&apos;ve unlocked free shipping!
                    </p>
                )}
                <div className="h-1.5 bg-navy/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gold rounded-full transition-all duration-500"
                        style={{ width: `${shippingProgress}%` }}
                    />
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Items */}
                <div className="lg:col-span-2 flex flex-col divide-y divide-navy/10">
                    {items.map(({ product, quantity }) => (
                        <div
                            key={product.id}
                            className="flex gap-4 py-6 first:pt-0"
                        >
                            <Link
                                href={`/products/${product.slug}`}
                                className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden bg-cream"
                            >
                                <ProductImage
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="object-cover"
                                />
                            </Link>

                            <div className="flex-1 flex flex-col justify-between min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <Link href={`/products/${product.slug}`}>
                                            <h3 className="font-heading text-base text-navy truncate hover:text-gold transition-colors">
                                                {product.name}
                                            </h3>
                                        </Link>
                                        {product.brand && (
                                            <p className="font-body text-xs text-navy/50 mt-0.5">
                                                {product.brand}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => removeItem(product.id)}
                                        aria-label="Remove item"
                                        className="text-navy/40 hover:text-navy transition-colors shrink-0"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center border border-navy/15 rounded-full overflow-hidden">
                                        <button
                                            onClick={() =>
                                                updateQuantity(product.id, quantity - 1)
                                            }
                                            aria-label="Decrease quantity"
                                            className="w-8 h-8 flex items-center justify-center text-navy hover:bg-cream transition-colors"
                                        >
                                            <Minus size={13} />
                                        </button>
                                        <span className="w-8 text-center font-body text-sm text-navy">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(product.id, quantity + 1)
                                            }
                                            aria-label="Increase quantity"
                                            className="w-8 h-8 flex items-center justify-center text-navy hover:bg-cream transition-colors"
                                        >
                                            <Plus size={13} />
                                        </button>
                                    </div>
                                    <span className="font-body text-sm font-medium text-navy">
                                        {formatPrice(product.price * quantity)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order summary */}
                <div className="lg:col-span-1">
                    <div className="bg-cream rounded-2xl p-6 sticky top-28">
                        <h2 className="font-heading text-lg text-navy mb-5">
                            Order Summary
                        </h2>
                        <div className="flex justify-between font-body text-sm text-navy/70 mb-2">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between font-body text-sm text-navy/70 mb-4">
                            <span>Shipping</span>
                            <span>
                                {remainingForFreeShipping > 0 ? "Calculated at checkout" : "Free"}
                            </span>
                        </div>
                        <div className="h-px bg-navy/10 mb-4" />
                        <div className="flex justify-between font-heading text-base text-navy mb-6">
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <Button
                            href="/checkout"
                            variant="primary"
                            fullWidth
                            icon={<ArrowRight size={16} />}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}