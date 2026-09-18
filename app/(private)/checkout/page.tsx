// app/(private)/checkout/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/product/ProductImage";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

interface ShippingForm {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

const EMPTY_FORM: ShippingForm = {
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
};

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, totalItems } = useCart();
    const { user, isLoading } = useAuth();
    const [form, setForm] = useState<ShippingForm>(EMPTY_FORM);
    const [errors, setErrors] = useState<Partial<Record<keyof ShippingForm, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    function updateField(field: keyof ShippingForm) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
            if (errors[field]) {
                setErrors((prev) => ({ ...prev, [field]: undefined }));
            }
        };
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const required: (keyof ShippingForm)[] = [
            "fullName",
            "phone",
            "street",
            "city",
            "state",
            "postalCode",
            "country",
        ];
        
        const newErrors: Partial<Record<keyof ShippingForm, string>> = {};
        let firstErrorField: keyof ShippingForm | null = null;
        
        for (const field of required) {
            if (!form[field].trim()) {
                newErrors[field] = "This field is required";
                if (!firstErrorField) firstErrorField = field;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setError("Please fill in all required fields to continue.");
            
            if (firstErrorField) {
                const idMap: Record<keyof ShippingForm, string> = {
                    fullName: "checkout-fullname",
                    phone: "checkout-phone",
                    street: "checkout-street",
                    city: "checkout-city",
                    state: "checkout-state",
                    postalCode: "checkout-postal",
                    country: "checkout-country"
                };
                
                setTimeout(() => {
                    document.getElementById(idMap[firstErrorField!])?.focus();
                }, 50);
            }
            return;
        }

        setIsSubmitting(true);
        sessionStorage.setItem("ic-shipping-address", JSON.stringify(form));
        setIsSubmitting(false);
        router.push("/payment");
    }

    if (isLoading) return null;

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 flex flex-col items-center text-center">
                <ShoppingBag size={40} className="text-navy/50 mb-4" strokeWidth={1.5} />
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
                    Add something to your cart before checking out.
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
            <Link 
                href="/cart" 
                className="inline-flex items-center gap-2 text-sm font-medium text-navy/60 hover:text-gold transition-colors mb-6"
            >
                <ArrowLeft size={16} />
                Back to Cart
            </Link>
            <h1 className="font-heading text-3xl text-navy mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Shipping form */}
                <div className="lg:col-span-2">
                    <h2 className="font-heading text-lg text-navy mb-5">
                        Shipping address
                    </h2>

                    {error && (
                        <div className="mb-5 pl-4 border-l-2 border-red-400 font-body text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form
                        id="checkout-form"
                        onSubmit={handleSubmit}
                        noValidate
                        autoComplete="off"
                        className="space-y-5"
                    >
                        <TextField
                            id="checkout-fullname"
                            label="Full name"
                            autoComplete="off"
                            value={form.fullName}
                            onChange={updateField("fullName")}
                            placeholder="Jane Doe"
                            error={errors.fullName}
                            required
                        />

                        <TextField
                            id="checkout-phone"
                            label="Phone number"
                            type="tel"
                            autoComplete="off"
                            value={form.phone}
                            onChange={updateField("phone")}
                            placeholder="+91 98765 43210"
                            error={errors.phone}
                            required
                        />

                        <TextField
                            id="checkout-street"
                            label="Street address"
                            autoComplete="off"
                            value={form.street}
                            onChange={updateField("street")}
                            placeholder="Flat, house no., street"
                            error={errors.street}
                            required
                        />

                        <div className="grid sm:grid-cols-2 gap-5">
                            <TextField
                                id="checkout-city"
                                label="City"
                                autoComplete="off"
                                value={form.city}
                                onChange={updateField("city")}
                                placeholder="Ahmedabad"
                                error={errors.city}
                                required
                            />
                            <TextField
                                id="checkout-state"
                                label="State"
                                autoComplete="off"
                                value={form.state}
                                onChange={updateField("state")}
                                placeholder="Gujarat"
                                error={errors.state}
                                required
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <TextField
                                id="checkout-postal"
                                label="Postal code"
                                autoComplete="off"
                                value={form.postalCode}
                                onChange={updateField("postalCode")}
                                placeholder="380001"
                                error={errors.postalCode}
                                required
                            />
                            <TextField
                                id="checkout-country"
                                label="Country"
                                autoComplete="off"
                                value={form.country}
                                onChange={updateField("country")}
                                placeholder="India"
                                error={errors.country}
                                required
                            />
                        </div>
                    </form>
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
                            <span>Calculated at payment</span>
                        </div>
                        <div className="h-px bg-navy/10 mb-4" />
                        <div className="flex justify-between font-heading text-base text-navy mb-6">
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        <Button
                            type="submit"
                            form="checkout-form"
                            variant="primary"
                            fullWidth
                            isLoading={isSubmitting}
                            icon={<ArrowRight size={16} />}
                        >
                            Continue to Payment
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}