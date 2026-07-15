// cSpell:ignore Jawa
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function CinematicHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-start overflow-hidden bg-primary pt-24">
      {/* Dynamic Motorcycle Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-full lg:w-[60%] z-10" />
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="absolute inset-y-0 right-0 w-full lg:w-[60%] flex items-center justify-center lg:justify-end z-0 pt-20 lg:pt-0 pr-0 lg:pr-8"
        >
          <div className="relative w-full max-w-[90%] lg:max-w-full h-[50vh] lg:h-[75vh]">
            <Image 
              src="https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80" 
              alt="Jawa 42 Profile" 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-center lg:object-right"
            />
          </div>
        </motion.div>
      </div>

      {/* Content Area - 45% Width Constraint */}
      <div className="container mx-auto px-6 z-20 h-full flex flex-col justify-center">
        <div className="w-full lg:w-[45%]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <h2 className="text-accent font-heading font-semibold tracking-[0.3em] uppercase text-[10px] mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent"></span> The Legend Returns
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-[6.5rem] font-heading font-extrabold uppercase tracking-tighter leading-[0.85] mb-8 text-white">
              The New <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 drop-shadow-2xl">Jawa 42</span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 font-light max-w-md leading-relaxed">
              Engineered for the modern rider. A masterful blend of classic heritage, refined performance, and uncompromising design.
            </p>
          </motion.div>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap gap-5 mb-24"
          >
            <Link href="/book" className="bg-white text-black px-10 py-4 rounded-full font-heading font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transform duration-300">
              Book Test Ride
            </Link>
            <Link href="#explore" className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full font-heading font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
              Explore Model
            </Link>
          </motion.div>

          {/* Premium Floating Spec Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4 max-w-lg"
          >
            {[
              { label: 'Engine', value: '294.72 cc' },
              { label: 'Power', value: '27.32 PS' },
              { label: 'Torque', value: '26.84 Nm' },
              { label: 'Weight', value: '172 kg' },
            ].map((spec, i) => (
              <div 
                key={i} 
                className="glass-3 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 group"
              >
                <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-[0.2em] mb-1.5 group-hover:text-gray-300 transition-colors">
                  {spec.label}
                </p>
                <p className="text-lg font-heading font-bold text-white tracking-wide">
                  {spec.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-semibold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-white opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
