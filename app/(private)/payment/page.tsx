// app/(private)/payment/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingBag, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/product/ProductImage";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import { createOrder } from "@/lib/db/api";
import type { Order } from "@/types";

type Method = "card" | "cod";

function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function PaymentPage() {
    const router = useRouter();
    const { items, subtotal, totalItems } = useCart();
    const { user, isLoading } = useAuth();

    const [method, setMethod] = useState<Method>("card");
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardFocused, setCardFocused] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (method === "card") {
            if (
                !cardName.trim() ||
                cardNumber.replace(/\s/g, "").length < 16 ||
                expiry.length < 5 ||
                cvv.length < 3
            ) {
                setError("Please complete all card details.");
                return;
            }
        }

        setIsProcessing(true);
        // Simulate payment processing
        await new Promise((res) => setTimeout(res, 1600));
        
        const shippingStr = sessionStorage.getItem("ic-shipping-address");
        if (!shippingStr) {
            setError("Shipping details not found. Please go back and fill out the address.");
            setIsProcessing(false);
            return;
        }
        
        const shippingAddress = JSON.parse(shippingStr);
        const orderNumber = `IC-${Date.now().toString(36).toUpperCase()}`;

        const newOrder: Order = {
            id: crypto.randomUUID(),
            orderNumber,
            date: new Date().toISOString(),
            status: "Processing",
            items: items.map(item => ({
                product: item.product,
                quantity: item.quantity,
                price: item.product.price
            })),
            subtotal,
            shipping: 0,
            total: subtotal,
            shippingAddress: {
                id: crypto.randomUUID(),
                ...shippingAddress,
            },
        };

        try {
            await createOrder(newOrder);
        } catch (err) {
            console.error("Failed to create order in DB", err);
        }

        setIsProcessing(false);

        // Save order snapshot for the confirmation page before clearing cart
        sessionStorage.setItem(
            "ic-last-order",
            JSON.stringify({
                orderNumber,
                items,
                subtotal,
                paymentMethod: method === "card" ? "Card" : "Cash on Delivery",
                date: new Date().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }),
            })
        );

        router.push("/checkout/success");
    }

    if (isLoading) return null;

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 flex flex-col items-center text-center">
                <Lock size={40} className="text-navy/50 mb-4" strokeWidth={1.5} />
                <h1 className="font-heading text-2xl text-navy mb-2">
                    Sign in required
                </h1>
                <p className="font-body text-sm text-navy/60 mb-8 max-w-md mx-auto">
                    Please log in or create an account to securely complete your order.
                </p>
                <Button href="/login" variant="primary">
                    Log In
                </Button>
            </div>
        );
    }

    if (user.isAdmin) {
        return (
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 flex flex-col items-center text-center">
                <ShoppingBag size={40} className="text-red-600/50 mb-4" strokeWidth={1.5} />
                <h1 className="font-heading text-2xl text-navy mb-2">
                    Action Not Allowed
                </h1>
                <p className="font-body text-sm text-navy/60 mb-8 max-w-md mx-auto">
                    Administrator accounts cannot place orders on the storefront. Please log out and use a customer account to continue.
                </p>
                <Button href="/admin" variant="primary">
                    Return to Dashboard
                </Button>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 flex flex-col items-center text-center">
                <ShoppingBag size={40} className="text-gold/50 mb-4" strokeWidth={1.5} />
                <h1 className="font-heading text-2xl text-navy mb-2">
                    Your cart is empty
                </h1>
                <p className="font-body text-sm text-navy/60 mb-8">
                    Add something to your cart before proceeding to payment.
                </p>
                <Button
                    href="/products"
                    variant="primary"
                >
                    Continue Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            <h1 className="font-heading text-3xl text-navy mb-8">Payment</h1>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Payment form */}
                <div className="lg:col-span-2">
                    {/* Method toggle */}
                    <div className="flex gap-3 mb-8">
                        <button
                            type="button"
                            onClick={() => setMethod("card")}
                            className={`flex-1 py-3 rounded-full font-body text-sm font-medium border transition-colors ${method === "card"
                                    ? "bg-navy text-cream border-navy"
                                    : "bg-white text-navy/60 border-navy/15 hover:border-navy/30"
                                }`}
                        >
                            Credit / Debit Card
                        </button>
                        <button
                            type="button"
                            onClick={() => setMethod("cod")}
                            className={`flex-1 py-3 rounded-full font-body text-sm font-medium border transition-colors ${method === "cod"
                                    ? "bg-navy text-cream border-navy"
                                    : "bg-white text-navy/60 border-navy/15 hover:border-navy/30"
                                }`}
                        >
                            Cash on Delivery
                        </button>
                    </div>

                    {error && (
                        <div className="mb-5 pl-4 border-l-2 border-red-400 font-body text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {method === "card" ? (
                        <>
                            {/* Flip card preview */}
                            <div className="mb-8" style={{ perspective: "1000px" }}>
                                <div
                                    className="relative w-full max-w-sm mx-auto lg:mx-0 aspect-[16/10] transition-transform duration-500"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transform: cvv.length > 0 ? "rotateY(180deg)" : "rotateY(0deg)",
                                    }}
                                >
                                    {/* Front */}
                                    <div
                                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy to-navy-light p-6 flex flex-col justify-between text-cream shadow-xl shadow-navy/20"
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-7 rounded bg-gold/80" />
                                            <span className="font-heading text-sm tracking-wide">
                                                Innovative Collectives
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-body text-lg tracking-[0.2em] mb-3">
                                                {cardNumber || "•••• •••• •••• ••••"}
                                            </p>
                                            <div className="flex justify-between font-body text-xs text-cream/70">
                                                <span>{cardName || "CARDHOLDER NAME"}</span>
                                                <span>{expiry || "MM/YY"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back */}
                                    <div
                                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy-light to-navy shadow-xl shadow-navy/20"
                                        style={{
                                            backfaceVisibility: "hidden",
                                            transform: "rotateY(180deg)",
                                        }}
                                    >
                                        <div className="h-10 bg-black/60 mt-6" />
                                        <div className="px-6 mt-5">
                                            <div className="bg-cream/90 h-8 rounded flex items-center justify-end px-3">
                                                <span className="font-body text-xs text-navy tracking-widest">
                                                    {cvv || "•••"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form
                                id="payment-form"
                                onSubmit={handleSubmit}
                                noValidate
                                autoComplete="off"
                                className="space-y-5"
                            >
                                <TextField
                                    id="payment-card-name"
                                    label="Name on card"
                                    autoComplete="off"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    placeholder="Jane Doe"
                                    required
                                />

                                <TextField
                                    id="payment-card-number"
                                    label="Card number"
                                    autoComplete="off"
                                    value={cardNumber}
                                    onChange={(e) =>
                                        setCardNumber(formatCardNumber(e.target.value))
                                    }
                                    placeholder="1234 5678 9012 3456"
                                    required
                                />

                                <div className="grid grid-cols-2 gap-5">
                                    <TextField
                                        id="payment-expiry"
                                        label="Expiry date"
                                        autoComplete="off"
                                        value={expiry}
                                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                        placeholder="MM/YY"
                                        required
                                    />
                                    <TextField
                                        id="payment-cvv"
                                        label="CVV"
                                        autoComplete="off"
                                        value={cvv}
                                        onChange={(e) =>
                                            setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                                        }
                                        placeholder="123"
                                        required
                                    />
                                </div>
                            </form>
                        </>
                    ) : (
                        <form id="payment-form" onSubmit={handleSubmit}>
                            <div className="bg-cream rounded-2xl p-6">
                                <p className="font-body text-sm text-navy/70">
                                    Pay in cash when your order arrives. Please keep the
                                    exact amount ready for a smoother delivery.
                                </p>
                            </div>
                        </form>
                    )}
                </div>

                {/* Order summary */}
                <div className="lg:col-span-1">
                    <div className="bg-cream rounded-2xl p-6 sticky top-28">
                        <h2 className="font-heading text-lg text-navy mb-5">
                            Order Summary
                        </h2>

                        <div className="flex flex-col gap-4 mb-5 max-h-72 overflow-y-auto pr-1">
                            {items.map(({ product, quantity }) => (
                                <div key={product.id} className="flex gap-3">
                                    <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-ivory">
                                        <ProductImage
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="object-cover"
                                        />
                                        <span className="absolute -top-1.5 -right-1.5 bg-navy text-cream text-[10px] font-medium w-5 h-5 rounded-full flex items-center justify-center">
                                            {quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-body text-sm text-navy truncate">
                                            {product.name}
                                        </p>
                                        <p className="font-body text-xs text-navy/50 mt-0.5">
                                            {formatPrice(product.price * quantity)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-navy/10 mb-4" />

                        <div className="flex justify-between font-body text-sm text-navy/70 mb-2">
                            <span>Subtotal ({totalItems} items)</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between font-body text-sm text-navy/70 mb-4">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="h-px bg-navy/10 mb-4" />
                        <div className="flex justify-between font-heading text-base text-navy mb-6">
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        <Button
                            type="submit"
                            form="payment-form"
                            variant="primary"
                            fullWidth
                            isLoading={isProcessing}
                            icon={<ArrowRight size={16} />}
                        >
                            {method === "card" ? "Pay Now" : "Place Order"}
                        </Button>

                        <p className="flex items-center justify-center gap-1.5 font-body text-xs text-navy/40 mt-4">
                            <Lock size={11} />
                            Secure checkout
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}