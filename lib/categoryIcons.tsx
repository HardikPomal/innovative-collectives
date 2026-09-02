import {
    Smartphone,
    ShoppingBag,
    Wallet,
    Watch,
    SprayCan,
    Glasses,
} from "lucide-react";
import { CategorySlug } from "@/types";

export const categoryIcons: Record<CategorySlug, React.ElementType> = {
    mobiles: Smartphone,
    "ladies-bags": ShoppingBag,
    wallets: Wallet,
    watches: Watch,
    perfumes: SprayCan,
    sunglasses: Glasses,
};