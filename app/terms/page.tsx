// app/terms/page.tsx
const LAST_UPDATED = "September 10, 2026";

const SECTIONS = [
    {
        title: "1. Acceptance of terms",
        body: `By accessing or using the Innovative Collectives website and services, you confirm that you are at least 18 years of age and agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use immediately.`,
    },
    {
        title: "2. Products and pricing",
        body: `All product descriptions, images, and pricing are maintained with reasonable care. However, we reserve the right to correct errors, update prices, or discontinue products without prior notice. Prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise. We are not obligated to fulfil orders placed at incorrect prices resulting from typographical errors.`,
    },
    {
        title: "3. Ordering and contract formation",
        body: `An order placed through our platform constitutes an offer to purchase. A binding contract is formed only when we dispatch your order and send a dispatch confirmation email. We reserve the right to decline any order at our discretion, including where products are out of stock, payment cannot be verified, or the order appears fraudulent.`,
    },
    {
        title: "4. Payment",
        body: `Payment is due at the time of order placement for card transactions. For Cash on Delivery orders, payment is due at the time of delivery. We use PCI-DSS-compliant payment gateways. You represent that you are authorised to use the payment method provided.`,
    },
    {
        title: "5. Intellectual property",
        body: `All content on the Innovative Collectives platform — including but not limited to text, images, logos, UI design, and product descriptions — is owned by or licensed to Innovative Collectives and protected under Indian and international intellectual property law. You may not copy, reproduce, distribute, or create derivative works without our express written consent.`,
    },
    {
        title: "6. Limitation of liability",
        body: `To the maximum extent permitted by law, Innovative Collectives shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform or from any products purchased. Our total liability for any claim shall not exceed the amount paid for the specific order giving rise to the claim.`,
    },
    {
        title: "7. Governing law",
        body: `These Terms & Conditions are governed by and construed in accordance with the laws of the Republic of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.`,
    },
    {
        title: "8. Amendments",
        body: `We reserve the right to update these Terms at any time. Significant changes will be communicated via email or site-wide notice at least 7 days before taking effect. Continued use of the platform following notice of changes constitutes your acceptance of the revised Terms.`,
    },
    {
        title: "9. Contact",
        body: `For queries about these Terms, contact us at legal@innovativecollectives.com or write to: Innovative Collectives, Ahmedabad, Gujarat, India.`,
    },
];

export default function TermsPage() {
    return (
        <main>
            <section className="bg-navy text-cream py-16 md:py-20 px-4 md:px-6 text-center">
                <p className="font-body text-xs text-gold uppercase tracking-[0.18em] mb-3">Legal</p>
                <h1 className="font-heading text-4xl md:text-5xl mb-4">Terms &amp; Conditions</h1>
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
