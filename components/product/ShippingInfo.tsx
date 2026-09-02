"use client";

import { useState } from "react";
import { Truck, RotateCcw, ShieldCheck, ChevronDown } from "lucide-react";

const infoItems = [
    {
        icon: Truck,
        title: "Delivery",
        content:
            "Estimated delivery in 3-5 business days across India. Free shipping on orders above Rs. 5,000.",
    },
    {
        icon: RotateCcw,
        title: "Returns & Exchange",
        content:
            "Easy 7-day return and exchange policy. Item must be unused and in original packaging.",
    },
    {
        icon: ShieldCheck,
        title: "Authenticity Guarantee",
        content:
            "Every product is 100% genuine, sourced directly from authorized brand partners.",
    },
];

export default function ShippingInfo() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="mt-8 pt-6 border-t border-navy/10 flex flex-col gap-1">
            {infoItems.map((item, index) => {
                const Icon = item.icon;
                const isOpen = openIndex === index;
                return (
                    <div key={item.title} className="border-b border-navy/5 last:border-0">
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="w-full flex items-center justify-between py-3 text-left"
                        >
                            <span className="flex items-center gap-2.5">
                                <Icon size={16} className="text-gold" strokeWidth={1.5} />
                                <span className="font-body text-sm font-medium text-navy">
                                    {item.title}
                                </span>
                            </span>
                            <ChevronDown
                                size={16}
                                className={`text-navy/40 transition-transform ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {isOpen && (
                            <p className="font-body text-xs text-navy/55 leading-relaxed pb-3 pl-[26px]">
                                {item.content}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}