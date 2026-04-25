import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Philosophy | ZENTO',
  description: 'The Art of Silence. The Science of Focus.',
};

export default function PhilosophyPage() {
  return (
    <main className="bg-canvas min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-4xl mx-auto space-y-32">
          {/* Hero Section */}
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-text-tertiary">Our Origin</span>
              </div>
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-text-primary tracking-tighter leading-[0.9]">
                The Art of <span className="italic text-text-secondary">Silence.</span>
              </h1>
            </div>
            <p className="font-serif text-2xl md:text-3xl text-text-secondary leading-relaxed italic font-light">
              “In a world of noise, precision is the only luxury that matters.”
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-8">
               <h2 className="font-serif text-4xl text-text-primary italic">Reductive Engineering</h2>
               <p className="font-body text-lg text-text-secondary leading-relaxed">
                 We eliminate everything that does not serve focus. Every curve, every material, and every sound profile is calculated to disappear into your workflow. 
               </p>
               <div className="h-px w-24 bg-primary/30" />
            </div>
            <div className="space-y-8">
               <h2 className="font-serif text-4xl text-text-primary italic">Industrial Permanence</h2>
               <p className="font-body text-lg text-text-secondary leading-relaxed">
                 Using aerospace-grade materials, we build instruments that are meant to last a lifetime. ZENTO is not a trend; it is an infrastructure.
               </p>
               <div className="h-px w-24 bg-primary/30" />
            </div>
          </div>

          {/* Visual Break */}
          <div className="relative aspect-[21/9] bg-surface/20 border border-border rounded-sm overflow-hidden group">
             <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-1000" />
             <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-mono text-[10px] uppercase tracking-[1em] text-text-tertiary opacity-40">
                  CALIBRATED_ENVIRONMENT_01
                </p>
             </div>
          </div>

          {/* Quote Section */}
          <div className="border-l border-primary/40 pl-12 space-y-8">
             <p className="font-serif text-3xl md:text-4xl text-text-primary italic leading-tight">
               "We don't sell hardware. We sell the quiet space where mastery happens."
             </p>
             <div className="space-y-1">
               <p className="font-mono text-[10px] uppercase tracking-widest text-text-primary">ZENTO_Design_Lab</p>
               <p className="font-mono text-[8px] uppercase tracking-widest text-text-tertiary">Oslo // 2026</p>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
