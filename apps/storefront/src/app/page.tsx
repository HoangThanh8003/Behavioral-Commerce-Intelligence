import { Metadata } from 'next';
import { getFeaturedProducts, getCategories } from '@/services/products';
import { Hero } from '@/components/features/home/Hero';
import { FeaturedCollection } from '@/components/features/home/FeaturedCollection';
import { CategorySection } from '@/components/features/home/CategorySection';
import { PersonaSwitcher } from '@/components/features/home/PersonaSwitcher';
import { SystemFit } from '@/components/features/home/SystemFit';
import { EngineeredDetail } from '@/components/features/home/EngineeredDetail';
import { RitualOfUse } from '@/components/features/home/RitualOfUse';
import { EngineeredSurfaces } from '@/components/features/home/EngineeredSurfaces';
import { TransmissionFeed } from '@/components/features/home/TransmissionFeed';

export const metadata: Metadata = {
  title: 'ZENTO | Precision Workspace Gear',
  description: 'Engineered silence. Precision focus. High-end mechanical instruments and workspace ecosystems for the modern professional.',
};

export default async function HomePage() {
  const products = await getFeaturedProducts();
  const categories = await getCategories();
  
  const featuredProducts = products.slice(0, 3); // For the asymmetrical grid

  return (
    <main className="bg-canvas min-h-screen">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. The Current Edit (Bento Grid) */}
      <FeaturedCollection products={featuredProducts} />

      {/* 3. Categories (Collections) */}
      <CategorySection categories={categories} />

      {/* 4. Persona Switcher */}
      <PersonaSwitcher />

      {/* 5. System Fit (Workspace Ecosystems) */}
      <SystemFit />

      {/* 6. Engineered Detail (Spec Sheet Section) */}
      <EngineeredDetail />

      {/* 7. Ritual of Use */}
      <RitualOfUse />

      {/* 8. Engineered Surfaces */}
      <EngineeredSurfaces />

      {/* 9. Transmission Feed (Subtle Real-time Feel) */}
      <TransmissionFeed />
    </main>
  );
}
