import { create } from "zustand";

export const useSearchStore = create((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),
}));
