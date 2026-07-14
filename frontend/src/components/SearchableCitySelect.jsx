import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { indianCities } from '../data/cities';

export default function SearchableCitySelect({ value, onChange, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef(null);

  const filteredCities = indianCities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full bg-primary/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-accent transition-colors flex justify-between items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className={value ? 'text-white' : 'text-gray-400'}>
          {value || 'Search or Select Your City'}
        </span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="p-2 border-b border-white/10">
              <input
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-white/5 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                autoFocus
              />
            </div>
            
            <ul className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <li
                    key={city}
                    onClick={() => {
                      onChange(city);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`px-4 py-3 cursor-pointer hover:bg-accent/20 transition-colors text-sm ${value === city ? 'bg-accent/30 text-white font-bold' : 'text-gray-300'}`}
                  >
                    {city}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-gray-500 text-sm text-center">
                  No cities found
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
