// components/product/AddToCart.tsx
"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

export default function AddToCart({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const decrease = () => setQuantity((q) => Math.max(1, q - 1));
    const increase = () => setQuantity((q) => q + 1);

    const handleAddToCart = () => {
        if (!product.inStock) return;
        addItem(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Quantity selector */}
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

            {/* Add to cart button */}
            <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                variant={added ? "secondary" : "primary"}
                className={`w-full ${added ? "bg-gold text-white border-gold hover:bg-gold/90 hover:text-white" : ""}`}
                icon={added ? <Check size={18} /> : <ShoppingBag size={18} />}
                iconPosition="left"
            >
                {added ? "Added to Cart!" : (product.inStock ? "Add to Cart" : "Out of Stock")}
            </Button>
        </div>
    );
}