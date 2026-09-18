"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/products";

export default function Footer() {
    const pathname = usePathname();
    const isAuthPage = 
        pathname === "/login" || 
        pathname === "/signup" || 
        pathname === "/forgot-password" || 
        pathname === "/reset-password";
    
    if (pathname?.startsWith("/admin") || isAuthPage) {
        return null;
    }

    return (
        <footer className="bg-navy text-cream">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
                {/* Brand */}
                <div className="col-span-2 sm:col-span-3 lg:col-span-2">
                    <img
                        src="/assets/logo/h-logo/H-Gradient.svg"
                        alt="Innovative Collectives"
                        className="h-14 w-auto mb-5"
                    />
                    <p className="font-body text-sm text-cream/70 leading-relaxed max-w-xs">
                        Premium brands, trusted quality, timeless style — curated
                        essentials across mobiles, bags, wallets, watches, perfumes and
                        sunglasses.
                    </p>
                    <div className="mt-5 space-y-0.5 font-body text-xs text-cream/45">
                        <p>support@innovativecollectives.com</p>
                        <p>+91 90000 00000 · Ahmedabad, Gujarat</p>
                    </div>
                </div>

                {/* Shop by category */}
                <div>
                    <h3 className="font-heading text-base text-gold mb-4">Shop</h3>
                    <ul className="flex flex-col gap-2">
                        {categories.map((cat) => (
                            <li key={cat.slug}>
                                <Link
                                    href={`/category/${cat.slug}`}
                                    className="font-body text-sm text-cream/70 hover:text-gold transition-colors"
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/products" className="font-body text-sm text-cream/70 hover:text-gold transition-colors">
                                All Products
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="font-heading text-base text-gold mb-4">Company</h3>
                    <ul className="flex flex-col gap-2">
                        {[
                            { href: "/about", label: "About Us" },
                            { href: "/contact", label: "Contact" },
                            { href: "/faq", label: "FAQ" },
                            { href: "/shipping", label: "Shipping" },
                            { href: "/returns", label: "Returns" },
                        ].map(({ href, label }) => (
                            <li key={href}>
                                <Link href={href} className="font-body text-sm text-cream/70 hover:text-gold transition-colors">
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="font-heading text-base text-gold mb-4">Legal</h3>
                    <ul className="flex flex-col gap-2">
                        {[
                            { href: "/privacy", label: "Privacy Policy" },
                            { href: "/terms", label: "Terms & Conditions" },
                        ].map(({ href, label }) => (
                            <li key={href}>
                                <Link href={href} className="font-body text-sm text-cream/70 hover:text-gold transition-colors">
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-cream/10">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="font-body text-xs text-cream/50">
                        © {new Date().getFullYear()} Innovative Collectives. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy" className="font-body text-xs text-cream/40 hover:text-cream/70 transition-colors">Privacy</Link>
                        <Link href="/terms" className="font-body text-xs text-cream/40 hover:text-cream/70 transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}