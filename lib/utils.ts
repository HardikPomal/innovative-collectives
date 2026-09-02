export function formatPrice(amount: number): string {
    return `Rs. ${amount.toLocaleString("en-IN")}`;
}

/**
 * Calculates the discount percentage between an original and sale price.
 * e.g. compareAtPrice 479999, price 449999 -> 6 (%)
 */
export function getDiscountPercent(
    price: number,
    compareAtPrice?: number
): number | null {
    if (!compareAtPrice || compareAtPrice <= price) return null;
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

/**
 * Truncates text to a max length and appends "..." if needed.
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trim()}...`;
}