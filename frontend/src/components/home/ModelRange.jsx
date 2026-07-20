'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Zap, Gauge, Settings, Fuel } from 'lucide-react';
import { motorcycleModels, formatLakh } from '@/data/models';

// ─── Per-model accent overrides so each panel has a unique atmosphere ────────
const MODEL_ACCENTS = {
  'jawa-42':       { glow: 'rgba(181,18,27,0.18)', line: '#B5121B' },
  'jawa-42-fj':    { glow: 'rgba(196,120,20,0.15)', line: '#C47814' },
  'jawa-42-bobber':{ glow: 'rgba(80,80,80,0.25)',  line: '#888888' },
  'jawa-perak':    { glow: 'rgba(40,40,40,0.35)',  line: '#555555' },
  'jawa-350':      { glow: 'rgba(20,80,160,0.14)', line: '#1450A0' },
  'yezdi-roadster':{ glow: 'rgba(181,18,27,0.16)', line: '#B5121B' },
  'yezdi-scrambler':{ glow: 'rgba(60,120,30,0.15)',line: '#3C781E' },
  'yezdi-adventure':{ glow: 'rgba(20,100,180,0.16)',line: '#1464B4' },
};

const SPEC_ICONS = {
  engine: Settings,
  power:  Zap,
  torque: Gauge,
  mileage: Fuel,
};

const SPEC_LABELS = {
  engine: 'Engine',
  power:  'Max Power',
  torque: 'Max Torque',
  mileage: 'Mileage',
};

