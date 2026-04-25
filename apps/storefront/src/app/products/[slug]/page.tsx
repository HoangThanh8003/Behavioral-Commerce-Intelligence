import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductBySlug, getRelatedProducts } from '@/services/products';
import { formatCurrency } from '@/lib/utils';
import { ProductCard } from '@/components/features/products/ProductCard';
import { ShoppingCart, ShieldCheck, Zap, Globe } from 'lucide-react';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | ZENTO`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);

  return (
    <main className="bg-canvas min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left: Visual Artifacts */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-surface/30 border border-border overflow-hidden rounded-sm">
              {product.imageUrls?.[0] ? (
                <Image 
                  src={product.imageUrls[0]} 
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center font-mono text-[10px] text-text-tertiary">
                  VISUAL_ASSET_PENDING
                </div>
              )}
            </div>
            {/* Secondary images if any */}
            <div className="grid grid-cols-3 gap-4">
               {product.imageUrls?.slice(1, 4).map((url, i) => (
                 <div key={i} className="relative aspect-square bg-surface/30 border border-border rounded-sm overflow-hidden">
                   <Image src={url} alt={`${product.name} detail`} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Technical Specs & Acquisition */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary">
                    {product.category?.name || 'Essential Drop'}
                  </span>
                </div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-primary tracking-tighter">
                  {product.name}
                </h1>
              </div>
              
              <div className="flex items-baseline gap-4">
                 <span className="font-mono text-3xl text-text-primary">{formatCurrency(Number(product.price))}</span>
                 {product.comparePrice && (
                   <span className="font-mono text-lg text-text-tertiary line-through">{formatCurrency(Number(product.comparePrice))}</span>
                 )}
              </div>

              <p className="font-body text-lg text-text-secondary leading-relaxed italic opacity-90 max-w-xl">
                {product.description}
              </p>
            </div>

            {/* Features/Specs Grid */}
            <div className="grid grid-cols-2 gap-y-10 gap-x-8 border-y border-border/50 py-12">
               <div className="flex gap-4">
                 <Zap size={18} className="text-primary mt-1" strokeWidth={1.5} />
                 <div className="space-y-1">
                   <span className="font-mono text-[10px] uppercase tracking-widest text-text-primary">Response</span>
                   <p className="font-body text-[11px] text-text-tertiary">Calibrated for zero-latency input.</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <ShieldCheck size={18} className="text-primary mt-1" strokeWidth={1.5} />
                 <div className="space-y-1">
                   <span className="font-mono text-[10px] uppercase tracking-widest text-text-primary">Integrity</span>
                   <p className="font-body text-[11px] text-text-tertiary">CNC-machined industrial housing.</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <Globe size={18} className="text-primary mt-1" strokeWidth={1.5} />
                 <div className="space-y-1">
                   <span className="font-mono text-[10px] uppercase tracking-widest text-text-primary">Global</span>
                   <p className="font-body text-[11px] text-text-tertiary">Priority logistics and support.</p>
                 </div>
               </div>
            </div>

            {/* Action Area */}
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <button className="flex-1 h-14 bg-primary text-canvas font-mono text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                   Add to Collection
                 </button>
                 <button className="w-14 h-14 border border-border flex items-center justify-center hover:border-primary/50 transition-colors">
                    <ShoppingCart size={18} />
                 </button>
               </div>
               <p className="font-mono text-[8px] text-center text-text-tertiary uppercase tracking-[0.2em]">
                 BATCH_IDENTIFIER: {product.sku || 'ZN-UNKNOWN'} // ORIGIN: OSLO_LAB
               </p>
            </div>
          </div>
        </div>

        {/* Related Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-40 space-y-12">
            <div className="flex items-end justify-between border-b border-border/50 pb-6">
              <h2 className="font-serif text-3xl text-text-primary tracking-tight">Recommended <span className="italic text-text-secondary">Synergy.</span></h2>
              <a href="/products" className="font-mono text-[9px] uppercase tracking-widest text-primary hover:underline">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {relatedProducts.slice(0, 4).map((rp) => (
                 <ProductCard key={rp.id} product={rp} />
               ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
