// cSpell:ignore Jawa DOHC
'use client';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { motorcycleModels } from '@/data/models';

const jawa42 = motorcycleModels.find((m) => m.id === 'jawa-42');

const ENGINE_STATS = [
  { label: 'Max Power', value: parseFloat(jawa42?.specs.power) || 27.32, suffix: ' PS', delay: 0 },
  { label: 'Max Torque', value: parseFloat(jawa42?.specs.torque) || 26.84, suffix: ' Nm', delay: 0.1 },
  { label: 'Compression', value: 11, suffix: ':1', delay: 0.2 },
  { label: 'Gearbox', value: 6, suffix: ' Speed', delay: 0.3 },
];

const AnimatedCounter = ({ end, suffix = "", duration = 1.5 }) => {
  const [inView, setInView] = useState(false);
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => {
    return (Number.isInteger(end) ? Math.floor(current) : current.toFixed(2)) + suffix;
  });

  useEffect(() => {
    if (inView) {
      spring.set(end);
    }
  }, [inView, end, spring]);

  return (
    <motion.span 
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true }}
    >
      {display}
    </motion.span>
  );
};

export default function EnginePerformance() {
  return (
    <section className="bg-secondary py-32 border-t border-border relative overflow-hidden" id="explore">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-rear-view-2.png?isig=0&q=80')] bg-cover bg-center opacity-5 mix-blend-luminosity"></div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-20"
        >
          <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase block mb-4">PANTHER ENGINE</span>
          <h3 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight leading-none mb-6">
            THE HEART<br />OF THE BEAST
          </h3>
          <p className="text-sm md:text-base text-text-sec font-body font-light leading-relaxed max-w-xl">
            The 294.72cc liquid-cooled, single-cylinder DOHC engine is engineered for refined performance, delivering an exhilarating surge of power across the rev range while maintaining signature Jawa character.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGINE_STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: stat.delay }}
              className="bg-surface border border-border p-8 rounded-2xl hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl group"
            >
              <p className="text-text-sec text-[10px] font-bold uppercase tracking-widest mb-4 group-hover:text-accent transition-colors">
                {stat.label}
              </p>
              <p className="text-3xl md:text-4xl font-specs font-bold text-white tracking-wide">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
