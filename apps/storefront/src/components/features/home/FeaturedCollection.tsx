"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Product } from "@nexusai/types";
import { ProductCard } from "@/components/features/products/ProductCard";

interface FeaturedCollectionProps {
  products: Product[];
}

export const FeaturedCollection = ({ products }: FeaturedCollectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-canvas overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-border/50 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
              <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-primary">
                Your Aesthetic Signature
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              The Current Edit
            </h2>
          </div>
          <p className="font-body text-xs text-text-secondary italic max-w-[280px] md:text-right leading-relaxed opacity-80">
            Curated pieces that resonate with your industrial-minimalist profile.
          </p>
        </div>

        {/* Refined Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Main Product Card - Now more balanced */}
          <div className="md:col-span-2 md:row-span-2">
            {products[0] && (
              <ProductCard product={products[0]} isFeatured={true} />
            )}
          </div>

          {/* Secondary Grid Items */}
          {products.slice(1, 5).map((product) => (
            <div key={product.id} className="md:col-span-1">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
