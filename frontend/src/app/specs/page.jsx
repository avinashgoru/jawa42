// cSpell:ignore Jawa, DOHC, Kerb, Electricals, VRLA
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const specificationsData = [
  {
    category: "Engine & Performance",
    items: [
      { label: "Engine Type", value: "Single Cylinder, 4-Stroke, Liquid Cooled, DOHC" },
      { label: "Displacement", value: "334 cc" },
      { label: "Max Power", value: "29.9 PS @ 7500 rpm" },
      { label: "Max Torque", value: "30 Nm @ 5500 rpm" },
      { label: "Bore x Stroke", value: "81 x 65 mm" },
      { label: "Compression Ratio", value: "11:1" },
      { label: "Fuel System", value: "Electronic Fuel Injection (EFI)" },
      { label: "Exhaust", value: "Twin Exhaust" },
      { label: "Transmission", value: "6-Speed Constant Mesh" },
    ]
  },
  {
    category: "Chassis & Suspension",
    items: [
      { label: "Frame Type", value: "Double Cradle Tubular Frame" },
      { label: "Front Suspension", value: "Telescopic Hydraulic Fork (35mm)" },
      { label: "Rear Suspension", value: "Mono Shock Absorber, 7-Step Adjustable" },
      { label: "Trail", value: "109 mm" },
    ]
  },
  {
    category: "Dimensions & Weight",
    items: [
      { label: "Wheelbase", value: "1485 mm" },
      { label: "Seat Height", value: "750 mm (Adjustable)" },
      { label: "Ground Clearance", value: "145 mm" },
      { label: "Kerb Weight", value: "175 kg" },
      { label: "Fuel Tank Capacity", value: "12.5 Liters" },
    ]
  },
  {
    category: "Brakes & Tyres",
    items: [
      { label: "Front Brake", value: "280 mm Disc with Floating Caliper" },
      { label: "Rear Brake", value: "240 mm Disc with Floating Caliper" },
      { label: "ABS", value: "Dual Channel ABS" },
      { label: "Front Tyre", value: "100/90 - 18, Tubeless" },
      { label: "Rear Tyre", value: "140/70 - 17, Tubeless" },
      { label: "Wheel Type", value: "Spoke / Alloy Options" },
    ]
  },
  {
    category: "Electricals",
    items: [
      { label: "Battery", value: "12V, 8Ah VRLA" },
      { label: "Headlamp", value: "LED with DRL" },
      { label: "Tail Lamp", value: "LED" },
      { label: "Turn Signals", value: "LED" },
      { label: "Console", value: "Fully Digital LCD Display" },
      { label: "Charging", value: "USB Type-A & Type-C Ports" },
    ]
  }
];

export default function Specifications() {
  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center lg:text-left"
        >
          <h2 className="text-accent font-heading font-semibold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center justify-center lg:justify-start gap-4">
            <span className="w-8 h-[1px] bg-accent hidden lg:block"></span> 
            Technical Data
          </h2>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold uppercase tracking-widest text-white">
            Specifications
          </h1>
        </motion.div>

        {/* Split View Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
          
          {/* Left Side: Sticky Image */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 h-[50vh] lg:h-[70vh] flex items-center justify-center rounded-3xl overflow-hidden glass-1 border border-white/5 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
            <img 
              src="https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-23.png?isig=0&q=80" 
              alt="Jawa 42 Bobber Engineering" 
              className="w-full h-full object-cover md:object-contain object-center opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] mix-blend-lighten"
            />
            {/* Overlay Specs Highlights */}
            <div className="absolute bottom-8 left-8 z-20 flex gap-8">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-heading">Power</p>
                <p className="text-2xl text-white font-bold font-heading">29.9 <span className="text-sm text-accent">PS</span></p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-heading">Engine</p>
                <p className="text-2xl text-white font-bold font-heading">334 <span className="text-sm text-accent">CC</span></p>
              </div>
            </div>
          </div>

          {/* Right Side: Scrolling Specs */}
          <div className="w-full lg:w-7/12 flex flex-col gap-12 pb-20">
            {specificationsData.map((section, index) => (
              <motion.div 
                key={section.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                {/* Category Header */}
                <div className="border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-3xl font-heading text-white uppercase tracking-wider">
                    {section.category}
                  </h3>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col group">
                      <span className="text-gray-500 text-xs tracking-widest uppercase font-semibold mb-1 group-hover:text-accent transition-colors duration-300">
                        {item.label}
                      </span>
                      <span className="text-gray-100 text-sm font-medium tracking-wide">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
