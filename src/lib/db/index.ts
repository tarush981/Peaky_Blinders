import fs from "fs";
import path from "path";
import { Product, Order, Review, DiscountCode, CustomerShippingAddress, CartItem } from "@/types";
import { initialProduct, initialReviews, activeDiscounts } from "@/data/mockData";

const DB_FILE_PATH = path.join(process.cwd(), "src", "data", "db.json");

interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  reviews: Review[];
  discounts: DiscountCode[];
  newsletter: { email: string; subscribedAt: string }[];
  settings?: GatewaySettings;
}

export interface GatewaySettings {
  merchantUpiVpa: string;
  merchantName: string;
  bankAccountHolder: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  razorpayKeyId?: string;
  razorpayKeySecret?: string;
  isLiveMode: boolean;
}

function getInitialData(): DatabaseSchema {
  return {
    products: [initialProduct],
    orders: [
      {
        id: "pb-order-demo-01",
        orderNumber: "PB-IND-BIRM-9821",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        customer: {
          fullName: "Kabir Shergill",
          email: "kabir.shergill@gmail.com",
          phone: "+91 98112 34567",
          addressLine1: "Flat 402, Garrison Heights, Bandra West",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400050",
          country: "India",
        },
        items: [
          {
            productId: initialProduct.id,
            title: initialProduct.title,
            image: initialProduct.images[0],
            unitPrice: 2249,
            quantity: 2,
            bundleId: "bundle-2",
            bundleName: "The Shelby Syndicate Duo",
            totalPrice: 4499,
            freeGifts: ["1x FREE 10ml 'Birmingham Tobacco & Oak' Aroma Oil"],
          },
        ],
        subtotal: 4499,
        discountAmount: 200,
        discountCode: "SHELBY200",
        shippingCharges: 0,
        totalAmount: 4299,
        orderStatus: "shipped",
        paymentStatus: "paid",
        paymentMethod: "razorpay",
        razorpayOrderId: "order_demo_101",
        razorpayPaymentId: "pay_demo_9921",
        trackingNumber: "BD98273614IN",
        notes: "Leave with security if not home",
      },
      {
        id: "pb-order-demo-02",
        orderNumber: "PB-IND-BIRM-8412",
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        customer: {
          fullName: "Aditya Vardhan",
          email: "aditya.v@outlook.com",
          phone: "+91 97234 56789",
          addressLine1: "Villa 12, Palm Meadows, Whitefield",
          city: "Bengaluru",
          state: "Karnataka",
          postalCode: "560066",
          country: "India",
        },
        items: [
          {
            productId: initialProduct.id,
            title: initialProduct.title,
            image: initialProduct.images[0],
            unitPrice: 1999,
            quantity: 3,
            bundleId: "bundle-3",
            bundleName: "The Garrison Executive Trio",
            totalPrice: 5999,
            freeGifts: ["2x FREE 10ml Aroma Essences", "Luxury Gift Box"],
          },
        ],
        subtotal: 5999,
        discountAmount: 0,
        shippingCharges: 0,
        totalAmount: 5999,
        orderStatus: "delivered",
        paymentStatus: "paid",
        paymentMethod: "razorpay",
        razorpayOrderId: "order_demo_102",
        razorpayPaymentId: "pay_demo_8812",
        trackingNumber: "DLH77192834IN",
      },
    ],
    reviews: initialReviews,
    discounts: activeDiscounts,
    newsletter: [
      { email: "collector@vintagevault.in", subscribedAt: new Date().toISOString() },
    ],
  };
}

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const initial = getInitialData();
      fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true });
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const content = fs.readFileSync(DB_FILE_PATH, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Database read error:", err);
    return getInitialData();
  }
}

function writeDb(data: DatabaseSchema) {
  try {
    fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true });
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Database write error:", err);
  }
}

// ---------------- PRODUCTS ----------------
export async function getProducts(): Promise<Product[]> {
  const db = readDb();
  return db.products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = readDb();
  return db.products.find((p) => p.slug === slug || p.id === slug) || db.products[0] || null;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const db = readDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.products[index] = {
    ...db.products[index],
    ...updates,
  };
  writeDb(db);
  return db.products[index];
}

