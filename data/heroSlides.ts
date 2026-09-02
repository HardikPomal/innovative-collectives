import { CategorySlug } from "@/types";

export interface HeroSlide {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    image?: string; // optional — falls back to gradient if not provided
    icons: CategorySlug[]; // 6 icons floated around the slide
}

export const heroSlides: HeroSlide[] = [
    {
        id: "1",
        eyebrow: "New Arrivals",
        title: "Curated Essentials for the Modern & Timeless",
        description:
            "Discover premium mobiles, bags, wallets, watches, perfumes, and sunglasses — handpicked for quality that lasts.",
        ctaText: "Shop Now",
        ctaLink: "/products",
        icons: [
            "mobiles",
            "ladies-bags",
            "wallets",
            "watches",
            "perfumes",
            "sunglasses",
        ],
    },
    {
        id: "2",
        eyebrow: "Timepieces",
        title: "Watches That Define Every Moment",
        description:
            "Explore our curated collection of classic and modern timepieces from trusted brands.",
        ctaText: "Explore Watches",
        ctaLink: "/category/watches",
        icons: [
            "mobiles",
            "ladies-bags",
            "wallets",
            "watches",
            "perfumes",
            "sunglasses",
        ],
    },
    {
        id: "3",
        eyebrow: "Signature Scents",
        title: "Fragrances Worth Remembering",
        description:
            "Long-lasting, luxurious perfumes crafted to leave a lasting impression.",
        ctaText: "Shop Perfumes",
        ctaLink: "/category/perfumes",
        icons: [
            "mobiles",
            "ladies-bags",
            "wallets",
            "watches",
            "perfumes",
            "sunglasses",
        ],
    },
];