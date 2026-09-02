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
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}