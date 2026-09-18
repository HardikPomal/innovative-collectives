import { initDB, seedDBIfEmpty } from "./schema";
import type { Product, Order } from "@/types";
import type { AdminCustomer } from "@/data/mockAdmin";

// Ensure DB is seeded on app load
if (typeof window !== "undefined") {
    seedDBIfEmpty().catch(console.error);
}

// ----------------------------------------------------------------------------
// PRODUCTS
// ----------------------------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
    const db = await initDB();
    if (!db) return [];
    return await db.getAll("products");
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    const db = await initDB();
    if (!db) return undefined;
    return await db.getFromIndex("products", "slug", slug);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    const db = await initDB();
    if (!db) return [];
    return await db.getAllFromIndex("products", "category", category);
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const db = await initDB();
    if (!db) return undefined;
    return await db.get("products", id);
}

export async function createProduct(product: Product): Promise<void> {
    const db = await initDB();
    if (!db) return;
    await db.add("products", product);
}

export async function updateProduct(product: Product): Promise<void> {
    const db = await initDB();
    if (!db) return;
    await db.put("products", product);
}

export async function deleteProduct(id: string): Promise<void> {
    const db = await initDB();
    if (!db) return;
    await db.delete("products", id);
}

// ----------------------------------------------------------------------------
// ORDERS
// ----------------------------------------------------------------------------

export async function getOrders(): Promise<Order[]> {
    const db = await initDB();
    if (!db) return [];
    // Orders are returned in insertion order; let's return them in descending date
    const orders = await db.getAll("orders");
    return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getOrderById(id: string): Promise<Order | undefined> {
    const db = await initDB();
    if (!db) return undefined;
    return await db.get("orders", id);
}

export async function createOrder(order: Order): Promise<void> {
    const db = await initDB();
    if (!db) return;
    await db.add("orders", order);
}

export async function updateOrder(order: Order): Promise<void> {
    const db = await initDB();
    if (!db) return;
    await db.put("orders", order);
}

export async function deleteOrder(id: string): Promise<void> {
    const db = await initDB();
    if (!db) return;
    await db.delete("orders", id);
}

// ----------------------------------------------------------------------------
// CUSTOMERS
// ----------------------------------------------------------------------------

export async function getCustomers(): Promise<AdminCustomer[]> {
    const db = await initDB();
    if (!db) return [];
    return await db.getAll("customers");
}

export async function getCustomerById(id: string): Promise<AdminCustomer | undefined> {
    const db = await initDB();
    if (!db) return undefined;
    return await db.get("customers", id);
}

export async function updateCustomer(customer: AdminCustomer): Promise<void> {
    const db = await initDB();
    if (!db) return;
    await db.put("customers", customer);
}
