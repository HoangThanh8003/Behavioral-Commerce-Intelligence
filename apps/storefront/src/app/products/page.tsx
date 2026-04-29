import { Metadata } from 'next';
import { getProducts, getCategories } from '@/services/products';
import { ProductCard } from '@/components/features/products/ProductCard';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop All | ZENTO',
  description: 'Browse the complete ZENTO collection of precision workspace gear. Mechanical keyboards, audio, lighting, and accessories.',
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

  const activeCategory = categories.find(c => c.id === categoryId);

  return (
    <main className="bg-canvas min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
              <span className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                Shop
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-text-primary tracking-tight leading-none">
              {activeCategory ? activeCategory.name : 'All Products'}
            </h1>
            <p className="font-body text-sm text-text-secondary max-w-md leading-relaxed">
              {activeCategory 
                ? `Explore our ${activeCategory.name.toLowerCase()} collection.`
                : 'Each piece is engineered for the modern professional workspace.'}
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <a 
              href="/products"
              className={`px-5 h-10 rounded-lg inline-flex items-center font-body text-sm font-normal transition-colors duration-150 ${
                !categoryId 
                  ? 'bg-emerald text-emerald-on-emerald font-semibold' 
                  : 'bg-transparent border border-[#3A6A4A] text-[#C8E8D0] hover:border-emerald-border hover:bg-emerald-muted'
              }`}
            >
              All
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`px-5 h-10 rounded-lg inline-flex items-center font-body text-sm font-normal transition-colors duration-150 ${
                  categoryId === cat.id 
                    ? 'bg-emerald text-emerald-on-emerald font-semibold' 
                    : 'bg-transparent border border-[#3A6A4A] text-[#C8E8D0] hover:border-emerald-border hover:bg-emerald-muted'
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>

        {/* Product Count */}
        <div className="mb-8 pb-4 border-b border-border">
          <span className="font-mono text-xs text-text-tertiary">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>

        {/* Product Grid */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-surface border border-border rounded-xl" />
            ))}
          </div>
        }>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center border border-dashed border-border rounded-xl">
              <p className="font-display text-2xl text-text-primary italic mb-2">No products found.</p>
              <p className="font-body text-sm text-text-secondary mb-6">
                Try selecting a different category or browse all products.
              </p>
              <a 
                href="/products" 
                className="inline-flex items-center px-5 h-10 rounded-lg bg-emerald text-emerald-on-emerald font-body text-sm font-semibold transition-colors duration-150 hover:bg-emerald-hover"
              >
                View All Products
              </a>
            </div>
          )}
        </Suspense>

        {/* Load More */}
        {products.length >= 12 && (
          <div className="mt-16 flex justify-center">
            <button className="px-5 h-10 rounded-lg bg-transparent border border-[#3A6A4A] text-[#C8E8D0] hover:border-emerald-border hover:bg-emerald-muted font-body text-sm font-normal transition-colors duration-150 active:scale-[0.98]">
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
