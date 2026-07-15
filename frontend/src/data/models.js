export const motorcycleModels = [
  {
    id: "jawa-42",
    name: "Jawa 42",
    brand: "Jawa",
    tagline: "The Modern Classic",
    baseExShowroomPrice: 198142,
    specs: { engine: "294.72 cc", power: "27.32 PS", weight: "172 kg" },
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80",
    variants: [
      { id: "42-base", name: "Classic Base", description: "Spoke Wheels / Standard", price: 198142 },
      { id: "42-dual", name: "Dual Tone", description: "Alloy Wheels / Premium", price: 204142, isPopular: true },
      { id: "42-carbon", name: "Cosmic Carbon", description: "Alloy Wheels / Stealth", price: 212142 }
    ]
  },
  {
    id: "jawa-42-fj",
    name: "Jawa 42 FJ",
    brand: "Jawa",
    tagline: "Fearless & Bold",
    baseExShowroomPrice: 214000,
    specs: { engine: "334.00 cc", power: "29.20 PS", weight: "184 kg" },
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-side-view-11.png?isig=0&q=80"
  },
  {
    id: "jawa-42-bobber",
    name: "Jawa 42 Bobber",
    brand: "Jawa",
    tagline: "Factory Custom",
    baseExShowroomPrice: 209500,
    specs: { engine: "334.00 cc", power: "29.90 PS", weight: "175 kg" },
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-side-view-11.png?isig=0&q=80"
  },
  {
    id: "jawa-perak",
    name: "Jawa Perak",
    brand: "Jawa",
    tagline: "The Dark Custom",
    baseExShowroomPrice: 213187,
    specs: { engine: "334.00 cc", power: "30.64 PS", weight: "175 kg" },
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-23.png?isig=0&q=80"
  },
  {
    id: "jawa-350",
    name: "Jawa 350",
    brand: "Jawa",
    tagline: "The Legend Returns",
    baseExShowroomPrice: 214950,
    specs: { engine: "334.00 cc", power: "22.50 PS", weight: "194 kg" },
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-rear-three-quarter-2.png?isig=0&q=80"
  },
  {
    id: "yezdi-roadster",
    name: "Yezdi Roadster",
    brand: "Yezdi",
    tagline: "Rush Hour Thrills",
    baseExShowroomPrice: 206142,
    specs: { engine: "334.00 cc", power: "29.70 PS", weight: "184 kg" },
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80"
  },
  {
    id: "yezdi-scrambler",
    name: "Yezdi Scrambler",
    brand: "Yezdi",
    tagline: "Rule The Rough",
    baseExShowroomPrice: 209900,
    specs: { engine: "334.00 cc", power: "29.10 PS", weight: "182 kg" },
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-23.png?isig=0&q=80"
  },
  {
    id: "yezdi-adventure",
    name: "Yezdi Adventure",
    brand: "Yezdi",
    tagline: "Without Boundaries",
    baseExShowroomPrice: 215900,
    specs: { engine: "334.00 cc", power: "30.20 PS", weight: "188 kg" },
    image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-side-view-11.png?isig=0&q=80"
  }
];

// Helper to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
