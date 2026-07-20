// cSpell:ignore Jawa
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="relative py-48 bg-primary flex items-center justify-center overflow-hidden border-t border-border">
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 z-0 opacity-15 grayscale mix-blend-luminosity bg-cover bg-center scale-[1.02]"
        style={{ backgroundImage: "url('https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80')" }}
      />

      <div className="container mx-auto px-6 relative z-20 text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase block mb-6">THE INVITATION</span>
          <h3 className="text-4xl md:text-6xl font-heading font-black uppercase text-white leading-[1.1] mb-8 tracking-tight">
            READY TO EXPERIENCE<br />
            <span className="text-[#B3B3B3]">THE LEGEND FIRSTHAND?</span>
          </h3>
          <p className="text-sm md:text-base text-text-sec font-body font-light leading-relaxed max-w-md mx-auto mb-12">
            The road awaits. Book your test ride today and discover the Jawa tribe experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/book" 
              className="bg-accent hover:bg-accent-hover text-white px-9 py-4 font-heading font-black uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all duration-300 shadow-[0_5px_15px_rgba(181,18,27,0.2)] w-full sm:w-auto"
            >
              Book Test Ride
            </Link>
            <Link 
              href="/dealers" 
              className="bg-surface hover:bg-white hover:text-black border border-border text-white px-9 py-4 font-heading font-black uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all duration-300 w-full sm:w-auto"
            >
              Find A Dealer
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
