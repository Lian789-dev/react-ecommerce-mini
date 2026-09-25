import { useModalStore } from "@/store/useModalStore";
import AddressFormModal from "@/components/AddressFormModal";
import CheckoutHeader from "./components/CheckoutHeader";
import ProductList from "./components/ProductList";
import CheckoutSummary from "./components/CheckoutSummary";
import CheckoutFooter from "./components/CheckoutFooter";

export default function Checkout() {
  const activeModal = useModalStore((state) => state.activeModal);

  return (
    <div className="w-full bg-slate-100">
      <CheckoutHeader />
      <main className="mx-auto min-h-[calc(100dvh-65px)] w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-start gap-4 py-6 md:flex-row">
          <ProductList />
          <div className="sticky top-22.25 right-0 z-40 hidden h-fit w-80 md:block">
            <CheckoutSummary />
          </div>
          <div className="w-full md:hidden">
            <CheckoutSummary />
          </div>
        </div>
      </main>
      <CheckoutFooter />
      {activeModal === "add-address" && <AddressFormModal />}
    </div>
  );
}
