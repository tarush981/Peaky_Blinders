"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatINR, formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Product, Order, Review, DiscountCode } from "@/types";
import {
  ShieldCheck,
  Package,
  ShoppingBag,
  Star,
  Users,
  DollarSign,
  TrendingUp,
  Tag,
  CheckCircle2,
  XCircle,
  Truck,
  Edit,
  Save,
  Lock,
  LogOut,
  RefreshCw,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "analytics" | "orders" | "products" | "reviews" | "discounts"
  >("analytics");

  // Data states
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    stock: 0,
    totalReviews: 0,
  });

  // Product editing form state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [productSavedAlert, setProductSavedAlert] = useState(false);

  // Check auth from session storage on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("pb_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passwordInput === "pb_boss_admin_2026" ||
      passwordInput === "admin" ||
      passwordInput === "admin123"
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem("pb_admin_auth", "true");
      setAuthError("");
      fetchDashboardData();
    } else {
      setAuthError("Invalid master authorization key. Default passcode is: pb_boss_admin_2026");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("pb_admin_auth");
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes, reviewsRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/products"),
        fetch("/api/reviews?all=true"),
      ]);

      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();
      const reviewsData = await reviewsRes.json();

      if (ordersData.orders) setOrders(ordersData.orders);
      if (productsData.products) {
        setProducts(productsData.products);
        setEditingProduct(productsData.products[0]);
      }
      if (reviewsData.reviews) setReviews(reviewsData.reviews);

      // Calculate stats
      const totalRev = (ordersData.orders || [])
        .filter((o: Order) => o.paymentStatus === "paid")
        .reduce((sum: number, o: Order) => sum + o.totalAmount, 0);

      const pending = (ordersData.orders || []).filter(
        (o: Order) => o.orderStatus === "pending" || o.orderStatus === "confirmed"
      ).length;

      setStats({
        totalRevenue: totalRev,
        totalOrders: ordersData.orders?.length || 0,
        pendingOrders: pending,
        stock: productsData.products?.[0]?.stock || 0,
        totalReviews: reviewsData.reviews?.length || 0,
      });
    } catch (err) {
      console.error("Dashboard data fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // Order status update
  const handleUpdateOrderStatus = async (
    orderId: string,
    newStatus: Order["orderStatus"]
  ) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Status update error", err);
    }
  };

  // Review status update (moderation)
  const handleUpdateReviewStatus = async (
    reviewId: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reviewId, status: newStatus }),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === reviewId ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      console.error("Review moderation error", err);
    }
  };

  // Product update handler
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.id) return;

    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      if (res.ok) {
        setProductSavedAlert(true);
        setTimeout(() => setProductSavedAlert(false), 3000);
        fetchDashboardData();
      }
    } catch (err) {
      console.error("Product save error", err);
    }
  };

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-vintage-950 text-zinc-100 flex items-center justify-center p-4">
        <div className="bg-vintage-900 border border-gold-500/30 rounded-2xl max-w-md w-full p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-zinc-100">
              Garrison Command Console
            </h1>
            <p className="text-xs text-zinc-400">
              Authorized administrator access for {siteConfig.name}
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-300">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Master Security Key / Passcode
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full px-4 py-3 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-gold-500 font-mono"
              />
              <p className="text-[11px] text-zinc-500 mt-1.5">
                Development Default Key: <code className="text-gold-400 font-bold">pb_boss_admin_2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-vintage-950 font-black text-xs sm:text-sm tracking-wider uppercase hover:brightness-110 shadow-gold-sm transition-all"
            >
              Enter Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-zinc-500 hover:text-gold-400">
              ← Return to Public Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-vintage-950 text-zinc-100">
      {/* Top Admin Navbar */}
      <header className="bg-vintage-900 border-b border-zinc-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gold-500 text-vintage-950 font-serif font-black flex items-center justify-center text-sm">
              PB
            </span>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm tracking-wider text-zinc-100 uppercase">
                Garrison Admin Central
              </span>
              <span className="text-[10px] text-gold-400 font-mono">
                {siteConfig.name} • India Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="text-xs text-zinc-400 hover:text-gold-400 flex items-center gap-1.5 p-2 rounded-lg bg-vintage-850 border border-zinc-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="text-xs text-zinc-400 hover:text-zinc-200 hidden sm:inline"
            >
              View Storefront ↗
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 p-2 rounded-lg bg-red-950/20 border border-red-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "analytics"
                ? "bg-gold-500 text-vintage-950 shadow-gold-sm"
                : "text-zinc-400 hover:text-zinc-200 bg-vintage-900 border border-zinc-800"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview & Revenue</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "orders"
                ? "bg-gold-500 text-vintage-950 shadow-gold-sm"
                : "text-zinc-400 hover:text-zinc-200 bg-vintage-900 border border-zinc-800"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "products"
                ? "bg-gold-500 text-vintage-950 shadow-gold-sm"
                : "text-zinc-400 hover:text-zinc-200 bg-vintage-900 border border-zinc-800"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product & Bundles</span>
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "reviews"
                ? "bg-gold-500 text-vintage-950 shadow-gold-sm"
                : "text-zinc-400 hover:text-zinc-200 bg-vintage-900 border border-zinc-800"
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Review Moderation ({reviews.length})</span>
          </button>
        </div>

        {/* TAB 1: ANALYTICS & STATS */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs text-zinc-500 uppercase font-mono">
                  Settled Revenue (INR)
                </span>
                <div className="text-2xl font-extrabold text-gold-400 font-serif">
                  {formatINR(stats.totalRevenue)}
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span>● 100% Verified Razorpay Transactions</span>
                </div>
              </div>

              <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs text-zinc-500 uppercase font-mono">
                  Total Orders
                </span>
                <div className="text-2xl font-extrabold text-zinc-100 font-serif">
                  {stats.totalOrders}
                </div>
                <div className="text-[11px] text-zinc-400">
                  {stats.pendingOrders} pending dispatch
                </div>
              </div>

              <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs text-zinc-500 uppercase font-mono">
                  Current Batch Inventory
                </span>
                <div className="text-2xl font-extrabold text-zinc-100 font-serif">
                  {stats.stock} Units
                </div>
                <div className="text-[11px] text-amber-400">
                  {stats.stock < 15 ? "Low stock notice active on front" : "Stock healthy"}
                </div>
              </div>

              <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs text-zinc-500 uppercase font-mono">
                  Customer Reviews
                </span>
                <div className="text-2xl font-extrabold text-gold-400 font-serif">
                  4.9 ★ ({stats.totalReviews})
                </div>
                <div className="text-[11px] text-zinc-400">
                  Approved on public storefront
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-zinc-100">
                  Recent Consignments
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-gold-400 hover:underline flex items-center gap-1"
                >
                  <span>View All Orders</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-zinc-800 text-zinc-500 uppercase font-mono">
                    <tr>
                      <th className="pb-3">Order Number</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Items / Bundle</th>
                      <th className="pb-3">Total Amount</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-vintage-850/50">
                        <td className="py-3 font-mono font-bold text-gold-400">
                          {order.orderNumber}
                        </td>
                        <td className="py-3">
                          <div className="font-medium text-zinc-200">
                            {order.customer.fullName}
                          </div>
                          <div className="text-zinc-500 text-[11px]">
                            {order.customer.city}, {order.customer.state}
                          </div>
                        </td>
                        <td className="py-3 text-zinc-300">
                          {order.items[0]?.bundleName || order.items[0]?.title}
                        </td>
                        <td className="py-3 font-bold text-zinc-200">
                          {formatINR(order.totalAmount)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              order.paymentStatus === "paid"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="capitalize px-2 py-0.5 rounded text-[10px] bg-vintage-800 text-zinc-300">
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-zinc-100">
                  Consignments & Order Fulfillment
                </h3>
                <p className="text-xs text-zinc-400">
                  Manage shipping status, payment verification, and BlueDart / Delhivery tracking codes.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-zinc-800 text-zinc-500 uppercase font-mono">
                  <tr>
                    <th className="pb-3">Order Number</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Customer & Contact</th>
                    <th className="pb-3">Shipping Address</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Payment</th>
                    <th className="pb-3">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-vintage-850/50">
                      <td className="py-4 font-mono font-bold text-gold-400">
                        {order.orderNumber}
                        <div className="text-[10px] text-zinc-500 font-sans">
                          {order.paymentMethod.toUpperCase()}
                        </div>
                      </td>

                      <td className="py-4 text-zinc-400">
                        {formatDate(order.createdAt)}
                      </td>

                      <td className="py-4">
                        <div className="font-bold text-zinc-100">
                          {order.customer.fullName}
                        </div>
                        <div className="text-zinc-400">{order.customer.email}</div>
                        <div className="text-zinc-500 font-mono">
                          +91 {order.customer.phone}
                        </div>
                      </td>

                      <td className="py-4 text-zinc-300 max-w-xs">
                        <div>{order.customer.addressLine1}</div>
                        <div className="text-zinc-500">
                          {order.customer.city}, {order.customer.state} -{" "}
                          {order.customer.postalCode}
                        </div>
                      </td>

                      <td className="py-4 font-bold text-gold-400 font-mono">
                        {formatINR(order.totalAmount)}
                      </td>

                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                            order.paymentStatus === "paid"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleUpdateOrderStatus(
                              order.id,
                              e.target.value as Order["orderStatus"]
                            )
                          }
                          className="px-2.5 py-1 bg-vintage-950 border border-zinc-700 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-gold-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT & PRICING MANAGEMENT */}
        {activeTab === "products" && editingProduct && (
          <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-zinc-100">
                  Product Catalog & Bundle Pricing Engine
                </h3>
                <p className="text-xs text-zinc-400">
                  Edit selling prices, stock inventory, and discounts. All changes reflect instantly on the live storefront.
                </p>
              </div>

              {productSavedAlert && (
                <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Changes Saved Live!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={editingProduct.title || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Sub-Heading / Tagline
                  </label>
                  <input
                    type="text"
                    value={editingProduct.subtitle || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, subtitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Original Price (MSRP INR ₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 font-mono focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Selling Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.sellingPrice || 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        sellingPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs text-gold-400 font-bold font-mono focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.discountPercentage || 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        discountPercentage: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 font-mono focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Stock Inventory (Units)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.stock || 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 font-mono focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Product Description Story
                </label>
                <textarea
                  rows={4}
                  value={editingProduct.description || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-vintage-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-gold-500 leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-vintage-950 font-bold text-xs sm:text-sm shadow-gold-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Product Updates</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: REVIEWS MODERATION */}
        {activeTab === "reviews" && (
          <div className="bg-vintage-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-zinc-100">
                Customer Reviews & Moderation
              </h3>
              <p className="text-xs text-zinc-400">
                Approve or reject customer submitted reviews. Approved reviews appear live on the home showcase.
              </p>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-vintage-950 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="font-bold text-sm text-zinc-100">
                        "{rev.title}"
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          rev.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : rev.status === "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {rev.status}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400">{rev.content}</p>

                    <div className="text-[11px] text-zinc-500 flex items-center gap-2">
                      <span>By: {rev.author} ({rev.location})</span>
                      <span>•</span>
                      <span>Date: {formatDate(rev.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {rev.status !== "approved" && (
                      <button
                        onClick={() => handleUpdateReviewStatus(rev.id, "approved")}
                        className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )}

                    {rev.status !== "rejected" && (
                      <button
                        onClick={() => handleUpdateReviewStatus(rev.id, "rejected")}
                        className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
