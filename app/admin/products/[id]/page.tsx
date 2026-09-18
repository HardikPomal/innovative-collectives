"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { getProductById, getProductBySlug } from "@/lib/db/api";
import type { Product } from "@/types";
import ProductEditForm from "./ProductEditForm";
import Button from "@/components/ui/Button";

export default function AdminEditProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            let p = await getProductById(id);
            if (!p) {
                p = await getProductBySlug(id);
            }
            setProduct(p || null);
            setIsLoading(false);
        }
        fetchProduct();
    }, [id]);

    if (isLoading) {
        return (
            <div className="max-w-xl mx-auto py-16 text-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-heading text-navy">Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-xl mx-auto py-16 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-cream border border-gold text-gold flex items-center justify-center mx-auto">
                    <AlertCircle size={24} />
                </div>
                <h1 className="font-heading text-2xl font-bold text-navy">
                    Product Not Found
                </h1>
                <p className="text-sm text-navy/60">
                    The requested product ID <code className="text-navy font-mono bg-cream px-1 py-0.5 rounded">{id}</code> does not exist in the inventory.
                </p>
                <div className="pt-2 flex justify-center">
                    <Button
                        href="/admin/products"
                        variant="outline"
                        icon={<ArrowLeft size={14} />}
                    >
                        Return to Products
                    </Button>
                </div>
            </div>
        );
    }

    return <ProductEditForm product={product} />;
}
