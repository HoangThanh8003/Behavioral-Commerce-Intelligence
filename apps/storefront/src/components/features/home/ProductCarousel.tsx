'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@nexusai/types';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!products?.length) return null;

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald">
                {t('carousel.curatedForYou')}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-text-primary tracking-tight">
              {t('carousel.featuredDrops')}
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-emerald/40 hover:text-emerald"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-emerald/40 hover:text-emerald"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 font-body text-sm text-emerald transition-colors hover:text-emerald-hover"
            >
              {t('carousel.viewAll')}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] snap-start"
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-overlay/30">
                    {product.imageUrls?.[0] ? (
                      <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 mx-auto rounded-xl bg-overlay border border-border flex items-center justify-center">
                            <span className="font-display text-xl text-text-tertiary">N</span>
                          </div>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-text-disabled">
                            {t('carousel.previewSoon')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-text-primary tracking-tight line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="font-display italic text-sm text-text-secondary mt-0.5">
                        {product.category?.name || t('carousel.newArrival')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base font-medium text-text-primary">
                        {formatCurrency(Number(product.price))}
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-overlay border border-border text-text-tertiary transition-all group-hover:bg-emerald group-hover:text-emerald-on-emerald group-hover:border-emerald">
                        <ArrowUpRight size={14} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex md:hidden justify-center">
          <Link
            href="/products"
            className="group inline-flex h-12 items-center gap-3 rounded-lg border border-border px-8 font-body text-sm text-text-secondary transition-colors hover:border-emerald/40 hover:text-emerald"
          >
            {t('carousel.viewAllProducts')}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
