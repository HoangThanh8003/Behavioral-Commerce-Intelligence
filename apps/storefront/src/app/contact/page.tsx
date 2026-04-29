import { Metadata } from 'next';
import { Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | ZENTO',
  description: 'Get in touch with the ZENTO team for orders, support, or collaboration.',
};

export default function ContactPage() {
  return (
    <main className="bg-canvas min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="space-y-3 mb-16">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald flex-shrink-0" />
              <span className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                Get in Touch
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-text-primary tracking-tight leading-none">
              Contact Us
            </h1>
            <p className="font-body text-sm text-text-secondary max-w-md leading-relaxed">
              Have a question about an order, need help choosing a product, or interested in collaboration? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3 bg-surface border border-border rounded-xl p-5 md:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                    First Name
                  </label>
                  <input 
                    type="text"
                    className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                    placeholder="Your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                    Last Name
                  </label>
                  <input 
                    type="text"
                    className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                    placeholder="Your last name"
                  />
                </div>
              </div>
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
                  Subject
                </label>
                <input 
                  type="text"
                  className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 h-10 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150"
                  placeholder="How can we help?"
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs font-medium tracking-widest uppercase text-text-tertiary">
                  Message
                </label>
                <textarea 
                  rows={5}
                  className="w-full bg-overlay border border-border hover:border-emerald-border focus:border-emerald focus:ring-1 focus:ring-emerald/20 rounded-lg px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-disabled outline-none transition-all duration-150 resize-none"
                  placeholder="Tell us more..."
                />
              </div>
              <button className="bg-emerald hover:bg-emerald-hover text-emerald-on-emerald font-body text-sm font-semibold px-8 h-10 rounded-lg transition-colors duration-150 active:scale-[0.98]">
                Send Message
              </button>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-surface border border-border rounded-xl p-5 md:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-emerald" />
                  <span className="font-body text-sm font-medium text-text-primary">Email</span>
                </div>
                <p className="font-body text-sm text-text-secondary">hello@zento.co</p>
                <p className="font-body text-xs text-text-tertiary">We typically respond within 24 hours.</p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-5 md:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-emerald" />
                  <span className="font-body text-sm font-medium text-text-primary">Location</span>
                </div>
                <p className="font-body text-sm text-text-secondary">
                  Ho Chi Minh City, Vietnam
                </p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-5 md:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-emerald" />
                  <span className="font-body text-sm font-medium text-text-primary">Hours</span>
                </div>
                <p className="font-body text-sm text-text-secondary">
                  Mon – Fri: 9:00 AM – 6:00 PM (GMT+7)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
