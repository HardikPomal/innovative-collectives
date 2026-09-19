import React from "react";

export type BadgeVariant = "success" | "warning" | "gold" | "info" | "neutral" | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    /** If status is passed, variant, label and dot behavior are automatically inferred */
    status?: string;
    dot?: boolean;
    pulse?: boolean;
    children?: React.ReactNode;
}

function resolveStatus(status: string): { variant: BadgeVariant; label: string; pulse?: boolean } {
    const s = status.trim().toLowerCase();
    switch (s) {
        case "in stock":
        case "in-stock":
            return { variant: "success", label: "In Stock" };
        case "out of stock":
        case "out-of-stock":
            return { variant: "danger", label: "Out of Stock" };
        case "active":
            return { variant: "success", label: "Active" };
        case "inactive":
            return { variant: "neutral", label: "Inactive" };
        case "delivered":
            return { variant: "success", label: "Delivered" };
        case "processing":
            return { variant: "gold", label: "Processing", pulse: true };
        case "in transit":
        case "in-transit":
            return { variant: "info", label: "In Transit" };
        case "cancelled":
        case "canceled":
            return { variant: "danger", label: "Cancelled" };
        case "settled":
        case "paid":
            return { variant: "success", label: status };
        case "pending":
            return { variant: "gold", label: "Pending", pulse: true };
        default:
            return { variant: "neutral", label: status };
    }
}

export default function Badge({
    variant,
    status,
    dot = true,
    pulse,
    className = "",
    children,
    ...props
}: BadgeProps) {
    let resolvedVariant = variant || "neutral";
    let content = children;
    let shouldPulse = pulse;

    if (status) {
        const resolved = resolveStatus(status);
        if (!variant) resolvedVariant = resolved.variant;
        if (!children) content = resolved.label;
        if (shouldPulse === undefined) shouldPulse = resolved.pulse;
    }

    const variantStyles: Record<BadgeVariant, { badge: string; dot: string }> = {
        success: {
            badge: "bg-emerald-50 border-emerald-200 text-emerald-700",
            dot: "bg-emerald-500",
        },
        warning: {
            badge: "bg-amber-50 border-amber-200 text-amber-800",
            dot: "bg-amber-500",
        },
        gold: {
            badge: "bg-gold/10 border-gold/30 text-[#9E7B15]",
            dot: "bg-gold",
        },
        info: {
            badge: "bg-navy/5 border-navy/15 text-navy",
            dot: "bg-navy/60",
        },
        neutral: {
            badge: "bg-navy/5 border-navy/15 text-navy/70",
            dot: "bg-navy/40",
        },
        danger: {
            badge: "bg-red-50 border-red-200 text-red-700",
            dot: "bg-red-500",
        },
    };

    const currentStyle = variantStyles[resolvedVariant] || variantStyles.neutral;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border shrink-0 ${currentStyle.badge} ${className}`.trim()}
            {...props}
        >
            {dot && (
                <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${currentStyle.dot} ${
                        shouldPulse ? "animate-pulse" : ""
                    }`}
                />
            )}
            <span>{content}</span>
        </span>
    );
}
