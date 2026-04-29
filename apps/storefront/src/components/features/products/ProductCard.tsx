import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@nexusai/types';
import { ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { AddToCartButton } from '@/components/shared';

interface ProductCardProps {
  product: Product;
  isFeatured?: boolean;
}

export const ProductCard = ({ product, isFeatured = false }: ProductCardProps) => {
  return (
    <div className={cn(
      "group relative overflow-hidden transition-all duration-700 rounded-sm h-full flex flex-col",
      isFeatured 
        ? "bg-background shadow-2xl shadow-canvas" 
        : "bg-surface/40 backdrop-blur-md border border-border/50 hover:border-emerald/40 hover:bg-surface/60 shadow-lg shadow-canvas hover:shadow-2xl hover:shadow-emerald/20 transition-all duration-500"
    )}>
      <Link 
        href={`/products/${product.slug}`} 
        className={cn(
          "flex flex-col h-full overflow-hidden",
          isFeatured && "relative min-h-[400px] md:min-h-full"
        )}
      >
        {/* Image Area */}
        <div className={cn(
          "relative overflow-hidden bg-overlay/5",
          isFeatured ? "absolute inset-0 z-0" : "aspect-[3/1]"
        )}>
          {product.imageUrls?.[0] ? (
            <Image 
              src={product.imageUrls[0]} 
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-transform duration-1000 group-hover:scale-105",
                isFeatured ? "opacity-50 grayscale hover:grayscale-0 transition-all duration-700" : "grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0"
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
          "relative flex flex-col p-6 md:p-10 z-20 flex-1",
          isFeatured ? "justify-end h-full bg-gradient-to-t from-background/90 via-background/20 to-transparent" : "justify-between"
        )}>
          <div className={cn("space-y-4", isFeatured && "mt-auto max-w-3xl")}>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald font-bold">
                  {product.category?.name || 'Limited Edition'}
                </span>
                <h3 className={cn(
                  "font-display font-bold text-text-primary tracking-tighter leading-[0.85] transition-colors group-hover:text-emerald",
                  isFeatured ? "text-5xl md:text-7xl lg:text-8xl" : "text-3xl md:text-4xl"
                )}>
                  {product.name}
                </h3>
              </div>
              <div className="p-3 rounded-full border border-border group-hover:border-emerald/50 group-hover:bg-emerald/5 transition-all duration-500 transform group-hover:rotate-12">
                <ArrowUpRight size={20} className="text-text-secondary group-hover:text-emerald transition-colors" />
              </div>
            </div>

            {isFeatured && (
              <p className="font-display italic text-text-secondary text-base md:text-xl leading-relaxed max-w-2xl opacity-80 line-clamp-3">
                {product.description || 'Refined for your workflow. Designed for absolute focus.'}
              </p>
            )}
          </div>

          <div className="flex items-end justify-between mt-8 md:mt-12">
            <div className="flex flex-col group/price">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-tertiary mb-3 font-medium">MSRP</span>
              <span className={cn(
                "font-mono font-bold text-text-primary transition-all duration-300 tracking-tighter leading-none",
                isFeatured ? "text-5xl md:text-6xl" : "text-3xl group-hover/price:text-emerald"
              )}>
                {formatCurrency(Number(product.price))}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <AddToCartButton 
                product={product} 
                variant={isFeatured ? "primary" : "outline"} 
                className={isFeatured ? "h-12 px-8" : "h-9 px-4"}
              />
              
              {isFeatured && (
                <div className="hidden md:flex px-8 py-3 bg-emerald/10 border border-emerald/20 rounded-full backdrop-blur-xl group-hover:bg-emerald/20 transition-all duration-500">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald font-bold">Picked for You</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
