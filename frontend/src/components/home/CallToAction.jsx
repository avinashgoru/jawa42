// cSpell:ignore Jawa
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CallToAction() {
  return (
    <section className="relative py-40 flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=100" 
          alt="Jawa 42" 
          fill
          sizes="100vw"
          className="object-cover opacity-30 grayscale mix-blend-luminosity"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-extrabold uppercase text-white leading-tight mb-8">
            Ready To Experience <br/> The <span className="text-accent">Jawa 42?</span>
          </h2>
          <p className="text-xl text-gray-400 font-light mb-12">
            The road awaits. Book your test ride today and discover the legend firsthand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <Link href="/book" className="bg-white text-black px-10 py-4 font-heading font-bold uppercase tracking-[0.15em] text-xs hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-300">
              Book Test Ride
            </Link>
            <Link href="/dealers" className="bg-transparent border border-white/30 text-white px-10 py-4 font-heading font-bold uppercase tracking-[0.15em] text-xs hover:bg-white hover:text-black transition-all duration-300">
              Find A Dealer
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
