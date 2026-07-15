// cSpell:ignore framer lucide Aadhaar
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "What is the mileage of the Jawa 42?",
    answer: "The Jawa 42 delivers a mileage of approximately 33-37 km/l depending on riding conditions, fuel quality, and individual riding style."
  },
  {
    id: 2,
    question: "What is the warranty period?",
    answer: "Jawa Motorcycles come with a standard manufacturer warranty of 2 years or 24,000 km, whichever comes first, with optional extended packages available at authorized dealerships."
  },
  {
    id: 3,
    question: "Is ABS standard?",
    answer: "Yes, dual-channel ABS is standard across all premium variants of the Jawa 42 to ensure optimal braking performance and safety."
  },
  {
    id: 4,
    question: "How do I book a test ride?",
    answer: "You can book a test ride directly online by clicking 'Test Ride' in the navigation bar, selecting your city, and picking a dealership, or by visiting any authorized Jawa dealership in your area."
  },
  {
    id: 5,
    question: "What documents are required?",
    answer: "For booking or financing, you typically need proof of identity (PAN card, Aadhaar), proof of address (electricity bill, passport), passport size photos, and salary slips or bank statements for loan approvals."
  },
  {
    id: 6,
    question: "What is the service interval?",
    answer: "The first service is scheduled at 1,000 km (or 1 month). Subsequent general services are recommended every 6,000 km or 6 months, whichever comes first."
  },
  {
    id: 7,
    question: "What financing options are available?",
    answer: "We partner with leading financial institutions and banks to offer competitive interest rates, low down payment options starting at 10%, and flexible tenure periods ranging from 1 to 7 years."
  },
  {
    id: 8,
    question: "How is the on-road price calculated?",
    answer: "The on-road price consists of the base Ex-Showroom price, RTO registration charges, road tax, comprehensive insurance (1-year own damage + 5-year third party), and other local taxes or handling charges specific to your city."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#030303] py-24 border-t border-white/5 relative z-10" id="faq">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-accent font-heading font-semibold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-accent"></span> Support <span className="w-8 h-[1px] bg-accent"></span>
          </h2>
          <h3 className="text-5xl font-heading font-extrabold text-white uppercase tracking-widest mb-6">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Everything you need to know about ownership, performance, specs, and booking a test ride.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="glass-1 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFAQ(faq.id);
                    }
                  }}
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-white outline-none focus:bg-white/[0.02]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${faq.id}`}
                  id={`faq-header-${faq.id}`}
                >
                  <span className="font-heading font-bold text-sm tracking-wide md:text-base uppercase">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-accent shrink-0 ml-4"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-header-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-400 text-sm leading-relaxed border-t border-white/5 bg-black/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
