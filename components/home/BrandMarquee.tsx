import { brands } from "@/data/brands";

export default function BrandMarquee() {
    // Duplicate the list so the scroll loop is seamless
    const loopedBrands = [...brands, ...brands];

    return (
        <section className="bg-white border-y border-navy/5 py-10 overflow-hidden">
            <p className="text-center font-body text-[11px] tracking-[0.3em] uppercase text-navy mb-6">
                Brands We Carry
            </p>

            <div className="relative flex overflow-hidden">
                <div className="flex animate-marquee gap-16 pr-16 shrink-0">
                    {loopedBrands.map((brand, i) => (
                        <span
                            key={`${brand}-${i}`}
                            className="font-heading text-2xl md:text-3xl text-navy/60 whitespace-nowrap select-none"
                        >
                            {brand}
                        </span>
                    ))}
                </div>
                {/* Second copy for a perfectly seamless infinite loop */}
                <div
                    className="flex animate-marquee gap-16 pr-16 shrink-0"
                    aria-hidden="true"
                >
                    {loopedBrands.map((brand, i) => (
                        <span
                            key={`${brand}-dup-${i}`}
                            className="font-heading text-2xl md:text-3xl text-navy/60 whitespace-nowrap select-none"
                        >
                            {brand}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}