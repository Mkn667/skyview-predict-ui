import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
}

const MOCK_CITIES = [
  'Paris, France',
  'Lyon, France',
  'Marseille, France',
  'Bordeaux, France',
  'Lille, France',
  'Toulouse, France',
  'Nice, France',
  'Strasbourg, France',
  'Nantes, France',
  'Montpellier, France',
  'Bruxelles, Belgique',
  'Genève, Suisse',
  'Montréal, Canada',
  'Casablanca, Maroc',
  'Alger, Algérie',
  'Tunis, Tunisie'
];

export const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filtered = MOCK_CITIES.filter(city =>
          city.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
        setIsOpen(true);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
    }
  }, [query]);

  const handleSelect = (city: string) => {
    setQuery(city);
    setSuggestions([]);
    setIsOpen(false);
    onLocationSelect(city);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto z-50" ref={containerRef}>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </div>
        <Input
          type="text"
          placeholder="Rechercher une ville..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="pl-12 pr-12 py-6 h-14 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-white/40 rounded-xl shadow-lg text-lg transition-all"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl"
          >
            <ul className="py-2">
              {suggestions.map((city, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelect(city)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-white/10 transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-white/60" />
                    <span>{city}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
