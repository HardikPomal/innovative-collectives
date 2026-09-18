"use client";

import { Heart } from "lucide-react";
import { Product } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { useState, useEffect } from "react";

export default function WishlistButton({ product }: { product: Product }) {
    const { isInWishlist, toggleItem } = useWishlist();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                aria-label="Add to wishlist"
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy/50 opacity-50"
                disabled
            >
                <Heart size={16} />
            </button>
        );
    }

    const inWishlist = isInWishlist(product.id);

    return (
        <button
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleItem(product);
            }}
            className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors ${
                inWishlist
                    ? "bg-gold text-white hover:bg-gold-light"
                    : "bg-white text-navy hover:text-gold"
            }`}
        >
            <Heart size={16} className={inWishlist ? "fill-white" : ""} />
        </button>
    );
}
