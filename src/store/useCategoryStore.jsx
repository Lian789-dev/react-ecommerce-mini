import { create } from "zustand";
import InitialProduct from "../data/products.json";

export const useCategoryStore = create((set) => ({
  selectedLocations: [],
  categories: [
    ...new Set(InitialProduct.map((item) => item.category).filter(Boolean)),
  ],
  sortBy: "favorite",

  toggleLocation: (location) =>
    set((state) => {
      const exists = state.selectedLocations.includes(location);
      return {
        selectedLocations: exists
          ? state.selectedLocations.filter((loc) => loc !== location)
          : [...state.selectedLocations, location],
      };
    }),
  setSortBy: (sortType) => set({ sortBy: sortType }),
}));
