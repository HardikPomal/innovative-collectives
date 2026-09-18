// app/(private)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import TextField from "@/components/ui/TextField";
import EditorialPanel from "@/components/auth/EditorialPanel";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);
        await new Promise((res) => setTimeout(res, 1200));
        setIsLoading(false);
        setIsSubmitted(true);
    }

    return (
        <main className="min-h-screen grid lg:grid-cols-2 bg-ivory">
            {/* Editorial panel — desktop only */}
            <EditorialPanel
                image="/assets/images/products/signature-eau-de-parfum/1.webp"
                quote="Every detail, remembered."
            />

            {/* Mobile top strip */}
            <div className="lg:hidden bg-navy px-6 py-6 flex justify-center">
                <Link href="/">
                    <img
                        src="/assets/logo/h-logo/H-Primary.svg"
                        alt="Innovative Collectives"
                        className="h-8 w-auto"
                    />
                </Link>
            </div>

            {/* Form panel */}
            <div className="flex items-center justify-center px-6 py-16 md:py-24">
                <div className="w-full max-w-sm">
                    {!isSubmitted ? (
                        <>
                            <h1 className="font-heading text-3xl md:text-4xl text-navy mb-2">
                                Forgot password?
                            </h1>
                            <p className="font-body text-sm text-navy/55 mb-10">
                                No worries. Enter your email and we&apos;ll send you a reset link.
                            </p>

                            {error && (
                                <div className="mb-6 pl-4 border-l-2 border-red-400 font-body text-sm text-red-700">
                                    {error}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                autoComplete="off"
                                className="space-y-5"
                            >
                                <TextField
                                    id="forgot-email"
                                    label="Email address"
                                    type="email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="primary"
                                    fullWidth
                                    isLoading={isLoading}
                                    icon={<ArrowRight size={16} />}
                                    className="mt-4"
                                >
                                    Send reset link
                                </Button>
                            </form>
                        </>
                    ) : (
                        /* Success state */
                        <div>
                            <div className="w-10 h-px bg-gold mb-6" />
                            <h1 className="font-heading text-3xl md:text-4xl text-navy mb-3">
                                Check your inbox
                            </h1>
                            <p className="font-body text-sm text-navy/60 mb-1">
                                We&apos;ve sent a password reset link to
                            </p>
                            <p className="font-body text-sm text-navy font-medium mb-8 break-all">
                                {email}
                            </p>
                            <p className="font-body text-xs text-navy/45">
                                Didn&apos;t receive it? Check your spam folder, or{" "}
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-gold hover:text-navy font-medium transition-colors"
                                >
                                    try again
                                </button>
                                .
                            </p>
                        </div>
                    )}

                    {/* Back to login */}
                    <div className="mt-10 pt-6 border-t border-navy/10">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-1.5 font-body text-sm text-navy/55 hover:text-navy transition-colors"
                        >
                            <ArrowLeft size={14} />
                            Back to sign in
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}