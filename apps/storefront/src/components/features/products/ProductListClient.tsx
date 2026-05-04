'use client';

import { useState, useEffect } from 'react';
import { Product } from '@nexusai/types';
import { ProductCard } from './ProductCard';
import { getProducts } from '@/services/products';

interface ProductListClientProps {
  initialProducts: Product[];
  categorySlug?: string;
  initialPage: number;
  limit: number;
}

export function ProductListClient({
  initialProducts,
  categorySlug,
  initialPage,
  limit,
}: ProductListClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProducts.length >= limit);

  // Reset state when category changes (initialProducts will change from server)
  useEffect(() => {
    setProducts(initialProducts);
    setPage(initialPage);
    setHasMore(initialProducts.length >= limit);
  }, [initialProducts, initialPage, limit]);

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const newProducts = await getProducts({
        categorySlug,
        page: nextPage,
        limit,
      });

      if (newProducts.length < limit) {
        setHasMore(false);
      }

      if (newProducts.length > 0) {
        setProducts((prev) => [...prev, ...newProducts]);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-8 h-12 rounded-lg bg-transparent border border-emerald/30 text-text-primary hover:border-emerald hover:bg-emerald/5 font-body text-sm font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-3">
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-emerald/20 border-t-emerald rounded-full animate-spin" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald animate-pulse">
                    Synchronizing...
                  </span>
                </>
              ) : (
                <>
                  <span>Load More</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                  <span className="font-mono text-[10px] text-text-tertiary group-hover:text-emerald transition-colors">
                    PAGE_{page + 1}
                  </span>
                </>
              )}
            </div>
          </button>
        </div>
      )}
    </>
  );
}
