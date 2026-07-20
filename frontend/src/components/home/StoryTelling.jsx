// cSpell:ignore Jawa
'use client';
import { motion } from 'framer-motion';

export default function StoryTelling() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-primary py-32">
      {/* Background Parallax Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary/80 z-10" />
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-40 scale-105 transition-transform duration-[6000ms] ease-out hover:scale-100"
          style={{ backgroundImage: "url('https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-24.png?isig=0&q=80')" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase block mb-6">
            THE PHILOSOPHY
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black uppercase text-white leading-[1.1] mb-8 tracking-tight">
            CRAFTED FOR THOSE WHO<br/>
            <span className="text-[#B3B3B3]">WRITE THEIR OWN HISTORY.</span>
          </h2>
          <p className="text-sm md:text-base text-text-sec font-body font-light leading-relaxed max-w-xl mx-auto">
            Experience a ride that commands respect. The Jawa 42 does not just transport you; it transforms every journey into a cinematic escape.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
