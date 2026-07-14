'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocationStore } from '@/store/useLocationStore';
import { dealers } from '@/data/dealers';
import { motorcycleModels } from '@/data/models';
import SearchableCitySelect from '@/components/SearchableCitySelect';
import { MapPin, Calendar, User, Phone, Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const steps = [
  { id: 1, title: 'Location' },
  { id: 2, title: 'Model & Date' },
  { id: 3, title: 'Details' }
];

export default function BookTestRide() {
  const { city, setCity } = useLocationStore();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [selectedDealerId, setSelectedDealerId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('jawa-42');
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  // Filtered Dealers
  const [filteredDealers, setFilteredDealers] = useState([]);
  useEffect(() => {
    if (city) {
      const dealersInCity = dealers.filter(d => d.city.toLowerCase() === city.toLowerCase());
      setFilteredDealers(dealersInCity);
      // Reset dealer selection if city changes and old dealer is not in new city
      if (!dealersInCity.find(d => d.id === selectedDealerId)) {
        setSelectedDealerId('');
      }
    } else {
      setFilteredDealers([]);
      setSelectedDealerId('');
    }
  }, [city, selectedDealerId]);

  const handleNext = () => {
    setErrorMessage('');
    if (step === 1 && (!city || !selectedDealerId)) {
      setErrorMessage('Please select a city and a dealership.');
      return;
    }
    if (step === 2 && (!selectedModelId || !selectedDate)) {
      setErrorMessage('Please select a motorcycle and a preferred date.');
      return;
    }
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setErrorMessage('');
    setStep(s => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address (e.g. yourname@gmail.com).');
      return;
    }

    const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const selectedDealer = dealers.find(d => d.id === selectedDealerId);
      const selectedModel = motorcycleModels.find(m => m.id === selectedModelId);

      const payload = {
        ...formData,
        city,
        dealer: selectedDealer?.name,
        model: selectedModel?.name,
        date: selectedDate,
        source: 'Book Test Ride Multi-Step'
      };

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request.');
      }

      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again later.');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Select Your City *</label>
              <SearchableCitySelect value={city} onChange={setCity} />
            </div>

            {city && (
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-4 mt-8">Select Dealership *</label>
                {filteredDealers.length > 0 ? (
                  <div className="grid gap-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {filteredDealers.map(dealer => (
                      <div 
                        key={dealer.id}
                        onClick={() => setSelectedDealerId(dealer.id)}
                        className={`p-4 border rounded cursor-pointer transition-colors ${selectedDealerId === dealer.id ? 'border-accent bg-accent/10' : 'border-white/10 bg-black/50 hover:border-white/30'}`}
                      >
                        <h4 className={`font-bold mb-1 ${selectedDealerId === dealer.id ? 'text-accent' : 'text-white'}`}>{dealer.name}</h4>
                        <p className="text-xs text-gray-400 mb-2">{dealer.address}</p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {dealer.city}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 border border-dashed border-white/20 rounded text-center text-gray-500 text-sm">
                    No dealerships found in {city}.
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-4">Select Motorcycle *</label>
              <div className="grid grid-cols-2 gap-4">
                {motorcycleModels.map(model => (
                  <div 
                    key={model.id}
                    onClick={() => setSelectedModelId(model.id)}
                    className={`p-3 border rounded cursor-pointer transition-all ${selectedModelId === model.id ? 'border-accent bg-accent/5' : 'border-white/10 bg-black/50 hover:border-white/30'} flex flex-col items-center text-center`}
                  >
                    <div className="relative w-full h-16 mb-2">
                      <Image src={model.image} alt={model.name} fill className="object-contain" />
                    </div>
                    <span className={`text-xs font-bold uppercase ${selectedModelId === model.id ? 'text-accent' : 'text-gray-300'}`}>{model.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Preferred Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <input 
                  type="date" 
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 pl-10 text-white focus:outline-none focus:border-accent transition-colors [color-scheme:dark]"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        const sDealer = dealers.find(d => d.id === selectedDealerId);
        const sModel = motorcycleModels.find(m => m.id === selectedModelId);
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Summary Box */}
            <div className="bg-white/5 border border-white/10 rounded p-4 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b border-white/10 pb-2">Booking Summary</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p className="flex justify-between"><span>Motorcycle:</span> <span className="font-bold text-white">{sModel?.name}</span></p>
                <p className="flex justify-between"><span>Dealership:</span> <span className="font-bold text-white text-right ml-4">{sDealer?.name}</span></p>
                <p className="flex justify-between"><span>Date:</span> <span className="font-bold text-white">{selectedDate}</span></p>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 pl-10 text-white focus:outline-none focus:border-accent transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email Address (Gmail) *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 pl-10 text-white focus:outline-none focus:border-accent transition-colors" 
                  placeholder="yourname@gmail.com" 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Mobile Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 pl-10 text-white focus:outline-none focus:border-accent transition-colors" 
                  placeholder="+91 98765 43210" 
                />
              </div>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen container mx-auto px-6 flex flex-col items-center">
      
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold uppercase tracking-widest mb-4">
          Book a <span className="text-accent">Test Ride</span>
        </h1>
        <p className="text-gray-400">
          Feel the refined power of the Panther engine. Book your slot in three easy steps.
        </p>
      </div>

      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-2 p-10 rounded-2xl border border-accent flex flex-col items-center text-center gap-6 shadow-[0_0_50px_rgba(196,30,58,0.2)]"
            >
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white mb-2">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-heading font-bold uppercase tracking-widest text-white">Ride Confirmed!</h2>
              <div className="text-gray-400 text-sm leading-relaxed max-w-md space-y-4">
                <p>Thank you, <span className="text-white font-bold">{formData.name}</span>. Your test ride for the <span className="text-white font-bold">{motorcycleModels.find(m => m.id === selectedModelId)?.name}</span> has been scheduled.</p>
                
                <div className="bg-black/30 border border-white/10 p-4 rounded text-left mt-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Dealership Contact</p>
                  <p className="text-white font-bold">{dealers.find(d => d.id === selectedDealerId)?.name}</p>
                  <p className="text-xs mt-1">{dealers.find(d => d.id === selectedDealerId)?.address}</p>
                  <p className="text-xs text-accent mt-2 font-bold">{dealers.find(d => d.id === selectedDealerId)?.phone}</p>
                </div>
                
                <p>A Jawa representative will contact you shortly to confirm the exact timing for {selectedDate}.</p>
              </div>
              <button 
                onClick={() => {
                  setStatus('idle');
                  setStep(1);
                  setFormData({ name: '', phone: '', email: '' });
                }}
                className="mt-6 border border-white/20 hover:bg-white/10 px-8 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Book Another
              </button>
            </motion.div>
          ) : (
            <div className="glass p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Progress Bar */}
              <div className="flex justify-between items-center mb-8 relative">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -z-10 -translate-y-1/2"></div>
                {steps.map(s => (
                  <div key={s.id} className="flex flex-col items-center gap-2 bg-[#0a0a0a] px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s.id ? 'bg-accent text-white shadow-[0_0_15px_rgba(196,30,58,0.5)]' : 'bg-white/10 text-gray-500'}`}>
                      {s.id}
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= s.id ? 'text-white' : 'text-gray-500'}`}>{s.title}</span>
                  </div>
                ))}
              </div>

              {errorMessage && (
                <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-3 rounded text-xs mb-6 text-center">
                  {errorMessage}
                </div>
              )}

              {/* Step Content */}
              <div className="min-h-[350px]">
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                {step > 1 && (
                  <button 
                    onClick={handleBack}
                    disabled={status === 'loading'}
                    className="flex-1 py-3 border border-white/20 hover:bg-white/5 transition-colors rounded uppercase tracking-widest font-bold text-xs disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                )}
                
                {step < 3 ? (
                  <button 
                    onClick={handleNext}
                    className="flex-[2] py-3 bg-accent hover:bg-accent-hover transition-colors rounded uppercase tracking-widest font-bold text-xs flex justify-center items-center gap-2"
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="flex-[2] py-3 bg-accent hover:bg-accent-hover transition-colors rounded uppercase tracking-widest font-bold text-xs disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {status === 'loading' ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
