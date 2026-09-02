"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { heroSlides } from "@/data/heroSlides";
import { categoryIcons } from "@/lib/categoryIcons";

const SLIDE_THEMES = [
    { bg: "from-[#040d1e] via-[#0b1e3d] to-[#0d1a30]", accent: "#c9a227", orb1: "rgba(201,162,39,0.12)", orb2: "rgba(27,58,99,0.6)" },
    { bg: "from-[#0a0a12] via-[#12102a] to-[#0b1020]", accent: "#c9a227", orb1: "rgba(201,162,39,0.10)", orb2: "rgba(60,50,120,0.5)" },
    { bg: "from-[#0d0808] via-[#1a0d0a] to-[#120a08]", accent: "#c9a227", orb1: "rgba(201,100,39,0.10)", orb2: "rgba(100,40,20,0.5)" },
];

// 6 icon slots evenly spaced on the orbit circle
const ICON_ANGLES = [0, 60, 120, 180, 240, 300]; // degrees

export default function HeroBanner() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [textVisible, setTextVisible] = useState(true);
    const [animating, setAnimating] = useState(false);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const TOTAL = heroSlides.length;

    const navigate = useCallback((newIndex: number) => {
        if (animating) return;
        setAnimating(true);
        setTextVisible(false);
        setTimeout(() => {
            setActiveIndex(newIndex);
            setTimeout(() => { setTextVisible(true); setAnimating(false); }, 80);
        }, 420);
    }, [animating]);

    const goToNext = useCallback(() => navigate(activeIndex === TOTAL - 1 ? 0 : activeIndex + 1), [navigate, activeIndex, TOTAL]);
    const goToPrev = useCallback(() => navigate(activeIndex === 0 ? TOTAL - 1 : activeIndex - 1), [navigate, activeIndex, TOTAL]);

    useEffect(() => {
        autoPlayRef.current = setInterval(goToNext, 6000);
        return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
    }, [goToNext]);

    const resetAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(goToNext, 6000);
    };

    const handlePrev = () => { goToPrev(); resetAutoPlay(); };
    const handleNext = () => { goToNext(); resetAutoPlay(); };

    const slide = heroSlides[activeIndex];
    const theme = SLIDE_THEMES[activeIndex % SLIDE_THEMES.length];

    // Inline V-Gradient SVG (trimmed to just paths + defs, abbreviated for hero)
    const VLogoSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 420 280" width="100%" height="100%">
            <defs>
                <linearGradient id="vg-lg" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#d8b25a" />
                    <stop offset="0.18" stopColor="#fff8e7" />
                    <stop offset="0.44" stopColor="#c9961a" />
                    <stop offset="0.72" stopColor="#a87400" />
                    <stop offset="1" stopColor="#e0b84f" />
                </linearGradient>
            </defs>
            {/* Use the real SVG as an image tag pointing to the public file */}
            <image href="/assets/logo/i-logo/I-Gradient.svg" x="0" y="-30" width="420" height="310" />
        </svg>
    );

    return (
        <section className="relative overflow-hidden" style={{ height: "min(92vh, 720px)" }}>

            {/* ── Slide backgrounds ── */}
            {heroSlides.map((_, i) => {
                const t = SLIDE_THEMES[i % SLIDE_THEMES.length];
                return (
                    <div key={i} className={`absolute inset-0 bg-gradient-to-br ${t.bg} transition-opacity duration-700`}
                        style={{ opacity: i === activeIndex ? 1 : 0, zIndex: 0 }} />
                );
            })}

            {/* ── Ambient orbs ── */}
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
                <div className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full transition-all duration-1000"
                    style={{ background: `radial-gradient(ellipse, ${theme.orb1} 0%, transparent 65%)`, filter: "blur(60px)" }} />
                <div className="absolute bottom-[-20%] right-[-5%] w-[50vw] h-[50vw] rounded-full transition-all duration-1000"
                    style={{ background: `radial-gradient(ellipse, ${theme.orb2} 0%, transparent 65%)`, filter: "blur(80px)" }} />
                {/* Film grain */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />
            </div>

            {/* ── Diagonal gold accent ── */}
            <div className="absolute inset-0 z-[2] pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <line x1="62%" y1="0%" x2="38%" y2="100%" stroke="rgba(201,162,39,0.08)" strokeWidth="1.5" />
                    <line x1="64%" y1="0%" x2="40%" y2="100%" stroke="rgba(201,162,39,0.03)" strokeWidth="4" />
                </svg>
            </div>

            {/* ── Main content ── */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Content area — grows to fill, leaving room for bottom nav */}
                <div className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 md:px-10 flex items-center">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-center">

                        {/* LEFT: Text */}
                        <div className="flex flex-col items-start">
                            {/* Slide counter */}
                            <div className="flex items-center gap-3 mb-6 md:mb-8">
                                <span className="text-[11px] font-body font-semibold tracking-[0.3em] uppercase" style={{ color: theme.accent }}>
                                    {String(activeIndex + 1).padStart(2, "0")}
                                </span>
                                <div className="h-px w-10" style={{ background: `${theme.accent}55` }} />
                                <span className="text-[11px] font-body text-white/25">{String(TOTAL).padStart(2, "0")}</span>
                            </div>

                            {/* Eyebrow */}
                            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border"
                                style={{
                                    borderColor: `${theme.accent}30`, background: `${theme.accent}10`,
                                    transition: "opacity 0.4s, transform 0.5s",
                                    opacity: textVisible ? 1 : 0,
                                    transform: textVisible ? "translateY(0)" : "translateY(12px)",
                                    transitionDelay: "0ms",
                                }}>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.accent }} />
                                <span className="font-body text-[11px] tracking-[0.25em] uppercase" style={{ color: theme.accent }}>{slide.eyebrow}</span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[3.6rem] font-bold text-white leading-[1.08] mb-5"
                                style={{
                                    transition: "opacity 0.55s, transform 0.6s",
                                    opacity: textVisible ? 1 : 0,
                                    transform: textVisible ? "translateY(0)" : "translateY(20px)",
                                    transitionDelay: "60ms",
                                }}>
                                {slide.title}
                            </h1>

                            {/* Description */}
                            <p className="font-body text-white/50 text-sm md:text-base leading-relaxed max-w-lg mb-8"
                                style={{
                                    transition: "opacity 0.55s, transform 0.6s",
                                    opacity: textVisible ? 1 : 0,
                                    transform: textVisible ? "translateY(0)" : "translateY(14px)",
                                    transitionDelay: "120ms",
                                }}>
                                {slide.description}
                            </p>

                            {/* CTAs */}
                            <div className="flex items-center gap-4"
                                style={{
                                    transition: "opacity 0.55s, transform 0.6s",
                                    opacity: textVisible ? 1 : 0,
                                    transform: textVisible ? "translateY(0)" : "translateY(12px)",
                                    transitionDelay: "180ms",
                                }}>
                                <Link href={slide.ctaLink}
                                    className="group inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wide px-6 py-3 rounded-full transition-all duration-300"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.accent}, #e8c766)`,
                                        color: "#0b1e3d",
                                        boxShadow: `0 6px 28px ${theme.accent}45`,
                                    }}>
                                    {slide.ctaText}
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/products" className="font-body text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
                                    View All <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT: Orbit panel — hidden on mobile */}
                        <div className="hidden lg:flex items-center justify-center">
                            <div className="relative w-[360px] h-[360px]">

                                {/* Decorative concentric rings */}
                                {[1, 0.7, 0.42].map((scale, ri) => (
                                    <div key={ri} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
                                        style={{
                                            width: `${scale * 100}%`, height: `${scale * 100}%`,
                                            borderColor: `${theme.accent}${ri === 2 ? "22" : "12"}`,
                                            transition: "border-color 0.7s",
                                        }} />
                                ))}

                                {/* Continuously spinning orbit track that carries all icons */}
                                <div className="absolute inset-0 rounded-full"
                                    style={{ animation: "orbit-spin 18s linear infinite" }}>
                                    {slide.icons.map((catSlug, i) => {
                                        const Icon = categoryIcons[catSlug];
                                        const angleDeg = ICON_ANGLES[i];
                                        const angleRad = (angleDeg * Math.PI) / 180;
                                        // Icons sit at 50% radius of the container (180px from center)
                                        const r = 50; // percent-radius from centre
                                        const cx = (50 + r * Math.cos(angleRad)).toFixed(2);
                                        const cy = (50 + r * Math.sin(angleRad)).toFixed(2);
                                        return (
                                            <div key={i}
                                                className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                                                style={{
                                                    left: `${cx}%`, top: `${cy}%`,
                                                    background: "rgba(255,255,255,0.04)",
                                                    border: `1px solid ${theme.accent}28`,
                                                    backdropFilter: "blur(8px)",
                                                    boxShadow: "0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                                                    // Counter-rotate each icon so it stays upright
                                                    animation: "orbit-spin 18s linear infinite reverse",
                                                }}>
                                                <Icon size={18} style={{ color: theme.accent }} strokeWidth={1.4} />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Centre: V-Gradient logo */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-28 flex items-center justify-center"
                                    style={{
                                        filter: `drop-shadow(0 0 18px ${theme.accent}50) drop-shadow(0 0 40px ${theme.accent}25)`,
                                    }}>
                                    <img
                                        src="/assets/logo/v-logo/V-Gradient.svg"
                                        alt="Innovative Collectives"
                                        className="w-full h-full object-contain"
                                        draggable={false}
                                    />
                                </div>

                                {/* Center glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                                    style={{
                                        width: "38%", height: "38%",
                                        background: `radial-gradient(ellipse, ${theme.accent}18 0%, transparent 70%)`,
                                        filter: "blur(12px)",
                                        animation: "center-glow 3s ease-in-out infinite",
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom bar: arrows + progress strips ── */}
                <div className="relative z-20 flex items-center max-w-7xl w-full mx-auto px-5 sm:px-8 md:px-10 pb-5 pt-3 gap-4">
                    {/* Prev arrow */}
                    <button aria-label="Previous slide" onClick={handlePrev}
                        className="group shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                        <ArrowLeft size={16} className="text-white/60 group-hover:text-white transition-colors" />
                    </button>

                    {/* Progress strips — grow to fill */}
                    <div className="flex-1 flex gap-1.5">
                        {heroSlides.map((_, i) => (
                            <button key={i} aria-label={`Go to slide ${i + 1}`}
                                onClick={() => { navigate(i); resetAutoPlay(); }}
                                className="flex-1 h-[3px] rounded-full overflow-hidden relative transition-colors"
                                style={{ background: "rgba(255,255,255,0.10)" }}>
                                {i === activeIndex && (
                                    <div className="absolute inset-0 origin-left rounded-full"
                                        style={{
                                            background: `linear-gradient(90deg, ${theme.accent}, #e8c766)`,
                                            animation: "slide-progress 6s linear forwards",
                                        }} />
                                )}
                                {i < activeIndex && (
                                    <div className="absolute inset-0 rounded-full" style={{ background: `${theme.accent}55` }} />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Next arrow */}
                    <button aria-label="Next slide" onClick={handleNext}
                        className="group shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                        <ArrowRight size={16} className="text-white/60 group-hover:text-white transition-colors" />
                    </button>
                </div>
            </div>

            {/* ── Keyframes ── */}
            <style>{`
                @keyframes orbit-spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes center-glow {
                    0%,100% { opacity:0.7; transform:translate(-50%,-50%) scale(1); }
                    50%     { opacity:1;   transform:translate(-50%,-50%) scale(1.25); }
                }
                @keyframes slide-progress {
                    from { transform:scaleX(0); }
                    to   { transform:scaleX(1); }
                }
            `}</style>
        </section>
    );
}