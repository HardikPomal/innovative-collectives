"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Package } from "lucide-react";
import { getOrders } from "@/lib/db/api";
import type { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import type { OrderStatus } from "@/types";
import Button from "@/components/ui/Button";

const STATUS_COLOR: Record<OrderStatus, string> = {
    "Processing": "bg-amber-50 text-amber-700 border-amber-200",
    "In Transit": "bg-blue-50 text-blue-700 border-blue-200",
    "Delivered": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Cancelled": "bg-red-50 text-red-700 border-red-200",
    "Returned": "bg-red-50 text-red-700 border-red-200",
    "Refunded": "bg-gray-50 text-gray-600 border-gray-200",
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getOrders().then(data => {
            setOrders(data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-24 text-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-heading text-navy">Loading your orders...</p>
            </main>
        );
    }

    return (
        <main className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <Link href="/account" className="inline-flex items-center gap-1.5 font-body text-sm text-navy/50 hover:text-navy transition-colors mb-8">
                <ArrowLeft size={15} /> Back to Account
            </Link>

            <h1 className="font-heading text-2xl md:text-3xl text-navy mb-8">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-ivory border border-navy/8 rounded-3xl">
                    <Package size={36} className="text-navy/20 mx-auto mb-4" strokeWidth={1.5} />
                    <p className="font-heading text-lg text-navy mb-1">No orders yet</p>
                    <p className="font-body text-sm text-navy/50 mb-6">When you place an order, it will appear here.</p>
                    <Button
                        href="/products"
                        variant="primary"
                    >
                        Shop now
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Link
                            key={order.id}
                            href={`/account/orders/${order.id}`}
                            className="block bg-ivory border border-navy/8 rounded-2xl p-5 hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all group"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <p className="font-body text-sm font-medium text-navy">{order.orderNumber}</p>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_COLOR[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="font-body text-xs text-navy/45">
                                        {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                                    </p>
                                </div>
                                <ChevronRight size={16} className="text-navy/25 group-hover:text-gold transition-colors shrink-0 mt-0.5" />
                            </div>

                            {/* Item previews */}
                            <div className="mt-4 space-y-2">
                                {order.items.slice(0, 2).map(({ product, quantity }) => (
                                    <div key={product.id} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-cream border border-navy/8 shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="font-body text-xs text-navy/70 truncate flex-1">
                                            {product.name} <span className="text-navy/40">× {quantity}</span>
                                        </p>
                                    </div>
                                ))}
                                {order.items.length > 2 && (
                                    <p className="font-body text-xs text-navy/40">
                                        + {order.items.length - 2} more item{order.items.length - 2 !== 1 ? "s" : ""}
                                    </p>
                                )}
                            </div>

                            {/* Total */}
                            <div className="mt-4 pt-3 border-t border-navy/6 flex justify-between">
                                <span className="font-body text-xs text-navy/50">Order total</span>
                                <span className="font-body text-sm font-medium text-navy">{formatPrice(order.total)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
