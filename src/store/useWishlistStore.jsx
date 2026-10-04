import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set) => ({
      wishlistIds: [],
      onToggleWishlist: (productId) =>
        set((state) => {
          const isExist = state.wishlistIds.find((item) => item === productId);
          if (isExist) {
            return {
              wishlistIds: state.wishlistIds.filter(
                (item) => item !== productId
              ),
            };
          }
          return { wishlistIds: [...state.wishlistIds, productId] };
        }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
