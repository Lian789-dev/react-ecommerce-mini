import { create } from "zustand";

export const useModalStore = create((set) => ({
  activeModal: null,
  onOpenModal: (modal) => set({ activeModal: modal }),
  onCloseModal: () => set({ activeModal: null }),
}));
