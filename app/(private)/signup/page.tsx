// app/(private)/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import TextField from "@/components/ui/TextField";
import EditorialPanel from "@/components/auth/EditorialPanel";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const PASSWORD_RULES = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One number", test: (p: string) => /[0-9]/.test(p) },
];

export default function SignupPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const passwordStrength = PASSWORD_RULES.filter((r) => r.test(password)).length;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (passwordStrength < PASSWORD_RULES.length) {
            setError("Password does not meet all requirements.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        const success = await register(fullName, email, password);
        setIsLoading(false);
        
        if (success) {
            router.push("/");
        } else {
            setError("Email already in use or registration failed.");
        }
    }

    const strengthColor =
        passwordStrength === 0
            ? "bg-navy/10"
            : passwordStrength === 1
                ? "bg-red-400"
                : passwordStrength === 2
                    ? "bg-amber-400"
                    : "bg-emerald-500";

    return (
        <main className="h-screen overflow-hidden grid lg:grid-cols-2 bg-ivory">
            {/* Editorial panel — desktop only */}
            <EditorialPanel
                image="/assets/images/products/classic-leather-handbag/1.webp"
                quote="Where taste becomes tradition."
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
                    <div className="w-full max-w-sm">
                    <h1 className="font-heading text-3xl md:text-4xl text-navy mb-2">
                        Create an account
                    </h1>
                    <p className="font-body text-sm text-navy/55 mb-10">
                        Join Innovative Collectives for exclusive access.
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
                            id="signup-name"
                            label="Full name"
                            autoComplete="off"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Jane Doe"
                            required
                        />

                        <TextField
                            id="signup-email"
                            label="Email address"
                            type="email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />

                        <div>
                            <TextField
                                id="signup-password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />

                            {password.length > 0 && (
                                <div className="mt-2.5 space-y-2">
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < passwordStrength ? strengthColor : "bg-navy/10"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <ul className="space-y-1">
                                        {PASSWORD_RULES.map((rule) => {
                                            const met = rule.test(password);
                                            return (
                                                <li
                                                    key={rule.label}
                                                    className={`flex items-center gap-1.5 font-body text-xs transition-colors ${met ? "text-emerald-600" : "text-navy/45"
                                                        }`}
                                                >
                                                    <Check
                                                        size={11}
                                                        className={met ? "text-emerald-500" : "text-navy/20"}
                                                        strokeWidth={3}
                                                    />
                                                    {rule.label}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <TextField
                            id="signup-confirm-password"
                            label="Confirm password"
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            error={
                                confirmPassword && confirmPassword !== password
                                    ? "Passwords do not match"
                                    : undefined
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
                            Create account
                        </Button>
                    </form>

                    <p className="text-center font-body text-sm text-navy/55 mt-10">
                        Already have an account?{" "}
                        <Link href="/login" className="text-gold hover:text-navy transition-colors">
                            Sign in
                        </Link>
                    </p>

                    <p className="text-center font-body text-xs text-navy/40 mt-6">
                        By creating an account, you agree to our{" "}
                        <Link href="/terms" className="underline hover:text-navy/60 transition-colors">
                            Terms
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline hover:text-navy/60 transition-colors">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
            </div>
        </main>
    );
}