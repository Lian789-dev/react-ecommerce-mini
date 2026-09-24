import { useProductStore } from "@/store/useProductStore";
import { useModalStore } from "@/store/useModalStore";
import ProductGrid from "@/components/ProductGrid";
import CategoryFilter from "./components/CategoryFilter";
import OrderSuccessModal from "./components/OrderSuccessModal/OrderSuccessModal";
export default function Home() {
  const products = useProductStore((state) => state.products);
  const activeModal = useModalStore((state) => state.activeModal);
  return (
    <div className="w-full bg-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <CategoryFilter />
        <h1 className="pb-4 text-lg font-bold">Recommendation</h1>
        <ProductGrid products={products} />
      </div>
      {activeModal === "order-success" && <OrderSuccessModal />}
    </div>
  );
}
