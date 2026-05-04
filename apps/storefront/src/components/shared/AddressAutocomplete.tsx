'use client';

import * as React from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Suggestion {
  name: string;
  city?: string;
  country?: string;
  fullAddress: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function AddressAutocomplete({ value, onChange, placeholder, className }: AddressAutocompleteProps) {
  const [query, setQuery] = React.useState(value);
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Sync internal query with external value if needed (e.g. on pre-fill)
  React.useEffect(() => {
    setQuery(value);
  }, [value]);

  const fetchSuggestions = async (searchText: string) => {
    if (searchText.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Using Photon API (OpenStreetMap based) - Restricted to Vietnam (countrycode=vn)
      const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(searchText)}&limit=5&countrycode=vn`);
      const data = await response.json();
      
      const formatted: Suggestion[] = data.features.map((f: any) => {
        const p = f.properties;
        const parts = [p.name, p.street, p.city, p.country].filter(Boolean);
        return {
          name: p.name || p.street || 'Unknown location',
          city: p.city,
          country: p.country,
          fullAddress: parts.join(', ')
        };
      });
      
      setSuggestions(formatted);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== value) {
        fetchSuggestions(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.fullAddress);
    onChange(suggestion.fullAddress);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative group">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary group-focus-within:text-emerald transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value === '') {
              onChange('');
              setSuggestions([]);
            }
          }}
          onFocus={() => query.length >= 3 && setIsOpen(true)}
          placeholder={placeholder || "Nhập địa chỉ tại Việt Nam..."}
          className="w-full bg-surface/50 border border-border/50 rounded-xl pl-11 pr-11 py-3 font-body text-sm text-text-primary focus:outline-none focus:border-emerald/50 transition-all placeholder:text-text-tertiary/50"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-emerald animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-text-tertiary group-focus-within:text-emerald/50" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute z-50 w-full mt-2 bg-surface/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(suggestion)}
                  className="w-full text-left p-3 rounded-xl hover:bg-emerald/5 transition-all group flex items-start gap-3"
                >
                  <div className="mt-1 p-1.5 rounded-lg bg-emerald/10 text-emerald group-hover:bg-emerald group-hover:text-canvas transition-all">
                    <MapPin className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-emerald font-bold mb-0.5">{suggestion.name}</p>
                    <p className="font-body text-xs text-text-secondary truncate">{suggestion.fullAddress}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-3 bg-muted/30 border-t border-border/30 flex justify-between items-center">
              <span className="font-mono text-[8px] uppercase tracking-widest text-text-tertiary">Powered by OpenStreetMap</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-emerald/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 rounded-full bg-emerald/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 rounded-full bg-emerald/30 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
