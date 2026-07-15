// cSpell:ignore Jawa
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    <section className="bg-primary py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-accent font-heading font-bold tracking-widest uppercase text-sm mb-4">Uncompromising Detail</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-wide">
            Design Highlights
          </h3>
        </div>

        <div className="space-y-24">
          {features.map((feature, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Image Block */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex-1 w-full"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <Image 
                    src={feature.image} 
                    alt={feature.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
              </motion.div>

              {/* Text Block */}
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 max-w-lg glass-2 p-10 rounded-2xl relative z-20 md:-mx-12 hover:bg-white/[0.08] transition-colors duration-500"
              >
                <h4 className="text-3xl font-heading font-bold text-white uppercase mb-6">{feature.title}</h4>
                <p className="text-gray-400 text-lg leading-relaxed">
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
