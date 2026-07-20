// cSpell:ignore Jawa, barend, hotspot, hotspots
'use client';

import { useState, useMemo, useId } from 'react';
import Image from 'next/image';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { useLocationStore } from '@/store/useLocationStore';
import { calculateOnRoadPrice } from '@/utils/pricing';
import { formatCurrency, motorcycleModels } from '@/data/models';
import {
  CONFIGURATOR_COLORS,
  COLOR_IMAGES,
  HOTSPOTS,
  ACCESSORY_COSTS,
} from '@/data/configurator';
import SearchableCitySelect from '@/components/SearchableCitySelect';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sun, Moon, X } from 'lucide-react';
import { isNonEmpty } from '@/lib/validation';

function OptionPair({ label, night, options, value, onChange }) {
  return (
    <div className={`p-5 rounded-2xl border transition-colors ${night ? 'bg-surface border-border' : 'bg-black/5 border-black/10'}`}>
      <h3 className={`text-[10px] font-heading font-bold uppercase tracking-[0.2em] mb-4 ${night ? 'text-text-sec' : 'text-gray-500'}`}>
        {label}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={selected}
              className={`p-4 rounded-xl text-[10px] font-heading font-black tracking-[0.2em] uppercase transition-all duration-300 border flex flex-col gap-1 items-start ${
                selected
                  ? 'border-accent bg-accent/5 text-accent shadow-[0_0_15px_rgba(181,18,27,0.1)]'
                  : `border-transparent bg-primary/20 ${night ? 'hover:bg-white/5' : 'hover:bg-black/5'}`
              }`}
            >
              <span>{opt.label}</span>
              <span className={`text-[8.5px] font-specs ${opt.premium ? 'text-accent' : night ? 'text-gray-500' : 'text-gray-400'}`}>
                {opt.hint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Configurator() {
  const { color, setColor, exhaust, setExhaust, wheels, setWheels, seat, setSeat, mirrors, setMirrors } =
    useConfiguratorStore();
  const { city, setCity } = useLocationStore();

  const quoteId = useId().replace(/:/g, '').slice(0, 6).toUpperCase();

  const [enquiryMode, setEnquiryMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lightingMode, setLightingMode] = useState('night');
  const [activeHotspot, setActiveHotspot] = useState(null);

  const night = lightingMode === 'night';

  const pricingData = useMemo(() => {
    const basePrice = motorcycleModels.find((m) => m.id === 'jawa-42')?.baseExShowroomPrice || 198142;
    const wheelsCost = ACCESSORY_COSTS.wheels[wheels] || 0;
    const exhaustCost = ACCESSORY_COSTS.exhaust[exhaust] || 0;
    const seatCost = ACCESSORY_COSTS.seat[seat] || 0;
    const mirrorsCost = ACCESSORY_COSTS.mirrors[mirrors] || 0;
    const colorCost = color === ACCESSORY_COSTS.defaultColor ? 0 : ACCESSORY_COSTS.colorPremium;
    const accessoriesCost = wheelsCost + exhaustCost + colorCost + seatCost + mirrorsCost;
    const configuredExShowroom = basePrice + accessoriesCost;
    const finalPricing = calculateOnRoadPrice(configuredExShowroom, city);

    return { basePrice, accessoriesCost, ...finalPricing };
  }, [wheels, exhaust, color, seat, mirrors, city]);

  const resetEnquiry = () => {
    setStatus('idle');
    setEnquiryMode(false);
    setFormData({ name: '', phone: '' });
  };

  const handleEnquire = async (e) => {
    e.preventDefault();
    if (!enquiryMode) {
      setEnquiryMode(true);
      return;
    }

    if (!isNonEmpty(formData.name) || !isNonEmpty(formData.phone)) {
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
            color: CONFIGURATOR_COLORS.find((c) => c.hex === color)?.name,
            wheels,
            exhaust,
            seat,
            mirrors,
            city,
            estimatedPrice: pricingData.total,
          },
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

  return (
    <div
      className={`relative w-full h-screen overflow-hidden pt-20 flex flex-col md:flex-row transition-colors duration-1000 ${
        night ? 'bg-primary' : 'bg-[#E5E5E5]'
      }`}
    >
      <div
        className={`flex-1 relative h-[50vh] md:h-full flex items-center justify-center p-8 transition-colors duration-1000 ${
          night ? 'bg-primary' : 'bg-gradient-to-b from-gray-100 to-gray-200'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={color}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl h-full flex items-center justify-center z-20"
          >
            <Image
              src={COLOR_IMAGES[color] || COLOR_IMAGES['#C41E3A']}
              alt="Configured Jawa 42"
              width={1280}
              height={720}
              className={`w-full max-h-full h-auto object-contain drop-shadow-2xl transition-all duration-1000 ${
                night
                  ? 'brightness-90 contrast-110'
                  : 'brightness-105 contrast-100 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]'
              }`}
              priority
            />

            {HOTSPOTS.map((spot) => (
              <div
                key={spot.id}
                className="absolute w-6 h-6 -ml-3 -mt-3 z-30"
                style={{ left: spot.x, top: spot.y }}
                onMouseEnter={() => setActiveHotspot(spot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                <button
                  type="button"
                  className="relative w-full h-full flex items-center justify-center cursor-pointer group"
                  aria-label={spot.label}
                  onFocus={() => setActiveHotspot(spot.id)}
                  onBlur={() => setActiveHotspot(null)}
                >
                  <span className="absolute w-full h-full bg-accent/40 rounded-full animate-ping" aria-hidden />
                  <span className="relative w-2.5 h-2.5 bg-accent rounded-full border border-white group-hover:scale-125 transition-all duration-300" />

                  <AnimatePresence>
                    {activeHotspot === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 3 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-surface border border-border rounded-xl p-3.5 text-center pointer-events-none shadow-xl"
                        role="tooltip"
                      >
                        <h4 className="text-white text-[10px] font-heading font-black uppercase tracking-widest mb-1">
                          {spot.label}
                        </h4>
                        <p className="text-text-sec text-[9px] font-body">{spot.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-8 left-8 flex flex-col gap-3 z-30">
          <div className="flex bg-surface border border-border rounded-full p-1 shadow-lg" role="group" aria-label="Studio lighting">
            <button
              type="button"
              onClick={() => setLightingMode('night')}
              className={`p-2 rounded-full transition-colors ${night ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
              aria-pressed={night}
              aria-label="Night studio"
            >
              <Moon size={15} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('day')}
              className={`p-2 rounded-full transition-colors ${!night ? 'bg-black/10 text-black' : 'text-gray-500 hover:text-black'}`}
              aria-pressed={!night}
              aria-label="Day studio"
            >
              <Sun size={15} aria-hidden />
            </button>
          </div>
        </div>

        <div className="absolute top-8 right-8 z-30 w-48 hidden md:block">
          <SearchableCitySelect value={city} onChange={setCity} label="City" />
        </div>
      </div>

      <div
        className={`w-full md:w-[500px] h-[50vh] md:h-full overflow-y-auto p-8 flex flex-col gap-8 z-40 relative custom-scrollbar transition-colors duration-1000 ${
          night ? 'bg-secondary text-white border-l border-border' : 'bg-white text-black border-l border-black/5 shadow-2xl'
        }`}
      >
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="absolute inset-0 z-50 bg-secondary flex flex-col p-8 print:bg-white print:text-black overflow-y-auto custom-scrollbar"
            >
              <div className="print:hidden flex justify-end mb-6 gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2 bg-surface hover:bg-white/5 border border-border rounded-xl text-text-sec hover:text-white transition-colors"
                  aria-label="Download quote"
                >
                  <Download size={16} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={resetEnquiry}
                  className="p-2 bg-surface hover:bg-white/5 border border-border rounded-xl text-text-sec hover:text-white transition-colors"
                  aria-label="Close build sheet"
                >
                  <X size={16} aria-hidden />
                </button>
              </div>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent/20 text-accent border border-accent/30 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 print:hidden" aria-hidden>
                  ✓
                </div>
                <h2 className="text-2xl font-heading font-extrabold uppercase text-white print:text-black mb-2">Build Saved</h2>
                <p className="text-text-sec text-[10px] font-specs tracking-wider print:text-gray-600">
                  REF: JW42-{quoteId}
                </p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
                <h3 className="text-xs font-heading font-extrabold uppercase tracking-widest text-accent mb-4 border-b border-border pb-3">
                  Vehicle Summary
                </h3>
                <dl className="space-y-3 mb-6 text-sm font-body font-light text-text-sec">
                  {[
                    ['Model', 'Jawa 42'],
                    ['Color', CONFIGURATOR_COLORS.find((c) => c.hex === color)?.name],
                    ['Wheels', wheels === 'alloy' ? 'Alloy' : 'Wire Spoke'],
                    ['Exhaust', exhaust === 'sport' ? 'Matte Sport' : 'Classic Chrome'],
                    ['Seat', seat === 'bobber' ? 'Bobber Single' : 'Classic Dual'],
                    ['Mirrors', mirrors === 'barend' ? 'Bar-End' : 'Standard'],
                  ].map(([term, detail]) => (
                    <div key={term} className="flex justify-between items-center">
                      <dt>{term}</dt>
                      <dd className="font-bold text-white print:text-black">{detail}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className="text-xs font-heading font-extrabold uppercase tracking-widest text-accent mb-4 border-b border-border pb-3">
                  Financial Summary ({city})
                </h3>
                <dl className="space-y-3 mb-4 text-xs font-specs font-bold text-text-sec">
                  <div className="flex justify-between"><dt>Base Price</dt><dd className="text-white print:text-black">{formatCurrency(pricingData.basePrice)}</dd></div>
                  <div className="flex justify-between"><dt>Accessories</dt><dd className="text-white print:text-black">+{formatCurrency(pricingData.accessoriesCost)}</dd></div>
                  <div className="flex justify-between"><dt>RTO (Est.)</dt><dd className="text-white print:text-black">+{formatCurrency(pricingData.rto)}</dd></div>
                  <div className="flex justify-between"><dt>Insurance (Est.)</dt><dd className="text-white print:text-black">+{formatCurrency(pricingData.insurance)}</dd></div>
                </dl>

                <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
                  <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-white print:text-black">
                    Total On-Road
                  </span>
                  <span className="text-xl font-specs font-extrabold text-accent">{formatCurrency(pricingData.total)}</span>
                </div>
              </div>

              <p className="text-center text-[10px] text-text-sec uppercase tracking-widest mb-8 print:hidden">
                Our dealership team in {city} will contact you shortly.
              </p>

              <button
                type="button"
                onClick={resetEnquiry}
                className="print:hidden w-full py-4 border border-border hover:bg-white/5 transition-colors rounded-xl uppercase tracking-widest font-heading font-black text-[10px] text-white"
              >
                Start New Build
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <h1 className="text-3xl font-heading font-black uppercase mb-2">Build Your Legend</h1>
          <p className={`text-xs ${night ? 'text-text-sec' : 'text-gray-600'}`}>Customize every detail to make it yours.</p>
        </div>

        <div className="md:hidden">
          <SearchableCitySelect value={city} onChange={setCity} label="Your City" />
        </div>

        <div className={`p-5 rounded-2xl border transition-colors ${night ? 'bg-surface border-border' : 'bg-black/5 border-black/10'}`}>
          <div className="flex justify-between items-end mb-4">
            <h3 className={`text-[10px] font-heading font-bold uppercase tracking-[0.2em] ${night ? 'text-text-sec' : 'text-gray-500'}`}>
              Fuel Tank Color
            </h3>
            <span className="text-[10px] font-specs font-bold uppercase tracking-[0.1em]">
              {CONFIGURATOR_COLORS.find((c) => c.hex === color)?.name}
            </span>
          </div>
          <div className="flex gap-4" role="group" aria-label="Paint color">
            {CONFIGURATOR_COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.hex)}
                aria-label={c.name}
                aria-pressed={color === c.hex}
                className={`w-10 h-10 rounded-full transition-all duration-300 relative shadow-lg ${
                  color === c.hex ? 'scale-110 z-10' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {color === c.hex && <span className="absolute -inset-[3px] border border-accent rounded-full" aria-hidden />}
              </button>
            ))}
          </div>
        </div>

        <OptionPair
          label="Wheels"
          night={night}
          value={wheels}
          onChange={setWheels}
          options={[
            { id: 'spoke', label: 'Wire Spoke', hint: 'Standard' },
            { id: 'alloy', label: 'Alloy', hint: '+₹6,000', premium: true },
          ]}
        />
        <OptionPair
          label="Exhaust System"
          night={night}
          value={exhaust}
          onChange={setExhaust}
          options={[
            { id: 'standard', label: 'Chrome Dual', hint: 'Standard' },
            { id: 'sport', label: 'Matte Sport', hint: '+₹3,000', premium: true },
          ]}
        />
        <OptionPair
          label="Seat Setup"
          night={night}
          value={seat}
          onChange={setSeat}
          options={[
            { id: 'dual', label: 'Classic Dual', hint: 'Standard' },
            { id: 'bobber', label: 'Bobber Single', hint: '+₹4,500', premium: true },
          ]}
        />
        <OptionPair
          label="Mirrors"
          night={night}
          value={mirrors}
          onChange={setMirrors}
          options={[
            { id: 'standard', label: 'Standard', hint: 'Included' },
            { id: 'barend', label: 'Bar-End', hint: '+₹2,500', premium: true },
          ]}
        />

        <form
          onSubmit={handleEnquire}
          className={`mt-auto pt-8 border-t ${night ? 'border-border' : 'border-black/10'} flex flex-col gap-4`}
        >
          <AnimatePresence>
            {enquiryMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-3 overflow-hidden"
              >
                {status === 'error' && (
                  <div className="text-red-400 text-xs font-bold bg-red-900/30 border border-red-500/30 p-3 rounded" role="alert">
                    {errorMessage}
                  </div>
                )}
                <div>
                  <label htmlFor="config-name" className="sr-only">Full name</label>
                  <input
                    id="config-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === 'loading'}
                    className={`w-full border rounded-xl p-3.5 focus:outline-none focus:border-accent transition-colors text-xs disabled:opacity-50 ${
                      night ? 'bg-primary border-border text-white' : 'bg-white border-black/10 text-black'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="config-phone" className="sr-only">Phone number</label>
                  <input
                    id="config-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={status === 'loading'}
                    className={`w-full border rounded-xl p-3.5 focus:outline-none focus:border-accent transition-colors text-xs disabled:opacity-50 ${
                      night ? 'bg-primary border-border text-white' : 'bg-white border-black/10 text-black'
                    }`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={`border rounded-2xl p-5 flex flex-col gap-3 ${night ? 'bg-primary border-border' : 'bg-gray-50 border-black/5'}`}>
            <div className="flex justify-between items-center text-[10px] font-specs font-bold text-text-sec">
              <span>Base Ex-Showroom</span>
              <span>{formatCurrency(pricingData.basePrice)}</span>
            </div>
            {pricingData.accessoriesCost > 0 && (
              <div className="flex justify-between items-center text-[10px] font-specs font-bold text-text-sec">
                <span>Accessories</span>
                <span>+{formatCurrency(pricingData.accessoriesCost)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-[10px] font-specs font-bold text-text-sec">
              <span>Est. RTO & Ins.</span>
              <span>+{formatCurrency(pricingData.rto + pricingData.insurance + pricingData.other)}</span>
            </div>
            <div className="h-px w-full my-1 bg-border" />
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-heading font-black text-accent uppercase tracking-widest">Est. On-Road</span>
              <span className={`text-2xl font-specs font-extrabold ${night ? 'text-white' : 'text-black'}`}>
                {formatCurrency(pricingData.total)}*
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-accent hover:bg-accent-hover transition-colors rounded-xl uppercase tracking-widest font-heading font-black text-[10px] text-white flex justify-center items-center h-[50px] shadow-[0_5px_15px_rgba(181,18,27,0.2)] mt-2"
          >
            {status === 'loading' ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" aria-label="Submitting" />
            ) : enquiryMode ? (
              'Submit Build To Dealer'
            ) : (
              'Save Build & Enquire'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
