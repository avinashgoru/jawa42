// cSpell:ignore Jawa, barend, hotspot, hotspots, Hotspot, Hotspots
'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { useLocationStore } from '@/store/useLocationStore';
import { calculateOnRoadPrice } from '@/utils/pricing';
import { formatCurrency, motorcycleModels } from '@/data/models';
import SearchableCitySelect from '@/components/SearchableCitySelect';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, Sun, Moon, Info } from 'lucide-react';

const colorImages = {
  '#C41E3A': 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80', // Red
  '#2A2A2A': 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-side-view-11.png?isig=0&q=80', // Grey
  '#1B3B2B': 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-23.png?isig=0&q=80', // Green
  '#EEEEEE': 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-rear-view.png?isig=0&q=80', // White
};

export default function Configurator() {
  const { color, setColor, exhaust, setExhaust, wheels, setWheels, seat, setSeat, mirrors, setMirrors } = useConfiguratorStore();
  const { city, setCity } = useLocationStore();

  const [enquiryMode, setEnquiryMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  
  // Advanced Configurator States
  const [lightingMode, setLightingMode] = useState('night'); // 'day' | 'night'
  const [activeHotspot, setActiveHotspot] = useState(null);

  const colors = [
    { name: 'Jawa Red', hex: '#C41E3A' },
    { name: 'Midnight Grey', hex: '#2A2A2A' },
    { name: 'Galactic Green', hex: '#1B3B2B' },
    { name: 'Comet White', hex: '#EEEEEE' },
  ];

  // Dynamic Pricing Calculation
  const pricingData = useMemo(() => {
    const jawa42BasePrice = motorcycleModels.find(m => m.id === 'jawa-42')?.baseExShowroomPrice || 198142;
    
    // Accessory Costs
    const wheelsCost = wheels === 'alloy' ? 6000 : 0;
    const exhaustCost = exhaust === 'sport' ? 3000 : 0;
    const seatCost = seat === 'bobber' ? 4500 : 0;
    const mirrorsCost = mirrors === 'barend' ? 2500 : 0;
    const colorCost = color === '#C41E3A' ? 0 : 2000; // Premium colors

    const totalAccessoriesCost = wheelsCost + exhaustCost + colorCost + seatCost + mirrorsCost;
    const configuredExShowroom = jawa42BasePrice + totalAccessoriesCost;

    const finalPricing = calculateOnRoadPrice(configuredExShowroom, city);

    return {
      basePrice: jawa42BasePrice,
      accessoriesCost: totalAccessoriesCost,
      wheelsCost,
      exhaustCost,
      colorCost,
      seatCost,
      mirrorsCost,
      ...finalPricing
    };
  }, [wheels, exhaust, color, seat, mirrors, city]);

  const handleEnquire = async (e) => {
    e.preventDefault();
    if (!enquiryMode) {
      setEnquiryMode(true);
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your name and phone number.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          source: 'Configurator',
          buildDetails: {
            color: colors.find(c => c.hex === color)?.name,
            wheels,
            exhaust,
            seat,
            mirrors,
            city,
            estimatedPrice: pricingData.total
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to submit.');

      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  const handleDownloadQuote = () => {
    window.print();
  };

  // Hotspot definitions (approximate percentages for a generic side view)
  const hotspots = [
    { id: 'tank', label: 'Fuel Tank', x: '45%', y: '35%', desc: 'Select from 4 premium colors.' },
    { id: 'seat', label: 'Seat', x: '65%', y: '40%', desc: 'Dual classic or single bobber seat.' },
    { id: 'exhaust', label: 'Exhaust', x: '70%', y: '80%', desc: 'Chrome standard or Matte sport.' },
    { id: 'wheels', label: 'Wheels', x: '25%', y: '80%', desc: 'Wire spoke or Alloy rims.' },
    { id: 'mirrors', label: 'Mirrors', x: '35%', y: '15%', desc: 'Standard or Bar-end mirrors.' },
  ];

  return (
    <div className={`relative w-full h-screen overflow-hidden pt-20 flex flex-col md:flex-row transition-colors duration-1000 ${lightingMode === 'night' ? 'bg-[#050505]' : 'bg-[#e5e5e5]'}`}>
      
      {/* 2D Image Viewport with Lighting Simulation */}
      <div className={`flex-1 relative h-[50vh] md:h-full flex items-center justify-center p-8 transition-colors duration-1000 ${lightingMode === 'night' ? 'bg-black' : 'bg-gradient-to-b from-gray-100 to-gray-300 shadow-inner'}`}>
        
        {/* Studio Lighting Effects */}
        {lightingMode === 'day' && (
          <div className="absolute inset-0 bg-white/40 mix-blend-overlay pointer-events-none z-10 transition-opacity duration-1000"></div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={color}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full max-w-4xl h-full flex items-center justify-center z-20"
          >
            <img 
              src={colorImages[color] || colorImages['#C41E3A']}
              alt="Configured Jawa 42"
              className={`w-full max-h-full object-contain drop-shadow-2xl transition-all duration-1000 ${lightingMode === 'night' ? 'brightness-90 contrast-110' : 'brightness-110 contrast-100 drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]'}`}
            />

            {/* Hotspots */}
            {hotspots.map((spot) => (
              <div 
                key={spot.id}
                className="absolute w-6 h-6 -ml-3 -mt-3 z-30"
                style={{ left: spot.x, top: spot.y }}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                <div className="relative w-full h-full flex items-center justify-center cursor-pointer group">
                  <span className="absolute w-full h-full bg-accent/40 rounded-full animate-ping"></span>
                  <span className="relative w-3 h-3 bg-accent rounded-full border border-white group-hover:scale-150 transition-transform"></span>
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {activeHotspot === spot.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-black/90 backdrop-blur border border-white/10 rounded p-3 text-center pointer-events-none"
                      >
                        <h4 className="text-white text-[10px] font-bold uppercase tracking-widest mb-1">{spot.label}</h4>
                        <p className="text-gray-400 text-[9px]">{spot.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Studio Controls */}
        <div className="absolute top-8 left-8 flex flex-col gap-3 z-30">
          <div className="flex bg-black/50 backdrop-blur rounded-full p-1 border border-white/10">
            <button 
              onClick={() => setLightingMode('night')}
              className={`p-2 rounded-full transition-colors ${lightingMode === 'night' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
              title="Night Studio"
            >
              <Moon size={16} />
            </button>
            <button 
              onClick={() => setLightingMode('day')}
              className={`p-2 rounded-full transition-colors ${lightingMode === 'day' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
              title="Day Studio"
            >
              <Sun size={16} />
            </button>
          </div>
        </div>

        {/* City Selector in viewport (mobile friendly) */}
        <div className="absolute top-8 right-8 z-30 w-48 hidden md:block">
          <SearchableCitySelect 
            value={city} 
            onChange={(selectedCity) => setCity(selectedCity)} 
          />
        </div>
      </div>

      {/* Control Panel */}
      <div className={`w-full md:w-[500px] h-[50vh] md:h-full overflow-y-auto p-8 flex flex-col gap-8 z-40 shadow-2xl relative custom-scrollbar transition-colors duration-1000 ${lightingMode === 'night' ? 'bg-[#0a0a0a]/95 text-white border-l border-white/5' : 'bg-white/95 text-black border-l border-black/5'}`}>
        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-50 bg-[#050505] flex flex-col p-8 print:bg-white print:text-black overflow-y-auto custom-scrollbar"
            >
              <div className="print:hidden flex justify-end mb-4 gap-2">
                <button onClick={handleDownloadQuote} className="p-2 bg-white/5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Download Quote">
                  <Download size={18} />
                </button>
                <button onClick={() => { setStatus('idle'); setEnquiryMode(false); setFormData({name:'', phone:''}); }} className="p-2 bg-white/5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 print:hidden">
                  ✓
                </div>
                <h2 className="text-2xl font-heading font-bold uppercase tracking-widest text-white print:text-black mb-2">Build Configuration Saved</h2>
                <p className="text-gray-400 text-xs print:text-gray-600">Reference: JW42-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
              </div>

              {/* Digital Build Sheet */}
              <div className="bg-white/5 border border-white/10 print:border-black/20 rounded-lg p-6 mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4 border-b border-white/10 print:border-black/10 pb-2">Vehicle Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">Model</span>
                    <span className="font-bold text-white print:text-black">Jawa 42</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">Color</span>
                    <span className="font-bold text-white print:text-black">{colors.find(c => c.hex === color)?.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">Wheels</span>
                    <span className="font-bold text-white print:text-black">{wheels === 'alloy' ? 'Alloy' : 'Wire Spoke'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">Exhaust</span>
                    <span className="font-bold text-white print:text-black">{exhaust === 'sport' ? 'Matte Sport' : 'Classic Chrome'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">Seat</span>
                    <span className="font-bold text-white print:text-black">{seat === 'bobber' ? 'Bobber Single' : 'Classic Dual'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">Mirrors</span>
                    <span className="font-bold text-white print:text-black">{mirrors === 'barend' ? 'Bar-End' : 'Standard'}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4 border-b border-white/10 print:border-black/10 pb-2">Financial Summary ({city})</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">Base Price</span>
                    <span className="text-white print:text-black">{formatCurrency(pricingData.basePrice)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">Options & Accessories</span>
                    <span className="text-white print:text-black">+{formatCurrency(pricingData.accessoriesCost)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">RTO (Estimated)</span>
                    <span className="text-white print:text-black">+{formatCurrency(pricingData.rto)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">Insurance (Estimated)</span>
                    <span className="text-white print:text-black">+{formatCurrency(pricingData.insurance)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 print:text-gray-600">Other Charges</span>
                    <span className="text-white print:text-black">+{formatCurrency(pricingData.other)}</span>
                  </div>
                </div>
                
                <div className="border-t border-white/20 print:border-black/20 pt-3 mt-3 flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-white print:text-black">Total On-Road</span>
                  <span className="text-xl font-heading font-bold text-accent">{formatCurrency(pricingData.total)}</span>
                </div>
              </div>

              <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mb-8 print:hidden">
                Our dealership team in {city} will contact {formData.name} at {formData.phone} shortly.
              </p>

              <button 
                onClick={() => { setStatus('idle'); setEnquiryMode(false); setFormData({name:'', phone:''}); }}
                className="print:hidden w-full py-4 border border-white/20 hover:bg-white/10 transition-colors rounded uppercase tracking-widest font-bold text-xs text-white"
              >
                Start New Build
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <h1 className="text-3xl font-heading font-bold uppercase mb-2">Build Your Legend</h1>
          <p className={`text-xs ${lightingMode === 'night' ? 'text-gray-400' : 'text-gray-600'}`}>Customize every detail to make it yours.</p>
        </div>

        <div className="md:hidden">
          <label className={`block text-[10px] uppercase tracking-widest mb-2 font-bold ml-1 ${lightingMode === 'night' ? 'text-gray-500' : 'text-gray-600'}`}>Your City</label>
          <SearchableCitySelect 
            value={city} 
            onChange={(selectedCity) => setCity(selectedCity)} 
          />
        </div>

        {/* Color Selection */}
        <div className={`p-5 rounded-xl border transition-colors ${lightingMode === 'night' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <div className="flex justify-between items-end mb-4">
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${lightingMode === 'night' ? 'text-gray-400' : 'text-gray-500'}`}>Fuel Tank Color</h3>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{colors.find(c => c.hex === color)?.name}</span>
          </div>
          <div className="flex gap-4">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.hex)}
                className={`w-10 h-10 rounded-full transition-all duration-300 relative shadow-lg ${color === c.hex ? `scale-110 z-10 border ${lightingMode === 'night' ? 'border-white' : 'border-black'}` : `opacity-70 hover:opacity-100 hover:scale-105 border ${lightingMode === 'night' ? 'border-white/20' : 'border-black/20'}`}`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                {color === c.hex && (
                  <span className="absolute -inset-[4px] border border-accent/60 rounded-full animate-in fade-in zoom-in duration-300"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Wheels Selection */}
        <div className={`p-5 rounded-xl border transition-colors ${lightingMode === 'night' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <div className="flex justify-between items-end mb-4">
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${lightingMode === 'night' ? 'text-gray-400' : 'text-gray-500'}`}>Wheels</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setWheels('spoke')}
              className={`p-4 rounded text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border flex flex-col gap-1 items-start ${wheels === 'spoke' ? 'border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(196,30,58,0.1)]' : `border-transparent ${lightingMode === 'night' ? 'bg-black/30 hover:bg-white/5' : 'bg-white hover:bg-black/5'}`}`}
            >
              <span>Wire Spoke</span>
              <span className={`text-[8px] ${lightingMode === 'night' ? 'text-gray-500' : 'text-gray-400'}`}>Standard</span>
            </button>
            <button 
              onClick={() => setWheels('alloy')}
              className={`p-4 rounded text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border flex flex-col gap-1 items-start ${wheels === 'alloy' ? 'border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(196,30,58,0.1)]' : `border-transparent ${lightingMode === 'night' ? 'bg-black/30 hover:bg-white/5' : 'bg-white hover:bg-black/5'}`}`}
            >
              <span>Alloy</span>
              <span className="text-accent text-[8px]">+₹6,000</span>
            </button>
          </div>
        </div>

        {/* Exhaust Selection */}
        <div className={`p-5 rounded-xl border transition-colors ${lightingMode === 'night' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <div className="flex justify-between items-end mb-4">
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${lightingMode === 'night' ? 'text-gray-400' : 'text-gray-500'}`}>Exhaust System</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setExhaust('standard')}
              className={`p-4 rounded text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border flex flex-col gap-1 items-start ${exhaust === 'standard' ? 'border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(196,30,58,0.1)]' : `border-transparent ${lightingMode === 'night' ? 'bg-black/30 hover:bg-white/5' : 'bg-white hover:bg-black/5'}`}`}
            >
              <span>Chrome Dual</span>
              <span className={`text-[8px] ${lightingMode === 'night' ? 'text-gray-500' : 'text-gray-400'}`}>Standard</span>
            </button>
            <button 
              onClick={() => setExhaust('sport')}
              className={`p-4 rounded text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border flex flex-col gap-1 items-start ${exhaust === 'sport' ? 'border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(196,30,58,0.1)]' : `border-transparent ${lightingMode === 'night' ? 'bg-black/30 hover:bg-white/5' : 'bg-white hover:bg-black/5'}`}`}
            >
              <span>Matte Sport</span>
              <span className="text-accent text-[8px]">+₹3,000</span>
            </button>
          </div>
        </div>

        {/* Seat Selection */}
        <div className={`p-5 rounded-xl border transition-colors ${lightingMode === 'night' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <div className="flex justify-between items-end mb-4">
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${lightingMode === 'night' ? 'text-gray-400' : 'text-gray-500'}`}>Seat Setup</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setSeat('dual')}
              className={`p-4 rounded text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border flex flex-col gap-1 items-start ${seat === 'dual' ? 'border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(196,30,58,0.1)]' : `border-transparent ${lightingMode === 'night' ? 'bg-black/30 hover:bg-white/5' : 'bg-white hover:bg-black/5'}`}`}
            >
              <span>Classic Dual</span>
              <span className={`text-[8px] ${lightingMode === 'night' ? 'text-gray-500' : 'text-gray-400'}`}>Standard</span>
            </button>
            <button 
              onClick={() => setSeat('bobber')}
              className={`p-4 rounded text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border flex flex-col gap-1 items-start ${seat === 'bobber' ? 'border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(196,30,58,0.1)]' : `border-transparent ${lightingMode === 'night' ? 'bg-black/30 hover:bg-white/5' : 'bg-white hover:bg-black/5'}`}`}
            >
              <span>Bobber Single</span>
              <span className="text-accent text-[8px]">+₹4,500</span>
            </button>
          </div>
        </div>

        {/* Mirrors Selection */}
        <div className={`p-5 rounded-xl border transition-colors ${lightingMode === 'night' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <div className="flex justify-between items-end mb-4">
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${lightingMode === 'night' ? 'text-gray-400' : 'text-gray-500'}`}>Mirrors</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setMirrors('standard')}
              className={`p-4 rounded text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border flex flex-col gap-1 items-start ${mirrors === 'standard' ? 'border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(196,30,58,0.1)]' : `border-transparent ${lightingMode === 'night' ? 'bg-black/30 hover:bg-white/5' : 'bg-white hover:bg-black/5'}`}`}
            >
              <span>Standard</span>
              <span className={`text-[8px] ${lightingMode === 'night' ? 'text-gray-500' : 'text-gray-400'}`}>Included</span>
            </button>
            <button 
              onClick={() => setMirrors('barend')}
              className={`p-4 rounded text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border flex flex-col gap-1 items-start ${mirrors === 'barend' ? 'border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(196,30,58,0.1)]' : `border-transparent ${lightingMode === 'night' ? 'bg-black/30 hover:bg-white/5' : 'bg-white hover:bg-black/5'}`}`}
            >
              <span>Bar-End</span>
              <span className="text-accent text-[8px]">+₹2,500</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleEnquire} className={`mt-auto pt-8 border-t ${lightingMode === 'night' ? 'border-white/10' : 'border-black/10'} flex flex-col gap-4`}>
          <AnimatePresence>
            {enquiryMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-3 overflow-hidden"
              >
                {status === 'error' && (
                  <div className="text-red-400 text-xs font-bold bg-red-900/30 border border-red-500/30 p-3 rounded">
                    {errorMessage}
                  </div>
                )}
                <div>
                  <input 
                    type="text" 
                    placeholder="Full Name *" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={status === 'loading'}
                    className={`w-full border rounded-lg p-3 focus:outline-none focus:border-accent transition-colors text-xs disabled:opacity-50 ${lightingMode === 'night' ? 'bg-black/50 border-white/10 text-white' : 'bg-white border-black/10 text-black'}`} 
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number *" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={status === 'loading'}
                    className={`w-full border rounded-lg p-3 focus:outline-none focus:border-accent transition-colors text-xs disabled:opacity-50 ${lightingMode === 'night' ? 'bg-black/50 border-white/10 text-white' : 'bg-white border-black/10 text-black'}`} 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Dynamic Pricing Breakdown */}
          <div className={`border rounded-lg p-5 flex flex-col gap-3 ${lightingMode === 'night' ? 'bg-black/60 border-white/5' : 'bg-gray-100 border-black/5'}`}>
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${lightingMode === 'night' ? 'text-gray-400' : 'text-gray-500'}`}>Base Ex-Showroom</span>
              <span className={`text-xs font-semibold ${lightingMode === 'night' ? 'text-gray-300' : 'text-gray-700'}`}>{formatCurrency(pricingData.basePrice)}</span>
            </div>
            {pricingData.accessoriesCost > 0 && (
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${lightingMode === 'night' ? 'text-gray-400' : 'text-gray-500'}`}>Accessories</span>
                <span className={`text-xs font-semibold ${lightingMode === 'night' ? 'text-gray-300' : 'text-gray-700'}`}>+{formatCurrency(pricingData.accessoriesCost)}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${lightingMode === 'night' ? 'text-gray-400' : 'text-gray-500'}`}>Est. RTO & Ins.</span>
              <span className={`text-xs font-semibold ${lightingMode === 'night' ? 'text-gray-300' : 'text-gray-700'}`}>+{formatCurrency(pricingData.rto + pricingData.insurance + pricingData.other)}</span>
            </div>
            <div className={`h-[1px] w-full my-1 ${lightingMode === 'night' ? 'bg-white/10' : 'bg-black/10'}`}></div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Est. On-Road</span>
              <span className={`text-2xl font-heading font-bold ${lightingMode === 'night' ? 'text-white' : 'text-black'}`}>{formatCurrency(pricingData.total)}*</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-accent hover:bg-accent-hover transition-colors rounded uppercase tracking-widest font-bold text-xs text-white flex justify-center items-center h-[50px] shadow-[0_0_20px_rgba(196,30,58,0.2)] mt-2"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : enquiryMode ? 'Submit Build To Dealer' : 'Save Build & Enquire'}
          </button>
        </form>

      </div>
    </div>
  );
}
