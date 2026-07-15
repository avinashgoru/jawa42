// cSpell:ignore Lucide, framer
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Search, Map, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useLocationStore } from '@/store/useLocationStore';
import { dealers } from '@/data/dealers';

const stateCityMap = {
  "Maharashtra": ["Mumbai", "Pune"],
  "Delhi": ["Delhi"],
  "Karnataka": ["Bangalore"],
  "Telangana": ["Hyderabad"],
  "Tamil Nadu": ["Chennai"],
  "West Bengal": ["Kolkata"],
  "Gujarat": ["Ahmedabad"]
};

export default function DealersLocator() {
  const { city, setCity } = useLocationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // States list
  const states = Object.keys(stateCityMap);

  // Dynamic cities based on state
  const availableCities = selectedState ? stateCityMap[selectedState] : [];

  // Initialize filters based on location store
  useEffect(() => {
    if (city) {
      const foundState = Object.keys(stateCityMap).find(state => 
        stateCityMap[state].some(c => c.toLowerCase() === city.toLowerCase())
      );
      if (foundState) {
        setSelectedState(foundState);
      }
      setSelectedCity(city);
      
      const results = dealers.filter(d => d.city.toLowerCase() === city.toLowerCase());
      setFilteredDealers(results);
      setHasSearched(true);
    } else {
      setFilteredDealers(dealers);
    }
  }, [city]);

  // Handle state change
  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity(''); // Reset city
  };

  // Perform search / filtering
  const handleSearch = () => {
    let results = dealers;

    if (selectedState) {
      const allowedCities = stateCityMap[selectedState] || [];
      results = results.filter(d => allowedCities.some(ac => ac.toLowerCase() === d.city.toLowerCase()));
    }

    if (selectedCity) {
      results = results.filter(d => d.city.toLowerCase() === selectedCity.toLowerCase());
      // Update location store if user searches a different city
      setCity(selectedCity);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(d => 
        d.name.toLowerCase().includes(query) || 
        d.address.toLowerCase().includes(query) ||
        d.city.toLowerCase().includes(query)
      );
    }

    setFilteredDealers(results);
    setHasSearched(true);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-primary">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-accent font-heading font-semibold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-accent"></span> Dealership Network <span className="w-8 h-[1px] bg-accent"></span>
          </h2>
          <h1 className="text-5xl md:text-6xl font-heading font-extrabold uppercase tracking-widest mb-6 text-white">Find a Dealer</h1>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Locate your nearest authorized Jawa Motorcycles dealership to book a test ride, browse accessories, or service your legend.
          </p>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Side: Search Controls */}
          <div className="lg:col-span-4 glass-2 p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-white font-heading font-bold uppercase tracking-widest text-sm mb-4 border-b border-white/5 pb-4">
              Search Parameters
            </h3>

            {/* Search Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Search Dealerships</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Dealer name, road, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white font-heading text-sm outline-none focus:border-accent transition-colors"
                />
                <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* State Dropdown */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Select State</label>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white font-heading text-sm outline-none focus:border-accent transition-colors cursor-pointer"
              >
                <option value="" className="bg-secondary text-gray-400">All States</option>
                {states.map(s => (
                  <option key={s} value={s} className="bg-secondary text-white">{s}</option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Select City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white font-heading text-sm outline-none focus:border-accent transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-secondary text-gray-400">All Cities</option>
                {availableCities.map(c => (
                  <option key={c} value={c} className="bg-secondary text-white">{c}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-heading font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              Search Dealerships
            </button>
          </div>

          {/* Right Side: Map & Cards Panel */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Map Placeholder Card */}
            <div className="glass-3 rounded-3xl border border-white/10 h-[300px] md:h-[400px] overflow-hidden relative flex flex-col items-center justify-center text-center p-6 group">
              {/* Map grid aesthetic */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(196,30,58,0.1),rgba(0,0,0,0))]" />
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />
              
              {/* Map marker pulsing anim */}
              <div className="relative mb-6 z-10 flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-accent/20 opacity-75" />
                <div className="w-16 h-16 rounded-full bg-black/60 border border-accent/30 flex items-center justify-center shadow-lg relative z-20">
                  <MapPin className="w-7 h-7 text-accent" />
                </div>
              </div>

              {/* Title & Sub */}
              <h3 className="text-xl font-heading font-extrabold text-white uppercase tracking-widest mb-2 z-10">
                Interactive Map Integration
              </h3>
              <p className="text-gray-400 text-sm font-light max-w-sm z-10">
                Interactive Map Integration Coming Soon. Showing dealer listings for region.
              </p>
            </div>

            {/* Dealer Information Panel */}
            <div>
              <h3 className="text-white font-heading font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-3">
                <Map className="w-4 h-4 text-accent" />
                Authorized Outlets ({filteredDealers.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredDealers.length > 0 ? (
                    filteredDealers.map((dealer, idx) => (
                      <motion.div
                        key={dealer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                        className="glass-1 p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-lg font-heading font-bold text-white uppercase mb-4 tracking-wide">
                            {dealer.name}
                          </h4>
                          
                          <div className="space-y-3 mb-6 text-xs text-gray-400 font-light">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                              <p className="leading-relaxed">{dealer.address}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="w-4 h-4 text-accent shrink-0" />
                              <p>{dealer.phone}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-accent shrink-0" />
                              <p>{dealer.email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="w-4 h-4 text-accent shrink-0" />
                              <p>{dealer.hours}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 border-t border-white/5 pt-5 mt-auto">
                          <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-heading font-bold uppercase tracking-widest text-[9px] transition-colors border border-white/5 flex items-center justify-center gap-1">
                            Get Directions
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                          
                          <Link
                            href="/book"
                            className="flex-1 bg-accent hover:bg-accent-hover text-white py-3 rounded-lg font-heading font-bold uppercase tracking-widest text-[9px] transition-colors flex items-center justify-center"
                          >
                            Book Test Ride
                          </Link>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-2 text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]"
                    >
                      <MapPin className="w-8 h-8 text-gray-600 mx-auto mb-4" />
                      <h4 className="text-base font-heading font-bold text-gray-400 uppercase tracking-widest mb-1">No Outlets Match</h4>
                      <p className="text-gray-500 text-xs">Try selecting a different state/city combination or clearing search term.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
