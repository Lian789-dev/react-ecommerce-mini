import { create } from "zustand";

export const useSearchStore = create((set) => ({
  keyword: "",
  selectedIndex: -1,
  autoComplete: [],
  setKeyword: (keyword) => set({ keyword: keyword }),
  setSelectedIndex: (index) => set({ selectedIndex: index }),
  setAutoComplete: (product) =>
    set({
      autoComplete: [...product],
    }),
}));
