export default function ProductLoading() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6 md:px-10">
        {/* Back button skeleton */}
        <div className="mb-10">
          <div className="h-4 w-32 rounded bg-surface animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image skeleton */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-surface animate-pulse" />
            <div className="flex gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-20 h-20 rounded-xl bg-surface animate-pulse" />
              ))}
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="h-3 w-20 rounded bg-surface animate-pulse" />
              <div className="h-10 w-3/4 rounded bg-surface animate-pulse" />
              <div className="h-5 w-1/3 rounded bg-surface animate-pulse" />
            </div>
            <div className="h-8 w-28 rounded bg-surface animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-surface animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-surface animate-pulse" />
              <div className="h-4 w-4/6 rounded bg-surface animate-pulse" />
            </div>
            <div className="flex gap-4 pt-4">
              <div className="h-12 flex-1 rounded-lg bg-surface animate-pulse" />
              <div className="h-12 w-32 rounded-lg bg-surface animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
