"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Trash2, AlertTriangle } from "lucide-react";

interface DeleteImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    imageUrl: string | null;
    imageIndex?: number | null;
    isMain?: boolean;
}

export default function DeleteImageModal({
    isOpen,
    onClose,
    onConfirm,
    imageUrl,
    isMain = false,
}: DeleteImageModalProps) {
    const [mounted, setMounted] = useState(false);

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

    if (!mounted || !isOpen || !imageUrl) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
                onClick={onClose}
            />

            {/* Modal content */}
            <div className="relative bg-ivory rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-navy/10">
                {/* Header */}
                <div className="px-6 py-4 border-b border-navy/10 flex items-center justify-between bg-cream">
                    <div className="flex gap-2.5 items-center text-red-600">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <Trash2 size={18} className="text-red-600" />
                        </div>
                        <h2 className="text-lg font-heading font-bold text-navy">
                            Delete Image
                        </h2>
                    </div>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="text-navy/40 hover:text-navy transition-colors p-1 rounded-md"
                        aria-label="Close dialog"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-6 space-y-4">
                    {/* Image Preview */}
                    <div className="relative w-full h-56 bg-cream/70 rounded-xl overflow-hidden border border-navy/10 flex items-center justify-center">
                        {isMain && (
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-gold text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm z-10">
                                Main Image
                            </span>
                        )}
                        <img
                            src={imageUrl}
                            alt="Preview of image to delete"
                            className="w-full h-full object-contain p-3"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                    </div>

                    {/* Warning text */}
                    <div className="space-y-2">
                        <p className="text-sm text-navy leading-relaxed">
                            Are you sure you want to delete this image? It will be removed from this product.
                        </p>
                        {isMain && (
                            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200/80 rounded-lg text-amber-800 text-xs leading-relaxed">
                                <AlertTriangle size={15} className="shrink-0 text-amber-600 mt-0.5" />
                                <span>This is currently the <strong>primary product image</strong>. The next image will become the main image.</span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 bg-navy/5 text-navy hover:bg-navy/10 rounded-lg font-medium text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Trash2 size={16} />
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
