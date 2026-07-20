'use client';

import { useState, useRef, useEffect, useMemo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { indianCities } from '@/data/cities';

export default function SearchableCitySelect({ value, onChange, disabled, id: idProp, label }) {
  const generatedId = useId();
  const inputId = idProp || generatedId;
  const listboxId = `${inputId}-listbox`;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const searchRef = useRef(null);

  const filteredCities = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return indianCities.filter((city) => city.toLowerCase().includes(query));
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
      setActiveIndex(-1);
    }
  }, [isOpen]);

  const selectCity = (city) => {
    onChange(city);
    setIsOpen(false);
    setSearchQuery('');
    setActiveIndex(-1);
  };

  const handleTriggerKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filteredCities.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      selectCity(filteredCities[activeIndex]);
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {label && (
        <label htmlFor={inputId} className="block text-[10px] font-specs font-bold uppercase tracking-widest text-text-sec mb-3">
          {label}
        </label>
      )}

      <button
        type="button"
        id={inputId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => !disabled && setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        className={`w-full bg-primary/50 border border-white/10 rounded p-3 text-white text-left transition-colors flex justify-between items-center ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-white/20'
        }`}
      >
        <span className={value ? 'text-white' : 'text-gray-400'}>
          {value || 'Search or Select Your City'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="p-2 border-b border-white/10">
              <input
                ref={searchRef}
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-controls={listboxId}
                aria-expanded={isOpen}
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleListKeyDown}
                className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-accent transition-colors text-sm"
              />
            </div>

            <ul id={listboxId} role="listbox" className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <li
                    key={city}
                    role="option"
                    aria-selected={value === city}
                    onClick={() => selectCity(city)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`px-4 py-3 cursor-pointer transition-colors text-sm ${
                      activeIndex === index || value === city
                        ? 'bg-accent/30 text-white font-bold'
                        : 'text-gray-300 hover:bg-accent/20'
                    }`}
                  >
                    {city}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-gray-500 text-sm text-center">No cities found</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
