import { useModalStore } from "@/store/useModalStore";
import FlexAside from "./components/FlexAside";
import FlexMain from "./components/FlexMain";
import SidebarMobile from "./components/SidebarMobile";
import ProductEmptyState from "@/components/ProductEmptyState";
import { useSearchParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
export default function Catalog() {
  const activeModal = useModalStore((state) => state.activeModal);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const products = useProductStore((state) => state.products);
  const FindProduct = products.find((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="w-full bg-slate-100">
      {FindProduct ? (
        <div className="mx-auto min-h-[calc(100dvh-65px)] w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-20">
            <aside className="hidden flex-none py-3 md:block">
              <FlexAside />
            </aside>
            <FlexMain />
          </div>
          <div className="md:hidden">
            {activeModal === "sidebar-mobile" && <SidebarMobile />}
          </div>
        </div>
      ) : (
        <ProductEmptyState />
      )}
    </div>
  );
}
