import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      cartModal: false,
      onOpenCartModal: () => set({ cartModal: true }),
      onCloseCartModal: () => set({ cartModal: false }),
      onAddToCart: (newItem) =>
        set((state) => {
          const itemExists = state.cart.find((item) => item.id === newItem.id);
          if (itemExists) {
            return {
              cart: state.cart.map((item) =>
                item.id === newItem.id
                  ? {
                      ...item,
                      checked: true,
                      quantity: Number(item.quantity) + 1,
                    }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { ...newItem, checked: true, quantity: 1 }],
          };
        }),
      onInputChange: (itemId, qty) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity: qty } : item
          ),
        })),
      onIncreaseQuantity: (itemId) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.id === itemId) {
              const currentQty = Number(item.quantity) || 0;
              return { ...item, quantity: currentQty + 1 };
            }
            return item;
          }),
        })),
      onDecreaseQuantity: (itemId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
          ),
        })),
      onChangeChecked: (itemId, checked) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, checked: !checked } : item
          ),
        })),

      removeToCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),
      getCheckedProducts: () => {
        return get().cart.filter((item) => item.checked === true);
      },
      getSubtotal: () => {
        const product = get().cart.filter((item) => item.checked === true);
        return product.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
