// cSpell:ignore framer, lucide
'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Rohit Sharma",
    model: "Jawa 42",
    rating: 5,
    text: "The Jawa 42 delivers a perfect mix of classic styling and modern performance. Every ride feels special.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 2,
    name: "Ananya Patel",
    model: "Jawa 42 Bobber",
    rating: 5,
    text: "Excellent comfort, refined engine, and impressive road presence. Highly recommended.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    model: "Jawa Perak",
    rating: 5,
    text: "The Perak's stealthy bobber look gets so many eyeballs. Torque delivery is immediate and exciting.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 4,
    name: "Meera Nair",
    model: "Jawa 350",
    rating: 5,
    text: "Timeless styling that pays true homage to the original. The thrum of the engine is pure nostalgia.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 5,
    name: "Aditya Roy",
    model: "Yezdi Roadster",
    rating: 5,
    text: "Perfect commuter and weekend tourer. Cruising at 100 km/h is effortless and vibration-free.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 6,
    name: "Pooja Hegde",
    model: "Yezdi Scrambler",
    rating: 5,
    text: "Absolute beast off the road. The high ground clearance and aggressive tyres handle any trail.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 7,
    name: "Kabir Mehta",
    model: "Yezdi Adventure",
    rating: 5,
    text: "Took it to Spiti Valley and back. Did not miss a single beat. An outstanding adventure machine.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120"
  }
];

export default function CustomerReviews() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollToValue = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({
        left: scrollToValue,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-[#030303] py-24 border-t border-white/5 relative z-10" id="reviews">
      <div className="container mx-auto px-6">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-accent font-heading font-semibold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent"></span> Testimonials <span className="w-8 h-[1px] bg-accent"></span>
            </h2>
            <h3 className="text-5xl font-heading font-extrabold text-white uppercase tracking-widest mb-6">
              Rider Stories
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Hear from the members of the Jawa Tribe. Read about their tours, highway cruising, and daily experiences with the legend.
            </p>
          </div>
          
          {/* Navigation Arrows for Desktop */}
          <div className="hidden md:flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all bg-white/[0.02]"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all bg-white/[0.02]"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review) => (
              <div 
                key={review.id}
                className="w-[85vw] sm:w-[50vw] lg:w-[30vw] min-w-[280px] sm:min-w-[340px] snap-start shrink-0"
              >
                <div className="glass-1 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden group">
                  
                  {/* Decorative background quote */}
                  <Quote className="absolute right-6 top-6 w-16 h-16 text-white/[0.02] transform rotate-180 pointer-events-none group-hover:text-accent/[0.03] transition-colors duration-500" />
                  
                  <div>
                    {/* Rating stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-gray-300 text-sm font-light leading-relaxed mb-8 italic">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Customer details */}
                  <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">{review.name}</h4>
                      <p className="text-[10px] text-accent font-semibold uppercase tracking-widest">{review.model}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
