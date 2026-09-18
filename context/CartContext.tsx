// context/CartContext.tsx
"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    ReactNode,
} from "react";
import { CartItem, Product } from "@/types";

const STORAGE_KEY = "ic-cart";

interface CartContextValue {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getItemQuantity: (productId: string) => number;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

// Type guard: checks every field the UI actually depends on (price for
// totals, slug for links, images for thumbnails) before trusting a stored
// entry — a partial/legacy shape from earlier testing must NOT pass this.
function isValidCartItem(value: unknown): value is CartItem {
    if (!value || typeof value !== "object") return false;
    const candidate = value as Partial<CartItem>;
    const product = candidate.product as Partial<Product> | undefined;
    return (
        !!product &&
        typeof product === "object" &&
        typeof product.id === "string" &&
        typeof product.slug === "string" &&
        typeof product.name === "string" &&
        typeof product.price === "number" &&
        Array.isArray(product.images) &&
        typeof candidate.quantity === "number" &&
        candidate.quantity > 0
    );
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [hydrated, setHydrated] = useState(false);

    // Load from localStorage on mount (client-only)
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    const valid = parsed.filter(isValidCartItem);
                    setItems(valid);
                    // If some entries were dropped, immediately overwrite the
                    // corrupted storage so we don't keep re-reading junk.
                    if (valid.length !== parsed.length) {
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
                    }
                } else {
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        } catch {
            // Corrupt or inaccessible storage — start fresh
            localStorage.removeItem(STORAGE_KEY);
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

    const addItem = useCallback((product: Product, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { product, quantity }];
        });
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((item) => item.product.id !== productId));
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const getItemQuantity = useCallback(
        (productId: string) =>
            items.find((item) => item.product.id === productId)?.quantity ?? 0,
        [items]
    );

    const totalItems = useMemo(
        () => items.reduce((sum, item) => sum + (item?.quantity ?? 0), 0),
        [items]
    );

    const subtotal = useMemo(
        () =>
            items.reduce(
                (sum, item) =>
                    sum + (item?.product?.price ?? 0) * (item?.quantity ?? 0),
                0
            ),
        [items]
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                getItemQuantity,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}