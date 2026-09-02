"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
    const [phase, setPhase] = useState<"visible" | "exiting" | "done">("done");

    useEffect(() => {
        const hasShown = sessionStorage.getItem("splashShown");
        if (hasShown) {
            setPhase("done");
            return;
        }

        setPhase("visible");
        sessionStorage.setItem("splashShown", "true");

        // Shortened duration: 2.2s visible + 1s exit transition = 3.2s total
        const exitTimer = setTimeout(() => setPhase("exiting"), 2200);
        const doneTimer = setTimeout(() => setPhase("done"), 3200);
        return () => {
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
        };
    }, []);

    if (phase === "done") return null;

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out ${phase === "exiting"
                    ? "opacity-0 scale-105 pointer-events-none"
                    : "opacity-100 scale-100"
                }`}
            style={{ background: "#05050a" }}
        >
            {/* ── Ambient radial glow ── */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                        width: "600px",
                        height: "600px",
                        background: "radial-gradient(ellipse at center, rgba(196,154,60,0.15) 0%, rgba(168,116,0,0.05) 45%, transparent 70%)",
                        animation: "glow-pulse 2s ease-in-out infinite",
                    }}
                />
            </div>

            {/* ── Logo wrapper ── */}
            <div className="relative" style={{ animation: "logo-rise 0.8s cubic-bezier(0.22,1,0.36,1) both" }}>
                {/* Halo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{
                        width: "220px", height: "220px",
                        background: "radial-gradient(ellipse at center, rgba(196,154,60,0.2) 0%, transparent 65%)",
                        filter: "blur(20px)",
                        animation: "halo-breathe 2.2s ease-in-out infinite",
                    }}
                />

                <img
                    src="/assets/logo/i-logo/I-3D.svg"
                    alt="Innovative Collectives"
                    className="relative z-10 w-40 h-40 object-contain"
                    style={{
                        filter: "drop-shadow(0 0 24px rgba(196,154,60,0.6))",
                        animation: "logo-shimmer 2.2s ease-in-out infinite",
                    }}
                />
            </div>

            {/* ── Wordmark ── */}
            <div className="mt-8 text-center" style={{ animation: "wordmark-rise 1s 0.2s cubic-bezier(0.22,1,0.36,1) both" }}>
                <p style={{ color: "rgba(196,154,60,0.55)", letterSpacing: "0.55em", fontSize: "11px", fontWeight: 300, textTransform: "uppercase", animation: "letter-fade 1.5s 0.3s ease-out both" }}>Innovative</p>
                <p style={{ color: "rgba(196,154,60,0.3)", letterSpacing: "0.9em", fontSize: "9px", fontWeight: 200, textTransform: "uppercase", marginTop: "4px", animation: "letter-fade 1.8s 0.4s ease-out both" }}>Collectives</p>
            </div>

            {/* ── Keyframes ── */}
            <style>{`
                @keyframes glow-pulse {
                    0%,100%{opacity:.75;transform:translate(-50%,-50%) scale(1)}
                    50%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}
                }
                @keyframes halo-breathe {
                    0%,100%{opacity:.65;transform:translate(-50%,-50%) scale(1)}
                    50%{opacity:1;transform:translate(-50%,-50%) scale(1.2)}
                }
                @keyframes logo-rise {
                    from{opacity:0;transform:translateY(30px) scale(.85)}
                    to{opacity:1;transform:translateY(0) scale(1)}
                }
                @keyframes logo-shimmer {
                    0%,100%{filter:drop-shadow(0 0 20px rgba(196,154,60,.5))}
                    50%{filter:drop-shadow(0 0 45px rgba(255,248,200,.8)) drop-shadow(0 0 65px rgba(196,154,60,.4))}
                }
                @keyframes wordmark-rise {
                    from{opacity:0;transform:translateY(12px)}
                    to{opacity:1;transform:translateY(0)}
                }
                @keyframes letter-fade {
                    from{opacity:0}
                    to{opacity:1}
                }
            `}</style>
        </div>
    );
}
