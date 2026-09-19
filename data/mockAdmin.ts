import { initialMockOrders } from "./mockOrders";
import { products, categories } from "./products";

export interface AdminCustomer {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    orderCount: number;
    totalSpent: number;
    joinedDate: string;
    status: "Active" | "Inactive";
    lastActive: string;
}

export interface StoreSettings {
    storeName: string;
    legalEntity: string;
    supportEmail: string;
    supportPhone: string;
    currency: string;
    timezone: string;
    address: string;
    standardShippingFee: number;
    expressShippingFee: number;
    freeShippingThreshold: number;
    codEnabled: boolean;
    razorpayEnabled: boolean;
    stripeEnabled: boolean;
    emailReceipts: boolean;
    smsTracking: boolean;
    lowStockAlerts: boolean;
}

export const mockCustomers: AdminCustomer[] = [
    {
        id: "cust_1",
        name: "Alexander Wright",
        email: "alexander.wright@manhattan.law",
        phone: "+1 (555) 234-8901",
        city: "New York",
        country: "United States",
        orderCount: 8,
        totalSpent: 1485000,
        joinedDate: "2025-04-12",
        status: "Active",
        lastActive: "Today, 10:20 AM",
    },
    {
        id: "cust_2",
        name: "Elena Rostova",
        email: "e.rostova@emirates-holdings.ae",
        phone: "+971 50 123 4567",
        city: "Dubai",
        country: "UAE",
        orderCount: 6,
        totalSpent: 1120000,
        joinedDate: "2025-06-18",
        status: "Active",
        lastActive: "Yesterday",
    },
    {
        id: "cust_3",
        name: "Marcus Sterling",
        email: "m.sterling@mayfair-invest.co.uk",
        phone: "+44 20 7946 0912",
        city: "London",
        country: "United Kingdom",
        orderCount: 4,
        totalSpent: 650000,
        joinedDate: "2025-09-03",
        status: "Active",
        lastActive: "3 days ago",
    },
    {
        id: "cust_4",
        name: "Priya Nair",
        email: "priya.nair@innovate-tech.in",
        phone: "+91 98201 45678",
        city: "Mumbai",
        country: "India",
        orderCount: 3,
        totalSpent: 540000,
        joinedDate: "2025-11-20",
        status: "Active",
        lastActive: "Sep 12, 2026",
    },
    {
        id: "cust_5",
        name: "Rohan Mehta",
        email: "rohan.mehta@venturecapital.in",
        phone: "+91 99000 88776",
        city: "Bengaluru",
        country: "India",
        orderCount: 2,
        totalSpent: 280000,
        joinedDate: "2026-01-15",
        status: "Active",
        lastActive: "Sep 08, 2026",
    },
    {
        id: "cust_6",
        name: "Chloe Bennett",
        email: "chloe.bennett@atelier-mode.fr",
        phone: "+33 1 42 68 55 00",
        city: "Paris",
        country: "France",
        orderCount: 3,
        totalSpent: 410000,
        joinedDate: "2026-02-10",
        status: "Active",
        lastActive: "Sep 04, 2026",
    },
    {
        id: "cust_7",
        name: "David Vance",
        email: "david.vance@geneva-wealth.ch",
        phone: "+41 22 819 33 00",
        city: "Zurich",
        country: "Switzerland",
        orderCount: 5,
        totalSpent: 980000,
        joinedDate: "2025-08-01",
        status: "Active",
        lastActive: "Sep 10, 2026",
    },
    {
        id: "cust_8",
        name: "Anya Sharma",
        email: "anya.sharma@designstudio.org",
        phone: "+91 97111 22334",
        city: "New Delhi",
        country: "India",
        orderCount: 1,
        totalSpent: 145000,
        joinedDate: "2026-05-28",
        status: "Inactive",
        lastActive: "Aug 15, 2026",
    },
];

export const initialStoreSettings: StoreSettings = {
    storeName: "Innovative Collectives",
    legalEntity: "Innovative Collectives Luxury Retail Ltd.",
    supportEmail: "support@innovativecollectives.com",
    supportPhone: "+91 90000 00000",
    currency: "INR (Rs.)",
    timezone: "Asia/Kolkata (IST +5:30)",
    address: "Innovative Collectives Gallery, 450 Park Avenue & SG Highway, Ahmedabad, Gujarat 380054",
    standardShippingFee: 0,
    expressShippingFee: 999,
    freeShippingThreshold: 5000,
    codEnabled: true,
    razorpayEnabled: true,
    stripeEnabled: true,
    emailReceipts: true,
    smsTracking: true,
    lowStockAlerts: true,
};

export function getAdminMetrics() {
    const totalRevenue = initialMockOrders.reduce((sum, o) => sum + o.total, 0) * 12 + 4589000;
    const totalOrdersCount = 1428;
    const totalProductsCount = products.length;
    const inStockProductsCount = products.filter((p) => p.inStock).length;
    const averageOrderValue = Math.round(totalRevenue / totalOrdersCount);

    return {
        totalRevenue,
        totalOrdersCount,
        totalProductsCount,
        inStockProductsCount,
        averageOrderValue,
    };
}
