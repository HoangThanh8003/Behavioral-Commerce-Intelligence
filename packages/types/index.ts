// ============================================================
// NexusAI — Shared TypeScript Interfaces
// Source: apps/core-backend/prisma/schema.prisma
// Rule: Update this file whenever Prisma schema changes.
// ============================================================

// --- Enums ---

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'STAFF';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 'UNPAID' | 'PAID' | 'FAILED' | 'REFUNDED';

// --- Base ---

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// --- User ---

export interface User extends BaseEntity {
  email: string;
  name: string;
  phone: string | null;
  role: UserRole;
  avatarUrl: string | null;
  isActive: boolean;
}

// --- Category ---

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  parentId: string | null;
}

// --- Product ---

export interface Product extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  sku: string;
  imageUrls: string[];
  categoryId: string;
}

// --- Inventory ---

export interface Inventory extends BaseEntity {
  quantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;
  productId: string;
}

// --- Cart ---

export interface Cart extends BaseEntity {
  isActive: boolean;
  userId: string;
}

export interface CartItem extends BaseEntity {
  quantity: number;
  priceAtAdd: number;
  cartId: string;
  productId: string;
}

// --- Order ---

export interface Order extends BaseEntity {
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  note: string | null;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  userId: string;
}

export interface OrderItem extends BaseEntity {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productName: string;
  productSku: string;
  orderId: string;
  productId: string;
}

// --- Behavioral / AI ---

export interface BaseEvent {
  timestamp: string;
}

export interface ClickEvent extends BaseEvent {
  elementId: string;
  pageUrl: string;
}

export interface PurchaseEvent extends BaseEvent {
  productId: string;
  amount: number;
  currency: string;
}

export type NexusEvent = ClickEvent | PurchaseEvent;

export interface UserPersona extends BaseEntity {
  traits: Record<string, unknown>;
  userId: string;
}
