import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Product, Order, Review, DiscountCode } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseKey &&
    !supabaseUrl.includes("placeholder") &&
    supabaseUrl.startsWith("https://")
);

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false,
        },
      });
    } catch (err) {
      console.error("Failed to initialize Supabase client:", err);
      return null;
    }
  }
  return supabaseInstance;
}

// ---------------- PRODUCTS ----------------
export async function getProductsFromSupabase(): Promise<Product[] | null> {
  const sb = getSupabase();
  if (!sb) return null;

  try {
    const { data, error } = await sb
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return null;

    return data.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      subtitle: row.subtitle || "",
      badge: row.badge,
      description: row.description,
      features: row.features || [],
      specs: row.specs || {},
      originalPrice: Number(row.original_price),
      sellingPrice: Number(row.selling_price),
      discountPercentage: Number(row.discount_percentage || 0),
      stock: Number(row.stock || 0),
      rating: Number(row.rating || 5.0),
      reviewCount: Number(row.review_count || 0),
      images: row.images || [],
      bundles: row.bundles || [],
      includedItems: row.included_items || [],
      category: row.category || "Luxury Collectibles",
      isFeatured: Boolean(row.is_featured),
    }));
  } catch (err) {
    console.error("Supabase getProducts error:", err);
    return null;
  }
}

export async function updateProductInSupabase(
  id: string,
  updates: Partial<Product>
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;

  try {
    const payload: any = { updated_at: new Date().toISOString() };
    if (updates.title) payload.title = updates.title;
    if (updates.subtitle) payload.subtitle = updates.subtitle;
    if (updates.description) payload.description = updates.description;
    if (updates.sellingPrice !== undefined) payload.selling_price = updates.sellingPrice;
    if (updates.originalPrice !== undefined) payload.original_price = updates.originalPrice;
    if (updates.stock !== undefined) payload.stock = updates.stock;
    if (updates.specs) payload.specs = updates.specs;
    if (updates.bundles) payload.bundles = updates.bundles;

    const { error } = await sb.from("products").update(payload).eq("id", id);
    return !error;
  } catch (err) {
    console.error("Supabase updateProduct error:", err);
    return false;
  }
}

// ---------------- ORDERS ----------------
export async function getOrdersFromSupabase(): Promise<Order[] | null> {
  const sb = getSupabase();
  if (!sb) return null;

  try {
    const { data, error } = await sb
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });

    if (error || !data) return null;

    return data.map((row) => ({
      id: row.id,
      orderNumber: row.order_number,
      createdAt: row.created_at,
      customer: {
        fullName: row.customer_name,
        email: row.customer_email,
        phone: row.customer_phone,
        addressLine1: row.shipping_address?.addressLine1 || "",
        addressLine2: row.shipping_address?.addressLine2 || "",
        city: row.shipping_address?.city || "",
        state: row.shipping_address?.state || "",
        postalCode: row.shipping_address?.postalCode || "",
        country: row.shipping_address?.country || "India",
      },
      items: (row.order_items || []).map((item: any) => ({
        productId: item.product_id,
        title: item.title,
        image: item.image_url,
        unitPrice: Number(item.unit_price),
        quantity: item.quantity,
        totalPrice: Number(item.total_price),
        bundleId: item.bundle_id,
        bundleName: item.bundle_name,
        freeGifts: item.free_gifts || [],
      })),
      subtotal: Number(row.subtotal),
      discountAmount: Number(row.discount_amount || 0),
      discountCode: row.discount_code,
      shippingCharges: Number(row.shipping_charges || 0),
      totalAmount: Number(row.total_amount),
      orderStatus: row.order_status,
      paymentStatus: row.payment_status,
      paymentMethod: row.payment_method,
      razorpayOrderId: row.razorpay_order_id,
      razorpayPaymentId: row.razorpay_payment_id,
      trackingNumber: row.tracking_number,
      notes: row.notes || "",
    }));
  } catch (err) {
    console.error("Supabase getOrders error:", err);
    return null;
  }
}

export async function saveOrderToSupabase(order: Order): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;

  try {
    // 1. Insert order record
    const { error: orderError } = await sb.from("orders").insert({
      id: order.id,
      order_number: order.orderNumber,
      customer_name: order.customer.fullName,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone,
      shipping_address: order.customer,
      subtotal: order.subtotal,
      discount_amount: order.discountAmount || 0,
      discount_code: order.discountCode,
      shipping_charges: order.shippingCharges || 0,
      total_amount: order.totalAmount,
      order_status: order.orderStatus,
      payment_status: order.paymentStatus,
      payment_method: order.paymentMethod,
      razorpay_order_id: order.razorpayOrderId,
      razorpay_payment_id: order.razorpayPaymentId,
      tracking_number: order.trackingNumber,
      notes: order.notes,
      created_at: order.createdAt,
    });

    if (orderError) {
      console.error("Supabase order insert error:", orderError);
      return false;
    }

    // 2. Insert order items
    if (order.items && order.items.length > 0) {
      const itemsPayload = order.items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        title: item.title,
        image_url: item.image,
        bundle_id: item.bundleId,
        bundle_name: item.bundleName,
        unit_price: item.unitPrice,
        quantity: item.quantity,
        total_price: item.totalPrice,
        free_gifts: item.freeGifts || [],
      }));

      await sb.from("order_items").insert(itemsPayload);
    }

    return true;
  } catch (err) {
    console.error("Supabase saveOrder error:", err);
    return false;
  }
}

export async function updateOrderStatusInSupabase(
  orderIdOrNumber: string,
  orderStatus: string,
  paymentStatus?: string,
  trackingNumber?: string
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;

  try {
    const payload: any = {
      order_status: orderStatus,
      updated_at: new Date().toISOString(),
    };
    if (paymentStatus) payload.payment_status = paymentStatus;
    if (trackingNumber) payload.tracking_number = trackingNumber;

    const { error } = await sb
      .from("orders")
      .update(payload)
      .or(`id.eq.${orderIdOrNumber},order_number.eq.${orderIdOrNumber}`);

    return !error;
  } catch (err) {
    console.error("Supabase updateOrderStatus error:", err);
    return false;
  }
}

// ---------------- REVIEWS ----------------
export async function getReviewsFromSupabase(
  productId?: string,
  all: boolean = false
): Promise<Review[] | null> {
  const sb = getSupabase();
  if (!sb) return null;

  try {
    let query = sb.from("reviews").select("*").order("created_at", { ascending: false });
    if (productId) query = query.eq("product_id", productId);
    if (!all) query = query.eq("status", "approved");

    const { data, error } = await query;
    if (error || !data) return null;

    return data.map((row) => ({
      id: row.id,
      productId: row.product_id,
      author: row.author,
      avatar: row.avatar,
      location: row.location,
      rating: row.rating,
      date: row.created_at ? row.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
      title: row.title,
      content: row.content,
      verifiedPurchase: Boolean(row.verified_purchase),
      images: row.images || [],
      helpfulCount: row.helpful_count || 0,
      status: row.status,
    }));
  } catch (err) {
    console.error("Supabase getReviews error:", err);
    return null;
  }
}
