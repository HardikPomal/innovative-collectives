// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

const CHANNELS = [
    { icon: Mail, label: "Email", value: "support@innovativecollectives.com", href: "mailto:support@innovativecollectives.com" },
    { icon: Phone, label: "Phone", value: "+91 90000 00000", href: "tel:+919000000000" },
    { icon: MapPin, label: "Address", value: "Ahmedabad, Gujarat, India", href: null },
];

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSending(true);
        await new Promise((res) => setTimeout(res, 1000));
        setIsSending(false);
        setSent(true);
    }

    return (
        <main>
            {/* Hero */}
            <section className="bg-navy text-cream py-16 md:py-20 px-4 md:px-6 text-center">
                <p className="font-body text-xs text-gold uppercase tracking-[0.18em] mb-3">We&apos;re here</p>
                <h1 className="font-heading text-4xl md:text-5xl mb-4">Get in touch</h1>
                <p className="font-body text-base text-cream/65 max-w-md mx-auto">
                    Our concierge team responds within 2 business hours. Premium clients receive priority support.
                </p>
            </section>

            <section className="max-w-5xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-5 gap-10">
                {/* Contact channels */}
                <div className="md:col-span-2 space-y-4">
                    <h2 className="font-heading text-xl text-navy mb-6">Contact channels</h2>
                    {CHANNELS.map(({ icon: Icon, label, value, href }) => (
                        <div key={label} className="flex items-start gap-4 bg-ivory border border-navy/8 rounded-2xl p-4">
                            <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                                <Icon size={16} className="text-gold" strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="font-body text-xs text-navy/45 mb-0.5">{label}</p>
                                {href ? (
                                    <a href={href} className="font-body text-sm text-navy hover:text-gold transition-colors">{value}</a>
                                ) : (
                                    <p className="font-body text-sm text-navy">{value}</p>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="bg-gold/8 border border-gold/20 rounded-2xl p-4 mt-6">
                        <p className="font-body text-xs font-semibold text-navy mb-1">Response times</p>
                        <ul className="font-body text-xs text-navy/60 space-y-1">
                            <li>Email — within 2 business hours</li>
                            <li>Phone — Mon–Sat, 10 AM – 7 PM IST</li>
                            <li>Premium clients — 24/7 priority line</li>
                        </ul>
                    </div>
                </div>

                {/* Form */}
                <div className="md:col-span-3 bg-ivory border border-navy/8 rounded-3xl p-6 md:p-8">
                    {sent ? (
                        <div className="flex flex-col items-center text-center py-12">
                            <CheckCircle size={40} className="text-emerald-500 mb-4" strokeWidth={1.5} />
                            <h2 className="font-heading text-2xl text-navy mb-2">Message sent!</h2>
                            <p className="font-body text-sm text-navy/60">Our team will get back to you within 2 business hours.</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="font-heading text-xl text-navy mb-6">Send a message</h2>
                            <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <TextField id="contact-name" label="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" required />
                                    <TextField id="contact-email" label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" required />
                                </div>
                                <TextField id="contact-subject" label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} autoComplete="off" required />

                                {/* Textarea field */}
                                <div className="relative">
                                    <label htmlFor="contact-message" className="block font-body text-xs font-medium text-navy/60 mb-1.5">
                                        Message <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={5}
                                        required
                                        className="w-full bg-cream border border-navy/12 rounded-xl px-4 py-3 font-body text-sm text-navy placeholder-navy/30 focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/15 transition resize-none"
                                        placeholder="Tell us how we can help..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    isLoading={isSending}
                                    icon={<ArrowRight size={15} />}
                                    iconPosition="left"
                                >
                                    Send message
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
