// cSpell:ignore Jawa, barend

export const CONFIGURATOR_COLORS = [
  { name: 'Jawa Red', hex: '#C41E3A' },
  { name: 'Midnight Grey', hex: '#2A2A2A' },
  { name: 'Galactic Green', hex: '#1B3B2B' },
  { name: 'Comet White', hex: '#EEEEEE' },
];

export const COLOR_IMAGES = {
  '#C41E3A': 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-side-view-2.png?isig=0&q=80',
  '#2A2A2A': 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-left-side-view-11.png?isig=0&q=80',
  '#1B3B2B': 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-right-front-three-quarter-23.png?isig=0&q=80',
  '#EEEEEE': 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/184473/42-rear-view.png?isig=0&q=80',
};

export const HOTSPOTS = [
  { id: 'tank', label: 'Fuel Tank', x: '45%', y: '35%', desc: 'Select from 4 premium colors.' },
  { id: 'seat', label: 'Seat', x: '65%', y: '40%', desc: 'Dual classic or single bobber seat.' },
  { id: 'exhaust', label: 'Exhaust', x: '70%', y: '80%', desc: 'Chrome standard or Matte sport.' },
  { id: 'wheels', label: 'Wheels', x: '25%', y: '80%', desc: 'Wire spoke or Alloy rims.' },
  { id: 'mirrors', label: 'Mirrors', x: '35%', y: '15%', desc: 'Standard or Bar-end mirrors.' },
];

export const ACCESSORY_COSTS = {
  wheels: { spoke: 0, alloy: 6000 },
  exhaust: { standard: 0, sport: 3000 },
  seat: { dual: 0, bobber: 4500 },
  mirrors: { standard: 0, barend: 2500 },
  colorPremium: 2000,
  defaultColor: '#C41E3A',
};