// ─── Single model panel ───────────────────────────────────────────────────────
function ModelPanel({ model, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const isEven = index % 2 === 0;
  const accent = MODEL_ACCENTS[model.id] || MODEL_ACCENTS['jawa-42'];

  const textAnim = {
    hidden: { opacity: 0, y: 32 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const imgAnim = {
    hidden: { opacity: 0, x: isEven ? 40 : -40, scale: 0.97 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={ref}
      id={model.id}
      className="relative w-full min-h-screen flex items-center border-t border-border overflow-hidden"
      aria-label={model.name}
    >
      {/* Ambient glow behind image */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: isEven
            ? `radial-gradient(ellipse 60% 70% at 80% 50%, ${accent.glow}, transparent 70%)`
            : `radial-gradient(ellipse 60% 70% at 20% 50%, ${accent.glow}, transparent 70%)`,
        }}
        aria-hidden
      />

      {/* Index watermark */}
      <span
        className="absolute bottom-8 font-heading font-black text-white/[0.03] pointer-events-none select-none z-0 leading-none"
        style={{ fontSize: 'clamp(120px, 22vw, 260px)', right: isEven ? 'auto' : '2%', left: isEven ? '2%' : 'auto' }}
        aria-hidden
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className={`relative z-10 w-full container mx-auto px-6 md:px-12 max-w-7xl
                       flex flex-col-reverse gap-12 py-24
                       ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                       lg:items-center lg:gap-16 xl:gap-24`}>

        {/* ── LEFT / TEXT SIDE ── */}
        <div className="flex-1 flex flex-col gap-8 lg:max-w-[480px]">

          {/* Badge + brand */}
          <motion.div
            custom={0}
            variants={textAnim}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex items-center gap-3"
          >
            <span
              className="text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded border"
              style={{ color: accent.line, borderColor: `${accent.line}40` }}
            >
              {model.badge}
            </span>
            <span className="text-[10px] text-text-sec font-bold uppercase tracking-[0.2em]">
              {model.brand}
            </span>
          </motion.div>

          {/* Model name */}
          <motion.div
            custom={1}
            variants={textAnim}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h2
              className="font-heading font-black uppercase leading-none tracking-tight text-white"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              {model.name}
            </h2>
            <p
              className="mt-3 text-base md:text-lg font-body font-light leading-relaxed"
              style={{ color: accent.line }}
            >
              {model.tagline}
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            custom={2}
            variants={textAnim}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="w-12 h-[2px] rounded-full"
            style={{ backgroundColor: accent.line }}
            aria-hidden
          />

          {/* Specs */}
          <motion.dl
            custom={3}
            variants={textAnim}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-x-8 gap-y-5"
          >
            {Object.entries(model.specs).map(([key, value]) => {
              const Icon = SPEC_ICONS[key];
              return (
                <div key={key} className="flex flex-col gap-1">
                  <dt className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-text-sec">
                    {Icon && <Icon className="w-3 h-3 shrink-0" aria-hidden />}
                    {SPEC_LABELS[key] || key}
                  </dt>
                  <dd className="text-white font-specs font-bold text-sm tracking-wide">{value}</dd>
                </div>
              );
            })}
          </motion.dl>

          {/* Price */}
          <motion.div
            custom={4}
            variants={textAnim}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-1 pt-2 border-t border-border"
          >
            <span className="text-[9px] text-text-sec uppercase tracking-[0.25em] font-bold">
              Starting from
            </span>
            <span className="text-2xl font-specs font-extrabold text-white">
              {formatLakh(model.baseExShowroomPrice)}
              <span className="text-sm text-text-sec font-light ml-1">ex-showroom</span>
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div
            custom={5}
            variants={textAnim}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-wrap gap-3 pt-1"
          >
            <Link
              href="/specs"
              className="group inline-flex items-center gap-2 border text-white text-[10px] font-black
                         uppercase tracking-[0.2em] px-6 py-3.5 rounded-full
                         hover:bg-white hover:text-black transition-all duration-300"
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
            >
              Explore Model
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-white text-[10px] font-black
                         uppercase tracking-[0.2em] px-6 py-3.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: accent.line,
                boxShadow: `0 4px 20px ${accent.glow}`,
              }}
            >
              Book Test Ride
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT / IMAGE SIDE ── */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Soft vignette behind bike */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 80% at 50% 55%, ${accent.glow}, transparent 70%)`,
            }}
            aria-hidden
          />

          <motion.div
            variants={imgAnim}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative w-full"
            style={{ aspectRatio: '16/9', maxHeight: '55vh' }}
          >
            <Image
              src={model.image}
              alt={model.name}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority={index < 2}
              className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                         transition-transform duration-[3000ms] ease-out hover:scale-[1.02]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Main ModelRange component ────────────────────────────────────────────────
export default function ModelRange() {
  const models = motorcycleModels.filter((m) => m?.name && m?.image);

  if (models.length === 0) {
    return (
      <section className="bg-primary py-32" id="models">
        <div className="container mx-auto px-6 text-center">
          <p className="text-text-sec">Models are currently unavailable.</p>
        </div>
      </section>
    );
  }

  return (
    <div id="models" className="bg-primary">
      {/* ── Section intro ── */}
      <div className="relative border-t border-border overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold text-accent tracking-[0.35em] uppercase block mb-5">
              Our Models
            </span>
            <h2
              className="font-heading font-black uppercase tracking-tight text-white leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
            >
              Built for the road.
              <br />
              <span className="text-text-sec">Born to stand out.</span>
            </h2>
            <div className="w-12 h-[2px] bg-accent mx-auto mt-8 mb-7 rounded-full" aria-hidden />
            <p className="text-text-sec text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed">
              Eight motorcycles. One philosophy. Explore each machine individually.
            </p>
          </motion.div>
        </div>

        {/* decorative line on right */}
        <div className="hidden lg:block absolute top-0 right-[10%] w-px h-full bg-border/60" aria-hidden />
      </div>

      {/* ── Per-model panels ── */}
      {models.map((model, idx) => (
        <ModelPanel key={model.id} model={model} index={idx} />
      ))}

      {/* ── Footer ── */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[9px] text-text-sec uppercase tracking-widest leading-loose max-w-lg text-center md:text-left">
            *On-road prices depend on insurance, RTO registration charges, and applicable local taxes.
            Indicative prices are subject to change without notice.
          </p>
          <Link
            href="/pricing"
            className="shrink-0 flex items-center gap-2 border border-border text-white
                       hover:bg-white hover:text-black text-[10px] font-black uppercase
                       tracking-[0.25em] px-8 py-4 rounded-full transition-all duration-300 group"
          >
            View Full Pricing
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
