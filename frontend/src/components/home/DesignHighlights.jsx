// cSpell:ignore Jawa
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    title: "Signature Jawa Design",
    description: "The unmistakable silhouette, teardrop tank, and classic proportions pay homage to our legendary heritage while embracing modern aerodynamics.",
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-2024-fuel-tank-17.jpeg?isig=0&q=80"
  },
  {
    title: "Refined Comfort",
    description: "A meticulously crafted seat with premium stitching ensures supreme comfort on any terrain, engineered for long rides without fatigue.",
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-seat-3.png?isig=0&q=80"
  },
  {
    title: "Premium Finish",
    description: "Striking graphics and legendary tank decals seamlessly merge the iconic Jawa soul with contemporary street presence.",
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-2024-branding-fuel-tank-decal.jpeg?isig=0&q=80"
  }
];

export default function DesignHighlights() {
  return (
    <section className="bg-primary py-32 border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-24">
          <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase block mb-4">UNCOMPROMISING DETAIL</span>
          <h3 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight">
            DESIGN HIGHLIGHTS
          </h3>
        </div>

        <div className="space-y-36">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Block */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 w-full"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-surface border border-border group shadow-2xl">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <Image 
                    src={feature.image} 
                    alt={feature.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>
              </motion.div>

              {/* Text Block */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex-1 max-w-lg bg-surface border border-border p-10 rounded-2xl relative z-20 hover:border-accent/20 transition-all duration-500 hover:shadow-2xl"
              >
                <span className="text-[9px] font-bold text-accent tracking-[0.25em] uppercase block mb-4">
                  0{idx + 1} / HIGHLIGHT
                </span>
                <h4 className="text-2xl md:text-3xl font-heading font-extrabold text-white uppercase mb-6">
                  {feature.title}
                </h4>
                <p className="text-sm md:text-base text-text-sec font-body font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
