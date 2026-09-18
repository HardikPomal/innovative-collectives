// app/privacy/page.tsx
const LAST_UPDATED = "September 10, 2026";

const SECTIONS = [
    {
        title: "1. Information we collect",
        body: `We collect information you provide directly, such as name, email address, phone number, shipping address, and payment details when you create an account, place an order, or contact us. We also automatically collect certain technical data including IP address, browser type, device identifiers, and browsing behaviour on our platform through cookies and similar technologies.`,
    },
    {
        title: "2. How we use your information",
        body: `We use collected information to: process and fulfil your orders; communicate order status, shipping updates, and receipts; personalise your shopping experience and recommendations; detect and prevent fraud and unauthorised access; comply with legal obligations; and, where you have opted in, send you marketing communications about new arrivals and exclusive offers.`,
    },
    {
        title: "3. Sharing your information",
        body: `We do not sell your personal data. We share it only with: logistics and courier partners required to deliver your order; payment processors operating under PCI-DSS standards; fraud prevention and identity verification services; and government or regulatory authorities when legally required. All third parties are contractually bound to process data only for specified purposes.`,
    },
    {
        title: "4. Data retention",
        body: `We retain your personal data for as long as your account is active or as needed to provide services. Order and transaction records are retained for 7 years in compliance with Indian tax regulations. You may request deletion of your account data at any time, subject to legal retention requirements.`,
    },
    {
        title: "5. Cookies",
        body: `We use essential cookies to operate the website, functional cookies to remember your preferences, and analytical cookies (e.g. Google Analytics) to understand how visitors use the platform. You may disable non-essential cookies via your browser settings. Note that some features may not function correctly without essential cookies.`,
    },
    {
        title: "6. Your rights",
        body: `Under applicable Indian data protection law (DPDP Act, 2023), you have the right to: access the personal data we hold about you; correct inaccurate data; erase your data (right to be forgotten); withdraw consent for marketing; and file a grievance with our Data Protection Officer at privacy@innovativecollectives.com.`,
    },
    {
        title: "7. Security",
        body: `We implement industry-standard security measures including TLS encryption for data in transit, AES-256 encryption for data at rest, access controls, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
        title: "8. Changes to this policy",
        body: `We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on the website at least 7 days before taking effect. Continued use of the platform after changes constitutes acceptance of the updated policy.`,
    },
    {
        title: "9. Contact",
        body: `For any privacy-related queries or to exercise your rights, contact our Data Protection Officer at privacy@innovativecollectives.com or write to: Innovative Collectives, Ahmedabad, Gujarat, India.`,
    },
];

export default function PrivacyPage() {
    return (
        <main>
            <section className="bg-navy text-cream py-16 md:py-20 px-4 md:px-6 text-center">
                <p className="font-body text-xs text-gold uppercase tracking-[0.18em] mb-3">Legal</p>
                <h1 className="font-heading text-4xl md:text-5xl mb-4">Privacy Policy</h1>
                <p className="font-body text-sm text-cream/50">Last updated: {LAST_UPDATED}</p>
            </section>

            <section className="max-w-3xl mx-auto px-4 md:px-6 py-14">
                <div className="bg-ivory border border-navy/8 rounded-3xl p-2 overflow-hidden">
                    {SECTIONS.map(({ title, body }, i) => (
                        <div
                            key={title}
                            className={`px-6 py-6 ${i < SECTIONS.length - 1 ? "border-b border-navy/6" : ""}`}
                        >
                            <h2 className="font-heading text-base text-navy mb-2">{title}</h2>
                            <p className="font-body text-sm text-navy/60 leading-relaxed">{body}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
