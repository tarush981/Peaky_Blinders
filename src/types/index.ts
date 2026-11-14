export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge?: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  originalPrice: number;
  sellingPrice: number;
  discountPercentage: number;
  stock: number;
  rating: number;
  reviewCount: number;
  images: string[];
  bundles: BundleOption[];
  includedItems: string[];
  category: string;
  isFeatured: boolean;
}

export interface BundleOption {
  id: string;
  name: string;
  tagline: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  originalPrice: number;
  savings: number;
  discountBadge: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  freeGifts: string[];
}

export interface CartItem {
  productId: string;
  title: string;
  image: string;
  unitPrice: number;
  quantity: number;
  bundleId?: string;
  bundleName?: string;
  freeGifts?: string[];
  totalPrice: number;
}

export interface CustomerShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = 'pending' | 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'razorpay' | 'upi' | 'cod' | 'test_mode';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerShippingAddress;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discountCode?: string;
  shippingCharges: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  upiUtr?: string;
  trackingNumber?: string;
  notes?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  images?: string[];
  helpfulCount: number;
  status: 'approved' | 'pending' | 'rejected';
}

export interface DiscountCode {
  code: string;
  discountPercent: number;
  flatDiscount?: number;
  minOrderValue?: number;
  validUntil?: string;
  isActive: boolean;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'shipping' | 'product' | 'usage' | 'warranty' | 'payments';
}
