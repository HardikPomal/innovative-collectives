import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "@/data/products";
import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import CategoryClient from "./CategoryClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const category = categories.find((c) => c.slug === slug);
    
    if (!category) return { title: "Category Not Found" };
    
    return {
        title: `${category.name} | Innovative Collectives`,
        description: `Explore our premium collection of ${category.name.toLowerCase()} at Innovative Collectives.`,
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Next.js 16 requires awaiting params in dynamic routes
    const { slug } = await params;
    
    const category = categories.find((c) => c.slug === slug);
    if (!category) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-cream pb-20">
            {/* Category Banner */}
            <div className="bg-navy py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy-light to-navy" />
                
                {/* Decorative mesh */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center flex flex-col items-center">
                    <span className="font-body text-gold text-xs tracking-[0.3em] uppercase mb-4">
                        Category
                    </span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-ivory mb-6">
                        {category.name}
                    </h1>
                    <div className="h-px w-24 bg-gold/30 mb-6" />
                    <p className="font-body text-cream/70 text-lg max-w-2xl mx-auto">
                        Explore our curated collection of premium {category.name.toLowerCase()}, handpicked for exceptional quality and timeless style.
                    </p>
                </div>
            </div>

            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 border-b border-navy/5 mb-8">
                <nav className="flex text-sm text-navy/50 font-body">
                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
                    <span className="mx-2">/</span>
                    <span className="text-navy">{category.name}</span>
                </nav>
            </div>

            <CategoryClient slugPromise={Promise.resolve(slug)} />
        </main>
    );
}

export function generateStaticParams() {
    return categories.map((cat) => ({
        slug: cat.slug,
    }));
}
