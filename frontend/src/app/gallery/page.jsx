// cSpell:ignore Jawa, Yezdi, Perak, Bobber
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const galleryData = [
  { category: "Jawa 42", src: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80", aspect: "aspect-[16/9]" },
  { category: "Bobber", src: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-side-view-11.png?isig=0&q=80", aspect: "aspect-[16/9]" },
  { category: "Perak", src: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-23.png?isig=0&q=80", aspect: "aspect-[16/9]" },
  { category: "Bobber", src: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80", aspect: "aspect-[16/9]" },
  { category: "Jawa 42", src: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-side-view-11.png?isig=0&q=80", aspect: "aspect-[4/3]" }, // simulated varied aspect
  { category: "Jawa 350", src: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-rear-three-quarter-2.png?isig=0&q=80", aspect: "aspect-[16/9]" },
  { category: "Yezdi", src: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-2024-fuel-tank-17.jpeg?isig=0&q=80", aspect: "aspect-[3/4]" }, // simulated portrait
  { category: "Yezdi", src: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-seat-3.png?isig=0&q=80", aspect: "aspect-[16/9]" },
  { category: "Yezdi", src: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-rear-view-2.png?isig=0&q=80", aspect: "aspect-[16/9]" }
];

const categories = ["All Models", "Jawa 42", "Jawa 42 Bobber", "Jawa Perak", "Jawa 350", "Yezdi"];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All Models");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Normalize categories for filtering
  const filteredImages = activeTab === "All Models" 
    ? galleryData 
    : galleryData.filter(img => img.category.includes(activeTab) || activeTab.includes(img.category));

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const showNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
  };
  
  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));
      if (e.key === 'ArrowLeft') setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredImages.length]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050505]">
      
      {/* Premium Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 max-w-4xl mx-auto px-6"
      >
        <h2 className="text-accent font-heading font-semibold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center justify-center gap-4">
          <span className="w-8 h-[1px] bg-accent"></span> Showcase <span className="w-8 h-[1px] bg-accent"></span>
        </h2>
        <h1 className="text-5xl md:text-6xl font-heading font-extrabold uppercase tracking-widest mb-6 text-white">The Gallery</h1>
        <p className="text-gray-400 text-lg leading-relaxed font-light mb-12">
          Experience the pure craftsmanship, heritage, and raw emotion of our motorcycle lineage.
        </p>

        {/* Integrated Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2.5 rounded-full font-heading text-xs uppercase tracking-widest font-bold transition-all duration-300 border ${
                activeTab === category 
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/40 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* CSS Masonry Grid */}
      <div className="px-6 md:px-12 max-w-[1800px] mx-auto">
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={`${img.src}-${idx}`}
                className="break-inside-avoid relative overflow-hidden group cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <div className={`relative w-full ${img.aspect} bg-[#111]`}>
                  <Image 
                    src={img.src} 
                    alt={`${img.category} Showcase`} 
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Premium Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex flex-col justify-end p-6">
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-400"
                    >
                      <span className="text-white font-heading font-bold uppercase tracking-widest text-sm">
                        {img.category}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinematic Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
              <span className="text-white font-heading font-bold uppercase tracking-widest text-sm drop-shadow-md">
                {filteredImages[selectedImageIndex].category}
              </span>
              <button 
                className="text-gray-400 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/50 rounded-full backdrop-blur"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>

            {/* Prev Navigation */}
            {filteredImages.length > 1 && (
              <button 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-3 bg-black/20 hover:bg-black/50 rounded-full backdrop-blur z-50 group"
                onClick={showPrev}
                aria-label="Previous image"
              >
                <ChevronLeft size={36} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            )}

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  src={filteredImages[selectedImageIndex].src}
                  alt={`${filteredImages[selectedImageIndex].category} Cinematic View`}
                  className="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
            </div>

            {/* Next Navigation */}
            {filteredImages.length > 1 && (
              <button 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-3 bg-black/20 hover:bg-black/50 rounded-full backdrop-blur z-50 group"
                onClick={showNext}
                aria-label="Next image"
              >
                <ChevronRight size={36} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Bottom Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-xs font-heading tracking-[0.2em] bg-black/50 px-4 py-2 rounded-full backdrop-blur">
              {selectedImageIndex + 1} <span className="mx-2 text-white/20">/</span> {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
