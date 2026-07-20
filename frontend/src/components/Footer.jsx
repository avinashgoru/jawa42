// cSpell:ignore Jawa, JAWA
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/jawamotorcycles/', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.facebook.com/jawamotorcycles/', label: 'Facebook', Icon: Facebook },
  { href: 'https://twitter.com/jawamotorcycles', label: 'Twitter', Icon: Twitter },
  { href: 'https://www.youtube.com/@jawamotorcycles', label: 'YouTube', Icon: Youtube },
];

const MOTORCYCLE_LINKS = [
  { href: '/models', label: 'All Models' },
  { href: '/specs', label: 'Specifications' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/compare', label: 'Compare Models' },
  { href: '/configurator', label: 'Build Your Own' },
];

const OWNERSHIP_LINKS = [
  { href: '/dealers', label: 'Find a Dealer' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/book', label: 'Book Test Ride', accent: true },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <footer className="bg-primary border-t border-border pt-32 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 pb-20 border-b border-border mb-20">
          <div className="max-w-xl">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-wider text-white mb-4 uppercase">
              Join The Tribe
            </h2>
            <p className="text-text-sec text-sm font-light leading-relaxed">
              Subscribe to receive exclusive updates, event invitations, and the latest news from Jawa Motorcycles.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="ENTER YOUR EMAIL"
                autoComplete="email"
                className="bg-surface border border-border text-white px-6 py-4 rounded-xl outline-none focus:border-accent transition-colors font-heading tracking-widest text-xs uppercase w-full sm:w-80"
              />
              {status === 'error' && (
                <p className="text-accent text-xs" role="alert">
                  Please enter a valid email address.
                </p>
              )}
              {status === 'success' && (
                <p className="text-green-400 text-xs" role="status">
                  Thanks — you&apos;re on the list.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-accent hover:bg-accent-hover text-white px-8 py-4 uppercase font-heading tracking-widest text-xs font-black rounded-xl transition-all flex items-center justify-center gap-3 group shadow-[0_5px_15px_rgba(181,18,27,0.2)] h-[52px]"
            >
              Subscribe
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden />
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="mb-6 relative h-8 w-28">
              <Image src="/jawa-logo.svg" alt="Jawa Motorcycles" fill className="object-contain object-left" />
            </div>
            <p className="text-text-sec leading-relaxed max-w-sm text-sm font-light mb-8">
              A perfect blend of classic storytelling and modern engineering. Born for the pure thrill of the open road,
              redesigned for the modern era.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-gray-500 hover:text-white hover:border-accent/40 hover:bg-white/5 transition-all"
                >
                  <Icon size={16} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xs tracking-[0.2em] text-white mb-8 uppercase font-extrabold">
              Motorcycles
            </h3>
            <ul className="flex flex-col gap-4 text-text-sec text-sm font-light">
              {MOTORCYCLE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xs tracking-[0.2em] text-white mb-8 uppercase font-extrabold">
              Ownership
            </h3>
            <ul className="flex flex-col gap-4 text-text-sec text-sm font-light">
              {OWNERSHIP_LINKS.map((link) => (
                <li key={link.href} className={link.accent ? 'pt-2' : undefined}>
                  <Link
                    href={link.href}
                    className={
                      link.accent
                        ? 'text-accent font-bold hover:text-accent-hover transition-colors uppercase tracking-[0.15em] text-xs'
                        : 'hover:text-white transition-colors'
                    }
                  >
                    {link.accent ? `${link.label} →` : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light gap-6">
          <p>&copy; {new Date().getFullYear()} Classic Legends Pvt. Ltd. All Rights Reserved.</p>
          <p className="text-[10px] uppercase tracking-[0.15em]">Jawa Motorcycles — Built for the road</p>
        </div>
      </div>
    </footer>
  );
}
