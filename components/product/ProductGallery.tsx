"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn } from "lucide-react";
import ProductImage from "./ProductImage";

export default function ProductGallery({
    images,
    productName,
}: {
    images: string[];
    productName: string;
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (lightboxOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [lightboxOpen]);

    const openLightbox = useCallback(() => setLightboxOpen(true), []);
    const closeLightbox = useCallback(() => setLightboxOpen(false), []);

    // Swipe and Drag handlers
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const minSwipeDistance = 40;

    const onSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
        setTouchEnd(null);
        setTouchStart("touches" in e ? e.targetTouches[0].clientX : (e as React.MouseEvent).clientX);
        setIsDragging(true);
    };

    const onSwipeMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        setTouchEnd("touches" in e ? e.targetTouches[0].clientX : (e as React.MouseEvent).clientX);
    };

    const onSwipeEnd = () => {
        setIsDragging(false);
        if (touchStart === null || touchEnd === null) {
            // No drag occurred, just a click
            openLightbox();
            return;
        }

        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance && images.length > 1) {
            setActiveIndex((i) => (i + 1) % images.length); // Next
        } else if (distance < -minSwipeDistance && images.length > 1) {
            setActiveIndex((i) => (i - 1 + images.length) % images.length); // Prev
        } else if (Math.abs(distance) < 5) {
            openLightbox(); // Treated as click
        }
        
        setTouchStart(null);
        setTouchEnd(null);
    };

    return (
        <>
            {/* ── Mobile layout: main image on top, thumbnails below ─────────── */}
            <div className="flex flex-col gap-3 md:hidden">
                {/* Main image */}
                <div
                    className="relative aspect-square bg-[#F5F3EE] rounded-2xl overflow-hidden cursor-zoom-in group select-none"
                    onDragStart={(e) => e.preventDefault()}
                    onTouchStart={onSwipeStart}
                    onTouchMove={onSwipeMove}
                    onTouchEnd={onSwipeEnd}
                    onMouseDown={onSwipeStart}
                    onMouseMove={onSwipeMove}
                    onMouseUp={onSwipeEnd}
                    onMouseLeave={(e) => {
                        if (isDragging) onSwipeEnd();
                    }}
                >
                    <ProductImage
                        src={images[activeIndex]}
                        alt={`${productName} — image ${activeIndex + 1}`}
                        className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Counter */}
                    <div className="absolute top-3 left-3 bg-navy/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {activeIndex + 1} / {images.length}
                    </div>
                    {/* Zoom hint */}
                    <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-navy text-xs font-medium px-2.5 py-1.5 rounded-full shadow">
                            <ZoomIn size={12} /> Click to zoom
                        </span>
                    </div>
                </div>

                {/* Dot nav */}
                {images.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                aria-label={`Go to image ${i + 1}`}
                                className={`rounded-full transition-all duration-200 ${i === activeIndex
                                    ? "w-6 h-2 bg-gold"
                                    : "w-2 h-2 bg-navy/20 hover:bg-navy/40"
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Horizontal thumbnail strip */}
                {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                        {images.map((img, index) => (
                            <button
                                key={img}
                                onClick={() => setActiveIndex(index)}
                                style={{ background: "#F5F3EE" }}
                                className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${index === activeIndex
                                    ? "border-gold shadow-md shadow-gold/20"
                                    : "border-transparent hover:border-navy/25"
                                    }`}
                                aria-label={`View image ${index + 1}`}
                            >
                                <ProductImage
                                    src={img}
                                    alt={`${productName} thumbnail ${index + 1}`}
                                    className="object-contain object-center p-1"
                                />
                                {index === activeIndex && (
                                    <span className="absolute bottom-0.5 right-0.5 bg-gold text-white text-[8px] font-bold px-1 py-0.5 rounded-full leading-none">
                                        {index + 1}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Desktop layout: vertical thumb strip left + main image right ── */}
            <div className="hidden md:flex gap-3 items-start">
                {/* Thumbnail strip */}
                {images.length > 1 && (
                    <div className="flex flex-col gap-2.5 shrink-0 max-h-[560px] overflow-y-auto pr-0.5 pb-1 scrollbar-thin">
                        {images.map((img, index) => (
                            <button
                                key={img}
                                onClick={() => setActiveIndex(index)}
                                className={`relative shrink-0 w-[72px] h-[72px] rounded-xl overflow-hidden border-2 transition-all duration-200 ${index === activeIndex
                                    ? "border-gold shadow-md shadow-gold/20 scale-[1.03]"
                                    : "border-transparent hover:border-navy/25 hover:scale-[1.02]"
                                    }`}
                                style={{ background: "#F5F3EE" }}
                                aria-label={`View image ${index + 1}`}
                                aria-pressed={index === activeIndex}
                            >
                                <ProductImage
                                    src={img}
                                    alt={`${productName} thumbnail ${index + 1}`}
                                    className="object-contain object-center p-1"
                                />
                                {index === activeIndex && (
                                    <span className="absolute bottom-1 right-1 bg-gold text-white text-[9px] font-bold leading-none px-1.5 py-0.5 rounded-full">
                                        {index + 1}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* Main image */}
                <div className="relative flex-1 min-w-0">
                    <div
                        className="relative aspect-square bg-[#F5F3EE] rounded-2xl overflow-hidden cursor-zoom-in group select-none"
                        onDragStart={(e) => e.preventDefault()}
                        onTouchStart={onSwipeStart}
                        onTouchMove={onSwipeMove}
                        onTouchEnd={onSwipeEnd}
                        onMouseDown={onSwipeStart}
                        onMouseMove={onSwipeMove}
                        onMouseUp={onSwipeEnd}
                        onMouseLeave={(e) => {
                            if (isDragging) onSwipeEnd();
                        }}
                    >
                        <ProductImage
                            src={images[activeIndex]}
                            alt={`${productName} — image ${activeIndex + 1}`}
                            className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Zoom hint */}
                        <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-navy text-xs font-medium px-2.5 py-1.5 rounded-full shadow">
                                <ZoomIn size={12} /> Click to zoom
                            </span>
                        </div>
                        {/* Counter */}
                        <div className="absolute top-3 left-3 bg-navy/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                            {activeIndex + 1} / {images.length}
                        </div>
                    </div>

                    {/* Dot nav */}
                    {images.length > 1 && (
                        <div className="flex items-center justify-center gap-1.5 mt-3">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    aria-label={`Go to image ${i + 1}`}
                                    className={`rounded-full transition-all duration-200 ${i === activeIndex
                                        ? "w-6 h-2 bg-gold"
                                        : "w-2 h-2 bg-navy/20 hover:bg-navy/40"
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Lightbox (shared) ───────────────────────────────────────────── */}
            {lightboxOpen && mounted && createPortal(
                <div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 left-6 text-navy/70 hover:text-navy p-2 transition-colors z-10"
                        aria-label="Close"
                    >
                        <X size={28} strokeWidth={1.5} />
                    </button>

                    <div
                        className="relative w-full h-[85vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ProductImage
                            src={images[activeIndex]}
                            alt={`${productName} — full view ${activeIndex + 1}`}
                            className="object-contain object-center w-full h-full p-4 md:p-8"
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
            )}
        </>
    );
}