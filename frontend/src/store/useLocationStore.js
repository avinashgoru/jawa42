import { create } from 'zustand';

export const useLocationStore = create((set) => ({
  city: 'Delhi',
  setCity: (city) => set({ city }),
}));
