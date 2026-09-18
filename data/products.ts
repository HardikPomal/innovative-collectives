import { Product, Category } from "@/types";

export const categories: Category[] = [
    { slug: "mobiles", name: "Mobiles", image: "/assets/images/categories/mobiles.webp" },
    { slug: "ladies-bags", name: "Ladies Bags", image: "/assets/images/categories/ladies-bags.webp" },
    { slug: "wallets", name: "Wallets", image: "/assets/images/categories/wallets.webp" },
    { slug: "watches", name: "Watches", image: "/assets/images/categories/watches.webp" },
    { slug: "perfumes", name: "Perfumes", image: "/assets/images/categories/perfumes.webp" },
    { slug: "sunglasses", name: "Sunglasses", image: "/assets/images/categories/sunglasses.webp" },
];

// Generates ["/assets/images/products/{slug}/1.webp", ".../2.webp", ...] up to `count`
function productImages(slug: string, count: number): string[] {
    return Array.from(
        { length: count },
        (_, i) => `/assets/images/products/${slug}/${i + 1}.webp`
    );
}

export const products: Product[] = [
    {
        id: "1",
        name: "iPhone 15 Pro Max",
        slug: "iphone-15-pro-max",
        description:
            "Titanium design with A17 Pro chip, 48MP camera system, and all-day battery life.",
        price: 449999,
        compareAtPrice: 479999,
        images: productImages("iphone-15-pro-max", 4),
        category: "mobiles",
        brand: "Apple",
        inStock: true,
        rating: 4.8,
        reviewCount: 124,
        featured: true,
        sku: "IC-MOB-0001",
        specifications: [
            { label: "Display", value: "6.7-inch Super Retina XDR OLED" },
            { label: "Chip", value: "A17 Pro" },
            { label: "Storage", value: "256GB" },
            { label: "Camera", value: "48MP + 12MP + 12MP triple system" },
            { label: "Battery", value: "Up to 29 hours video playback" },
            { label: "Material", value: "Titanium frame, Ceramic Shield front" },
            { label: "Warranty", value: "1 Year Brand Warranty" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Rohan Mehta",
                rating: 5,
                date: "2026-07-14",
                comment:
                    "Camera quality is outstanding, especially in low light. Battery easily lasts a full day of heavy use.",
                verified: true,
            },
            {
                id: "r2",
                name: "Priya Nair",
                rating: 5,
                date: "2026-06-30",
                comment:
                    "Arrived in perfect condition with sealed packaging. Titanium build feels premium and much lighter than expected.",
                verified: true,
            },
            {
                id: "r3",
                name: "Karan Joshi",
                rating: 4,
                date: "2026-06-10",
                comment:
                    "Great phone overall, just wish it came with a charger in the box like older models.",
                verified: false,
            },
        ],
    },

    {
        id: "2",
        name: "Samsung Galaxy S24 Ultra",
        slug: "samsung-galaxy-s24-ultra",
        description:
            "200MP camera, S Pen included, and a stunning 6.8-inch Dynamic AMOLED display.",
        price: 399999,
        images: productImages("samsung-galaxy-s24-ultra", 9),
        category: "mobiles",
        brand: "Samsung",
        inStock: true,
        rating: 4.7,
        reviewCount: 98,
        featured: true,
        sku: "IC-MOB-0002",
        specifications: [
            { label: "Display", value: "6.8-inch Dynamic AMOLED 2X" },
            { label: "Chip", value: "Snapdragon 8 Gen 3" },
            { label: "Storage", value: "256GB" },
            { label: "Camera", value: "200MP + 50MP + 12MP + 10MP quad system" },
            { label: "Battery", value: "5000mAh with 45W fast charging" },
            { label: "Material", value: "Titanium frame, Gorilla Armor glass" },
            { label: "Warranty", value: "1 Year Brand Warranty" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Ananya Sharma",
                rating: 5,
                date: "2026-07-02",
                comment:
                    "S Pen is incredibly useful for note-taking. Screen is bright and sharp even outdoors.",
                verified: true,
            },
            {
                id: "r2",
                name: "Vikram Singh",
                rating: 4,
                date: "2026-06-18",
                comment:
                    "Solid flagship phone. Zoom camera is genuinely impressive for the price point.",
                verified: true,
            },
        ],
    },
    {
        id: "3",
        name: "Classic Leather Handbag",
        slug: "classic-leather-handbag",
        description:
            "Crafted from full-grain genuine leather, this structured handbag features a spacious main compartment, a zip-secured inner pocket, and polished gold-tone hardware. The adjustable shoulder strap offers versatile carry options, making it as functional for the office as it is for weekend outings.",
        price: 12999,
        compareAtPrice: 15999,
        images: productImages("classic-leather-handbag", 7),
        category: "ladies-bags",
        brand: "Innovative Collectives",
        inStock: true,
        rating: 4.6,
        reviewCount: 67,
        featured: true,
        sku: "IC-BAG-0001",
        specifications: [
            { label: "Material", value: "Full-grain genuine leather" },
            { label: "Dimensions", value: "32cm × 24cm × 12cm" },
            { label: "Hardware", value: "Gold-tone brass fittings" },
            { label: "Closure", value: "Magnetic snap + top zip" },
            { label: "Interior", value: "1 main zip compartment, 2 slip pockets" },
            { label: "Strap", value: "Adjustable & detachable, 60–120cm drop" },
            { label: "Weight", value: "0.65 kg" },
            { label: "Care", value: "Wipe with dry cloth; condition with leather balm" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Meera Pillai",
                rating: 5,
                date: "2026-07-18",
                comment:
                    "The leather quality is exceptional — rich, thick, and has a beautiful natural scent. Plenty of room inside without being bulky.",
                verified: true,
            },
            {
                id: "r2",
                name: "Deepika Rao",
                rating: 5,
                date: "2026-07-01",
                comment:
                    "Perfect everyday bag. The gold hardware catches the light beautifully and it looks much more expensive than the price.",
                verified: true,
            },
            {
                id: "r3",
                name: "Sunita Kapoor",
                rating: 4,
                date: "2026-06-14",
                comment:
                    "Really happy with this purchase. The strap adjustment is smooth and the bag sits comfortably on the shoulder.",
                verified: false,
            },
        ],
    },
    {
        id: "4",
        name: "Quilted Chain Shoulder Bag",
        slug: "quilted-chain-shoulder-bag",
        description:
            "A timeless quilted design inspired by classic Parisian fashion houses. The interlocking diamond pattern is hand-stitched onto supple lambskin leather, while the signature gold chain strap can be worn doubled for a shorter drop or extended for a crossbody look.",
        price: 9999,
        images: productImages("quilted-chain-shoulder-bag", 4),
        category: "ladies-bags",
        brand: "Innovative Collectives",
        inStock: true,
        rating: 4.5,
        reviewCount: 41,
        featured: true,
        sku: "IC-BAG-0002",
        specifications: [
            { label: "Material", value: "Quilted lambskin leather" },
            { label: "Dimensions", value: "25cm × 17cm × 7cm" },
            { label: "Chain", value: "Gold-tone metal link, 120cm total length" },
            { label: "Closure", value: "Interlocking turn-lock" },
            { label: "Interior", value: "1 main compartment, 1 slip pocket" },
            { label: "Carry Options", value: "Shoulder or crossbody" },
            { label: "Weight", value: "0.42 kg" },
            { label: "Best For", value: "Evening, dinner, or smart-casual outings" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Nisha Verma",
                rating: 5,
                date: "2026-07-25",
                comment:
                    "Absolutely stunning bag. The quilting is neat and even, and the chain feels solid, not cheap at all.",
                verified: true,
            },
            {
                id: "r2",
                name: "Aisha Khan",
                rating: 4,
                date: "2026-06-29",
                comment:
                    "Great bag for evenings out. Fits my phone, cards, keys, and a small compact easily.",
                verified: true,
            },
            {
                id: "r3",
                name: "Ritu Sharma",
                rating: 4,
                date: "2026-06-05",
                comment:
                    "Looks exactly like the photos. Very elegant — I've already received several compliments.",
                verified: false,
            },
        ],
    },
    {
        id: "5",
        name: "Men's Bifold Leather Wallet",
        slug: "mens-bifold-leather-wallet",
        description:
            "Handcrafted from premium full-grain cowhide, this slim bifold wallet is built to age beautifully. Eight card slots, a bill compartment, and an interior coin pocket keep everything organised, while the minimalist profile ensures it sits flat in any pocket.",
        price: 3499,
        images: productImages("mens-bifold-leather-wallet", 4),
        category: "wallets",
        brand: "Innovative Collectives",
        inStock: true,
        rating: 4.4,
        reviewCount: 52,
        featured: true,
        sku: "IC-WAL-0001",
        specifications: [
            { label: "Material", value: "Full-grain cowhide leather" },
            { label: "Dimensions (closed)", value: "11cm × 9cm × 1.2cm" },
            { label: "Card Slots", value: "8 slots" },
            { label: "Bill Compartment", value: "1 full-length note section" },
            { label: "Coin Pocket", value: "Yes — zip-secured" },
            { label: "RFID Protection", value: "No" },
            { label: "Colour", value: "Dark tan / espresso brown" },
            { label: "Warranty", value: "6 Month Craftsmanship Warranty" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Amit Desai",
                rating: 5,
                date: "2026-07-30",
                comment:
                    "Solid quality for the price. Stitching is tight and the leather already has a nice patina after a month of use.",
                verified: true,
            },
            {
                id: "r2",
                name: "Rahul Gupta",
                rating: 4,
                date: "2026-07-10",
                comment:
                    "Slim enough to carry comfortably in a front pocket. Eight card slots is more than enough for daily use.",
                verified: true,
            },
            {
                id: "r3",
                name: "Suresh Kumar",
                rating: 4,
                date: "2026-06-18",
                comment:
                    "Good gift option — came in a nice box. The leather feels genuine and the bifold opens smoothly.",
                verified: false,
            },
        ],
    },
    {
        id: "6",
        name: "Women's Slim Card Wallet",
        slug: "womens-slim-card-wallet",
        description:
            "Stay organised in style with this ultra-slim card wallet. Six card slots with RFID-blocking lining protect your contactless cards from skimming, while the centre bill fold keeps banknotes crisp. Available in blush rose, midnight navy, and sage green.",
        price: 2799,
        compareAtPrice: 3499,
        images: productImages("womens-slim-card-wallet", 4),
        category: "wallets",
        brand: "Innovative Collectives",
        inStock: true,
        rating: 4.3,
        reviewCount: 29,
        sku: "IC-WAL-0002",
        specifications: [
            { label: "Material", value: "Saffiano-grain PU leather" },
            { label: "Dimensions (closed)", value: "10cm × 7.5cm × 0.8cm" },
            { label: "Card Slots", value: "6 slots" },
            { label: "Bill Section", value: "1 fold-over compartment" },
            { label: "RFID Protection", value: "Yes — blocks 13.56 MHz signals" },
            { label: "Colours", value: "Blush Rose, Midnight Navy, Sage Green" },
            { label: "Closure", value: "None — open top for easy access" },
            { label: "Warranty", value: "6 Month Craftsmanship Warranty" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Pooja Iyer",
                rating: 5,
                date: "2026-07-22",
                comment:
                    "Incredibly slim — fits in even the smallest crossbody bag. The blush rose colour is gorgeous in person.",
                verified: true,
            },
            {
                id: "r2",
                name: "Kavya Menon",
                rating: 4,
                date: "2026-07-03",
                comment:
                    "Love that it has RFID protection. Six card slots is perfect for me — phone, two bank cards, ID, and a couple of loyalty cards.",
                verified: true,
            },
            {
                id: "r3",
                name: "Tanisha Shah",
                rating: 4,
                date: "2026-06-11",
                comment:
                    "Nice quality at this price point. The saffiano texture doesn't pick up scratches easily.",
                verified: false,
            },
        ],
    },
    {
        id: "7",
        name: "Classic Chronograph Watch",
        slug: "classic-chronograph-watch",
        description:
            "Stainless steel chronograph watch with leather strap and sapphire crystal glass.",
        price: 24999,
        images: productImages("classic-chronograph-watch", 4),
        category: "watches",
        brand: "Fossil",
        inStock: true,
        rating: 4.7,
        reviewCount: 88,
        featured: true,
        sku: "IC-WAT-0001",
        specifications: [
            { label: "Case Material", value: "Stainless Steel" },
            { label: "Case Diameter", value: "44mm" },
            { label: "Strap", value: "Genuine Leather" },
            { label: "Glass", value: "Sapphire Crystal" },
            { label: "Water Resistance", value: "50 meters" },
            { label: "Movement", value: "Quartz Chronograph" },
            { label: "Warranty", value: "2 Year International Warranty" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Arjun Verma",
                rating: 5,
                date: "2026-07-20",
                comment:
                    "Looks even better in person. The chronograph subdials are a nice functional detail, not just decorative.",
                verified: true,
            },
            {
                id: "r2",
                name: "Sana Kapoor",
                rating: 4,
                date: "2026-05-28",
                comment:
                    "Bought this as a gift, packaging was premium and presentation was great.",
                verified: true,
            },
        ],
    },
    {
        id: "8",
        name: "Minimalist Gold Dial Watch",
        slug: "minimalist-gold-dial-watch",
        description:
            "Less is more with this refined minimalist timepiece. A sunray-brushed gold dial sits behind a domed mineral crystal, held in a polished rose-gold PVD case. The ultra-thin profile slips effortlessly under a shirt cuff, and the interchangeable mesh strap can be swapped for the included leather band.",
        price: 18999,
        images: productImages("minimalist-gold-dial-watch", 3),
        category: "watches",
        brand: "Innovative Collectives",
        inStock: true,
        rating: 4.5,
        reviewCount: 34,
        sku: "IC-WAT-0002",
        specifications: [
            { label: "Case Material", value: "Rose-gold PVD stainless steel" },
            { label: "Case Diameter", value: "36mm" },
            { label: "Case Thickness", value: "7.2mm (ultra-slim)" },
            { label: "Dial", value: "Sunray-brushed gold, index markers" },
            { label: "Glass", value: "Domed mineral crystal" },
            { label: "Strap", value: "Stainless mesh + leather strap included" },
            { label: "Movement", value: "Japanese quartz (Miyota)" },
            { label: "Water Resistance", value: "30 meters (splash-proof)" },
            { label: "Warranty", value: "1 Year Brand Warranty" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Divya Krishnan",
                rating: 5,
                date: "2026-07-28",
                comment:
                    "Dainty and elegant. Pairs perfectly with both formal and casual outfits. The mesh strap is particularly beautiful.",
                verified: true,
            },
            {
                id: "r2",
                name: "Neha Agarwal",
                rating: 4,
                date: "2026-07-09",
                comment:
                    "Lighter than expected — in a good way. Very comfortable to wear all day. The gold tone is warm, not brassy.",
                verified: true,
            },
            {
                id: "r3",
                name: "Shreya Patel",
                rating: 5,
                date: "2026-06-20",
                comment:
                    "Love the fact that two straps are included. I alternate between the mesh and leather depending on my outfit.",
                verified: false,
            },
        ],
    },
    {
        id: "9",
        name: "Signature Eau de Parfum",
        slug: "signature-eau-de-parfum",
        description:
            "Long-lasting fragrance with notes of amber, sandalwood, and a hint of citrus.",
        price: 8999,
        compareAtPrice: 10999,
        images: productImages("signature-eau-de-parfum", 4),
        category: "perfumes",
        brand: "Innovative Collectives",
        inStock: true,
        rating: 4.8,
        reviewCount: 112,
        featured: true,
        sku: "IC-PER-0001",
        specifications: [
            { label: "Volume", value: "100ml" },
            { label: "Concentration", value: "Eau de Parfum (18-22%)" },
            { label: "Top Notes", value: "Citrus, Bergamot" },
            { label: "Base Notes", value: "Amber, Sandalwood, Musk" },
            { label: "Longevity", value: "8-10 hours" },
            { label: "Origin", value: "Crafted in India" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Priya Nair",
                rating: 5,
                date: "2026-07-05",
                comment:
                    "This has become my everyday signature scent. Compliments every time I wear it.",
                verified: true,
            },
            {
                id: "r2",
                name: "Rohan Mehta",
                rating: 5,
                date: "2026-06-22",
                comment:
                    "Bottle design is gorgeous and the scent lasts well into the evening.",
                verified: true,
            },
        ],
    },
    {
        id: "10",
        name: "Oud Royal Perfume",
        slug: "oud-royal-perfume",
        description:
            "An opulent oriental fragrance anchored by sustainably sourced Vietnamese oud. Opening with a burst of saffron and rose, it dries down to a warm base of aged oud, ambergris, and vanilla — a scent that commands a room long after you leave it.",
        price: 11999,
        images: productImages("oud-royal-perfume", 5),
        category: "perfumes",
        brand: "Innovative Collectives",
        inStock: true,
        rating: 4.6,
        reviewCount: 47,
        sku: "IC-PER-0002",
        specifications: [
            { label: "Volume", value: "75ml" },
            { label: "Concentration", value: "Extrait de Parfum (25–30%)" },
            { label: "Top Notes", value: "Saffron, Bulgarian Rose" },
            { label: "Heart Notes", value: "Oud, Patchouli" },
            { label: "Base Notes", value: "Ambergris, Vanilla, White Musk" },
            { label: "Longevity", value: "12–16 hours" },
            { label: "Sillage", value: "Heavy — projects strongly" },
            { label: "Best For", value: "Evening, winter, special occasions" },
            { label: "Origin", value: "Crafted in India" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Omar Shaikh",
                rating: 5,
                date: "2026-07-15",
                comment:
                    "One spray and I receive compliments all evening. The oud is smooth, not harsh — a genuinely luxurious scent.",
                verified: true,
            },
            {
                id: "r2",
                name: "Farrukh Ansari",
                rating: 5,
                date: "2026-07-01",
                comment:
                    "I've tried many oud fragrances — this is the best in this price range by far. Rich, long-lasting, and the bottle looks stunning.",
                verified: true,
            },
            {
                id: "r3",
                name: "Zara Hussain",
                rating: 4,
                date: "2026-06-10",
                comment:
                    "Powerful fragrance — a little goes a long way. Not ideal for the office but perfect for evenings out.",
                verified: false,
            },
        ],
    },
    {
        id: "11",
        name: "Classic Aviator Sunglasses",
        slug: "classic-aviator-sunglasses",
        description:
            "The aviator silhouette that never goes out of style, reimagined with modern optics. A lightweight gold-tone metal frame holds UV400-certified lenses that block 100% of UVA and UVB rays. The adjustable nose pads and spring-loaded hinges ensure an all-day comfortable fit.",
        price: 5999,
        images: productImages("classic-aviator-sunglasses", 5),
        category: "sunglasses",
        brand: "Innovative Collectives",
        inStock: true,
        rating: 4.5,
        reviewCount: 63,
        featured: false,
        sku: "IC-SUN-0001",
        specifications: [
            { label: "Frame Material", value: "Lightweight metal alloy" },
            { label: "Frame Colour", value: "Gold-tone" },
            { label: "Lens Material", value: "Polycarbonate" },
            { label: "Lens Width", value: "58mm" },
            { label: "UV Protection", value: "UV400 — 100% UVA & UVB block" },
            { label: "Lens Treatment", value: "Anti-reflective, scratch-resistant coating" },
            { label: "Nose Pads", value: "Adjustable silicone" },
            { label: "Hinges", value: "Spring-loaded for flexible fit" },
            { label: "Includes", value: "Hard carry case + cleaning cloth" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Rahul Khanna",
                rating: 5,
                date: "2026-07-26",
                comment:
                    "Classic look that suits virtually every face shape. Very light on the nose even after hours of wear.",
                verified: true,
            },
            {
                id: "r2",
                name: "Akash Tiwari",
                rating: 4,
                date: "2026-07-12",
                comment:
                    "Good optical clarity and the anti-reflective coating makes driving much more comfortable.",
                verified: true,
            },
            {
                id: "r3",
                name: "Dev Malhotra",
                rating: 5,
                date: "2026-06-28",
                comment:
                    "Premium feel at a very reasonable price. The hard case is a nice bonus — keeps them scratch-free.",
                verified: false,
            },
        ],
    },
    {
        id: "12",
        name: "Round Retro Sunglasses",
        slug: "round-retro-sunglasses",
        description:
            "Channelling the spirit of the 1960s, these round frames bring effortless vintage cool to any look. Polarised CR-39 lenses cut through glare on water and roads, while the acetate frame — handpolished to a deep tortoiseshell or matte black — is both durable and lightweight.",
        price: 4499,
        compareAtPrice: 5499,
        images: productImages("round-retro-sunglasses", 5),
        category: "sunglasses",
        brand: "Innovative Collectives",
        inStock: true,
        rating: 4.4,
        reviewCount: 38,
        featured: true,
        sku: "IC-SUN-0002",
        specifications: [
            { label: "Frame Material", value: "Acetate (handpolished)" },
            { label: "Frame Colours", value: "Tortoiseshell, Matte Black" },
            { label: "Lens Material", value: "CR-39 optical resin" },
            { label: "Lens Diameter", value: "50mm" },
            { label: "Polarised", value: "Yes — eliminates horizontal glare" },
            { label: "UV Protection", value: "UV400 — 100% UVA & UVB block" },
            { label: "Bridge Width", value: "20mm" },
            { label: "Temple Length", value: "145mm" },
            { label: "Includes", value: "Soft pouch + microfibre cleaning cloth" },
        ],
        reviews: [
            {
                id: "r1",
                name: "Ishaan Roy",
                rating: 5,
                date: "2026-07-31",
                comment:
                    "The tortoiseshell colour is stunning. Polarised lenses make a noticeable difference when driving — much less eye strain.",
                verified: true,
            },
            {
                id: "r2",
                name: "Siddhant Chopra",
                rating: 4,
                date: "2026-07-14",
                comment:
                    "Great vintage aesthetic. Fit is slightly small for a wider face, but perfect for average face widths.",
                verified: true,
            },
            {
                id: "r3",
                name: "Aryan Mehta",
                rating: 4,
                date: "2026-06-22",
                comment:
                    "Very solid build for the price. Acetate feels quality — nothing about these says 'budget'.",
                verified: false,
            },
        ],
    },
];

export function getFeaturedProducts(): Product[] {
    return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products.filter(
        (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
    );
}