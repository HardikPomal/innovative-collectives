import { openDB, IDBPDatabase } from "idb";
import { products as initialProducts } from "@/data/products";
import { initialMockOrders as initialOrders } from "@/data/mockOrders";
import { mockCustomers as initialCustomers } from "@/data/mockAdmin";

const DB_NAME = "IC-Store-DB-v2";
const DB_VERSION = 1;

export async function initDB(): Promise<IDBPDatabase | null> {
    if (typeof window === "undefined") return null;

    return await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            // Products Store
            if (!db.objectStoreNames.contains("products")) {
                const productStore = db.createObjectStore("products", { keyPath: "id" });
                productStore.createIndex("slug", "slug", { unique: true });
                productStore.createIndex("category", "category", { unique: false });
            }

            // Orders Store
            if (!db.objectStoreNames.contains("orders")) {
                db.createObjectStore("orders", { keyPath: "id" });
            }

            // Customers Store
            if (!db.objectStoreNames.contains("customers")) {
                const customerStore = db.createObjectStore("customers", { keyPath: "id" });
                customerStore.createIndex("email", "email", { unique: true });
            }
        },
    });
}

// Seed the database if it is empty
export async function seedDBIfEmpty() {
    if (typeof window === "undefined") return;

    const db = await initDB();
    if (!db) return;

    // Seed Products
    const productsCount = await db.count("products");
    if (productsCount === 0) {
        const tx = db.transaction("products", "readwrite");
        for (const p of initialProducts) {
            tx.store.add(p);
        }
        await tx.done;
    }

    // Seed Orders
    const ordersCount = await db.count("orders");
    if (ordersCount === 0) {
        const tx = db.transaction("orders", "readwrite");
        for (const o of initialOrders) {
            tx.store.add(o);
        }
        await tx.done;
    }

    // Seed Customers
    const customersCount = await db.count("customers");
    if (customersCount === 0) {
        const tx = db.transaction("customers", "readwrite");
        for (const c of initialCustomers) {
            tx.store.add(c);
        }
        await tx.done;
    }
}
