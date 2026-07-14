// cSpell:ignore Jawa DOHC
'use client';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedCounter = ({ end, suffix = "", duration = 2 }) => {
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
    <section className="bg-secondary py-32 border-t border-white/5 relative overflow-hidden" id="explore">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-rear-view-2.png?isig=0&q=100')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-accent font-heading font-bold tracking-widest uppercase text-sm mb-4">Panther Engine</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-wide leading-tight mb-6">
            The Heart <br/>Of The Beast
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            The 294.72cc liquid-cooled, single-cylinder DOHC engine is engineered for refined performance, delivering an exhilarating surge of power across the rev range while maintaining signature Jawa character.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Max Power', value: 27.32, suffix: ' PS', delay: 0 },
            { label: 'Max Torque', value: 26.84, suffix: ' Nm', delay: 0.1 },
            { label: 'Compression', value: 11, suffix: ':1', delay: 0.2 },
            { label: 'Gearbox', value: 6, suffix: ' Speed', delay: 0.3 },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: stat.delay }}
              className="glass-2 p-8 rounded-2xl hover:border-accent/40 hover:bg-white/[0.08] transition-all duration-500 group transform hover:-translate-y-1"
            >
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-4 group-hover:text-accent transition-colors">{stat.label}</p>
              <p className="text-3xl md:text-4xl font-heading font-bold text-white">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
