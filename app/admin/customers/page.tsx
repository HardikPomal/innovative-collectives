"use client";

import { useState, useEffect } from "react";
import { Search, Users, X, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { AdminCustomer } from "@/data/mockAdmin";
import { getCustomers } from "@/lib/db/api";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Pagination from "@/components/ui/Pagination";
import Badge from "@/components/ui/Badge";

function initials(name: string) {
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2);
}

export default function AdminCustomersPage() {

    const [customers, setCustomers] = useState<AdminCustomer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCustomers().then(data => {
            setCustomers(data);
            setIsLoading(false);
        });
    }, []);

    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState<AdminCustomer | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const filtered = customers.filter((c) => {
        const q = searchQuery.toLowerCase();
        return (
            !q ||
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.city.toLowerCase().includes(q)
        );
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedCustomers = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-heading text-navy">
                    Customers
                    <span className="ml-3 text-sm font-body text-navy/60">({customers.length})</span>
                </h1>
                <p className="text-navy/70 mt-1">
                    View and manage all registered customers and their purchase history.
                </p>
            </div>

            {/* Table Card */}
            <div className="bg-ivory border border-navy/10 shadow-sm rounded-2xl overflow-hidden">
                {/* Search */}
                <div className="p-5 border-b border-navy/10">
                    <div className="max-w-md">
                        <TextField
                            id="search"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            placeholder="Search by name, email, or city..."
                            icon={<Search size={16} />}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-cream text-navy">
                                {["Customer", "Location", "Orders", "Total Spend", "Joined", "Status", ""].map((h) => (
                                    <th
                                        key={h}
                                        className={`py-3 px-5 font-heading uppercase tracking-wider text-xs ${h === "" ? "text-right" : ""}`}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="py-16 text-center bg-cream">
                                        <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                        <p className="font-heading text-lg text-navy">Loading customers...</p>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-16 text-center bg-cream">
                                        <Users size={32} className="mx-auto mb-3 text-navy/30" />
                                        <p className="font-heading text-lg text-navy">No customers found</p>
                                        <p className="text-sm text-navy/60 mt-1">Try adjusting your search.</p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedCustomers.map((cust) => (
                                    <tr
                                        key={cust.id}
                                        onClick={() => setSelected(cust)}
                                        className="border-b border-navy/5 hover:bg-cream/50 transition-colors cursor-pointer text-navy"
                                    >
                                        <td className="py-4 px-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-navy text-ivory font-bold text-sm flex items-center justify-center shrink-0">
                                                    {initials(cust.name)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-navy">{cust.name}</p>
                                                    <p className="text-xs text-navy/60 mt-0.5">{cust.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-5">
                                            {cust.city}, {cust.country}
                                        </td>
                                        <td className="py-4 px-5 font-semibold text-navy">
                                            {cust.orderCount}
                                        </td>
                                        <td className="py-4 px-5 font-semibold text-navy">
                                            {formatPrice(cust.totalSpent)}
                                        </td>
                                        <td className="py-4 px-5 text-navy/70">
                                            {cust.joinedDate}
                                        </td>
                                        <td className="py-4 px-5">
                                            <Badge status={cust.status} />
                                        </td>
                                        <td className="py-4 px-5 text-right">
                                            <Button
                                                onClick={(e) => { e.stopPropagation(); setSelected(cust); }}
                                                variant="outline"
                                                size="sm"
                                                className="uppercase tracking-wider !text-[11px] !py-1.5"
                                            >
                                                View →
                                            </Button>
                                        </td>
                                    </tr>
                                ))
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

            {/* Customer Profile Drawer */}
            {selected && (
                <div className="fixed inset-0 z-50 flex justify-end bg-navy/50">
                    <div className="w-full max-w-sm bg-ivory border-l border-navy/10 h-full overflow-y-auto shadow-xl">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-navy/10 sticky top-0 bg-ivory">
                            <h2 className="text-lg font-heading text-navy">Customer Profile</h2>
                            <button
                                onClick={() => setSelected(null)}
                                className="p-2 border border-navy/20 text-navy hover:bg-cream transition-colors rounded"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Avatar & Name */}
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-full bg-navy text-ivory font-bold text-2xl flex items-center justify-center shrink-0">
                                    {initials(selected.name)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-heading text-navy">{selected.name}</h3>
                                    <div className="mt-2">
                                        <Badge status={selected.status} />
                                    </div>
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-cream border border-navy/10 rounded-lg p-4">
                                    <p className="text-[10px] uppercase tracking-wider text-navy/60 font-semibold">Total Spend</p>
                                    <p className="text-lg font-heading text-navy mt-1">{formatPrice(selected.totalSpent)}</p>
                                </div>
                                <div className="bg-cream border border-navy/10 rounded-lg p-4">
                                    <p className="text-[10px] uppercase tracking-wider text-navy/60 font-semibold">Orders</p>
                                    <p className="text-lg font-heading text-navy mt-1">{selected.orderCount}</p>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="bg-cream border border-navy/10 rounded-lg p-5 space-y-3 text-sm">
                                <p className="text-[10px] uppercase tracking-wider text-navy/60 font-semibold mb-4">Contact Details</p>
                                <div className="flex items-center gap-3 text-navy">
                                    <Mail size={16} className="text-gold shrink-0" />
                                    <span>{selected.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-navy">
                                    <Phone size={16} className="text-gold shrink-0" />
                                    <span>{selected.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-navy">
                                    <MapPin size={16} className="text-gold shrink-0" />
                                    <span>{selected.city}, {selected.country}</span>
                                </div>
                                <div className="flex items-center gap-3 text-navy">
                                    <Calendar size={16} className="text-gold shrink-0" />
                                    <span>Customer since {selected.joinedDate}</span>
                                </div>
                            </div>


                            <Button
                                onClick={() => setSelected(null)}
                                variant="outline"
                                className="w-full justify-center"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
