// cSpell:ignore Jawa, JAWA
import Link from 'next/link';
import { ArrowRight, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030303] border-t border-white/5 pt-24 relative overflow-hidden">
      {/* Premium Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        
        {/* Top Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pb-16 border-b border-white/5 mb-16">
          <div className="max-w-xl">
            <h3 className="font-heading text-3xl font-bold tracking-widest text-white mb-4 uppercase">Join The Tribe</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Subscribe to receive exclusive updates, event invitations, and the latest news from the world of Jawa Motorcycles.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="bg-white/5 border border-white/10 text-white px-6 py-4 rounded-none outline-none focus:border-accent transition-colors font-heading tracking-widest text-xs uppercase w-full sm:w-80"
            />
            <button className="bg-accent hover:bg-accent-hover text-white px-8 py-4 uppercase font-heading tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-3 group">
              Subscribe
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2 pr-8">
            <h3 className="font-heading text-3xl font-extrabold tracking-[0.3em] text-white mb-6">JAWA 42</h3>
            <p className="text-gray-400 leading-relaxed max-w-md font-light mb-8">
              A perfect blend of classic storytelling and modern engineering. Born for the pure thrill of the open road, redesigned for the modern era.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-xs tracking-widest text-white mb-8 uppercase font-bold">Motorcycles</h4>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm font-light">
              <li><Link href="/specs" className="hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-accent transition-all group-hover:w-4"></span> Specifications</Link></li>
              <li><Link href="/gallery" className="hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-accent transition-all group-hover:w-4"></span> Gallery</Link></li>
              <li><Link href="/compare" className="hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-accent transition-all group-hover:w-4"></span> Compare Models</Link></li>
              <li><Link href="/configurator" className="hover:text-accent transition-colors flex items-center gap-2 group"><span className="w-0 h-[1px] bg-accent transition-all group-hover:w-4"></span> Build Your Own</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-xs tracking-widest text-white mb-8 uppercase font-bold">Ownership</h4>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm font-light">
              <li><Link href="/dealers" className="hover:text-white transition-colors">Find a Dealer</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Book Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li className="pt-2"><Link href="/book" className="text-accent font-semibold hover:text-accent-hover transition-colors uppercase tracking-wider text-xs">Book Test Ride →</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#000000] py-8 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light gap-6">
          <p>&copy; {new Date().getFullYear()} Classic Legends Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex gap-8 uppercase tracking-wider">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
