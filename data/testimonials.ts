export interface Testimonial {
    id: string;
    name: string;
    location: string;
    rating: number;
    quote: string;
    purchasedItem?: string;
}

export const testimonials: Testimonial[] = [
    {
        id: "1",
        name: "Ananya Sharma",
        location: "Mumbai",
        rating: 5,
        quote:
            "The quality exceeded my expectations. My handbag looks and feels exactly like the pictures — genuinely premium.",
        purchasedItem: "Classic Leather Handbag",
    },
    {
        id: "2",
        name: "Rohan Mehta",
        location: "Delhi",
        rating: 5,
        quote:
            "Fast delivery and the watch came in perfect condition with authentic packaging. Will definitely order again.",
        purchasedItem: "Classic Chronograph Watch",
    },
    {
        id: "3",
        name: "Priya Nair",
        location: "Bengaluru",
        rating: 4,
        quote:
            "Great customer support when I had a question about sizing. The perfume smells amazing and lasts all day.",
        purchasedItem: "Signature Eau de Parfum",
    },
    {
        id: "4",
        name: "Arjun Verma",
        location: "Ahmedabad",
        rating: 5,
        quote:
            "Best online shopping experience I've had in India. Everything felt trustworthy from checkout to delivery.",
        purchasedItem: "iPhone 15 Pro Max",
    },
];