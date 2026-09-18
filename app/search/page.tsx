import Link from "next/link";
import { Search } from "lucide-react";
import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
    const { q = "" } = await searchParams;
    const query = Array.isArray(q) ? q[0] : q;

    return {
        title: query
            ? `Search Results for "${query}" | Innovative Collectives`
            : "Search | Innovative Collectives",
        description: query
            ? `Find premium products matching "${query}" at Innovative Collectives.`
            : "Search for premium mobiles, bags, wallets, watches, perfumes, and sunglasses.",
    };
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { q = "" } = await searchParams;
    const query = Array.isArray(q) ? q[0] : q;
    const hasQuery = query.trim().length > 0;

    return (
        <main className="min-h-screen bg-cream pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-body text-navy/50 mb-6">
                    <Link href="/" className="hover:text-gold transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-navy font-medium">Search Results</span>
                    {hasQuery && (
                        <>
                            <span>/</span>
                            <span className="text-navy/70 truncate max-w-xs">&ldquo;{query}&rdquo;</span>
                        </>
                    )}
                </nav>

                {/* Page Title & Count Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-navy/10 mb-8">
                    <div>
                        <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy">
                            {hasQuery ? (
                                <>
                                    Results for &ldquo;{query}&rdquo;
                                </>
                            ) : (
                                "Search"
                            )}
                        </h1>
                    </div>
                </div>

                <SearchClient queryPromise={Promise.resolve(query)} />
            </div>
        </main>
    );
}
