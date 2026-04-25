import { Metadata } from 'next';
import { getFeaturedProducts } from '@/services/products';
import { Hero } from '@/components/features/home/Hero';
import { ProductCarousel } from '@/components/features/home/ProductCarousel';
import { BrandMarquee } from '@/components/features/home/BrandMarquee';
import { Features } from '@/components/features/home/Features';
import { Testimonials } from '@/components/features/home/Testimonials';
import { CTABanner } from '@/components/features/home/CTABanner';

export const metadata: Metadata = {
  title: 'NexusAI | Behavioral Commerce Intelligence',
  description: 'Experience hyper-personalized commerce driven by real-time AI intent analysis. Shop smarter with NexusAI.',
};

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <main>
      <Hero />
      <BrandMarquee />
      <ProductCarousel products={products} />
      <Features />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
