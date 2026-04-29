import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Lock, CreditCard, Truck, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Checkout | ZENTO',
  description: 'Complete your order securely.',
};

export default function CheckoutPage() {
  return (
    <main className="bg-canvas min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
                Checkout
              </h1>
              <p className="font-body text-sm text-text-secondary">
                Complete your order below.
              </p>
            </div>
            <Link 
              href="/cart" 
              className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={14} /> Back to Cart
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Checkout Form */}
            <div className="lg:col-span-3 space-y-10">
              {/* Contact */}
              <section className="space-y-5">
                <h2 className="font-display text-xl font-semibold text-text-primary leading-snug">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                      Email
                    </label>
                    <input 
                      type="email"
                      className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                      Phone
                    </label>
                    <input 
                      type="tel"
                      className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                      placeholder="+84 xxx xxx xxx"
                    />
                  </div>
                </div>
              </section>

              {/* Shipping */}
              <section className="space-y-5">
                <h2 className="font-display text-xl font-semibold text-text-primary leading-snug">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                        First Name
                      </label>
                      <input 
                        type="text"
                        className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                        Last Name
                      </label>
                      <input 
                        type="text"
                        className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                      Address
                    </label>
                    <input 
                      type="text"
                      className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                      placeholder="Street address"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                        City
                      </label>
                      <input 
                        type="text"
                        className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                        Province
                      </label>
                      <input 
                        type="text"
                        className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                        Postal Code
                      </label>
                      <input 
                        type="text"
                        className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="space-y-5">
                <h2 className="font-display text-xl font-semibold text-text-primary leading-snug">
                  Payment
                </h2>
                <div className="bg-surface border border-border rounded-xl p-5 md:p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <CreditCard size={16} className="text-emerald" />
                    <span className="font-body text-sm font-medium text-text-primary">Credit / Debit Card</span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                        Card Number
                      </label>
                      <input 
                        type="text"
                        className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                          Expiry
                        </label>
                        <input 
                          type="text"
                          className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                          CVC
                        </label>
                        <input 
                          type="text"
                          className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-surface border border-border rounded-xl p-5 md:p-6 space-y-6 sticky top-28">
                {/* Inner top glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald/20 to-transparent" />
                
                <h3 className="font-display text-xl font-semibold text-text-primary">
                  Order Summary
                </h3>
                
                {/* Placeholder items */}
                <div className="space-y-4 border-y border-border py-5">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-text-secondary">No items yet</span>
                    <span className="font-mono text-sm text-text-tertiary">—</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="font-mono text-text-primary">$0.00</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-text-secondary">Shipping</span>
                    <span className="font-mono text-emerald">Free</span>
                  </div>
                  <div className="flex justify-between font-body text-sm pt-3 border-t border-border">
                    <span className="font-medium text-text-primary">Total</span>
                    <span className="font-mono text-lg font-medium text-text-primary">$0.00</span>
                  </div>
                </div>

                <button className="w-full bg-emerald hover:bg-emerald-hover text-emerald-on-emerald font-body text-sm font-semibold h-12 rounded-lg flex items-center justify-center gap-2 transition-colors duration-150 active:scale-[0.98]">
                  <Lock size={14} /> Place Order
                </button>

                {/* Trust signals */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-text-tertiary">
                    <ShieldCheck size={12} />
                    <span className="font-body text-[10px] uppercase tracking-widest">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-tertiary">
                    <Truck size={12} />
                    <span className="font-body text-[10px] uppercase tracking-widest">Free Shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
