// cSpell:ignore framer, lucide
'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { motorcycleModels, formatCurrency } from '@/data/models';
import { RefreshCw } from 'lucide-react';

export default function EMICalculator() {
  const [selectedModelId, setSelectedModelId] = useState(motorcycleModels[0]?.id || '');
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [exShowroomPrice, setExShowroomPrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(3); // in years

  // Get active model and its variants — memoised so array reference stays stable
  const activeModel = useMemo(
    () => motorcycleModels.find((m) => m.id === selectedModelId),
    [selectedModelId],
  );
  const variants = useMemo(() => activeModel?.variants || [], [activeModel]);

  // Update variant list and prices when model changes
  useEffect(() => {
    if (activeModel) {
      if (variants.length > 0) {
        const popular = variants.find((v) => v.isPopular) || variants[0];
        setSelectedVariantId(popular.id);
        setExShowroomPrice(popular.price);
        setDownPayment(Math.round(popular.price * 0.2));
      } else {
        setSelectedVariantId('');
        setExShowroomPrice(activeModel.baseExShowroomPrice);
        setDownPayment(Math.round(activeModel.baseExShowroomPrice * 0.2));
      }
    }
  }, [selectedModelId, activeModel, variants]);

  // Update price when variant changes
  const handleVariantChange = (variantId) => {
    setSelectedVariantId(variantId);
    const variant = variants.find((v) => v.id === variantId);
    if (variant) {
      setExShowroomPrice(variant.price);
      setDownPayment(Math.round(variant.price * 0.2));
    }
  };

  // Safe down payment handler
  const handleDownPaymentChange = (value) => {
    const num = Math.min(Math.max(0, Number(value)), exShowroomPrice);
    setDownPayment(num);
  };

  // Safe manual input changes
  const handleInterestChange = (value) => {
    const num = Math.min(Math.max(5, Number(value)), 20);
    setInterestRate(num);
  };

  const handleTenureChange = (value) => {
    const num = Math.min(Math.max(1, Number(value)), 7);
    setTenure(num);
  };

  // Reset function
  const handleReset = () => {
    if (activeModel) {
      const defaultPrice = variants.length > 0 
        ? (variants.find(v => v.isPopular) || variants[0]).price 
        : activeModel.baseExShowroomPrice;
      
      setExShowroomPrice(defaultPrice);
      setDownPayment(Math.round(defaultPrice * 0.2));
      setInterestRate(9.5);
      setTenure(3);
    }
  };

  // Calculate EMI
  const loanAmount = Math.max(0, exShowroomPrice - downPayment);
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = tenure * 12;

  let monthlyEMI = 0;
  if (loanAmount > 0) {
    if (monthlyRate === 0) {
      monthlyEMI = loanAmount / totalMonths;
    } else {
      monthlyEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
  }

  const emi = Math.round(monthlyEMI);
  const totalPayable = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayable - loanAmount);

  return (
    <section className="bg-primary py-24 border-t border-white/5 relative z-10" id="emi-calculator">
      <div className="container mx-auto px-6 max-w-[1200px]">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-accent font-heading font-semibold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-accent"></span> Finance Assistant <span className="w-8 h-[1px] bg-accent"></span>
          </h2>
          <h3 className="text-5xl font-heading font-extrabold text-white uppercase tracking-widest mb-6">
            EMI Calculator
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Plan your purchase with real-time interest and down payment options. Customize your finance options for your dream Jawa.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 glass-2 p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Model & Variant Selector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Motorcycle Model</label>
                  <select 
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white font-heading text-sm outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    {motorcycleModels.map(m => (
                      <option key={m.id} value={m.id} className="bg-secondary text-white">{m.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Variant</label>
                  {variants.length > 0 ? (
                    <select 
                      value={selectedVariantId}
                      onChange={(e) => handleVariantChange(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white font-heading text-sm outline-none focus:border-accent transition-colors cursor-pointer"
                    >
                      {variants.map(v => (
                        <option key={v.id} value={v.id} className="bg-secondary text-white">{v.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3.5 text-gray-500 font-heading text-sm">
                      Standard Edition
                    </div>
                  )}
                </div>
              </div>

              {/* Ex-Showroom Price Display */}
              <div className="bg-black/30 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Ex-Showroom Price</span>
                <span className="text-xl font-heading font-extrabold text-white">{formatCurrency(exShowroomPrice)}</span>
              </div>

              {/* Down Payment Slider & Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Down Payment</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 text-xs font-semibold">₹</span>
                    <input 
                      type="number"
                      value={downPayment}
                      onChange={(e) => handleDownPaymentChange(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-lg pl-6 pr-3 py-1.5 text-white text-right font-heading text-sm outline-none focus:border-accent w-36 transition-colors"
                    />
                  </div>
                </div>
                <input 
                  type="range"
                  min="0"
                  max={exShowroomPrice}
                  step="1000"
                  value={downPayment}
                  onChange={(e) => handleDownPaymentChange(e.target.value)}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[9px] text-gray-600 font-semibold uppercase tracking-wider">
                  <span>₹0</span>
                  <span>Max: {formatCurrency(exShowroomPrice)}</span>
                </div>
              </div>

              {/* Interest Rate Slider & Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Interest Rate (P.A.)</label>
                  <div className="relative flex items-center">
                    <input 
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => handleInterestChange(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-white text-right font-heading text-sm outline-none focus:border-accent w-24 transition-colors"
                    />
                    <span className="ml-2 text-gray-400 text-xs">%</span>
                  </div>
                </div>
                <input 
                  type="range"
                  min="5"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => handleInterestChange(e.target.value)}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[9px] text-gray-600 font-semibold uppercase tracking-wider">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure Slider & Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Loan Tenure</label>
                  <div className="relative flex items-center">
                    <input 
                      type="number"
                      min="1"
                      max="7"
                      value={tenure}
                      onChange={(e) => handleTenureChange(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-white text-right font-heading text-sm outline-none focus:border-accent w-24 transition-colors"
                    />
                    <span className="ml-2 text-gray-400 text-xs">Yrs</span>
                  </div>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={tenure}
                  onChange={(e) => handleTenureChange(e.target.value)}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[9px] text-gray-600 font-semibold uppercase tracking-wider">
                  <span>1 Year</span>
                  <span>7 Years</span>
                </div>
              </div>

            </div>

            {/* Reset Button */}
            <button 
              onClick={handleReset}
              className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300 font-bold ml-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Parameters
            </button>

          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-3 p-8 rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 via-black/40 to-black/40 flex-grow flex flex-col justify-between relative overflow-hidden shadow-2xl">
              
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <h4 className="text-[10px] font-heading font-semibold text-accent uppercase tracking-[0.25em] mb-8">Calculation Output</h4>
                
                {/* Monthly EMI Output */}
                <div className="mb-8 border-b border-white/5 pb-8">
                  <span className="text-[11px] text-gray-400 uppercase tracking-widest block mb-2">Monthly EMI</span>
                  <div className="flex items-baseline">
                    <span className="text-4xl md:text-5xl font-heading font-extrabold text-white">{formatCurrency(emi)}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest ml-2 font-medium">/ Month</span>
                  </div>
                </div>

                {/* Sub Details Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Principal Loan Amount</span>
                    <span className="text-lg font-heading font-bold text-white">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Total Interest</span>
                    <span className="text-lg font-heading font-bold text-white">{formatCurrency(totalInterest)}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-12 space-y-4">
                <div className="flex justify-between items-center pt-6 border-t border-white/10 mb-4">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">Total Amount Payable</span>
                  <span className="text-xl font-heading font-bold text-white">{formatCurrency(totalPayable)}</span>
                </div>
                
                <button className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-full font-heading font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(196,30,58,0.3)]">
                  Check EMI Eligibility
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
