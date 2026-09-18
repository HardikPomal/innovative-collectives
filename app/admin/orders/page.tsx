"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronRight, ShoppingBag } from "lucide-react";
import { getOrders } from "@/lib/db/api";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Pagination from "@/components/ui/Pagination";

const STATUS_TABS: { id: string; label: string }[] = [
    { id: "all", label: "All" },
    { id: "Processing", label: "Processing" },
    { id: "In Transit", label: "In Transit" },
    { id: "Delivered", label: "Delivered" },
    { id: "Cancelled", label: "Cancelled" },
];

function statusStyle(status: string) {
    switch (status) {
        case "Delivered": return "text-emerald-600 font-medium";
        case "In Transit": return "text-navy font-medium";
        case "Processing": return "text-gold font-medium";
        case "Cancelled": return "text-red-600 font-medium";
        default: return "text-navy/60";
    }
}

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getOrders().then(data => {
            setOrders(data);
            setIsLoading(false);
        });
    }, []);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const counts: Record<string, number> = {
        all: orders.length,
        Processing: orders.filter((o) => o.status === "Processing").length,
        "In Transit": orders.filter((o) => o.status === "In Transit").length,
        Delivered: orders.filter((o) => o.status === "Delivered").length,
        Cancelled: orders.filter((o) => o.status === "Cancelled").length,
    };

    const filtered = orders.filter((order) => {
        const matchStatus = statusFilter === "all" || order.status === statusFilter;
        const q = searchQuery.toLowerCase().trim();
        const matchSearch =
            !q ||
            order.orderNumber.toLowerCase().includes(q) ||
            order.shippingAddress.fullName.toLowerCase().includes(q) ||
            (order.trackingNumber?.toLowerCase().includes(q) ?? false);
        return matchStatus && matchSearch;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedOrders = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-heading text-navy">Orders</h1>
                <p className="text-navy/70 mt-1">
                    Monitor and manage all client order fulfillment.
                </p>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-2 border-b border-navy/10 overflow-x-auto">
                {STATUS_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setStatusFilter(tab.id); setCurrentPage(1); }}
                        className={`px-5 py-3 text-sm font-semibold whitespace-nowrap flex items-center gap-2 transition-colors border-b-2 -mb-px uppercase tracking-wider ${
                            statusFilter === tab.id
                                ? "border-gold text-navy"
                                : "border-transparent text-navy/50 hover:text-navy hover:border-navy/20"
                        }`}
                    >
                        {tab.label}
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            statusFilter === tab.id ? "bg-navy text-ivory" : "bg-navy/10 text-navy"
                        }`}>
                            {counts[tab.id]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Toolbar and Table Wrapper */}
            <div>
                {/* Search Toolbar */}
                <div className="bg-ivory border border-navy/10 shadow-sm p-5 rounded-t-2xl">
                    <div className="max-w-md">
                        <TextField
                            id="search"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            placeholder="Search by order #, client name, or tracking ID..."
                            icon={<Search size={16} />}
                        />
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-ivory border border-navy/10 shadow-sm overflow-hidden rounded-b-2xl border-t-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-cream text-navy">
                                {["Order", "Customer", "Items", "Date", "Status", "Tracking", "Total", ""].map((h) => (
                                    <th key={h} className={`py-3 px-5 font-heading uppercase tracking-wider text-xs ${h === "Total" || h === "" ? "text-right" : ""}`}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center bg-cream">
                                        <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                        <p className="font-heading text-lg text-navy">Loading orders...</p>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-16 text-center bg-cream">
                                        <ShoppingBag size={32} className="mx-auto mb-3 text-navy/30" />
                                        <p className="font-heading text-lg text-navy">No orders found</p>
                                        <p className="text-sm text-navy/60 mt-1">Try clearing your filters.</p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedOrders.map((order) => {
                                    const totalUnits = order.items.reduce((s, i) => s + i.quantity, 0);
                                    return (
                                        <tr key={order.id} className="border-b border-navy/5 hover:bg-cream/50 transition-colors text-navy/80">
                                            <td className="py-4 px-5">
                                                <Link
                                                    href={`/admin/orders/${order.id}`}
                                                    className="font-mono font-semibold text-navy hover:text-gold transition-colors block"
                                                >
                                                    {order.orderNumber}
                                                </Link>
                                            </td>
                                            <td className="py-4 px-5">
                                                <p className="font-medium text-navy">{order.shippingAddress.fullName}</p>
                                                <p className="text-xs text-navy/60 mt-0.5">
                                                    {order.shippingAddress.city}, {order.shippingAddress.state}
                                                </p>
                                            </td>
                                            <td className="py-4 px-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex -space-x-2">
                                                        {order.items.slice(0, 2).map((item, idx) => (
                                                            <div key={idx} className="w-8 h-8 bg-cream border border-ivory overflow-hidden rounded">
                                                                <img
                                                                    src={item.product.images[0]}
                                                                    alt=""
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-navy/70 font-semibold">{totalUnits} item{totalUnits !== 1 ? "s" : ""}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 text-navy/70 whitespace-nowrap">
                                                {new Date(order.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="py-4 px-5">
                                                <span className={`text-xs uppercase tracking-wider ${statusStyle(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5">
                                                {order.trackingNumber ? (
                                                    <span className="font-mono text-xs text-navy block">
                                                        {order.trackingNumber}
                                                    </span>
                                                ) : (
                                                    <span className="text-navy/50 italic">Pending</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-5 text-right font-medium text-navy">
                                                {formatPrice(order.total)}
                                            </td>
                                            <td className="py-4 px-5 text-right">
                                                <Button
                                                    href={`/admin/orders/${order.id}`}
                                                    variant="outline"
                                                    size="sm"
                                                    className="uppercase tracking-wider !text-[11px] !py-1.5 whitespace-nowrap inline-flex items-center"
                                                >
                                                    Manage <ChevronRight size={14} className="ml-1 shrink-0" />
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            </div>
        </div>
    );
}
