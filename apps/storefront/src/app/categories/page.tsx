import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/services/products";

export const metadata: Metadata = {
  title: "Collections | ZENTO",
  description:
    "Browse ZENTO collections: mechanical keyboards, audio, lighting, and workspace accessories.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="bg-canvas min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="space-y-3 mb-14">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
            <span className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
              Browse
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-text-primary tracking-tight leading-none">
            Collections
          </h1>
          <p className="font-body text-sm text-text-secondary max-w-md leading-relaxed">
            Explore our curated categories of precision workspace gear.
          </p>
        </div>

        {/* Category Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/9]">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-surface" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-canvas/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      <h2 className="font-display text-xl md:text-2xl font-semibold text-text-primary tracking-tight leading-snug">
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="font-body text-sm text-text-secondary">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <span className="font-body text-sm text-text-secondary group-hover:text-emerald transition-colors">
                      Shop →
                    </span>
                  </div>
                </div>
                {/* Inner top glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-border rounded-xl">
            <p className="font-display text-xl font-semibold text-text-primary mb-2">
              Collections coming soon
            </p>
            <p className="font-body text-sm text-text-secondary">
              Check back soon for our curated collections.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
