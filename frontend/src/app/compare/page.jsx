'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { competitors } from '@/data/competitors';
import { motorcycleModels } from '@/data/models';

const jawa42Base = motorcycleModels.find((m) => m.id === 'jawa-42') || {
  name: 'Jawa 42',
  image: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80',
};

// Derive compare specs from the canonical models data so they stay in sync
const jawa42Specs = {
  displacement: { value: parseFloat(jawa42Base.specs?.engine) || 294.72, display: jawa42Base.specs?.engine || '294.72 cc' },
  power: { value: parseFloat(jawa42Base.specs?.power) || 27.32, display: jawa42Base.specs?.power || '27.32 PS' },
  torque: { value: parseFloat(jawa42Base.specs?.torque) || 26.84, display: jawa42Base.specs?.torque || '26.84 Nm' },
  gears: { value: 6, display: '6 Speed' },
  cooling: { value: 2, display: 'Liquid Cooled' }, // 2 = liquid, 1 = air-oil, 0 = air
};

const specRows = [
  { key: 'displacement', label: 'Engine Displacement', higherIsBetter: true },
  { key: 'power', label: 'Max Power', higherIsBetter: true },
  { key: 'torque', label: 'Max Torque', higherIsBetter: true },
  { key: 'gears', label: 'Gears', higherIsBetter: true },
  { key: 'cooling', label: 'Cooling System', higherIsBetter: true },
];

export default function Compare() {
  const [comp1Id, setComp1Id] = useState('hunter-350');
  const [comp2Id, setComp2Id] = useState('cb350');

  const comp1 = competitors.find(c => c.id === comp1Id);
  const comp2 = competitors.find(c => c.id === comp2Id);

  const isJawaWinner = (specKey) => {
    const jawaValue = jawa42Specs[specKey].value;
    const c1Value = comp1?.specs[specKey].value || 0;
    const c2Value = comp2?.specs[specKey].value || 0;
    
    return jawaValue >= Math.max(c1Value, c2Value);
  };

  return (
    <div className="pt-40 pb-32 min-h-screen bg-primary">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase block mb-4">VERSUS</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-white mb-6">COMPARE BIKES</h1>
          <p className="text-sm md:text-base text-text-sec font-body font-light max-w-md mx-auto">Select competitors to see how the Jawa 42 stacks up.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="overflow-x-auto rounded-3xl border border-border bg-surface shadow-2xl custom-scrollbar"
        >
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-8 text-text-sec font-heading font-extrabold uppercase tracking-widest text-[10px] w-[25%] sticky left-0 bg-surface z-20">
                  Specification
                </th>
                
                {/* Jawa 42 Header */}
                <th className="p-8 w-[25%] relative z-10 text-center border-x border-border bg-primary/20">
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-accent"></div>
                  <div className="relative w-full h-32 mb-4 mt-2">
                    <Image src={jawa42Base.image} alt="Jawa 42" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-700 ease-out" />
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-white uppercase tracking-wider">Jawa 42</h3>
                </th>

                {/* Competitor 1 Header */}
                <th className="p-8 w-[25%] text-center">
                  <div className="w-full max-w-[200px] mx-auto mb-4">
                    <select 
                      value={comp1Id} 
                      onChange={(e) => setComp1Id(e.target.value)}
                      className="w-full bg-primary border border-border rounded-xl p-3 text-white text-[10.5px] font-heading font-extrabold uppercase tracking-widest focus:outline-none focus:border-accent transition-colors cursor-pointer"
                    >
                      {competitors.map(c => (
                        <option key={c.id} value={c.id} disabled={c.id === comp2Id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={comp1.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-32 mb-4"
                    >
                      <Image src={comp1.image} alt={comp1.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-contain opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-out" />
                    </motion.div>
                  </AnimatePresence>
                  <h3 className="text-lg font-heading font-bold text-[#B3B3B3] uppercase tracking-wider">{comp1.name}</h3>
                </th>

                {/* Competitor 2 Header */}
                <th className="p-8 w-[25%] text-center border-l border-border">
                  <div className="w-full max-w-[200px] mx-auto mb-4">
                    <select 
                      value={comp2Id} 
                      onChange={(e) => setComp2Id(e.target.value)}
                      className="w-full bg-primary border border-border rounded-xl p-3 text-white text-[10.5px] font-heading font-extrabold uppercase tracking-widest focus:outline-none focus:border-accent transition-colors cursor-pointer"
                    >
                      {competitors.map(c => (
                        <option key={c.id} value={c.id} disabled={c.id === comp1Id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={comp2.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-32 mb-4"
                    >
                      <Image src={comp2.image} alt={comp2.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-contain opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-out" />
                    </motion.div>
                  </AnimatePresence>
                  <h3 className="text-lg font-heading font-bold text-[#B3B3B3] uppercase tracking-wider">{comp2.name}</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {specRows.map((row, i) => {
                const jawaWins = isJawaWinner(row.key);
                return (
                  <tr key={row.key} className="group border-b border-border last:border-0 hover:bg-white/[0.01] transition-colors">
                    <td className="p-6 text-[#B3B3B3] font-heading font-bold text-sm tracking-wide sticky left-0 bg-surface group-hover:bg-[#202020] transition-colors z-20 border-r border-border">
                      {row.label}
                    </td>
                    <td className={`p-6 text-center font-specs font-bold text-sm bg-primary/10 border-r border-border transition-colors ${jawaWins ? 'text-white bg-accent/5' : 'text-gray-300'}`}>
                      {jawaWins && <span className="text-accent mr-1.5 text-xs">✦</span>}
                      {jawa42Specs[row.key].display}
                    </td>
                    <td className="p-6 text-center text-[#B3B3B3] font-specs text-sm">
                      {comp1?.specs[row.key].display}
                    </td>
                    <td className="p-6 text-center text-[#B3B3B3] font-specs text-sm border-l border-border">
                      {comp2?.specs[row.key].display}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
