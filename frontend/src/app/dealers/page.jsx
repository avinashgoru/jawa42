'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocationStore } from '@/store/useLocationStore';
import { dealers } from '@/data/dealers';
import SearchableCitySelect from '@/components/SearchableCitySelect';

export default function DealersLocator() {
  const { city, setCity } = useLocationStore();
  const [filteredDealers, setFilteredDealers] = useState([]);
  
  // Update filtered dealers when city changes
  useEffect(() => {
    if (city) {
      setFilteredDealers(dealers.filter(d => d.city.toLowerCase() === city.toLowerCase()));
    } else {
      setFilteredDealers([]);
    }
  }, [city]);

  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2 className="text-accent font-heading font-semibold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center justify-center gap-4">
          <span className="w-8 h-[1px] bg-accent"></span> Dealership Network <span className="w-8 h-[1px] bg-accent"></span>
        </h2>
        <h1 className="text-5xl md:text-6xl font-heading font-extrabold uppercase tracking-widest mb-6">Find a Dealer</h1>
        <p className="text-gray-400 text-lg mb-10">
          Locate your nearest authorized Jawa Motorcycles dealership to book a test ride, browse accessories, or service your legend.
        </p>

        {/* City Search */}
        <div className="max-w-md mx-auto relative z-30">
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-2xl">
            <h3 className="text-white font-heading font-bold uppercase tracking-widest text-sm mb-4">Select Your City</h3>
            <SearchableCitySelect value={city} onChange={setCity} />
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      <div className="max-w-5xl mx-auto relative z-20">
        {!city ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-white/20 rounded-2xl bg-white/[0.02]"
          >
            <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold text-gray-400 uppercase tracking-widest mb-2">Search Location</h3>
            <p className="text-gray-500">Please select a city to find dealerships near you.</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredDealers.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredDealers.map((dealer, idx) => (
                  <motion.div 
                    key={dealer.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-2 p-8 border border-white/10 hover:border-accent/50 transition-colors duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider group-hover:text-accent transition-colors">
                        {dealer.name}
                      </h3>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-4 text-gray-400">
                        <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                        <p className="leading-relaxed">{dealer.address}</p>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400">
                        <Phone className="w-5 h-5 text-accent shrink-0" />
                        <p>{dealer.phone}</p>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400">
                        <Mail className="w-5 h-5 text-accent shrink-0" />
                        <p>{dealer.email}</p>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400">
                        <Clock className="w-5 h-5 text-accent shrink-0" />
                        <p>{dealer.hours}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                      <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 px-4 font-heading font-bold uppercase tracking-widest text-xs transition-colors border border-white/10">
                        Get Directions
                      </button>
                      <Link 
                        href="/book"
                        className="flex-1 bg-accent hover:bg-accent-hover text-white py-3 px-4 font-heading font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 group/btn"
                      >
                        Test Ride
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 border border-dashed border-accent/30 rounded-2xl bg-accent/5"
              >
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-widest mb-4">No Dealers Found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  We couldn't find any authorized Jawa dealerships in <span className="text-white font-bold">{city}</span>. Please try selecting a nearby major city or contact our support team.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
