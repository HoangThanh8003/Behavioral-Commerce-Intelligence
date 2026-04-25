import { Metadata } from 'next';
import { Suspense } from 'react';
import { getProducts, getCategories } from '@/services/products';
import { ProductFilter } from '@/components/features/products/ProductFilter';
import { ProductGridCard } from '@/components/features/products/ProductGridCard';

export const metadata: Metadata = {
  title: 'Shop | NexusAI Catalog',
  description: 'Discover our curated collection of products, intelligently personalized for your behavioral profile.',
};

interface ProductsPageProps {
  searchParams: { category?: string; page?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [products, categories] = await Promise.all([
    getProducts({
      categoryId: searchParams.category,
      page: searchParams.page ? parseInt(searchParams.page) : 1,
      limit: 12,
    }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6 md:px-10">
        {/* Page Header */}
        <header className="mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-emerald/50" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald">
              Catalog
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-text-primary tracking-tight">
                {searchParams.category
                  ? categories.find(c => c.id === searchParams.category)?.name || 'Collection'
                  : 'All Products'
                }
              </h1>
              <p className="font-body text-base text-text-secondary mt-2 max-w-lg">
                Each product is curated through our behavioral intelligence engine,
                surfacing what matters most to you.
              </p>
            </div>
            <span className="font-mono text-xs text-text-tertiary">
              {products.length} items found
            </span>
          </div>
        </header>

        {/* Filters */}
        <Suspense fallback={null}>
          <div className="mb-12">
            <ProductFilter categories={categories} />
          </div>
        </Suspense>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product, index) => (
              <ProductGridCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-surface border border-border flex items-center justify-center">
              <span className="font-display text-3xl text-text-disabled">N</span>
            </div>
            <div className="text-center space-y-2">
              <p className="font-display text-xl text-text-primary">No products found</p>
              <p className="font-body text-sm text-text-tertiary">
                Try adjusting your filters or browse our full collection.
              </p>
            </div>
          </div>
        )}

        {/* Pagination hint */}
        {products.length >= 12 && (
          <div className="mt-16 text-center">
            <button className="h-12 rounded-lg border border-border px-10 font-body text-sm text-text-secondary transition-colors hover:border-emerald/40 hover:text-emerald">
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
