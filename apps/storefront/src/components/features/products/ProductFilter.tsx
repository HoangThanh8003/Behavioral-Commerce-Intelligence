'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const ProductFilter = ({ categories }: { categories: { id: string; name: string }[] }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('categoryId');

  const handleCategoryChange = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set('categoryId', id);
    } else {
      params.delete('categoryId');
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-tertiary flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-border" />
        {t('products.filterSystem')}
      </h4>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 rounded-lg font-body text-xs font-medium transition-all ${
            !currentCategory
              ? 'bg-emerald text-primary-foreground'
              : 'bg-surface border border-border text-text-secondary hover:border-emerald/50'
          }`}
        >
          {t('products.allArtifacts')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-lg font-body text-xs font-medium transition-all ${
              currentCategory === cat.id
                ? 'bg-emerald text-primary-foreground'
                : 'bg-surface border border-border text-text-secondary hover:border-emerald/50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};
