"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    TrendingUp,
    ShoppingBag,
    Package,
    CreditCard,
    ArrowUpRight,
    Plus,
    AlertTriangle,
    Users,
    Settings,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { categories } from "@/data/products";
import { getOrders, getProducts } from "@/lib/db/api";
import type { Order, Product } from "@/types";

function getStatusStyle(status: string) {
    switch (status) {
        case "Delivered":
            return "text-emerald-600 font-medium";
        case "In Transit":
            return "text-navy font-medium";
        case "Processing":
            return "text-gold font-medium";
        case "Cancelled":
            return "text-red-600 font-medium";
        default:
            return "text-navy/60";
    }
}

export default function AdminDashboardPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([getOrders(), getProducts()]).then(([o, p]) => {
            setOrders(o);
            setProducts(p);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const inStockCount = products.filter(p => p.inStock).length;
    const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    const todayStr = new Date().toISOString().split("T")[0];
    const newOrdersToday = orders.filter(o => o.date.startsWith(todayStr));
    const recentOrders = orders.slice(0, 5);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Title */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-navy">
                        Dashboard
                    </h1>
                    <p className="text-navy/70 mt-1">
                        Overview of platform performance and recent activity.
                    </p>
                </div>
                <Button
                    href="/admin/products/new"
                    variant="secondary"
                    icon={<Plus size={16} />}
                >
                    Add Product
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    {
                        label: "Total Revenue",
                        value: formatPrice(totalRevenue),
                        sub: "Lifetime earnings",
                        icon: TrendingUp,
                    },
                    {
                        label: "Total Orders",
                        value: orders.length.toLocaleString(),
                        sub: `${orders.filter(o => o.status === "Processing").length} pending dispatch`,
                        icon: ShoppingBag,
                    },
                    {
                        label: "Products",
                        value: `${products.length} Items`,
                        sub: `${inStockCount} in stock`,
                        icon: Package,
                    },
                    {
                        label: "Avg. Order Value",
                        value: formatPrice(averageOrderValue),
                        sub: "Lifetime average",
                        icon: CreditCard,
                    },
                ].map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            className="bg-navy p-6 rounded-2xl shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs uppercase tracking-wider text-cream/60 font-semibold">
                                    {card.label}
                                </span>
                                <Icon size={18} className="text-gold" />
                            </div>
                            <p className="text-2xl text-cream font-heading leading-tight">
                                {card.value}
                            </p>
                            <p className="text-xs mt-2 text-cream/70">
                                {card.sub}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* New Orders Today Section (Conditional) */}
            {newOrdersToday.length > 0 && (
                <div className="bg-gold/10 border border-gold/20 p-6 rounded-2xl animate-in fade-in duration-300">
                    <div className="flex items-center gap-3 mb-4 text-gold">
                        <AlertTriangle size={20} />
                        <h2 className="text-lg font-heading font-bold">New Orders Received Today</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {newOrdersToday.map(order => (
                            <Link key={order.id} href={`/admin/orders/${order.id}`} className="bg-ivory border border-gold/30 p-4 rounded-xl hover:border-gold transition-colors block">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-mono text-sm font-bold text-navy">{order.orderNumber}</span>
                                    <span className="text-xs font-semibold bg-gold text-white px-2 py-0.5 rounded uppercase">{order.status}</span>
                                </div>
                                <div className="text-sm text-navy/70 mb-1">{order.shippingAddress?.fullName}</div>
                                <div className="font-medium text-navy">{formatPrice(order.total)}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Grid: Recent Orders + Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-ivory border border-navy/10 shadow-sm rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-navy/10">
                        <h2 className="text-lg font-heading text-navy">
                            Recent Orders
                        </h2>
                        <Link
                            href="/admin/orders"
                            className="text-xs text-navy/70 hover:text-navy transition-colors flex items-center gap-1 uppercase tracking-widest font-semibold"
                        >
                            View All <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-cream text-navy">
                                    {["Order", "Customer", "Date", "Status", "Total"].map((h) => (
                                        <th
                                            key={h}
                                            className={`py-3 px-6 font-heading uppercase tracking-wider text-xs ${h === "Total" ? "text-right" : ""}`}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-navy/50">
                                            No orders found.
                                        </td>
                                    </tr>
                                ) : (
                                    recentOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="border-b border-navy/5 hover:bg-cream/50 transition-colors text-navy/80"
                                        >
                                            <td className="py-4 px-6 font-mono text-navy font-medium">
                                                <Link
                                                    href={`/admin/orders/${order.id}`}
                                                    className="hover:text-gold transition-colors"
                                                >
                                                    {order.orderNumber}
                                                </Link>
                                            </td>
                                            <td className="py-4 px-6">
                                                {order.shippingAddress?.fullName}
                                            </td>
                                            <td className="py-4 px-6 text-navy/60">
                                                {new Date(order.date).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`text-xs uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right font-medium text-navy">
                                                {formatPrice(order.total)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Category Breakdown */}
                    <div className="bg-ivory border border-navy/10 shadow-sm p-6 rounded-2xl">
                        <h2 className="text-lg font-heading text-navy mb-5">
                            Products by Category
                        </h2>
                        <div className="space-y-4">
                            {categories.map((cat) => {
                                const count = products.filter((p) => p.category === cat.slug).length;
                                const pct = Math.round((count / products.length) * 100);
                                return (
                                    <div key={cat.slug}>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-navy">{cat.name}</span>
                                            <span className="text-navy/60 font-mono text-xs">{count} items</span>
                                        </div>
                                        <div className="h-1 bg-cream overflow-hidden rounded-full">
                                            <div
                                                className="h-full bg-gold"
                                                style={{ width: `${Math.min(pct * 2.5, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
