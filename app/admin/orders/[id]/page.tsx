"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { getOrders } from "@/lib/db/api";
import type { Order } from "@/types";
import OrderDetailFulfillment from "./OrderDetailFulfillment";
import Button from "@/components/ui/Button";

export default function AdminOrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            const allOrders = await getOrders();
            const found = allOrders.find(o => o.id === id || o.orderNumber === id);
            setOrder(found || null);
            setIsLoading(false);
        }
        fetchOrder();
    }, [id]);

    if (isLoading) {
        return (
            <div className="max-w-xl mx-auto py-16 text-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-heading text-navy">Loading order details...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-xl mx-auto py-16 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-cream border border-gold text-gold flex items-center justify-center mx-auto">
                    <AlertCircle size={24} />
                </div>
                <h1 className="font-heading text-2xl font-bold text-navy">
                    Order Not Found
                </h1>
                <p className="text-sm text-navy/60">
                    The requested order record <code className="text-navy font-mono bg-cream px-1 py-0.5 rounded">{id}</code> could not be located in fulfillment records.
                </p>
                <div className="pt-2 flex justify-center">
                    <Button
                        href="/admin/orders"
                        variant="outline"
                        icon={<ArrowLeft size={14} />}
                    >
                        Return to Orders
                    </Button>
                </div>
            </div>
        );
    }

    return <OrderDetailFulfillment initialOrder={order} />;
}
