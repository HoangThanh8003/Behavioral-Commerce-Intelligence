import { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Your Cart | ZENTO',
  description: 'Review your selected items before checkout.',
};

export default function CartPage() {
  const isEmpty = true;

  return (
    <main className="bg-canvas min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
              Your Cart
            </h1>
            <p className="font-body text-sm text-text-secondary">
              Review your items before checkout.
            </p>
          </div>

          {isEmpty ? (
            /* Empty State */
            <div className="py-24 border border-dashed border-border rounded-xl flex flex-col items-center justify-center space-y-6">
              <div className="w-14 h-14 rounded-xl bg-surface flex items-center justify-center border border-border">
                <ShoppingBag size={20} className="text-text-tertiary" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-display text-xl font-semibold text-text-primary">
                  Your cart is empty
                </p>
                <p className="font-body text-sm text-text-secondary max-w-xs mx-auto leading-relaxed">
                  Discover our collection of precision workspace gear and find the perfect pieces for your setup.
                </p>
              </div>
              <Link 
                href="/products" 
                className="bg-emerald hover:bg-emerald-hover text-emerald-on-emerald font-body text-sm font-semibold px-6 h-10 rounded-lg inline-flex items-center transition-colors duration-150 active:scale-[0.98]"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            /* Cart with Items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {/* Cart items would be rendered here */}
              </div>
               
              {/* Order Summary */}
              <div className="bg-surface border border-border rounded-xl p-5 md:p-6 h-fit space-y-6">
                <h3 className="font-display text-xl font-semibold text-text-primary">
                  Order Summary
                </h3>
                <div className="space-y-3 border-y border-border py-5">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="font-mono text-text-primary">$0.00</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-text-secondary">Shipping</span>
                    <span className="font-mono text-text-tertiary">Calculated at checkout</span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-body text-sm font-medium text-text-primary">Total</span>
                  <span className="font-mono text-lg font-medium text-text-primary">$0.00</span>
                </div>
                <Link href="/checkout" className="w-full bg-emerald hover:bg-emerald-hover text-emerald-on-emerald font-body text-sm font-semibold h-12 rounded-lg flex items-center justify-center gap-2 transition-colors duration-150 active:scale-[0.98]">
                  Checkout <ArrowRight size={16} />
                </Link>
                
                {/* Trust signals */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-text-tertiary">
                    <Truck size={12} />
                    <span className="font-body text-[10px] uppercase tracking-widest">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-tertiary">
                    <ShieldCheck size={12} />
                    <span className="font-body text-[10px] uppercase tracking-widest">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
