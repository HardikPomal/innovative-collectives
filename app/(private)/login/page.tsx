// app/(private)/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import TextField from "@/components/ui/TextField";
import EditorialPanel from "@/components/auth/EditorialPanel";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (user) {
            if (user.isAdmin) {
                router.push("/admin");
            } else {
                router.push("/");
            }
        }
    }, [user, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        const success = await login(email, password);
        setIsLoading(false);
        
        if (success) {
            // Re-check user context after redirect, but usually router.push triggers re-render 
            if (email === "admin@ic.com") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } else {
            setError("Invalid credentials or account not found.");
        }
    }

    return (
        <main className="h-screen overflow-hidden grid lg:grid-cols-2 bg-ivory">
            {/* Editorial panel — desktop only */}
            <EditorialPanel
                image="/assets/images/products/classic-chronograph-watch/1.webp"
                quote="Crafted for those who notice the difference."
            />

            {/* Scrollable Form Column */}
            <div className="flex flex-col h-full overflow-y-auto min-h-0">
                {/* Mobile top strip */}
                <div className="lg:hidden bg-navy px-6 py-6 flex justify-center shrink-0">
                    <Link href="/">
                        <img
                            src="/assets/logo/h-logo/H-Primary.svg"
                            alt="Innovative Collectives"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                {/* Form panel */}
                <div className="flex-1 flex items-center justify-center px-6 py-10 md:py-16">
                <div
                    className={`w-full max-w-sm transition-all duration-700 ease-out motion-reduce:transition-none ${mounted
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                        }`}
                >
                    <h1 className="font-heading text-3xl md:text-4xl text-navy mb-2">
                        Sign in
                    </h1>
                    <p className="font-body text-sm text-navy/55 mb-10">
                        Welcome back to Innovative Collectives.
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
                            id="login-email"
                            label="Email address"
                            type="email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />

                        <TextField
                            id="login-password"
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            labelAction={
                                <Link
                                    href="/forgot-password"
                                    className="font-body text-xs text-gold hover:text-navy transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            }
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            isLoading={isLoading}
                            icon={<ArrowRight size={16} />}
                            className="mt-4"
                        >
                            Sign in
                        </Button>
                    </form>

                    <p className="text-center font-body text-sm text-navy/55 mt-10">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-gold hover:text-navy transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
            </div>
        </main>
    );
}