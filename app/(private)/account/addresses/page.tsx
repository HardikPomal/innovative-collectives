// app/(private)/account/addresses/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, MapPin, Check, X } from "lucide-react";
import { initialMockAddresses } from "@/data/mockOrders";
import type { Address } from "@/types";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

function emptyAddress(): Omit<Address, "id"> {
    return { fullName: "", phone: "", street: "", city: "", state: "", postalCode: "", country: "India", type: "shipping" };
}

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>(initialMockAddresses);
    const [editing, setEditing] = useState<Address | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [form, setForm] = useState<Omit<Address, "id">>(emptyAddress());
    const [isSaving, setIsSaving] = useState(false);

    function updateField(field: keyof Omit<Address, "id">) {
        return (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
    }

    function startAdd() {
        setForm(emptyAddress());
        setEditing(null);
        setIsAdding(true);
    }

    function startEdit(addr: Address) {
        setForm({ fullName: addr.fullName, phone: addr.phone, street: addr.street, city: addr.city, state: addr.state, postalCode: addr.postalCode, country: addr.country, type: addr.type, isDefault: addr.isDefault });
        setEditing(addr);
        setIsAdding(true);
    }

    function cancelForm() {
        setIsAdding(false);
        setEditing(null);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);
        await new Promise((res) => setTimeout(res, 600));
        setIsSaving(false);
        if (editing) {
            setAddresses((prev) => prev.map((a) => a.id === editing.id ? { ...editing, ...form } : a));
        } else {
            const newAddr: Address = { ...form, id: `addr_${Date.now()}` };
            setAddresses((prev) => [...prev, newAddr]);
        }
        setIsAdding(false);
        setEditing(null);
    }

    function setDefault(id: string) {
        setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    }

    function deleteAddr(id: string) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    }

    return (
        <main className="max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <Link href="/account" className="inline-flex items-center gap-1.5 font-body text-sm text-navy/50 hover:text-navy transition-colors mb-8">
                <ArrowLeft size={15} /> Back to Account
            </Link>

            <div className="flex items-center justify-between mb-8">
                <h1 className="font-heading text-2xl md:text-3xl text-navy">Addresses</h1>
                {!isAdding && (
                    <Button
                        onClick={startAdd}
                        variant="primary"
                        size="sm"
                        icon={<Plus size={15} />}
                        iconPosition="left"
                    >
                        Add address
                    </Button>
                )}
            </div>

            {/* Address list */}
            {!isAdding && (
                <div className="space-y-4">
                    {addresses.length === 0 && (
                        <div className="text-center py-16 bg-ivory border border-navy/8 rounded-3xl">
                            <MapPin size={32} className="text-navy/20 mx-auto mb-3" strokeWidth={1.5} />
                            <p className="font-body text-sm text-navy/50">No addresses saved yet.</p>
                        </div>
                    )}
                    {addresses.map((addr) => (
                        <div key={addr.id} className="bg-ivory border border-navy/8 rounded-2xl p-5">
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="font-body text-sm font-medium text-navy">{addr.fullName}</p>
                                    {addr.isDefault && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/25 font-body text-[10px] text-gold font-medium">
                                            <Check size={9} strokeWidth={3} /> Default
                                        </span>
                                    )}
                                    {addr.type && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-navy/5 font-body text-[10px] text-navy/50 capitalize">
                                            {addr.type}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <button onClick={() => startEdit(addr)} className="p-1.5 rounded-lg text-navy/35 hover:text-navy hover:bg-navy/5 transition-colors">
                                        <Pencil size={14} />
                                    </button>
                                    <button onClick={() => deleteAddr(addr.id)} className="p-1.5 rounded-lg text-navy/35 hover:text-red-500 hover:bg-red-50 transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <p className="font-body text-sm text-navy/60">{addr.street}</p>
                            <p className="font-body text-sm text-navy/60">{addr.city}, {addr.state} {addr.postalCode}</p>
                            <p className="font-body text-sm text-navy/60">{addr.country}</p>
                            <p className="font-body text-xs text-navy/40 mt-1">{addr.phone}</p>
                            {!addr.isDefault && (
                                <button
                                    onClick={() => setDefault(addr.id)}
                                    className="mt-3 font-body text-xs text-gold hover:text-navy transition-colors"
                                >
                                    Set as default
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add / Edit form */}
            {isAdding && (
                <div className="bg-ivory border border-navy/8 rounded-3xl p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-heading text-lg text-navy">{editing ? "Edit address" : "New address"}</h2>
                        <button onClick={cancelForm} className="text-navy/35 hover:text-navy transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    <form onSubmit={handleSave} noValidate className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <TextField id="addr-fullname" label="Full name" value={form.fullName} onChange={updateField("fullName")} autoComplete="off" required />
                            <TextField id="addr-phone" label="Phone" type="tel" value={form.phone} onChange={updateField("phone")} autoComplete="off" required />
                        </div>
                        <TextField id="addr-street" label="Street address" value={form.street} onChange={updateField("street")} autoComplete="off" required />
                        <div className="grid sm:grid-cols-2 gap-4">
                            <TextField id="addr-city" label="City" value={form.city} onChange={updateField("city")} autoComplete="off" required />
                            <TextField id="addr-state" label="State" value={form.state} onChange={updateField("state")} autoComplete="off" required />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <TextField id="addr-postal" label="Postal code" value={form.postalCode} onChange={updateField("postalCode")} autoComplete="off" required />
                            <TextField id="addr-country" label="Country" value={form.country} onChange={updateField("country")} autoComplete="off" required />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="sm"
                                isLoading={isSaving}
                            >
                                Save address
                            </Button>
                            <Button type="button" variant="ghost" size="sm" onClick={cancelForm}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}
