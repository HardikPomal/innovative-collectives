// context/WishlistContext.tsx
"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import { Product } from "@/types";

const STORAGE_KEY = "ic-wishlist";

interface WishlistContextValue {
    items: Product[];
    isInWishlist: (productId: string) => boolean;
    toggleItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
    undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Product[]>([]);
    const [hydrated, setHydrated] = useState(false);

    // Load from localStorage on mount (client-only)
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch {
            // Corrupt or inaccessible storage — start fresh
        } finally {
            setHydrated(true);
        }
    }, []);

    // Persist whenever items change (skip the initial pre-hydration write)
    useEffect(() => {
        if (!hydrated) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // Storage unavailable (e.g. private browsing quota) — fail silently
        }
    }, [items, hydrated]);

    const isInWishlist = useCallback(
        (productId: string) => items.some((item) => item.id === productId),
        [items]
    );

    const toggleItem = useCallback((product: Product) => {
        setItems((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    }, []);

    const clearWishlist = useCallback(() => {
        setItems([]);
    }, []);

    return (
        <WishlistContext.Provider
            value={{ items, isInWishlist, toggleItem, removeItem, clearWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}