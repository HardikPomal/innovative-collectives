"use client";

import { useState } from "react";
import { Star, BadgeCheck } from "lucide-react";
import { Product } from "@/types";

export default function ProductTabs({ product }: { product: Product }) {
    const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");

    const hasSpecs = product.specifications && product.specifications.length > 0;
    const hasReviews = product.reviews && product.reviews.length > 0;

    const tabs = [
        { id: "description" as const, label: "Description" },
        ...(hasSpecs ? [{ id: "specifications" as const, label: "Specifications" }] : []),
        ...(hasReviews
            ? [{ id: "reviews" as const, label: `Reviews (${product.reviews!.length})` }]
            : []),
    ];

    return (
        <div className="mt-16">
            {/* Tab headers */}
            <div className="flex gap-8 border-b border-navy/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`font-body text-sm pb-4 -mb-px border-b-2 transition-colors ${activeTab === tab.id
                            ? "border-gold text-navy font-medium"
                            : "border-transparent text-navy/40 hover:text-navy/70"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="py-8">
                {activeTab === "description" && (
                    <p className="font-body text-sm text-navy/70 leading-relaxed max-w-3xl">
                        {product.description}
                    </p>
                )}

                {activeTab === "specifications" && hasSpecs && (
                    <div className="max-w-2xl">
                        <dl className="divide-y divide-navy/5">
                            {product.specifications!.map((spec) => (
                                <div
                                    key={spec.label}
                                    className="flex justify-between py-3 font-body text-sm"
                                >
                                    <dt className="text-navy/50">{spec.label}</dt>
                                    <dd className="text-navy font-medium text-right">
                                        {spec.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}

                {activeTab === "reviews" && hasReviews && (
                    <div className="flex flex-col gap-6 max-w-2xl">
                        {product.reviews!.map((review) => (
                            <div
                                key={review.id}
                                className="pb-6 border-b border-navy/5 last:border-0"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-heading text-sm font-semibold text-navy">
                                            {review.name}
                                        </span>
                                        {review.verified && (
                                            <span className="flex items-center gap-1 text-[11px] text-gold font-medium">
                                                <BadgeCheck size={13} /> Verified Purchase
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-body text-xs text-navy/40">
                                        {new Date(review.date).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-0.5 mb-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={13}
                                            className={
                                                i < review.rating
                                                    ? "fill-gold text-gold"
                                                    : "fill-navy/10 text-navy/10"
                                            }
                                        />
                                    ))}
                                </div>
                                <p className="font-body text-sm text-navy/70 leading-relaxed">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}