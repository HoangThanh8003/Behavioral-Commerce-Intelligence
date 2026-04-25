import { Product, Category } from '@nexusai/types';

// ==========================================
// API CONFIGURATION
// ==========================================

// Fallback to localhost if env var is missing
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function getProducts(options?: {
  categoryId?: string;
  limit?: number;
  page?: number;
  featured?: boolean;
}): Promise<Product[]> {
  try {
    const searchParams = new URLSearchParams();
    if (options?.categoryId) searchParams.set('categoryId', options.categoryId);
    if (options?.limit) searchParams.set('limit', options.limit.toString());
    if (options?.page) searchParams.set('page', options.page.toString());
    
    // In a real API, we would pass 'featured' flag.
    // For now, if featured is requested, we'll just slice the array on the client side

    const response = await fetch(`${API_URL}/products?${searchParams.toString()}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Backend connection failed:', error);
    throw error;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch product');
    }

    return await response.json();
  } catch (error) {
    console.error('Backend connection failed:', error);
    throw error;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 60 * 60 }, // Cache categories for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await response.json();
  } catch (error) {
    console.error('Backend connection failed:', error);
    throw error;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    // In a real app, we might have a specific endpoint or flag
    const response = await fetch(`${API_URL}/products?limit=8`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch featured products');
    }

    return await response.json();
  } catch (error) {
    console.error('Backend connection failed:', error);
    throw error;
  }
}

export async function getRelatedProducts(productId: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/related`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch related products');
    }

    return await response.json();
  } catch (error) {
    console.error('Backend connection failed:', error);
    throw error;
  }
}
