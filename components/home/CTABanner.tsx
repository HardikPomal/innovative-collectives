"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

export default function CTABanner() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        // TODO: wire up to real newsletter service later
        setSubmitted(true);
    };

    return (
        <section className="bg-gold py-16 relative overflow-hidden">
            {/* Decorative circles for visual interest */}
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-navy/5" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-navy/5" />

            <div className="relative max-w-3xl mx-auto px-4 md:px-6 text-center">
                <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-navy/70">
                    Stay Updated
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-3">
                    Get 10% Off Your First Order
                </h2>
                <p className="font-body text-navy/70 text-sm md:text-base mt-3 max-w-lg mx-auto">
                    Subscribe to our newsletter for early access to new arrivals,
                    exclusive deals, and style updates.
                </p>

                {submitted ? (
                    <p className="font-body text-navy font-medium mt-8 bg-white/40 rounded-full px-6 py-3 inline-block">
                        🎉 Thank you for subscribing! Check your inbox soon.
                    </p>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8"
                    >
                        <div className="flex-1">
                            <TextField
                                id="newsletter-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                icon={<Mail size={16} />}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            icon={<ArrowRight size={16} />}
                        >
                            Subscribe
                        </Button>
                    </form>
                )}
            </div>
        </section>
    );
}