'use client';
import { motion } from 'framer-motion';
import { Zap, Activity, Shield } from 'lucide-react';

export default function PerformanceSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section className="relative z-20 bg-secondary py-32 border-t border-white/5 pointer-events-auto">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-heading font-bold uppercase tracking-wide mb-4">Pure Performance</h2>
          <p className="text-xl text-gray-400 font-light">Engineered for the thrill seekers.</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="bg-primary border border-white/5 p-12 rounded-xl text-center group hover:border-accent/50 transition-colors duration-500">
            <Zap className="w-12 h-12 text-accent mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-5xl font-heading font-bold text-white mb-2">27.32 <span className="text-2xl text-gray-500">PS</span></h3>
            <p className="text-sm tracking-widest uppercase text-gray-500 font-semibold">Maximum Power</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="bg-primary border border-white/5 p-12 rounded-xl text-center group hover:border-accent/50 transition-colors duration-500">
            <Activity className="w-12 h-12 text-accent mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-5xl font-heading font-bold text-white mb-2">26.84 <span className="text-2xl text-gray-500">Nm</span></h3>
            <p className="text-sm tracking-widest uppercase text-gray-500 font-semibold">Maximum Torque</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="bg-primary border border-white/5 p-12 rounded-xl text-center group hover:border-accent/50 transition-colors duration-500">
            <Shield className="w-12 h-12 text-accent mx-auto mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-5xl font-heading font-bold text-white mb-2">Dual</h3>
            <p className="text-sm tracking-widest uppercase text-gray-500 font-semibold">Channel ABS</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
