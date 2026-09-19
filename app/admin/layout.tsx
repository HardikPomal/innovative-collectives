"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    ExternalLink,
    Menu,
    X,
    Bell,
    User,
    LogOut,
} from "lucide-react";
import Button from "@/components/ui/Button";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    exact?: boolean;
}

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Customers", href: "/admin/customers", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isLoading, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        if (!isLoggingOut && !isLoading && (!user || !user.isAdmin)) {
            router.push("/login");
        }
    }, [user, isLoading, router, isLoggingOut]);

    const handleLogout = () => {
        setIsLoggingOut(true);
        logout();
        router.push("/");
    };

    if (isLoading || !user || !user.isAdmin) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center font-heading text-navy text-xl">
                Verifying Access...
            </div>
        );
    }

    const isActive = (item: NavItem) =>
        item.exact ? pathname === item.href : pathname?.startsWith(item.href);

    return (
        <div className="min-h-screen bg-cream flex font-body antialiased text-navy">
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 bg-navy/50 z-40 md:hidden"
                />
            )}

            {/* Sidebar (Navy Theme) */}
            <aside
                className={`fixed md:sticky top-0 h-screen w-56 bg-navy text-cream z-50 flex flex-col transition-transform duration-200 ease-in-out shrink-0 border-r border-transparent ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
            >
                {/* Brand Header */}
                <div className="h-16 flex items-center px-6 border-b border-cream/10 shrink-0">
                    <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3"
                    >
                        <img
                            src="/assets/logo/h-logo/H-Gradient.svg"
                            alt="Innovative Collectives"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-8 px-4">
                    <p className="px-3 text-[10px] uppercase tracking-widest text-cream/50 font-semibold mb-3">
                        Navigation
                    </p>
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const active = isActive(item);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                        active
                                            ? "bg-gold/15 text-gold font-semibold"
                                            : "text-cream/70 hover:bg-cream/10 hover:text-cream"
                                    }`}
                                >
                                    <Icon
                                        size={18}
                                        className={active ? "text-gold" : "text-cream/50 group-hover:text-cream"}
                                    />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="my-6 border-t border-cream/10 mx-3" />

                    <p className="px-3 text-[10px] uppercase tracking-widest text-cream/50 font-semibold mb-3">
                        Shortcuts
                    </p>
                    <Link
                        href="/"
                        target="_blank"
                        className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-cream/70 hover:bg-cream/10 hover:text-cream transition-colors"
                    >
                        <span className="flex items-center gap-3">
                            <ExternalLink size={18} className="text-cream/50 group-hover:text-cream transition-colors" />
                            <span>Live Site</span>
                        </span>
                        <span className="text-[10px] text-cream/40">↗</span>
                    </Link>
                </div>


            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header Bar (Ivory) */}
                <header className="h-16 bg-ivory border-b border-navy/10 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0">
                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg border border-navy/20 text-navy hover:bg-cream mr-4"
                        aria-label="Toggle navigation"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="flex-1"></div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            aria-label="Notifications"
                            className="w-10 h-10 flex items-center justify-center rounded-full text-navy/60 hover:text-navy hover:bg-navy/5 relative transition-colors hidden md:flex"
                        >
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-gold border-2 border-ivory" />
                        </button>

                        <div className="h-6 w-px bg-navy/10 hidden md:block mx-1"></div>

                        {/* Admin Profile */}
                        <div className="flex items-center gap-3 pl-1">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-semibold text-navy leading-tight">
                                    Administrator
                                </span>
                                <span className="text-xs text-navy/50 leading-tight mt-0.5">
                                    Full Access
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center text-navy shrink-0">
                                <User size={18} />
                            </div>
                            
                            <div className="h-6 w-px bg-navy/10 mx-1 hidden sm:block"></div>
                            
                            <button
                                onClick={handleLogout}
                                title="Sign out"
                                className="w-10 h-10 flex items-center justify-center rounded-full text-navy/60 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Body (Cream) */}
                <main className="flex-1 p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
