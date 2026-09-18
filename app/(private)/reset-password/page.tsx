// app/(private)/reset-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import TextField from "@/components/ui/TextField";
import EditorialPanel from "@/components/auth/EditorialPanel";
import Button from "@/components/ui/Button";

const PASSWORD_RULES = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One number", test: (p: string) => /[0-9]/.test(p) },
];

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [error, setError] = useState("");

    const passwordStrength = PASSWORD_RULES.filter((r) => r.test(password)).length;

    const strengthColor =
        passwordStrength === 0
            ? "bg-navy/10"
            : passwordStrength === 1
                ? "bg-red-400"
                : passwordStrength === 2
                    ? "bg-amber-400"
                    : "bg-emerald-500";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!password || !confirmPassword) {
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
        await new Promise((res) => setTimeout(res, 1200));
        setIsLoading(false);
        setIsDone(true);
    }

    return (
        <main className="min-h-screen grid lg:grid-cols-2 bg-ivory">
            <EditorialPanel
                image="/assets/images/products/minimalist-gold-dial-watch/1.webp"
                quote="A fresh start, precisely kept."
            />

            <div className="flex items-center justify-center px-6 py-16 md:py-24">
                <div className="w-full max-w-sm">
                    {isDone ? (
                        <div>
                            <div className="w-10 h-px bg-gold mb-6" />
                            <h1 className="font-heading text-3xl md:text-4xl text-navy mb-3">
                                Password reset
                            </h1>
                            <p className="font-body text-sm text-navy/60 mb-8">
                                Your password has been successfully updated. You can now
                                sign in with your new password.
                            </p>
                            <Button
                                onClick={() => router.push("/login")}
                                variant="primary"
                                fullWidth
                                icon={<ArrowRight size={16} />}
                            >
                                Go to sign in
                            </Button>
                        </div>
                    ) : (
                        <>
                            <h1 className="font-heading text-3xl md:text-4xl text-navy mb-2">
                                Reset your password
                            </h1>
                            <p className="font-body text-sm text-navy/55 mb-10">
                                Choose a strong new password for your account.
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
                                <div>
                                    <TextField
                                        id="reset-password"
                                        label="New password"
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
                                                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < passwordStrength
                                                                ? strengthColor
                                                                : "bg-navy/10"
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
                                                            className={`flex items-center gap-1.5 font-body text-xs transition-colors ${met
                                                                    ? "text-emerald-600"
                                                                    : "text-navy/45"
                                                                }`}
                                                        >
                                                            <Check
                                                                size={11}
                                                                className={
                                                                    met
                                                                        ? "text-emerald-500"
                                                                        : "text-navy/20"
                                                                }
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
                                    id="reset-confirm-password"
                                    label="Confirm new password"
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
                                    Reset password
                                </Button>
                            </form>

                            <div className="mt-10 pt-6 border-t border-navy/10">
                                <Link
                                    href="/login"
                                    className="font-body text-sm text-navy/55 hover:text-navy transition-colors"
                                >
                                    Back to sign in
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}