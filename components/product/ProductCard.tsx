import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import ProductImage from "./ProductImage";
import QuickAddButton from "./QuickAddButton";

export default function ProductCard({ product }: { product: Product }) {
    const discount = getDiscountPercent(product.price, product.compareAtPrice);

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group flex flex-col bg-white rounded-xl overflow-hidden border border-navy/[0.06] hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-1 transition-all duration-300"
        >
            {/* Image area — fixed ratio, consistent crop across all cards */}
            <div className="relative aspect-[3/4] bg-[#F5F3EE] overflow-hidden">
                <ProductImage
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover object-center group-hover:scale-[1.06] transition-transform duration-500 ease-out"
                />

                {/* Gradient scrim for badge legibility */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {discount && (
                        <span className="bg-navy text-cream text-[11px] font-semibold px-2.5 py-1 rounded-full">
                            -{discount}%
                        </span>
                    )}
                </div>
                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                        <span className="bg-navy text-cream text-xs font-semibold px-3 py-1.5 rounded-full">
                            Out of Stock
                        </span>
                    </div>
                )}

                {/* Quick add button — appears on hover */}
                <div className="absolute bottom-3 right-3 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <QuickAddButton />
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-1.5 p-4">
                {product.brand && (
                    <span className="font-body text-[10px] font-semibold text-gold uppercase tracking-widest">
                        {product.brand}
                    </span>
                )}

                <h3 className="font-body text-[14px] font-medium text-navy leading-snug line-clamp-1">
                    {product.name}
                </h3>

                {product.rating && (
                    <div className="flex items-center gap-1">
                        <Star size={12} className="fill-gold text-gold" />
                        <span className="font-body text-[11px] text-navy/50">
                            {product.rating}
                            <span className="text-navy/30"> ({product.reviewCount})</span>
                        </span>
                    </div>
                )}

                <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-heading text-base font-bold text-navy">
                        {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                        <span className="font-body text-[11px] text-navy/35 line-through">
                            {formatPrice(product.compareAtPrice)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}