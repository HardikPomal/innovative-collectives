"use client";

import { ShoppingBag } from "lucide-react";

export default function QuickAddButton() {
    return (
        <button
            aria-label="Quick add to cart"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // TODO: wire up to real cart logic once cart state is built
            }}
            className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-gold transition-colors"
        >
            <ShoppingBag size={16} />
        </button>
    );
}