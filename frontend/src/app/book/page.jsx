'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocationStore } from '@/store/useLocationStore';
import { dealers } from '@/data/dealers';
import { motorcycleModels } from '@/data/models';
import SearchableCitySelect from '@/components/SearchableCitySelect';
import { MapPin, Calendar, User, Phone, Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { isValidEmail, isValidPhone, isNonEmpty } from '@/lib/validation';
import { slideStep } from '@/lib/motion';

const STEPS = [
  { id: 1, title: 'Location' },
  { id: 2, title: 'Model & Date' },
  { id: 3, title: 'Details' },
];

export default function BookTestRide() {
  const { city, setCity } = useLocationStore();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDealerId, setSelectedDealerId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('jawa-42');
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const filteredDealers = useMemo(() => {
    if (!city) return [];
    return dealers.filter((d) => d.city.toLowerCase() === city.toLowerCase());
  }, [city]);

  useEffect(() => {
    if (!filteredDealers.find((d) => d.id === selectedDealerId)) {
      setSelectedDealerId('');
    }
  }, [filteredDealers, selectedDealerId]);

  const selectedDealer = dealers.find((d) => d.id === selectedDealerId);
  const selectedModel = motorcycleModels.find((m) => m.id === selectedModelId);
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

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
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrorMessage('');
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isNonEmpty(formData.name) || !isNonEmpty(formData.phone) || !isNonEmpty(formData.email)) {
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!isValidPhone(formData.phone)) {
      setErrorMessage('Please enter a valid phone number.');
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
          city,
          dealer: selectedDealer?.name,
          model: selectedModel?.name,
          date: selectedDate,
          source: 'Book Test Ride Multi-Step',
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit request.');
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
          <motion.div key="step1" {...slideStep} className="space-y-6">
            <SearchableCitySelect
              id="book-city"
              label="Select your city *"
              value={city}
              onChange={setCity}
            />

            {city && (
              <fieldset>
                <legend className="block text-[10px] font-specs font-bold uppercase tracking-widest text-text-sec mb-4 mt-8">
                  Select dealership *
                </legend>
                {filteredDealers.length > 0 ? (
                  <div className="grid gap-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2" role="radiogroup" aria-label="Dealerships">
                    {filteredDealers.map((dealer) => {
                      const selected = selectedDealerId === dealer.id;
                      return (
                        <button
                          key={dealer.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setSelectedDealerId(dealer.id)}
                          className={`p-5 border rounded-2xl text-left transition-colors ${
                            selected
                              ? 'border-accent bg-accent/5'
                              : 'border-border bg-surface hover:border-text-sec/40'
                          }`}
                        >
                          <h3 className={`font-heading font-bold text-sm mb-2 ${selected ? 'text-accent' : 'text-white'}`}>
                            {dealer.name}
                          </h3>
                          <p className="text-xs text-text-sec leading-relaxed mb-3">{dealer.address}</p>
                          <span className="flex items-center gap-1.5 font-specs font-bold text-xs text-text-sec">
                            <MapPin className="w-3.5 h-3.5 text-accent" aria-hidden /> {dealer.city}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 border border-dashed border-border rounded-2xl text-center text-text-sec text-sm font-light">
                    No dealerships found in {city}.
                  </div>
                )}
              </fieldset>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div key="step2" {...slideStep} className="space-y-6">
            <fieldset>
              <legend className="block text-[10px] font-specs font-bold uppercase tracking-widest text-text-sec mb-4">
                Select motorcycle *
              </legend>
              <div className="grid grid-cols-2 gap-4" role="radiogroup" aria-label="Motorcycle models">
                {motorcycleModels.map((model) => {
                  const selected = selectedModelId === model.id;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSelectedModelId(model.id)}
                      className={`p-4 border rounded-2xl transition-all flex flex-col items-center text-center ${
                        selected
                          ? 'border-accent bg-accent/5'
                          : 'border-border bg-surface hover:border-text-sec/40'
                      }`}
                    >
                      <div className="relative w-full h-16 mb-3">
                        <Image src={model.image} alt="" fill className="object-contain" />
                      </div>
                      <span
                        className={`text-[10px] font-heading font-extrabold uppercase tracking-wider ${
                          selected ? 'text-accent' : 'text-white'
                        }`}
                      >
                        {model.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="pt-4">
              <label htmlFor="book-date" className="block text-[10px] font-specs font-bold uppercase tracking-widest text-text-sec mb-3">
                Preferred date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" aria-hidden />
                <input
                  id="book-date"
                  type="date"
                  value={selectedDate}
                  min={today}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl p-4 pl-12 text-white focus:outline-none focus:border-accent transition-colors [color-scheme:dark] text-sm"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div key="step3" {...slideStep} className="space-y-6">
            <div className="bg-surface border border-border rounded-2xl p-5 mb-8">
              <h3 className="text-[10px] font-specs font-extrabold uppercase tracking-widest text-text-sec mb-4 border-b border-border pb-3">
                Booking Summary
              </h3>
              <dl className="space-y-3 text-sm font-body font-light text-text-sec">
                <div className="flex justify-between">
                  <dt>Motorcycle</dt>
                  <dd className="font-heading font-bold text-white uppercase">{selectedModel?.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Dealership</dt>
                  <dd className="font-heading font-bold text-white text-right ml-4">{selectedDealer?.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Date</dt>
                  <dd className="font-specs font-bold text-white">{selectedDate}</dd>
                </div>
              </dl>
            </div>

            {[
              { id: 'book-name', name: 'name', label: 'Full name *', type: 'text', Icon: User, placeholder: 'John Doe', autoComplete: 'name' },
              { id: 'book-email', name: 'email', label: 'Email address *', type: 'email', Icon: Mail, placeholder: 'yourname@gmail.com', autoComplete: 'email' },
              { id: 'book-phone', name: 'phone', label: 'Mobile number *', type: 'tel', Icon: Phone, placeholder: '+91 98765 43210', autoComplete: 'tel' },
            ].map(({ id, name, label, type, Icon, placeholder, autoComplete }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-[10px] font-specs font-bold uppercase tracking-widest text-text-sec mb-3">
                  {label}
                </label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden />
                  <input
                    id={id}
                    type={type}
                    name={name}
                    autoComplete={autoComplete}
                    value={formData[name]}
                    onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                    className="w-full bg-surface border border-border rounded-xl p-4 pl-12 text-white focus:outline-none focus:border-accent transition-colors text-sm"
                    placeholder={placeholder}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-40 pb-32 min-h-screen bg-primary flex flex-col items-center">
      <div className="text-center mb-16 max-w-2xl mx-auto px-6">
        <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase block mb-4">Reserve</span>
        <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-white mb-4">
          Book a Test Ride
        </h1>
        <p className="text-sm md:text-base text-text-sec font-body font-light max-w-md mx-auto leading-relaxed">
          Feel the refined power of the Panther engine. Book your slot in three easy steps.
        </p>
      </div>

      <div className="w-full max-w-xl px-6">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface p-10 rounded-3xl border border-accent/20 flex flex-col items-center text-center gap-6 shadow-[0_10px_40px_rgba(181,18,27,0.1)]"
              role="status"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white mb-2" aria-hidden>
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-heading font-extrabold uppercase text-white">Ride Confirmed!</h2>
              <div className="text-text-sec font-body font-light text-sm leading-relaxed max-w-md space-y-4">
                <p>
                  Thank you, <span className="text-white font-bold">{formData.name}</span>. Your test ride for the{' '}
                  <span className="text-white font-bold">{selectedModel?.name}</span> has been scheduled.
                </p>
                <div className="bg-primary border border-border p-5 rounded-2xl text-left mt-4">
                  <p className="text-[9px] font-specs font-bold uppercase tracking-widest text-text-sec mb-2">
                    Dealership Contact
                  </p>
                  <p className="text-white font-heading font-bold text-sm">{selectedDealer?.name}</p>
                  <p className="text-xs text-text-sec leading-relaxed mt-1">{selectedDealer?.address}</p>
                  <p className="text-xs text-accent font-specs font-bold mt-3">{selectedDealer?.phone}</p>
                </div>
                <p>A Jawa representative will contact you shortly to confirm the exact timing for {selectedDate}.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setStep(1);
                  setFormData({ name: '', phone: '', email: '' });
                }}
                className="mt-6 bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-xl text-xs font-heading font-black uppercase tracking-[0.2em] transition-colors"
              >
                Book Another
              </button>
            </motion.div>
          ) : (
            <div className="bg-surface p-8 rounded-3xl border border-border shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-10 relative" aria-label={`Step ${step} of ${STEPS.length}`}>
                <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-border -z-10 -translate-y-1/2" aria-hidden />
                {STEPS.map((s) => (
                  <div key={s.id} className="flex flex-col items-center gap-2 bg-surface px-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-specs font-bold transition-all ${
                        step >= s.id
                          ? 'bg-accent text-white shadow-[0_0_15px_rgba(181,18,27,0.3)]'
                          : 'bg-primary border border-border text-gray-500'
                      }`}
                      aria-current={step === s.id ? 'step' : undefined}
                    >
                      {s.id}
                    </div>
                    <span className={`text-[9px] font-specs font-bold uppercase tracking-widest ${step >= s.id ? 'text-white' : 'text-gray-500'}`}>
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {errorMessage && (
                <div className="bg-accent/10 border border-accent/20 text-red-200 p-4 rounded-xl text-xs mb-6 text-center font-body font-medium" role="alert">
                  {errorMessage}
                </div>
              )}

              <div className="min-h-[350px]">
                <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={status === 'loading'}
                    className="flex-1 py-4 border border-border hover:bg-white/5 transition-colors rounded-xl uppercase tracking-widest font-heading font-black text-[10px] disabled:opacity-50 flex justify-center items-center gap-2 text-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden /> Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-[2] py-4 bg-accent hover:bg-accent-hover text-white transition-colors rounded-xl uppercase tracking-widest font-heading font-black text-[10px] flex justify-center items-center gap-2 shadow-[0_5px_15px_rgba(181,18,27,0.2)]"
                  >
                    Next Step <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="flex-[2] py-4 bg-accent hover:bg-accent-hover text-white transition-colors rounded-xl uppercase tracking-widest font-heading font-black text-[10px] disabled:opacity-70 flex justify-center items-center gap-2 shadow-[0_5px_15px_rgba(181,18,27,0.2)]"
                  >
                    {status === 'loading' ? (
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" aria-label="Submitting" />
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
