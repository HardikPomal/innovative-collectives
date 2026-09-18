// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, ShoppingBag, User, Menu, X, ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { categories } from "@/data/products";
import { getProducts } from "@/lib/db/api";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import type { Product } from "@/types";
import ProductImage from "@/components/product/ProductImage";
import TextField from "@/components/ui/TextField";

const MAX_SUGGESTIONS = 8;

export default function Header() {
    const pathname = usePathname();
    const isAuthPage = 
        pathname === "/login" || 
        pathname === "/signup" || 
        pathname === "/forgot-password" || 
        pathname === "/reset-password";
    const isAdminPage = pathname?.startsWith("/admin") ?? false;

    // ── All hooks must be declared before any early return ──
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const { totalItems } = useCart();
    const { user, logout } = useAuth();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    // Fetch all products when search opens, so we can filter locally
    useEffect(() => {
        if (isSearchOpen && allProducts.length === 0) {
            getProducts().then(setAllProducts);
        }
    }, [isSearchOpen, allProducts.length]);

    // Live suggestions derived from query
    useEffect(() => {
        if (searchQuery.trim().length >= 1) {
            const q = searchQuery.toLowerCase();
            const filtered = allProducts.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    (p.brand && p.brand.toLowerCase().includes(q)) ||
                    (p.description && p.description.toLowerCase().includes(q))
            );
            setSuggestions(filtered.slice(0, MAX_SUGGESTIONS));
        } else {
            setSuggestions([]);
        }
    }, [searchQuery, allProducts]);

    const showDropdown = isSearchOpen && searchQuery.trim().length > 0;

    function getCategoryName(slug: string): string {
        return categories.find((c) => c.slug === slug)?.name ?? slug;
    }

    // Auto-focus input when search bar opens
    useEffect(() => {
        if (isSearchOpen) {
            setSelectedIndex(-1);
            const focusInput = () => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            };
            focusInput();
            const raf = requestAnimationFrame(focusInput);
            const t1 = setTimeout(focusInput, 30);
            const t2 = setTimeout(focusInput, 100);
            return () => {
                cancelAnimationFrame(raf);
                clearTimeout(t1);
                clearTimeout(t2);
            };
        }
    }, [isSearchOpen]);

    // Reset selectedIndex whenever query changes
    useEffect(() => {
        setSelectedIndex(-1);
    }, [searchQuery]);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsSearchOpen(false);
                setSearchQuery("");
                setSelectedIndex(-1);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(e.target as Node)
            ) {
                setIsSearchOpen(false);
                setSearchQuery("");
                setSelectedIndex(-1);
            }
        };
        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSearchOpen]);

    // ── Early exit after all hooks ──
    if (isAdminPage || isAuthPage) {
        return null;
    }

    function handleSearch() {
        const q = searchQuery.trim();
        if (!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
        setIsSearchOpen(false);
        setSearchQuery("");
        setSelectedIndex(-1);
    }

    function handleSuggestionClick(product: Product) {
        router.push(`/products/${product.slug}`);
        setIsSearchOpen(false);
        setSearchQuery("");
        setSelectedIndex(-1);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (suggestions.length > 0) {
                setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (suggestions.length > 0) {
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSuggestionClick(suggestions[selectedIndex]);
            } else {
                handleSearch();
            }
        }
    }

    function toggleSearch() {
        setIsSearchOpen((prev) => {
            const next = !prev;
            if (next) {
                requestAnimationFrame(() => {
                    inputRef.current?.focus();
                });
                setTimeout(() => {
                    inputRef.current?.focus();
                }, 30);
                setTimeout(() => {
                    inputRef.current?.focus();
                }, 100);
            } else {
                setSearchQuery("");
                setSelectedIndex(-1);
            }
            return next;
        });
        setIsMenuOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 bg-ivory border-b border-gold/20">
            {/* Top announcement bar */}
            <div className="bg-navy text-cream text-center text-xs py-2 px-4">
                Premium Brands | Trusted Quality | Timeless Style
            </div>

            {/* Main header row */}
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

                    {/* Desktop nav links */}
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

                    {/* Right side icon actions */}
                    <div className="flex items-center gap-4">
                        <button
                            aria-label={isSearchOpen ? "Close search" : "Open search"}
                            aria-expanded={isSearchOpen}
                            onClick={toggleSearch}
                            onMouseDown={(e) => e.preventDefault()}
                            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gold/10 text-navy hover:text-gold transition-colors"
                        >
                            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        {user ? (
                            user.isAdmin ? (
                                <Link
                                    href="/admin"
                                    title="Admin Panel"
                                    className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gold/10 text-navy hover:text-gold transition-colors"
                                >
                                    <User size={20} className="text-gold" />
                                </Link>
                            ) : (
                                <button
                                    onClick={logout}
                                    title="Sign out"
                                    className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gold/10 text-navy hover:text-gold transition-colors"
                                >
                                    <User size={20} className="text-gold" />
                                </button>
                            )
                        ) : (
                            <Link
                                href="/login"
                                aria-label="Account"
                                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gold/10 text-navy hover:text-gold transition-colors"
                            >
                                <User size={20} />
                            </Link>
                        )}

                        <Link
                            href="/cart"
                            aria-label="Cart"
                            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gold/10 text-navy hover:text-gold transition-colors"
                        >
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <span className="absolute top-1.5 right-1.5 bg-gold text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems > 9 ? "9+" : totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Mobile menu hamburger toggle */}
                        <button
                            aria-label="Toggle menu"
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gold/10 text-navy"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide-down search bar + autocomplete dropdown */}
            <div
                className={`transition-all duration-300 ease-in-out border-t border-gold/10 bg-ivory/95 backdrop-blur-md ${isSearchOpen
                        ? "opacity-100 max-h-[700px] overflow-visible pb-4"
                        : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
                    }`}
            >
                <div
                    ref={searchContainerRef}
                    className="max-w-3xl mx-auto px-4 md:px-6 pt-4 relative"
                >
                    {/* Search Input Bar */}
                    <TextField
                        ref={inputRef}
                        id="header-search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for products, brands, categories..."
                        autoComplete="off"
                        icon={<Search size={18} />}
                        endAction={
                            <>
                                {searchQuery && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            inputRef.current?.focus();
                                        }}
                                        aria-label="Clear search input"
                                        className="text-navy/40 hover:text-navy mr-2 p-1 transition-colors"
                                    >
                                        <X size={15} />
                                    </button>
                                )}
                                <button
                                    onClick={handleSearch}
                                    aria-label="Submit search"
                                    disabled={!searchQuery.trim()}
                                    className="text-navy/40 hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0 p-1"
                                >
                                    <ArrowRight size={18} />
                                </button>
                            </>
                        }
                    />

                    {/* Autocomplete Dropdown */}
                    {showDropdown && (
                        <div className="absolute left-4 right-4 md:left-6 md:right-6 top-full mt-1.5 bg-white rounded-2xl shadow-2xl shadow-navy/15 border border-navy/10 overflow-hidden z-50">
                            {suggestions.length > 0 ? (
                                <>
                                    <div className="py-1">
                                        {suggestions.map((product, idx) => (
                                            <button
                                                key={product.id}
                                                onClick={() => handleSuggestionClick(product)}
                                                onMouseEnter={() => setSelectedIndex(idx)}
                                                className={`w-full flex items-center gap-3.5 px-4 py-2.5 transition-colors text-left group ${selectedIndex === idx
                                                        ? "bg-cream"
                                                        : "hover:bg-cream"
                                                    } ${idx !== suggestions.length - 1
                                                        ? "border-b border-navy/5"
                                                        : ""
                                                    }`}
                                            >
                                                <div className="relative w-9 h-11 shrink-0 rounded bg-cream border border-navy/5 overflow-hidden flex items-center justify-center p-0.5">
                                                    <ProductImage
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="object-contain"
                                                    />
                                                </div>

                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-body text-sm text-navy/90 font-medium leading-snug truncate group-hover:text-gold transition-colors">
                                                        {product.name}
                                                    </span>
                                                    <span className="font-body text-xs text-gold font-medium mt-0.5">
                                                        in {getCategoryName(product.category)}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleSearch}
                                        className="w-full flex items-center justify-between px-5 py-3 bg-cream/60 hover:bg-cream transition-colors border-t border-navy/5 font-body text-xs text-navy/70 hover:text-gold font-medium"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Search size={13} className="text-navy/40" />
                                            See all results for &ldquo;{searchQuery}&rdquo;
                                        </span>
                                        <ArrowRight size={14} className="text-navy/40" />
                                    </button>
                                </>
                            ) : (
                                <div className="px-5 py-6 text-center">
                                    <p className="font-body text-sm text-navy/60">
                                        No direct matches for &ldquo;{searchQuery}&rdquo;
                                    </p>
                                    <button
                                        onClick={handleSearch}
                                        className="mt-2 font-body text-xs text-gold hover:underline font-medium inline-flex items-center gap-1"
                                    >
                                        Search all products for &ldquo;{searchQuery}&rdquo;
                                        <ArrowRight size={12} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile nav drawer */}
            {isMenuOpen && (
                <nav className="lg:hidden bg-ivory border-t border-gold/20 px-4 py-4 flex flex-col gap-3">
                    {/* Mobile search input */}
                    <div className="mb-1">
                        <TextField
                            id="mobile-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                    setIsMenuOpen(false);
                                }
                            }}
                            placeholder="Search products..."
                            autoComplete="off"
                            icon={<Search size={16} />}
                            endAction={
                                <>
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="text-navy/40 hover:text-navy p-0.5"
                                            aria-label="Clear mobile search"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleSearch();
                                            setIsMenuOpen(false);
                                        }}
                                        aria-label="Submit search"
                                        disabled={!searchQuery.trim()}
                                        className="text-navy/40 hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <ArrowRight size={16} />
                                    </button>
                                </>
                            }
                        />
                    </div>

                    {/* Mobile search suggestions dropdown */}
                    {searchQuery.trim().length > 0 && (
                        <div className="bg-white rounded-2xl border border-navy/10 overflow-hidden mb-2 shadow-lg">
                            {suggestions.length > 0 ? (
                                suggestions.map((product, idx) => (
                                    <button
                                        key={product.id}
                                        onClick={() => {
                                            handleSuggestionClick(product);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cream transition-colors text-left ${idx !== suggestions.length - 1
                                                ? "border-b border-navy/5"
                                                : ""
                                            }`}
                                    >
                                        <div className="relative w-9 h-11 shrink-0 rounded bg-cream border border-navy/5 overflow-hidden flex items-center justify-center p-0.5">
                                            <ProductImage
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-body text-sm text-navy font-medium leading-snug truncate">
                                                {product.name}
                                            </span>
                                            <span className="font-body text-xs text-gold font-medium mt-0.5">
                                                in {getCategoryName(product.category)}
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <button
                                    onClick={() => {
                                        handleSearch();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-3 text-left font-body text-xs text-gold hover:bg-cream"
                                >
                                    Search for &ldquo;{searchQuery}&rdquo; →
                                </button>
                            )}
                        </div>
                    )}

                    {/* Category links */}
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="font-body text-sm text-navy hover:text-gold transition-colors py-1"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {cat.name}
                        </Link>
                    ))}

                    {/* Account links */}
                    <div className="pt-3 mt-1 border-t border-navy/10 flex items-center gap-4">
                        {user ? (
                            <div className="flex flex-col gap-2">
                                {user.isAdmin && (
                                    <Link
                                        href="/admin"
                                        className="font-body text-sm text-gold hover:text-navy transition-colors py-1"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="font-body text-sm text-navy hover:text-gold transition-colors py-1 text-left"
                                >
                                    Sign out ({user.name})
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="font-body text-sm text-navy hover:text-gold transition-colors py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign in
                                </Link>
                                <span className="text-navy/20">|</span>
                                <Link
                                    href="/signup"
                                    className="font-body text-sm text-gold hover:text-navy transition-colors py-1"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Create account
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}