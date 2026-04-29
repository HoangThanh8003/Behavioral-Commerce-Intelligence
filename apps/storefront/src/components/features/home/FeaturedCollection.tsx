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
    <section className="py-24 bg-canvas relative overflow-hidden">
      {/* Atmospheric Background Element */}
      <div className="absolute top-1/4 -right-1/4 w-[50%] h-[50%] bg-emerald/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[40%] h-[40%] bg-emerald/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-border/30 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald shadow-[0_0_10px_theme(colors.emerald.DEFAULT/0.5)] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
                02 — EDITORIAL
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-text-primary tracking-tight leading-[0.9]">
              The Current Edit
            </h2>
          </div>
          <p className="font-body text-[11px] text-text-tertiary max-w-[220px] md:text-right leading-relaxed uppercase tracking-widest opacity-60">
            Curated pieces picked for you. Updated weekly for the modern workspace.
          </p>
        </div>

        {/* Single Level Grid for Perfect Alignment */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:h-[850px]"
        >
          {/* Main Product Card - Spans 2 cols and 2 rows */}
          <div className="md:col-span-2 md:row-span-2">
            {products[0] && (
              <ProductCard product={products[0]} isFeatured={true} />
            )}
          </div>

          {/* Secondary Items - Each spans 2 cols and 1 row */}
          {products.slice(1, 3).map((product, idx) => (
            <div 
              key={product.id} 
              className="md:col-span-2 md:row-span-1"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
