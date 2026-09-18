// components/product/QuickAddButton.tsx
"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export default function QuickAddButton({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [justAdded, setJustAdded] = useState(false);

    return (
        <button
            aria-label="Quick add to cart"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product, 1);
                setJustAdded(true);
                setTimeout(() => setJustAdded(false), 1500);
            }}
            className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors ${justAdded
                    ? "bg-gold text-white"
                    : "bg-white text-navy hover:bg-gold hover:text-white"
                }`}
        >
            {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
        </button>
    );
}