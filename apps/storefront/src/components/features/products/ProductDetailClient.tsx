'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Share2, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@nexusai/types';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { ProductImageGallery } from './ProductImageGallery';

interface ProductDetailClientProps {
  product: Product;
}

export const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((Number(product.comparePrice) - Number(product.price)) / Number(product.comparePrice)) * 100)
    : 0;

  return (
    <div className="container mx-auto px-6 md:px-10">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="mb-10">
        <Link href="/products" className="inline-flex items-center gap-2 font-body text-xs font-medium text-text-secondary transition-colors hover:text-emerald group">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span className="uppercase tracking-[0.2em]">{t('product.backToShop')}</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ProductImageGallery images={product.imageUrls || []} productName={product.name} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
              {product.category?.name || t('product.essentialDrop')}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">{product.name}</h1>
          <p className="font-display italic text-base text-text-secondary mt-2">{product.category?.name || t('product.essentialDrop')}</p>

          <div className="flex items-baseline gap-4 mt-8">
            <span className="font-mono text-3xl font-medium text-text-primary">{formatCurrency(Number(product.price))}</span>
            {hasDiscount && (
              <>
                <span className="font-mono text-lg text-text-disabled line-through">{formatCurrency(Number(product.comparePrice))}</span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-danger-muted text-danger-text font-body text-xs font-semibold tracking-widest uppercase">-{discountPercent}%</span>
              </>
            )}
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              {t('product.description')}
            </h3>
            <p className="font-body text-sm text-text-secondary leading-relaxed max-w-prose">
              {product.description || 'Intelligently curated for your specific behavioral profile.'}
            </p>
          </div>

          <div className="mt-10 space-y-5">
            <div className="space-y-2">
              <label className="font-body text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">{t('product.quantity')}</label>
              <div className="inline-flex items-center rounded-lg border border-border overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-10 w-10 items-center justify-center text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"><Minus size={14} /></button>
                <span className="flex h-10 w-14 items-center justify-center font-mono text-sm text-text-primary border-x border-border">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="flex h-10 w-10 items-center justify-center text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"><Plus size={14} /></button>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2.5 bg-emerald hover:bg-emerald-hover text-emerald-on-emerald font-body text-sm font-semibold px-6 h-12 rounded-lg transition-colors duration-150 active:scale-[0.98]">
                <ShoppingCart size={18} strokeWidth={2} />
                {t('product.addToCart')}
              </button>
              <button className="flex items-center justify-center gap-2 bg-transparent hover:bg-emerald-muted text-[#C8E8D0] hover:text-text-primary font-body text-sm border border-[#3A6A4A] hover:border-emerald-border px-5 h-12 rounded-lg transition-colors duration-150 active:scale-[0.98]">
                {t('product.buyNow')}
              </button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button className="flex items-center gap-2 text-text-secondary hover:text-emerald transition-colors font-body text-xs"><Heart size={14} strokeWidth={1.5} />{t('product.wishlist')}</button>
              <span className="w-px h-4 bg-border" />
              <button className="flex items-center gap-2 text-text-secondary hover:text-emerald transition-colors font-body text-xs"><Share2 size={14} strokeWidth={1.5} />{t('product.share')}</button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              {t('product.specifications')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <SpecRow label={t('product.sku')} value={product.sku} />
              <SpecRow label={t('product.category')} value={product.category?.name || '—'} />
              <SpecRow label="Status" value={t('product.inStock')} valueClassName="text-success-text" />
              <SpecRow label="ID" value={product.id.slice(0, 8)} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

function SpecRow({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div className="bg-surface rounded-lg p-4 border border-border">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-disabled mb-1">{label}</p>
      <p className={`font-mono text-sm text-text-primary ${valueClassName || ''}`}>{value}</p>
    </div>
  );
}
