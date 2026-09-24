import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCheckoutStore = create(
  persist(
    (set) => ({
      products: [],
      address: [],
      selectedPayment: "qris",
      selectedAddressId: null,
      onAddAddress: (newItem) => {
        const newId = crypto.randomUUID();
        const newAddress = { ...newItem, id: newId };
        set((state) => {
          const isFirstAddress = state.address.length === 0;
          return {
            address: [...state.address, newAddress],
            selectedAddressId: isFirstAddress ? newId : state.selectedAddressId,
          };
        });
      },
      onRemoveAddress: (itemId) =>
        set((state) => ({
          address: state.address.filter((item) => item.id !== itemId),
        })),
      onSelectedPayment: (method) => set({ selectedPayment: method }),
      onSelectedAddressId: (id) => set({ selectedAddressId: id }),
    }),
    {
      name: "user-address",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        address: state.address,
        selectedAddress: state.selectedAddress,
      }),
    }
  )
);
