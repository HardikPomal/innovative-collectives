"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Product } from "@/types";

export default function AddToCart({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const decrease = () => setQuantity((q) => Math.max(1, q - 1));
    const increase = () => setQuantity((q) => q + 1);

    const handleAddToCart = () => {
        // TODO: wire up to real cart state (Context/store) once cart system is built
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <span className="font-body text-sm text-navy/60">Quantity</span>
                <div className="flex items-center border border-navy/15 rounded-full overflow-hidden">
                    <button
                        onClick={decrease}
                        aria-label="Decrease quantity"
                        className="w-9 h-9 flex items-center justify-center text-navy hover:bg-cream transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-body text-sm text-navy">
                        {quantity}
                    </span>
                    <button
                        onClick={increase}
                        aria-label="Increase quantity"
                        className="w-9 h-9 flex items-center justify-center text-navy hover:bg-cream transition-colors"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex items-center justify-center gap-2 bg-navy text-cream font-body text-sm font-medium py-3.5 rounded-full hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <ShoppingBag size={18} />
                {added
                    ? "Added to Cart!"
                    : product.inStock
                        ? "Add to Cart"
                        : "Out of Stock"}
            </button>
        </div>
    );
}