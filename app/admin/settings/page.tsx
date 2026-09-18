"use client";

import { useState } from "react";
import { Check, Settings, Shield, Bell, CreditCard, Truck } from "lucide-react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full relative transition-colors ${checked ? "bg-gold" : "bg-navy/20"}`}
    >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-ivory transition-transform ${checked ? "left-7" : "left-1"}`} />
    </button>
);

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    // Mock settings state
    const [settings, setSettings] = useState({
        brandName: "Innovative Collectives",
        supportEmail: "concierge@innovativecollectives.com",
        orderPrefix: "IC-",
        currency: "INR (₹)",
        taxRate: "18",
        enableGuestCheckout: false,
        requirePhone: true,
        notifyOnOrder: true,
        notifyOnLowStock: true,
    });

    const handleSave = () => {
        setSaving(true);
        setSaved(false);
        setTimeout(() => {
            setSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 700);
    };

    const TABS = [
        { id: "general", label: "General", icon: Settings },
        { id: "checkout", label: "Checkout", icon: CreditCard },
        { id: "shipping", label: "Shipping", icon: Truck },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
    ];

    const inputCls = "w-full px-4 py-2.5 border border-navy/20 bg-ivory rounded-lg text-sm text-navy focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors";
    const labelCls = "block text-xs font-semibold text-navy/70 mb-2 uppercase tracking-wider";
    const cardCls = "bg-ivory border border-navy/10 shadow-sm rounded-2xl overflow-hidden";

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-navy">Settings</h1>
                    <p className="text-navy/70 mt-1">Configure platform preferences and operational parameters.</p>
                </div>
                <div className="flex items-center gap-4">
                    {saved && (
                        <span className="text-sm font-semibold text-gold flex items-center gap-1.5">
                            <Check size={16} />
                            Settings saved
                        </span>
                    )}
                    <Button
                        onClick={handleSave}
                        variant="secondary"
                        isLoading={saving}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-navy/10 overflow-x-auto">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-3 flex items-center gap-2 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px uppercase tracking-wider ${
                                activeTab === tab.id
                                    ? "border-gold text-navy"
                                    : "border-transparent text-navy/50 hover:text-navy hover:border-navy/20"
                            }`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Main Settings Form */}
                <div className="md:col-span-2 space-y-6">
                    {activeTab === "general" && (
                        <>
                            <div className={cardCls}>
                                <div className="px-6 py-5 border-b border-navy/10">
                                    <h2 className="text-lg font-heading text-navy">Brand Identity</h2>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div>
                                        <label className={labelCls}>Brand Name</label>
                                        <TextField
                                            id="brandName"
                                            value={settings.brandName}
                                            onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Support Email</label>
                                        <TextField
                                            id="supportEmail"
                                            type="email"
                                            value={settings.supportEmail}
                                            onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cardCls}>
                                <div className="px-6 py-5 border-b border-navy/10">
                                    <h2 className="text-lg font-heading text-navy">Formatting & Localization</h2>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className={labelCls}>Order Prefix</label>
                                            <TextField
                                                id="orderPrefix"
                                                value={settings.orderPrefix}
                                                onChange={(e) => setSettings({ ...settings, orderPrefix: e.target.value })}
                                                inputClassName="font-mono text-xs"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelCls}>Currency</label>
                                            <select
                                                value={settings.currency}
                                                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                                className={inputCls}
                                            >
                                                <option value="INR (₹)">INR (₹)</option>
                                                <option value="USD ($)">USD ($)</option>
                                                <option value="EUR (€)">EUR (€)</option>
                                                <option value="GBP (£)">GBP (£)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "checkout" && (
                        <div className={cardCls}>
                            <div className="px-6 py-5 border-b border-navy/10">
                                <h2 className="text-lg font-heading text-navy">Checkout Preferences</h2>
                            </div>
                            <div className="divide-y divide-navy/10">
                                <div className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-navy">Guest Checkout</p>
                                        <p className="text-xs text-navy/60 mt-1">Allow purchases without an account</p>
                                    </div>
                                    <Toggle checked={settings.enableGuestCheckout} onChange={(v) => setSettings({ ...settings, enableGuestCheckout: v })} />
                                </div>
                                <div className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-navy">Require Phone Number</p>
                                        <p className="text-xs text-navy/60 mt-1">Mandatory field for shipping verification</p>
                                    </div>
                                    <Toggle checked={settings.requirePhone} onChange={(v) => setSettings({ ...settings, requirePhone: v })} />
                                </div>
                                <div className="p-6">
                                    <label className={labelCls}>Base Tax Rate (%)</label>
                                    <TextField
                                        id="taxRate"
                                        type="number"
                                        value={settings.taxRate}
                                        onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className={cardCls}>
                            <div className="px-6 py-5 border-b border-navy/10">
                                <h2 className="text-lg font-heading text-navy">Alerts & Emails</h2>
                            </div>
                            <div className="divide-y divide-navy/10">
                                <div className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-navy">New Order Alerts</p>
                                        <p className="text-xs text-navy/60 mt-1">Receive email on new placements</p>
                                    </div>
                                    <Toggle checked={settings.notifyOnOrder} onChange={(v) => setSettings({ ...settings, notifyOnOrder: v })} />
                                </div>
                                <div className="p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-navy">Low Stock Alerts</p>
                                        <p className="text-xs text-navy/60 mt-1">Receive email when inventory drops</p>
                                    </div>
                                    <Toggle checked={settings.notifyOnLowStock} onChange={(v) => setSettings({ ...settings, notifyOnLowStock: v })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {(activeTab === "shipping" || activeTab === "security") && (
                        <div className="bg-cream border border-navy/10 p-8 text-center rounded-2xl shadow-sm">
                            <h3 className="font-heading text-navy text-lg mb-2">Module Not Configured</h3>
                            <p className="text-navy/60 text-sm">Please integrate a provider via the developer console to enable these settings.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar Summary */}
                <div className="hidden md:block">
                    <div className="bg-cream border border-navy/10 p-5 space-y-4 rounded-2xl shadow-sm">
                        <h3 className="font-heading text-navy">Configuration Note</h3>
                        <p className="text-xs text-navy/70 leading-relaxed">
                            Changes applied here will immediately affect the live platform. Ensure tax rates and currency formats align with your regional compliance before saving.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
