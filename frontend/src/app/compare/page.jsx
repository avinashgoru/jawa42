'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { competitors } from '@/data/competitors';
import { motorcycleModels } from '@/data/models';

const jawa42Base = motorcycleModels.find(m => m.id === 'jawa-42') || {
  name: "Jawa 42",
  image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=100"
};

const jawa42Specs = {
  displacement: { value: 294.72, display: "294.72 cc" },
  power: { value: 27.32, display: "27.32 PS" },
  torque: { value: 26.84, display: "26.84 Nm" },
  gears: { value: 6, display: "6 Speed" },
  cooling: { value: 2, display: "Liquid Cooled" } // 0=Air, 1=Air-Oil, 2=Liquid
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

  // Helper to determine if Jawa wins the row
  const isJawaWinner = (specKey) => {
    const jawaValue = jawa42Specs[specKey].value;
    const c1Value = comp1?.specs[specKey].value || 0;
    const c2Value = comp2?.specs[specKey].value || 0;
    
    // Check if Jawa is strictly greater than both competitors
    return jawaValue >= Math.max(c1Value, c2Value);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-accent font-heading font-semibold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center justify-center gap-4">
          <span className="w-8 h-[1px] bg-accent"></span> Head to Head <span className="w-8 h-[1px] bg-accent"></span>
        </h2>
        <h1 className="text-5xl md:text-6xl font-heading font-extrabold uppercase tracking-widest mb-6">Compare Bikes</h1>
        <p className="text-gray-400 text-lg">Select competitors to see how the Jawa 42 stacks up.</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] custom-scrollbar"
      >
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr>
              <th className="p-8 border-b border-white/10 text-gray-500 font-normal uppercase tracking-widest text-xs w-[25%] sticky left-0 bg-[#0a0a0a] z-20">Specification</th>
              
              {/* Jawa 42 Header */}
              <th className="p-6 border-b border-white/10 w-[25%] glass-2 relative z-10 text-center shadow-[0_0_30px_rgba(255,255,255,0.05)] border-x border-white/10">
                <div className="absolute top-0 inset-x-0 h-1 bg-accent rounded-t-2xl"></div>
                <div className="relative w-full h-32 mb-4 mt-2">
                  <Image src={jawa42Base.image} alt="Jawa 42" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-contain drop-shadow-xl hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-accent uppercase">Jawa 42</h3>
              </th>

              {/* Competitor 1 Header */}
              <th className="p-6 border-b border-white/10 w-[25%] text-center">
                <div className="w-full max-w-[200px] mx-auto mb-4">
                  <select 
                    value={comp1Id} 
                    onChange={(e) => setComp1Id(e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded p-2 text-white text-xs uppercase tracking-widest focus:outline-none focus:border-accent"
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
                    <Image src={comp1.image} alt={comp1.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                  </motion.div>
                </AnimatePresence>
                <h3 className="text-xl font-heading font-bold text-gray-300 uppercase">{comp1.name}</h3>
              </th>

              {/* Competitor 2 Header */}
              <th className="p-6 border-b border-white/10 w-[25%] text-center border-l border-white/5">
                <div className="w-full max-w-[200px] mx-auto mb-4">
                  <select 
                    value={comp2Id} 
                    onChange={(e) => setComp2Id(e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded p-2 text-white text-xs uppercase tracking-widest focus:outline-none focus:border-accent"
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
                    <Image src={comp2.image} alt={comp2.name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                  </motion.div>
                </AnimatePresence>
                <h3 className="text-xl font-heading font-bold text-gray-300 uppercase">{comp2.name}</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {specRows.map((row, i) => {
              const jawaWins = isJawaWinner(row.key);
              return (
                <tr key={row.key} className="group border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-gray-400 font-semibold sticky left-0 bg-[#0a0a0a] group-hover:bg-[#111] transition-colors z-20">
                    {row.label}
                  </td>
                  <td className={`p-6 text-center font-bold text-lg bg-white/[0.03] border-x border-white/10 transition-colors ${jawaWins ? 'text-white bg-accent/5' : 'text-gray-300'}`}>
                    {jawaWins && <span className="text-accent mr-2 text-sm drop-shadow-[0_0_8px_rgba(196,30,58,0.8)]">✦</span>}
                    {jawa42Specs[row.key].display}
                  </td>
                  <td className="p-6 text-center text-gray-400">
                    {comp1?.specs[row.key].display}
                  </td>
                  <td className="p-6 text-center text-gray-400 border-l border-white/5">
                    {comp2?.specs[row.key].display}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
