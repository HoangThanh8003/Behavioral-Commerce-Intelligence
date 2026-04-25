import { Metadata } from 'next';
import { getProducts, getCategories } from '@/services/products';
import { ProductCard } from '@/components/features/products/ProductCard';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Catalog | ZENTO Precision Gear',
  description: 'Browse the complete ZENTO collection of precision instruments and workspace components.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string; page?: string };
}) {
  const categoryId = searchParams.category;
  const page = Number(searchParams.page || 1);
  
  const [products, categories] = await Promise.all([
    getProducts({ categoryId, page, limit: 12 }),
    getCategories()
  ]);

  return (
    <main className="bg-canvas min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
                The Catalog
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-text-primary tracking-tighter">
              All <span className="italic text-text-secondary">Instruments.</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/* Simple Category Filter */}
            <a 
              href="/products"
              className={`px-6 py-2 rounded-full border font-mono text-[10px] uppercase tracking-widest transition-all ${
                !categoryId ? 'bg-primary text-canvas border-primary' : 'border-border text-text-secondary hover:border-primary/50'
              }`}
            >
              All
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`px-6 py-2 rounded-full border font-mono text-[10px] uppercase tracking-widest transition-all ${
                  categoryId === cat.id ? 'bg-primary text-canvas border-primary' : 'border-border text-text-secondary hover:border-primary/50'
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-surface/30 animate-pulse rounded-sm border border-border" />
          ))}
        </div>}>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-40 text-center border border-dashed border-border rounded-sm">
              <p className="font-serif text-2xl text-text-secondary italic">No instruments found in this collection.</p>
              <a href="/products" className="mt-6 inline-block font-mono text-[10px] uppercase tracking-widest text-primary hover:underline">
                View All Pieces
              </a>
            </div>
          )}
        </Suspense>

        {/* Pagination Placeholder */}
        {products.length >= 12 && (
          <div className="mt-20 flex justify-center">
            <button className="px-12 py-4 border border-border hover:border-primary transition-colors font-mono text-[10px] uppercase tracking-[0.3em] text-text-primary">
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
