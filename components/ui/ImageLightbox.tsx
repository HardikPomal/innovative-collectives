"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function ImageLightbox({
    images,
    initialIndex = 0,
    isOpen,
    onClose,
}: {
    images: string[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}) {
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setActiveIndex(initialIndex);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, initialIndex]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 left-6 text-navy/70 hover:text-navy p-2 transition-colors z-10 bg-white/50 rounded-full"
                aria-label="Close"
            >
                <X size={28} strokeWidth={1.5} />
            </button>

            <div
                className="relative w-full h-[85vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={images[activeIndex]}
                    alt={`Full view ${activeIndex + 1}`}
                    className="object-contain object-center max-w-full max-h-full p-4 md:p-8 drop-shadow-md"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveIndex((i) => (i - 1 + images.length) % images.length);
                            }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-navy text-white hover:bg-navy/90 shadow-md rounded-full p-3 transition-colors"
                            aria-label="Previous image"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveIndex((i) => (i + 1) % images.length);
                            }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-navy text-white hover:bg-navy/90 shadow-md rounded-full p-3 transition-colors"
                            aria-label="Next image"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div
                    className="absolute bottom-8 flex items-center justify-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Go to image ${i + 1}`}
                            className={`rounded-full transition-all duration-200 ${i === activeIndex
                                ? "w-4 h-1.5 bg-navy/60"
                                : "w-1.5 h-1.5 bg-navy/20 hover:bg-navy/40"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>,
        document.body
    );
}
