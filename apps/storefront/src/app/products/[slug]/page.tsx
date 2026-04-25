import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/services/products';
import { ProductDetailClient } from '@/components/features/products/ProductDetailClient';
import { RelatedProducts } from '@/components/features/products/RelatedProducts';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return { title: 'Product Not Found | NexusAI' };
  }

  return {
    title: `${product.name} | NexusAI`,
    description: product.description || `Discover ${product.name} — curated by NexusAI behavioral intelligence.`,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: product.imageUrls?.[0] ? [{ url: product.imageUrls[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);

  return (
    <main className="min-h-screen pt-24 pb-20">
      <ProductDetailClient product={product} />
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </main>
  );
}
