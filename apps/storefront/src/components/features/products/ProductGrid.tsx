import { Product } from '@nexusai/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  if (!products?.length) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 border border-dashed border-border rounded-2xl">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
          No_Artifacts_Found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Featured Section Header */}
      <div className="flex items-center gap-3">
        <span className="h-px w-12 bg-emerald/30" />
        <span className="font-mono text-[10px] font-semibold tracking-[0.3em] uppercase text-emerald">
          Featured Selection
        </span>
      </div>

      {/* Bento-style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isFeatured={index === 0} 
          />
        ))}
      </div>
    </div>
  );
};
