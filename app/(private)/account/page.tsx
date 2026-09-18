// app/(private)/account/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, MapPin, Heart, ShoppingBag, Star, ChevronRight, Package } from "lucide-react";
import { getOrders } from "@/lib/db/api";
import type { Order } from "@/types";
import { formatPrice } from "@/lib/utils";

const MOCK_USER = { name: "Alexander Wright", email: "alexander@example.com" };

const getNavItems = (orderCount: number) => [
    { href: "/account/profile", icon: User, label: "Profile", description: "Update your name and email" },
    { href: "/account/orders", icon: ShoppingBag, label: "My Orders", description: `${orderCount} orders placed` },
    { href: "/account/addresses", icon: MapPin, label: "Addresses", description: "Manage shipping & billing addresses" },
    { href: "/wishlist", icon: Heart, label: "Wishlist", description: "Items you've saved" },
    { href: "/account/reviews", icon: Star, label: "My Reviews", description: "Reviews you've written" },
];

const STATUS_COLOR: Record<string, string> = {
    "Processing": "bg-amber-50 text-amber-700 border-amber-200",
    "In Transit": "bg-blue-50 text-blue-700 border-blue-200",
    "Delivered": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Cancelled": "bg-red-50 text-red-700 border-red-200",
    "Returned": "bg-red-50 text-red-700 border-red-200",
    "Refunded": "bg-gray-50 text-gray-600 border-gray-200",
};

export default function AccountPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getOrders().then(data => {
            setOrders(data);
            setIsLoading(false);
        });
    }, []);

    const recentOrders = orders.slice(0, 3);
    const navItems = getNavItems(orders.length);

    return (
        <main className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-navy/8 border border-navy/12 flex items-center justify-center shrink-0">
                    <User size={24} className="text-navy/50" strokeWidth={1.5} />
                </div>
                <div>
                    <h1 className="font-heading text-2xl md:text-3xl text-navy">{MOCK_USER.name}</h1>
                    <p className="font-body text-sm text-navy/50 mt-0.5">{MOCK_USER.email}</p>
                </div>
            </div>

            {/* Navigation grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
                {navItems.map(({ href, icon: Icon, label, description }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-4 bg-ivory border border-navy/8 rounded-2xl px-5 py-4 hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gold/8 border border-gold/15 flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-colors">
                            <Icon size={18} className="text-gold" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-body text-sm font-medium text-navy">{label}</p>
                            <p className="font-body text-xs text-navy/45 mt-0.5 truncate">{description}</p>
                        </div>
                        <ChevronRight size={16} className="text-navy/25 group-hover:text-gold transition-colors shrink-0" />
                    </Link>
                ))}
            </div>

            {/* Recent orders */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading text-lg text-navy">Recent Orders</h2>
                    <Link href="/account/orders" className="font-body text-xs text-gold hover:text-navy transition-colors">
                        View all
                    </Link>
                </div>

                <div className="space-y-3">
                    {recentOrders.map((order) => (
                        <Link
                            key={order.id}
                            href={`/account/orders/${order.id}`}
                            className="flex items-center gap-4 bg-ivory border border-navy/8 rounded-2xl px-5 py-4 hover:border-gold/40 hover:shadow-md hover:shadow-navy/5 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                                <Package size={18} className="text-navy/40" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="font-body text-sm font-medium text-navy">{order.orderNumber}</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_COLOR[order.status] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="font-body text-xs text-navy/45 mt-0.5">
                                    {order.items.length} item{order.items.length !== 1 ? "s" : ""} · {formatPrice(order.total)}
                                </p>
                            </div>
                            <ChevronRight size={16} className="text-navy/25 group-hover:text-gold transition-colors shrink-0" />
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
