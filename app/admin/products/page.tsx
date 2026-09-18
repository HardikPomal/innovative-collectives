"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, ExternalLink, AlertCircle, Package } from "lucide-react";
import { categories } from "@/data/products";
import { getProducts, deleteProduct } from "@/lib/db/api";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import type { Product } from "@/types";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Pagination from "@/components/ui/Pagination";

export default function AdminProductsPage() {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStock, setSelectedStock] = useState("all");
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [saved, setSaved] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        getProducts().then((data) => {
            setProductsList(data);
            setIsLoading(false);
        });
    }, []);

    const showToast = (msg: string) => {
        setSaved(msg);
        setTimeout(() => setSaved(null), 3000);
    };

    const filtered = productsList.filter((p) => {
        const q = searchQuery.toLowerCase();
        const matchSearch =
            p.name.toLowerCase().includes(q) ||
            (p.brand?.toLowerCase().includes(q) ?? false) ||
            (p.sku?.toLowerCase().includes(q) ?? false);
        const matchCat = selectedCategory === "all" || p.category === selectedCategory;
        const matchStock =
            selectedStock === "all" ||
            (selectedStock === "in-stock" && p.inStock) ||
            (selectedStock === "out-of-stock" && !p.inStock);
        const matchFeatured = !showFeaturedOnly || p.featured;
        return matchSearch && matchCat && matchStock && matchFeatured;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedProducts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const confirmDelete = async () => {
        if (!deleteId) return;
        const target = productsList.find((p) => p.id === deleteId);
        await deleteProduct(deleteId);
        setProductsList((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
        showToast(`"${target?.name}" removed from platform.`);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Toast */}
            {saved && (
                <div className="fixed bottom-5 right-5 z-50 bg-navy shadow-md px-5 py-3 text-sm text-ivory font-medium border border-navy/20 rounded-lg">
                    {saved}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-navy">
                        Products
                        <span className="ml-3 text-sm font-body text-navy/60">
                            ({productsList.length} items)
                        </span>
                    </h1>
                    <p className="text-navy/70 mt-1">
                        Manage all inventory across luxury categories.
                    </p>
                </div>
                <Button
                    href="/admin/products/new"
                    variant="secondary"
                    icon={<Plus size={16} />}
                >
                    Add Product
                </Button>
            </div>

            {/* Toolbar */}
            <div className="bg-ivory border border-navy/10 p-5 flex flex-col md:flex-row gap-4 shadow-sm rounded-2xl items-start md:items-center">
                <div className="flex-1 min-w-0 w-full">
                    <TextField
                        id="search"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        placeholder="Search by name, brand, or SKU..."
                        icon={<Search size={16} />}
                    />
                </div>
                <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                        className="flex-1 sm:flex-none px-4 py-2.5 border border-navy/20 rounded-lg text-sm text-navy focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-ivory transition-colors"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((c) => (
                            <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                    </select>
                    <select
                        value={selectedStock}
                        onChange={(e) => { setSelectedStock(e.target.value); setCurrentPage(1); }}
                        className="flex-1 sm:flex-none px-4 py-2.5 border border-navy/20 rounded-lg text-sm text-navy focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-ivory transition-colors"
                    >
                        <option value="all">All Status</option>
                        <option value="in-stock">In Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>
                    <button
                        onClick={() => { setShowFeaturedOnly(!showFeaturedOnly); setCurrentPage(1); }}
                        title="Filter by featured products"
                        className={`flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors shrink-0 ${showFeaturedOnly ? "border-gold bg-gold/10 text-gold" : "border-navy/20 bg-ivory text-navy hover:border-gold hover:text-gold"}`}
                    >
                        <span className={`w-2 h-2 rounded-full ${showFeaturedOnly ? "bg-gold" : "bg-transparent border border-navy/40"}`} />
                        Featured
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-ivory border border-navy/10 shadow-sm rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-cream text-navy">
                                {["Product", "Brand", "Category", "Price", "Stock", ""].map((h) => (
                                    <th
                                        key={h}
                                        className={`py-3 px-5 font-heading uppercase tracking-wider text-xs ${h === "" ? "text-right" : ""}`}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center bg-cream">
                                        <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                        <p className="font-heading text-lg text-navy">Loading products...</p>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center bg-cream">
                                        <Package size={32} className="mx-auto mb-3 text-navy/30" />
                                        <p className="font-heading text-lg text-navy">No products found</p>
                                        <p className="text-sm text-navy/60 mt-1">Try adjusting your filters.</p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedProducts.map((product) => {
                                    const discount = getDiscountPercent(product.price, product.compareAtPrice);
                                    return (
                                        <tr key={product.id} className="border-b border-navy/5 hover:bg-cream/50 transition-colors text-navy/80">
                                            <td className="py-4 px-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-cream overflow-hidden shrink-0 border border-navy/10 rounded">
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Link
                                                            href={`/admin/products/${product.id}`}
                                                            className="font-medium text-navy hover:text-gold transition-colors line-clamp-1 inline-flex items-center gap-1.5"
                                                        >
                                                            {product.name}
                                                            {product.featured && (
                                                                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-gold" title="Featured Product" />
                                                            )}
                                                        </Link>
                                                        <p className="font-mono text-xs text-navy/60 mt-1">
                                                            {product.sku || `IC-${product.id}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-5">
                                                {product.brand || "—"}
                                            </td>
                                            <td className="py-4 px-5">
                                                <span className="text-xs uppercase tracking-wider font-semibold">
                                                    {product.category.replace(/-/g, " ")}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5">
                                                <span className="font-medium text-navy">{formatPrice(product.price)}</span>
                                                {discount && (
                                                    <span className="ml-2 text-xs text-navy/50 line-through">
                                                        {formatPrice(product.compareAtPrice!)}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-5">
                                                {product.inStock ? (
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-navy flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-5 text-right">
                                                <div className="flex items-center justify-end gap-4">
                                                    <Link
                                                        href={`/products/${product.slug}`}
                                                        target="_blank"
                                                        title="View on site"
                                                        className="text-navy/60 hover:text-navy transition-colors"
                                                    >
                                                        <ExternalLink size={16} />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/products/${product.id}`}
                                                        title="Edit"
                                                        className="text-navy/60 hover:text-gold transition-colors"
                                                    >
                                                        <Edit2 size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => setDeleteId(product.id)}
                                                        title="Delete"
                                                        className="text-navy/60 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 backdrop-blur-sm">
                    <div className="bg-ivory border border-navy/20 shadow-xl rounded-2xl p-6 max-w-sm w-full">
                        <div className="flex items-start gap-4 mb-6">
                            <AlertCircle size={24} className="text-red-600 shrink-0" />
                            <div>
                                <h3 className="font-heading text-lg text-navy">Remove Product</h3>
                                <p className="text-sm text-navy/70 mt-2 leading-relaxed">
                                    This will permanently remove the item from the platform. This action cannot be undone.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button
                                onClick={() => setDeleteId(null)}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmDelete}
                                className="!bg-red-600 !text-white hover:!bg-red-700 !border-red-600"
                            >
                                Delete Product
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
