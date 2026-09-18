"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/data/products";
import Button from "@/components/ui/Button";

export default function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category");

    const handleFilter = (slug: string | null) => {
        if (!slug) {
            router.push("/products");
        } else {
            router.push(`/products?category=${slug}`);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            <Button
                onClick={() => handleFilter(null)}
                variant={!activeCategory ? "primary" : "outline"}
                size="sm"
            >
                All
            </Button>
            {categories.map((cat) => (
                <Button
                    key={cat.slug}
                    onClick={() => handleFilter(cat.slug)}
                    variant={activeCategory === cat.slug ? "primary" : "outline"}
                    size="sm"
                >
                    {cat.name}
                </Button>
            ))}
        </div>
    );
}