// ---------------- ORDERS ----------------
export async function getOrders(): Promise<Order[]> {
  const db = readDb();
  return db.orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getOrderById(id: string): Promise<Order | null> {
  const db = readDb();
  return (
    db.orders.find(
      (o) => o.id === id || o.orderNumber.toLowerCase() === id.toLowerCase()
    ) || null
  );
}

export async function createOrder(order: Order): Promise<Order> {
  const db = readDb();
  db.orders.unshift(order);

  // Reduce product inventory
  for (const item of order.items) {
    const prod = db.products.find((p) => p.id === item.productId);
    if (prod && prod.stock >= item.quantity) {
      prod.stock -= item.quantity;
    }
  }

  writeDb(db);
  return order;
}

export async function updateOrderStatus(
  id: string,
  orderStatus: Order["orderStatus"],
  paymentStatus?: Order["paymentStatus"],
  trackingNumber?: string
): Promise<Order | null> {
  const db = readDb();
  const order = db.orders.find((o) => o.id === id || o.orderNumber === id);
  if (!order) return null;

  order.orderStatus = orderStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  if (trackingNumber) order.trackingNumber = trackingNumber;

  writeDb(db);
  return order;
}

// ---------------- REVIEWS ----------------
export async function getReviews(productId?: string): Promise<Review[]> {
  const db = readDb();
  let reviews = db.reviews;
  if (productId) {
    reviews = reviews.filter((r) => r.productId === productId);
  }
  return reviews.filter((r) => r.status === "approved");
}

export async function getAllReviews(): Promise<Review[]> {
  const db = readDb();
  return db.reviews;
}

export async function createReview(review: Review): Promise<Review> {
  const db = readDb();
  db.reviews.unshift(review);

  // recalculate product rating & count
  const approved = db.reviews.filter(
    (r) => r.productId === review.productId && r.status === "approved"
  );
  const prod = db.products.find((p) => p.id === review.productId);
  if (prod && approved.length > 0) {
    const sum = approved.reduce((acc, curr) => acc + curr.rating, 0);
    prod.rating = Number((sum / approved.length).toFixed(1));
    prod.reviewCount = approved.length;
  }

  writeDb(db);
  return review;
}

export async function updateReviewStatus(
  id: string,
  status: "approved" | "pending" | "rejected"
): Promise<Review | null> {
  const db = readDb();
  const review = db.reviews.find((r) => r.id === id);
  if (!review) return null;

  review.status = status;
  writeDb(db);
  return review;
}

// ---------------- DISCOUNTS ----------------
export async function getDiscount(code: string): Promise<DiscountCode | null> {
  const db = readDb();
  const match = db.discounts.find(
    (d) => d.code.toUpperCase() === code.trim().toUpperCase() && d.isActive
  );
  return match || null;
}

// ---------------- NEWSLETTER ----------------
export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const db = readDb();
  const cleanEmail = email.trim().toLowerCase();
  const exists = db.newsletter.some((n) => n.email === cleanEmail);
  if (exists) {
    return { success: true, message: "You are already subscribed to the Garrison dispatch." };
  }
  db.newsletter.push({ email: cleanEmail, subscribedAt: new Date().toISOString() });
  writeDb(db);
  return { success: true, message: "Welcome to the Peaky Blinders Syndicate. Use code PEAKY10 for 10% off." };
}

// ---------------- SETTINGS & GATEWAY LINKING ----------------
export async function getGatewaySettings(): Promise<GatewaySettings> {
  const db = readDb();
  return (
    db.settings || {
      merchantUpiVpa: process.env.NEXT_PUBLIC_MERCHANT_UPI_VPA || "peakyy@slc",
      merchantName: process.env.NEXT_PUBLIC_MERCHANT_NAME || "PeakyBlinders",
      bankAccountHolder: "PeakyBlinders",
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
      razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || "",
      isLiveMode: false,
    }
  );
}

export async function updateGatewaySettings(settings: Partial<GatewaySettings>): Promise<GatewaySettings> {
  const db = readDb();
  const current = await getGatewaySettings();
  db.settings = {
    ...current,
    ...settings,
  };
  writeDb(db);
  return db.settings;
}
export async function getAdminStats() {
  const db = readDb();
  const totalRevenue = db.orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = db.orders.length;
  const pendingOrders = db.orders.filter((o) => o.orderStatus === "pending" || o.orderStatus === "processing").length;
  const totalReviews = db.reviews.length;
  const pendingReviews = db.reviews.filter((r) => r.status === "pending").length;
  const stock = db.products[0]?.stock || 0;

  return {
    totalRevenue,
    totalOrders,
    pendingOrders,
    totalReviews,
    pendingReviews,
    stock,
  };
}
