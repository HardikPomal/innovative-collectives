"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, AlertCircle } from "lucide-react";
import type { Product } from "@/types";
import { updateProduct } from "@/lib/db/api";

interface FeaturedLimitModalProps {
    isOpen: boolean;
    onClose: () => void;
    featuredProducts: Product[];
    onProductRemoved: (productId: string) => void;
}

export default function FeaturedLimitModal({
    isOpen,
    onClose,
    featuredProducts,
    onProductRemoved
}: FeaturedLimitModalProps) {
    const [mounted, setMounted] = useState(false);
    const [removingId, setRemovingId] = useState<string | null>(null);
    const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    const handleRemoveFeatured = async (product: Product) => {
        setRemovingId(product.id);
        try {
            await updateProduct({ ...product, featured: false });
            onProductRemoved(product.id);
        } catch (error) {
            console.error("Failed to remove featured status", error);
        } finally {
            setRemovingId(null);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity" 
                onClick={() => {
                    if (confirmRemoveId) setConfirmRemoveId(null);
                    else onClose();
                }}
            />

            {/* Modal content */}
            <div className="relative bg-ivory rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-5 border-b border-navy/10 flex items-start justify-between bg-cream">
                    <div className="flex gap-3 items-center text-amber-600">
                        <AlertCircle size={24} className="shrink-0" />
                        <h2 className="text-lg font-heading font-bold text-navy">
                            Featured Limit Reached
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-navy/40 hover:text-navy transition-colors p-1"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6">
                    {confirmRemoveId ? (
                        <div className="space-y-5 animate-in slide-in-from-right-4 duration-200">
                            <p className="text-navy">
                                Are you sure you want to remove <strong>{featuredProducts.find(p => p.id === confirmRemoveId)?.name}</strong> from the homepage featured list?
                            </p>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setConfirmRemoveId(null)}
                                    className="flex-1 py-2.5 bg-navy/5 text-navy hover:bg-navy/10 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        const p = featuredProducts.find(p => p.id === confirmRemoveId);
                                        if (p) handleRemoveFeatured(p);
                                    }}
                                    disabled={!!removingId}
                                    className="flex-1 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                                >
                                    {removingId ? "Removing..." : "Remove"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-200">
                            <p className="text-sm text-navy/70 mb-5 leading-relaxed">
                                You can only have up to 8 featured products on the homepage at a time. To feature this product, please turn off the featured status for one of the products below.
                            </p>

                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="flex items-center justify-between p-3 border border-navy/10 rounded-xl bg-white hover:border-gold/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-cream rounded overflow-hidden shrink-0">
                                        <img 
                                            src={product.images[0]} 
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-navy line-clamp-1">
                                            {product.name}
                                        </p>
                                        <p className="text-[10px] text-navy/50 font-mono">
                                            {product.sku || product.id}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setConfirmRemoveId(product.id)}
                                    className={`w-10 h-5 rounded-full relative transition-colors shrink-0 ${removingId === product.id ? "bg-navy/10 cursor-not-allowed" : "bg-gold"}`}
                                >
                                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-ivory transition-transform ${removingId === product.id ? "left-0.5" : "left-[22px]"}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </div>
        </div>,
        document.body
    );
}
