// cSpell:ignore Jawa, Yezdi, Perak, Roadster, Scrambler, Bobber
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLocationStore } from '@/store/useLocationStore';
import { motorcycleModels, formatCurrency } from '@/data/models';
import { calculateOnRoadPrice } from '@/utils/pricing';

export default function ModelRange() {
  const { city } = useLocationStore();
  
  // Defensive check: Only render models that exist and have an image/name
  const validModels = motorcycleModels.filter(model => model && model?.name && model?.image);

  if (!validModels || validModels.length === 0) {
    return (
      <section className="bg-[#030303] py-32 border-t border-white/5 relative z-10" id="models">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">Models are currently unavailable. Please check back later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#030303] py-24 border-t border-white/5 relative z-10" id="models">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-accent font-heading font-semibold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-accent"></span> The Lineup <span className="w-8 h-[1px] bg-accent"></span>
          </h2>
          <h3 className="text-5xl md:text-6xl font-heading font-extrabold text-white uppercase tracking-widest mb-6">
            Explore Our Models
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            From the timeless elegance of the Jawa classics to the rugged spirit of Yezdi. Find the perfect machine for your journey.
          </p>
        </div>

        {/* Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {validModels.map((model, idx) => {
            const pricing = calculateOnRoadPrice(model.baseExShowroomPrice, city);
            
            return (
              <motion.div 
                key={model.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                className="group flex flex-col glass-1 border border-white/5 rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-colors duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                  <Image 
                    src={model.image} 
                    alt={model.name || "Jawa Motorcycle"} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out opacity-90"
                  />
                  <span className="absolute top-4 left-4 z-20 text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/10 pointer-events-none">
                    {model.brand || "Jawa"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-[0.2em] mb-1">
                    {model.tagline || "Classic Motorcycle"}
                  </p>
                  <h4 className="text-2xl font-heading font-bold text-white uppercase mb-4">
                    {model.name}
                  </h4>
                  
                  {/* Key Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-6 border-y border-white/5 py-4">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Engine</span>
                      <span className="text-xs font-semibold text-white">{model?.specs?.engine || "N/A"}</span>
                    </div>
                    <div className="flex flex-col items-center text-center border-x border-white/5">
                      <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Power</span>
                      <span className="text-xs font-semibold text-white">{model?.specs?.power || "N/A"}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Weight</span>
                      <span className="text-xs font-semibold text-white">{model?.specs?.weight || "N/A"}</span>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="mt-auto">
                    <div className="mb-5 flex flex-col gap-1 border border-white/10 p-3 rounded-lg bg-black/40">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 tracking-widest uppercase">Ex-Showroom</span>
                        <span className="text-sm font-bold text-white">{formatCurrency(pricing.exShowroom)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-accent tracking-widest uppercase font-bold">Est. On-Road</span>
                        <span className="text-lg font-bold text-accent">{formatCurrency(pricing.total)}*</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Link href="/specs" className="w-full py-3 text-center border border-white/10 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-colors duration-300 rounded">
                        Explore Details
                      </Link>
                      <Link href="/book" className="w-full py-3 text-center bg-accent text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-accent-hover transition-colors duration-300 rounded">
                        Book Test Ride
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest max-w-4xl mx-auto leading-relaxed">
            *Prices shown are indicative and may vary depending on city, dealer location, registration charges, insurance, and applicable taxes. Displayed On-Road price is an estimate for <span className="text-gray-300 font-bold">{city}</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
