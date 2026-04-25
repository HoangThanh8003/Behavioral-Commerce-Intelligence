import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@nexusai/types';
import { ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean;
}

export const ProductCard = ({ product, isFeatured = false }: ProductCardProps) => {
  return (
    <div className={cn(
      "group relative overflow-hidden transition-all duration-500 rounded-lg",
      isFeatured 
        ? "md:h-full" 
        : "bg-surface/40 border border-border hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary),0.05)]"
    )}>
      <Link 
        href={`/products/${product.slug}`} 
        className={cn(
          "block h-full overflow-hidden",
          isFeatured && "relative min-h-[400px] md:min-h-full"
        )}
      >
        {/* Image Area */}
        <div className={cn(
          "relative overflow-hidden bg-overlay/20",
          isFeatured ? "absolute inset-0 z-0" : "aspect-[4/5]"
        )}>
          {product.imageUrls?.[0] ? (
            <Image 
              src={product.imageUrls[0]} 
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-transform duration-1000 group-hover:scale-110",
                isFeatured && "opacity-60"
              )}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-[10px] text-text-tertiary">
              IMAGE_PENDING
            </div>
          )}

          {isFeatured && (
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          )}
        </div>
        
        {/* Content Area */}
        <div className={cn(
          "relative flex flex-col justify-between p-6 z-20",
          isFeatured ? "h-full min-h-[400px]" : "h-auto"
        )}>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                  {product.category?.name || 'Limited'}
                </span>
                <h3 className={cn(
                  "font-serif font-bold text-text-primary tracking-tight leading-none",
                  isFeatured ? "text-4xl md:text-5xl lg:text-6xl" : "text-xl"
                )}>
                  {product.name}
                </h3>
              </div>
              <div className="p-2 rounded-full border border-border group-hover:border-primary/50 transition-colors">
                <ArrowUpRight size={16} className="group-hover:text-primary" />
              </div>
            </div>

            {isFeatured && (
              <p className="font-body text-text-secondary text-sm md:text-base leading-relaxed max-w-md italic opacity-80">
                {product.description || 'Refined for your workflow. Designed for absolute focus.'}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-6">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">MSRP</span>
              <span className={cn(
                "font-mono font-medium text-text-primary",
                isFeatured ? "text-2xl" : "text-lg"
              )}>
                {formatCurrency(Number(product.price))}
              </span>
            </div>
            
            {isFeatured && (
              <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-md">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">Picked for You</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
