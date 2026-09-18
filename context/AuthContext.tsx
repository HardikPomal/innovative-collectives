"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { initDB } from "@/lib/db/schema";
import type { AdminCustomer } from "@/data/mockAdmin";

interface AuthUser {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
}

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    login: (email: string, password?: string) => Promise<boolean>;
    register: (name: string, email: string, password?: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on mount (shared across tabs)
        const storedUser = localStorage.getItem("ic-auth-user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password?: string) => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise((res) => setTimeout(res, 800));

        let authUser: AuthUser | null = null;

        if (email === "admin@ic.com" && password === "admin") {
            authUser = {
                id: "admin-1",
                email: "admin@ic.com",
                name: "Admin",
                isAdmin: true,
            };
        } else {
            // Check IndexedDB customers store
            try {
                const db = await initDB();
                if (db) {
                    const customer = await db.getFromIndex("customers", "email", email) as AdminCustomer | undefined;
                    if (customer) {
                        authUser = {
                            id: customer.id,
                            email: customer.email,
                            name: customer.name,
                            isAdmin: false,
                        };
                    }
                }
            } catch (error) {
                console.error("Login failed", error);
            }
        }

        if (authUser) {
            setUser(authUser);
            localStorage.setItem("ic-auth-user", JSON.stringify(authUser));
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    const register = async (name: string, email: string, password?: string) => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise((res) => setTimeout(res, 800));
        
        try {
            const db = await initDB();
            if (db) {
                // Check if exists
                const existing = await db.getFromIndex("customers", "email", email);
                if (existing) {
                    setIsLoading(false);
                    return false; // Email already taken
                }

                const newCustomer: AdminCustomer = {
                    id: crypto.randomUUID(),
                    name,
                    email,
                    phone: "",
                    city: "",
                    country: "",
                    orderCount: 0,
                    totalSpent: 0,
                    joinedDate: new Date().toISOString().split("T")[0],
                    status: "Active",
                    lastActive: "Just now",
                };

                await db.add("customers", newCustomer);
                
                const authUser: AuthUser = {
                    id: newCustomer.id,
                    email: newCustomer.email,
                    name: newCustomer.name,
                    isAdmin: false,
                };

                setUser(authUser);
                localStorage.setItem("ic-auth-user", JSON.stringify(authUser));
                setIsLoading(false);
                return true;
            }
        } catch (error) {
            console.error("Register failed", error);
        }

        setIsLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("ic-auth-user");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
