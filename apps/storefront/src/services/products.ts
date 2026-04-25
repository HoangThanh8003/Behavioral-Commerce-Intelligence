import { Product, Category } from '@nexusai/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ── Mock Data ────────────────────────────────────────────
// Used when API is unavailable. Will be replaced by real API calls.
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Quantum Runner Pro',
    slug: 'quantum-runner-pro',
    description: 'Engineered for the modern urban explorer. The Quantum Runner Pro combines adaptive cushioning technology with a sleek, minimalist design. Every step is analyzed by our embedded AI core to optimize comfort in real time. Features graphene-infused midsole, recycled ocean-bound plastics upper, and our proprietary NexusFit adaptive lacing system.',
    price: 249,
    comparePrice: 299,
    sku: 'NXS-QRP-001',
    imageUrls: [],
    categoryId: 'cat-1',
    category: { id: 'cat-1', name: 'Footwear', slug: 'footwear', description: null, imageUrl: null, sortOrder: 1, parentId: null, createdAt: '', updatedAt: '' },
    createdAt: '2026-01-15',
    updatedAt: '2026-04-20',
  },
  {
    id: '2',
    name: 'Neural Jacket X1',
    slug: 'neural-jacket-x1',
    description: 'Temperature-reactive fabric that adapts to your body heat signature. The Neural Jacket X1 uses phase-change materials to maintain optimal comfort across a 25°C range. Water-resistant DWR coating, hidden magnetic closures, and integrated signal-blocking inner pocket for digital privacy.',
    price: 389,
    comparePrice: null,
    sku: 'NXS-NJX-002',
    imageUrls: [],
    categoryId: 'cat-2',
    category: { id: 'cat-2', name: 'Outerwear', slug: 'outerwear', description: null, imageUrl: null, sortOrder: 2, parentId: null, createdAt: '', updatedAt: '' },
    createdAt: '2026-02-10',
    updatedAt: '2026-04-18',
  },
  {
    id: '3',
    name: 'Helix Backpack 30L',
    slug: 'helix-backpack-30l',
    description: 'Designed for the data-driven commuter. The Helix Backpack features a dedicated laptop bay with shock-absorption gel padding, RFID-shielded front pocket, and a modular internal organization system. Made from recycled ballistic nylon with YKK AquaGuard zippers throughout.',
    price: 175,
    comparePrice: 210,
    sku: 'NXS-HBP-003',
    imageUrls: [],
    categoryId: 'cat-3',
    category: { id: 'cat-3', name: 'Accessories', slug: 'accessories', description: null, imageUrl: null, sortOrder: 3, parentId: null, createdAt: '', updatedAt: '' },
    createdAt: '2026-03-01',
    updatedAt: '2026-04-15',
  },
  {
    id: '4',
    name: 'Cortex Sunglasses',
    slug: 'cortex-sunglasses',
    description: 'Precision-engineered acetate frames with AI-optimized lens geometry for maximum visual clarity. Anti-reflective coating, UV400 protection, and photochromic transition lenses that adapt to light conditions in under 3 seconds. Titanium hinges rated for 50,000+ open-close cycles.',
    price: 195,
    comparePrice: null,
    sku: 'NXS-CSG-004',
    imageUrls: [],
    categoryId: 'cat-3',
    category: { id: 'cat-3', name: 'Accessories', slug: 'accessories', description: null, imageUrl: null, sortOrder: 3, parentId: null, createdAt: '', updatedAt: '' },
    createdAt: '2026-03-10',
    updatedAt: '2026-04-20',
  },
  {
    id: '5',
    name: 'Synth Layer Tee',
    slug: 'synth-layer-tee',
    description: 'The perfect base layer. Seamless construction from a single thread of silver-ion treated merino-synthetic blend. Naturally antimicrobial, thermoregulating, and designed to be worn for days without washing. Minimalist branding with a hidden NFC tag for authentication.',
    price: 89,
    comparePrice: null,
    sku: 'NXS-SLT-005',
    imageUrls: [],
    categoryId: 'cat-4',
    category: { id: 'cat-4', name: 'Apparel', slug: 'apparel', description: null, imageUrl: null, sortOrder: 4, parentId: null, createdAt: '', updatedAt: '' },
    createdAt: '2026-03-20',
    updatedAt: '2026-04-22',
  },
  {
    id: '6',
    name: 'Pulse Watch Mk.IV',
    slug: 'pulse-watch-mk-iv',
    description: 'More than a timepiece — a behavioral companion. The Pulse Watch Mk.IV tracks biometrics, syncs with NexusAI to anticipate your needs, and surfaces contextual product recommendations based on your activity patterns. Sapphire crystal, titanium case, 14-day battery life.',
    price: 599,
    comparePrice: 699,
    sku: 'NXS-PWM-006',
    imageUrls: [],
    categoryId: 'cat-3',
    category: { id: 'cat-3', name: 'Accessories', slug: 'accessories', description: null, imageUrl: null, sortOrder: 3, parentId: null, createdAt: '', updatedAt: '' },
    createdAt: '2026-04-01',
    updatedAt: '2026-04-24',
  },
];

// ── API Functions ────────────────────────────────────────

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products?limit=8`, { 
      next: { revalidate: 3600 },
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) return MOCK_PRODUCTS.slice(0, 8);
    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return MOCK_PRODUCTS.slice(0, 8);
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, { 
      next: { revalidate: 86400 } 
    });
    if (!res.ok) return getMockCategories();
    return res.json();
  } catch (error) {
    return getMockCategories();
  }
}

export async function getProducts(params?: { 
  categoryId?: string; 
  page?: number; 
  limit?: number 
}): Promise<Product[]> {
  const { categoryId, page = 1, limit = 12 } = params || {};
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(categoryId && { categoryId })
  });

  try {
    const res = await fetch(`${API_URL}/products?${query}`, { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) return filterMockProducts(categoryId, limit);
    return res.json();
  } catch (error) {
    return filterMockProducts(categoryId, limit);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/slug/${slug}`, {
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
    return res.json();
  } catch (error) {
    return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
  }
}

export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products/${productId}/related?limit=${limit}`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) return MOCK_PRODUCTS.filter(p => p.id !== productId).slice(0, limit);
    return res.json();
  } catch (error) {
    return MOCK_PRODUCTS.filter(p => p.id !== productId).slice(0, limit);
  }
}

// ── Helpers ──────────────────────────────────────────────

function getMockCategories(): Category[] {
  const cats = new Map<string, Category>();
  for (const p of MOCK_PRODUCTS) {
    if (p.category && !cats.has(p.category.id)) {
      cats.set(p.category.id, p.category);
    }
  }
  return Array.from(cats.values());
}

function filterMockProducts(categoryId?: string, limit = 12): Product[] {
  let results = MOCK_PRODUCTS;
  if (categoryId) {
    results = results.filter(p => p.categoryId === categoryId);
  }
  return results.slice(0, limit);
}
