"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product, BundleOption } from "@/types";
import { siteConfig } from "@/config/site";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  addBundle: (product: Product, bundle: BundleOption) => void;
  removeItem: (productId: string, bundleId?: string) => void;
  updateQuantity: (productId: string, quantity: number, bundleId?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  discountAmount: number;
  discountCode: string | null;
  shippingCharges: number;
  totalAmount: number;
  totalItemCount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("pb_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCode = localStorage.getItem("pb_discount_code");
      const storedAmount = localStorage.getItem("pb_discount_amount");
      if (storedCode && storedAmount) {
        setDiscountCode(storedCode);
        setDiscountAmount(Number(storedAmount));
      }
    } catch (e) {
      console.error("Cart storage parse error", e);
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("pb_cart", JSON.stringify(items));
      if (discountCode) {
        localStorage.setItem("pb_discount_code", discountCode);
        localStorage.setItem("pb_discount_amount", String(discountAmount));
      } else {
        localStorage.removeItem("pb_discount_code");
        localStorage.removeItem("pb_discount_amount");
      }
    } catch (e) {
      console.error("Cart storage write error", e);
    }
  }, [items, discountCode, discountAmount, isInitialized]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === newItem.productId && i.bundleId === newItem.bundleId
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        const existing = copy[existingIndex];
        const updatedQty = existing.quantity + newItem.quantity;
        copy[existingIndex] = {
          ...existing,
          quantity: updatedQty,
          totalPrice: existing.unitPrice * updatedQty,
        };
        return copy;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const addBundle = (product: Product, bundle: BundleOption) => {
    const newItem: CartItem = {
      productId: product.id,
      title: product.title,
      image: product.images[0] || "",
      unitPrice: bundle.pricePerUnit,
      quantity: bundle.quantity,
      bundleId: bundle.id,
      bundleName: bundle.name,
      freeGifts: bundle.freeGifts,
      totalPrice: bundle.totalPrice,
    };
    addItem(newItem);
  };

  const removeItem = (productId: string, bundleId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.bundleId === bundleId))
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    bundleId?: string
  ) => {
    if (quantity <= 0) {
      removeItem(productId, bundleId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId && i.bundleId === bundleId) {
          return {
            ...i,
            quantity,
            totalPrice: i.unitPrice * quantity,
          };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode(null);
    setDiscountAmount(0);
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const shippingCharges =
    subtotal === 0 || subtotal >= siteConfig.shipping.freeShippingThreshold
      ? 0
      : siteConfig.shipping.standardShippingFee;

  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCharges);

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch("/api/discounts/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, cartSubtotal: subtotal }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || "Failed to apply coupon" };
      }
      setDiscountCode(data.discount.code);
      setDiscountAmount(data.discount.amount);
      return { success: true, message: `Coupon ${data.discount.code} applied successfully!` };
    } catch {
      return { success: false, message: "Network error validating coupon" };
    }
  };

  const removeCoupon = () => {
    setDiscountCode(null);
    setDiscountAmount(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addBundle,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discountAmount,
        discountCode,
        shippingCharges,
        totalAmount,
        totalItemCount,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
