// components/auth/EditorialPanel.tsx
import Link from "next/link";

export default function EditorialPanel({
    quote,
}: {
    image?: string; // kept for API compat but unused
    quote: string;
}) {
    return (
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-navy p-12 xl:p-16 h-full min-h-0">
            {/* Desktop panel — pure CSS, no external images */}

                {/* ── Geometric background decoration ── */}
                {/* Large circle — top right */}
                <div
                    className="absolute -top-28 -right-28 w-[420px] h-[420px] rounded-full"
                    style={{ border: "1px solid rgba(201,162,39,0.12)" }}
                />
                {/* Medium circle — bottom left */}
                <div
                    className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full"
                    style={{ border: "1px solid rgba(201,162,39,0.10)" }}
                />
                {/* Inner echo — bottom left */}
                <div
                    className="absolute -bottom-4 -left-4 w-[180px] h-[180px] rounded-full"
                    style={{ border: "1px solid rgba(201,162,39,0.08)" }}
                />
                {/* Diagonal rule — decorative */}
                <div
                    className="absolute top-0 right-0 w-px h-full opacity-10"
                    style={{ background: "linear-gradient(to bottom, transparent, #C9A227, transparent)" }}
                />
                {/* Dot grid — subtle pattern */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #C9A227 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                {/* ── Content ── */}

                {/* Centred brand badge */}
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-8 py-12">
                    {/* Monogram ring */}
                    <div className="relative flex items-center justify-center">
                        <div
                            className="w-36 h-36 rounded-full flex items-center justify-center"
                            style={{
                                border: "1px solid rgba(201,162,39,0.35)",
                                boxShadow: "0 0 60px rgba(201,162,39,0.08)",
                            }}
                        >
                            <div
                                className="w-24 h-24 rounded-full flex items-center justify-center"
                                style={{
                                    border: "1px solid rgba(201,162,39,0.6)",
                                    background: "rgba(201,162,39,0.06)",
                                }}
                            >
                                <img
                                    src="/assets/logo/i-logo/I-Gradient.svg"
                                    alt="Innovative Collectives"
                                    className="w-14 h-14 object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tagline */}
                    <div className="space-y-3 max-w-xs">
                        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold/60">
                            Innovative Collectives
                        </p>
                        <p className="font-body text-xs tracking-[0.2em] uppercase text-ivory/30">
                            Premium · Curated · Timeless
                        </p>
                    </div>
                </div>

                {/* Bottom quote */}
                <div className="relative z-10 max-w-sm">
                    <div className="w-10 h-px bg-gold mb-6 opacity-70" />
                    <p className="font-heading text-2xl xl:text-3xl text-ivory/90 leading-snug">
                        {quote}
                    </p>
                </div>
            </div>
    );
}