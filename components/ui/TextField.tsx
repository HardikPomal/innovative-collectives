// components/ui/TextField.tsx
"use client";

import React, { useState, ReactNode, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
    id: string;
    label?: string;
    /** Optional element rendered to the right of the label, e.g. a "Forgot password?" link */
    labelAction?: ReactNode;
    /** Optional icon rendered inside the field, on the left (e.g. Mail, Lock) */
    icon?: ReactNode;
    /** Optional element rendered inside the field, on the right (e.g. Clear button, Submit button) */
    endAction?: ReactNode;
    error?: string;
    className?: string;
    inputClassName?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
    id,
    label,
    type = "text",
    labelAction,
    icon,
    endAction,
    error,
    className = "",
    inputClassName = "",
    ...props
}, ref) => {
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className={className}>
            {label && (
                <div className="flex items-baseline justify-between mb-2">
                    <label htmlFor={id} className="font-body text-sm text-navy/60">
                        {label}
                    </label>
                    {labelAction}
                </div>
            )}

            <div
                className={`flex items-center bg-white rounded-full px-4 py-2.5 sm:py-3 border transition-all ${error
                        ? "border-red-400 focus-within:ring-2 focus-within:ring-red-100"
                        : "border-navy/15 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/15"
                    }`}
            >
                {icon && (
                    <span className="text-navy/40 shrink-0 mr-3 flex items-center">
                        {icon}
                    </span>
                )}

                <input
                    ref={ref}
                    id={id}
                    name={id}
                    type={resolvedType}
                    aria-invalid={!!error}
                    className={`flex-1 min-w-0 bg-transparent font-body text-sm text-navy placeholder:text-navy/40 outline-none ${inputClassName}`.trim()}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="text-navy/40 hover:text-navy/70 transition-colors shrink-0 ml-2 p-1"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
                
                {endAction && !isPassword && (
                    <div className="shrink-0 ml-2 flex items-center gap-1">
                        {endAction}
                    </div>
                )}
            </div>

            {error && (
                <p className="font-body text-xs text-red-600 mt-1.5">{error}</p>
            )}
        </div>
    );
});

TextField.displayName = "TextField";
export default TextField;