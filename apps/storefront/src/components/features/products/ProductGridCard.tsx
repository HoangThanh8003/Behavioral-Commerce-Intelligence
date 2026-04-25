'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '@nexusai/types';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ProductGridCardProps {
  product: Product;
  index: number;
}

export const ProductGridCard = ({ product, index }: ProductGridCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-lg hover:shadow-emerald/5">
          <div className="relative aspect-square overflow-hidden bg-overlay/30">
            {product.imageUrls?.[0] ? (
              <Image src={product.imageUrls[0]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-canvas border border-border flex items-center justify-center">
                    <span className="font-display text-2xl text-text-tertiary">N</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-text-disabled">{t('products.previewSoon')}</span>
                </div>
              </div>
            )}
            <div className="absolute bottom-4 right-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald text-emerald-on-emerald shadow-lg shadow-emerald/20">
                <ArrowUpRight size={18} strokeWidth={2} />
              </div>
            </div>
          </div>
          <div className="p-5 space-y-2">
            <h3 className="font-display text-lg font-semibold text-text-primary tracking-tight line-clamp-1">{product.name}</h3>
            <p className="font-display italic text-xs text-text-tertiary">{product.category?.name || t('products.newArrival')}</p>
            <div className="pt-2">
              <span className="font-mono text-base font-medium text-text-primary">{formatCurrency(Number(product.price))}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
