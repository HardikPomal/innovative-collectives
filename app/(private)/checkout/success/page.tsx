// app/(private)/checkout/success/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/product/ProductImage";
import type { CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

interface OrderSnapshot {
    orderNumber: string;
    items: CartItem[];
    subtotal: number;
    paymentMethod: string;
    date: string;
}

const STEPS = [
    { label: "Order placed", done: true },
    { label: "Processing", done: true },
    { label: "Shipped", done: false },
    { label: "Delivered", done: false },
];

export default function OrderSuccessPage() {
    const router = useRouter();
    // Store router in a ref so the effect below can use it without being
    // re-triggered every time Next.js updates the router object — that
    // second run would find sessionStorage already cleared and redirect away.
    const routerRef = useRef(router);
    useEffect(() => { routerRef.current = router; });
    // Survives React Strict Mode's simulated unmount/remount cycle
    const hasConsumed = useRef(false);

    const [order, setOrder] = useState<OrderSnapshot | null>(null);
    const [visible, setVisible] = useState(false);
    const { clearCart } = useCart();

    useEffect(() => {
        if (hasConsumed.current) {
            const t = setTimeout(() => setVisible(true), 60);
            return () => clearTimeout(t);
        }

        const raw = sessionStorage.getItem("ic-last-order");
        if (!raw) {
            routerRef.current.replace("/products");
            return;
        }

        let parsed: OrderSnapshot;
        try {
            parsed = JSON.parse(raw);
        } catch {
            routerRef.current.replace("/products");
            return;
        }

        hasConsumed.current = true;
        sessionStorage.removeItem("ic-last-order");
        setOrder(parsed);
        clearCart();

        const t = setTimeout(() => setVisible(true), 60);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once on mount only

    if (!order) return null;

    return (
        <main className="min-h-[calc(100vh-160px)] bg-cream px-4 md:px-6 py-16">
            <div className="max-w-2xl mx-auto">

                {/* Success badge */}
                <div
                    className={`flex flex-col items-center text-center mb-12 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    <div className="relative mb-5">
                        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                            <CheckCircle size={38} className="text-emerald-500" strokeWidth={1.5} />
                        </div>
                        {/* Pulse ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-emerald-300 animate-ping opacity-30" />
                    </div>

                    <h1 className="font-heading text-3xl md:text-4xl text-navy mb-2">
                        Order confirmed!
                    </h1>
                    <p className="font-body text-sm text-navy/60 max-w-xs">
                        Thank you for your purchase. We&apos;re getting it ready for you.
                    </p>
                </div>

                {/* Order meta card */}
                <div
                    className={`bg-ivory rounded-3xl border border-navy/8 shadow-lg shadow-navy/5 overflow-hidden mb-6 transition-all duration-700 delay-100 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    {/* Order number header */}
                    <div className="bg-navy px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                            <p className="font-body text-xs text-cream/50 uppercase tracking-wider mb-0.5">
                                Order number
                            </p>
                            <p className="font-heading text-xl text-cream tracking-wide">
                                {order.orderNumber}
                            </p>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="font-body text-xs text-cream/50 uppercase tracking-wider mb-0.5">
                                Date
                            </p>
                            <p className="font-body text-sm text-cream/80">{order.date}</p>
                        </div>
                    </div>

                    {/* Progress tracker */}
                    <div className="px-6 pt-6 pb-5 border-b border-navy/8">
                        <div className="flex items-center gap-0">
                            {STEPS.map((step, i) => (
                                <div key={step.label} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center gap-1.5">
                                        <div
                                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${step.done
                                                ? "bg-emerald-500 border-emerald-500"
                                                : "bg-white border-navy/20"
                                                }`}
                                        >
                                            {step.done ? (
                                                <CheckCircle size={14} className="text-white" strokeWidth={2.5} />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-navy/20" />
                                            )}
                                        </div>
                                        <span className="font-body text-[10px] text-navy/55 whitespace-nowrap">
                                            {step.label}
                                        </span>
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div
                                            className={`flex-1 h-0.5 mx-1 mb-4 transition-colors ${step.done && STEPS[i + 1].done
                                                ? "bg-emerald-400"
                                                : step.done
                                                    ? "bg-gradient-to-r from-emerald-400 to-navy/15"
                                                    : "bg-navy/10"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Items list */}
                    <div className="px-6 pt-5 pb-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Package size={15} className="text-navy/40" />
                            <p className="font-body text-xs font-semibold text-navy/50 uppercase tracking-wider">
                                Items ordered
                            </p>
                        </div>
                        <ul className="divide-y divide-navy/6">
                            {order.items.map(({ product, quantity }) => (
                                <li key={product.id} className="flex items-center gap-4 py-3.5">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream border border-navy/8 shrink-0">
                                        <ProductImage
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-body text-sm text-navy font-medium truncate">
                                            {product.name}
                                        </p>
                                        <p className="font-body text-xs text-navy/45 mt-0.5">
                                            Qty: {quantity}
                                        </p>
                                    </div>
                                    <p className="font-body text-sm text-navy shrink-0">
                                        {formatPrice(product.price * quantity)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Totals + payment method */}
                    <div className="mx-6 mb-6 mt-2 bg-cream rounded-2xl p-4 space-y-2">
                        <div className="flex justify-between font-body text-sm text-navy/60">
                            <span>Payment method</span>
                            <span>{order.paymentMethod}</span>
                        </div>
                        <div className="h-px bg-navy/8" />
                        <div className="flex justify-between font-heading text-base text-navy">
                            <span>Total paid</span>
                            <span>{formatPrice(order.subtotal)}</span>
                        </div>
                    </div>
                </div>

                {/* Info note */}
                <div
                    className={`bg-gold/8 border border-gold/25 rounded-2xl px-5 py-4 mb-8 transition-all duration-700 delay-200 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    <p className="font-body text-sm text-navy/70">
                        <span className="font-semibold text-navy">What&apos;s next?</span>{" "}
                        You&apos;ll receive a confirmation email shortly. Track your shipment
                        from your account once it&apos;s dispatched.
                    </p>
                </div>

                {/* CTAs */}
                <div
                    className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-300 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    <Button
                        href="/products"
                        variant="primary"
                        fullWidth
                        icon={<ArrowRight size={16} />}
                    >
                        Continue Shopping
                    </Button>
                    <Button
                        href="/account/orders"
                        variant="outline"
                        fullWidth
                        icon={<ShoppingBag size={16} />}
                        iconPosition="left"
                    >
                        View My Orders
                    </Button>
                </div>

            </div>
        </main>
    );
}
