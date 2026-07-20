// cSpell:ignore Jawa, Yezdi, Perak, Bobber, aeplcdn, imgd
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

/**
 * Gallery data — every entry is verified against its CDN image URL.
 * All images are from the ec/184473 Jawa product set on imgd.aeplcdn.com.
 *
 * URL slug → what it actually shows:
 *   42-right-side-view-2           → Jawa 42, clean right-side profile
 *   42-2024-fuel-tank-17           → Jawa 42, close-up of fuel tank
 *   42-rear-view-2                 → Jawa 42, rear view
 *   42-right-front-three-quarter-24→ Jawa 42, right-front three-quarter
 *   42-right-front-three-quarter-23→ Jawa 42, right-front three-quarter (alt angle)
 *   42-left-rear-three-quarter-2   → Jawa 42, left-rear three-quarter
 *   42-left-side-view-11           → Jawa 42, left-side profile
 *   42-seat-3                      → Jawa 42, seat close-up
 *   42-2024-branding-fuel-tank-decal → Jawa 42, heritage tank decal detail
 */
const galleryData = [
  {
    id: 1,
    title: 'Jawa 42',
    subtitle: 'Right Side Profile',
    category: 'Jawa 42',
    description: 'Modern roadster with timeless Jawa character — captured in its purest form.',
    src: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80',
    fit: 'contain',
    gridClass: 'col-span-12 md:col-span-8 row-span-2 h-[420px] md:h-auto md:min-h-[580px]',
  },
  {
    id: 2,
    title: 'Jawa 42',
    subtitle: 'Fuel Tank — Signature Design',
    category: 'Design Detail',
    description: 'The teardrop tank is the heart of Jawa heritage — sculpted for presence.',
    src: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-2024-fuel-tank-17.jpeg?isig=0&q=80',
    fit: 'cover',
    gridClass: 'col-span-12 md:col-span-4 row-span-1 h-[290px]',
  },
  {
    id: 3,
    title: 'Jawa 42',
    subtitle: 'Rear View',
    category: 'Jawa 42',
    description: 'Twin exhausts, classic tail lamp — every detail speaks the legend.',
    src: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-rear-view-2.png?isig=0&q=80',
    fit: 'contain',
    gridClass: 'col-span-12 md:col-span-4 row-span-1 h-[290px]',
  },
  {
    id: 4,
    title: 'Jawa 42',
    subtitle: 'Front Three-Quarter',
    category: 'Jawa 42',
    description: 'Commanding stance from every angle — built to turn heads on any road.',
    src: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-24.png?isig=0&q=80',
    fit: 'contain',
    gridClass: 'col-span-12 md:col-span-6 row-span-1 h-[380px]',
  },
  {
    id: 5,
    title: 'Jawa 42',
    subtitle: 'Dynamic Three-Quarter',
    category: 'Jawa 42',
    description: 'Aggressive proportions meet refined engineering in one iconic silhouette.',
    src: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-23.png?isig=0&q=80',
    fit: 'contain',
    gridClass: 'col-span-12 md:col-span-6 row-span-1 h-[380px]',
  },
  {
    id: 6,
    title: 'Jawa 42',
    subtitle: 'Left Rear Three-Quarter',
    category: 'Jawa 42',
    description: 'Classic proportions that pay homage to decades of motorcycling heritage.',
    src: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-rear-three-quarter-2.png?isig=0&q=80',
    fit: 'contain',
    gridClass: 'col-span-12 md:col-span-4 row-span-2 h-[400px] md:h-auto md:min-h-[580px]',
  },
  {
    id: 7,
    title: 'Jawa 42',
    subtitle: 'Left Side Profile',
    category: 'Jawa 42',
    description: 'The complete silhouette — timeless lines that define the modern classic.',
    src: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-side-view-11.png?isig=0&q=80',
    fit: 'contain',
    gridClass: 'col-span-12 md:col-span-8 row-span-1 h-[380px]',
  },
  {
    id: 8,
    title: 'Jawa 42',
    subtitle: 'Premium Seat',
    category: 'Craft Detail',
    description: 'Hand-finished stitching and premium foam — comfort engineered for the long road.',
    src: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-seat-3.png?isig=0&q=80',
    fit: 'cover',
    gridClass: 'col-span-12 md:col-span-4 row-span-1 h-[290px]',
  },
  {
    id: 9,
    title: 'Jawa 42',
    subtitle: 'Heritage Tank Decal',
    category: 'Heritage Branding',
    description: 'The Jawa insignia — a mark of legacy carried forward with pride since 1929.',
    src: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-2024-branding-fuel-tank-decal.jpeg?isig=0&q=80',
    fit: 'cover',
    gridClass: 'col-span-12 md:col-span-4 row-span-1 h-[290px]',
  },
];

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const showNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % galleryData.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setSelectedImageIndex((prev) => (prev + 1) % galleryData.length);
      if (e.key === 'ArrowLeft') setSelectedImageIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedImageIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedImageIndex]);

  return (
    <div className="pt-40 pb-32 min-h-screen bg-primary">

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24 max-w-4xl mx-auto px-6"
      >
        <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase block mb-4">
          Visual Heritage
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tight mb-6 text-white">
          The Gallery
        </h1>
        <p className="text-sm md:text-lg text-text-sec font-body font-light leading-relaxed max-w-2xl mx-auto">
          An editorial curation of the Jawa 42 — every angle, every detail, every story.
        </p>
      </motion.div>

      {/* Asymmetrical Editorial Grid */}
      <div className="px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
          {galleryData.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden group cursor-pointer bg-surface ${img.gridClass}`}
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.title} — ${img.subtitle}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx)}
            >
              <Image
                src={img.src}
                alt={`${img.title} — ${img.subtitle}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                priority={idx < 3}
                className={`transition-transform duration-1000 ease-out group-hover:scale-105 ${
                  img.fit === 'contain' ? 'object-contain p-4' : 'object-cover'
                }`}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500
                              flex flex-col justify-end p-6 md:p-8">
                {/* Category pill */}
                <span className="text-accent text-[9px] font-black uppercase tracking-[0.25em] mb-2
                                 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                  {img.category}
                </span>

                {/* Title + subtitle */}
                <div className="flex items-end justify-between gap-4
                                translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-50">
                  <div>
                    <h3 className="text-white text-xl md:text-2xl font-heading font-black uppercase tracking-wide leading-none">
                      {img.title}
                    </h3>
                    <p className="text-white/70 text-[11px] font-body font-light mt-1 leading-snug">
                      {img.subtitle}
                    </p>
                  </div>
                  <div className="w-9 h-9 shrink-0 rounded-full border border-white/20
                                  flex items-center justify-center
                                  opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <ArrowRight size={16} className="text-white" aria-hidden />
                  </div>
                </div>

                {/* Description — visible on larger tiles */}
                <p className="text-white/50 text-[11px] font-body font-light mt-3 leading-relaxed
                               translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100
                               hidden md:block">
                  {img.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-[#060606]/98 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 z-[110] text-white/50 hover:text-white
                         transition-colors p-2 rounded-full hover:bg-white/5"
              onClick={closeLightbox}
              aria-label="Close gallery lightbox"
            >
              <X size={28} strokeWidth={1.5} aria-hidden />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-10 z-[110] w-12 h-12 rounded-full border border-white/10
                         flex items-center justify-center text-white/50
                         hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
              onClick={showPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} strokeWidth={1.5} aria-hidden />
            </button>

            {/* Next */}
            <button
              className="absolute right-4 md:right-10 z-[110] w-12 h-12 rounded-full border border-white/10
                         flex items-center justify-center text-white/50
                         hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
              onClick={showNext}
              aria-label="Next image"
            >
              <ChevronRight size={22} strokeWidth={1.5} aria-hidden />
            </button>

            {/* Image panel */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[88vw] h-[78vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryData[selectedImageIndex].src}
                alt={`${galleryData[selectedImageIndex].title} — ${galleryData[selectedImageIndex].subtitle}`}
                fill
                quality={95}
                priority
                className="object-contain"
              />

              {/* Caption bar */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5
                              flex flex-col md:flex-row md:items-end md:justify-between gap-2
                              bg-gradient-to-t from-black/90 to-transparent">
                <div>
                  {/* Category */}
                  <span className="text-accent text-[9px] font-black uppercase tracking-[0.25em] block mb-1">
                    {galleryData[selectedImageIndex].category}
                  </span>
                  {/* Title */}
                  <h2 className="text-white text-2xl md:text-3xl font-heading font-black uppercase leading-tight">
                    {galleryData[selectedImageIndex].title}
                  </h2>
                  {/* Subtitle */}
                  <p className="text-white/60 text-xs font-body font-light mt-0.5">
                    {galleryData[selectedImageIndex].subtitle}
                  </p>
                  {/* Description */}
                  <p className="text-white/45 text-[11px] font-body font-light mt-2 max-w-md leading-relaxed hidden md:block">
                    {galleryData[selectedImageIndex].description}
                  </p>
                </div>

                {/* Counter */}
                <div className="text-white/35 font-specs text-sm tracking-widest shrink-0">
                  {String(selectedImageIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(galleryData.length).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
