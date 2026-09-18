import { Order, Address } from "@/types";
import { products } from "./products";

export const initialMockAddresses: Address[] = [
    {
        id: "addr_1",
        fullName: "Alexander Wright",
        phone: "+1 (555) 234-8901",
        street: "450 Park Avenue, Penthouse 18B",
        city: "New York",
        state: "NY",
        postalCode: "10022",
        country: "United States",
        isDefault: true,
        type: "shipping",
    },
    {
        id: "addr_2",
        fullName: "Alexander Wright",
        phone: "+1 (555) 234-8901",
        street: "One Central Park West, Suite 24A",
        city: "New York",
        state: "NY",
        postalCode: "10023",
        country: "United States",
        isDefault: false,
        type: "billing",
    },
];

export const initialMockOrders: Order[] = [
    {
        id: "ord_1",
        orderNumber: "ORD-810452",
        date: "2026-09-08",
        status: "In Transit",
        items: [
            {
                product: products.find((p) => p.id === "3") || products[2],
                quantity: 1,
                price: 12999,
            },
        ],
        subtotal: 12999,
        shipping: 0,
        total: 12999,
        carrier: "FedEx Priority White-Glove",
        trackingNumber: "IC-FEDEX-91048201",
        estimatedDelivery: "Tomorrow by 2:00 PM",
        shippingAddress: initialMockAddresses[0],
        trackingCheckpoints: [
            {
                title: "Out for Delivery",
                description: "With dedicated white-glove driver on final delivery route",
                location: "Manhattan Delivery Hub, NY",
                timestamp: "Today, 08:30 AM",
                completed: false,
                current: true,
            },
            {
                title: "Arrived at Regional Sort Center",
                description: "Cleared local inspection and dispatched to Manhattan Hub",
                location: "JFK Secured Facility, NY",
                timestamp: "Yesterday, 11:15 PM",
                completed: true,
            },
            {
                title: "In Transit via Air Cargo",
                description: "Departed international distribution gateway on flight IC-402",
                location: "Paris CDG Vault Gateway, France",
                timestamp: "Sep 09, 04:45 PM",
                completed: true,
            },
            {
                title: "Provenance & Authenticity Audit Passed",
                description: "Physical appraisal and authentication verified by Master Craftsman",
                location: "Atelier Central, Paris",
                timestamp: "Sep 08, 02:15 PM",
                completed: true,
            },
            {
                title: "Order Placed & Confirmed",
                description: "Acquisition request authorized and allocated to private client suite",
                location: "New York Client Services",
                timestamp: "Sep 08, 10:00 AM",
                completed: true,
            },
        ],
    },
    {
        id: "ord_2",
        orderNumber: "ORD-942817",
        date: "2026-08-28",
        status: "Delivered",
        items: [
            {
                product: products.find((p) => p.id === "7") || products[6],
                quantity: 1,
                price: 24999,
            },
            {
                product: products.find((p) => p.id === "6") || products[5],
                quantity: 1,
                price: 2799,
            },
        ],
        subtotal: 27798,
        shipping: 0,
        total: 27798,
        carrier: "DHL Express Concierge",
        trackingNumber: "IC-DHL-89214710",
        estimatedDelivery: "Delivered on Aug 31, 2026",
        shippingAddress: initialMockAddresses[0],
        trackingCheckpoints: [
            {
                title: "Delivered & Handed Over",
                description: "Signed and received by Alexander Wright. Vault packaging intact.",
                location: "450 Park Avenue, Penthouse 18B",
                timestamp: "Aug 31, 01:22 PM",
                completed: true,
                current: false,
            },
            {
                title: "Out for Courier Handover",
                description: "Secured courier out for delivery",
                location: "New York Midtown Hub",
                timestamp: "Aug 31, 09:10 AM",
                completed: true,
            },
            {
                title: "Customs Clearance Completed",
                description: "Import duties and documentation validated",
                location: "New York Port Authority",
                timestamp: "Aug 30, 06:40 PM",
                completed: true,
            },
            {
                title: "Dispatched from Atelier",
                description: "Sealed in tamper-evident security case",
                location: "Geneva Vault, Switzerland",
                timestamp: "Aug 29, 11:30 AM",
                completed: true,
            },
            {
                title: "Order Verified & Commissioned",
                description: "Horological certification and papers registered",
                location: "Geneva Vault, Switzerland",
                timestamp: "Aug 28, 04:00 PM",
                completed: true,
            },
        ],
    },
    {
        id: "ord_3",
        orderNumber: "ORD-739120",
        date: "2026-09-10",
        status: "Processing",
        items: [
            {
                product: products.find((p) => p.id === "1") || products[0],
                quantity: 1,
                price: 449999,
            },
        ],
        subtotal: 449999,
        shipping: 0,
        total: 449999,
        carrier: "Ferrari Armored Logistics",
        trackingNumber: "IC-ARMORED-004128",
        estimatedDelivery: "Expected Sep 14, 2026",
        shippingAddress: initialMockAddresses[0],
        trackingCheckpoints: [
            {
                title: "Authenticity & Provenance Audit",
                description: "Device undergoing multi-point provenance and serial verification",
                location: "Innovative Collectives Tech Vault, New York",
                timestamp: "Today, 11:00 AM",
                completed: false,
                current: true,
            },
            {
                title: "Order Placed & Allocation Confirmed",
                description: "Direct client allocation assigned to batch #IC-409",
                location: "New York Client Services",
                timestamp: "Sep 10, 09:15 AM",
                completed: true,
            },
        ],
    },
];

export function getOrderById(idOrNumber: string): Order | undefined {
    // Check localStorage first if available on client
    if (typeof window !== "undefined") {
        try {
            const saved = localStorage.getItem("ic_user_orders");
            if (saved) {
                const parsed: Order[] = JSON.parse(saved);
                const match = parsed.find(
                    (o) => o.id === idOrNumber || o.orderNumber === idOrNumber
                );
                if (match) return match;
            }
        } catch (e) {
            console.error(e);
        }
    }
    return initialMockOrders.find(
        (o) => o.id === idOrNumber || o.orderNumber === idOrNumber
    );
}
