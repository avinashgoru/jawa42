// cSpell:ignore JAWA
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setIsOpen(false);
  }

  const handleLogoClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const links = [
    { name: 'Models', path: '/models' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Compare', path: '/compare' },
    { name: 'Configurator', path: '/configurator' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 pt-4 transition-all duration-500 pointer-events-none">
      <header className={`pointer-events-auto mx-auto max-w-7xl rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${scrolled ? 'py-4 glass-1 translate-y-0' : 'py-6 bg-transparent translate-y-2'}`}>
        <div className="px-6 flex justify-between items-center">
        
        {/* Premium Minimal Branding */}
        <Link href="/" onClick={handleLogoClick} className="flex items-center group relative z-50">
          <Image
            src="/jawa-logo.svg"
            alt="Jawa Logo"
            width={78}
            height={44}
            priority
            className="h-[32px] md:h-[38px] lg:h-[42px] w-auto object-contain transition-all duration-300 group-hover:opacity-90"
          />
        </Link>
        
        {/* Compact Navigation */}
        <nav className={`fixed lg:relative top-0 right-0 h-screen lg:h-auto w-full max-w-sm lg:max-w-none bg-secondary/95 lg:bg-transparent backdrop-blur-2xl lg:backdrop-blur-none flex flex-col lg:flex-row justify-center lg:justify-end items-center gap-6 lg:gap-10 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full lg:translate-x-0'}`}>
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-8 lg:mb-0 items-center">
            {links.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`font-heading text-xs font-semibold uppercase tracking-[0.2em] relative group transition-colors duration-500 px-4 py-2 rounded-full ${pathname === link.path ? 'text-white bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Automotive-Style CTA */}
          <Link href="/book" className="bg-white hover:bg-gray-200 text-black px-6 py-2.5 rounded-full font-heading font-bold uppercase tracking-[0.15em] text-[11px] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Test Ride
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white z-50 relative p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
        </div>
      </header>
    </div>
  );
}
