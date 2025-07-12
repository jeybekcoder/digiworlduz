// 📄 Fayl: src/store/useSettingsStore.ts
// 🎯 Maqsad: Til va valyuta sozlamalarini global state orqali boshqarish (zustand bilan)

import { create } from "zustand";

interface SettingsState {
  currency: string;
  language: string;
  changeCurrency: (currency: string) => void;
  changeLanguage: (language: string) => void;
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  currency: "USD",
  language: "English",
  changeCurrency: (currency) => set({ currency }),
  changeLanguage: (language) => set({ language }),
}));