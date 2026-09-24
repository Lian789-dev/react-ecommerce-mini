import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import CloseButton from "./CloseButton";
import ProductCard from "./ProductCard";
import ProductOptionsFooter from "./ProductOptionsFooter";
export default function ProductOptionsModal() {
  const activeModal = useModalStore((state) => state.activeModal);
  const onCloseModal = useModalStore((state) => state.onCloseModal);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  if (activeModal !== "product-options") return null;
  return (
    <div className="fixed top-0 left-0 z-50 h-dvh w-full">
      <div className="flex h-full w-full flex-col md:hidden">
        <div
          onClick={onCloseModal}
          role="button"
          className="flex-1 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        ></div>
        <div className="relative flex-none bg-white p-4">
          <CloseButton />
          <ProductCard />
          <ProductOptionsFooter />
        </div>
      </div>
      <div className="hidden h-full w-full md:block">
        <div
          onClick={onCloseModal}
          role="button"
          className="flex h-full items-center justify-center bg-slate-900/40 backdrop-blur-xs transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-96 rounded-md bg-white p-4"
          >
            <CloseButton />
            <ProductCard />
            <ProductOptionsFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
