// cSpell:ignore Jawa, DOHC, Kerb, Electricals, VRLA
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-primary pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center lg:text-left"
        >
          <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase block mb-4">Technical Data</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-white">
            Jawa 42 Bobber
          </h1>
          <p className="mt-4 text-text-sec text-sm max-w-xl">
            Factory specifications for the Jawa 42 Bobber (334 cc Panther platform).
          </p>
        </motion.div>

        {/* Split View Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
          
          {/* Left Side: Sticky Image */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-40 h-[50vh] lg:h-[65vh] flex items-center justify-center rounded-3xl overflow-hidden bg-surface border border-border relative group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-transparent to-transparent z-10 pointer-events-none" />
            <Image
              src="https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-23.png?isig=0&q=80"
              alt="Jawa 42 Bobber side profile"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain object-center opacity-70 group-hover:scale-[1.02] transition-transform duration-1000 ease-out mix-blend-lighten"
            />
            {/* Overlay Specs Highlights */}
            <div className="absolute bottom-8 left-8 z-20 flex gap-8">
              <div>
                <p className="text-[9px] text-text-sec uppercase tracking-widest font-heading font-bold">POWER</p>
                <p className="text-xl text-white font-specs font-bold">29.9 <span className="text-xs text-accent">PS</span></p>
              </div>
              <div>
                <p className="text-[9px] text-text-sec uppercase tracking-widest font-heading font-bold">ENGINE</p>
                <p className="text-xl text-white font-specs font-bold">334 <span className="text-xs text-accent">CC</span></p>
              </div>
            </div>
          </div>

          {/* Right Side: Scrolling Specs */}
          <div className="w-full lg:w-7/12 flex flex-col gap-16 pb-20">
            {specificationsData.map((section, index) => (
              <motion.div 
                key={section.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Category Header */}
                <div className="border-b border-border pb-4 mb-8">
                  <h3 className="text-2xl font-heading font-extrabold text-white uppercase tracking-wider">
                    {section.category}
                  </h3>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col group border-b border-border/40 pb-4 last:border-0">
                      <span className="text-text-sec text-[9px] tracking-widest uppercase font-bold mb-1.5 group-hover:text-accent transition-colors duration-300">
                        {item.label}
                      </span>
                      <span className="text-white text-sm font-specs font-semibold">
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
