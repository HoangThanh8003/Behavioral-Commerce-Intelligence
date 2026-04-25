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
      <Link href={`/products/${product.slug}`} className="group block h-full">
        <div className="relative h-full rounded-2xl border border-[#1D3325] bg-[#14221A]/80 backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40 hover:shadow-emerald/10 hover:bg-[#1A2C21]/90">
          {/* Inner top glow to simulate lighting */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald/20 to-transparent transition-opacity duration-300 group-hover:via-emerald/50" />
          
          <div className="relative aspect-[4/3] overflow-hidden bg-overlay/30">
            {product.imageUrls?.[0] ? (
              <Image src={product.imageUrls[0]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-canvas border border-border flex items-center justify-center">
                    <span className="font-display text-2xl text-text-tertiary">Z</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-text-disabled">{t('products.previewSoon')}</span>
                </div>
              </div>
            )}
            
            {/* Hover Action Circle */}
            <div className="absolute bottom-4 right-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald text-[#0A1A0E] shadow-[0_0_15px_rgba(46,234,127,0.4)]">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="p-5 md:p-6 space-y-2 relative z-10">
            <h3 className="font-display text-lg font-semibold text-text-primary tracking-tight line-clamp-1 group-hover:text-emerald transition-colors">{product.name}</h3>
            <p className="font-display italic text-xs text-text-secondary line-clamp-1">{product.category?.name || t('products.newArrival')}</p>
            <div className="pt-3">
              <span className="font-mono text-base font-medium text-text-primary">{formatCurrency(Number(product.price))}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
