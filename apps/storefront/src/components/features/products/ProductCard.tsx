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
      "group relative rounded-2xl overflow-hidden transition-all duration-300",
      isFeatured 
        ? "p-px emerald-gradient-border shadow-2xl md:col-span-2" 
        : "bg-surface border border-border hover:-translate-y-1 hover:border-emerald/40"
    )}>
      <Link 
        href={`/products/${product.slug}`} 
        className={cn(
          "block h-full bg-surface rounded-[15px] overflow-hidden",
          isFeatured && "grid md:grid-cols-2"
        )}
      >
        {/* Image Area */}
        <div className={cn(
          "relative overflow-hidden bg-overlay/50",
          isFeatured ? "aspect-square md:aspect-auto" : "aspect-[4/5]"
        )}>
          {product.imageUrls?.[0] ? (
            <Image 
              src={product.imageUrls[0]} 
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-[10px] text-text-tertiary">
              ARTIFACT_PENDING
            </div>
          )}

          {isFeatured && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-canvas/80 backdrop-blur-md border border-emerald/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              <span className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-emerald">AI Pick</span>
            </div>
          )}
        </div>
        
        {/* Content Area */}
        <div className={cn(
          "flex flex-col justify-between p-6 md:p-8",
          isFeatured && "md:p-10 lg:p-12"
        )}>
          <div className="space-y-4">
            <div>
              <h3 className={cn(
                "font-display font-semibold text-text-primary tracking-tight",
                isFeatured ? "text-3xl md:text-4xl lg:text-5xl" : "text-2xl"
              )}>
                {product.name}
              </h3>
              <p className={cn(
                "font-display italic text-text-secondary mt-1",
                isFeatured ? "text-lg" : "text-sm"
              )}>
                {product.category?.name || 'Essential Drop'}
              </p>
            </div>

            {isFeatured && (
              <p className="font-body text-text-secondary line-clamp-3 leading-relaxed hidden md:block">
                {product.description || 'Intelligently curated for your specific behavioral profile. This selection represents the intersection of current intent and long-term preference.'}
              </p>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className={cn(
              "font-mono font-medium text-text-primary",
              isFeatured ? "text-2xl" : "text-lg"
            )}>
              {formatCurrency(Number(product.price))}
            </span>
            
            <div className={cn(
              "flex items-center justify-center rounded-full bg-overlay border border-border text-text-secondary transition-all group-hover:bg-emerald group-hover:text-primary-foreground",
              isFeatured ? "h-14 w-14" : "h-10 w-10"
            )}>
              <ArrowUpRight size={isFeatured ? 24 : 18} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
