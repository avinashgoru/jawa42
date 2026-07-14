// cSpell:ignore barend
import { create } from 'zustand';

export const useConfiguratorStore = create((set) => ({
  color: '#C41E3A', // Default Jawa Red
  exhaust: 'standard', // 'standard' | 'sport'
  wheels: 'alloy', // 'alloy' | 'spoke'
  seat: 'dual', // 'dual' | 'bobber'
  mirrors: 'standard', // 'standard' | 'barend'
  
  setColor: (color) => set({ color }),
  setExhaust: (exhaust) => set({ exhaust }),
  setWheels: (wheels) => set({ wheels }),
  setSeat: (seat) => set({ seat }),
  setMirrors: (mirrors) => set({ mirrors }),
}));
