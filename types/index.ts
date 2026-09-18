export interface ProductSpec {
    label: string;
    value: string;
}

export interface ProductReview {
    id: string;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified?: boolean;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number; // original price, for showing discounts
    images: string[];
    category: CategorySlug;
    brand?: string;
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
    featured?: boolean;
    tags?: string[];
    sku?: string;
    specifications?: ProductSpec[];
    reviews?: ProductReview[];
}

export type CategorySlug =
    | "mobiles"
    | "ladies-bags"
    | "wallets"
    | "watches"
    | "perfumes"
    | "sunglasses";

export interface Category {
    slug: CategorySlug;
    name: string;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Address {
    id: string;
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault?: boolean;
    type?: "shipping" | "billing";
}

export interface TrackingCheckpoint {
    title: string;
    description: string;
    location: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
}

export interface OrderItem {
    product: Product;
    quantity: number;
    price: number;
}

export type OrderStatus =
    | "Processing"
    | "In Transit"
    | "Delivered"
    | "Cancelled"
    | "Returned"
    | "Refunded";

export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: OrderStatus;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
    carrier?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    shippingAddress: Address;
    trackingCheckpoints?: TrackingCheckpoint[];
}