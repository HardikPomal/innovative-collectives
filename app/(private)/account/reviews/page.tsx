// app/(private)/account/reviews/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, MessageSquare } from "lucide-react";
import { initialMockOrders } from "@/data/mockOrders";
import Button from "@/components/ui/Button";

interface Review {
    productId: string;
    productName: string;
    productImage: string;
    productSlug: string;
    rating: number;
    comment: string;
    date: string;
}

// Derive mock reviews from delivered orders
const MOCK_REVIEWS: Review[] = initialMockOrders
    .filter((o) => o.status === "Delivered")
    .flatMap((o) =>
        o.items.slice(0, 1).map(({ product }) => ({
            productId: product.id,
            productName: product.name,
            productImage: product.images[0],
            productSlug: product.slug,
            rating: 5,
            comment: "Exceptional quality and beautifully crafted. Exceeded every expectation — a truly premium experience.",
            date: o.date,
        }))
    );

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={13}
                    className={i <= rating ? "text-gold fill-gold" : "text-navy/15"}
                    strokeWidth={1.5}
                />
            ))}
        </div>
    );
}

export default function ReviewsPage() {
    const [reviews] = useState<Review[]>(MOCK_REVIEWS);

    return (
        <main className="max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-14">
            <Link href="/account" className="inline-flex items-center gap-1.5 font-body text-sm text-navy/50 hover:text-navy transition-colors mb-8">
                <ArrowLeft size={15} /> Back to Account
            </Link>

            <h1 className="font-heading text-2xl md:text-3xl text-navy mb-8">My Reviews</h1>

            {reviews.length === 0 ? (
                <div className="text-center py-20 bg-ivory border border-navy/8 rounded-3xl">
                    <MessageSquare size={36} className="text-navy/20 mx-auto mb-4" strokeWidth={1.5} />
                    <p className="font-heading text-lg text-navy mb-1">No reviews yet</p>
                    <p className="font-body text-sm text-navy/50 mb-6">After your orders are delivered, you can share your thoughts here.</p>
                    <Button
                        href="/products"
                        variant="primary"
                    >
                        Shop now
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.productId} className="bg-ivory border border-navy/8 rounded-2xl p-5">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream border border-navy/8 shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={review.productImage} alt={review.productName} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Link href={`/products/${review.productSlug}`} className="font-body text-sm font-medium text-navy hover:text-gold transition-colors truncate block">
                                        {review.productName}
                                    </Link>
                                    <div className="flex items-center gap-2 mt-1">
                                        <StarRating rating={review.rating} />
                                        <span className="font-body text-xs text-navy/40">
                                            {new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="font-body text-sm text-navy/65 mt-3 leading-relaxed">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
