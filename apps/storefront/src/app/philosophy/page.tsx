import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About ZENTO | Our Philosophy',
  description: 'The Art of Silence. The Science of Focus. Learn about ZENTO\'s commitment to precision workspace gear.',
};

export default function PhilosophyPage() {
  return (
    <main className="bg-canvas min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto space-y-24">
          {/* Hero */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
              <span className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                About ZENTO
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-text-primary tracking-tight leading-none">
              The Art of Silence.
            </h1>
            <p className="font-display italic text-xl md:text-2xl text-text-secondary leading-relaxed font-normal">
              In a world of noise, precision is the only luxury that matters.
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-semibold text-text-primary tracking-tight">
              Our Mission
            </h2>
            <p className="font-body text-base text-text-secondary leading-relaxed max-w-prose">
              ZENTO creates workspace instruments for professionals who value focus above all else. 
              Every product we make is designed to disappear into your workflow — eliminating distractions 
              so you can concentrate on what matters most.
            </p>
            <p className="font-body text-base text-text-secondary leading-relaxed max-w-prose">
              We believe that the tools you use every day should be silent, precise, and built to last. 
              From the dampening layers inside our keyboards to the flicker-free illumination of our desk lamps, 
              every detail serves a single purpose: your uninterrupted focus.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-surface border border-border rounded-xl p-5 md:p-6 space-y-4">
              <h3 className="font-display text-xl font-semibold text-text-primary leading-snug">
                Reductive Design
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                We eliminate everything that does not serve focus. Every curve, every material choice, 
                and every sound profile is calculated to disappear into your workflow.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 md:p-6 space-y-4">
              <h3 className="font-display text-xl font-semibold text-text-primary leading-snug">
                Built to Last
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                Using aerospace-grade aluminum, premium PBT, and tempered glass, we build instruments 
                meant to last a lifetime. ZENTO is an investment in your daily craft.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 md:p-6 space-y-4">
              <h3 className="font-display text-xl font-semibold text-text-primary leading-snug">
                Acoustic Precision
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                Every switch is tuned for a deep, satisfying response. Multi-layer dampening 
                eliminates rattle and resonance, delivering a typing experience that feels as quiet as it sounds.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 md:p-6 space-y-4">
              <h3 className="font-display text-xl font-semibold text-text-primary leading-snug">
                Global Reach
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                We ship worldwide with priority logistics. Every order includes a 2-year warranty 
                and access to our dedicated support team.
              </p>
            </div>
          </div>

          {/* Quote */}
          <div className="border-l-2 border-emerald/40 pl-8 space-y-4">
            <p className="font-display italic text-2xl md:text-3xl text-text-primary leading-snug">
              "We don't sell hardware. We sell the quiet space where mastery happens."
            </p>
            <p className="font-body text-sm text-text-secondary">
              — The ZENTO Team
            </p>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 pt-8">
            <h2 className="font-display text-3xl font-semibold text-text-primary tracking-tight">
              Ready to upgrade your workspace?
            </h2>
            <Link 
              href="/products" 
              className="inline-flex items-center bg-emerald hover:bg-emerald-hover text-emerald-on-emerald font-body text-sm font-semibold px-8 h-12 rounded-lg transition-colors duration-150 active:scale-[0.98]"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
