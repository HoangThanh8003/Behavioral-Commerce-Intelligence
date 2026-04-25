'use client';

import { Product } from '@nexusai/types';
import { useTranslation } from 'react-i18next';
import { ProductGridCard } from './ProductGridCard';

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const { t } = useTranslation();

  return (
    <section className="mt-24 container mx-auto px-6 md:px-10">
      <div className="flex items-center gap-3 mb-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
          <span className="font-body text-sm text-text-tertiary tracking-wide">{t('product.pickedForYou')}</span>
        </div>
        <span className="h-px flex-1 bg-border" />
        <h2 className="font-display text-2xl font-semibold text-text-primary tracking-tight">{t('product.relatedProducts')}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product, index) => (
          <ProductGridCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};
