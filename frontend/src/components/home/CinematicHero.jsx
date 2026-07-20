// cSpell:ignore Jawa
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { motorcycleModels } from '@/data/models';

const jawa42 = motorcycleModels.find((m) => m.id === 'jawa-42');

const HERO_SPECS = [
  { label: 'Engine', value: jawa42?.specs.engine ?? '294.72 cc' },
  { label: 'Power', value: jawa42?.specs.power ?? '27.32 PS' },
  { label: 'Torque', value: jawa42?.specs.torque ?? '26.84 Nm' },
  { label: 'Mileage', value: jawa42?.specs.mileage ?? '33 kmpl' },
];

export default function CinematicHero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-start overflow-hidden bg-primary pt-24">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent w-full lg:w-[60%] z-10" />
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 right-0 w-full lg:w-[65%] flex items-center justify-center lg:justify-end z-0 pt-20 lg:pt-0 pr-0 lg:pr-12"
        >
          <div className="relative w-full max-w-[90%] lg:max-w-full h-[55vh] lg:h-[80vh]">
            <Image 
              src="https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80" 
              alt="Jawa 42 Profile" 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] object-center lg:object-right transition-transform duration-[4000ms] ease-out hover:scale-105"
            />
          </div>
        </motion.div>
      </div>

      {/* Content Area - 12-column grid layout constraint */}
      <div className="container mx-auto px-6 z-20 h-full flex flex-col justify-center max-w-7xl">
        <div className="w-full lg:w-[48%]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <p className="text-accent font-heading font-bold tracking-[0.3em] uppercase text-[10px] mb-6 flex items-center gap-3">
              <span className="w-6 h-[1.5px] bg-accent" aria-hidden /> The Legend Returns
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-black uppercase tracking-tight leading-[0.9] mb-8 text-white">
              Jawa 42
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 drop-shadow-2xl mt-2 text-3xl md:text-4xl lg:text-5xl tracking-wide font-extrabold">
                Built for the road
              </span>
            </h1>
            <p className="text-sm md:text-base text-text-sec font-body font-light max-w-md leading-relaxed">
              Engineered for the modern rider. Classic heritage, refined performance, and uncompromising design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link
              href="/book"
              className="bg-accent hover:bg-accent-hover text-white px-9 py-4 rounded-xl font-heading font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-[0_5px_15px_rgba(181,18,27,0.2)] hover:shadow-[0_8px_25px_rgba(181,18,27,0.4)]"
            >
              Book Test Ride
            </Link>
            <Link
              href="/models"
              className="bg-surface/40 hover:bg-surface/80 border border-border text-white px-9 py-4 rounded-xl font-heading font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 backdrop-blur-md"
            >
              Explore Models
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
          >
            {HERO_SPECS.map((spec) => (
              <div
                key={spec.label}
                className="bg-surface/50 border border-border rounded-xl p-4 transition-all duration-500 hover:bg-surface/80 hover:border-accent/20 group"
              >
                <dt className="text-text-sec text-[8px] font-bold uppercase tracking-[0.2em] mb-1 group-hover:text-white transition-colors">
                  {spec.label}
                </dt>
                <dd className="text-sm font-specs font-bold text-white tracking-wide">{spec.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-text-sec font-bold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-white opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
