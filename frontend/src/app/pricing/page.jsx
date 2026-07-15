'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocationStore } from '@/store/useLocationStore';
import { motorcycleModels, formatCurrency } from '@/data/models';
import { calculateOnRoadPrice } from '@/utils/pricing';
import SearchableCitySelect from '@/components/SearchableCitySelect';
import EMICalculator from '@/components/pricing/EMICalculator';

export default function Pricing() {
  const { city, setCity } = useLocationStore();
  
  // Find the Jawa 42 model to display its variants
  const jawa42 = motorcycleModels.find(m => m.id === 'jawa-42');
  const variants = jawa42?.variants || [];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-primary">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-heading font-bold uppercase tracking-widest mb-6 text-white">Select Your Ride</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Choose the variant that matches your distinctive style and performance needs. Prices dynamically update based on your selected city.
          </p>

          {/* City Selector */}
          <div className="max-w-md mx-auto mb-16 relative z-50 text-left">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold ml-1">Select City for On-Road Estimate</label>
            <SearchableCitySelect 
              value={city} 
              onChange={(selectedCity) => setCity(selectedCity)} 
            />
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto relative z-10">
          
          {variants.map((variant, index) => {
            const pricing = calculateOnRoadPrice(variant.price, city);
            const isPopular = variant.isPopular;
            
            return (
              <motion.div 
                key={variant.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.2) }}
                className={`flex flex-col items-center p-10 rounded-3xl transition-all duration-500 group ${
                  isPopular 
                  ? 'glass-3 relative transform lg:-translate-y-6 shadow-[0_0_50px_rgba(196,30,58,0.15)] hover:shadow-[0_0_70px_rgba(196,30,58,0.25)] border-t border-accent/50 z-10' 
                  : 'glass-1 hover:bg-white/[0.05]'
                }`}
              >
                <div className={`relative h-48 mb-6 rounded-xl overflow-hidden p-4 group w-full ${isPopular ? 'bg-gradient-to-t from-accent/20 to-transparent border border-accent/20 shadow-[0_0_30px_rgba(206,161,106,0.15)] h-56' : 'bg-gradient-to-t from-black/50 to-transparent'}`}>
                  {isPopular && <div className="absolute top-2 right-2 bg-accent text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full z-10">Popular</div>}
                  <Image 
                    src={jawa42.image} 
                    alt={variant.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                    className={`object-contain transition-all duration-500 ${isPopular ? 'drop-shadow-2xl group-hover:scale-110' : 'drop-shadow-lg opacity-70 group-hover:opacity-100 group-hover:scale-105'}`} 
                  />
                </div>
                
                <h2 className={`font-heading font-extrabold mb-1 uppercase tracking-widest text-white ${isPopular ? 'text-3xl' : 'text-2xl'}`}>{variant.name}</h2>
                <p className={`mb-8 uppercase tracking-[0.2em] text-[10px] font-bold ${isPopular ? 'text-accent' : 'text-gray-500'}`}>{variant.description}</p>
                
                {/* Detailed Pricing Block */}
                <div className="w-full bg-black/40 border border-white/10 rounded-xl p-4 mb-8 text-left">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/5">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Ex-Showroom</span>
                    <span className="text-sm font-bold text-white">{formatCurrency(pricing.exShowroom)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">RTO (Est.)</span>
                    <span className="text-[10px] text-gray-300">{formatCurrency(pricing.rto)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">Insurance (Est.)</span>
                    <span className="text-[10px] text-gray-300">{formatCurrency(pricing.insurance)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">Other Charges</span>
                    <span className="text-[10px] text-gray-300">{formatCurrency(pricing.other)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <span className="text-[10px] text-accent uppercase tracking-widest font-bold">On-Road</span>
                    <span className="text-xl font-bold text-accent font-heading">{formatCurrency(pricing.total)}*</span>
                  </div>
                </div>
  
                <Link href="/book" className={`w-full py-4 uppercase tracking-[0.2em] text-[10px] font-bold mt-auto inline-block text-center flex items-center justify-center transition-all ${
                  isPopular 
                  ? 'bg-white hover:bg-gray-200 text-black rounded-full shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                  : 'rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black'
                }`}>
                  Book Now
                </Link>
              </motion.div>
            );
          })}
  
        </div>
  
        <div className="mt-16 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest max-w-4xl mx-auto leading-relaxed">
            *Prices shown are indicative and may vary depending on city, dealer location, registration charges, insurance, and applicable taxes. Displayed On-Road price is an estimate for <span className="text-gray-300 font-bold">{city}</span>.
          </p>
        </div>
      </div>

      <EMICalculator />
    </div>
  );
}
