// cSpell:ignore Jawa
'use client';
import { motion } from 'framer-motion';

export default function StoryTelling() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-24.png?isig=0&q=80')" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-6xl font-heading font-extrabold uppercase text-white leading-tight mb-8">
            Crafted for those who <br/> <span className="text-accent">write their own history.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Experience a ride that commands respect. The Jawa 42 doesn't just transport you; it transforms every journey into a cinematic escape.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
