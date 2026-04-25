import { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collection | ZENTO',
  description: 'Your selected precision instruments.',
};

export default function CartPage() {
  // This would typically fetch from a store or cookie
  // For now, showing an empty state with brand style
  const isEmpty = true;

  return (
    <main className="bg-canvas min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-tertiary">Selected Artifacts</span>
             </div>
             <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-primary tracking-tighter">
                Your <span className="italic text-text-secondary">Collection.</span>
             </h1>
          </div>

          {isEmpty ? (
            <div className="py-32 border border-dashed border-border flex flex-col items-center justify-center space-y-8">
              <div className="w-16 h-16 rounded-full bg-surface/30 flex items-center justify-center border border-border">
                <ShoppingBag size={24} className="text-text-tertiary" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-serif text-2xl text-text-primary italic">The collection is empty.</p>
                <p className="font-body text-sm text-text-secondary max-w-xs mx-auto">
                  Your journey towards a calibrated workspace begins with the first piece.
                </p>
              </div>
              <Link 
                href="/products" 
                className="px-8 py-3 bg-primary text-canvas font-mono text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary/90 transition-all"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               {/* Cart items list would go here */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Item Placeholder */}
               </div>
               
               {/* Summary Card */}
               <div className="bg-surface/30 border border-border p-8 rounded-sm h-fit space-y-8">
                  <h3 className="font-serif text-2xl text-text-primary">Summary</h3>
                  <div className="space-y-4 font-mono text-[11px] uppercase tracking-widest border-y border-border/50 py-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-text-tertiary">
                      <span>Logistics</span>
                      <span>Calculated next</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-mono text-xl text-text-primary">
                    <span>Total</span>
                    <span>$0.00</span>
                  </div>
                  <button className="w-full h-14 bg-primary text-canvas font-mono text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3">
                    Proceed to Checkout <ArrowRight size={14} />
                  </button>
                  
                  <div className="flex items-center gap-3 justify-center opacity-40">
                     <ShieldCheck size={14} />
                     <span className="font-mono text-[8px] uppercase tracking-widest">Secure Transmission</span>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
