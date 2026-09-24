import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { useModalStore } from "@/store/useModalStore";
import NavList from "./components/NavList";
import ProductCard from "./components/ProductCard";
import ProductTabs from "./components/ProductTabs";
import ProductFooter from "./components/ProductFooter";
import ProductOptionsModal from "./components/ProductOptionsModal";

export default function ProductDetailView() {
  const getProductById = useProductStore((state) => state.getProductById);
  const activeModal = useModalStore((state) => state.activeModal);
  const { id } = useParams();
  const product = getProductById(id);
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="flex h-[calc(100dvh-65px)] w-full items-center justify-center">
        <div className="flex flex-col">
          <p>Product Not Found</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Back"
            className="cursor-pointer border px-4 py-0.5"
          >
            Back
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-slate-100">
      <main className="mx-auto min-h-[calc(100dvh-65px)] w-full max-w-7xl pb-6 sm:px-4 sm:pt-6 lg:px-8">
        <NavList />
        <ProductCard />
        <ProductTabs />
      </main>
      {activeModal === "product-options" && <ProductOptionsModal />}
      <ProductFooter />
    </div>
  );
}
