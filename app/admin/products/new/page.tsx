"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, AlertCircle, Check, ImageIcon } from "lucide-react";
import { categories } from "@/data/products";
import { createProduct, getProducts } from "@/lib/db/api";
import { getDiscountPercent } from "@/lib/utils";
import type { CategorySlug, Product } from "@/types";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import FeaturedLimitModal from "@/components/admin/FeaturedLimitModal";
import ImageLightbox from "@/components/ui/ImageLightbox";

export default function AddProductPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState<CategorySlug>("mobiles");
    const [price, setPrice] = useState("");
    const [compareAtPrice, setCompareAtPrice] = useState("");
    const [sku, setSku] = useState("");
    const [inStock, setInStock] = useState(true);
    const [description, setDescription] = useState("");
    const [specs, setSpecs] = useState<{ label: string; value: string }[]>([
        { label: "", value: "" },
    ]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [featured, setFeatured] = useState(false);
    const [featuredCount, setFeaturedCount] = useState(0);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Fetch initial featured count
    useEffect(() => {
        getProducts().then(products => {
            const featuredList = products.filter(p => p.featured);
            setFeaturedProducts(featuredList);
            setFeaturedCount(featuredList.length);
        });
    }, []);

    const handleFeaturedToggle = () => {
        if (!featured && featuredCount >= 8) {
            setShowLimitModal(true);
            return;
        }
        setFeatured(!featured);
    };

    const handleProductRemoved = (removedId: string) => {
        setFeaturedProducts(prev => prev.filter(p => p.id !== removedId));
        setFeaturedCount(prev => prev - 1);
        setShowLimitModal(false);
        setFeatured(true);
    };

    const handleNameChange = (val: string) => {
        setName(val);
        setSlug(val.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"));
    };

    const addSpec = () => setSpecs((p) => [...p, { label: "", value: "" }]);
    const updateSpec = (i: number, f: "label" | "value", v: string) =>
        setSpecs((p) => p.map((s, idx) => (idx === i ? { ...s, [f]: v } : s)));
    const removeSpec = (i: number) => setSpecs((p) => p.filter((_, idx) => idx !== i));

    const removeImage = (i: number) => setImageUrls((p) => p.filter((_, idx) => idx !== i));

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setImageUrls(prev => [...prev, event.target!.result as string]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const numPrice = parseFloat(price) || 0;
    const numCompare = parseFloat(compareAtPrice) || 0;
    const discount = getDiscountPercent(numPrice, numCompare);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!name.trim()) { setError("Product title is required."); return; }
        if (numPrice <= 0) { setError("A valid selling price is required."); return; }
        setSaving(true);
        
        try {
            await createProduct({
                id: crypto.randomUUID(),
                slug,
                name,
                brand: brand || undefined,
                category,
                price: numPrice,
                compareAtPrice: numCompare > 0 ? numCompare : undefined,
                sku: sku || undefined,
                inStock,
                featured,
                images: imageUrls.filter(u => u.trim() !== ""),
                specifications: specs.filter(s => s.label.trim() && s.value.trim()),
                description: description || "",
                rating: 0,
                reviewCount: 0,
                reviews: []
            });
            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/products");
            }, 2000);
        } catch (err) {
            setError("Failed to create product.");
            setSaving(false);
        }
    };

    const inputCls = "w-full px-4 py-2.5 border border-navy/20 bg-ivory text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors rounded-lg";
    const labelCls = "block text-xs font-semibold text-navy/70 mb-2 uppercase tracking-wider";
    const cardCls = "bg-ivory border border-navy/10 shadow-sm rounded-2xl";

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        href="/admin/products"
                        variant="outline"
                        className="!p-2.5"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-heading text-navy">Add Product</h1>
                        <p className="text-navy/70 mt-1">Fill in the details to publish a new item.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        href="/admin/products"
                        variant="outline"
                    >
                        Discard
                    </Button>
                    <Button
                        type="submit"
                        form="add-product-form"
                        variant="secondary"
                        isLoading={saving}
                    >
                        Publish Product
                    </Button>
                </div>
            </div>

            {/* Feedback */}
            {error && (
                <div className="flex items-center gap-3 px-5 py-4 bg-ivory border-l-4 border-red-600 rounded-r-2xl text-red-600 text-sm font-medium shadow-sm">
                    <AlertCircle size={18} className="shrink-0" />
                    {error}
                </div>
            )}
            {success && (
                <div className="flex items-center gap-3 px-5 py-4 bg-ivory border-l-4 border-emerald-600 rounded-r-2xl text-emerald-600 text-sm font-medium shadow-sm">
                    <Check size={18} className="shrink-0" />
                    Product created successfully. Redirecting...
                </div>
            )}

            <form id="add-product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Main Details) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* General Info */}
                    <div className={cardCls}>
                        <div className="px-6 py-5 border-b border-navy/10">
                            <h2 className="text-lg font-heading text-navy">General Details</h2>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className={labelCls}>Product Title *</label>
                                <TextField
                                    id="name"
                                    value={name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="e.g. Rolex Datejust 41"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className={labelCls}>URL Slug</label>
                                    <TextField
                                        id="slug"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        placeholder="rolex-datejust-41"
                                        inputClassName="font-mono text-xs"
                                    />
                                </div>
                                <div>
                                    <label className={labelCls}>Brand</label>
                                    <TextField
                                        id="brand"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                        placeholder="e.g. Rolex"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>Description</label>
                                <textarea
                                    rows={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe craftsmanship, materials, provenance..."
                                    className={inputCls + " leading-relaxed"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className={cardCls}>
                        <div className="px-6 py-5 border-b border-navy/10 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                            <div>
                                <h2 className="text-lg font-heading text-navy">Specifications</h2>
                                <p className="text-xs text-navy/60 mt-1 max-w-sm">Define key details like material, size, or origin. Attributes appear as labels, values are the actual data.</p>
                            </div>
                            <button
                                type="button"
                                onClick={addSpec}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-gold transition-colors uppercase tracking-wider"
                            >
                                <Plus size={14} />
                                Add row
                            </button>
                        </div>
                        <div className="p-6 space-y-3">
                            {specs.map((spec, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <TextField
                                        id={`spec-label-${i}`}
                                        value={spec.label}
                                        onChange={(e) => updateSpec(i, "label", e.target.value)}
                                        placeholder="Attribute (e.g. Case Size)"
                                        className="w-2/5"
                                    />
                                    <TextField
                                        id={`spec-value-${i}`}
                                        value={spec.value}
                                        onChange={(e) => updateSpec(i, "value", e.target.value)}
                                        placeholder="Value (e.g. 41mm)"
                                        className="flex-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSpec(i)}
                                        className="p-2 text-navy/40 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Publishing Controls */}
                <div className="space-y-6">
                    {/* Category & Inventory */}
                    <div className={cardCls}>
                        <div className="px-6 py-5 border-b border-navy/10">
                            <h2 className="text-lg font-heading text-navy">Category & Inventory</h2>
                            <p className="text-xs text-navy/60 mt-1">Organize your product and manage its availability.</p>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className={labelCls}>Category</label>
                                <p className="text-[11px] text-navy/50 mb-2 leading-tight">Select where this item belongs in your store's navigation.</p>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as CategorySlug)}
                                    className={inputCls}
                                >
                                    {categories.map((c) => (
                                        <option key={c.slug} value={c.slug}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelCls}>SKU (Optional)</label>
                                <p className="text-[11px] text-navy/50 mb-2 leading-tight">Stock Keeping Unit. A unique identifier for tracking your inventory.</p>
                                <TextField
                                    id="sku"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    placeholder="IC-LXW-0099"
                                    inputClassName="font-mono text-xs"
                                />
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-navy/10">
                                <div>
                                    <p className="text-sm font-semibold text-navy">In Stock</p>
                                    <p className="text-xs text-navy/60 mt-0.5">Available for purchase</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setInStock(!inStock)}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${inStock ? "bg-gold" : "bg-navy/20"}`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-ivory transition-transform ${inStock ? "left-7" : "left-1"}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-navy/10">
                                <div>
                                    <p className="text-sm font-semibold text-navy">Featured Product</p>
                                    <p className="text-xs text-navy/60 mt-0.5">{featured ? "Will appear on homepage" : "Standard listing"}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleFeaturedToggle}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${featured ? "bg-gold" : "bg-navy/20"}`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-ivory transition-transform ${featured ? "left-7" : "left-1"}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className={cardCls}>
                        <div className="px-6 py-5 border-b border-navy/10">
                            <h2 className="text-lg font-heading text-navy">Pricing (INR)</h2>
                            <p className="text-xs text-navy/60 mt-1">Set the final selling price and optional discount price.</p>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <label className={labelCls}>Selling Price *</label>
                                <p className="text-[11px] text-navy/50 mb-2 leading-tight">The actual price the customer will pay at checkout.</p>
                                <TextField
                                    id="price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="449999"
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelCls}>Compare-at Price (Optional)</label>
                                <p className="text-[11px] text-navy/50 mb-2 leading-tight">The original higher price. Useful for showing items on sale.</p>
                                <TextField
                                    id="compareAtPrice"
                                    type="number"
                                    value={compareAtPrice}
                                    onChange={(e) => setCompareAtPrice(e.target.value)}
                                    placeholder="479999"
                                />
                            </div>
                            {discount && (
                                <div className="flex items-center justify-between px-4 py-3 bg-cream border-l-2 border-gold rounded-r-lg text-xs font-medium">
                                    <span className="text-navy">Discount displayed</span>
                                    <span className="font-bold text-navy font-mono">{discount}% OFF</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Images (Full Width) */}
                <div className="lg:col-span-3">
                    <div className={cardCls}>
                        <div className="px-6 py-5 border-b border-navy/10 flex items-center justify-between">
                            <h2 className="text-lg font-heading text-navy">Images</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="border-2 border-dashed border-navy/20 rounded-xl p-6 text-center hover:bg-cream/50 transition-colors cursor-pointer relative group">
                                <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*" 
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <ImageIcon className="mx-auto h-8 w-8 text-navy/40 mb-2 group-hover:text-gold transition-colors" />
                                <p className="text-sm font-medium text-navy">Click or drag images to upload</p>
                                <p className="text-xs text-navy/50 mt-1">PNG, JPG, WEBP</p>
                            </div>

                            {imageUrls.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                                    {imageUrls.map((url, i) => (
                                        <div key={i} className="group relative h-24 bg-cream rounded-lg border border-navy/10 overflow-hidden flex items-center justify-center">
                                            {i === 0 && (
                                                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-gold text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm z-10">
                                                    Main
                                                </span>
                                            )}
                                            <button type="button" className="w-full h-full" onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}>
                                                <img
                                                    src={url}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-1.5 right-1.5 p-1.5 bg-ivory text-red-600 rounded-md opacity-0 group-hover:opacity-100 shadow-sm transition-opacity"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            <ImageLightbox
                images={imageUrls}
                initialIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </div>
    );
}
