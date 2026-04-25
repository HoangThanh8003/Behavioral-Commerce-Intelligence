'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Category } from '@nexusai/types';

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection = ({ categories }: CategorySectionProps) => {
  const { t } = useTranslation();
  // Take 4 main categories
  const displayCategories = categories.slice(0, 4);

  return (
    <section className="py-24 bg-canvas border-t border-border">
      <div className="container mx-auto px-6 md:px-10">
        <div className="space-y-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
              03 — EXPLORE
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-text-primary tracking-tight">
            {t('home.categories.headline')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-[4/5] group rounded-sm border border-border bg-surface/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-text-primary/40"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-text-primary/20 to-transparent transition-opacity duration-300 group-hover:via-text-primary/50" />

              <Link href={`/products?category=${category.slug}`} className="absolute inset-0 z-20">
                <span className="sr-only">View {category.name}</span>
              </Link>
              
              {category.imageUrl && (
                <div className="absolute inset-0 opacity-40 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-60">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent opacity-90" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-between relative z-10 pointer-events-none">
                <div className="flex justify-end">
                  <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-tertiary mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-text-primary tracking-tight">
                    {category.name}
                  </h3>
                  <p className="font-body text-[10px] text-text-secondary mt-1 max-w-[180px]">
                    {category.description || t(`home.categories.${category.slug}`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
