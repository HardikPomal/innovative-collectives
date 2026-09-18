import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    href?: string;
    target?: string;
    fullWidth?: boolean;
    isLoading?: boolean;
    className?: string;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right",
    href,
    target,
    fullWidth = false,
    isLoading = false,
    disabled = false,
    className = "",
    ...props
}: ButtonProps) {
    // Base styles applied to all buttons
    const baseStyles = "inline-flex items-center justify-center gap-2 font-body font-medium rounded-full transition-colors focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed shrink-0 tracking-wide";
    
    // Width styles
    const widthStyles = fullWidth ? "w-full" : "";

    // Size styles
    const sizeStyles = {
        sm: "px-6 py-2.5 text-xs",
        md: "px-8 py-3.5 text-sm",
        lg: "px-10 py-4 text-base",
    }[size];

    // Variant styles matching the Brand Theme
    const variantStyles = {
        primary: "bg-navy text-cream hover:bg-navy-light border border-transparent",
        secondary: "bg-gold text-navy hover:bg-gold/90 border border-transparent",
        outline: "bg-transparent text-navy border border-navy/20 hover:bg-navy/5",
        ghost: "bg-transparent text-navy hover:bg-cream border border-transparent",
    }[variant];

    const combinedClassName = `${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyles} ${className}`.trim();

    const content = (
        <>
            {isLoading ? (
                <Loader2 size={size === "sm" ? 14 : 16} className="animate-spin shrink-0" />
            ) : (
                iconPosition === "left" && icon && <span className="shrink-0">{icon}</span>
            )}
            
            <span>{children}</span>
            
            {!isLoading && iconPosition === "right" && icon && (
                <span className="shrink-0">{icon}</span>
            )}
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                target={target}
                className={combinedClassName}
                // When acting as a Link, we still want to respect the disabled state visually (pointer-events-none)
                style={disabled || isLoading ? { pointerEvents: "none", opacity: 0.6 } : undefined}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            disabled={disabled || isLoading}
            className={combinedClassName}
            {...props}
        >
            {content}
        </button>
    );
}
