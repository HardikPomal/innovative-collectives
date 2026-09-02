"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { categories } from "@/data/products";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-ivory border-b border-gold/20">
            {/* Top bar */}
            <div className="bg-navy text-cream text-center text-xs py-2 px-4">
                Premium Brands | Trusted Quality | Timeless Style
            </div>

            {/* Main header */}
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="shrink-0 flex items-center">
                        <img 
                            src="/assets/logo/h-logo/H-Primary.svg" 
                            alt="Innovative Collectives" 
                            className="h-10 md:h-12 w-auto"
                        />
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {categories.map((cat) => (
                            <Link
                                key={cat.slug}
                                href={`/category/${cat.slug}`}
                                className="font-body text-sm text-navy hover:text-gold transition-colors"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right icons */}
                    <div className="flex items-center gap-4">
                        <button
                            aria-label="Search"
                            className="hidden sm:flex text-navy hover:text-gold transition-colors"
                        >
                            <Search size={20} />
                        </button>
                        <Link
                            href="/cart"
                            aria-label="Cart"
                            className="relative text-navy hover:text-gold transition-colors"
                        >
                            <ShoppingBag size={20} />
                            <span className="absolute -top-2 -right-2 bg-gold text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>

                        {/* Mobile menu toggle */}
                        <button
                            aria-label="Toggle menu"
                            className="lg:hidden text-navy"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile nav */}
            {isMenuOpen && (
                <nav className="lg:hidden bg-ivory border-t border-gold/20 px-4 py-4 flex flex-col gap-3">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="font-body text-sm text-navy hover:text-gold transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}