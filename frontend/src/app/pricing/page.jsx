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
    <div className="pt-40 pb-32 min-h-screen bg-primary">
      <div className="container mx-auto px-6 text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase block mb-4">PRICING</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-white mb-6">SELECT YOUR RIDE</h1>
          <p className="text-sm md:text-base text-text-sec font-body font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Choose the variant that matches your distinctive style and performance needs. Prices dynamically update based on your selected city.
          </p>

          {/* City Selector */}
          <div className="max-w-md mx-auto mb-20 relative z-50 text-left">
            <label className="block text-[10px] font-specs font-bold uppercase tracking-widest text-[#B3B3B3] mb-3 ml-1">SELECT CITY FOR ESTIMATE</label>
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
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (index * 0.15) }}
                className={`flex flex-col items-center p-8 rounded-3xl transition-all duration-500 group ${
                  isPopular 
                  ? 'bg-surface relative transform lg:-translate-y-4 border border-accent/20 shadow-[0_10px_30px_rgba(181,18,27,0.06)] z-10' 
                  : 'bg-surface border border-border hover:border-accent/20'
                }`}
              >
                <div className={`relative h-48 mb-6 rounded-2xl overflow-hidden p-4 group w-full ${isPopular ? 'bg-gradient-to-t from-accent/10 to-transparent border border-accent/10 shadow-[0_0_30px_rgba(206,161,106,0.15)] h-56' : 'bg-gradient-to-t from-primary/50 to-transparent border border-border/50'}`}>
                  {isPopular && <div className="absolute top-3 right-3 bg-accent text-white text-[9px] uppercase tracking-widest font-black px-3 py-1.5 rounded-full z-10">Popular</div>}
                  <Image 
                    src={jawa42.image} 
                    alt={variant.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                    className={`object-contain transition-all duration-700 ease-out ${isPopular ? 'drop-shadow-2xl group-hover:scale-105' : 'drop-shadow-lg opacity-70 group-hover:opacity-100 group-hover:scale-[1.02]'}`} 
                  />
                </div>
                
                <h2 className="font-heading font-extrabold mb-1 uppercase tracking-wider text-white text-2xl">{variant.name}</h2>
                <p className={`mb-8 uppercase tracking-[0.2em] text-[10px] font-bold ${isPopular ? 'text-accent' : 'text-text-sec'}`}>{variant.description}</p>
                
                {/* Detailed Pricing Block */}
                <div className="w-full bg-primary border border-border rounded-2xl p-5 mb-8 text-left">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-border">
                    <span className="text-[10px] text-text-sec font-bold tracking-widest uppercase">Ex-Showroom</span>
                    <span className="text-sm font-specs font-bold text-white">{formatCurrency(pricing.exShowroom)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1.5 text-xs text-text-sec font-specs font-bold">
                    <span>RTO (Est.)</span>
                    <span>{formatCurrency(pricing.rto)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1.5 text-xs text-text-sec font-specs font-bold">
                    <span>Insurance (Est.)</span>
                    <span>{formatCurrency(pricing.insurance)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3 text-xs text-text-sec font-specs font-bold">
                    <span>Other Charges</span>
                    <span>{formatCurrency(pricing.other)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-border">
                    <span className="text-[10px] text-accent uppercase tracking-widest font-black">On-Road</span>
                    <span className="text-lg font-specs font-extrabold text-accent">{formatCurrency(pricing.total)}*</span>
                  </div>
                </div>
  
                <Link href="/book" className={`w-full py-4 uppercase tracking-[0.2em] text-[10px] font-heading font-black mt-auto inline-block text-center flex items-center justify-center transition-all rounded-xl ${
                  isPopular 
                  ? 'bg-accent hover:bg-accent-hover text-white shadow-[0_5px_15px_rgba(181,18,27,0.2)]' 
                  : 'border border-border text-white hover:bg-white hover:text-black hover:border-white'
                }`}>
                  Book Now
                </Link>
              </motion.div>
            );
          })}
  
        </div>
  
        <div className="mt-20 text-center">
          <p className="text-[10px] text-text-sec uppercase tracking-widest max-w-3xl mx-auto leading-loose">
            *Prices shown are indicative and may vary depending on city, dealer location, registration charges, insurance, and applicable taxes. Displayed On-Road price is an estimate for <span className="text-gray-300 font-bold">{city}</span>.
          </p>
        </div>
      </div>

      <EMICalculator />
    </div>
  );
}
