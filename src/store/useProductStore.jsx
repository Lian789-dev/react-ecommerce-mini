import { create } from "zustand";
import InitialProduct from "../data/products.json";

export const useProductStore = create((set, get) => ({
  products: InitialProduct,
  orderHistory: [],
  orderSuccessModal: false,
  productOptionModal: false,

  getProductById: (itemId) => {
    return get().products.find((item) => Number(item.id) === Number(itemId));
  },

  getProductByCategory: (category) => {
    if (!category) return get().products;
    return get().products.filter(
      (item) => item.category?.toLowerCase() === category.toLowerCase()
    );
  },

  onOrder: (orderPayload) =>
    set((state) => {
      const purchasedItems = Array.isArray(orderPayload.item)
        ? orderPayload.item
        : [orderPayload.item || orderPayload];

      const qtyMap = new Map();
      purchasedItems.forEach((purchased) => {
        qtyMap.set(Number(purchased.id), Number(purchased.quantity || 1));
      });

      return {
        products: state.products.map((product) => {
          const productId = Number(product.id);
          if (qtyMap.has(productId)) {
            const qtyToDeduct = qtyMap.get(productId);
            const newStock = product.stock - qtyToDeduct;
            return {
              ...product,
              stock: Math.max(0, newStock),
            };
          }
          return product;
        }),

        orderHistory: [...state.orderHistory, orderPayload],
      };
    }),
}));
