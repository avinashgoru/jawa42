// cSpell:ignore JAWA
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Models', path: '/models' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Compare', path: '/compare' },
  { name: 'Configurator', path: '/configurator' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Dealers', path: '/dealers' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const handleLogoClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const linkClass = (path) =>
    `font-heading text-[10.5px] font-bold uppercase tracking-[0.25em] relative transition-all duration-300 px-5 py-2.5 rounded-full ${
      pathname === path
        ? 'text-white bg-white/5 border border-white/10'
        : 'text-text-sec hover:text-white hover:bg-white/[0.03]'
    }`;

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 pt-4 transition-all duration-500 pointer-events-none">
      <header
        className={`pointer-events-auto mx-auto max-w-7xl rounded-full border transition-all duration-500 ease-out ${
          scrolled
            ? 'py-3.5 bg-surface/80 border-border backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] translate-y-0'
            : 'py-5 bg-transparent border-transparent translate-y-1'
        }`}
      >
        <div className="px-8 flex justify-between items-center">
          <Link href="/" onClick={handleLogoClick} className="flex items-center group relative z-50">
            <Image
              src="/jawa-logo.svg"
              alt="Jawa Motorcycles"
              width={70}
              height={40}
              priority
              className="h-[30px] md:h-[34px] w-auto object-contain transition-all duration-300 group-hover:brightness-125"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-2" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} href={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/book"
              className="bg-accent hover:bg-accent-hover text-white px-7 py-3 rounded-full font-heading font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-[0_5px_15px_rgba(181,18,27,0.2)] hover:shadow-[0_8px_20px_rgba(181,18,27,0.4)]"
            >
              Test Ride
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden text-white z-50 relative p-2"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-screen bg-primary/98 backdrop-blur-2xl flex flex-col justify-center items-center gap-8 z-40 pointer-events-auto"
          >
            <nav className="flex flex-col gap-6 items-center w-full max-w-xs px-6" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`font-heading text-sm font-bold uppercase tracking-[0.25em] w-full text-center py-4 rounded-xl border transition-colors ${
                    pathname === link.path
                      ? 'text-white bg-surface border-border'
                      : 'text-text-sec border-transparent hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/book"
                className="w-full text-center bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-heading font-black uppercase tracking-[0.2em] text-xs transition-colors mt-4"
              >
                Test Ride
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
