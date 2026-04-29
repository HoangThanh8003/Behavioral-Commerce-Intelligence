import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts } from '@/services/products';
import { formatCurrency } from '@/lib/utils';
import { ProductCard } from '@/components/features/products/ProductCard';
import { ShoppingCart, Truck, ShieldCheck, RotateCcw } from 'lucide-react';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found | ZENTO' };

  return {
    title: `${product.name} | ZENTO`,
    description: product.description || `Shop ${product.name} at ZENTO.`,
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
        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 font-body text-xs text-text-tertiary">
          <Link href="/" className="hover:text-text-secondary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-text-secondary transition-colors">Shop</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/products?category=${product.categoryId}`} className="hover:text-text-secondary transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-text-secondary">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Left: Product Images */}
          <div className="space-y-3">
            <div className="relative aspect-square bg-surface border border-border overflow-hidden rounded-xl">
              {product.imageUrls?.[0] ? (
                <Image 
                  src={product.imageUrls[0]} 
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <span className="font-body text-sm text-text-tertiary">Image coming soon</span>
                </div>
              )}
            </div>
            {/* Thumbnail gallery */}
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.imageUrls.slice(0, 4).map((url, i) => (
                  <div key={i} className="relative aspect-square bg-surface border border-border rounded-xl overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-all duration-200">
                    <Image src={url} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8">
            {/* Category & Name */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
                <span className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                  {product.category?.name || 'New Arrival'}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>
            
            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xl font-medium text-text-primary">
                {formatCurrency(Number(product.price))}
              </span>
              {product.comparePrice && (
                <span className="font-mono text-base text-text-tertiary line-through">
                  {formatCurrency(Number(product.comparePrice))}
                </span>
              )}
              {product.comparePrice && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-success-muted text-success-text font-body text-xs font-semibold tracking-widest uppercase">
                  Sale
                </span>
              )}
            </div>

            {/* Description */}
            <p className="font-body text-base text-text-secondary leading-relaxed max-w-prose">
              {product.description}
            </p>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4 border-y border-border py-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck size={16} className="text-text-secondary" />
                <span className="font-body text-[11px] text-text-secondary leading-tight">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck size={16} className="text-text-secondary" />
                <span className="font-body text-[11px] text-text-secondary leading-tight">2-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw size={16} className="text-text-secondary" />
                <span className="font-body text-[11px] text-text-secondary leading-tight">30-Day Returns</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-emerald hover:bg-emerald-hover text-emerald-on-emerald font-body text-sm font-semibold px-5 h-12 rounded-lg transition-colors duration-150 active:scale-[0.98]">
                Add to Cart
              </button>
              <button className="w-12 h-12 rounded-lg bg-transparent border border-[#3A6A4A] hover:border-emerald-border hover:bg-emerald-muted flex items-center justify-center transition-colors duration-150 active:scale-[0.98]">
                <ShoppingCart size={16} className="text-[#C8E8D0]" />
              </button>
            </div>

            {/* SKU */}
            {product.sku && (
              <p className="font-mono text-xs text-text-tertiary">
                SKU: {product.sku}
              </p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 space-y-8">
            <div className="flex items-end justify-between border-b border-border pb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
                  <span className="font-body text-xs text-text-tertiary tracking-wide">You may also like</span>
                </div>
                <h2 className="font-display text-3xl font-semibold text-text-primary tracking-tight">
                  Recommended
                </h2>
              </div>
              <Link href="/products" className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
