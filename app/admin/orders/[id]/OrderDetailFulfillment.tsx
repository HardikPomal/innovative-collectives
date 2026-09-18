"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, User, MapPin, CreditCard, Save } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { updateOrder } from "@/lib/db/api";
import type { Order, OrderStatus } from "@/types";
import Button from "@/components/ui/Button";

function statusStyle(status: string) {
    switch (status) {
        case "Delivered": return "text-emerald-600 font-medium";
        case "In Transit": return "text-navy font-medium";
        case "Processing": return "text-gold font-medium";
        case "Cancelled": return "text-red-600 font-medium";
        default: return "text-navy/60";
    }
}

export default function OrderDetailFulfillment({ initialOrder }: { initialOrder: Order }) {
    const [order, setOrder] = useState<Order>(initialOrder);
    const [status, setStatus] = useState<OrderStatus>(initialOrder.status);
    const [notes, setNotes] = useState("Order allocated to white-glove dispatch. Serial provenance verified.");
    const [saved, setSaved] = useState(false);
    const [notesSaved, setNotesSaved] = useState(false);

    const handleStatusChange = async (newStatus: OrderStatus) => {
        setStatus(newStatus);
        const updatedOrder = { ...order, status: newStatus };
        setOrder(updatedOrder);
        await updateOrder(updatedOrder);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleSaveNotes = () => {
        setNotesSaved(true);
        setTimeout(() => setNotesSaved(false), 3000);
    };

    const cardCls = "bg-ivory border border-navy/10 shadow-sm rounded-2xl overflow-hidden";

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Toast */}
            {saved && (
                <div className="fixed bottom-5 right-5 z-50 bg-navy shadow-md px-5 py-3 text-sm text-ivory font-medium border border-navy/20 flex items-center gap-3 rounded-lg">
                    <Check size={16} className="text-gold" />
                    Order status updated to "{status}".
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        href="/admin/orders"
                        variant="outline"
                        className="!p-2.5"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-heading text-navy font-mono">
                                {order.orderNumber}
                            </h1>
                            <span className={`px-2 py-0.5 border text-xs uppercase tracking-wider font-semibold rounded ${status === "Delivered" ? "bg-cream border-emerald-600 text-emerald-600" :
                                    status === "Processing" ? "bg-cream border-gold text-gold" :
                                        status === "In Transit" ? "bg-cream border-navy text-navy" :
                                            "bg-cream border-red-600 text-red-600"
                                }`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm text-navy/70 mt-1">
                            Placed on {new Date(order.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })} · Tracking: {order.trackingNumber || "Pending"}
                        </p>
                    </div>
                </div>

                {/* Status Changer */}
                <div className="flex items-center gap-3 shrink-0">
                    <label className="text-xs uppercase tracking-wider text-navy/60 font-semibold hidden sm:block">
                        Transition:
                    </label>
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                        className="px-4 py-2 border border-navy/20 text-sm text-navy focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-ivory transition-colors rounded-lg"
                    >
                        <option value="Processing">Processing</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Items + Tracking */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Ordered Items */}
                    <div className={cardCls}>
                        <div className="px-6 py-5 border-b border-navy/10">
                            <h2 className="text-lg font-heading text-navy">
                                Ordered Items ({order.items.length})
                            </h2>
                        </div>
                        <div className="divide-y divide-navy/10">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="px-6 py-5 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 bg-cream border border-navy/10 overflow-hidden shrink-0 rounded-lg">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-navy">{item.product.name}</p>
                                            <p className="text-xs text-navy/60 font-mono mt-1">
                                                {item.product.sku || `IC-${item.product.id}`}
                                            </p>
                                            <p className="text-xs text-navy/80 mt-1.5">
                                                Qty {item.quantity} × {formatPrice(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-navy text-sm shrink-0">
                                        {formatPrice(item.price * item.quantity)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Cost Breakdown */}
                        <div className="px-6 py-5 border-t border-navy/10 bg-cream space-y-3 text-sm">
                            <div className="flex justify-between text-navy/80">
                                <span>Subtotal</span>
                                <span>{formatPrice(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-navy/80">
                                <span>Shipping</span>
                                <span>{order.shipping === 0 ? "Complimentary" : formatPrice(order.shipping)}</span>
                            </div>
                            <div className="flex justify-between text-navy/80">
                                <span>Tax</span>
                                <span>Included</span>
                            </div>
                            <div className="flex justify-between font-heading text-lg text-navy pt-4 border-t border-navy/10">
                                <span>Grand Total</span>
                                <span>{formatPrice(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tracking Checkpoints */}
                    {order.trackingCheckpoints && order.trackingCheckpoints.length > 0 && (
                        <div className={cardCls}>
                            <div className="px-6 py-5 border-b border-navy/10">
                                <h2 className="text-lg font-heading text-navy">Fulfillment Checkpoints</h2>
                                <p className="text-xs text-navy/60 mt-1 uppercase tracking-wider">Carrier: {order.carrier || "Dedicated Courier"}</p>
                            </div>
                            <div className="px-6 py-6">
                                <div className="relative pl-7 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-navy/20">
                                    {order.trackingCheckpoints.map((cp, idx) => (
                                        <div key={idx} className="relative">
                                            <div className={`absolute -left-7 top-1 w-3 h-3 rounded-full flex items-center justify-center outline outline-4 outline-ivory ${cp.completed ? "bg-navy" : cp.current ? "bg-gold" : "bg-navy/20"
                                                }`} />
                                            <div>
                                                <div className="flex items-baseline justify-between">
                                                    <p className="text-sm font-semibold text-navy">{cp.title}</p>
                                                    <p className="text-xs text-navy/50">{cp.timestamp}</p>
                                                </div>
                                                <p className="text-sm text-navy/70 mt-1">{cp.description}</p>
                                                <p className="text-xs text-navy/50 font-mono mt-1.5">{cp.location}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Customer, Address, Payment, Notes */}
                <div className="space-y-6">
                    {/* Client */}
                    <div className={cardCls}>
                        <div className="px-5 py-4 border-b border-navy/10 flex items-center gap-3">
                            <User size={16} className="text-gold" />
                            <h2 className="text-lg font-heading text-navy">Client</h2>
                        </div>
                        <div className="px-5 py-5 text-sm space-y-2">
                            <p className="font-semibold text-navy">{order.shippingAddress.fullName}</p>
                            <p className="text-navy/80">{order.shippingAddress.phone}</p>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className={cardCls}>
                        <div className="px-5 py-4 border-b border-navy/10 flex items-center gap-3">
                            <MapPin size={16} className="text-gold" />
                            <h2 className="text-lg font-heading text-navy">Delivery</h2>
                        </div>
                        <div className="px-5 py-5 text-sm text-navy/80 leading-relaxed">
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                            <p className="text-navy/50 mt-1 uppercase tracking-widest text-[10px] font-semibold">{order.shippingAddress.country}</p>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className={cardCls}>
                        <div className="px-5 py-4 border-b border-navy/10 flex items-center gap-3">
                            <CreditCard size={16} className="text-gold" />
                            <h2 className="text-lg font-heading text-navy">Payment</h2>
                        </div>
                        <div className="px-5 py-5 text-sm space-y-3">
                            <div className="flex justify-between border-b border-navy/10 pb-2">
                                <span className="text-navy/60 uppercase tracking-wider text-[10px] font-semibold">Method</span>
                                <span className="font-medium text-navy">Card / Vault</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-navy/60 uppercase tracking-wider text-[10px] font-semibold">Status</span>
                                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                                    <Check size={14} />
                                    Settled
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Admin Notes */}
                    <div className={cardCls}>
                        <div className="px-5 py-4 border-b border-navy/10">
                            <h2 className="text-lg font-heading text-navy">Internal Notes</h2>
                        </div>
                        <div className="px-5 py-5 space-y-4">
                            <textarea
                                rows={4}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full px-4 py-3 border border-navy/20 bg-ivory rounded-lg text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors leading-relaxed"
                            />
                            {notesSaved && (
                                <p className="text-xs text-gold font-medium flex items-center gap-1.5">
                                    <Check size={14} />
                                    Notes saved.
                                </p>
                            )}
                            <Button
                                onClick={handleSaveNotes}
                                variant="outline"
                                className="w-full justify-center"
                                icon={<Save size={16} />}
                            >
                                Save Notes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
