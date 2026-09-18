"use client";

import { use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, CreditCard, Package } from "lucide-react";
import { getOrders } from "@/lib/db/api";
import { formatPrice } from "@/lib/utils";
import type { OrderStatus, Order } from "@/types";

const STATUS_COLOR: Record<OrderStatus, string> = {
    "Processing": "bg-amber-50 text-amber-700 border-amber-200",
    "In Transit": "bg-blue-50 text-blue-700 border-blue-200",
    "Delivered": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Cancelled": "bg-red-50 text-red-700 border-red-200",
    "Returned": "bg-red-50 text-red-700 border-red-200",
    "Refunded": "bg-gray-50 text-gray-600 border-gray-200",
};

export default function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getOrders().then(allOrders => {
            const found = allOrders.find(o => o.id === id || o.orderNumber === id);
            if (!found) {
                router.replace("/account/orders");
            } else {
                setOrder(found);
            }
            setIsLoading(false);
        });
    }, [id, router]);

    if (isLoading) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-24 text-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-heading text-navy">Loading order details...</p>
            </main>
        );
    }

    if (!order) return null;

    return (
        <main className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <Link href="/account/orders" className="inline-flex items-center gap-1.5 font-body text-sm text-navy/50 hover:text-navy transition-colors mb-8">
                <ArrowLeft size={15} /> Back to Orders
            </Link>

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-8">
                <div>
                    <h1 className="font-heading text-2xl md:text-3xl text-navy mb-1">{order.orderNumber}</h1>
                    <p className="font-body text-sm text-navy/50">
                        Placed on {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLOR[order.status]}`}>
                    {order.status}
                </span>
            </div>

            {/* Tracking timeline */}
            {order.trackingCheckpoints && order.trackingCheckpoints.length > 0 && (
                <section className="bg-ivory border border-navy/8 rounded-3xl p-6 mb-6">
                    <div className="flex items-center gap-2 mb-5">
                        <Package size={16} className="text-navy/50" />
                        <h2 className="font-heading text-base text-navy">Tracking</h2>
                        {order.carrier && (
                            <span className="font-body text-xs text-navy/40 ml-auto">{order.carrier}</span>
                        )}
                    </div>
                    {order.trackingNumber && (
                        <p className="font-body text-xs text-navy/50 mb-5">
                            Tracking #: <span className="font-medium text-navy/70">{order.trackingNumber}</span>
                        </p>
                    )}
                    {order.estimatedDelivery && (
                        <p className="font-body text-xs text-gold font-medium mb-5">{order.estimatedDelivery}</p>
                    )}

                    <ol className="space-y-0">
                        {order.trackingCheckpoints.map((cp, i) => (
                            <li key={i} className="flex gap-4">
                                {/* Dot + line */}
                                <div className="flex flex-col items-center">
                                    <div className={`w-3 h-3 rounded-full border-2 shrink-0 mt-0.5 ${cp.current ? "border-gold bg-gold" : cp.completed ? "border-emerald-500 bg-emerald-500" : "border-navy/20 bg-white"}`} />
                                    {i < order.trackingCheckpoints!.length - 1 && (
                                        <div className="w-px flex-1 bg-navy/10 my-1" />
                                    )}
                                </div>
                                {/* Content */}
                                <div className={`pb-5 ${i === order.trackingCheckpoints!.length - 1 ? "pb-0" : ""}`}>
                                    <p className={`font-body text-sm font-medium ${cp.current ? "text-gold" : cp.completed ? "text-navy" : "text-navy/40"}`}>
                                        {cp.title}
                                    </p>
                                    {cp.description && (
                                        <p className="font-body text-xs text-navy/50 mt-0.5">{cp.description}</p>
                                    )}
                                    <p className="font-body text-[10px] text-navy/35 mt-1">{cp.location} · {cp.timestamp}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>
            )}

            {/* Items */}
            <section className="bg-ivory border border-navy/8 rounded-3xl p-6 mb-6">
                <h2 className="font-heading text-base text-navy mb-5">Items ordered</h2>
                <ul className="divide-y divide-navy/6">
                    {order.items.map(({ product, quantity, price }) => (
                        <li key={product.id} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream border border-navy/8 shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <Link href={`/products/${product.slug}`} className="font-body text-sm font-medium text-navy hover:text-gold transition-colors truncate block">
                                    {product.name}
                                </Link>
                                <p className="font-body text-xs text-navy/45 mt-0.5">Qty: {quantity}</p>
                            </div>
                            <p className="font-body text-sm text-navy shrink-0">{formatPrice(price * quantity)}</p>
                        </li>
                    ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-navy/8 space-y-2">
                    <div className="flex justify-between font-body text-sm text-navy/60">
                        <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm text-navy/60">
                        <span>Shipping</span><span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
                    </div>
                    <div className="flex justify-between font-heading text-base text-navy pt-1">
                        <span>Total</span><span>{formatPrice(order.total)}</span>
                    </div>
                </div>
            </section>

            {/* Shipping address */}
            {order.shippingAddress && (
                <section className="bg-ivory border border-navy/8 rounded-3xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <MapPin size={15} className="text-navy/50" />
                        <h2 className="font-heading text-base text-navy">Shipping address</h2>
                    </div>
                    <p className="font-body text-sm text-navy">{order.shippingAddress.fullName}</p>
                    <p className="font-body text-sm text-navy/60">{order.shippingAddress.street}</p>
                    <p className="font-body text-sm text-navy/60">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                    <p className="font-body text-sm text-navy/60">{order.shippingAddress.country}</p>
                    <p className="font-body text-xs text-navy/40 mt-1">{order.shippingAddress.phone}</p>
                </section>
            )}
        </main>
    );
}
