"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

export default function ProductImage({
    src,
    alt,
    className = "",
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div
                className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-cream to-gold/10 ${className}`}
            >
                <ImageIcon size={28} className="text-gold/50" strokeWidth={1.5} />
                <span className="font-body text-[11px] text-navy/30 text-center px-2 line-clamp-1">
                    {alt}
                </span>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            className={className}
            onError={() => setFailed(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
    );
}