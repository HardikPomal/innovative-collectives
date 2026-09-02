import Link from "next/link";
import { categories } from "@/data/products";

export default function Footer() {
    return (
        <footer className="bg-navy text-cream">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <img 
                        src="/assets/logo/h-logo/H-Gradient.svg" 
                        alt="Innovative Collectives" 
                        className="h-14 w-auto mb-5"
                    />
                    <p className="font-body text-sm text-cream/70 leading-relaxed">
                        Premium brands, trusted quality, timeless style — curated
                        essentials across mobiles, bags, wallets, watches, perfumes and
                        sunglasses.
                    </p>
                </div>

                {/* Shop by category */}
                <div>
                    <h3 className="font-heading text-lg text-gold mb-4">Shop</h3>
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
                    </ul>
                </div>

                {/* Quick links */}
                <div>
                    <h3 className="font-heading text-lg text-gold mb-4">Quick Links</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link
                                href="/products"
                                className="font-body text-sm text-cream/70 hover:text-gold transition-colors"
                            >
                                All Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/cart"
                                className="font-body text-sm text-cream/70 hover:text-gold transition-colors"
                            >
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/checkout"
                                className="font-body text-sm text-cream/70 hover:text-gold transition-colors"
                            >
                                Checkout
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-heading text-lg text-gold mb-4">Get in Touch</h3>
                    <ul className="flex flex-col gap-2 font-body text-sm text-cream/70">
                        <li>Email: support@innovativecollectives.com</li>
                        <li>Phone: +91 90000 00000</li>
                        <li>Ahmedabad, Gujarat, India</li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-cream/10">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="font-body text-xs text-cream/50">
                        © {new Date().getFullYear()} Innovative Collectives. All rights
                        reserved.
                    </p>
                    <p className="font-body text-xs text-cream/50">
                        Premium Brands | Trusted Quality | Timeless Style
                    </p>
                </div>
            </div>
        </footer>
    );
}